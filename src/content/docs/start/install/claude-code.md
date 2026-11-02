---
title: Install in Claude Code (plugin)
description: The Claude Code plugin brings /sessioncost, /livesession and the guard. Or use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) already covers Claude Code. The plugin is the other way:
it brings `/sessioncost`, `/livesession` and the guard's hooks by itself, and needs Python 3.10 or newer and Git.

| Where you use it | Plugin install |
|---|---|
| **Claude Code CLI** (`claude` in a terminal) | In the chat: `/plugin marketplace add kish21/sessioncost`, then `/plugin install sessioncost@sessioncost`. Or type `/plugin`, open **Marketplaces**, add `kish21/sessioncost`, and install **sessioncost** from the **Plugins** tab. |
| **Claude Code in VS Code** (the chat panel) | It has no `/plugin`. In a terminal: `claude plugin marketplace add kish21/sessioncost`, then `claude plugin install sessioncost@sessioncost`. Then reload VS Code (Ctrl+Shift+P → **Developer: Reload Window**). |

Both share one install: do it once, and the CLI and VS Code both have it.

**New versions:** in the CLI, once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update**. In VS Code: in
a terminal, `claude plugin update sessioncost@sessioncost`.

[Back to Install](/sessioncost-help/start/install/)
