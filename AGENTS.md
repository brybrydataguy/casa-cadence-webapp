# Repository Guidelines

## Product Direction

Casa Cadence is a household care app. Treat the core of the work as user experience: identify the user flow, define how that flow will be verified, then implement until the verified experience is good enough to ship.

When changing UI, prefer small, coherent steps that preserve the warm Casa Cadence visual system in `docs/design_system.png`. The current palette is defined in `src/styles/tailwind.css`; reuse those tokens before adding new colors.

## Current App Shape

- This repo is a root Next.js App Router app under `src/app`.
- Public marketing routes live in `src/app/(main)`.
- Authentication routes and callbacks live in `src/app/(auth)`.
- Protected Casa app routes live in `src/app/(casa)`.
- Shared UI lives in `src/components`.
- Images and brand assets live in `src/images`.
- Global Tailwind theme tokens live in `src/styles/tailwind.css`.
- The app is still being adapted from the Tailwind Plus Pocket template, so do not assume old “Pocket” content is intentional product copy.

## Progressive Discovery

Keep this file as the routing layer for agents. Add only durable, repo-wide rules here. Put detailed setup notes, flow maps, and troubleshooting in focused docs, then link to them from this section.

- For product setup and daily commands, start with `README.md`.
- For authentication, Supabase, Google OAuth, dashboard redirects, and local email testing, read `docs/auth.md`.
- For Vercel deployment, Supabase environments, and migration rollout, read `docs/deployment.md`.
- For visual changes, inspect `docs/design_system.png` and reuse tokens from `src/styles/tailwind.css`.
- If a task only touches one area, read the focused doc for that area before opening unrelated docs.

## Common Commands

- `npm run dev` starts the local Next.js dev server.
- `npm run lint` runs ESLint.
- `npm run build` runs the production Next.js build.
- `npm run db:reset` resets the local Supabase database and applies seeds.

When Supabase auth is implemented, prefer these local commands:

- `npx supabase start` starts the local Supabase stack.
- `npx supabase status -o env` prints app env values for `.env.local`.
- `npx supabase stop` stops the local Supabase stack.
- `npx supabase migration new <name>` creates a migration file.
- `npx supabase db reset` verifies local migrations from a clean database.
- `npx supabase db push` applies pending migrations to a linked remote Supabase project.

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

## Authentication Notes

- Use `@supabase/ssr` for Next.js auth once Supabase is wired in.
- Protect app-only routes such as `/dashboard` server-side; signed-out users should redirect to `/login`.
- Keep Supabase service role keys out of browser-facing code and `NEXT_PUBLIC_*` env vars.
- Configure Google OAuth through Supabase provider settings and env-backed local config, not hardcoded source values.
- Keep auth UI consistent with the Casa visual system and verify the flow in a browser.

## Deployment Notes

- Treat Vercel app deploys and Supabase database migrations as coordinated but separate systems: Vercel deploys the app, Supabase GitHub integration applies database changes.
- Use `.` as the Supabase GitHub integration working directory when the root repo contains `supabase/`.
- Roll schema changes forward with committed files in `supabase/migrations` and verify them locally before merging.
- Keep Supabase Branching enabled so pull requests can get migrated preview databases for Vercel preview URLs.
- Do not run database migrations from the Vercel Next.js build.
- Use `docs/deployment.md` for the current migration rollout policy before changing deployment workflows.

## Verification Expectations

Before finishing a code change, run the smallest useful verification:

- For source or styling changes, run `npm run lint`.
- For app-level changes, run `npm run build`.
- For user-facing UI changes, also load the app in a browser and visually check the affected viewport.

If verification cannot run, clearly explain what failed and why.
