# Repository Guidelines

## Product Direction

Casa Cadence is a household care app. Treat the core of the work as user experience: identify the user flow, define how that flow will be verified, then implement until the verified experience is good enough to ship.

When changing UI, prefer small, coherent steps that preserve the warm Casa Cadence visual system in `docs/design_system.png`. The current palette is defined in `src/styles/tailwind.css`; reuse those tokens before adding new colors.

## Current App Shape

- This repo is a root Next.js App Router app under `src/app`.
- Shared UI lives in `src/components`.
- Images and brand assets live in `src/images`.
- Global Tailwind theme tokens live in `src/styles/tailwind.css`.
- The app is still being adapted from the Tailwind Plus Pocket template, so do not assume old “Pocket” content is intentional product copy.

## Common Commands

- `npm run dev` starts the local Next.js dev server.
- `npm run lint` runs ESLint.
- `npm run build` runs the production Next.js build.

`next build` may update `next-env.d.ts` between dev and production route type references. Do not include that generated churn in unrelated commits; restore it before wrapping up unless the task explicitly concerns Next type generation.

## UI And Design

- Prefer the actual usable app screen over landing-page filler.
- Keep visual changes consistent with the Casa Cadence design system: warm background, brown primary actions, tan accents, soft borders, and restrained shadows.
- Use existing components and Tailwind classes where possible.
- Use local brand assets from `src/images` for logos and favicon work.
- Verify important visual changes in a browser, especially header/logo, mobile navigation, hero layout, and any responsive behavior.

## Implementation Notes

- Keep edits scoped to the task. This worktree may already contain user changes.
- Do not revert files you did not intentionally change.
- Use `apply_patch` for manual source edits.
- Avoid adding new dependencies unless they clearly reduce complexity and fit the existing stack.
- The current project has `sharp` available for local image processing scripts when needed.

## Verification Expectations

Before finishing a code change, run the smallest useful verification:

- For source or styling changes, run `npm run lint`.
- For app-level changes, run `npm run build`.
- For user-facing UI changes, also load the app in a browser and visually check the affected viewport.

If verification cannot run, clearly explain what failed and why.
