import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import { signOut } from '@/app/(auth)/actions'
import { Logo } from '@/components/Logo'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Dashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/dashboard')
  }

  const firstName =
    typeof user.user_metadata.first_name === 'string'
      ? user.user_metadata.first_name
      : ''

  return (
    <main className="min-h-screen bg-background px-6 py-8 text-text-primary">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex items-center justify-between border-b border-border pb-6">
          <Logo className="h-10 w-auto" />
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-warm-background"
            >
              Sign out
            </button>
          </form>
        </header>

        <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase text-accent">
            Casa Cadence dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
            Welcome{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">
            This is the first protected household hub. Soon it will hold your
            cleaning rhythms, maintenance reminders, rooms, and routines.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            ['Today', 'No household tasks are due yet.'],
            ['Routines', 'Create your first recurring care rhythm.'],
            ['Maintenance', 'Track repairs, filters, and seasonal upkeep.'],
          ].map(([title, copy]) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-text-primary">
                {title}
              </h2>
              <p className="mt-2 text-sm text-text-secondary">{copy}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}
