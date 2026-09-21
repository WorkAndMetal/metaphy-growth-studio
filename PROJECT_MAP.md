# Project Map

## Overview

Static Metaphy Growth Agency marketing site. App Router pages compose client-side visual experiences; content is hard-coded in components and local `public/` media.

## Directory map

| Path | Responsibility |
|---|---|
| `app/` | Routes, root layout, global CSS, per-route metadata |
| `components/` | Page compositions and shared navigation |
| `components/ui/` | Reusable visual/interaction primitives |
| `lib/` | Tailwind helper and Spline robot styling |
| `public/` | Images, greeting MP3s, optimized scrub video |
| `docs/` | Agent handoff context |

## Entry points

| File | Purpose |
|---|---|
| `app/layout.tsx` | HTML language/theme, metadata, global nav |
| `app/page.tsx` | Home composition via `components/demo.tsx` |
| `app/bolum-2/page.tsx` | Local video scrub page props/copy |
| `app/bolum-4/page.tsx` | Spline robot page |
| `app/bolum-5/page.tsx` | Scroll campaign preview page |
| `next.config.ts` | Turbopack/tracing roots and permitted remote images |

## Subsystem routing

| Task | Read first |
|---|---|
| Add/remove/rename a section | `app/*/page.tsx`, `components/site-navbar.tsx`, `app/layout.tsx` |
| Home hero/copy/media | `components/demo.tsx` → `components/ui/scroll-expansion-hero.tsx` → `public/` / `next.config.ts` |
| Home scroll or anchor behavior | `components/ui/scroll-expansion-hero.tsx` → `components/demo.tsx` |
| Section 2 visual/copy | `app/bolum-2/page.tsx` → `components/ui/scroll-locked-video-hero.tsx` |
| Section 2 performance/video | `components/ui/scroll-locked-video-hero.tsx` → `public/media/metro-scrub.mp4` → `README.md` |
| Robot layout/copy | `components/agency-spline.tsx` → `components/talking-robot.tsx` |
| Robot scene/loading/error | `components/talking-robot.tsx` → `components/ui/splite.tsx` |
| Robot shirt/logo geometry | `lib/robot-outfit.ts` → `components/ui/splite.tsx` |
| Robot greeting sound | `components/talking-robot.tsx` → `public/audio/metaphy-merhaba-holden.mp3` |
| Section 5 copy/layout | `components/agency-scroll.tsx` → `components/ui/container-scroll-animation.tsx` |
| Shared styles | `app/globals.css` → relevant component |
| Tailwind/shadcn imports | `components.json` → `lib/utils.ts` → `app/globals.css` |
| Deployment/build | `package.json` → `next.config.ts` → `README.md` |

## Important file index

`components/demo.tsx` — home media selector, agency copy, and expanded content.  
`components/ui/scroll-expansion-hero.tsx` — home wheel/touch expansion state and hash-anchor bootstrap.  
`components/ui/scroll-locked-video-hero.tsx` — gesture/keyboard video scrub loop and body-scroll lock.  
`components/agency-spline.tsx` — section 4 presentation around the robot scene.  
`components/talking-robot.tsx` — accessible robot-triggered audio playback.  
`components/ui/splite.tsx` — lazy Spline loader, error boundary, robot customization hook.  
`lib/robot-outfit.ts` — runtime Spline geometry for shirt and pixel lettering.  
`components/agency-scroll.tsx` — section 5 content and mock campaign UI.  
`components/ui/container-scroll-animation.tsx` — sticky 3D transform with reduced-motion support.  
`components/site-navbar.tsx` — fixed shared route navigation and active-item centering.

## Runtime flows

Home: browser → `app/page.tsx` → `demo.tsx` → expand interaction → `scroll-expansion-hero.tsx` → agency content.  
Section 2: browser → route props → `scroll-locked-video-hero.tsx` → wheel/touch/keys → throttled `<video>.currentTime`.  
Section 4: browser → `agency-spline.tsx` → `TalkingRobot` → Spline lazy load → `dressMetaphyRobot`; click/Enter/Space → local Holden MP3.  
Section 5: browser → `AgencyScroll` → `ContainerScroll` → Framer Motion scroll transforms.

## Auth, backend, data, environment

None. No API routes, database, auth middleware, client store, fetching, server actions, analytics, or environment-variable reads were found.

## Frontend

App Router routes share `RootLayout` and `SiteNavbar`. Tailwind utility classes are primary; `app/globals.css` adds home-page agency classes. Page content is local JSX. Framer Motion powers home/section 5 transforms; Spline scene URL is external; local assets are served from `public/`.

## External services

| Service | Files | Purpose |
|---|---|---|
| Spline | `components/ui/splite.tsx`, `lib/robot-outfit.ts` | Loads and customizes external 3D scene |
| Remote media/CDNs | `components/demo.tsx`, `next.config.ts` | Home video/background and image allow-list |

## Config

`package.json` scripts/runtime; `next.config.ts` build roots/remote images; `tsconfig.json` strict TS + `@/*`; `postcss.config.mjs` Tailwind plugin; `components.json` shadcn aliases; `.gitignore` generated/local artifacts.

## Testing

No test suite. Use `npm run typecheck` and `npm run build`; visually check the route affected, including mobile/touch where gestures are involved.

## Dependency hotspots and impact

| Change | Likely impacts |
|---|---|
| Route/navigation | page file → `site-navbar.tsx` → route metadata/README |
| Home hero interaction | `scroll-expansion-hero.tsx` → `demo.tsx` anchors/media |
| Section 2 input loop | scroll lock, video seek cadence, keyboard/touch accessibility |
| Spline scene object names | `robot-outfit.ts` (`Body`, `Top part`) and visual result |
| Global CSS/theme | all routes, especially home agency sections |

## Common task recipes

**Change home media:** read `demo.tsx`; then validate URL against `next.config.ts` or place asset in `public/`.  
**Change section 2 behavior:** read its route, then the full `useEffect` in `scroll-locked-video-hero.tsx`; test cleanup by navigating away.  
**Change robot appearance:** read `agency-spline.tsx`, `splite.tsx`, `robot-outfit.ts`; inspect actual Spline object names before changing geometry.  
**Change robot voice:** read `talking-robot.tsx`; preserve click/drag/keyboard behavior and update the selected local MP3.  
**Change section 5 animation:** read `agency-scroll.tsx`, then `container-scroll-animation.tsx`; retain `useReducedMotion` handling.
