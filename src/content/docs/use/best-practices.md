---
title: Token best practices
description: Why each kind of token waste costs, and what to do about it.
---

SessionCost checks every chat for the kinds of waste below. When it finds one, the fix list (`sessioncost fix`) shows these same two lines for it: why it costs, and the best practice.

## Start a fresh chat for each new task

**Why it costs:** Every message sends the whole chat again, so each new question in a long chat pays for all the old ones.

**Best practice:** When a task is done, or after a long break, ask the agent for a short handover (goal, what is done, what is next) and start a fresh chat from it.

Check: `long-chat`

## Keep the prompt cache warm

**Why it costs:** The agent keeps the chat so far in a short-lived cache (minutes, or about an hour on some plans) and re-reads it at a small part of the price. After a long pause, or when the model, tools or settings change mid-chat, the cache is gone and the whole chat is sent again at full price.

**Best practice:** Finish a step before a long pause. After the pause, start a fresh chat from a handover instead of carrying on. Pick the model, tools and settings at the start of a chat and keep them.

Check: `cache-break`

## Read a file once

**Why it costs:** A file the agent already read is still in the chat. Reading it again adds a second copy, and both copies are sent with every later message.

**Best practice:** Ask the agent to refer back to what it read, and re-read only after the file changed. For big files, read the lines needed, not the whole file.

Check: `repeated-reads`

## Edit, don't rewrite

**Why it costs:** Writing a whole file again sends every line of it, even when only a few lines changed, and the new copy stays in the chat.

**Best practice:** Ask for small edits to the lines that change. Rewrite a file whole only when most of it changes.

Check: `repeated-writes`

## Stop after two failures and find the cause

**Why it costs:** Each retry of a failing step sends the chat again, and the error output piles up in it. The same step rarely works on the third try without a change.

**Best practice:** After a step fails twice, have the agent stop, read the error and change the approach, or ask you.

Check: `error-loop`

## Let helpers report back

**Why it costs:** Each time the main agent checks on a helper, it sends the whole main chat again just to learn 'not done yet'.

**Best practice:** Start helpers and wait for them to report when they finish. Check only if one seems stuck.

Check: `helper-polling`

## Run tests again only after a change

**Why it costs:** Running the same tests with nothing changed gives the same result, and its output is added to the chat again. Edits that are never tested cost a second round later.

**Best practice:** Run the tests that touch a change once after making it. Run the full suite before a commit, not after every step.

Check: `test-rerun`

## Say yes once, up front

**Why it costs:** When the agent stops only to ask 'shall I go ahead?', your 'yes' starts a new turn that sends the whole chat again.

**Best practice:** Say in your request what the agent may do without asking (for example: edit and test, but ask before pushing), so it only stops for real decisions.

Check: `confirm-turn`

## Turn off tools a project does not use

**Why it costs:** Every connected tool server sends its tool list with every message, used or not.

**Best practice:** Keep on only the servers and connectors this project uses. Turn others on in the projects that need them.

Check: `unused-tools`

## Switch off built-in tools you never use

**Why it costs:** The agent's own big tools are described on every message, even in chats that never call them.

**Best practice:** Switch off the built-in tools your work never uses. You can switch them on again any time.

Check: `unused-builtin`

## Don't let old output linger

**Why it costs:** A big result the agent no longer needs (a long log, a big file) stays in the chat and is sent with every later message.

**Best practice:** When a step that produced big output is done, start a fresh chat from a handover, or compact the chat (/compact) if you carry on right away.

Check: `stale-context`

## Keep tool results small

**Why it costs:** One huge result (a lockfile, build output, a full log) fills the chat at once and is sent with every later message.

**Best practice:** Read only the lines needed, search instead of reading whole files, and cut long output to its head and tail. Leave lockfiles and build folders out.

Check: `big-results`

## Keep always-on instructions short

**Why it costs:** Instruction files, always-on rules and skill lists are sent at the start of every message. Every extra line there is paid on every message of every chat.

**Best practice:** Keep those files short and to the point. Move details the agent needs only sometimes into separate files it reads when needed.

Check: `startup-bloat`

## Use screenshots sparingly

**Why it costs:** An image costs many tokens, and once it is in the chat it is sent with every later message.

**Best practice:** Paste text (an error, a log line) instead of a screenshot when you can. After a few images, start a fresh chat from a handover.

Check: `images`

## Ask for short answers

**Why it costs:** Long replies and heavy hidden thinking are output tokens, the most expensive kind, and the reply then stays in the chat.

**Best practice:** Ask for short answers and summaries. Use deep thinking for hard problems, not for routine steps.

Check: `long-output`

## Give helpers what the main agent already knows

**Why it costs:** A helper starts with an empty chat, so it reads again the files the main agent already read.

**Best practice:** When starting a helper, name the files and lines it needs, or pass the facts it needs in the request.

Check: `helper-rereads`

## Use a smaller model for routine steps

**Why it costs:** Reading files, searching and running quick commands cost the same top-tier price per token as hard design work, though a smaller model does them just as well.

**Best practice:** Pick the model at the start of a chat for the work it holds, or hand routine steps to a helper on a smaller model. Switching models mid-chat breaks the prompt cache.

Check: `model-choice`
