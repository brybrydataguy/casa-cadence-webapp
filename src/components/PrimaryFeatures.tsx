import { Container } from '@/components/Container'

const features = [
  {
    name: 'Tasks & Cleaning',
    description:
      'Create routines and checklists for daily, weekly, and seasonal chores.',
    icon: ClipboardIcon,
  },
  {
    name: 'Maintenance',
    description:
      'Track maintenance schedules and get reminders before issues arise.',
    icon: WrenchIcon,
  },
  {
    name: 'Items & Inventory',
    description:
      'Keep a record of belongings, warranties, and replacement cycles.',
    icon: BoxIcon,
  },
  {
    name: 'Household Sync',
    description:
      'Assign tasks, share updates, and stay aligned with your household.',
    icon: PeopleIcon,
  },
]

function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-cyan-900">
      {children}
    </div>
  )
}

function ClipboardIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 5.5h6M9.5 3.5h5l1 2h2A1.5 1.5 0 0 1 19 7v12a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19V7a1.5 1.5 0 0 1 1.5-1.5h2l1-2ZM9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function WrenchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m14.5 6 3-3a4.5 4.5 0 0 1-5.3 5.8L5.8 15.2a2.1 2.1 0 1 0 3 3l6.4-6.4A4.5 4.5 0 0 1 21 6.5l-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BoxIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v8.5m0 9.5v-9.5m0 0 8-4.5m-8 4.5-8-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PeopleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8.5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19a5 5 0 0 1 10 0m-3-2.5A5 5 0 0 1 20.5 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PrimaryFeatures() {
  return (
    <section id="features" className="border-t border-gray-200 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Everything you need to care for your home
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Keep daily chores, maintenance, belongings, and shared household
            work organized without turning home care into a second job.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <li
              key={feature.name}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-900/5"
            >
              <IconFrame>
                <feature.icon className="h-7 w-7" />
              </IconFrame>
              <h3 className="mt-5 font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-sm text-gray-700">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
