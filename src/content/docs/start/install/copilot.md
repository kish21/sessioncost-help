---
title: Install for GitHub Copilot
description: Copilot has no /sessioncost in its chat. Install once, then run the report from a terminal; the guard covers Copilot CLI.
---
Copilot CLI and Copilot Chat in VS Code have no `/sessioncost`. Use the
[one-line install](/sessioncost-help/start/install/) (or [npm](/sessioncost-help/start/install/npm/) or
[Python](/sessioncost-help/start/install/python/)), then:

- **The report:** in a terminal, in your project folder, type `sessioncost` (or `npx sessioncost` /
  `python -m sessioncost`, as you installed). It reads Copilot's chats too.
- **The guard:** setup puts it into Copilot CLI when Copilot CLI is installed. Turn it on with `/livesession` in
  another agent, or `sessioncost guard on` in a terminal. Restart Copilot CLI once after setup.

More on what works where: [Which agents](/sessioncost-help/reference/agents/).

[Back to Install](/sessioncost-help/start/install/)
