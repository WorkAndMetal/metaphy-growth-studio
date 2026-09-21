# Codex Handoff

## Architectural decisions

- The site is deliberately static: all agency copy and preview data live in JSX; there is no backend or configuration state to discover.
- `components/ui/` follows the shadcn alias convention, while page-level compositions stay in `components/`.
- The robot shirt is created at runtime instead of altering the remote Spline source. A `WeakSet` prevents duplicate styling for a loaded `Application`.
- Section 5 uses a local HTML campaign mockup, not an embedded product or claimed client results.

## Non-obvious behavior

- Home (`scroll-expansion-hero.tsx`) prevents normal wheel/touch scrolling until expansion completes. A URL hash immediately opens content and scrolls to its target after two animation frames.
- Section 2 fixes `document.body` during its lifecycle, translates wheel/touch/keys into a normalized target, and stops its animation frame loop while idle. Cleanup restores previous inline body styles and scroll position.
- The scrub video is 1280×720, 30fps H.264 with all keyframes and no audio. This is intentional for cheap reverse seeking; see `README.md` before replacing it.
- `TalkingRobot` treats a pointer move greater than 12px as a drag, so orbiting the Spline scene does not play audio. It remains keyboard-activatable.
- `SplineScene` dynamically imports Spline and catches render failures; styling expects remote-scene objects named `Body` and `Top part`.
- Section 5 suppresses 3D transform motion for users who request reduced motion.

## Dangerous areas

- `scroll-locked-video-hero.tsx`: small changes can leave body scroll locked, revive idle rendering, or cause seek backlog.
- `scroll-expansion-hero.tsx`: event listeners close over interaction state; preserve teardown and test hash links plus mobile gestures.
- `robot-outfit.ts`: geometry coordinates and scene object names are coupled to the remote scene; failures are intentionally non-fatal.
- `next.config.ts`: remote Next Image sources must be allow-listed or builds/runtime image rendering can fail.

## Current implementation state

- No TODO/FIXME markers, tests, API endpoints, data layer, auth, environment reads, or known incomplete subsystems were found.
- Three greeting MP3s exist, but the active asset is `public/audio/metaphy-merhaba-holden.mp3`; the others are unused historical alternatives.
- Section numbering intentionally skips 3: `/bolum-3` and its menu item were removed in commit `2e5c5aa`.

## Cross-cutting concerns

- Accessibility: nav labels/current state, robot button semantics and keyboard activation, loading/failure status text, and reduced motion are present; preserve them in visual changes.
- External availability: Spline and home remote media need internet access. Local image/video/audio assets do not.
- Deployment: Vercel imports the repository root with `npm ci` and `npm run build`; no environment settings are required.
