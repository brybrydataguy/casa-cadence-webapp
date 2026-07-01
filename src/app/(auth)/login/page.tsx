import { type Metadata } from 'next'
import Link from 'next/link'

import {
  sendPhoneOtp,
  signInWithGoogle,
  signInWithPassword,
  verifyPhoneOtp,
} from '@/app/(auth)/actions'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'

export const metadata: Metadata = {
  title: 'Sign In',
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>

function getParam(
  params: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = params[key]

  return typeof value === 'string' ? value : undefined
}

export default async function Login({
  searchParams,
}: {
  searchParams?: SearchParams
}) {
  const params = searchParams ? await searchParams : {}
  const error = getParam(params, 'error')
  const message = getParam(params, 'message')
  const next = getParam(params, 'next') ?? '/dashboard'
  const isPhoneOtpSent = getParam(params, 'phone_otp') === 'sent'

  return (
    <AuthLayout
      title="Sign in to Casa Cadence"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/signup" className="font-semibold text-cyan-600">
            Sign up
          </Link>
          .
        </>
      }
    >
      <form action={signInWithPassword}>
        <input type="hidden" name="next" value={next} />
        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}
        {message && (
          <p className="mb-6 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-800">
            {message}
          </p>
        )}
        <div className="space-y-6">
          <TextField
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign in
        </Button>
      </form>

      <form action={signInWithGoogle} className="mt-4">
        <input type="hidden" name="next" value={next} />
        <Button type="submit" variant="outline" color="gray" className="w-full">
          Continue with Google
        </Button>
      </form>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <p className="text-sm font-semibold text-gray-500">or use a phone code</p>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {isPhoneOtpSent && (
        <form action={verifyPhoneOtp}>
          <input type="hidden" name="next" value={next} />
          <TextField
            label="Verification code"
            name="token"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
          />
          <Button type="submit" color="cyan" className="mt-4 w-full">
            Verify phone code
          </Button>
        </form>
      )}

      <form action={sendPhoneOtp} className={isPhoneOtpSent ? 'mt-6' : undefined}>
        <input type="hidden" name="next" value={next} />
        <TextField
          label={isPhoneOtpSent ? 'Send a new code' : 'Phone number'}
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+15551234567"
          required
        />
        <Button type="submit" variant="outline" color="gray" className="mt-4 w-full">
          Send phone code
        </Button>
      </form>
    </AuthLayout>
  )
}
