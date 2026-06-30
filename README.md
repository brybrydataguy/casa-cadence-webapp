# Casa Cadence

Casa Cadence is a household care app for keeping cleaning, maintenance, and home routines from slipping through the cracks. The app is built with Next.js App Router and Tailwind CSS.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Common Commands

```bash
npm run dev
npm run lint
npm run build
npm run db:reset
```

## Project Shape

- App routes live in `src/app`.
- Public marketing routes live in `src/app/(main)`.
- Authentication routes and callbacks live in `src/app/(auth)`.
- Protected Casa app routes live in `src/app/(casa)`.
- Shared UI lives in `src/components`.
- Brand images live in `src/images`.
- Tailwind theme tokens live in `src/styles/tailwind.css`.
- Design reference lives at `docs/design_system.png`.

## Authentication

Supabase authentication is planned for signup, login, Google OAuth, protected dashboard access, and local email testing. See `docs/auth.md` for the focused auth setup and verification plan.

When Supabase is wired in, local development will use:

```bash
npx supabase start
npx supabase status -o env
npm run db:reset
npm run dev
```

## Deployment

The app is intended to deploy on Vercel from Git. Database changes should roll out through Supabase's GitHub integration so production merges apply migrations and pull requests can get preview databases.

See `docs/deployment.md` for:

- Vercel deployment setup.
- Required Supabase environment variables.
- How to create and verify migrations.
- How Supabase GitHub integration applies migrations.
- How preview branches should pair with Vercel preview URLs.

## Verification

Before wrapping source or styling changes, run:

```bash
npm run lint
```

For app-level changes, also run:

```bash
npm run build
```

For user-facing UI changes, load the affected route in a browser and check the relevant viewport.

## License

This project was adapted from a Tailwind Plus template. Follow the applicable Tailwind Plus license for template-derived code.
