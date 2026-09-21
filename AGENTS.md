# Metaphy Growth Agency — Agent Guide

**Context efficiency:** Do not scan or read the entire repository at task start. Read `AGENTS.md` and `PROJECT_MAP.md`, identify the subsystem, then inspect only the minimum files needed. For ordinary localized tasks, use the routing map plus search and inspect the smallest dependency neighborhood.

## Project identity

Five-route Turkish digital-agency showcase: expandable hero, scroll-scrub video, interactive growth system, Spline robot, and a scroll-perspective campaign preview.

## Stack

Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS 4, Framer Motion, Spline runtime/react bindings, Lucide, shadcn-style components. Static site: no database, API routes, auth, forms, server data, or environment variables.

## Commands

```sh
npm ci
npm run dev        # LAN-bound dev server, port 3001
npm run build
npm run typecheck
npm start          # production server
npm run start:lan  # production server on 0.0.0.0:3001
```

Node `24.x` is declared in `package.json`. Vercel needs no environment variables.

## Routes

`/` home; `/bolum-2` video scrub; `/bolum-3` interactive growth system; `/bolum-4` Spline robot; `/bolum-5` scroll campaign preview. `components/site-navbar.tsx` is the shared route menu; keep it synchronized if routes change.

## Rules and constraints

- This is an App Router project. Read the relevant local Next.js documentation in `node_modules/next/dist/docs/` before changing Next-specific behavior.
- Use `@/` aliases; shared UI lives in `components/ui/` as defined by `components.json`.
- Interaction-heavy components are client components. Preserve their effect cleanup, keyboard access, and reduced-motion behavior.
- Public media is intentionally committed. `metro-scrub.mp4` is optimized for interactive seeking; do not casually re-encode or replace it.
- Spline and home-page video/background assets include external URLs; changes need graceful loading/failure handling.
- Do not put secrets in source or documentation. `.env*`, `.next/`, `node_modules/`, `.vercel/`, logs, and local previews are ignored.

## Context rules

- Never recursively read the repository or generated/vendor/build/cache folders to understand a task.
- Start with `PROJECT_MAP.md`; search symbols/references before opening files, and read large files around relevant symbols only.
- Do not reopen understood files in the same task. Use `git status`/`git diff` to assess current edits.
- Expand context only when current evidence is insufficient. `PROJECT_MAP.md` navigates; verify code before structural or risky changes.

Read `docs/CODEX_HANDOFF.md` only for non-obvious implementation decisions and hazards.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
