---
title: How the money is counted
description: How exact the tokens are for each agent, and how SessionCost prices each kind of token.
audience: technical
---
**Tokens: exact**, from the agent's own log. **Money: an estimate** at list prices; your bill may differ (plan,
contract rates, batch, cloud provider). Cursor and Copilot Chat keep no token counts, so for them tokens are estimated
from the size of the text, and the money is shown as a range.

## How exact, by agent

| Agent | Tokens |
|---|---|
| **Claude Code** | Exact, from its log. |
| **Codex** | Exact, from its log. |
| **GitHub Copilot CLI** | Exact, from its log. Money is API-equivalent: Copilot bills premium requests, not tokens. |
| **GitHub Copilot Chat (VS Code)** | Estimated from text size: the log has few token counts and no cache, so the cost is shown as a range. |
| **Antigravity** | Exact, from its log. |
| **Cursor** | Estimated from text size. Exact with your usage export: `sessioncost --cursor-usage file.csv`. |

## Each kind of token

| Kind | What it is | Price |
|---|---|---|
| **New input** | Text sent to the model for the first time. | Full input price. |
| **Written to the cache** | Text the provider stores so it can be re-read cheaply. | Set by the provider; for Claude, a little above the input price. |
| **Re-read from the cache** | Earlier chat sent again, served from the cache. | About a tenth of the input price. |
| **Output** | What the model writes back. | The output price. |

Prices are the providers' public API prices. The report shows the date of the price list it used.

## Your own prices

Write only what differs, in USD per million tokens; the rest stays built in. Price classes are `input`, `output`,
`cache_read`, `cache_write_5m` and `cache_write_1h`.

```json
{
  "models": {
    "claude-sonnet-5-5": { "input": 1.6, "output": 8.0 }
  }
}
```

- For one report: `sessioncost --prices my-prices.json`.
- Every time: save it as `~/.sessioncost/prices.json`.

## On a subscription

On a monthly plan (Claude Pro or Max, ChatGPT) you are not billed per token. `sessioncost --subscription` labels the
money as **API-equivalent**: what the same chat would have cost at API prices. It is a fair way to compare chats, not
your bill.
