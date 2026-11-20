import { Clock, MapPin, Phone } from 'lucide-react'
import { BUSINESS } from '../data/business'

export function TopBar() {
  return (
    <div className="bg-navy text-xs text-slate-200">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center px-4 md:justify-between">
        <a
          href={BUSINESS.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 hover:text-white md:flex"
        >
          <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-peach" />
          {BUSINESS.address}
        </a>
        <div className="flex items-center gap-6">
          <a href={BUSINESS.phoneHref} className="flex items-center gap-1.5 font-semibold text-white hover:text-orange-300">
            <Phone aria-hidden="true" className="h-3.5 w-3.5 text-peach" />
            {BUSINESS.phoneDisplay}
          </a>
          <span className="hidden items-center gap-1.5 md:flex">
            <Clock aria-hidden="true" className="h-3.5 w-3.5 text-peach" />
            {BUSINESS.hours}
          </span>
        </div>
      </div>
    </div>
  )
}
