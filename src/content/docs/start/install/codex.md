---
title: Install in Codex (plugin)
description: The Codex plugin brings /sessioncost. For /livesession too, use the one-line install.
---
The [one-line install](/sessioncost-help/start/install/) covers Codex with both `/sessioncost` and `/livesession`:
use it if you want the live guard. The plugin brings `/sessioncost` only.

1. In a terminal: `codex plugin marketplace add kish21/sessioncost`.
2. **Codex app:** open **Customize → Plugins**, choose **sessioncost**, click **Install plugin**.
   **Codex CLI:** type `/plugins`, pick **sessioncost**, install it.
3. Start a new chat and type **`/sessioncost`**.

**The guard in Codex** (one-line, npm or Python install): Codex asks you once to trust new hooks. Type `/hooks` in
Codex and trust SessionCost's.

**New versions:** Codex looks for one when it starts. To be sure: `codex plugin marketplace upgrade`.

[Back to Install](/sessioncost-help/start/install/)
