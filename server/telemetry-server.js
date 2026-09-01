import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import admin from 'firebase-admin';

dotenv.config({ path: '.env.telemetry' });
const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY', 'TELEMETRY_API_KEY'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) throw new Error(`Missing server configuration: ${missing.join(', ')}`);

admin.initializeApp({ credential: admin.credential.cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
}) });

const db = admin.firestore();
const app = express();
app.use(cors({ origin: process.env.DASHBOARD_ORIGIN?.split(',') || false }));
app.use(express.json({ limit: '64kb' }));

const allowedStatus = new Set(['running', 'success', 'failed', 'degraded', 'waiting']);
function authorize(req, res, next) {
  if (req.get('x-telemetry-key') !== process.env.TELEMETRY_API_KEY) return res.status(401).json({ error: 'Unauthorized telemetry sender' });
  next();
}

app.get('/health', (_, res) => res.json({ ok: true, service: 'flowboard-telemetry' }));
app.post('/api/telemetry', authorize, async (req, res) => {
  const { workflowId, workflowName, project = 'n8n project', status, nodeName = '', message = '', executionId = null, active = true, description = '', n8nUrl = '' } = req.body || {};
  if (!workflowId || !workflowName || !allowedStatus.has(status)) return res.status(422).json({ error: 'workflowId, workflowName, and a valid status are required' });
  const now = admin.firestore.FieldValue.serverTimestamp();
  const workflowRef = db.collection('automationWorkflows').doc(String(workflowId));
  const eventRef = db.collection('automationEvents').doc();
  await db.runTransaction(async (transaction) => {
    const current = await transaction.get(workflowRef);
    const executionCount = (current.data()?.executionCount || 0) + (status === 'success' || status === 'failed' ? 1 : 0);
    transaction.set(workflowRef, { name: workflowName, project, description, active, health: status === 'failed' ? 'failing' : status === 'degraded' ? 'degraded' : 'healthy', lastNode: nodeName, n8nUrl, executionCount, updatedAt: now }, { merge: true });
    transaction.set(eventRef, { workflowId: String(workflowId), workflowName, project, status, nodeName, message: String(message).slice(0, 400), executionId, occurredAt: now });
  });
  res.status(201).json({ ok: true, eventId: eventRef.id });
});

app.listen(process.env.PORT || 8787, () => console.log('Flowboard telemetry API listening'));
