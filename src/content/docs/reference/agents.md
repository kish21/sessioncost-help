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

| Agent | How it gets the guard |
|---|---|
| Claude Code | With the plugin; turn it on with `/livesession`. |
| Codex | `sessioncost guard setup codex`, then `sessioncost guard on`. Codex cannot ask, so a step that would ask is blocked and the agent asks you in the chat. |
| Cursor | `sessioncost guard setup cursor`, then `sessioncost guard on`. |
| Antigravity | `sessioncost guard setup antigravity`, then `sessioncost guard on`. |
