---
title: Commands and options
description: Every SessionCost command and option, what it does and what you should see.
audience: technical
---
On Windows, if `sessioncost` is not found, type `python -m sessioncost` instead (for example
`python -m sessioncost list`).

## In a chat

You never have to type a command. **Say the words** in the first column (typed or spoken) to your agent, in any
agent SessionCost set up (Claude Code, Codex, Cursor, Antigravity, Copilot). If you prefer typing, the command in
the second column does the same. In Claude Code with the plugin they may show as `/sessioncost:sessioncost`.

Every line SessionCost shows in the chat names its words too, for example the tip at the end of a reply:
*💡 SessionCost: … Say "fix it" (or type /sessioncost fix) to fix these.* A bare "yes" never runs a fix: it answers
your agent's own question.

### The ones you need

| Say | Or type | What it does |
|---|---|---|
| "Show my report" or "where did my tokens go?" | `/sessioncost` | Builds the report of this chat, gives you its link and names the top fix. |
| "Fix it" | `/sessioncost fix` | After a 💡 tip: applies the fixes it named, after a backup. |
| "Allow it" | `/liveguard allow …` | After the guard asked about a step that is normal here: it stops asking about that step in this project. Secrets and never-list steps cannot be allowed. |
| "Turn the guard off" | `/liveguard off` | The [guard](/sessioncost-help/use/stay-safe/) is on from install, in every chat and every agent. This turns it off. Only your own message turns it off, and only when these words are the whole message: the agent cannot. |
| "Turn the guard on" | `/liveguard` | Turns the guard back on. |

### Optional

| Say | Or type | What it does |
|---|---|---|
| "Fix my token waste" | `/sessioncost fix` | This project's token waste as a to-do list, with the change for each. Say "fix it" (or "fix 1 and 3") to apply, after a backup. |
| "Undo the fix" | `/sessioncost fix --undo` | Puts back the newest fix, unless you changed the file since. |
| "Write a handover" | `/sessioncost fix` | After the long-chat tip: your agent writes a handover so you can start a fresh chat. There, say "continue from handover". |
| "Turn token tips off" / "on" | `/sessioncost fix auto off` / `on` | The live tips. They are on from install: after each answer that wasted tokens, the last line of the next reply names it. |
| "Warn me at 150k tokens" | `/sessioncost fix long-chat 150k` | When a chat counts as long (100k by default). |
| "Set my budget to $5" / "clear my budget" | `/sessioncost fix budget 5` / `off` | A dollar ceiling per chat for the handover tip. |
| "Guard strict" | `/liveguard strict` | The guard, stricter: outside content stays untrusted for the whole chat. |
| "Show my allowed steps" / "clear my allowed steps" | `/liveguard allow --list` / `--clear` | This project's allow rules. |
| "Show my prices" | `/sessioncost prices` | The prices in use, where each one came from and the day the list was checked. You can also give your own prices in your own words ("Opus: 4 input, 20 output"). See [your own prices](/sessioncost-help/reference/money/#your-own-prices). |
| "Update the prices" | `/sessioncost prices update` | Fetches SessionCost's newest checked price list. This is the only command that goes online, and it runs only when you ask for it. |
| "Update SessionCost" | `/sessioncost update` | Updates every copy of SessionCost on this computer. Restart your agent afterwards. |
| "Which version do I have?" | `/sessioncost version` | Shows which SessionCost version this agent uses, and how many other copies are on this computer. |
| "Delete my old reports" | `/sessioncost clean` | Deletes the reports of older chats and keeps the latest. |
| "Turn the report after each answer off" | `/sessioncost auto off` | Stops rebuilding the report after each answer. `on` starts it again. |

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
| `sessioncost prices` | The prices in use, where each one came from and the day the list was checked. |
| `sessioncost prices set <model> --input X --output Y` | Sets your own price for one model, in US dollars per million tokens. `--cache-read` and `--cache-write` are optional. |
| `sessioncost prices import <file>` | Imports your prices from a `.csv` (columns `model, input, output, cache_read, cache_write`) or a `.json` file. |
| `sessioncost prices team <file>` | Uses a price file your team shares. It is read again for every report. `team off` stops using it. |
| `sessioncost prices update` | Fetches SessionCost's newest checked price list. This is the only command that goes online. |

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

The guard's terminal commands are on [Files and settings](/sessioncost-help/how/files-and-settings/#the-guards-switches).
The fix commands for long chats (`fix long-chat`, `fix budget`, `fix --handover`) are on
[Long chats and handover](/sessioncost-help/use/long-chats/#choose-when-a-chat-counts-as-long).
