---
title: How the money is counted
description: How exact the tokens are for each agent, and how SessionCost prices each kind of token.
audience: technical
---
**Tokens: exact**, from the agent's own log. **Money: an estimate** at list prices; your bill may differ (plan,
contract rates, batch, cloud provider). Cursor and Copilot Chat keep no token counts, so for them tokens are estimated
from the size of the text, and the money is shown as a range.

Prefer to watch? [See the prices in use and how to set your own](/sessioncost-help/demo/scene6.html) in a walkthrough
that plays by itself. All of them: [Watch and try](/sessioncost-help/watch/).

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

## Where the prices come from

SessionCost ships with a price list that was checked on the providers' own pricing pages. It records the day it was
checked. Each report shows that day.

- **Price changes with a date.** When a provider announces a new price from a given day, the list keeps both prices.
  Each call is priced at the rate for the day it ran.
- **An old list warns you.** When the list is more than 60 days old, every report says so and tells you how to
  update it.

To see the prices in use, type `/sessioncost prices` in a chat or run `sessioncost prices` in a terminal. It shows
each model's prices, where each price came from and the day the list was checked.

Prices are applied in this order. Each one wins over the ones before it:

1. **The price list**: the built-in one, or a newer one you fetched with `sessioncost prices update`.
2. **Your team's file**, if you set one.
3. **Your own prices.**

## Your own prices

All prices are US dollars per million tokens. Set only the models whose price differs from the list.

| Type in a chat | Or run in a terminal | What it does |
|---|---|---|
| "Opus: 4 input, 20 output" | `sessioncost prices set claude-opus-5-5 --input 4 --output 20` | Sets one model. Add `--cache-read R` and `--cache-write W` if you know them. If you leave them out, they come from the list. A model the list does not know gets its cache priced as input. |
| `/sessioncost prices import rates.csv` | `sessioncost prices import rates.csv` | Imports a `.csv` with the columns `model, input, output, cache_read, cache_write`, or a `.json` file. |
| `/sessioncost prices team rates.csv` | `sessioncost prices team rates.csv` | Uses a price file your team shares, for example on a shared drive. It is read again for every report, so a change to it takes effect at once. `team off` stops using it. |
| `/sessioncost prices update` | `sessioncost prices update` | Fetches SessionCost's newest checked price list. |

Once you set your own prices, reports say **"at your own prices"**. Your prices are saved in
`~/.sessioncost/prices.json`. To use a price file for one report only, run `sessioncost --prices my-prices.json`.

## Does it go online?

Only when you run `prices update`. That command fetches the price list from the public SessionCost repository and
sends nothing. If the fetch fails, nothing changes and the list you had stays in use. Apart from installing and
updating SessionCost itself, no other part of it goes online.

## On a subscription

On a monthly plan (Claude Pro or Max, ChatGPT) you are not billed per token. `sessioncost --subscription` labels the
money as **API-equivalent**: what the same chat would have cost at API prices. It is a fair way to compare chats, not
your bill.
