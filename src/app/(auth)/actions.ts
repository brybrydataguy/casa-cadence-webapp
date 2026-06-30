'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

async function getOrigin() {
  const headerStore = await headers()
  const origin = headerStore.get('origin')

  if (origin) {
    return origin
  }

  const host = headerStore.get('host') ?? 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  return `${protocol}://${host}`
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

function redirectWithAuthError(path: string, message: string): never {
  const params = new URLSearchParams({ error: message })

  redirect(`${path}?${params.toString()}`)
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
