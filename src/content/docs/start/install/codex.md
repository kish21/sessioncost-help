---
title: Install in Codex
description: Install the SessionCost plugin in the Codex app or the Codex CLI, check it works, turn the guard on, update or remove it.
audience: everyone
---

The plugin brings two commands into Codex: **`/sessioncost`** (where your chat's tokens went) and **`/liveguard`**
(the guard). It needs [Git](https://git-scm.com/downloads). Python is fetched by itself the first time.

Use one way per agent: the plugin and the [one-line install](/sessioncost-help/start/install/) together would give
Codex two `/sessioncost`.

## Before you start: open a terminal

One step is typed in a terminal, for the Codex app too: the app has no button to add a plugin source.

- **Windows:** press the Windows key, type `powershell`, press Enter.
- **Mac:** press Cmd + Space, type `terminal`, press Enter.

A terminal already showing Codex's chat will not do: open a new window.

## Install

| | **Codex app** | **Codex CLI** |
|---|---|---|
| **1. Add SessionCost's source** | In the terminal, paste and press Enter:<br/>`codex plugin marketplace add kish21/sessioncost` | The same line, in the terminal |
| **2. Install the plugin** | Open **Customize → Plugins**, choose **sessioncost**, click **Install plugin** | Type `codex` to start it, then `/plugins`, pick **sessioncost**, install it |
| **3. Check it worked** | Start a **new** chat and type `/`: **/sessioncost** and **/liveguard** are in the list | The same, in a new chat |
| **4. Turn the guard on** | Type `/liveguard`. Restart the app once, then type `/hooks` and trust SessionCost's hooks | The same: `/liveguard`, restart `codex`, `/hooks` |

Codex asks you to trust every new hook once; that is why step 4 has `/hooks`.

## Keep it up to date

Codex looks for a new version each time it starts. To fetch it now, in a terminal:

```sh
codex plugin marketplace upgrade sessioncost
```

Then restart Codex.

## Remove it

Turn the plugin off in **Customize → Plugins** (app) or `/plugins` (CLI), then remove the source in a terminal:

```sh
codex plugin marketplace remove sessioncost
```

## It does not show up?

| What you see | What to do |
|---|---|
| `codex` is not recognized | Only the Codex app is installed, without its command line. Use the [one-line install](/sessioncost-help/start/install/) instead. |
| `git` is not found | Install [Git](https://git-scm.com/downloads), open a new terminal, and paste step 1 again. |
| **sessioncost** is not in Plugins | Restart Codex after step 1, then look again. |
| Installed, but no `/sessioncost` | The chat was open before the install. Start a **new** chat. |
| The guard does nothing | Type `/hooks` and trust SessionCost's hooks, then restart Codex. |
