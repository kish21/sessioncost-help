---
title: Questions and answers
description: Short answers to what people ask most about SessionCost, its report and its guard.
audience: everyone
---
## Does SessionCost send my code or chats anywhere?

No. It reads your agent's log on your computer, calls no AI model, and sends nothing anywhere. The report is a file on
your computer. [Security model](/sessioncost-help/how/security/).

## Does `/sessioncost` itself cost tokens?

A little: your agent runs one command and replies with one line, the report's link. The report is built on your
computer with no AI model, so the numbers cost nothing.

## Is the money in the report my bill?

No, an estimate at public list prices. **Tokens are exact** where the agent's log records them. Your bill can differ
(plan, contract rates, batch, cloud provider). On a monthly plan, `sessioncost --subscription` labels the money as what
the chat would cost at API prices. [How the money is counted](/sessioncost-help/reference/money/).

## Which agents does it work with?

Claude Code, Codex, Cursor, Antigravity and GitHub Copilot (CLI and Chat in VS Code). One install covers all of them.
[How exact the numbers are, by agent](/sessioncost-help/reference/money/#how-exact-by-agent).

## Will the fix change my project without asking?

No. Your agent shows each change and applies it only after your yes, with a backup first. `/sessioncost fix --undo`
puts the newest fix back. [Save tokens](/sessioncost-help/use/save-tokens/).

## Do I need the guard?

If your agent only edits code you give it, maybe not. If it reads web pages or files from outside, installs packages,
or pushes code, the guard stops the steps that could leak a secret or send your code somewhere.
[Stay safe](/sessioncost-help/use/stay-safe/).

## Will the guard keep interrupting me?

Rarely. Replayed over 48,835 real tool steps, it asked about 3.8% and blocked 0.53%. A step that is normal in your
project can be allowed with the one line the guard gives you.

## Can the agent turn the guard off?

No. Only your own message (`/livesession off`) or a terminal command turns it off. If a page or file tells the agent
to switch it off, that step is blocked.

## What is Step 0?

What the agent sends before your first word: its instructions, tool definitions, rules files, skills and MCP servers.
It is sent again with every message. [Step 0](/sessioncost-help/report/step-0/).

## Where are my reports, and how do I delete them?

In `~/.sessioncost/reports/`, one file per chat. `/sessioncost clean` deletes the older ones and keeps the latest.

## My chat got long. Should I start a new one?

Usually yes. Let your agent write a handover first, then say "continue from handover" in the new chat.
[Long chats and handover](/sessioncost-help/use/long-chats/).

## Is it free?

Yes, free and open source under the [MIT license](https://github.com/kish21/sessioncost/blob/main/LICENSE).

Something not working? [Fix a problem](/sessioncost-help/help/fix-a-problem/).
