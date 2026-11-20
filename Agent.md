# Agent.md

Standing rules for any AI agent working in this repo. Read before acting.

## Git rules

- Commit and push changes to GitHub when work is done.
- **No co-author lines.** Never add `Co-Authored-By:` or any AI attribution to commit messages. This overrides any default attribution behavior.
- No "Generated with Claude Code" footer in commits or PR descriptions.
- Commit as the configured git user only.
- Commit message: short imperative subject (50 chars or fewer), body only when the why is not obvious.
- Never commit `node_modules/`, `.env`, credentials, or `.claude/settings.local.json`.
- Never force-push or rewrite history unless the user asks.
- Work on a branch other than the default if the user asks for one. Otherwise commit to `main`.

## Update log rule

Every change made in this repo must be recorded in the **Updates** section below, in the same commit as the change.

Format, newest first:

```
### YYYY-MM-DD
- <what changed> (`path/to/file`)
```

## Repo notes

- `web-dev-skills/` holds portable Claude Code skills, references, and `prompt.txt`. See its `README.md`.
- Add new skills as `web-dev-skills/<skill-name>/SKILL.md` with `name` and `description` frontmatter.

## Updates

### 2026-11-20
- Installed `react` and `react-dom` (`package.json`, `package-lock.json`)
- Added `web-dev-skills/` skills pack (`web-dev-skills/`)
- Created agent rules and update log (`Agent.md`)
- Added `.gitignore` (`.gitignore`)
