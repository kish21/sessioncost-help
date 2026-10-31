---
title: Install SessionCost
description: Add /sessioncost to every agent on your computer in about a minute.
---
Pick the way that suits you. Each one adds `/sessioncost` to every agent on your computer: **Claude Code, Codex,
Cursor and Antigravity**. Use one way per agent.

## Way 1: one line, nothing else needed

This way needs neither Python nor Git.

1. Open a terminal.
   - **Windows:** press the Windows key, type `powershell`, press Enter.
   - **Mac:** press Cmd + Space, type `terminal`, press Enter.
2. Paste the line for your computer and press Enter.

   **Windows**
   ```powershell
   irm https://raw.githubusercontent.com/kish21/sessioncost/main/install.ps1 | iex
   ```
   **Mac / Linux**
   ```sh
   curl -fsSL https://raw.githubusercontent.com/kish21/sessioncost/main/install.sh | sh
   ```
3. Wait about a minute. It ends with `/sessioncost added` for each agent it found.

## Way 2: from PyPI, for the command line

Needs Python 3.10 or newer.

```sh
python -m pip install -U sessioncost     # -U also updates an older copy
python -m sessioncost setup              # adds /sessioncost to your agents
```

- On Mac or Linux, use `python3` if `python` is not found.
- `python -m` works even when Windows cannot find the `sessioncost` command (common with the Microsoft Store Python).
- Prefer isolated tools? `pipx install sessioncost` or `uv tool install sessioncost`, then `sessioncost setup`.
- Use Node? `npx sessioncost` (then `npx sessioncost setup`, `npx sessioncost list`, …). The first run installs
  SessionCost once into its own folder, `~/.sessioncost/npm/venv`: with [uv](https://docs.astral.sh/uv/) when you
  have it, which also fetches Python for you, otherwise with your Python 3.10 or newer. Your own Python is left as it is.

## Way 3: as a plugin, from your agent

Plugins need Python 3.10 or newer on the computer.

| Agent | How |
|---|---|
| **Claude Code** | In a chat: `/plugin marketplace add kish21/sessioncost`, then `/plugin install sessioncost@sessioncost`. Or type `/plugin`, open **Marketplaces**, add `kish21/sessioncost`, and install **sessioncost** from the **Plugins** tab. Needs Git. |
| **Codex** | First, in a terminal: `codex plugin marketplace add kish21/sessioncost`. **Codex app:** open **Customize → Plugins**, choose **sessioncost**, click **Install plugin**. **Codex CLI:** type `/plugins`, pick **sessioncost**, install it. Start a new chat afterwards. |
| **Cursor** | Open **Customize → Plugins**, choose **From GitHub Repository** (or **Add Marketplace**), paste `https://github.com/kish21/sessioncost`, install **sessioncost** and restart Cursor. If no plugin shows up, use way 1. |
| **Antigravity** | Command line: `agy plugin install https://github.com/kish21/sessioncost`, then start a new chat. In the Antigravity app, use way 1. |

With the plugin installed, you don't need the copy from way 1 or 2 in that agent.

## Then, in your agent

Restart the agent, open any chat, and type **`/sessioncost`** (or ask: "run sessioncost"). The report opens in your
browser.

![/sessioncost in a Claude Code chat: one command runs, and the agent answers with only the report's link](/sessioncost-help/img/chat.png)

| Agent | Where `/sessioncost` is added |
|---|---|
| Claude Code | `~/.claude/skills/sessioncost` (or the plugin) |
| Codex (CLI, IDE, app) | `~/.codex/skills/sessioncost` |
| Cursor | `~/.cursor/skills/sessioncost` |
| Antigravity | `~/.gemini/config/skills/sessioncost` |

Installed another agent later? Run `sessioncost setup` again, or paste the line from way 1 again.

## Stay up to date

The simple way: type `/sessioncost update` in a chat, or run `sessioncost update` in a terminal
(`python -m sessioncost update` on Windows). It updates every copy of SessionCost on the computer, each the right way,
and tells you what it did. Then restart your agent.

| Agent | New versions |
|---|---|
| **Claude Code** | Once: `/plugin` → **Marketplaces** → sessioncost → **Enable auto-update**. From then on each new version arrives by itself. |
| **Codex** | Codex looks for a new version when it starts. To be sure: `codex plugin marketplace upgrade`. |
| **Cursor** | **Customize** → the marketplace with SessionCost → **Refresh**. |
| **Antigravity**, and ways 1 and 2 | `sessioncost update`, or paste the install line again. |

Next: [Your first report](/sessioncost-help/start/first-report/).
