---
title: Step 0
description: What your agent sends before you type anything, and how to make it smaller.
audience: everyone
---
**Step 0 is everything the agent sends before your first message**: its own instructions, the tools it can use, your
rules files (such as `CLAUDE.md` or `AGENTS.md`), skills, and MCP servers.

It matters because it is sent again with **every** call in the chat. A Step 0 of 30,000 tokens in a chat with 200 calls
is 6 million tokens sent, before counting a word you typed.

## Read it

Step 0 is the first tile on the path. Tap it, then **What is in Step 0**. One bar splits Step 0 into its parts, then
lists every tool, used or never used, so you can see what you pay for and never use.

![Step 0: 32k sent on every call, split into tool definitions, the system prompt and more; ten connected tools never used](/sessioncost-help/img/step-0.png)

## Make it smaller

**How to save in Step 0** lists the fixes for this chat. The usual ones:

- **Turn off MCP servers you do not use in this project.** Each one adds its tools to Step 0.
- **Keep rules files short.** Move rarely needed detail into a separate file the agent reads only when it needs it.
- **Remove skills and plugins you no longer use.**

Run `/sessioncost` again after the change: Step 0 should shrink in the next chat.
