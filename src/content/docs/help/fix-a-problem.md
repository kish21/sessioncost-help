---
title: Fix a problem
description: The common problems and their fixes.
---
## `/sessioncost` does nothing

Restart the agent after installing. Agents read their skills when they start.

## "sessioncost is not recognized" (Windows)

Use `python -m sessioncost` instead of `sessioncost`. This is common with the Microsoft Store Python.

## Windows says scripts are disabled

Run the install line this way instead:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://raw.githubusercontent.com/kish21/sessioncost/main/install.ps1 | iex"
```

## "git not found" when adding the plugin

Use [way A of Install SessionCost](/sessioncost-help/start/install/#way-a-one-line-no-python-or-git-needed) instead. It needs neither Git nor Python.

## Cursor shows no plugin after adding the repository

Some Cursor versions import a repository without listing its plugins. Use
[way A of Install SessionCost](/sessioncost-help/start/install/#way-a-one-line-no-python-or-git-needed).

## Update

- **Any install:** `/sessioncost update` in a chat, or `sessioncost update` in a terminal, then restart your agent.
  Pasting the install line again works too.
- **Installed with pip:** `python -m pip install -U sessioncost`, then `python -m sessioncost setup`.
- **Claude Code plugin:** `/plugin` → **Marketplaces** → sessioncost → **Update**, then restart Claude Code. Or turn on
  **Enable auto-update** there once.

## The guard asked or blocked something it should not have

Say no (or let it stay blocked) and carry on. If a step your project needs keeps being asked, list it in the project's
`.sessioncost-allow` file. See [Guard settings](/sessioncost-help/guard/settings/).

## Still stuck?

Open an issue on [GitHub](https://github.com/kish21/sessioncost/issues).
