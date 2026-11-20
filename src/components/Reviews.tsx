import { REVIEWS } from '../data/reviews'
import { Reveal, SectionHeading, Stars } from './ui'

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-24 bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading id="reviews-title">Trusted by Busy Families &amp; Offices in Moncton</SectionHeading>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.08} className="h-full">
              <figure data-testid="review-card" className="flex h-full flex-col rounded-xl border border-line bg-white p-7 shadow-sm">
                <Stars />
                <blockquote className="mt-4 flex-1 text-slate-body">“{review.quote}”</blockquote>
                <figcaption className="mt-6">
                  <h3 className="font-heading font-bold text-navy">{review.name}</h3>
                  <p className="text-sm text-slate-body">{review.town}, NB</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
