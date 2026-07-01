import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import livingRoom from '@/images/living_room.png'

const highlights = [
  ['Stay on top of everything', 'Tasks, rooms, and routines in one place.'],
  [
    'Plan, track, and get reminders',
    'Keep the small jobs from becoming surprises.',
  ],
  ['Everyone in sync', 'Share the plan with the people who live it.'],
]

function LockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 8V6.5a3.5 3.5 0 1 1 7 0V8M5.5 8h9v7.5h-9V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HighlightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 7.5h8M8 12h8M8 16.5h5M6 3.5h12A1.5 1.5 0 0 1 19.5 5v14a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 19V5A1.5 1.5 0 0 1 6 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pb-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-6 lg:mx-0">
            <div className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-900 uppercase">
              <LockIcon className="h-4 w-4" />
              Private by design
            </div>
            <h1 className="mt-6 text-4xl font-medium tracking-tight text-gray-900 sm:text-6xl">
              A home that runs smoothly. Every day.
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Casa Cadence helps you manage household routines, cleaning, items,
              and maintenance so nothing slips through the cracks.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/signup">Get started</Button>
              <Button href="/dashboard" variant="outline">
                Open dashboard
              </Button>
              <Button href="/#how-it-works" variant="outline">
                See how it works
              </Button>
            </div>
            <ul className="mt-12 grid gap-6 text-sm text-gray-700 sm:grid-cols-3">
              {highlights.map(([title, description]) => (
                <li key={title}>
                  <HighlightIcon className="h-7 w-7 text-gray-700" />
                  <p className="mt-3 font-semibold text-gray-900">{title}</p>
                  <p className="mt-1 text-gray-600">{description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
            <div className="absolute inset-0 rounded-full bg-gray-100 blur-3xl" />
            <Image
              src={livingRoom}
              alt="A calm living room with a sofa, plants, and warm wood accents."
              className="relative mx-auto aspect-[4/5] w-full max-w-lg rounded-3xl object-cover object-center shadow-2xl shadow-gray-900/10"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
