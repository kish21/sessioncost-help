---
title: Security model and how we test
description: What SessionCost reads, keeps and never sends; what the guard protects against and what it does not; how the guard is tested before each release.
audience: technical
---
## What it reads, keeps and sends

- It reads your agent's own log files **on your computer**.
- It calls **no AI model** and collects **zero telemetry**. Reports and logs are files on your computer.
- **Strict offline mode (zero outbound network calls):** run `sessioncost setup --offline`, `sessioncost guard offline on`, or set `SESSIONCOST_OFFLINE=1`. This guarantees zero outbound network requests across LiveGuard, price updates, and self-updates.
- **Default online mode:** the only automatic outbound lookup is LiveGuard's fresh-release check, which sends **only** the public package name to `pypi.org` or `registry.npmjs.org` when an agent installs a public package. Installs using private/custom registries (`--index-url`, `--extra-index-url`, `--find-links`, `--registry`, `PIP_INDEX_URL`, `UV_INDEX_URL`, `NPM_CONFIG_REGISTRY`) and scoped npm packages (`@org/pkg`) are skipped automatically so internal package names never leave your machine. Disable this check alone with `sessioncost guard fresh-releases off`.
- **Explicit user-triggered commands only:** `sessioncost update` (or `--to <version>`) and `sessioncost prices update` contact PyPI / GitHub only when you run them, and both refuse to go online when offline mode is enabled.
- An API key or token inside a command (`sk-…`, `ghp_…`, `AKIA…` and the like) is shown as **[secret hidden]** everywhere in the report, the exports and the guard's notes.
- The guard keeps only a yes/no for "signs of an injection", never the text of the page or result.

For InfoSec reviewers: see [SECURITY.md](https://github.com/kish21/sessioncost/blob/main/SECURITY.md) (file & network access table) and the full [Threat model](https://github.com/kish21/sessioncost/blob/main/docs/security/THREAT-MODEL.md). Where each local file lives: [Files and settings](/sessioncost-help/how/files-and-settings/).

## What the guard protects against

| Threat | What the guard does |
|---|---|
| The agent is steered by a page, file or tool result (prompt injection) | Risky steps after outside content ask; after content with injection signs they are blocked |
| Hidden instructions in what the chat loads (rules files, memory, skills, MCP tool descriptions) | Risky steps stopped for the whole chat; a poisoned MCP server's tools blocked |
| Secrets leaking into the chat, a commit or the network | Reading, printing or committing a secret is blocked; sending data out after a key appeared asks every time |
| Code from the internet run unread | `curl … \| sh` and its kind blocked; a script on disk with a never-list step asks |
| Invented or changed packages, plugins, skills, MCP servers | A package not in the project's lists asks every time; a new or changed plugin, skill or server asks before first use |
| The agent switching off its own controls | Changing the guard, its hooks, its log or the allow file is blocked; skipping commit checks is blocked |

**Out of scope:** malware already running with your rights, intent that no pattern shows, and what an agent's hooks
do not show the guard ([by agent](/sessioncost-help/guard/checks/#by-agent)). Use the guard with your other
controls, not instead of them.

## How we test

We test in two ways, because they prove different things.

1. **The guard's decisions, step by step.** A test program sends each step to the guard in exactly the form each
   agent sends it: the same tool names and fields that Claude Code, Codex, Cursor, Antigravity and Copilot put in
   their hook messages. It compares the guard's answer with the expected one. It needs no AI model and takes a few
   seconds, so it runs before every release.
2. **Real chats in the real agent.** A person asks the agent to do risky things in plain words ("show me the .env
   file", "install requests", "force-push"). This proves what the first test cannot: that the agent really starts
   the guard, sends the step, and obeys the answer.

The test program also replays every command the agents ran in those real chats, so a form of a command we did not
think of (one agent wrote `.\.venv\Scripts\pip.exe install requests`) becomes a test for every agent.

## What the tests cover

Each area is tested with the everyday form of the command and the forms agents really use: Windows and PowerShell
versions, `.exe` names, a folder in front, quoted paths with spaces.

| Area | Expected answer | Examples tested |
|---|---|---|
| Creating files in the project, look-only commands, well-known sites | goes ahead | `git status`, `dir`, `echo $env:PATH`, docs.python.org |
| Installing packages | asked | `pip`, `pip.exe`, `python -m pip`, `uv`, `poetry`, `pipx`, `conda`, `npm` |
| Deleting files or work | asked | `rm`, `del`, `Remove-Item`, `git clean`, `git checkout -- .`, `git restore`, `git stash drop`, `terraform destroy`, `DROP TABLE` through `psql` |
| Writing outside the project | asked | a file in your home folder |
| Pushing | asked | `git push`, `git.exe push` |
| New websites, DNS look-ups, email | asked | httpbin.org, `curl`, `Invoke-WebRequest`, `nslookup`, `Send-MailMessage` |
| Raising rights or changing the computer | asked, every time | `sudo`, `runas`, `chmod 777`, `icacls`, new users and admin groups, services, the machine's registry, shutdown, `docker run --privileged`, `rundll32` |
| Secrets and stored logins | blocked | `.env` read thirteen ways, `$env:` and `%…%` variables, `.git-credentials`, Kubernetes and cloud logins, browser cookies, `cmdkey /list`, a key in a command |
| Printing every environment variable | blocked | `printenv`, `env`, `set`, `Get-ChildItem env:` |
| Running code from the internet | blocked | `curl … \| sh`, `iwr … \| iex`, download then run |
| Force-push, skipping commit checks | blocked | `--force`, `-f`, `+main`, `--no-verify`, `commit -n` |
| Hidden commands | blocked | `powershell -EncodedCommand`, `-enc`, `-ec` |
| Setting something to run later | blocked | `schtasks`, `Register-ScheduledTask`, Run keys, `~/.bashrc`, `$PROFILE`, `crontab` |
| Switching off a security tool | blocked | Defender, its exclusions, the firewall |
| Wiping a disk | blocked | `format D:`, `diskpart`, `mkfs`, `dd` |
| Everyday look-alikes | goes ahead | `git checkout main`, `git stash`, `docker ps`, `terraform plan`, a `SELECT`, `msbuild`, `taskkill` |

The last row matters as much as the others: a guard that asks about everyday work gets switched off.

The test program also checks the guard itself:

| Area | What is tested |
|---|---|
| The log | very long steps (over 4 KB, 64 KB and 300 KB); an empty, missing, unreadable, edited or cut-off log; 2, 10 and 20 steps of one chat written at the same moment |
| Fail-closed | a step message that is not valid JSON, or not an object, for each of the five agents, with fail-closed on and off |
| The allow file | rules with and without `*` against chained commands: a rule never covers a second step chained after the one it names |

## Results

**Release:** 1.2.9 (26 November 2026). Full test suite: **786 automated tests** across all five agents (Claude Code, GitHub Copilot [VS Code & CLI], Cursor, Codex, and Antigravity), including native Windows hook tests without `bash` on `PATH`, strict offline mode, and pinned update flows.

- **Red-team suite:** **81 cases** — **76 handled as intended**, **5 known gaps** (documented in the [Threat model](https://github.com/kish21/sessioncost/blob/main/docs/security/THREAT-MODEL.md)).
- **Real-world replay:** **637 sessions** across Claude Code (290), Antigravity (153), Codex (119), and Cursor (75), **59,111 tool steps** — **97.95% passed**, **1.30% blocked**, **0.75% asked** (~0.7 prompts per session).

| | Claude Code | Codex | Cursor | Antigravity | Copilot (VS Code & CLI) |
|---|---|---|---|---|---|
| Hook support | Full lifecycle + subagents (`guard.sh` + native Windows `guard.ps1`) | `~/.codex/hooks.json` (asks map to chat-confirm blocks) | `~/.cursor/hooks.json` (toggle via terminal; read asks map to deny) | `~/.gemini/config/hooks.json` (`ask` → `force_ask`) | `~/.copilot/hooks/sessioncost-guard.json` (native Windows `pythonw.exe`, no `bash` required) |
| Steps the agent's hooks do not show the guard | none | built-in web search | file writes, searches, web fetches | `PostToolUse` tool output text | none (10s hook timeout fails open) |

## Known problems

- The log's turn-taking (two steps written at the same moment) is tested on Windows only so far.

## Report a security problem

Please report security problems privately, not in a public issue: on GitHub, open the **Security** tab of
[the SessionCost repository](https://github.com/kish21/sessioncost) and choose **Report a vulnerability**. You will get
an answer within a few days. Only the latest release is supported.

SessionCost is free and open source under the [MIT license](https://github.com/kish21/sessioncost/blob/main/LICENSE).
