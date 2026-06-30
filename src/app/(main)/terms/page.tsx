import { type Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

const sections = [
  {
    title: 'Using Casa Cadence',
    body: [
      'You may use Casa Cadence only if you can form a binding agreement and comply with these terms and applicable laws.',
      'You are responsible for the information you add to the service and for keeping your account credentials secure.',
    ],
  },
  {
    title: 'Accounts',
    body: [
      'You must provide accurate account information and keep it up to date.',
      'You are responsible for activity that happens through your account unless you notify us promptly that your account has been compromised.',
    ],
  },
  {
    title: 'Acceptable Use',
    body: [
      'Do not misuse the service, interfere with its operation, attempt unauthorized access, upload malicious code, or use Casa Cadence to violate the rights of others.',
      'We may suspend or terminate access if we believe these terms are being violated.',
    ],
  },
  {
    title: 'Your Content',
    body: [
      'You keep ownership of household notes, tasks, routines, and other content you add to Casa Cadence.',
      'You give us permission to process that content as needed to provide, secure, support, and improve the service.',
    ],
  },
  {
    title: 'Service Changes',
    body: [
      'Casa Cadence is evolving. We may add, change, or remove features, and we may suspend or discontinue parts of the service with reasonable notice when practical.',
    ],
  },
  {
    title: 'No Professional Advice',
    body: [
      'Casa Cadence may help organize household care, but it does not provide legal, financial, medical, safety, construction, or professional maintenance advice.',
      'You are responsible for deciding when to consult a qualified professional.',
    ],
  },
  {
    title: 'Disclaimers',
    body: [
      'The service is provided as is and as available. To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.',
    ],
  },
  {
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent permitted by law, Casa Cadence will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of data, profits, or goodwill.',
    ],
  },
  {
    title: 'Termination',
    body: [
      'You may stop using Casa Cadence at any time. We may suspend or terminate access if needed to protect the service, users, or legal rights.',
    ],
  },
  {
    title: 'Changes to These Terms',
    body: [
      'We may update these terms as the product changes. If changes are material, we will provide reasonable notice through the service or by email.',
    ],
  },
]

export default function TermsOfService() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-cyan-700">
            Last updated: June 30, 2026
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            These terms govern your use of Casa Cadence. By creating an account
            or using the service, you agree to these terms.
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
              Questions about these terms can be sent to{' '}
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
