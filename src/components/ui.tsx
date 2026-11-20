import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles, Star } from 'lucide-react'

// Brand orange (#F97316) fails AA with white text, so buttons and small orange text use #C2410C (FR-23).
export const btnPrimary =
  'inline-flex items-center justify-center rounded-md bg-peach-text px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy'
export const btnSecondary =
  'inline-flex items-center justify-center rounded-md border-2 border-navy px-6 py-3 text-sm font-semibold tracking-wide text-navy transition-colors duration-200 hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-peach-text'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-peach-text">{children}</p>
}

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-heading text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
      {children}
    </h2>
  )
}

export function Stars({ className = '' }: { className?: string }) {
  return (
    <div role="img" aria-label="Rated 5 out of 5" className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className="h-5 w-5 fill-rating text-rating" />
      ))}
    </div>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-peach">
        <span className="absolute -top-1 right-1 h-3 w-2 rotate-45 rounded-full bg-emerald-500" />
        <Sparkles className="h-5 w-5 text-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading text-sm font-extrabold tracking-tight ${light ? 'text-white' : 'text-navy'}`}>
          MONCTON PEACHY KLEAN
        </span>
        <span className={`mt-1 text-[10px] font-semibold tracking-[0.3em] ${light ? 'text-orange-300' : 'text-peach-text'}`}>
          SERVICES
        </span>
      </span>
    </span>
  )
}

/** Subtle slide-up on scroll. Only transforms (never opacity), so content is always visible (FR-24). */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 24 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
