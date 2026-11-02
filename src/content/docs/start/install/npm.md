---
title: Install with Node (npm)
description: npx sessioncost setup adds /sessioncost and /livesession to every agent. Needs only Node.js.
---
Needs only **Node.js** (it comes with `npx`): [nodejs.org](https://nodejs.org), the LTS version. No Python needed.

1. Open a terminal and type:

   ```sh
   npx sessioncost setup
   ```

   Answer `y` if npx asks to install the package.
2. The first run installs SessionCost once into its own folder, `~/.sessioncost/npm/venv`. It uses
   [uv](https://docs.astral.sh/uv/) when you have it, otherwise your Python 3.10 or newer; with neither, it installs
   uv first, and uv fetches Python by itself. Your own Python is left as it is.
3. For each agent it finds it prints `/sessioncost and /livesession added` and `live guard ready`.
4. Restart your agents. In a chat, type **`/sessioncost`**.

From then on, type `npx sessioncost …` for every terminal command, for example `npx sessioncost update`.

Installed an agent later? Run `npx sessioncost setup` again.

[Back to Install](/sessioncost-help/start/install/)
