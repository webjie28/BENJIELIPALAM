# Flowboard n8n telemetry contract

Every n8n project writes two Firestore collections: `automationWorkflows` and `automationEvents`.

## Workflow registry

Use the n8n workflow ID as document ID and update it when the workflow changes or completes an execution.

```json
{"name":"AI Client Inquiry & Proposal Assistant","project":"Client operations","description":"Gmail intake and proposal drafts","active":true,"health":"healthy","executionCount":14,"lastNode":"Draft Client Reply","n8nUrl":"https://YOUR-N8N/workflow/WORKFLOW_ID","updatedAt":"Firestore server timestamp"}
```

## Event log

Create a document at start, success, and failure branches. Never include email bodies, resumes, credentials, or client PII.

```json
{"workflowName":"AI Client Inquiry & Proposal Assistant","workflowId":"WORKFLOW_ID","status":"success","nodeName":"Validate Score & Review Gate","message":"Qualified inquiry recorded","occurredAt":"Firestore server timestamp"}
```

Allowed status values: `running`, `success`, `failed`, `degraded`, `waiting`.
