---
title: What the guard checks
description: Every check the guard makes, its answer (blocked, asked, logged), when it runs, how each agent's hooks change it, and the OWASP tags.
---
The guard runs in the agent's own hooks, on your computer, with no AI model. It sees each tool step as the agent is
about to run it, and each result as it comes back. This page is the complete list. For a gentler start, see
[Why you need the guard](/sessioncost-help/guard/what-it-does/).

## How it decides

- **Three answers.** *Blocked*: the step does not run, and the agent is told why and the safer way. *Asked*: you
  answer yes or no. *Goes ahead*: logged only.
- **Asked once, then remembered for the chat**, unless the table says *every time*. A push is remembered per
  destination; an MCP tool per server; a script on disk per version of the file.
- **Untrusted content raises the bar.** After the agent reads a web page, an MCP or network result, or a file from
  outside the project, pushes, sending data out, secrets and rule changes ask again even if you allowed them. After a
  result with **signs of a prompt injection**, any risky step is blocked instead. Your next message resets this; with
  **strict** mode it lasts for the whole chat.
- **Commands are read the way the shell reads them**: quotes joined (`.e''nv` is `.env`), inner shells opened
  (`bash -c`, `sh -c`, `pwsh -Command`, `cmd /c`), heredocs, PowerShell here-strings and `python -c` scripts looked
  into. Text that is only quoted (a commit message, an issue comment) is not taken for a command.

## Blocked: the never list

| Check | Examples | OWASP |
|---|---|---|
| Reading or sending a secret | `.env`, `~/.ssh`, `id_rsa`, `.pem` / `.key`, credentials, `.npmrc` / `.pypirc`; Grep inside them; a key-shaped value in a command, URL or MCP call | LLM02:2025, ASI03 |
| A secrets file in a commit | `git commit` that would take one into history, including what `git add -A`, `git add .` or `commit -a` in the same command adds; `.gitignore`d files never count | — |
| Printing the environment | `printenv`, `env`, `Get-ChildItem env:`, `print(os.environ)`, `echo $OPENAI_API_KEY` | LLM02:2025 |
| Running code from the internet | `curl … \| sh`, `iex (iwr …)`, `bash <(curl …)`, download then run in one command | ASI05 |
| Hidden commands | `powershell -EncodedCommand`, `base64 -d … \| sh` | ASI05 |
| Rewriting shared history | `git push --force` / `-f` / `--force-with-lease`, a `+` refspec, `filter-branch`, `filter-repo` | LLM06:2025 |
| Switching off commit checks | `--no-verify`, `commit -n`, `SKIP=…`, `HUSKY=0`; marked even when refused | LLM06:2025 |
| Persistence | `crontab`, `schtasks /create`, `Register-ScheduledTask`, Run keys, startup folders, `systemctl enable`, `launchctl load`, `~/.bashrc`, `$PROFILE` | ASI10 |
| Switching off a security tool | Defender, the firewall, SELinux, Gatekeeper | LLM06:2025 |
| Wiping | `rm -rf /`, `rm -rf ~`, `Remove-Item C:\` | LLM06:2025, ASI02 |
| Changing the guard | its settings, log or folder, `.sessioncost-allow`, the agents' hook files, `disableAllHooks`, installed plugins, `guard off` | LLM06:2025, ASI10 |
| A poisoned MCP server's tools | every tool of a server whose descriptions showed injection signs at the start | LLM01:2025, ASI04 |
| A risky step after an injection | any asked step below, right after a result with injection signs | LLM01:2025, ASI01 |

## Asked

| Check | When | OWASP |
|---|---|---|
| Push | once per destination; a push straight to a web address every time | LLM06:2025 |
| Install | once per package for the project's own packages | LLM03:2025, ASI04 |
| A package not in the project's lists | **every time**, named (`pyproject.toml`, `requirements*.txt`, `uv.lock`, `package.json`; a folder with no list is not judged) | LLM03:2025, ASI04 |
| Deleting files | once each; files the agent created in this chat go ahead | LLM06:2025 |
| Writing outside the project | once each; the system temp folder goes ahead | LLM06:2025 |
| A new website | once per site; well-known look-up sites (language docs, PyPI, npm, GitHub, Read the Docs…) and localhost go ahead | ASI02 |
| The agent's own rules and checks | **every time**: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, agent settings, `.mcp.json`, git hooks, pre-commit, CI workflows. A plain note in the agent's own memory folder: once per chat | — |
| An MCP tool that changes or sends | once per server; arguments with a path outside the project, `DROP TABLE` or `DELETE FROM` ask too | ASI02 |
| Raising its own rights | **every time**: `sudo`, `su`, `runas`, `chmod 777`, `Set-ExecutionPolicy Bypass` | LLM06:2025, ASI03 |
| A script that prints a key | a script about to print a key, token or password variable | LLM02:2025, ASI03 |
| Sending data out after a key appeared | **every time**, once a key-shaped value came back in a tool result | LLM02:2025, ASI03 |
| A script on disk with a never-list step | `sh setup.sh`, `python tool.py`, `./build.sh`: once per version of the file | ASI05 |
| A new or changed skill, plugin or MCP server | before its first use (Claude Code) | ASI04 |
| A third try of a failing command | the same command failed twice in a row with no file changed (Claude Code) | — |
| A risky step after untrusted content | pushes, sending data out, secrets and rule changes, even if allowed before | LLM01:2025, LLM06:2025, ASI01, ASI02 |

Code written into a command (a heredoc, `python -c`, `node -e`) is only logged.

## When the chat starts

Before any tool runs, the guard reads what the chat loads into the model:

- **Rules and memory**: `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, Cursor rules, the agent's memory for the project, and each
  skill's description. Signs of a prompt injection stop risky steps for the whole chat, and the report names the file.
- **MCP tool descriptions**: the guard asks its own short-lived copy of each local MCP server for its tool list (all at
  once, at most 5 seconds) and reads every description, parameter and the server's instructions. A poisoned server's
  tools are blocked for the chat. A project's `.mcp.json` server is only started once you approved it in the agent;
  online servers and servers that do not answer in time are named as not checked.
- **Fingerprints** (Claude Code): skills, plugins and MCP servers are hashed and compared with the last chat in that
  folder.

## After each result

- **Injection signs**: steering phrases, fake system tags, characters a person cannot see, and text that addresses its
  reader as an agent. Only a yes/no is kept, never the text. A result of the agent's own Edit or Write is not scanned
  (it wrote that text); reading the file back is.
- **Keys**: a key-shaped value in a result is marked, and from then on anything that sends data out asks.

## By agent

Each agent's hooks show the guard different things, so the same rules reach a little further in some agents than in
others.

| | Claude Code | Codex | Cursor | Antigravity | Copilot CLI / VS Code |
|---|---|---|---|---|---|
| How it is added | the plugin | `guard setup codex` | `guard setup cursor` | `guard setup antigravity` | `guard setup copilot` |
| Steps checked before they run | all tools | all tools, patches included | shell commands, MCP calls, file reads (not file edits: Cursor has no hook before an edit) | all tools | all tools |
| Asked steps | you are asked | blocked; the agent asks you in the chat, and your yes allows that step once | you are asked (a file read cannot ask, so it is blocked) | asked with `force_ask`, so Antigravity's "Always allow" cannot skip it | you are asked; in Autopilot mode, blocked |
| Results scanned for injection and keys | yes | yes | shell, MCP and file reads | no (its hook carries no result; a page still counts as untrusted) | yes |
| Third try of a failing command | yes | no | no | no | no |
| Untrusted content lasts until | your next message | your next message | the end of the chat | the end of the chat, unless the build sends your message | your next message |
| Turn on for one chat | `/livesession` | — | — | — | — |
| Turn on for every chat | `sessioncost guard on` | same | same | same | same |

**When the guard itself fails**, the never list still blocks and other steps go ahead, so work does not stop;
`sessioncost guard fail-closed on` blocks everything instead. Copilot lets a step run if a check takes longer than 10
seconds.

## What it cannot do

- It matches known patterns in the text of each step. It does not understand intent, and it cannot see what a hook does
  not show it (see the table above). Use it with your other controls, not instead of them.
- By the time it reads a poisoned MCP description, the agent has read it too. The guard blocks that server's tools and
  every risky step, but a description that only asks for a wrong answer, with no step behind it, cannot be blocked:
  remove that server.
- A determined program running with your rights can get around text rules. The guard catches an agent being steered;
  it is not a boundary against malware already on the machine.

How often it asks in real work: [Why you need the guard](/sessioncost-help/guard/what-it-does/#how-often-will-it-bother-me).
