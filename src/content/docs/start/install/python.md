---
title: Install with Python (PyPI)
description: Install SessionCost with pip, pipx or uv, then one setup command gives every agent /sessioncost and /liveguard.
audience: everyone
---

Needs Python 3.10 or newer.

```sh
python -m pip install -U sessioncost     # -U also updates an older copy
python -m sessioncost setup              # adds /sessioncost and /liveguard to your agents
```

On Mac or Linux, use `python3` if `python` is not found. Prefer isolated tools? `pipx install sessioncost` or
`uv tool install sessioncost`, then `sessioncost setup`.

For each agent it finds, setup prints `/sessioncost and /liveguard added` and `live guard ready`. Restart your
agents, then type **`/sessioncost`** in a chat. Installed an agent later? Run `setup` again.

**New versions:** `/sessioncost update` in a chat, or `python -m sessioncost update` in a terminal.
