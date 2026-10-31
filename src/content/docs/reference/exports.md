---
title: Exports and integrations
description: Excel, PDF, JSON and SARIF exports - what each contains and where to use it.
---
Every export is made on your computer from the agent's local log. Nothing is uploaded. Keys inside commands are shown
as **[secret hidden]** in every format.

| Format | How | Best for |
|---|---|---|
| Excel (.xlsx) | **Export Excel** at the top of the report, or in the Trace & risk map / Table view | Sorting and filtering a chat's turns, calls and findings |
| PDF | **Export PDF** (your browser's Save as PDF, A4 landscape) | Attaching to a review, a ticket or an incident |
| JSON | `sessioncost --json > chat.json` | Scripts, dashboards, your own analysis |
| SARIF 2.1.0 | `sessioncost --sarif findings.sarif` | Security tools: GitHub code scanning, SARIF viewers |
| Guard report | `sessioncost guard report` (`--json` for numbers) | Every guarded chat on this computer, across agents |

Each command works for the newest chat of the folder, or any chat: `sessioncost 3f2a9c1e --sarif f.sarif --no-open`.

## Excel

Four sheets, with a coloured header, filters and wrapped text:

- **Turns**: one row per turn, with tokens, cost and time.
- **Calls**: one row per model call, with what it sent (new, written to the cache, re-read) and cost.
- **Tool steps**: every tool step in order, with its call and turn.
- **To check**: the risky steps, sorted high severity first.

## JSON

The same data the report is drawn from: `meta` (agent, model, chat id, times), `totals` and `money`, `setup` (Step 0),
`turns`, `calls`, `helpers` and `agents`, `fixes` with their savings, `watch` (the risky steps) and `guard` (its
decisions for this chat). It is long: send it to a file. Field names follow the report and can change between
versions; `tool` records the version that wrote it.

## SARIF

One `result` per risky step, at `warning` or `error` level by severity, each with:

- a logical location in the session: `session/<id>/turn/<n>/call/<n>/step/<n>`;
- the tool, the kind of step, the time, and the call where untrusted content came in when it followed some;
- the guard's decision and whether you allowed it, when the guard was on;
- the rule's severity and **OWASP tags**: Top 10 for LLM Applications 2025 (`LLM01:2025`…) and for Agentic Applications
  2026 (`ASI01`…). The tag for each check is on [What the guard checks](/sessioncost-help/guard/checks/).

The run records the SHA-256 of the session log it was built from, so a finding can be tied to the exact log.

GitHub code scanning accepts SARIF uploads (the `upload-sarif` action or the code scanning API). Findings point at a
session, not a file in the repository, so they show without a code line.

## Guard report

`sessioncost guard report` writes one HTML page for all guarded chats and agents: what was blocked and asked and why,
by agent, project and day, the latest blocked and asked steps, and whether each chat's hash-chained log is still intact.
`--json` prints the same numbers. The report's own **Guard report** section shows one chat plus the totals.
