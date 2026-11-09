---
title: Install for GitHub Copilot
description: The one-line install, npm or Python finds Copilot Chat in VS Code and Copilot CLI and adds /sessioncost and /liveguard.
audience: everyone
---

Use the [one-line install](/sessioncost-help/start/install/), [Node (npm)](/sessioncost-help/start/install/npm/) or
[Python](/sessioncost-help/start/install/python/). Each finds Copilot Chat in VS Code and Copilot CLI, even when
Copilot is your only agent, and prints `Copilot  /sessioncost and /liveguard added` and `live guard ready`.

1. Restart VS Code (or Copilot CLI).
2. In Copilot Chat, switch to **Agent** mode and type `/`: **/sessioncost** and **/liveguard** are in the list.
3. `/sessioncost` opens the report of your Copilot chat. `/liveguard` turns the guard on, for Copilot and every other
   agent on this computer.

Both read the same folder, `~/.copilot`: the commands are in `~/.copilot/skills`, the guard in
`~/.copilot/hooks/sessioncost-guard.json`.
