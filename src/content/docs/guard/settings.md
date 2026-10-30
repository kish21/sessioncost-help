---
title: Guard settings
description: Turn the guard on for every chat, add it to other agents, and choose how strict it is.
---

Run these in a terminal. On Windows, if `sessioncost` is not found, use `python -m sessioncost`.

## On and off

| Command | What it does |
|---|---|
| `sessioncost guard` | Is it on? |
| `sessioncost guard on` | Guards every new chat. Add `strict` for the stricter mode. |
| `sessioncost guard start` | Guards only the chat you are in, from your next message (what `/livesession` runs). |
| `sessioncost guard off` | Turns it off. The logs are kept. |
| `sessioncost guard auto on` | Guards every chat and builds its report after each answer, with nothing to type. `auto off` stops the reports. |

## How strict

| Command | What it does |
|---|---|
| `sessioncost guard allow-list on` | Every step that changes something asks you, unless the project's `.sessioncost-allow` lists it. Reads and searches still go ahead. `off` goes back to asking only for risky steps. |
| `sessioncost guard fail-closed on` | If the guard itself breaks, every step is blocked until it is fixed. `off` lets ordinary steps pass while the never list stays blocked. |

### The allow file

A project can list the steps it expects in a file called `.sessioncost-allow` in its folder. Steps it lists are only
written to the log, not asked. The agent cannot change this file: only you can.

## Other agents

| Command | What it does |
|---|---|
| `sessioncost guard setup codex` | Adds the guard to Codex. Also `cursor` and `antigravity`. |

Claude Code gets the guard with the plugin. The setup changes that agent's hooks file; your other hooks are kept and a
copy of the old file is saved next to it. Then `sessioncost guard on` switches it on there. These agents have no
`/livesession`.

## The guard report

`sessioncost guard report` writes one page for all guarded chats and agents: what was blocked and asked and why, by
agent, project and day, and whether each chat's log is still intact. Add `--json` for the numbers.

## Where the log is

Every decision is written to `~/.sessioncost/guard/`, one file per chat. Each line is chained to the one before by a
SHA-256 hash, so a changed or removed line shows.
