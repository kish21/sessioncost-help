---
title: Install with Python (PyPI)
description: pip, pipx or uv tool, then setup adds /sessioncost and /livesession to every agent.
---
Needs **Python 3.10 or newer**. In a terminal:

```sh
python -m pip install -U sessioncost     # -U also updates an older copy
python -m sessioncost setup              # adds /sessioncost and /livesession to your agents
```

- For each agent it finds, setup prints `/sessioncost and /livesession added` and `live guard ready`. Restart your
  agents, then type **`/sessioncost`** in a chat.
- `python -m sessioncost` works even when Windows cannot find the `sessioncost` command (common with the Microsoft
  Store Python). On Mac or Linux, use `python3` if `python` is not found.
- Prefer isolated tools? `pipx install sessioncost` or `uv tool install sessioncost`, then `sessioncost setup`.

Installed an agent later? Run `python -m sessioncost setup` again.

[Back to Install](/sessioncost-help/start/install/)
