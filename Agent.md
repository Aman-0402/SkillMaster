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

### 2026-11-20 (hero scene: trainer, colours, win)
- 3D hero scene: climbers get random shirt/skin/hair colours every lap; each climber now reaches the top (6 rungs), turns to camera, jumps with arms up, star spins/pulses and a confetti burst fires; added a trainer (red shirt, cap, clipboard) who spots the ladder and cheers on every win; climbers have faces (`src/components/ladder-scene.tsx`)

### 2026-11-20 (footer)
- Added black footer from user screenshot: text logo, tagline, WhatsApp/phone/email/hours, GitHub/LinkedIn/Instagram circles (LinkedIn/Instagram hrefs are "#" placeholders), Learn/Company/Legal link columns, copyright, Back to top button (`src/components/footer.tsx`, `src/App.tsx`)

### 2026-11-20 (cta banner)
- Added CTA section "Your first class is one sign-up away." after How it works: rounded blue gradient panel, scroll-parallax circles, dot grid, Join now + Browse courses buttons (`src/components/cta-banner.tsx`, `src/App.tsx`)

### 2026-11-20 (how it works scroll redesign)
- How it works redesigned as scroll-driven: sticky left panel with big step counter that swaps per step, spring-filled progress line with dots, active step highlighted while others dim, hover nudge (`src/components/how-it-works.tsx`)

### 2026-11-20 (how it works)
- Added black "From sign-up to first class" section after Featured courses: 4 numbered step cards (account, pick course, batch + UPI pay, start learning) (`src/components/how-it-works.tsx`, `src/App.tsx`)

### 2026-11-20 (featured courses)
- Added white "Featured courses" section after Subjects: 4 course cards (gradient thumbnail, title, description, duration/level/mode, View course link) + "View all courses" button; placeholder course data (`src/components/featured-courses.tsx`, `src/App.tsx`)

### 2026-11-20 (subjects spacing)
- Subjects cards: removed empty top row and min-height; arrow button now sits on the title row (`src/components/subjects.tsx`)

### 2026-11-20 (subjects index removed)
- Removed "01" index label and line from Subjects cards (`src/components/subjects.tsx`)

### 2026-11-20 (subjects bigger type)
- Subjects cards: bigger fonts (title up to 72px, desc 24px, larger tags/count), taller cards, visible index number top-left replaces ghost number, arrow button larger and no longer overlaps (`src/components/subjects.tsx`)

### 2026-11-20 (subjects icons removed)
- Removed icon tiles from Subjects cards (`src/components/subjects.tsx`)

### 2026-11-20 (subjects redesign)
- Subjects section redesigned: 2x2 dark cards with cursor-follow glow, icon tile, ghost index number, description, tags, course count, circular arrow button (`src/components/subjects.tsx`)

### 2026-11-20 (subjects section)
- Added black "Subjects" section below hero: large heading, hairline-divided rows (Frontend, Backend, Data Analyst, AI) with course count + arrow, hover colour/arrow shift, scroll-in animation (`src/components/subjects.tsx`, `src/App.tsx`)

### 2026-11-20 (hero courses)
- Removed English and Maths chips; added "Industry-level courses" label with Frontend, Backend, Data Analyst, AI chips. Intro text now mentions industry-level courses in frontend, backend, data analytics and AI (`src/components/hero.tsx`)

### 2026-11-20 (hero left side)
- Enlarged hero left content: headline up to 100px with hand-drawn underline on "new", larger intro text, taller buttons (64px, Join now fills dark on hover), subject chips as cards with icon tiles (`src/components/hero.tsx`)

### 2026-11-20 (3D scene cleanup)
- Reworked 3D hero scene: 2 students now face the ladder and climb rung by rung with hands on rungs (no overlap), real 5-point star, thinner ladder with feet, 3 small cubes, chips moved off the scene (`src/components/ladder-scene.tsx`, `src/components/hero.tsx`)

### 2026-11-20 (hero 3D resize)
- Hero scene confined to right 30% (grid 7fr/3fr), rescaled to fit, added floating cubes and glass chips (Live online, In-person), 3 students; headline set to balanced wrap (`src/components/hero.tsx`, `src/components/ladder-scene.tsx`)
- Removed navbar scroll progress bar (`src/components/navbar.tsx`)

### 2026-11-20 (3D hero)
- Added 3D scene on hero right side: students climbing a ladder toward a gold star, books stack, soft shadows, pointer parallax. Built with `three` + `@react-three/fiber` (lazy loaded, animation off for reduced motion). Hero is two columns again, left aligned (`src/components/ladder-scene.tsx`, `src/components/hero.tsx`, `package.json`)

### 2026-11-20 (hero card removed)
- Removed the "Your week" card from the hero; hero content is now centered in one column with restored vertical padding (`src/components/hero.tsx`)

### 2026-11-20 (hero tighter, tag removed)
- Tightened hero spacing further (desktop padding 1.5rem, smaller gaps) and removed the "Live online and in-person classes" tag above the headline (`src/components/hero.tsx`)

### 2026-11-20 (hero spacing)
- Cut hero top/bottom padding (lg: 7rem to 3rem, mobile 4rem to 2rem) and moved background glow up (`src/components/hero.tsx`)

### 2026-11-20 (hero)
- Added hero section: headline "Learn something new this week.", subtext, CTAs Browse courses (`/courses`) and Join now (`/join`), subject chips, decorative "Your week" card. Replaced placeholder page content (`src/components/hero.tsx`, `src/App.tsx`)

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
