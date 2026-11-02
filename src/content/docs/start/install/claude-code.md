---
title: Install in Claude Code (plugin)
description: One command installs the Claude Code plugin with /sessioncost, /livesession and the guard. Or use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) already covers Claude Code. The plugin is the other way:
it brings `/sessioncost`, `/livesession` and the guard's hooks by itself, and needs Git. No Python? The first
`/sessioncost` or `/livesession` fetches one.

## Install: one command

Open a terminal (**Windows:** press the Windows key, type `powershell`, press Enter) and type:

```sh
claude plugin install sessioncost --marketplace kish21/sessioncost
```

It adds SessionCost's marketplace and installs the plugin in one go. It ends with
`✔ Successfully installed plugin: sessioncost@sessioncost`. Then:

- **VS Code:** reload the window (Ctrl+Shift+P → **Developer: Reload Window**).
- **Claude Code CLI** (`claude` in a terminal): start it again.

Open a **new** chat and type `/`: **/sessioncost** and **/livesession** are in the list (they may show as
`/sessioncost:sessioncost` and `/sessioncost:livesession`). The CLI and VS Code share one install.

In the Claude Code CLI you can also type it in the chat: `/plugin install sessioncost --marketplace kish21/sessioncost`.

## It does not show up?

| You see | What happened, what to do |
|---|---|
| `claude` is not recognized | Only the VS Code extension is installed, without Claude Code's command line. Use the [one-line install](/sessioncost-help/start/install/) instead: it gives Claude Code the same two commands. |
| `git` is not found | A plugin is downloaded with Git. Install [Git](https://git-scm.com/downloads), open a new terminal, and run the command again, or use the one-line install. |
| Installed, but no `/sessioncost` in the chat | The chat was open before the install. Reload VS Code (or restart the CLI) and open a **new** chat. |
| You added the marketplace earlier (`claude plugin marketplace add …`) and nothing showed | Adding a marketplace only lists the plugin; it does not install it. Run the command above: it installs it. |
| Your Claude Code is older than 2.1.275 (`claude --version`) | Use two steps: `claude plugin marketplace add kish21/sessioncost`, then `claude plugin install sessioncost@sessioncost`. |

**New versions:** in the CLI, once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update**. In VS Code: in
a terminal, `claude plugin update sessioncost@sessioncost`.

[Back to Install](/sessioncost-help/start/install/)
