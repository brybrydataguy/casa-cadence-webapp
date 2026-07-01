# Authentication

This document is the focused reference for Casa Cadence authentication work. Keep root `AGENTS.md` short and route detailed auth setup, flow notes, and troubleshooting here.

## Goal

The first auth milestone is a real Supabase-backed signup and login flow that sends authenticated users to a placeholder dashboard.

Expected routes:

- `/login` lets existing users sign in.
- `/signup` lets new users create an account.
- `/register` may remain as a compatibility redirect to `/signup`.
- `/auth/callback` handles Supabase OAuth and email callback redirects.
- `/dashboard` is protected and redirects signed-out users to `/login`.

Route groups:

- `src/app/(auth)` owns auth screens, auth actions, and auth callback routes.
- `src/app/(casa)` owns protected product app routes such as `/dashboard`.
- `src/app/(main)` owns public marketing pages.

## Local Supabase

Use the Supabase CLI for local auth development.

```bash
npx supabase start
npx supabase status -o env
npm run db:reset
npm run dev
```

Copy the public Supabase URL and anon key from `npx supabase status -o env` into `.env.local`.

Expected app env values:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not put Supabase service role keys in browser-facing env vars.

## Local Email Testing

The local Supabase stack includes an email inbox for auth messages. Use it to inspect signup confirmation, magic link, or OTP messages without sending real email.

Local email inbox:

```text
http://127.0.0.1:54324
```

Casa Cadence uses a separate local Supabase port range so it can run alongside the reference SaaS kit:

```text
API: http://127.0.0.1:55321
Studio: http://127.0.0.1:55323
Email inbox: http://127.0.0.1:55324
```

## Local Phone OTP Testing

Phone OTP login is enabled in `supabase/config.toml` for local development. The
local config includes a Twilio provider block plus a deterministic test OTP so
the flow can be verified without sending a real SMS:

```text
Phone: +15555550100
Code: 123456
```

For local test OTP, the Twilio env vars can be placeholders. Use real values
when testing actual SMS delivery:

```bash
SUPABASE_AUTH_SMS_TWILIO_ACCOUNT_SID=
SUPABASE_AUTH_SMS_TWILIO_MESSAGE_SERVICE_SID=
SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN=
```

Flow:

- Submit the phone number on `/login`.
- Supabase sends or records the SMS OTP and the app stores the pending phone
  number in an HTTP-only, short-lived cookie.
- Submit the 6-digit code on `/login`.
- A successful verification creates the normal Supabase session and redirects
  to `/dashboard`.

Hosted Supabase projects still need phone authentication enabled on the Auth
Providers page and an SMS provider such as Twilio, MessageBird, Vonage, or
TextLocal configured before real phone delivery works.

## Google OAuth

Google auth should be configured through Supabase provider settings. Keep provider secrets in local environment or Supabase config placeholders, never in source code.

Local configuration should include placeholders for:

```bash
SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID=
SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET=
```

When configuring Google Cloud, include the Supabase callback URL for the active environment. For local development, use the callback URL reported by the local Supabase auth service after the config exists.

## Flow Contract

Implement and verify these behaviors:

- Successful email/password signup creates a Supabase user and lands on `/dashboard`.
- Successful email/password login lands on `/dashboard`.
- Phone OTP login sends an SMS code and verified codes land on `/dashboard`.
- Google sign-in starts the Supabase OAuth flow.
- Visiting `/dashboard` while signed out redirects to `/login?next=/dashboard`.
- Logging out clears the session and returns to `/login` or `/`.
- Auth errors are visible, readable, and styled with Casa Cadence tokens.

## Implementation Notes

- Use `@supabase/ssr` for server and browser clients.
- Keep route protection server-side for protected pages.
- Keep auth forms small and direct; remove leftover Pocket template copy as each route becomes real app UI.
- Prefer Casa tokens from `src/styles/tailwind.css` before adding colors.
- Add focused tests once the flow exists, especially for login redirect, protected dashboard redirect, and logout.

## Verification Checklist

Before wrapping auth work:

- `npm run lint`
- `npm run build`
- Local Supabase is running.
- `.env.local` contains the local Supabase public URL and anon key.
- Signup works in the browser.
- Login redirects to `/dashboard`.
- Phone OTP works locally with `+15555550100` and code `123456`.
- Signed-out `/dashboard` redirects to login.
- Logout clears the session.
- Google auth begins the provider flow when configured.
- `/login`, `/signup`, and `/dashboard` have been visually checked in a browser.

## Troubleshooting

- If Supabase fails to start, check that Docker Desktop is running.
- If auth calls fail immediately, confirm `.env.local` matches `npx supabase status -o env`.
- If Google OAuth fails, confirm the provider is enabled and the callback URL matches the active Supabase environment.
- If phone OTP fails locally, confirm the test phone/code above and restart the Supabase stack after changing `supabase/config.toml`.
- If hosted phone OTP does not send SMS, confirm phone auth and an SMS provider are enabled in the Supabase dashboard.
- If signup succeeds but login behavior is confusing, check whether email confirmation is required.
