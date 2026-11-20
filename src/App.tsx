import { useState } from 'react'
import type { ServiceType, SizeId } from './data/cleaningData'
import { TopBar } from './components/TopBar'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { WhyChooseUs } from './components/WhyChooseUs'
import { Packages } from './components/Packages'
import { Checklist } from './components/Checklist'
import { DiscountsBanner } from './components/DiscountsBanner'
import { Reviews } from './components/Reviews'
import { About } from './components/About'
import { QuoteForm, type PackagePreset } from './components/QuoteForm'
import { Footer } from './components/Footer'

export default function App() {
  const [sizeId, setSizeId] = useState<SizeId>('small')
  const [preset, setPreset] = useState<PackagePreset | null>(null)

  const selectPackage = (serviceType: ServiceType) => setPreset((p) => ({ serviceType, nonce: (p?.nonce ?? 0) + 1 }))

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-navy px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <WhyChooseUs />
        <Packages sizeId={sizeId} onSizeChange={setSizeId} onSelectPackage={selectPackage} />
        <Checklist />
        <DiscountsBanner />
        <Reviews />
        <About />
        <QuoteForm sizeId={sizeId} preset={preset} />
      </main>
      <Footer />
    </>
  )
}
