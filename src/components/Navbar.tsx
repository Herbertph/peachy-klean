import { useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '../data/business'
import { btnPrimary, Logo } from './ui'
import { MobileDrawer } from './MobileDrawer'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header className="sticky top-0 z-40 border-b border-peach bg-white/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-peach-text">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-semibold tracking-wide text-navy transition-colors duration-200 hover:text-peach-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#quote" className={`${btnPrimary} hidden lg:inline-flex`}>
          GET A FREE QUOTE
        </a>
        <button
          ref={menuButton}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="rounded-md p-2 text-navy hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-peach-text lg:hidden"
        >
          <Menu aria-hidden="true" className="h-6 w-6" />
        </button>
      </nav>
      <MobileDrawer open={open} onClose={() => setOpen(false)} returnFocusTo={menuButton} />
    </header>
  )
}
