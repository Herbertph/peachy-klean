import { useRef, useState, type KeyboardEvent } from 'react'
import { m, useReducedMotion } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import { CHECKLIST } from '../data/cleaningData'
import kitchenImage from '../assets/placeholders/kitchen.jpg'
import { SectionHeading } from './ui'

export function Checklist() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const reduce = useReducedMotion()

  const select = (index: number) => {
    setActive(index)
    tabs.current[index]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const last = CHECKLIST.length - 1
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[
      e.key
    ]
    if (next === undefined) return
    e.preventDefault()
    select(next)
  }

  const current = CHECKLIST[active]

  return (
    <section id="checklist" aria-labelledby="checklist-title" className="scroll-mt-24 bg-slate-light py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading id="checklist-title">Our Cleaning Checklist</SectionHeading>
          <p className="mt-4 text-lg text-slate-body">Exactly what we clean, room by room, on every visit.</p>
        </div>

        <div role="tablist" aria-label="Rooms" className="mt-10 flex flex-wrap justify-center gap-2" onKeyDown={onKeyDown}>
          {CHECKLIST.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${tab.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${
                i === active ? 'border-peach-text bg-peach-text text-white' : 'border-line bg-white text-navy hover:border-peach'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          tabIndex={0}
          className="mt-8 rounded-xl border border-line bg-white p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy sm:p-8"
        >
          <m.ul
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {current.items.map((item) => (
              <li key={item} className="flex gap-3 text-navy">
                <CircleCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-peach-text" />
                {item}
              </li>
            ))}
          </m.ul>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            { label: 'Before', alt: 'Kitchen before cleaning, dull and cluttered', filter: 'grayscale contrast-75 brightness-75 sepia' },
            { label: 'After', alt: 'The same kitchen after a Peachy Deep Clean, bright and spotless', filter: '' },
          ].map((photo) => (
            <figure key={photo.label} className="relative overflow-hidden rounded-xl">
              <img
                src={kitchenImage}
                alt={photo.alt}
                width={1200}
                height={719}
                loading="lazy"
                className={`aspect-[5/3] w-full object-cover ${photo.filter}`}
              />
              <figcaption className="absolute left-3 top-3 rounded-md bg-navy px-3 py-1 text-sm font-bold text-white">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
