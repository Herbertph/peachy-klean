import { BadgeCheck, ReceiptText, ShieldCheck } from 'lucide-react'
import aboutImage from '../assets/placeholders/about-cleaner.jpg'
import { Eyebrow, SectionHeading } from './ui'

const GUARANTEES = [
  { title: '100% Satisfaction Guarantee', text: 'Not happy with a spot? We come back for a free re-clean within 24 hours.', Icon: BadgeCheck },
  { title: 'Bonded & Insured', text: 'Full protection against property damage, for total peace of mind.', Icon: ShieldCheck },
  { title: 'No Hidden Fees', text: 'Transparent prices, agreed in advance, before we ever pick up a cloth.', Icon: ReceiptText },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <img
          src={aboutImage}
          alt="A Peachy Klean team member wiping down a window in gloves"
          width={1200}
          height={800}
          loading="lazy"
          className="aspect-[3/2] w-full rounded-2xl object-cover shadow-lg"
        />
        <div>
          <Eyebrow>ABOUT US</Eyebrow>
          <SectionHeading id="about-title">Local, Reliable &amp; Detail-Obsessed</SectionHeading>
          <p className="mt-5 text-lg text-slate-body">
            We are a locally owned cleaning team that lives and works right here in Greater Moncton. Our mission is
            simple: give busy families and businesses their time back.
          </p>
          <p className="mt-4 text-slate-body">
            From weekly upkeep in Moncton to move-out cleans in Dieppe and office care in Riverview, we treat every
            space like our own and sweat the small details others miss.
          </p>
          <ul className="mt-8 space-y-5">
            {GUARANTEES.map(({ title, text, Icon }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream">
                  <Icon aria-hidden="true" className="h-6 w-6 text-peach-text" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-navy">{title}</h3>
                  <p className="text-slate-body">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
