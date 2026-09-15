import { initializeApp } from 'firebase/app';
import { getFirestore, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const safe = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const now = () => new Date();
const asDate = (value) => value?.toDate ? value.toDate() : new Date(value || 0);
const ago = (value) => {
  const seconds = Math.max(0, Math.floor((Date.now() - asDate(value).getTime()) / 1000));
  if (!Number.isFinite(seconds)) return 'unknown';
  if (seconds < 45) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};
const tone = (status = '') => ['failed', 'error', 'failing', 'offline'].includes(status) ? 'danger' : ['degraded', 'waiting', 'unconfigured'].includes(status) ? 'warning' : ['running', 'checking'].includes(status) ? 'info' : 'success';
const needsAttention = (status = '') => ['failed', 'error', 'failing', 'offline', 'degraded'].includes(status);
const isHealthy = (status = '') => ['success', 'healthy', 'online'].includes(status);
const config = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'].reduce((result, key) => ({ ...result, [key]: import.meta.env[`VITE_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`] }), {});

const automationRegistry = [
  { id: 'YZRLYCOOkzLJHssV', name: 'Script Factory', project: 'Content automation', description: 'Turns approved topics into scripts and scene prompts.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/YZRLYCOOkzLJHssV' },
  { id: 'NfffvoxQX8ohMUkn', name: 'Pexels Background Factory', project: 'Content automation', description: 'Finds portrait background clips for prepared scenes.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/NfffvoxQX8ohMUkn' },
  { id: 'uNxX8WBh11zGPVS3', name: 'Video Factory', project: 'Content automation', description: 'Creates voiceovers, renders video and saves the MP4.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/uNxX8WBh11zGPVS3' },
  { id: 'n7aNuvZq54vYQanI', name: 'YouTube Unlisted Upload', project: 'Content automation', description: 'Uploads review-ready videos as unlisted.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/n7aNuvZq54vYQanI' },
  { id: 'Skdvgei0oVz2mQOe', name: 'AI Client Inquiry & Proposal Assistant', project: 'Client operations', description: 'Classifies inquiries, reviews resumes and prepares Gmail drafts.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/Skdvgei0oVz2mQOe' },
  { id: 'sf9SF9oQZGBjujTk', name: 'Chatbot Automation', project: 'Conversational automation', description: 'Runs the live portfolio chatbot workflow.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/sf9SF9oQZGBjujTk' },
  { id: 'veCEzoBIuCpZiygh', name: 'DLT — Personal Tracker Assistant', project: 'Personal productivity', description: 'Supports the Daily Life Tracking System assistant.', n8nUrl: 'https://negosyonakaauto.duckdns.org/workflow/veCEzoBIuCpZiygh' },
].map((workflow) => ({ ...workflow, active: true, health: 'waiting', lastNode: 'Awaiting live telemetry', executionCount: 0 }));

const websiteRegistry = [
  { id: 'portfolio', name: 'Portfolio & Interactive CV', type: 'Portfolio', url: 'https://benjielipalam.vercel.app/' },
  { id: 'thesis', name: 'Automotive Spare Parts DSS', type: 'Thesis system', url: 'https://automotive-spare-parts-dss-thesis.vercel.app/' },
  { id: 'recruitment', name: 'AI Recruitment Agent', type: 'Automation case study', url: 'https://ai-recruitment-agent-n8n.vercel.app/' },
  { id: 'daily-life', name: 'Daily Life Tracking System', type: 'Web application', url: 'https://dailylife-trackingsystem.vercel.app/' },
  { id: 'mnllumiere', name: 'MNLLUMIERE', type: 'E-commerce website', url: 'https://mnllumiere.vercel.app/' },
  { id: 'flowboard', name: 'Flowboard Systems Monitor', type: 'Operations dashboard', url: location.origin + '/automation-dashboard.html' },
];

const state = {
  events: [],
  workflows: automationRegistry,
  websites: websiteRegistry.map((website) => ({ ...website, status: 'checking', latency: null, checkedAt: null })),
  websiteEvents: [],
  filters: { automation: 'all', website: 'all' },
  telemetryConnected: false,
};

function toast(message) {
  const element = $('#toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove('show'), 2600);
}

function mergeWorkflows(liveWorkflows) {
  const byId = new Map(liveWorkflows.map((workflow) => [String(workflow.id), workflow]));
  const merged = automationRegistry.map((workflow) => ({ ...workflow, ...byId.get(workflow.id) }));
  liveWorkflows.forEach((workflow) => { if (!automationRegistry.some((item) => item.id === String(workflow.id))) merged.push(workflow); });
  return merged;
}

function filteredWorkflows() {
  return state.workflows.filter((workflow) => state.filters.automation === 'all' || (state.filters.automation === 'healthy' ? isHealthy(workflow.health || workflow.status) : needsAttention(workflow.health || workflow.status)));
}

function filteredWebsites() {
  return state.websites.filter((website) => state.filters.website === 'all' || (state.filters.website === 'online' ? website.status === 'online' : website.status === 'offline'));
}

function renderMetrics() {
  const successfulEvents = state.events.filter((event) => event.status === 'success').length;
  const completedEvents = state.events.filter((event) => ['success', 'failed', 'error'].includes(event.status)).length;
  const online = state.websites.filter((website) => website.status === 'online').length;
  const checked = state.websites.filter((website) => website.status !== 'checking').length;
  const automationIssues = state.workflows.filter((workflow) => needsAttention(workflow.health || workflow.status)).length;
  const websiteIssues = state.websites.filter((website) => website.status === 'offline').length;
  const reportingWorkflows = state.workflows.filter((workflow) => !['waiting', 'unconfigured'].includes(workflow.health || workflow.status));
  const healthySystems = reportingWorkflows.filter((workflow) => isHealthy(workflow.health || workflow.status)).length + online;
  const reportingSystems = reportingWorkflows.length + checked;
  const totalSystems = state.workflows.length + state.websites.length;

  $('#totalSystems').textContent = totalSystems;
  $('#systemsMeta').textContent = `${state.workflows.length} automations · ${state.websites.length} websites`;
  $('#successRate').textContent = completedEvents ? `${Math.round(successfulEvents / completedEvents * 100)}%` : '—';
  $('#successMeta').textContent = completedEvents ? `${successfulEvents} successful of ${completedEvents} completed runs` : 'Connect event nodes for live run history';
  $('#onlineWebsites').textContent = checked ? `${online}/${state.websites.length}` : '—';
  $('#websiteMeta').textContent = checked === state.websites.length ? `Last scan ${ago(state.websites[0]?.checkedAt)}` : 'Checks are running';
  $('#attentionCount').textContent = automationIssues + websiteIssues;
  $('#attentionMeta').textContent = automationIssues + websiteIssues ? `${automationIssues} automation · ${websiteIssues} website` : 'Nothing needs attention';
  $('#overallHealth').textContent = reportingSystems ? `${Math.round(healthySystems / reportingSystems * 100)}%` : '—';
  $('#automationBadge').textContent = state.workflows.length;
  $('#websiteBadge').textContent = state.websites.length;
  $('#connectionStatus').innerHTML = `<i></i>${state.telemetryConnected ? 'Telemetry connected' : 'Website monitor active'}`;
  $('#syncMessage').textContent = state.events[0] ? `Latest automation event ${ago(state.events[0].occurredAt || state.events[0].createdAt)}.` : 'Website checks are live. Automation events appear when n8n reports them.';
}

function renderAutomations() {
  const workflows = filteredWorkflows();
  $('#automationGrid').innerHTML = workflows.length ? workflows.map((workflow) => {
    const status = workflow.health || workflow.status || 'waiting';
    return `<article class="system-card automation-card" data-status="${safe(status)}">
      <div class="card-top"><span class="system-icon">⌁</span><span class="status ${tone(status)}"><i></i>${safe(status)}</span></div>
      <p class="card-kicker">${safe(workflow.project || 'n8n project')}</p><h3>${safe(workflow.name || 'Unnamed workflow')}</h3><p class="card-description">${safe(workflow.description || 'n8n automation workflow')}</p>
      <dl><div><dt>Executions</dt><dd>${safe(workflow.executionCount || 0)}</dd></div><div><dt>Last activity</dt><dd>${workflow.updatedAt ? ago(workflow.updatedAt) : 'Waiting'}</dd></div></dl>
      <div class="last-event"><span>Latest node</span><strong>${safe(workflow.lastNode || 'No event reported')}</strong></div>
      <button class="card-link" data-url="${safe(workflow.n8nUrl || '')}">Open workflow <span>↗</span></button>
    </article>`;
  }).join('') : '<div class="empty-state"><strong>No automations match this filter.</strong><p>Change the filter to see the full registry.</p></div>';
}

function renderWebsites() {
  const websites = filteredWebsites();
  $('#websiteGrid').innerHTML = websites.length ? websites.map((website) => `<article class="system-card website-card" data-status="${safe(website.status)}">
    <div class="card-top"><span class="system-icon">◎</span><span class="status ${tone(website.status)}"><i></i>${safe(website.status)}</span></div>
    <p class="card-kicker">${safe(website.type)}</p><h3>${safe(website.name)}</h3><p class="site-url">${safe(new URL(website.url).host)}</p>
    <dl><div><dt>Response</dt><dd>${website.latency == null ? '—' : `${website.latency}ms`}</dd></div><div><dt>Last check</dt><dd>${website.checkedAt ? ago(website.checkedAt) : 'Checking'}</dd></div></dl>
    <div class="uptime-line"><i style="width:${website.status === 'online' ? 100 : website.status === 'checking' ? 45 : 8}%"></i></div>
    <button class="card-link" data-url="${safe(website.url)}">Open website <span>↗</span></button>
  </article>`).join('') : '<div class="empty-state"><strong>No websites match this filter.</strong><p>Change the filter to see the full registry.</p></div>';
}

function renderActivity() {
  const combined = [
    ...state.events.map((event) => ({ ...event, kind: 'automation', title: event.workflowName || event.workflow || 'n8n workflow', at: event.occurredAt || event.createdAt })),
    ...state.websiteEvents.map((event) => ({ ...event, kind: 'website', title: event.websiteName, at: event.occurredAt })),
  ].sort((a, b) => asDate(b.at) - asDate(a.at)).slice(0, 12);

  $('#activityList').innerHTML = combined.length ? combined.map((event) => `<article class="activity-item">
    <span class="activity-icon ${tone(event.status)}">${event.kind === 'website' ? '◎' : '⌁'}</span>
    <div><span class="activity-kind">${event.kind}</span><strong>${safe(event.title)}</strong><p>${safe(event.message || event.nodeName || `${event.status} recorded`)}</p></div>
    <time>${ago(event.at)}</time><span class="status ${tone(event.status)}"><i></i>${safe(event.status)}</span>
  </article>`).join('') : '<div class="empty-state"><strong>No activity yet.</strong><p>The first website result or n8n event will appear here.</p></div>';
}

function render() {
  renderMetrics();
  renderAutomations();
  renderWebsites();
  renderActivity();
}

async function probeWebsite(website) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const started = performance.now();
  try {
    await fetch(website.url, { mode: website.url.startsWith(location.origin) ? 'cors' : 'no-cors', cache: 'no-store', signal: controller.signal });
    return { status: 'online', latency: Math.round(performance.now() - started), checkedAt: now() };
  } catch {
    return { status: 'offline', latency: null, checkedAt: now() };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkWebsites(showToast = false) {
  if (checkWebsites.running) return;
  checkWebsites.running = true;
  $('#websiteScan').innerHTML = '<i></i>Checking websites';
  state.websites = state.websites.map((website) => ({ ...website, status: 'checking' }));
  render();
  const results = await Promise.all(websiteRegistry.map(async (website) => ({ website, result: await probeWebsite(website) })));
  state.websites = results.map(({ website, result }) => ({ ...website, ...result }));
  const checkedAt = now();
  state.websiteEvents.unshift(...state.websites.map((website) => ({ websiteName: website.name, status: website.status, message: website.status === 'online' ? `Responded in ${website.latency}ms` : 'Health check failed', occurredAt: checkedAt })));
  state.websiteEvents = state.websiteEvents.slice(0, 30);
  $('#websiteScan').innerHTML = `<i></i>Checked ${ago(checkedAt)}`;
  checkWebsites.running = false;
  render();
  if (showToast) toast(`${state.websites.filter((website) => website.status === 'online').length} of ${state.websites.length} websites are online.`);
}

function connectTelemetry() {
  if (!config.apiKey || !config.projectId) { render(); return; }
  const db = getFirestore(initializeApp(config));
  onSnapshot(query(collection(db, 'automationEvents'), orderBy('occurredAt', 'desc'), limit(100)), (snapshot) => {
    state.events = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }));
    state.telemetryConnected = true;
    render();
  }, () => toast('Automation telemetry needs Firestore access.'));
  onSnapshot(query(collection(db, 'automationWorkflows'), orderBy('updatedAt', 'desc'), limit(50)), (snapshot) => {
    state.workflows = mergeWorkflows(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })));
    state.telemetryConnected = true;
    render();
  }, () => toast('Workflow registry could not be loaded.'));
}

$$('[data-filter-group]').forEach((group) => group.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  group.querySelectorAll('button').forEach((item) => item.classList.toggle('active', item === button));
  state.filters[group.dataset.filterGroup] = button.dataset.filter;
  render();
}));

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-url]');
  if (button?.dataset.url) window.open(button.dataset.url, '_blank', 'noopener');
});

const sections = $$('main > section[id]');
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) $$('.nav-item').forEach((link) => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
}), { rootMargin: '-25% 0px -65%' });
sections.forEach((section) => observer.observe(section));

$('#refreshDashboard').addEventListener('click', () => checkWebsites(true));
$('#checkWebsites').addEventListener('click', () => checkWebsites(true));
$('#openN8n').addEventListener('click', () => window.open('https://negosyonakaauto.duckdns.org/home/executions', '_blank', 'noopener'));
$('#loadActivity').addEventListener('click', () => toast('Showing the latest automation events and website checks.'));
$('#viewContract').addEventListener('click', () => toast('Add secure telemetry calls to each n8n start, success and error branch.'));

render();
connectTelemetry();
checkWebsites();
setInterval(checkWebsites, 60000);
