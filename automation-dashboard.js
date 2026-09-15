import { initializeApp } from 'firebase/app';
import { collection, getFirestore, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

const $ = selector => document.querySelector(selector);
const config = ['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'].reduce((result, key) => ({ ...result, [key]: import.meta.env[`VITE_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`] }), {});
const n8nHome = 'https://negosyonakaauto.duckdns.org/home/workflows';
const now = Date.now();
const minutesAgo = minutes => new Date(now - minutes * 60000);
const demoWorkflows = [
  { id:'inquiry', name:'Client Inquiry & Proposal Assistant', project:'Client operations', description:'Inquiry intake and response preparation', active:true, health:'healthy', executionCount:128, lastNode:'Human review gate', n8nUrl:n8nHome, updatedAt:minutesAgo(8) },
  { id:'shorts', name:'YouTube Shorts Content System', project:'Content pipeline', description:'Script, render, and publishing preparation', active:true, health:'degraded', executionCount:42, lastNode:'Render video', n8nUrl:n8nHome, updatedAt:minutesAgo(34) },
  { id:'recruitment', name:'AI Recruitment Agent', project:'Recruitment', description:'Resume evaluation and candidate routing', active:true, health:'failing', executionCount:76, lastNode:'Update candidate record', n8nUrl:n8nHome, updatedAt:minutesAgo(51) },
  { id:'attendance', name:'Auto Clock-In/Out', project:'Personal operations', description:'Time validation and attendance action', active:true, health:'healthy', executionCount:212, lastNode:'Attendance verified', n8nUrl:n8nHome, updatedAt:minutesAgo(93) }
];
const demoEvents = [
  { id:'e1', workflowId:'inquiry', workflowName:'Client Inquiry & Proposal Assistant', project:'Client operations', status:'success', nodeName:'Human review gate', message:'Qualified inquiry prepared for review', occurredAt:minutesAgo(8) },
  { id:'e2', workflowId:'shorts', workflowName:'YouTube Shorts Content System', project:'Content pipeline', status:'degraded', nodeName:'Render video', message:'Render completed slower than expected', occurredAt:minutesAgo(34) },
  { id:'e3', workflowId:'recruitment', workflowName:'AI Recruitment Agent', project:'Recruitment', status:'failed', nodeName:'Update candidate record', message:'Candidate record update needs review', occurredAt:minutesAgo(51) },
  { id:'e4', workflowId:'attendance', workflowName:'Auto Clock-In/Out', project:'Personal operations', status:'success', nodeName:'Attendance verified', message:'Approved attendance action recorded', occurredAt:minutesAgo(93) },
  { id:'e5', workflowId:'shorts', workflowName:'YouTube Shorts Content System', project:'Content pipeline', status:'success', nodeName:'Prepare upload', message:'Publishing package prepared', occurredAt:minutesAgo(210) },
  { id:'e6', workflowId:'recruitment', workflowName:'AI Recruitment Agent', project:'Recruitment', status:'success', nodeName:'Evaluate candidate', message:'Candidate evaluation completed', occurredAt:minutesAgo(420) }
];
const state = { workflows:demoWorkflows, events:demoEvents, days:7, search:'', source:'demo' };
const liveData = { workflows:null, events:null };

const toDate = value => value?.toDate ? value.toDate() : new Date(value || 0);
const safe = (value='') => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const healthClass = value => ['failed','error'].includes(value) ? 'failing' : value || 'healthy';
const relativeTime = value => {
  const minutes = Math.max(0, Math.floor((Date.now() - toDate(value).getTime()) / 60000));
  return minutes < 1 ? 'now' : minutes < 60 ? `${minutes}m` : minutes < 1440 ? `${Math.floor(minutes/60)}h` : `${Math.floor(minutes/1440)}d`;
};
const toast = message => { const node=$('#toast'); node.textContent=message; node.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>node.classList.remove('show'),2600); };
const filteredEvents = () => {
  const cutoff = Date.now() - state.days * 86400000;
  const term = state.search.toLowerCase();
  return state.events.filter(event => toDate(event.occurredAt || event.createdAt).getTime() >= cutoff && (!term || `${event.workflowName} ${event.project} ${event.message} ${event.nodeName}`.toLowerCase().includes(term)));
};
const filteredWorkflows = () => {
  const term = state.search.toLowerCase();
  return state.workflows.filter(workflow => !term || `${workflow.name} ${workflow.project} ${workflow.health} ${workflow.lastNode}`.toLowerCase().includes(term));
};
if (import.meta.env.DEV && (healthClass('failed') !== 'failing' || safe('<') !== '&lt;')) throw new Error('Dashboard self-check failed');

function renderSource(){
  const live = state.source === 'live';
  $('#sourceDot').className = live ? 'live' : state.source === 'error' ? 'error' : '';
  $('#connectionStatus').textContent = live ? 'Live telemetry' : state.source === 'error' ? 'Live unavailable' : 'Demo telemetry';
  $('#sourceNote').textContent = live ? 'Firestore listeners connected' : state.source === 'error' ? 'Showing safe demo data' : 'Connect n8n to replace sample events';
  $('#heroStatus').textContent = live ? 'Live' : state.source === 'error' ? 'Demo fallback' : 'Demo mode';
  $('#syncMessage').textContent = live && state.events[0] ? `Last workflow event ${relativeTime(state.events[0].occurredAt || state.events[0].createdAt)} ago.` : 'Representative data is active while live workflow events are being connected.';
}

function render(){
  const workflows = filteredWorkflows();
  const events = filteredEvents();
  const completed = events.filter(event => ['success','failed','error'].includes(event.status));
  const successes = completed.filter(event => event.status === 'success').length;
  const attention = workflows.filter(workflow => ['failing','degraded','waiting'].includes(healthClass(workflow.health || workflow.status)));
  const incidentEvents = events.filter(event => ['failed','error','degraded','waiting'].includes(event.status));

  renderSource();
  $('#totalRuns').textContent = completed.length || '0';
  $('#runsMeta').textContent = `${state.days === 1 ? 'Last 24 hours' : `Last ${state.days} days`} · terminal events`;
  $('#activeWorkflows').textContent = workflows.filter(workflow => workflow.active !== false).length;
  $('#activeMeta').textContent = `${workflows.length} registered systems`;
  $('#successRate').textContent = completed.length ? `${Math.round(successes/completed.length*100)}%` : '—';
  $('#successMeta').textContent = completed.length ? `${successes} successful / ${completed.length} completed` : 'No completed runs yet';
  $('#attentionCount').textContent = attention.length;
  $('#attentionMeta').textContent = attention.length ? 'Review degraded or failing systems' : 'All registered systems healthy';
  $('#workflowCount').textContent = `${String(workflows.length).padStart(2,'0')} systems`;
  $('#eventCount').textContent = `${String(events.length).padStart(2,'0')} events`;
  $('#failureBadge').textContent = incidentEvents.length;

  $('#workflowList').innerHTML = workflows.length ? workflows.map((workflow,index) => {
    const health = healthClass(workflow.health || workflow.status);
    return `<div class="system-row" role="row"><div class="system-name"><span class="system-index">${String(index+1).padStart(2,'0')}</span><div><strong>${safe(workflow.name)}</strong><small>${safe(workflow.project || 'n8n project')}</small></div></div><span class="health ${safe(health)}">${safe(health)}</span><span class="run-count">${safe(workflow.executionCount || 0)}</span><span class="checkpoint">${safe(workflow.lastNode || 'No checkpoint yet')}</span><button class="inspect" data-url="${safe(workflow.n8nUrl || '')}" aria-label="Open ${safe(workflow.name)} in n8n">↗</button></div>`;
  }).join('') : '<p class="empty">No systems match this search.</p>';

  $('#attentionList').innerHTML = incidentEvents.length ? incidentEvents.slice(0,5).map(event => `<article class="attention-item"><div><strong>${safe(event.workflowName || 'Workflow')}</strong><time>${relativeTime(event.occurredAt || event.createdAt)} ago</time></div><p>${safe(event.message || event.nodeName || event.status)}</p></article>`).join('') : '<p class="attention-empty">No exceptions in this time range.</p>';
  $('#eventList').innerHTML = events.length ? events.slice(0,10).map(event => `<article class="event-row"><time>${relativeTime(event.occurredAt || event.createdAt)} ago</time><span class="event-workflow">${safe(event.workflowName || 'Workflow')}</span><span class="event-project">${safe(event.project || 'n8n project')}</span><span class="event-copy">${safe(event.message || event.nodeName || 'Execution recorded')}</span><span class="health ${safe(healthClass(event.status))}">${safe(event.status || 'unknown')}</span></article>`).join('') : '<p class="empty">No events match this time range or search.</p>';
}

function useLiveData(){
  if (liveData.workflows === null || liveData.events === null || (!liveData.workflows.length && !liveData.events.length)) return;
  state.source = 'live';
  state.workflows = liveData.workflows;
  state.events = liveData.events;
  render();
}

function connect(){
  if (!config.apiKey || !config.projectId) return render();
  try {
    const db = getFirestore(initializeApp(config));
    onSnapshot(query(collection(db,'automationWorkflows'),orderBy('updatedAt','desc'),limit(30)), snapshot => { liveData.workflows=snapshot.docs.map(doc=>({id:doc.id,...doc.data()})); useLiveData(); }, () => { state.source='error'; render(); });
    onSnapshot(query(collection(db,'automationEvents'),orderBy('occurredAt','desc'),limit(100)), snapshot => { liveData.events=snapshot.docs.map(doc=>({id:doc.id,...doc.data()})); useLiveData(); }, () => { state.source='error'; render(); });
  } catch { state.source='error'; render(); }
}

$('.range-switcher').addEventListener('click', event => { const button=event.target.closest('[data-days]'); if(!button)return; state.days=Number(button.dataset.days); document.querySelectorAll('[data-days]').forEach(node=>node.classList.toggle('active',node===button)); render(); });
$('#workflowSearch').addEventListener('input', event => { state.search=event.target.value.trim(); render(); });
document.addEventListener('keydown', event => { if(event.key==='/' && document.activeElement!==$('#workflowSearch')){ event.preventDefault(); $('#workflowSearch').focus(); } });
document.addEventListener('click', event => { const button=event.target.closest('[data-url]'); if(button?.dataset.url) window.open(button.dataset.url,'_blank','noopener'); });
$('#openN8n').addEventListener('click',()=>window.open(n8nHome,'_blank','noopener'));
$('#refreshDashboard').addEventListener('click',()=>{ render(); toast(state.source==='live'?'Live listeners refreshed.':'Demo data refreshed. Connect n8n for live events.'); });
$('#viewContract').addEventListener('click',()=>$('#contractDialog').showModal());
$('#copyContract').addEventListener('click',async()=>{ try{ await navigator.clipboard.writeText($('#contractCode').textContent); toast('Event JSON copied.'); }catch{ toast('Copy unavailable. Select the JSON manually.'); } });
$('#footerYear').textContent = new Date().getFullYear();

render();
connect();
