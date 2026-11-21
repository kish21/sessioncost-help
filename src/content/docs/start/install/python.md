---
title: Install with Python (PyPI)
description: Install SessionCost with pip, pipx or uv, then one setup command gives every agent /sessioncost and /liveguard.
audience: everyone
---

Needs Python 3.10 or newer. It gives every agent on this computer **`/sessioncost`** (where your chat's tokens went)
and **`/liveguard`** (the guard, on from install).

## Install

1. Open a terminal. **Windows:** Windows key, type `powershell`, Enter. **Mac:** Cmd + Space, type `terminal`, Enter.
2. Paste the lines for the tool you use and press Enter:

| | **pip** | **pipx** | **uv** |
|---|---|---|---|
| **Install** | `python -m pip install -U sessioncost` | `pipx install sessioncost` | `uv tool install sessioncost` |
| **Add to your agents** | `python -m sessioncost setup` | `sessioncost setup` | `sessioncost setup` |

3. For each agent it finds, setup prints `/sessioncost and /liveguard added` and `live guard ready`.
4. Restart your agents.

On Mac or Linux, use `python3` if `python` is not found.

## Check it worked

Open a **new** chat in any agent and type **`/sessioncost`**: the report opens in your browser.

## Keep it up to date

Type `/sessioncost update` in a chat, or in a terminal `python -m sessioncost update` (pip) or
`sessioncost update` (pipx, uv). Then restart your agents.

## Remove it

In a terminal: `sessioncost uninstall` (or `python -m sessioncost uninstall`). It lists what it takes out: the guard's hooks in every agent, the `/sessioncost` and `/liveguard` skills, and SessionCost's own folder with your reports. It asks before it changes anything and keeps a backup copy in your home folder.

Then remove the program: `uv tool uninstall sessioncost` (or `pip uninstall sessioncost`).

## Good to know

Installed an agent later? Run `setup` again.
