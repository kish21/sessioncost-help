---
title: Fixes and safety rules
description: Every fix with its saving, and the rule to paste to your agent.
---
## How to save

**How to save** lists every fix for this chat, dearest first. Each fix card shows:

- **what it saves**, in money and tokens, worked out from this chat;
- **which turns it touches**: highlight them on the path to see where;
- **the rule to paste**: a short instruction for your agent. Copy it into your rules file (`CLAUDE.md` for Claude Code,
  `AGENTS.md` for Codex, Cursor rules for Cursor).

Above the cards, **Rules for your agent** collects the recommended rules in one block to copy at once.

Tick **I did this** on a fix and the report stops repeating it in later chats.

![Recommended rules and fix cards](https://raw.githubusercontent.com/kish21/sessioncost/v0.5.15/media/fixes.png)

### How the saving is counted

Each saving is measured from this chat: the tokens that the fix would have kept out, priced like the rest of the
report. A saving is an estimate of what this chat would have cost with the fix, not a promise for the next one. See
[How the money is counted](/sessioncost-help/reference/money/).

## Safety rules

When the [Trace & risk map](/sessioncost-help/report/risk-map/) finds risky steps (a push, an install, reading a secret, a script
piped from the internet), **Safety rules** appears with rules to paste that stop those steps next time. It only shows
when there is something to fix.

For a check **while** the agent works, rather than after, see [the guard](/sessioncost-help/guard/what-it-does/).
