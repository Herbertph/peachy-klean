import { ShieldCheck, Sparkles } from 'lucide-react'
import { Reveal, SectionHeading, Stars } from './ui'

const ITEMS = [
  {
    title: '5-Star Local Service',
    text: 'Moncton families and businesses rate us 5 stars for punctual, friendly and thorough cleaning.',
    icon: <Stars />,
  },
  {
    title: 'Vetted & Insured Team',
    text: 'Every cleaner is background-checked, trained in-house and fully bonded and insured.',
    icon: <ShieldCheck aria-hidden="true" className="h-7 w-7 text-peach-text" />,
  },
  {
    title: 'Eco-Friendly & Pet-Safe',
    text: 'We use non-toxic, biodegradable products that are safe for kids, pets and the planet.',
    icon: <Sparkles aria-hidden="true" className="h-7 w-7 text-peach-text" />,
  },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <SectionHeading id="why-title">Why Choose Us</SectionHeading>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:divide-x md:divide-line">
          {ITEMS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="flex flex-col items-center px-6">
              <div className="flex h-8 items-center">{item.icon}</div>
              <h3 className="mt-3 font-heading text-lg font-bold text-navy">{item.title}</h3>
              <p className="mt-2 max-w-xs text-slate-body">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
