import { initializeApp } from 'firebase/app';
import { getFirestore, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';

const $ = (s) => document.querySelector(s);
const state = { events: [], workflows: [] };
const config = ['apiKey','authDomain','projectId','storageBucket','messagingSenderId','appId'].reduce((o, k) => ({ ...o, [k]: import.meta.env[`VITE_FIREBASE_${k.replace(/([A-Z])/g, '_$1').toUpperCase()}`] }), {});
const tone = (s) => ['failed','error'].includes(s) ? 'rose' : ['degraded','waiting'].includes(s) ? 'amber' : s === 'running' ? 'blue' : 'mint';
const safe = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const ago = (v) => { const n = Math.max(0, Math.floor((Date.now() - (v?.toDate ? v.toDate() : new Date(v)).getTime()) / 60000)); return !Number.isFinite(n) || n < 1 ? 'just now' : n < 60 ? `${n}m ago` : `${Math.floor(n / 60)}h ago`; };
const empty = (title, copy) => `<div class="empty-state"><strong>${title}</strong><p>${copy}</p></div>`;
function toast(text) { const t = $('#toast'); t.textContent = text; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2600); }

function render() {
  const failed = state.events.filter(e => ['failed','error'].includes(e.status)).length;
  const success = state.events.filter(e => e.status === 'success').length;
  const total = state.events.length;
  $('#totalRuns').textContent = total || '—'; $('#runsMeta').textContent = total ? 'Latest telemetry events' : 'No live data yet';
  $('#activeWorkflows').textContent = state.workflows.filter(w => w.active !== false).length || '—'; $('#activeMeta').textContent = state.workflows.length ? `${state.workflows.length} registered projects` : 'Waiting for registry';
  $('#successRate').textContent = total ? `${Math.round(success / total * 100)}%` : '—'; $('#successMeta').textContent = total ? `${success} successful / ${total} events` : 'Calculated from events';
  $('#attentionCount').textContent = failed; $('#attentionMeta').textContent = failed ? `${failed} errors need review` : 'No failed events loaded'; $('#failureBadge').textContent = failed;
  $('#connectionStatus').innerHTML = `<i></i>${state.events.length || state.workflows.length ? 'Live telemetry connected' : 'Waiting for telemetry'}`;
  $('#syncMessage').textContent = state.events[0] ? `Last n8n event ${ago(state.events[0].occurredAt || state.events[0].createdAt)}.` : 'Waiting for the first workflow telemetry event.';
  $('#registryUpdated').textContent = state.workflows[0] ? `Updated ${ago(state.workflows[0].updatedAt)}` : 'No workflow data yet';
  $('#kanban').innerHTML = state.workflows.length ? state.workflows.slice(0,6).map(w => `<section class="kanban-column"><header><span>${safe(w.project || 'n8n project')}</span><b>${safe(w.executionCount || 0)}</b></header><button class="lead-card" data-workflow="${safe(w.n8nUrl || '')}"><span class="lead-avatar ${tone(w.health || w.status)}">⌁</span><span><strong>${safe(w.name)}</strong><small>${safe(w.lastNode || 'No recent node data')}</small></span><em class="tag ${tone(w.health || w.status)}">${safe(w.health || w.status || 'healthy')}</em></button><button class="add-lead">View in n8n ↗</button></section>`).join('') : empty('No registered workflows yet', 'Add an Operations Event step to an n8n workflow to make it appear here.');
  $('#activity').innerHTML = state.events.length ? state.events.slice(0,7).map(e => `<div class="activity"><span class="activity-icon ${tone(e.status)}">⌁</span><div><strong>${safe(e.workflowName || e.workflow || 'n8n workflow')}</strong><p>${safe(e.message || e.nodeName || e.status || 'Execution recorded')}</p></div><time>${ago(e.occurredAt || e.createdAt)}</time></div>`).join('') : empty('No events received', 'Every workflow transition will appear here.');
  $('#contentGrid').innerHTML = state.workflows.length ? state.workflows.map((w,i) => `<article class="content-card"><div class="video-thumb thumb-${i%3+1}"><span class="play">⌁</span><b>${safe(w.executionCount || 0)} runs</b></div><div class="content-copy"><div><span class="status ${tone(w.health || w.status)}"><i></i>${safe(w.health || w.status || 'healthy')}</span><button aria-label="Workflow actions">•••</button></div><h3>${safe(w.name)}</h3><p>${safe(w.description || w.project || 'n8n workflow project')}</p></div></article>`).join('') : empty('Your n8n project registry is empty', 'Client inquiry, content factory, and every future workflow will live here.');
}
function connect() {
  if (!config.apiKey || !config.projectId) { render(); return toast('Add Firebase config to enable live telemetry.'); }
  const db = getFirestore(initializeApp(config));
  onSnapshot(query(collection(db,'automationEvents'),orderBy('occurredAt','desc'),limit(100)), s => { state.events = s.docs.map(d => ({id:d.id,...d.data()})); render(); }, () => toast('Telemetry read needs Firestore rules or configuration.'));
  onSnapshot(query(collection(db,'automationWorkflows'),orderBy('updatedAt','desc'),limit(30)), s => { state.workflows = s.docs.map(d => ({id:d.id,...d.data()})); render(); });
}
$('#refreshDashboard').addEventListener('click', () => toast('Live listeners are active.'));
$('#loadActivity').addEventListener('click', () => toast('Showing the latest 100 workflow events.'));
$('#openN8n').addEventListener('click', () => window.open('https://negosyonakaauto.duckdns.org/home/workflows','_blank','noopener'));
$('#viewContract').addEventListener('click', () => toast('Use OPERATIONS-TELEMETRY.md for each n8n project.'));
document.addEventListener('click', e => { const c=e.target.closest('[data-workflow]'); if(c?.dataset.workflow) window.open(c.dataset.workflow,'_blank','noopener'); });
render(); connect();
