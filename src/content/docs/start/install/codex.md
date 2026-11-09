---
title: Install in Codex
description: Install the SessionCost plugin in the Codex app or CLI. It brings /sessioncost and /liveguard.
audience: everyone
---

The plugin brings `/sessioncost` and `/liveguard`, and needs Git. No Python? The first `/sessioncost` or
`/liveguard` fetches one. Or use the [one-line install](/sessioncost-help/start/install/), which covers Codex too.

1. In a terminal: `codex plugin marketplace add kish21/sessioncost`.
2. **Codex app:** open **Customize → Plugins**, choose **sessioncost**, click **Install plugin**.
   **Codex CLI:** type `/plugins`, pick **sessioncost**, install it.
3. Start a new chat and type **`/sessioncost`**.

**The guard:** type `/liveguard`. The first time, it puts the guard into Codex and asks you to restart Codex once
and type `/hooks` to trust SessionCost's hooks (Codex asks this for every new hook).

**New versions:** Codex looks for one when it starts. To be sure: `codex plugin marketplace upgrade`.
