const leads = [
  { name: 'Mika Santos', source: 'Messenger · 8m ago', tag: 'Warm', color: 'orange', avatar: 'MS' },
  { name: 'Janelle Cruz', source: 'Messenger · 22m ago', tag: 'New', color: 'blue', avatar: 'JC' },
  { name: 'Ramon Reyes', source: 'Instagram · 1h ago', tag: 'Warm', color: 'orange', avatar: 'RR' },
  { name: 'Pat Dela Cruz', source: 'Messenger · 2h ago', tag: 'New', color: 'blue', avatar: 'PD' },
  { name: 'Althea Lim', source: 'Messenger · 4h ago', tag: 'Booked', color: 'mint', avatar: 'AL' },
  { name: 'Kim Mendoza', source: 'Instagram · yesterday', tag: 'Booked', color: 'mint', avatar: 'KM' },
];
const stages = [{ name: 'New leads', count: 12, ids: [0, 1] }, { name: 'In follow-up', count: 8, ids: [2, 3] }, { name: 'Ready to book', count: 5, ids: [4, 5] }];
const activities = [
  ['mint', 'Messenger follow-up sent', 'Mika Santos received Day 2 follow-up', '2 min ago'],
  ['blue', 'Lead scored by AI', 'Janelle Cruz marked as high intent', '11 min ago'],
  ['amber', 'Short render flagged', '“3 tips for better posture” needs review', '28 min ago'],
  ['mint', 'Booking confirmation logged', 'Althea Lim moved to Ready to book', '42 min ago'],
];
const content = [
  ['Healthy', 'mint', 'The 30-second reset for an overwhelmed day', 'Rendered · queued for 9:00 AM', '01:28'],
  ['In review', 'amber', '3 signs your desk setup is hurting your back', 'Caption needs approval', '00:46'],
  ['Blocked', 'rose', 'The habit that makes planning actually stick', 'Render timed out at 87%', '01:04'],
];
const $ = (s) => document.querySelector(s);
$('#kanban').innerHTML = stages.map(stage => `<section class="kanban-column"><header><span>${stage.name}</span><b>${stage.count}</b></header>${stage.ids.map(id => { const lead = leads[id]; return `<button class="lead-card" data-name="${lead.name}"><span class="lead-avatar ${lead.color}">${lead.avatar}</span><span><strong>${lead.name}</strong><small>${lead.source}</small></span><em class="tag ${lead.color}">${lead.tag}</em></button>` }).join('')}<button class="add-lead">+ Add lead</button></section>`).join('');
$('#activity').innerHTML = activities.map(([color, title, detail, time]) => `<div class="activity"><span class="activity-icon ${color}">⌁</span><div><strong>${title}</strong><p>${detail}</p></div><time>${time}</time></div>`).join('');
$('#contentGrid').innerHTML = content.map(([status, color, title, detail, duration], index) => `<article class="content-card"><div class="video-thumb thumb-${index + 1}"><span class="play">▶</span><b>${duration}</b></div><div class="content-copy"><div><span class="status ${color}"><i></i>${status}</span><button aria-label="More options">•••</button></div><h3>${title}</h3><p>${detail}</p></div></article>`).join('');
const toast = $('#toast');
function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2400); }
$('#runWorkflow').addEventListener('click', () => showToast('Workflow queued — Messenger Follow-Up will start shortly.'));
$('#loadActivity').addEventListener('click', (event) => { event.currentTarget.textContent = 'No earlier activity to load'; event.currentTarget.disabled = true; });
document.addEventListener('click', (event) => { const card = event.target.closest('.lead-card'); if (card) showToast(`${card.dataset.name}'s lead profile opened.`); if (event.target.closest('.add-lead')) showToast('New lead capture form ready.'); });
