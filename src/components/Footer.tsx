import { BUSINESS } from '../data/business'
import { Logo } from './ui'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About Us', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Get a Quote', href: '#quote' },
]

const SOCIAL_ICONS: Record<string, string> = {
  Facebook: 'M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z',
  Instagram:
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',
}

const headingClass = 'font-heading text-sm font-bold tracking-wider text-white'

export function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm">{BUSINESS.shortDescription}</p>
          <div className="mt-5 flex gap-3">
            {BUSINESS.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-peach-text"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={SOCIAL_ICONS[s.name]} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Quick links">
          <h2 className={headingClass}>QUICK LINKS</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className={headingClass}>SERVICE AREAS</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {BUSINESS.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={headingClass}>CONTACT</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{BUSINESS.address}</p>
            <p>
              <a href={BUSINESS.phoneHref} className="hover:text-white">
                {BUSINESS.phoneDisplay}
              </a>
            </p>
            <p>{BUSINESS.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs sm:px-6">
          © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. | Moncton, New Brunswick.
        </p>
      </div>
    </footer>
  )
}
