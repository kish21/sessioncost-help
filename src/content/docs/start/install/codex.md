---
title: Install in Codex (plugin)
description: The Codex plugin brings /sessioncost and /livesession. Or use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) already covers Codex. The plugin is the other way: it brings
`/sessioncost` and `/livesession`, and needs Python 3.10 or newer and Git.

1. In a terminal: `codex plugin marketplace add kish21/sessioncost`.
2. **Codex app:** open **Customize → Plugins**, choose **sessioncost**, click **Install plugin**.
   **Codex CLI:** type `/plugins`, pick **sessioncost**, install it.
3. Start a new chat and type **`/sessioncost`**.

**The guard:** type `/livesession`. The first time, it puts the guard into Codex and asks you to restart Codex once
and type `/hooks` to trust SessionCost's hooks (Codex asks this for every new hook).

**New versions:** Codex looks for one when it starts. To be sure: `codex plugin marketplace upgrade`.

[Back to Install](/sessioncost-help/start/install/)
