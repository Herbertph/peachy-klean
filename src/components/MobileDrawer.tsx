import { useEffect, useRef, type MouseEvent, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_LINKS } from '../data/business'
import { btnPrimary, Logo } from './ui'

interface Props {
  open: boolean
  onClose: () => void
  returnFocusTo: RefObject<HTMLButtonElement>
}

export function MobileDrawer({ open, onClose, returnFocusTo }: Props) {
  const panel = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion()
  const wasOpen = useRef(false)

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      document.body.style.overflow = 'hidden'
      closeButton.current?.focus()
    } else if (wasOpen.current) {
      wasOpen.current = false
      document.body.style.overflow = ''
      returnFocusTo.current?.focus({ preventScroll: true })
    }
  }, [open, returnFocusTo])

  // Close and trap focus while open
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      const focusable = panel.current.querySelectorAll<HTMLElement>('a[href], button')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  const goTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onClose()
    // Scroll after the body scroll lock is released
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView()
      history.replaceState(null, '', href)
    })
  }

  const duration = reduce ? 0 : 0.25

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <m.div
            data-testid="drawer-backdrop"
            className="absolute inset-0 bg-navy/60"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />
          <m.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col bg-white p-6 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration, ease: 'easeOut' }}
          >
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button
                ref={closeButton}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="rounded-md p-2 text-navy hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-peach-text"
              >
                <X aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => goTo(e, link.href)}
                    className="block rounded-md px-3 py-3 font-semibold tracking-wide text-navy hover:bg-cream hover:text-peach-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#quote" onClick={(e) => goTo(e, '#quote')} className={`${btnPrimary} mt-8`}>
              GET A FREE QUOTE
            </a>
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
