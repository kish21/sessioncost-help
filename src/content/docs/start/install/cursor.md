---
title: Install in Cursor (plugin)
description: The Cursor plugin brings /sessioncost and /livesession. Or use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) already covers Cursor. The plugin is the other way: it
brings `/sessioncost` and `/livesession`, and needs Git. No Python? The first `/sessioncost` or `/livesession` fetches
one.

1. Open **Customize → Plugins**, choose **From GitHub Repository** (or **Add Marketplace**).
2. Paste `https://github.com/kish21/sessioncost` and install **sessioncost**.
3. Restart Cursor and type **`/sessioncost`** in a chat.

If no plugin shows up, use the one-line install instead.

**The guard:** type `/livesession`. The first time, it puts the guard into Cursor and asks you to restart Cursor once.
Cursor's hooks cannot read the chat, so to switch the guard off type `/livesession off` in another agent, or
`sessioncost guard off` in a terminal.

**New versions:** **Customize** → the marketplace with SessionCost → **Refresh**.

[Back to Install](/sessioncost-help/start/install/)
