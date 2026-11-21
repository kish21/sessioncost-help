---
title: Install in Cursor
description: Install the SessionCost plugin in Cursor from GitHub, check it works, turn the guard on and keep it up to date.
audience: everyone
---

The plugin brings two commands into Cursor: **`/sessioncost`** (where your chat's tokens went) and **`/liveguard`**
(the guard). It needs [Git](https://git-scm.com/downloads). Python is fetched by itself the first time. No terminal
needed.

Use one way per agent: the plugin and the [one-line install](/sessioncost-help/start/install/) together would give
Cursor two `/sessioncost`.

## Install

1. Open **Customize → Plugins** and choose **From GitHub Repository** (or **Add Marketplace**).
2. Paste `https://github.com/kish21/sessioncost` and install **sessioncost**.
3. Restart Cursor.

## Check it worked

Open a **new** chat and type `/`: **/sessioncost** and **/liveguard** are in the list.

## Turn the guard on

Type `/liveguard`. The first time, it puts the guard into Cursor and asks you to restart Cursor once.

To turn it off later, type `/liveguard off` in another agent's chat, or `sessioncost guard off` in a terminal:
Cursor's hooks cannot read the chat, so saying it in Cursor does not reach the guard.

## Keep it up to date

**Customize** → the marketplace with SessionCost → **Refresh**, then restart Cursor.

## Remove it

Say **"remove SessionCost"** in a chat: your agent gives you one command to paste into a terminal (it cannot run it itself). The command lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then restart Cursor.

## It does not show up?

| What you see | What to do |
|---|---|
| No plugin to install after step 2 | Use the [one-line install](/sessioncost-help/start/install/) instead. |
| Installed, but no `/sessioncost` | The chat was open before the install. Restart Cursor and open a **new** chat. |
