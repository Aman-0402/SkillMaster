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

### 2026-11-20 (action buttons)
- Restyled Sign in / Register / Enquire now: 44px height, brand gradient CTA with glow and arrow badge, brand-tinted Register hover, press and focus states (`src/components/navbar.tsx`)

### 2026-11-20 (blog dropdown)
- Blog is now a dropdown: Latest articles (`/blog`), Tutorials (`/blog/tutorials`), Career guides (`/blog/career-guides`), News (`/blog/news`), with promo card (`src/components/navbar.tsx`)

### 2026-11-20 (instructors dropdown)
- Instructors is now a dropdown: All instructors (`/instructors`), Become an instructor (`/instructors/join`), Top rated (`/instructors/top`), with promo card (`src/components/navbar.tsx`)

### 2026-11-20 (courses dropdown)
- Courses is now a dropdown: Frontend, Backend, Data Analyst, AI (`/courses/frontend`, `/courses/backend`, `/courses/data-analyst`, `/courses/ai`), with a promo card (`src/components/navbar.tsx`)

### 2026-11-20 (navbar names)
- Renamed navbar sections to the screenshot names: Courses, Instructors, Blog (plain links), About (dropdown: About us, Portfolio, FAQ), Contact. Removed Services/Company/Careers/Resources groups. Mobile menu gets an Explore section (`src/components/navbar.tsx`, `src/App.tsx`)

### 2026-11-20 (revert)
- Reverted simple dark navbar (`73309fa`); DeepSetu-style mega navbar restored (`src/components/navbar.tsx`, `src/App.tsx`)

### 2026-11-20 (navbar)
- Scaffolded Vite + React 19 + TS + Tailwind v3 app with `@/` alias (`package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/`)
- Added navbar modeled on deepsetuai.in: sticky, hide-on-scroll-down, scroll progress bar, hover/click mega menu with promo card, black full-screen mobile menu. Brand palette copied to Tailwind config (`src/components/navbar.tsx`, `tailwind.config.js`)
- Added `dist/` to `.gitignore`

### 2026-11-20
- Installed `react` and `react-dom` (`package.json`, `package-lock.json`)
- Added `web-dev-skills/` skills pack (`web-dev-skills/`)
- Created agent rules and update log (`Agent.md`)
- Added `.gitignore` (`.gitignore`)
