'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

const PHONE_OTP_COOKIE = 'casa_phone_otp'

async function getOrigin() {
  const headerStore = await headers()
  const origin = headerStore.get('origin')

  if (origin) {
    return origin
  }

  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    process.env.VERCEL_URL ??
    headerStore.get('host') ??
    'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  return host.startsWith('http') ? host : `${protocol}://${host}`
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key)

  return typeof value === 'string' ? value.trim() : ''
}

function getNextPath(formData: FormData) {
  const next = getString(formData, 'next')

  if (!next.startsWith('/') || next.startsWith('//')) {
    return '/dashboard'
  }

  return next
}

function normalizePhone(value: string) {
  const normalized = value.replace(/[\s().-]/g, '')

  if (!/^\+[1-9]\d{6,14}$/.test(normalized)) {
    return ''
  }

  return normalized
}

function redirectWithAuthError(path: string, message: string): never {
  const params = new URLSearchParams({ error: message })

  redirect(`${path}?${params.toString()}`)
}

function redirectToLogin(params: Record<string, string>): never {
  const searchParams = new URLSearchParams(params)

  redirect(`/login?${searchParams.toString()}`)
}

export async function signInWithPassword(formData: FormData) {
  const email = getString(formData, 'email')
  const password = getString(formData, 'password')
  const next = getNextPath(formData)

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirectWithAuthError('/login', 'We could not sign you in with those details.')
  }

  redirect(next)
}

export async function sendPhoneOtp(formData: FormData) {
  const next = getNextPath(formData)
  const phone = normalizePhone(getString(formData, 'phone'))

  if (!phone) {
    redirectToLogin({
      error: 'Enter a phone number in international format, like +15551234567.',
      next,
    })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithOtp({ phone })

  if (error) {
    redirectToLogin({
      error: 'We could not send a verification code to that phone number.',
      next,
    })
  }

  const cookieStore = await cookies()
  cookieStore.set(PHONE_OTP_COOKIE, phone, {
    httpOnly: true,
    maxAge: 10 * 60,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  redirectToLogin({
    message: 'Enter the verification code sent to your phone.',
    next,
    phone_otp: 'sent',
  })
}

export async function verifyPhoneOtp(formData: FormData) {
  const next = getNextPath(formData)
  const token = getString(formData, 'token').replace(/\s/g, '')
  const cookieStore = await cookies()
  const phone = cookieStore.get(PHONE_OTP_COOKIE)?.value

  if (!phone) {
    redirectToLogin({
      error: 'Request a new phone verification code.',
      next,
    })
  }

  if (!/^\d{6}$/.test(token)) {
    redirectToLogin({
      error: 'Enter the 6-digit verification code.',
      next,
      phone_otp: 'sent',
    })
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: 'sms',
  })

  if (error) {
    redirectToLogin({
      error: 'That verification code is invalid or expired.',
      next,
      phone_otp: 'sent',
    })
  }

  cookieStore.set(PHONE_OTP_COOKIE, '', {
    maxAge: 0,
    path: '/',
  })

  redirect(next)
}

export async function signUpWithPassword(formData: FormData) {
  const firstName = getString(formData, 'first_name')
  const lastName = getString(formData, 'last_name')
  const email = getString(formData, 'email')
  const password = getString(formData, 'password')
  const next = getNextPath(formData)
  const origin = await getOrigin()

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: [firstName, lastName].filter(Boolean).join(' '),
      },
    },
  })

  if (error) {
    redirectWithAuthError('/signup', 'We could not create an account with those details.')
  }

  if (!data.session) {
    const params = new URLSearchParams({
      message: 'Check your email to confirm your account.',
    })

    redirect(`/login?${params.toString()}`)
  }

  redirect(next)
}

export async function signInWithGoogle(formData: FormData) {
  const next = getNextPath(formData)
  const origin = await getOrigin()
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  })

  if (error || !data.url) {
    redirectWithAuthError('/login', 'Google sign-in is not available yet.')
  }

  const redirectUrl = data.url

  redirect(redirectUrl)
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/login')
}
