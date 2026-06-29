import Link from 'next/link'

import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

const footerGroups = [
  {
    title: 'Product',
    links: [
      ['Features', '/#features'],
      ['How It Works', '/#how-it-works'],
      ['Reviews', '/#reviews'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['About', '/#about'],
      ['Contact', 'mailto:hello@casacadence.com'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '#'],
      ['Terms', '#'],
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-100">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-[1fr_auto]">
          <div>
            <Logo className="h-12 w-auto" />
            <p className="mt-6 text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Casa Cadence, Inc. All rights
              reserved.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-semibold text-gray-900">{group.title}</h2>
                <ul className="mt-4 space-y-3 text-gray-600">
                  {group.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-gray-900">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
