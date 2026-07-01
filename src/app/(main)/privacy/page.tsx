import { type Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

const sections = [
  {
    title: 'Information We Collect',
    body: [
      'We collect account information you provide, such as your name, email address, and sign-in details.',
      'As Casa Cadence grows, we may collect household care information you choose to add, such as rooms, routines, tasks, notes, maintenance reminders, and related preferences.',
      'We also collect basic technical information needed to run and secure the service, such as device, browser, log, and usage information.',
    ],
  },
  {
    title: 'How We Use Information',
    body: [
      'We use your information to create and protect your account, provide the Casa Cadence service, remember your preferences, improve the product, and communicate important service updates.',
      'We do not sell your personal information.',
    ],
  },
  {
    title: 'Authentication Providers',
    body: [
      'If you sign in with Google or another authentication provider, we receive the account information needed to authenticate you, such as your name, email address, and provider account identifier.',
      'We use that information only to sign you in, maintain your account, and provide the service.',
    ],
  },
  {
    title: 'Data Sharing',
    body: [
      'We share information with service providers that help us operate Casa Cadence, such as hosting, authentication, analytics, email, and database providers.',
      'We may also disclose information if required by law, to protect rights and safety, or as part of a business transfer.',
    ],
  },
  {
    title: 'Data Security',
    body: [
      'We use reasonable technical and organizational safeguards to protect your information. No internet service can guarantee perfect security, so please use a strong password and keep your account credentials private.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'We keep personal information for as long as needed to provide the service, comply with legal obligations, resolve disputes, and enforce agreements.',
      'You may request account deletion or data removal by contacting us.',
    ],
  },
  {
    title: 'Children',
    body: [
      'Casa Cadence is not intended for children under 13, and we do not knowingly collect personal information from children under 13.',
    ],
  },
  {
    title: 'Changes',
    body: [
      'We may update this policy as the product changes. If changes are material, we will provide a reasonable notice through the service or by email.',
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-cyan-700">
            Last updated: June 30, 2026
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Casa Cadence helps households manage care routines and maintenance.
            This policy explains what information we collect, how we use it, and
            the choices you have.
          </p>

          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base text-gray-600">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
              Contact
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Questions about this policy can be sent to{' '}
              <Link
                href="mailto:hello@casacadence.com"
                className="font-semibold text-cyan-700 hover:text-cyan-900"
              >
                hello@casacadence.com
              </Link>
              .
            </p>
          </section>
        </div>
      </Container>
    </section>
  )
}
