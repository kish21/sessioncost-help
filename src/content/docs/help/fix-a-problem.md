---
title: Fix a problem
description: The common problems and their fixes.
audience: everyone
---
## `/sessioncost` does nothing

Restart the agent after installing. Agents read their skills when they start.

## "No chat found for …"

SessionCost looks for chats whose folder is the one you run it in. The message lists where it looked (Claude Code,
Codex, Copilot CLI, VS Code Copilot Chat, Antigravity and Cursor). Run it in the folder you opened your agent in, or
name that folder: `sessioncost --project <folder>`.

## "sessioncost is not recognized" (Windows)

Use `python -m sessioncost` instead of `sessioncost`. This is common with the Microsoft Store Python.

## Windows says scripts are disabled

Run the install line this way instead:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://raw.githubusercontent.com/kish21/sessioncost/main/install.ps1 | iex"
```

## "git not found" when adding the plugin

Use [the one-line install](/sessioncost-help/start/install/#install-in-one-line) instead. It needs neither Git nor Python.

## Cursor shows no plugin after adding the repository

Some Cursor versions import a repository without listing its plugins. Use
[the one-line install](/sessioncost-help/start/install/#install-in-one-line).

## Update

- **Any install:** `/sessioncost update` in a chat, or `sessioncost update` in a terminal, then restart your agent.
  Pasting the install line again works too.
- **Installed with pip:** `python -m pip install -U sessioncost`, then `python -m sessioncost setup`.
- **Claude Code plugin:** `/plugin` → **Marketplaces** → sessioncost → **Update**, then restart Claude Code. Or turn on
  **Enable auto-update** there once.

## The guard asked or blocked something it should not have

Say no (or let it stay blocked) and carry on. If a step your project needs keeps being asked, say "allow it" right
after the guard's question (or send the `/liveguard allow …` line it ends with): that step stops asking in this
project. See [Stay safe](/sessioncost-help/use/stay-safe/#it-asks-about-a-normal-step).

## `/sessioncost` shows up twice in the list

That agent got SessionCost two ways, for example its plugin and the one-line install. Use one way per agent.

## Uninstall

Run `sessioncost uninstall` in a terminal (not in an agent chat — LiveGuard blocks agents from removing it). It removes
SessionCost and LiveGuard cleanly in one go: hooks, skills, plugins, editor extensions, package, and data. Full guide:
[Uninstall SessionCost](/sessioncost-help/start/uninstall/).

## Still stuck?

Open an issue on [GitHub](https://github.com/kish21/sessioncost/issues).
