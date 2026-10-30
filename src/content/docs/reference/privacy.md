---
title: Privacy and security
description: What SessionCost reads, what it keeps, and what it never sends.
---
## What it reads and sends

- SessionCost reads your agent's own log files **on your computer**.
- It calls **no AI model**.
- It sends **nothing anywhere**. The report is one file on your computer.

## Keys stay out of the report

An API key or token inside a command (`sk-…`, `ghp_…`, `AKIA…` and the like) is shown as **[secret hidden]**
everywhere in the report, the exports and the guard's notes. (From 0.6.0.)

## The guard

When you turn the [guard](/sessioncost-help/guard/what-it-does/) on, it also runs on your computer with no AI model.
Its decisions are written to `~/.sessioncost/guard/`, one file per chat, each line chained to the one before so a changed
line shows. Nothing is sent anywhere.

## Report a security problem

Please report security problems privately, not in a public issue: on GitHub, open the **Security** tab of
[the SessionCost repository](https://github.com/kish21/sessioncost) and choose **Report a vulnerability**. You will get
an answer within a few days. Only the latest release is supported.

## License

SessionCost is free and open source under the [MIT license](https://github.com/kish21/sessioncost/blob/main/LICENSE).
