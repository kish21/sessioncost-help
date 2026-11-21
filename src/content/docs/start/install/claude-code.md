---
title: Install in Claude Code
description: Install the SessionCost plugin in Claude Code (VS Code or CLI), check it works, keep it up to date or remove it.
audience: everyone
---

The plugin brings two commands into Claude Code: **`/sessioncost`** (where your chat's tokens went) and
**`/liveguard`** (the guard). The guard is on as soon as it is installed. It needs [Git](https://git-scm.com/downloads).
Python is fetched by itself the first time.

Use one way per agent: the plugin and the [one-line install](/sessioncost-help/start/install/) together would give
Claude Code two `/sessioncost`. The VS Code extension and the CLI share one install.

## Install

| | **Claude Code in VS Code** | **Claude Code CLI** |
|---|---|---|
| **1. Open the plugin menu** | In the Claude Code panel, open **Manage Plugins** | Type `/plugin` |
| **2. Add SessionCost's source** | **Marketplaces** tab: paste `kish21/sessioncost`, click **Add** | The same |
| **3. Install the plugin** | **Plugins** tab: type `sessioncost` in **Search plugins…**, click **Install**, choose **user** | The same |
| **4. Reload** | Ctrl+Shift+P (Mac: Cmd+Shift+P) → **Developer: Reload Window** | Quit and start `claude` again |
| **5. Check it worked** | Open a **new** chat and type `/`: **/sessioncost** and **/liveguard** are in the list | The same |

In step 3, search: the list is sorted by installs, so SessionCost sits far down without it. Choose **user** (every
folder), not **project** or **local**: those give SessionCost to one folder only. In step 5 the commands may show as
`/sessioncost:sessioncost` and `/sessioncost:liveguard`.

### Or one line in a terminal

Open a terminal (**Windows:** Windows key, type `powershell`, Enter. **Mac:** Cmd + Space, type `terminal`, Enter),
paste this and press Enter:

```sh
claude plugin install sessioncost --marketplace kish21/sessioncost --scope user
```

It ends with `✔ Successfully installed plugin: sessioncost@sessioncost (scope: user)`. Then do steps 4 and 5.

## Keep it up to date

| **Claude Code in VS Code** | **Claude Code CLI** |
|---|---|
| In a terminal: `claude plugin update sessioncost@sessioncost`, then reload | Once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update** |

## Remove it

Say **"remove SessionCost"** in a chat: your agent gives you one command to paste into a terminal (it cannot run it itself). The command lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then take out the plugin in a terminal: `claude plugin uninstall sessioncost@sessioncost`, and reload.

## It does not show up?

| What you see | What to do |
|---|---|
| `claude` is not recognized | Only the VS Code extension is installed. Use the plugin menu (steps 1-5), or the [one-line install](/sessioncost-help/start/install/). |
| `git` is not found | Install [Git](https://git-scm.com/downloads), open a new terminal, and try again. |
| Installed, but no `/sessioncost` | The chat was open before the install. Reload and open a **new** chat. |
| Works in one folder only | It was installed for one folder. `claude plugin install sessioncost@sessioncost --scope user`, reload, new chat. |
| Claude Code older than 2.1.275 | `claude plugin marketplace add kish21/sessioncost`, then `claude plugin install sessioncost@sessioncost --scope user`. |
