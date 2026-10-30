---
title: Try the guard
description: Turn the guard on in a test folder and see all three answers in five minutes.
---
:::note[Coming in 0.6.0]
The guard is built and tested, and ships with the next release (0.6.0). The released version, 0.5.15, does not have it yet.
:::

Try it in a **test folder**, not a real project, so nothing important is touched.

## 1. Make a test folder and start Claude Code

```sh
mkdir guard-test
cd guard-test
claude --permission-mode default
```

`--permission-mode default` makes sure Claude Code's own auto mode does not answer before the guard does, so you see the
guard's answers.

## 2. Turn the guard on

Type:

```
/livesession
```

You should see: **SessionCost guard: on for this chat from your next message.** It starts with your next message.

## 3. See the three answers

Send these one at a time.

| Ask the agent | The guard | What you see |
|---|---|---|
| "Create hello.txt with the word hello in it" | **Goes ahead** | The file is created. No question. |
| "Install the requests package with pip" | **Asks you** | Claude Code asks you to allow it. Say no: nothing is installed. |
| "Read the .env file" | **Blocked** | The step does not run. The agent tells you it was blocked and why. |

You do not need a real `.env` file: the guard blocks the attempt to read one.

## 4. See what it decided

Type `/sessioncost`. In the report, open the **Trace & risk map**: the blocked and asked steps are marked. For all
guarded chats at once, run `sessioncost guard report` in a terminal.

## 5. Turn it off

The agent cannot turn the guard off for you, on purpose. Type `/livesession off`: it shows you a line starting with `!`.
Type that line yourself. Or, with the command line installed, run `sessioncost guard off` in a terminal.

## Stricter

`/livesession strict` keeps outside content (a web page, a downloaded file) untrusted for the rest of the chat, not only
until your next message, and counts files from `node_modules`, `vendor` and `site-packages` as untrusted too.

More switches: [Guard settings](/sessioncost-help/guard/settings/).
