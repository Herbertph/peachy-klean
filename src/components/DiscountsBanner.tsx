import { DISCOUNTS } from '../data/cleaningData'
import { btnPrimary } from './ui'

export function DiscountsBanner() {
  return (
    <section aria-labelledby="discounts-title" className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border-2 border-peach/40 bg-cream p-8 text-center sm:p-10">
          <h2 id="discounts-title" className="font-heading text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Save More with Recurring Cleaning
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {DISCOUNTS.map((d) => (
              <li
                key={d.label}
                className={`relative rounded-xl border-2 bg-white px-4 py-5 ${d.popular ? 'border-peach' : 'border-line'}`}
              >
                {d.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-peach-text px-3 py-0.5 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <span className="block font-heading text-lg font-bold text-navy">{d.label}</span>
                <span className="text-peach-text font-semibold">Save {d.save}</span>
              </li>
            ))}
          </ul>
          <a href="#quote" className={`${btnPrimary} mt-8`}>
            GET A FREE QUOTE
          </a>
        </div>
      </div>
    </section>
  )
}
