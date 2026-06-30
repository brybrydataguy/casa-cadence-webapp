import { type Metadata } from 'next'
import Link from 'next/link'

import { signInWithGoogle, signUpWithPassword } from '@/app/(auth)/actions'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export const metadata: Metadata = {
  title: 'Sign Up',
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key]

  return typeof value === 'string' ? value : undefined
}

export default async function Register({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const params = searchParams ? await searchParams : {}
  const error = getParam(params, 'error')
  const next = getParam(params, 'next') ?? '/dashboard'

  return (
    <AuthLayout
      title="Create your Casa Cadence account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-cyan-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form action={signUpWithPassword}>
        <input type="hidden" name="next" value={next} />
        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="First name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
          />
          <TextField
            label="Last name"
            name="last_name"
            type="text"
            autoComplete="family-name"
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Create account
        </Button>
      </form>
      <form action={signInWithGoogle} className="mt-4">
        <input type="hidden" name="next" value={next} />
        <Button type="submit" variant="outline" color="gray" className="w-full">
          Continue with Google
        </Button>
      </form>
    </AuthLayout>
  )
}
