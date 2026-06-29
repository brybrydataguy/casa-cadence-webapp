import { Container } from '@/components/Container'

const reviews = [
  {
    quote:
      'Casa Cadence keeps our family on the same page. The house finally runs like we want it to.',
    author: 'Sarah M.',
    location: 'Austin, TX',
  },
  {
    quote: 'I love the maintenance reminders. No more last minute surprises.',
    author: 'Jordan K.',
    location: 'Portland, OR',
  },
  {
    quote:
      'Simple to use, beautiful design, and a game changer for our busy household.',
    author: 'Michael T.',
    location: 'Denver, CO',
  },
]

export function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Loved by families and home teams
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Built for the people who keep the home moving every day.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
        >
          {reviews.map((review) => (
            <li
              key={review.author}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm shadow-gray-900/5"
            >
              <p className="text-base/7 font-semibold text-gray-900 before:content-['“'] after:content-['”']">
                {review.quote}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-cyan-900">
                  {review.author
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.author}
                  </p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
