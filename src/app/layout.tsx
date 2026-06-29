import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Casa Cadence',
    default: 'Casa Cadence - A home that runs smoothly.',
  },
  description:
    'Manage household routines, cleaning, items, and maintenance so nothing slips through the cracks.',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('bg-background antialiased', inter.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
