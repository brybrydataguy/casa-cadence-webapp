import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'

export function CallToAction() {
  return (
    <section id="about" className="pb-20 sm:pb-28">
      <Container>
        <div className="grid items-center gap-8 rounded-2xl border border-gray-200 bg-gray-100 px-6 py-8 shadow-sm shadow-gray-900/5 sm:px-10 lg:grid-cols-[auto_1fr_auto]">
          <Logo className="h-14 w-auto" />
          <div>
            <h2 className="text-2xl font-medium tracking-tight text-gray-900">
              Ready to bring cadence home?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join households creating more flow, less stress, and a home that
              runs smoothly.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/register">Get started</Button>
            <Button href="/#how-it-works" variant="outline">
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
