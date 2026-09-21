# Shared rules for Hermes project agents

1. Read `PROJECT.md`, `DESIGN.md`, `TASKS.md`, and relevant architecture decisions before starting.
2. Confirm the current stack before adding dependencies or writing code.
3. Work on a branch named `agent/<role>/<short-task-name>`; do not commit directly to `main`.
4. Keep each change small and reviewable. Do not mix refactors with feature work.
5. Do not place keys, tokens, customer data, or `.env` files in Git. Update `.env.example` instead.
6. Run the narrowest meaningful validation, record the command and outcome in `AGENT-HANDOFF.md`, and update `TASKS.md`.
7. The Quality Review agent must review each task before merge. Its author cannot approve that same task.
8. Never deploy, modify production data, publish a package, or enable automatic notifications without the owner's direct instruction.
