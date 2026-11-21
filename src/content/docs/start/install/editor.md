---
title: Editor extension (VS Code, Cursor, Antigravity)
description: SessionCost in the status bar of VS Code, Cursor and Antigravity - the guard, and the tokens and cost of this folder's newest chat.
audience: everyone
---

The extension shows SessionCost in your editor's status bar, for example:

`🛡 Guard on · fix the login · 84k tokens · $0.62`

- **Status bar:** the guard, and the name, tokens and cost of this folder's newest chat (Claude Code, Codex, Copilot,
  Antigravity or Cursor). Hover over it for the full chat name and details. It turns amber when the guard stopped a
  step, and switches to a new chat as soon as you start one.
- **Pop-up** when the guard stops or asks about a step, with **Show** for the guard report.
- **Click it** for the menu: open the report, token tips on or off, fix token waste, undo the last fix, guard on or
  off, the guard report, the handover, prices, set up your agents, and update.

## Install

1. Open the Extensions view and search for **SessionCost** (VS Code uses the Visual Studio Marketplace; Cursor and
   Antigravity use Open VSX).
2. Click **Install**. The first time, it asks to install the SessionCost tool into its own folder
   (`~/.sessioncost/editor`). It needs the internet once, and no separate Python or Node.
3. Click **SessionCost** in the status bar, then **Set up your agents**, to add `/sessioncost` and the guard to your
   agents.

When the extension updates, it updates its SessionCost to the same version; the status bar says **Updating
SessionCost…** until it is done (about a minute). VS Code, Cursor and Antigravity share this one copy: an editor whose
extension is older uses the newer copy as it is and never puts an older one back. If you already installed SessionCost
another way (one-line install, npm, Python or the Claude Code plugin), that keeps working; both use the same data in
`~/.sessioncost`.

## Fix token waste

**Fix token waste** first shows the changes for the chat in the status bar. Only after you say yes does it apply
them, after a backup, to that same chat. **Undo the last fix** puts the files back.

## Several folders in one window

The status bar shows the chat of the folder your open file is in. Opening a file in another folder switches it at
once.

## Remove it

Say **"remove SessionCost"** in a chat: your agent gives you one command to paste into a terminal (it cannot run it itself). The command lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then remove the extension: **Extensions** panel → SessionCost → **Uninstall**.

## Settings

| Setting | Default | What it does |
|---|---|---|
| `sessioncost.refreshSeconds` | 10 | How often the status bar checks whether the chat or the guard changed. It asks SessionCost again only when something changed, and only while the window has focus. |
| `sessioncost.notifyGuard` | on | The pop-up when the guard stops or asks about a step. |

## Privacy

Everything runs on this computer. The extension runs SessionCost, which reads your agents' chat logs here and sends
nothing anywhere. The only download is SessionCost itself, once per version.
