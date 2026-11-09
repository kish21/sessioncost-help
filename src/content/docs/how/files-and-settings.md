---
title: Files and settings
description: Every file SessionCost writes and where, the guard's switches, project allow rules, and the guard's log.
audience: technical
---
Commands on this page run in a terminal. Type them the way that matches
[how you installed](/sessioncost-help/start/install/#which-command-to-type-in-a-terminal).

## What SessionCost writes, and where

**Its own folder, `~/.sessioncost/`**

| Path | What it holds |
|---|---|
| `reports/` | One report file per chat, and `guard.html` from `sessioncost guard report`. `sessioncost clean` deletes the older ones. |
| `guard/config.json` | The switches on this page: guard on or off, strict, allow-list, fail-closed, auto reports, fix auto. |
| `guard/` (other files) | The guard's log, one file per chat, each with a small `.lock` file. |
| `guard/projects/` | Allow rules you added from the chat with `/livesession allow`, per project. |
| `guard/look-up-sites.txt` | Your own list of look-up sites, if you made one. |
| `fixes/` | What was fixed in each project and when, and what later chats showed (to tell you what a fix saved). |
| `backups/<project>/` | Each file as it was before a fix, for `sessioncost fix --undo`. |
| `handover/<project>.md` | The newest handover your agent wrote for that project. |
| `prices.json` | Your own prices, if you made one. |
| `npm/venv/` | The program itself, when installed with npm. |

**In each agent's folder** (added by setup or the plugin)

| Agent | Commands (skills) | Guard hooks |
|---|---|---|
| Claude Code | `~/.claude/skills/` | `~/.claude/settings.json` |
| Codex | `~/.codex/skills/` | `~/.codex/hooks.json` |
| Cursor | `~/.cursor/skills/` | `~/.cursor/hooks.json` |
| Antigravity | `~/.gemini/config/skills/` | `~/.gemini/config/hooks.json` |
| Copilot (CLI and VS Code) | `~/.copilot/skills/` | `~/.copilot/hooks/sessioncost-guard.json` |

Setup keeps your other hooks, and saves a copy of the old hooks file next to it. With a plugin, the commands and
hooks live in the agent's plugin folder instead.

**In your project**: only what you said yes to. A fix writes a rule into the agent's rules file (for example
`CLAUDE.md` or `AGENTS.md`) or a setting into `.claude/settings.local.json`. `.sessioncost-allow` is yours to write.

## The guard's switches

| Command | What it does |
|---|---|
| `sessioncost guard` | Is it on? |
| `sessioncost guard on` | Guards every chat, open ones from their next step, until you turn it off. The same switch as `/livesession`. Add `strict` for the stricter mode. |
| `sessioncost guard off` | Off for every chat, as `/livesession off` does. The logs are kept. |
| `sessioncost guard allow-list on` | Every step that changes something asks you, unless `.sessioncost-allow` lists it. Reads and searches still go ahead. `off` goes back to asking only for risky steps. |
| `sessioncost guard fail-closed on` | If the guard itself breaks, or gets a step it cannot read, every step is blocked until it is fixed. `off` lets ordinary steps pass; the never list stays blocked. |
| `sessioncost guard auto on` | Guards every chat and builds its report after each answer. |
| `sessioncost auto off` | Stops rebuilding reports after each answer (on by default, without the guard). `auto on` starts it again. |
| `sessioncost guard setup codex` | Adds the guard to one agent again (`claude`, `codex`, `cursor`, `antigravity`, `copilot`). Every install already does this; use it to repair one. |

## Allow steps in a project

**From the chat.** When the guard asks about a step that is normal for your project, its question ends with the exact
line to send, for example `/livesession allow git_push git push origin main`. Send it as your own message. The rule is
saved outside your repository, in `~/.sessioncost/guard/projects/`. `/livesession allow` lists the project's rules;
`/livesession allow --clear` removes them.

**In a file.** A project can list the steps it expects in `.sessioncost-allow` in its folder. Steps it lists are only
written to the log, not asked. One step per line: a mark, spaces, then a pattern for the command, the file or the
tool name (`*` is a wildcard). The marks are the checks on [What the guard checks](/sessioncost-help/guard/checks/);
`step` is what allow-list mode lets through.

```
step             pytest *
step             npm run build
git_push         git push origin feature/*
outside_project  ~/.claude/projects/*/memory/*
```

- **The agent cannot add rules**, in the file or from the chat: only you can.
- **Secrets can never be allowed from the chat**, and changing the guard cannot be allowed at all. Other never-list
  marks (such as `force_push`) can be listed in the file: only on purpose, with a narrow pattern.
- **A rule covers one step, never the steps chained to it.** In `rm -rf build && rm -rf src`, a rule for
  `rm -rf build*` covers the first delete; the second still asks. A `;` or `|` inside quotes is not a chain.

## Look-up sites

Reading a well-known look-up site (language docs, PyPI, npm, GitHub, Read the Docs and others) or localhost asks
nothing. To use your own list instead, put one site per line in `~/.sessioncost/guard/look-up-sites.txt`.

## The guard report

`sessioncost guard report` writes one page for all guarded chats and agents: what was blocked and asked and why, by
agent, project and day, and whether each chat's log is still intact. Add `--json` for the numbers.

## The guard's log

Every decision is written to `~/.sessioncost/guard/`, one file per chat. Each line is chained to the one before by a
SHA-256 hash, so a changed or removed line shows. When two steps of one chat are written at the same moment, they
take turns (that is what the `.lock` file is for). The report and the guard report check each log:

| The report says | What it means | What to do |
|---|---|---|
| untouched | Every line checks out. A log with no lines yet counts as untouched too. | Nothing. |
| edited | A line was changed or removed after it was written, or a line is not a guard entry. | Ask who could reach the file. Lines before the change can still be trusted; those after it cannot be proven. |
| cut off | A line was not written in full, as when the computer stopped in the middle of a step. | Usually harmless. The next line is marked as following a cut-off line. The log is never shown as untouched. |
| could not be read | No permission to open the file, or it is not a file. | Check the file's permissions. |

The guard never repairs or empties a log: what was written stays as it was.
