# Deployment

This document is the focused reference for Casa Cadence deployment and database migration rollout. Keep root `AGENTS.md` short and route detailed deployment notes here.

## Current Direction

Deploy the Next.js app with Vercel and deploy Supabase schema changes through Supabase's GitHub integration. These are coordinated release systems:

- Vercel deploys the Next.js app from Git.
- Supabase GitHub integration applies migrations from `supabase/migrations`.
- Supabase Branching creates migrated preview databases for pull requests when enabled.
- Supabase Branching can also load configured seed data from `supabase/seed.sql` when `[db.seed]` is enabled in `supabase/config.toml`.

## Vercel App Deploys

Use Vercel's Git integration for the app:

- Pull requests create preview deployments.
- Merges to the production branch create production deployments.
- Configure Vercel environment variables per environment so the app points at the right Supabase project or branch.

Required app environment variables once Supabase auth is wired in:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not add Supabase service role keys as `NEXT_PUBLIC_*` variables.

## Supabase Environments

Use Supabase GitHub integration and Branching for database deployment.

Recommended baseline:

- Local development uses the local Supabase stack.
- Production uses one linked production Supabase project.
- The Supabase GitHub integration uses working directory `.` because this repo stores `supabase/` at the repo root.
- The production branch is `main`.
- Automatic branching is enabled for pull requests.
- Supabase changes only is enabled so preview branches are created only when Supabase files change.
- Branch limit is kept small while the app is early.

This setup lets pull requests that include Supabase changes get a matching preview database for the Vercel preview URL.

## Migration Workflow

Create schema changes as migration files and commit them to Git.

```bash
npx supabase migration new <change_name>
```

Edit the generated SQL file in `supabase/migrations`.

Verify locally from a clean reset:

```bash
npx supabase db reset
```

Before merging, review the migration for:

- RLS on exposed tables.
- Policies that constrain rows by owner or account, not just authenticated role.
- No service role assumptions in app code.
- No direct production-only schema edits made outside migrations.

## Supabase GitHub Integration Rollout

Use the dashboard integration as the normal deployment path:

- Connect the GitHub repository to the Supabase project.
- Set working directory to `.`.
- Enable deploy to production for `main`.
- Enable automatic branching for pull requests.
- Keep "Supabase changes only" enabled unless a broader preview policy is needed.

When a pull request changes files under `supabase/`, Supabase should create or update a preview branch and apply pending migrations there. When `main` receives merged migration files, Supabase applies those changes to the production database.

Only one person or one automation should push migrations to a target Supabase project at a time. Supabase applies pending migration files in timestamp order.

## Preview Seeds And Auth Configuration

Casa Cadence keeps local and preview seed data in `supabase/seed.sql`. The seed is enabled explicitly in `supabase/config.toml`:

```toml
[db.seed]
enabled = true
sql_paths = ["./seed.sql"]
```

Keep preview seed SQL idempotent so repeated preview branch setup can run safely. Test users are acceptable for preview and local development, but do not add seed rows that should never appear in a production database unless the production rollout path excludes seed execution.

Authentication provider settings for preview branches should also live in `supabase/config.toml`. For Google OAuth, the provider block enables the provider, while the client ID and secret come from environment-backed values:

```toml
[auth.external.google]
enabled = true
client_id = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID)"
secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET)"
```

If a preview branch returns `Unsupported provider: provider is not enabled`, the preview Supabase branch did not receive or apply this auth provider configuration. Push the current `supabase/config.toml`, confirm the Supabase GitHub integration ran for the PR, and recreate or redeploy the Supabase preview branch if it was created before the config was fixed.

## Preview URL Contract

For pull requests with database changes:

- Vercel creates a preview app URL.
- Supabase creates a preview database branch and applies migrations.
- The preview app must receive the matching preview Supabase URL and anon key.

The exact environment variable handoff between Supabase Branching and Vercel should be verified during the first integration test. Until that is confirmed, do not claim a preview URL is using the preview database just because both preview systems exist.

## Manual Fallback

If the GitHub integration is unavailable, use the CLI as a fallback:

```bash
npx supabase login
npx supabase link
npx supabase db push
```

Use `npx supabase db push --include-seed` only when production seed data is intentional.

## Avoid

- Do not edit the remote production database schema directly in the Supabase Dashboard once migrations are in use.
- Do not run `supabase db push` in the Vercel build command by default.
- Do not add a second migration automation path while Supabase GitHub integration is active.
- Do not commit secrets to the repository.
- Do not use `migration repair` unless the migration history is known to be out of sync and the actual database state has been confirmed.

## Recovery Notes

If local and remote migration history diverge:

```bash
npx supabase migration list
```

If a remote schema change was made manually, pull it into a migration and commit it:

```bash
npx supabase db pull
```

Use `supabase migration repair` only to correct migration tracking metadata; it does not apply or revert SQL.

## References

- Supabase database migrations: https://supabase.com/docs/guides/deployment/database-migrations
- Supabase Branching: https://supabase.com/docs/guides/deployment/branching
- Vercel Git deployments: https://vercel.com/docs/git
- Vercel environment variables: https://vercel.com/docs/environment-variables
