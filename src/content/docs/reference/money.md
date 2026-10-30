---
title: How the money is counted
description: How SessionCost prices each kind of token.
---
Each kind of token is priced on its own:

| Kind | What it is | Price |
|---|---|---|
| **New input** | Text sent to the model for the first time. | Full input price. |
| **Written to the cache** | Text the provider stores so it can be re-read cheaply. | Set by the provider; for Claude, a little above the input price. |
| **Re-read from the cache** | Earlier chat sent again, served from the cache. | About a tenth of the input price. |
| **Output** | What the model writes back. | The output price. |

Prices are the providers' public API prices. The report shows the date of the price list it used.

## Your own prices

- For one report: `sessioncost --prices my-prices.json`.
- Every time: put them in `~/.sessioncost/prices.json`.

## On a subscription

On a monthly plan (Claude Pro or Max, ChatGPT) you are not billed per token. `sessioncost --subscription` labels the
money as **API-equivalent**: what the same chat would have cost at API prices. It is a fair way to compare chats, not
your bill.
