---
title: How we test the guard
description: How the live guard is tested before each release, what the tests cover, the results for each agent, and what has and has not been tried in the real agent.
---
The guard makes a decision on every step an agent takes, so we test those decisions on their own, for every agent,
before each release. This page says how, what is covered, and where the testing stops.

**Release tested:** 0.6.0-rc.6, 1 November 2026.

## How we test

We test in two ways, because they prove different things.

1. **The guard's decisions, step by step.** A test program sends each step to the guard in exactly the form each
   agent sends it: the same tool names and fields that Claude Code, Codex, Cursor, Antigravity and Copilot put in
   their hook messages. The guard answers *goes ahead*, *asked* or *blocked*, and the program compares that with the
   expected answer. It runs in a separate guard folder, needs no AI model and takes a few seconds, so it runs before
   every release.
2. **Real chats in the real agent.** A person uses the agent on a test project and asks it to do risky things in
   plain words ("show me the .env file", "install requests", "force-push"). This proves what the first test cannot:
   that the agent really starts the guard, really sends the step, and really obeys the answer.

The test program also replays every command the agents ran in those real chats, so a form of a command we did not
think of (one agent wrote `.\.venv\Scripts\pip.exe install requests` instead of `pip install requests`) becomes a
test for every agent.

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

## Results

| | Claude Code | Codex | Cursor | Antigravity | Copilot |
|---|---|---|---|---|---|
| Steps with the expected answer | 190 of 190 | 185 of 185 | 185 of 185 | 190 of 190 | 190 of 190 |
| Steps the agent's hooks do not show the guard | none | file reads, searches and web fetches (Codex does these through its shell, which is checked) | file writes, searches and web fetches | none | none |
| Tried in the real agent for this release | yes | not yet | not yet | yes (Windows) | not yet |

**What "not yet" means.** For Codex, Cursor and Copilot, the guard reads their hook messages as their documentation
describes them, and the guard's answers to those messages are tested above. For this release nobody has yet confirmed
in the real agent that the hooks start and that the agent obeys the answer. Until that is done, treat the guard in
those agents as a preview.

Some answers depend on what happened earlier in the chat: a yes you already gave, a file the agent made itself, a web
page read just before a push. Those are tested in real chats only, not by the test program.

## Found and fixed by this testing

Testing for this release found risky commands that went ahead without a question, all fixed before release:

- Windows forms of known commands: `pip.exe install`, `python.exe -c`, `npm.cmd`, `git.exe push`, `powershell -ec`.
- Package tools beyond pip and npm: `poetry add`, `pipx install`, `conda install`.
- Secrets read in other ways: `.NET` file reads, `%VAR%` and `GetEnvironmentVariable`, a `.env` path in quotes.
- Whole areas: other stored logins, throwing work away, wiping a disk, changes to the computer itself.

Two things found are not fixed yet:

- Reading `.sessioncost-allow` (allowed by design) is blocked as if the agent were changing it.
- In Antigravity on Windows, a command window flashes before and after each step while the guard starts.

## Limits

The guard matches known patterns in each step. It does not understand intent, and a risky command in a form no rule
knows goes ahead. Testing narrows that gap; it cannot close it. The full list of limits, by agent, is on
[What the guard checks](/sessioncost-help/guard/checks/#by-agent). Use the guard with your other controls, not
instead of them.
