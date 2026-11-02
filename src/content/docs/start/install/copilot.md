---
title: Install for GitHub Copilot
description: Copilot Chat in VS Code and Copilot CLI get /sessioncost, /livesession and the guard from any install.
---
Use the [one-line install](/sessioncost-help/start/install/) (or [npm](/sessioncost-help/start/install/npm/) or
[Python](/sessioncost-help/start/install/python/)). It finds Copilot Chat in VS Code and Copilot CLI, even when Copilot
is your only agent, and prints `Copilot  /sessioncost and /livesession added` and `live guard ready`.

1. Restart VS Code (or Copilot CLI).
2. In Copilot Chat, type `/`: **/sessioncost** and **/livesession** are in the list.
3. `/sessioncost` opens the report of your Copilot chat. `/livesession` turns the guard on, for Copilot and every other
   agent on this computer.

Both read the same folder, `~/.copilot`: the commands are in `~/.copilot/skills`, the guard in
`~/.copilot/hooks/sessioncost-guard.json` (delete that file to take the guard out).

**Copilot Chat's report:** VS Code keeps few token counts, so the cost is shown as a range. More in
[Which agents](/sessioncost-help/reference/agents/).

[Back to Install](/sessioncost-help/start/install/)
