# Hermes Project Kit

This kit gives the Hermes team one shared source of truth for an ecommerce project.

1. Copy these files into the root of a new Git repository.
2. Fill in `PROJECT.md` and `DESIGN.md` before any build work.
3. Start with **Project Lead**. It creates small task cards and routes them to the specialist agents.
4. Each specialist works on its own branch, updates `TASKS.md`, and records its proof in `AGENT-HANDOFF.md`.
5. Send every finished item to **Quality Review** before it is merged.

Run `INSTALL-GITHUB-CLI.ps1` once before `CONNECT-GITHUB.ps1`. The portable CLI is intentionally kept out of Git; the installer verifies it against GitHub's release checksum.

## Team

| Hermes profile | Owns |
| --- | --- |
| Project Lead | scope, task breakdown, dependencies, decisions |
| UI Studio | visual direction, frontend, responsive UI, interaction |
| Commerce Backend | Medusa, products, inventory, cart, checkout, APIs |
| Platform Engineer | app foundation, environments, CI, performance, tooling |
| Quality Review | independent review, accessibility, tests, security, release readiness |

The team never deploys, changes production data, or publishes a repository without a direct instruction from you.
