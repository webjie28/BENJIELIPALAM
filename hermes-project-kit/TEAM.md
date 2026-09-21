# Hermes project team

Open a separate Hermes profile for each role. Their settings and conversations are separate.

| Role | Local launcher | Use it for |
| --- | --- | --- |
| Project Lead | `C:\Users\lamka\.local\bin\project-lead.bat` | turn an idea into scoped, assigned task cards |
| UI Studio | `C:\Users\lamka\.local\bin\ui-studio.bat` | premium storefront UI, interaction, motion, accessibility |
| Commerce Backend | `C:\Users\lamka\.local\bin\commerce-backend.bat` | Medusa, products, cart, checkout, orders |
| Platform Engineer | `C:\Users\lamka\.local\bin\platform-engineer.bat` | framework, local setup, environments, tests, CI |
| Quality Review | `C:\Users\lamka\.local\bin\quality-review.bat` | independent acceptance and release review |

## Recommended project flow

1. Write the project brief and design direction from this kit in the repository.
2. Ask **Project Lead**: “Read the project files and create the first task board for this brief.”
3. Give each card to its owner. Start UI, backend, and platform tasks only when their dependencies are clear.
4. Each owner records its work and test proof in `AGENT-HANDOFF.md`.
5. Give completed cards to **Quality Review**. Fix only the reported findings, then request another review.
6. You decide when to merge or deploy.

## Example first instruction

```text
Repository: C:\Projects\my-store
Read PROJECT.md, DESIGN.md, TASKS.md, and ARCHITECTURE.md.
Create a first delivery plan for a Medusa-powered ecommerce site.
Do not write code. Make task cards with owners, dependencies, acceptance criteria, and questions for me.
```

This is a specialist team, not an automatic swarm: you assign or forward the task cards deliberately. That keeps scope, cost, and repository changes visible.
