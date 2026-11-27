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
| **Install (pinned)** | `python -m pip install sessioncost==1.2.10` | `pipx install sessioncost==1.2.10` | `uv tool install sessioncost==1.2.10` |
| **Add to your agents** | `python -m sessioncost setup` | `sessioncost setup` | `sessioncost setup` |
| **Strict offline setup** | `python -m sessioncost setup --offline` | `sessioncost setup --offline` | `sessioncost setup --offline` |

3. For each agent it finds, setup prints `/sessioncost and /liveguard added` and `live guard ready`.
4. Restart your agents.

On Mac or Linux, use `python3` if `python` is not found.

## Check it worked

Open a **new** chat in any agent and type **`/sessioncost`**: the report opens in your browser.

## Keep it up to date

Type `/sessioncost update` in a chat, or in a terminal `python -m sessioncost update` (pip) or
`sessioncost update` (pipx, uv). Then restart your agents.

## Remove it

In a terminal: `sessioncost uninstall` (or `python -m sessioncost uninstall`). It removes SessionCost and LiveGuard cleanly in one go — hooks in every agent (keeping your other hooks), `/sessioncost` and `/liveguard` skills, `~/.sessioncost`, plugins, editor extensions, and the Python package itself. Add `--backup` to keep a copy first. See [Uninstall SessionCost](/sessioncost-help/start/uninstall/).

## Good to know

Installed an agent later? Run `setup` again.
