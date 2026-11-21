---
title: Install for GitHub Copilot
description: The one-line install, npm or Python finds Copilot Chat in VS Code and Copilot CLI and adds /sessioncost and /liveguard.
audience: everyone
---

Copilot has no SessionCost plugin. Use the [one-line install](/sessioncost-help/start/install/),
[Node (npm)](/sessioncost-help/start/install/npm/) or [Python](/sessioncost-help/start/install/python/): each finds
Copilot Chat in VS Code and Copilot CLI, even when Copilot is your only agent. It prints
`Copilot  /sessioncost and /liveguard added` and `live guard ready`.

## Check it worked

| | **Copilot Chat in VS Code** | **Copilot CLI** |
|---|---|---|
| **1. Restart** | Restart VS Code | Quit and start Copilot CLI again |
| **2. Find the commands** | Switch Copilot Chat to **Agent** mode and type `/`: **/sessioncost** and **/liveguard** are in the list | Type `/`: the same two are in the list |
| **3. See your report** | Say "show my report" (or type `/sessioncost`): the report of your Copilot chat opens | The same |

The guard is already on, for Copilot and every other agent on this computer. Say "turn the guard off" (or type
`/liveguard off`) to turn it off.

## Keep it up to date

Type `/sessioncost update` in a chat, then restart VS Code or Copilot CLI.

## Remove it

Say **"remove SessionCost"** in a chat: your agent gives you one command to paste into a terminal (it cannot run it itself). The command lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then restart VS Code or Copilot CLI.

## It does not show up?

| What you see | What to do |
|---|---|
| No `/sessioncost` in Copilot Chat | Switch the chat to **Agent** mode; the commands are not offered in Ask or Edit mode. |
| The install printed **no agent found** | Install VS Code with GitHub Copilot (or Copilot CLI) first, then run the install again. |
