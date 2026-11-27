---
title: Uninstall SessionCost
description: Remove SessionCost and LiveGuard cleanly in one go — hooks, skills, plugins, editor extensions, package, and data.
audience: everyone
---

One command removes SessionCost and **LiveGuard** cleanly from your computer in one go.

## Uninstall in one go

Open a **terminal** (not an agent's chat — LiveGuard blocks agents from removing the guard) and run the command that matches how you installed:

| You installed with | Run in a terminal |
|---|---|
| One-line installer, `uv tool`, or `pipx` | `sessioncost uninstall` |
| Python (`pip`) | `python -m sessioncost uninstall` |
| Node (`npm`) | `npx sessioncost uninstall` |

It shows everything it found and asks **`Remove SessionCost now? [y/N]`** before changing anything. Type **`y`** and press Enter, then **restart your agents and editor**.

Want a backup copy before removing? Add `--backup`:

```sh
sessioncost uninstall --backup
```

That moves removed configs and data into `~/sessioncost-backup-<date>` instead of deleting them.

## What it removes

`sessioncost uninstall` removes every piece of SessionCost and LiveGuard:

1. **LiveGuard hooks in every agent** — Claude Code (`~/.claude/settings.json`), Codex (`~/.codex/hooks.json`), Cursor (`~/.cursor/hooks.json`), Antigravity (`~/.gemini/config/hooks.json`), and GitHub Copilot (`~/.copilot/hooks/sessioncost-guard.json`). **Your other hooks stay untouched.**
2. **LiveGuard git hooks** — if you run it inside a git repo where you enabled `sessioncost guard git on`, it removes SessionCost's pre-commit and pre-push hooks and restores any previous hooks. *(If you enabled git hooks in other repos, run `sessioncost guard git off` in those repos before uninstalling.)*
3. **Agent skills** — `/sessioncost` and `/liveguard` from Claude Code, Codex, Cursor, Antigravity, and Copilot.
4. **SessionCost's own folder** — `~/.sessioncost` (reports, guard logs, settings, and helper environments).
5. **Agent plugins** — Claude Code (`claude plugin uninstall`), Codex plugin cache, and Cursor plugin files.
6. **Editor extensions** — `kish21.sessioncost` in VS Code, Cursor, and Antigravity (via their CLIs when available).
7. **The program itself** — `uv tool`, `pipx`, `pip`, or global `npm` package.
8. **Backup leftovers** — old `~/sessioncost-backup-*` folders and `*.before-sessioncost` hook backups (skipped when `--backup` is passed).

## If a step needs one manual command

Some tools lock files while they are running (for example, `sessioncost.exe` on Windows or an open editor/agent). If any step could not finish automatically, `sessioncost uninstall` prints the exact remaining command at the end:

- **Program (if locked while running):**
  - `uv tool uninstall sessioncost`
  - `pipx uninstall sessioncost`
  - `python -m pip uninstall -y sessioncost`
  - `npm uninstall -g sessioncost`
- **Claude Code plugin:** `claude plugin uninstall sessioncost@sessioncost` (or in Claude Code: `/plugin` → **Installed** → **SessionCost** → **Uninstall**)
- **Codex plugin:** open **Plugins** in Codex and remove **SessionCost**
- **Cursor plugin:** **Settings → Plugins** → remove **SessionCost**
- **Editor extension:** open the **Extensions** panel in VS Code, Cursor, or Antigravity → **SessionCost** → **Uninstall**

## Verify everything is gone

Restart your agents and editor, then open a new terminal and run:

```sh
sessioncost --version
```

You should see "command not found" (or "not recognized"). None of your agents will show `/sessioncost` or `/liveguard`, and `~/.sessioncost` will no longer exist.
