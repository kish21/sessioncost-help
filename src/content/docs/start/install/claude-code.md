---
title: Install in Claude Code
description: Install the SessionCost plugin in Claude Code from the plugin menu or with one command. It brings /sessioncost, /liveguard and the guard's hooks.
audience: everyone
---

The plugin brings `/sessioncost`, `/liveguard` and the guard's hooks by itself, and needs Git. No Python? The first
`/sessioncost` or `/liveguard` fetches one. Use one way per agent: the plugin and the
[one-line install](/sessioncost-help/start/install/) together would give Claude Code two `/sessioncost`.

## From Claude Code's plugin menu

1. Open **Manage Plugins** (in VS Code: the Claude Code panel's plugin menu; in the CLI: type `/plugin`).
2. **Marketplaces** tab: paste `kish21/sessioncost` and click **Add**.
3. **Plugins** tab: type `sessioncost` in **Search plugins…** (the list is sorted by installs, so it sits far down
   without a search), then click **Install**. Where it asks where to install, choose **user** (every folder), not
   **project** or **local**: those give SessionCost to one folder only.
4. Reload VS Code (Ctrl+Shift+P → **Developer: Reload Window**) or restart the CLI, open a **new** chat and type
   `/`: **/sessioncost** and **/liveguard** are in the list (they may show as `/sessioncost:sessioncost` and
   `/sessioncost:liveguard`).

## Or one command in a terminal

```sh
claude plugin install sessioncost --marketplace kish21/sessioncost --scope user
```

It ends with `✔ Successfully installed plugin: sessioncost@sessioncost (scope: user)`. Reload VS Code or restart the
CLI, then open a new chat. The CLI and VS Code share one install.

## It does not show up?

| What you see | What to do |
|---|---|
| `claude` is not recognized | Only the VS Code extension is installed. Use the [one-line install](/sessioncost-help/start/install/). |
| `git` is not found | Install [Git](https://git-scm.com/downloads) and open a new terminal, or use the one-line install. |
| Installed, but no `/sessioncost` | The chat was open before the install. Reload and open a **new** chat. |
| Works in one folder only | It was installed for one folder. `claude plugin install sessioncost@sessioncost --scope user`, reload, new chat. |
| Claude Code older than 2.1.275 | `claude plugin marketplace add kish21/sessioncost`, then `claude plugin install sessioncost@sessioncost --scope user`. |

**New versions:** in the CLI, once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update**. In VS Code:
`claude plugin update sessioncost@sessioncost` in a terminal.
