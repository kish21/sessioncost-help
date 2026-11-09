---
title: Commands
description: Every SessionCost command and option, what it does and what you should see.
---
On Windows, if `sessioncost` is not found, type `python -m sessioncost` instead (for example
`python -m sessioncost list`).

## In a chat

Type these to your agent, in any agent SessionCost set up (Claude Code, Codex, Cursor, Antigravity, Copilot). In
Claude Code with the plugin they may show as `/sessioncost:sessioncost`.

### The two you need

| Type | What it does |
|---|---|
| `/sessioncost` | Builds the report of this chat, gives you its link and names the top fix. Say "fix it" and your agent fixes the waste, after your yes. |
| `/livesession` | Turns the [guard](/sessioncost-help/guard/what-it-does/) on for every chat in every agent, this one included, until `/livesession off`. Only your own message turns it off: the agent cannot. |

You can also ask in your own words ("where did the tokens go?", "fix the waste"): the agent knows what to run.

### Optional

| Type | What it does |
|---|---|
| `/sessioncost fix` | This project's token waste as a to-do list, with the change for each. Your agent applies it on your yes, after a backup. |
| `/sessioncost fix --undo` | Puts back the newest fix, unless you changed the file since. |
| `/sessioncost fix auto on` | After each answer, new waste is listed at your next message and your agent asks before fixing. `off` stops it. |
| `/livesession strict` | The guard, stricter: outside content stays untrusted for the whole chat. |
| `/livesession allow <mark> <pattern>` | Stops one expected step asking in this project. You do not need to remember it: when the guard asks about a step, its message gives you the exact line. Secrets and never-list steps cannot be allowed. |
| `/sessioncost update` | Updates every copy of SessionCost on this computer. Restart your agent afterwards. |
| `/sessioncost version` | Shows which SessionCost version this agent uses, and how many other copies are on this computer. |
| `/sessioncost clean` | Deletes the reports of older chats and keeps the latest. |
| `/sessioncost auto off` | Stops rebuilding the report after each answer. `/sessioncost auto on` starts it again. |

## In a terminal

Run from the project folder whose chats you want to see. `sessioncost` below is typed `python -m sessioncost` if you
installed with pip, or `npx sessioncost` with npm: see
[Which command to type](/sessioncost-help/start/install/#which-command-to-type-in-a-terminal).

| Command | What it does |
|---|---|
| `sessioncost` | The report of the newest chat of this folder's project, from any agent. |
| `sessioncost list` | Your recent chats here: when, which agent, the chat id, cost, turns, the first message. `--limit 20` for more. |
| `sessioncost 3f2a9c1e` | The report of one chat: the first characters of its id from `sessioncost list`, or the path of a session file. |
| `sessioncost setup` | Adds `/sessioncost` to every agent it finds. Restart the agents. |
| `sessioncost clean` | Deletes the reports of older chats and keeps the latest. |
| `sessioncost update` | Updates every copy. `--dry-run` shows the steps without running them. |
| `sessioncost version` | This copy's version, and how many other copies are on this computer. `--all` lists every copy (terminal, each agent's plugin, each `/sessioncost` from setup) with its version and names the ones that differ. |
| `sessioncost auto off` | Stops rebuilding each chat's report after each answer. `sessioncost auto on` starts it again. |

## The report keeps itself up to date

After each answer, SessionCost rebuilds that chat's report on your computer, at most once a minute. Press F5 on the
open report to see the latest. It uses no AI model, sends nothing, and adds no text the agent reads; the first time
in a chat, you see one line saying where the report is. It is on by default and does not turn the guard on.

It works in every agent your install set up (the guard's hooks give SessionCost a signal at the end of each answer).

## Options for a report

Add any of these after `sessioncost` or after a chat id. They combine, for example `sessioncost --no-open --subscription`.

| Option | What it does |
|---|---|
| `--project FOLDER` | The newest chat of another project folder. |
| `--no-open` | Writes the report but does not open the browser. |
| `--brief` | Prints only the report's path. |
| `--subscription` | On a monthly plan (Claude Pro or Max, ChatGPT), money is labelled what it would cost at API prices. |
| `--cursor-usage usage.csv` | Cursor only: your usage export, for exact tokens. It is also picked up from Downloads by itself. |
| `--prices my-prices.json` | Your own prices laid over the built-in ones. |
| `--json` | Every number as JSON. It is long: send it to a file, `sessioncost --json > out.json`. |
| `--sarif FILE` | The risky steps (and the guard's decisions) as SARIF 2.1.0, for security tools. |
| `--version` | The installed version. |
| `--help` | Every command and option. |

## The guard

The guard's terminal commands are on [Guard settings](/sessioncost-help/guard/settings/).
