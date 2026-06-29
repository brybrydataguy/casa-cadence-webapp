import { AppDemo } from '@/components/AppDemo'
import { Container } from '@/components/Container'
import { PhoneFrame } from '@/components/PhoneFrame'

const workflowItems = [
  'Calendar and timeline view',
  'Smart reminders',
  'Photos, notes, and docs',
  'Works on all your devices',
]

type TrustItem = [
  label: string,
  Icon: (props: React.ComponentPropsWithoutRef<'svg'>) => React.ReactNode,
]

const trustItems: Array<TrustItem> = [
  ['Family-first', HeartIcon],
  ['Privacy focused', LockIcon],
  ['Reliable', ShieldIcon],
  ['Built for real homes', HomeIcon],
]

function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="m5 10 3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeartIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2m-11 0h12v10H6V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ShieldIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 21s7-3.5 7-10V5l-7-2-7 2v6c0 6.5 7 10 7 10Zm-3-9 2 2 4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HomeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 11 8-7 8 7v9h-5v-6H9v6H4v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SecondaryFeatures() {
  return (
    <section
      id="how-it-works"
      className="border-y border-gray-200 bg-gray-100 py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="mx-auto max-w-xl lg:col-span-5 lg:mx-0">
            <p className="text-sm font-semibold tracking-wide text-cyan-900 uppercase">
              Designed for real life
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-gray-900 sm:text-4xl">
              Your home. Organized.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple, beautiful space to plan your home and life with clarity.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-gray-700">
              {workflowItems.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 flex-none text-cyan-900" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[366px] lg:col-span-7">
            <div className="absolute inset-8 rounded-full bg-white blur-3xl" />
            <PhoneFrame className="relative mx-auto w-full max-w-[366px]">
              <AppDemo />
            </PhoneFrame>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <p className="text-center text-sm font-semibold text-gray-900">
            Trusted by households that like things to run smoothly.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-6 text-sm text-gray-700 sm:grid-cols-4">
            {trustItems.map(([label, Icon]) => (
              <li
                key={label}
                className="flex items-center justify-center gap-3"
              >
                <Icon className="h-6 w-6 text-gray-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
