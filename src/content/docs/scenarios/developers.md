---
title: "Scenarios: tokens and cost"
description: Step-by-step answers to the questions developers ask about where an agent's tokens went and how to send fewer.
---
Each scenario is a question you might have, the steps to answer it, and what you should see. Commands that start with
`/` are typed in the agent's chat; the others run in a terminal from the project folder (on Windows, use
`python -m sessioncost` if `sessioncost` is not found).

**Tokens are exact** wherever the agent's log records them (Claude Code, Codex, Copilot CLI, Antigravity). **Money is an
estimate** at public list prices. See [Which agents](/sessioncost-help/reference/agents/) and
[How the money is counted](/sessioncost-help/reference/money/).

## 1. Why did this chat cost so much?

1. In the chat, type `/sessioncost`. The agent answers with one line: the report's link.
2. Read the headline: tokens sent, and tokens with the fixes. The three biggest fixes sit under it.
3. On **The path**, the redder the tile, the heavier the turn; the three heaviest have a red outline. Open the heaviest.
4. In the turn panel, **Summary** splits the turn into re-read from the cache (purple), sent new (full price) and written
   by the model (green). **Every call** shows each model call with its size and price.

**What you usually find:** the cost is in the re-sending, not in what you typed. One of four causes dominates: a long
chat re-read on every call, many tool calls in one turn, a large file or command output that stays in the chat, or a
cache that expired after a break. [The turn panel](/sessioncost-help/report/turn-panel/) explains each.

## 2. Look at yesterday's chat, or another project's

```sh
sessioncost list                     # recent chats here: when, agent, id, cost, turns, first message
sessioncost 3f2a9c1e                 # one chat, by the first characters of its id
sessioncost --project ~/code/api     # the newest chat of another project folder
```

`sessioncost list --limit 20` shows more. Any agent's chat can be opened this way: SessionCost finds the logs of all
five agents.

## 3. Cut what every call sends (Step 0)

Step 0 is what the agent sends before your first word: its instructions, tool definitions, rules files, skills and MCP
servers. It is re-sent on **every** call, so 30k tokens of Step 0 over 200 calls is 6M tokens.

1. Open the report and tap the first tile, **Step 0**, then **What is in Step 0**.
2. Look at the tool list: tools marked as never used in this chat cost you on every call.
3. Turn off the MCP servers this project does not use (in Claude Code: `/mcp`; in other agents, their MCP settings).
   Move rarely needed detail out of `CLAUDE.md` / `AGENTS.md` into a file the agent reads only when needed.
4. Start a new chat, work as usual, run `/sessioncost` again. Step 0 should be smaller.

Only connected tools count as unused (MCP servers, connectors, plugins). An agent's built-in tools cannot be turned off,
so they are not counted against you. More: [Step 0](/sessioncost-help/report/step-0/).

## 4. A chat that ran all day

A chat kept open across tasks and breaks carries its whole history into every later call. After a break of more than a
few minutes the cache has also expired, so that history is sent again at full price.

1. In the report, open **Cost breakdown** and the tab for **breaks and compactions**. Each cache miss says why: a break,
   the cache length switching, or not known (some logs do not record the cache).
2. If **How to save** lists the long-chat fix, it shows what a fresh start would have saved: the old history replaced by
   a short summary on every later call.
3. Next time: start a new chat for a new task, or use the agent's compact command (`/compact` in Claude Code) before
   you step away.

## 5. Were the helper agents worth it?

Helper agents (subagents) each send their own Step 0 and their own chat, so they are not free.

1. Open **Agent flow** in the sidebar. It is shown when helpers ran; with none, it is one line.
2. **Work and cost** lists each agent: why it ran, calls, tokens, cost, and what it did most.
3. Compare a helper's cost with what it handed back (the size of its last reply) and **Files and who read them**: a
   helper that read a lot and returned little may have been better done in the main chat, or with a narrower task.

## 6. Make the fixes stick

1. Open **How to save**. **Rules for your agent** collects the recommended rules in one block; copy it.
2. Paste it into the agent's rules file: `CLAUDE.md` (Claude Code), `AGENTS.md` (Codex; Copilot reads it too), Cursor
   rules, or `.github/copilot-instructions.md`.
3. Tick **I did this** on each fix you applied. In later chats the report folds it as done, and warns if the same
   waste comes back.
4. Run `/sessioncost` at the end of your next chat and compare the headline.

Use **Highlight a fix** above the board to light up the turns a fix touches.

## 7. Keep the report current while you work

The report rebuilds itself after each answer, at most once a minute, on by default. Keep the tab open and press F5.

- Nothing to set up: your install gave every agent the hooks that tell SessionCost an answer ended. They do **not**
  turn the guard on.
- To stop it: `sessioncost auto off` (or `/sessioncost auto off`).

## 8. Exact numbers in Cursor

Cursor's local log keeps no token counts, so a Cursor report is estimated from the text and shows the cost as a range.

1. In the report, the Cursor note has a button to Cursor's usage page. Sign in there (on Cursor's own site) and export
   your usage as CSV.
2. Leave the file in Downloads: SessionCost finds it by its columns. Or pass it: `sessioncost --cursor-usage usage.csv`.
3. Run the report again. Tokens for the turns the export covers are now exact; if it covers only part of the chat, the
   report says so.

## 9. Subscription, or your company's own rates

- **On a monthly plan** (Claude Pro or Max, ChatGPT): `sessioncost --subscription` labels the money as API-equivalent,
  what the chat would cost at API prices. Useful for comparing chats; it is not your bill.
- **Your own rates** (contract prices, a model the table does not know): write only what differs, in USD per million
  tokens, and the rest stays built in.

```json
{
  "models": {
    "claude-sonnet-5-5": { "input": 1.6, "output": 8.0 }
  }
}
```

Save it as `~/.sessioncost/prices.json` to use it every time, or pass it once with `sessioncost --prices my-prices.json`.
Price classes are `input`, `output`, `cache_read`, `cache_write_5m` and `cache_write_1h`.

## 10. Take the numbers somewhere else

| You want | Do this |
|---|---|
| A spreadsheet of turns, calls and tool steps | **Export Excel** at the top of the report (four sheets: Turns, Calls, Tool steps, To check) |
| A document to attach to a review | **Export PDF** (your browser's Save as PDF, A4 landscape) |
| Every number for a script or a dashboard | `sessioncost --json > chat.json` |
| Only the report's path, for a script | `sessioncost --brief --no-open` |

Details of each format: [Exports and integrations](/sessioncost-help/reference/exports/).
