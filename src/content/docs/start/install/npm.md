---
title: Install with Node (npm)
description: One npx command gives every AI coding agent on your computer /sessioncost and /liveguard. Needs only Node.js.
audience: everyone
---

Needs only [Node.js](https://nodejs.org) (the LTS version). No Python needed.

```sh
npx sessioncost setup
```

Answer `y` if npx asks to install the package. The first run installs SessionCost once into its own folder,
`~/.sessioncost/npm/venv`, using [uv](https://docs.astral.sh/uv/) when you have it, otherwise your Python 3.10 or
newer; with neither, it installs uv first. Your own Python is left as it is.

For each agent it finds, setup prints `/sessioncost and /liveguard added` and `live guard ready`. Restart your
agents, then type **`/sessioncost`** in a chat.

From then on, type `npx sessioncost …` for every terminal command. Installed an agent later? Run
`npx sessioncost setup` again.

**New versions:** `/sessioncost update` in a chat, or `npx sessioncost@latest setup`.
