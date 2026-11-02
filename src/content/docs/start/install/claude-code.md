---
title: Install in Claude Code (plugin)
description: One command installs the Claude Code plugin with /sessioncost, /livesession and the guard. Or use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) already covers Claude Code. The plugin is the other way:
it brings `/sessioncost`, `/livesession` and the guard's hooks by itself, and needs Git. No Python? The first
`/sessioncost` or `/livesession` fetches one.

## Install from Claude Code's plugin menu

1. Open **Manage Plugins** (in VS Code: the Claude Code panel's plugin menu; in the CLI: type `/plugin`).
2. **Marketplaces** tab: paste `kish21/sessioncost` and click **Add**.
3. **Plugins** tab: type `sessioncost` in **Search plugins…** (the list is sorted by installs, so it sits far down
   without a search), then click **Install**.
4. Reload VS Code (Ctrl+Shift+P → **Developer: Reload Window**) or restart the CLI, open a **new** chat and type
   `/`: **/sessioncost** and **/livesession** are in the list (they may show as `/sessioncost:sessioncost` and
   `/sessioncost:livesession`).

Adding the marketplace (step 2) only lists the plugin; step 3 installs it.

## Or: one command in a terminal

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
| You added the marketplace and cannot find the plugin | It is in the **Plugins** tab under **Available**, far down: type `sessioncost` in **Search plugins…** and click **Install**. Adding a marketplace only lists the plugin; it does not install it. |
| Your Claude Code is older than 2.1.275 (`claude --version`) | Use two steps: `claude plugin marketplace add kish21/sessioncost`, then `claude plugin install sessioncost@sessioncost`. |

**New versions:** in the CLI, once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update**. In VS Code: in
a terminal, `claude plugin update sessioncost@sessioncost`.

[Back to Install](/sessioncost-help/start/install/)
