---
title: Your first report
description: Run /sessioncost and read the report in five minutes.
---
## 1. Run it

In the chat you want to look at, type `/sessioncost`. The agent answers with **one line: the report's link**. The report
opens in your browser.

Why only one line? Anything written into the chat is sent again with every later message, so a long summary there would
cost you on every turn. All the numbers are in the report. If you do want them in the chat, ask for the summary.

:::note
In 0.5.15 the agent shows a short summary first. From 0.6.0 it answers with the link only.
:::

## 2. Read the top: the answer first

The report starts with the answer: how much this chat sent, how much it would have sent with the fixes, and the three
biggest fixes.

![9.9M tokens sent, 5.4M with the fixes, and the three biggest fixes](https://raw.githubusercontent.com/kish21/sessioncost/v0.5.15/media/answer.png)

If you read nothing else, read **The biggest fixes**. Each one names its saving.

## 3. Find the heavy turn

Below that is **the path**: one tile for each turn, from Step 0 to the last. Red shows how heavy a turn is. Tap the
heaviest one: the [turn panel](/sessioncost-help/report/turn-panel/) opens and shows what you said, what the agent did, and where the
money went.

## 4. Paste a fix

Open **How to save**. Each fix has its saving and a rule to paste to your agent, for example into `CLAUDE.md` or
`AGENTS.md`. Tick **I did this** and the report stops repeating it.

![Recommended rules and fix cards](https://raw.githubusercontent.com/kish21/sessioncost/v0.5.15/media/fixes.png)

## 5. Next time

Run `/sessioncost` again at the end of your next chat and compare. Old reports pile up; `/sessioncost clean` deletes
them and keeps the latest.

Want every section explained? [The report at a glance](/sessioncost-help/report/overview/).
