---
title: Install in Antigravity
description: Put SessionCost into Antigravity with the one-line install or the command-line plugin, check it works, turn the guard on and keep it up to date.
audience: everyone
---

SessionCost brings two commands into Antigravity: **`/sessioncost`** (where your chat's tokens went) and
**`/liveguard`** (the guard). Pick one way:

| | **One-line install** (recommended) | **Command-line plugin** |
|---|---|---|
| **Covers** | The Antigravity app and its command line, and every other agent on this computer | Antigravity only |
| **Needs** | Nothing | [Git](https://git-scm.com/downloads); Python is fetched by itself the first time |
| **1. Install** | Follow [Install in one line](/sessioncost-help/start/install/) | In a terminal: `agy plugin install https://github.com/kish21/sessioncost` |
| **2. Check it worked** | Restart Antigravity, open a **new** chat and type `/`: **/sessioncost** and **/liveguard** are in the list | The same |
| **3. Turn the guard on** | Already on | Type `/liveguard`, then restart Antigravity once |
| **Keep it up to date** | `/sessioncost update` in a chat | `/sessioncost update` in a chat, or install again the same way |

Use one way only: both together would give Antigravity two `/sessioncost`.

To open a terminal: **Windows:** Windows key, type `powershell`, Enter. **Mac:** Cmd + Space, type `terminal`, Enter.

You can see the guard's hooks under **Customizations → Hooks**.

## Remove it

Say **"remove SessionCost"** in a chat: your agent gives you one command to paste into a terminal (it cannot run it itself). The command lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then restart Antigravity.
