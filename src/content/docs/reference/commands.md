---
title: Commands
description: Every SessionCost command and option, what it does and what you should see.
---
On Windows, if `sessioncost` is not found, type `python -m sessioncost` instead (for example
`python -m sessioncost list`).

## In a chat

Type these to your agent. In Claude Code with the plugin they may show as `/sessioncost:sessioncost`.

| Type | What it does | Since |
|---|---|---|
| `/sessioncost` | Builds the report of this chat and gives you its link. | 0.5.15 (one-line answer from 0.6.0) |
| `/sessioncost clean` | Deletes the reports of older chats and keeps the latest. | 0.5.15 |
| `/sessioncost update` | Updates every copy of SessionCost on this computer. Restart your agent afterwards. | 0.5.15 |
| `/livesession` | Claude Code: turns the [guard](/sessioncost-help/guard/what-it-does/) on for this chat, from your next message. | 0.6.0 |
| `/livesession strict` | The same, stricter: outside content stays untrusted for the whole chat. | 0.6.0 |
| `/livesession off` | Shows the line for you to type to turn the guard off. | 0.6.0 |

## In a terminal

Run from the project folder whose chats you want to see.

| Command | What it does |
|---|---|
| `sessioncost` | The report of the newest chat of this folder's project, from any agent. |
| `sessioncost list` | Your recent chats here: when, which agent, the chat id, cost, turns, the first message. `--limit 20` for more. |
| `sessioncost 3f2a9c1e` | The report of one chat: the first characters of its id from `sessioncost list`, or the path of a session file. |
| `sessioncost setup` | Adds `/sessioncost` to every agent it finds. Restart the agents. |
| `sessioncost clean` | Deletes the reports of older chats and keeps the latest. |
| `sessioncost update` | Updates every copy. `--dry-run` shows the steps without running them. |

## Options for a report

Add any of these after `sessioncost` or after a chat id. They combine, for example `sessioncost --no-open --subscription`.

| Option | What it does | Since |
|---|---|---|
| `--project FOLDER` | The newest chat of another project folder. | 0.5.15 |
| `--no-open` | Writes the report but does not open the browser. | 0.5.15 |
| `--brief` | Prints only the report's path. | 0.6.0 |
| `--subscription` | On a monthly plan (Claude Pro or Max, ChatGPT), money is labelled what it would cost at API prices. | 0.5.15 |
| `--cursor-usage usage.csv` | Cursor only: your usage export, for exact tokens. It is also picked up from Downloads by itself. | 0.5.15 |
| `--prices my-prices.json` | Your own prices laid over the built-in ones. | 0.5.15 |
| `--json` | Every number as JSON. It is long: send it to a file, `sessioncost --json > out.json`. | 0.5.15 |
| `--sarif FILE` | The risky steps (and the guard's decisions) as SARIF 2.1.0, for security tools. | 0.6.0 |
| `--version` | The installed version. | 0.5.15 |
| `--help` | Every command and option. | 0.5.15 |

## The guard

The guard's terminal commands are on [Guard settings](/sessioncost-help/guard/settings/).
