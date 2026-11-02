---
title: Which agents
description: The agents SessionCost reads, and how exact its numbers are for each.
---
SessionCost reads each agent's own log on your computer. How exact the numbers are depends on what that log records.

| Agent | Tokens |
|---|---|
| **Claude Code** | Exact, from its log. |
| **Codex** | Exact, from its log. |
| **GitHub Copilot CLI** | Exact, from its log. Money is API-equivalent: Copilot bills premium requests, not tokens. |
| **GitHub Copilot Chat (VS Code)** | Estimated from text size: the log has few token counts and no cache, so the cost is shown as a range. |
| **Antigravity** | Exact, from its log. |
| **Cursor** | Estimated from text size. Exact with your usage export: `sessioncost --cursor-usage file.csv`. |

## The guard, by agent

Every way of [installing](/sessioncost-help/start/install/) gives every agent below `/sessioncost`, `/livesession`
and the guard. The guard is off until you type `/livesession` in any agent; then every agent is guarded, until
`/livesession off`. What differs by agent:

| Agent | Notes |
|---|---|
| Claude Code | `/livesession off` typed in the chat switches it off. |
| Codex | Codex asks you once to trust new hooks: type `/hooks` there. Codex cannot ask, so a step that would ask is blocked and the agent asks you in the chat. |
| Cursor | Cursor's hooks cannot read the chat: switch the guard off with `/livesession off` in another agent, or `sessioncost guard off` in a terminal. |
| Antigravity | You can see the guard's hooks under **Customizations → Hooks**. |
| GitHub Copilot CLI and Copilot Chat (VS Code) | One setup covers both: they read the same skills (`~/.copilot/skills`) and hooks (`~/.copilot/hooks/sessioncost-guard.json`; delete that file to take the guard out). Copilot lets a step run if a check takes longer than 10 seconds, and in Autopilot mode a step that would ask is blocked instead. |

Installed an agent after SessionCost? Run `setup` again, or paste the one-line install again.

What each agent's hooks let the guard see, side by side: [What the guard checks](/sessioncost-help/guard/checks/#by-agent).
