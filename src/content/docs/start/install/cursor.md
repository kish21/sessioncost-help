---
title: Install in Cursor
description: Install the SessionCost plugin in Cursor from GitHub. It brings /sessioncost and /liveguard.
audience: everyone
---

The plugin brings `/sessioncost` and `/liveguard`, and needs Git. No Python? The first `/sessioncost` or
`/liveguard` fetches one.

1. Open **Customize → Plugins**, choose **From GitHub Repository** (or **Add Marketplace**).
2. Paste `https://github.com/kish21/sessioncost` and install **sessioncost**.
3. Restart Cursor and type **`/sessioncost`** in a chat.

If no plugin shows up, use the [one-line install](/sessioncost-help/start/install/) instead.

**The guard:** type `/liveguard`. The first time, it puts the guard into Cursor and asks you to restart Cursor once.
Cursor's hooks cannot read the chat, so to switch the guard off type `/liveguard off` in another agent, or
`sessioncost guard off` in a terminal.

**New versions:** **Customize** → the marketplace with SessionCost → **Refresh**.
