---
title: Install with Node (npm)
description: One npx command gives every AI coding agent on your computer /sessioncost and /liveguard. Needs only Node.js.
audience: everyone
---

Needs only [Node.js](https://nodejs.org) (the LTS version). No Python needed. It gives every agent on this computer
**`/sessioncost`** (where your chat's tokens went) and **`/liveguard`** (the guard, on from install).

## Install

1. Open a terminal. **Windows:** Windows key, type `powershell`, Enter. **Mac:** Cmd + Space, type `terminal`, Enter.
2. Paste this and press Enter:

   ```sh
   npx sessioncost setup
   ```

3. Answer `y` if npx asks to install the package. For each agent it finds, it prints
   `/sessioncost and /liveguard added` and `live guard ready`.
4. Restart your agents.

The first run installs SessionCost once into its own folder, `~/.sessioncost/npm/venv`, using
[uv](https://docs.astral.sh/uv/) when you have it, otherwise your Python 3.10 or newer; with neither, it installs uv
first. Your own Python is left as it is.

## Check it worked

Open a **new** chat in any agent and type **`/sessioncost`**: the report opens in your browser.

## Keep it up to date

Type `/sessioncost update` in a chat, or `npx sessioncost@latest setup` in a terminal. Then restart your agents.

## Remove it

In a terminal: `npx sessioncost uninstall`. It removes SessionCost and LiveGuard cleanly in one go — hooks in every agent (keeping your other hooks), `/sessioncost` and `/liveguard` skills, `~/.sessioncost`, plugins, editor extensions, and global `npm` packages. Add `--backup` to keep a copy first. See [Uninstall SessionCost](/sessioncost-help/start/uninstall/).

## Good to know

- In a terminal, type `npx sessioncost …` for every SessionCost command.
- Installed an agent later? Run `npx sessioncost setup` again.
