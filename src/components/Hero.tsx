import heroImage from '../assets/placeholders/hero-living-room.jpg'
import { btnPrimary, btnSecondary, Eyebrow } from './ui'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="scroll-mt-24 border-b-4 border-peach/70 bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <Eyebrow>TRUSTED CLEANING IN MONCTON</Eyebrow>
          <h1 id="hero-title" className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-navy sm:text-5xl lg:text-6xl">
            SPOTLESS HOMES. FRESH SPACES.
            <span className="mt-2 block text-peach-text">Moncton's Trusted Cleaning Services.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-body">
            Reliable, insured and eco-friendly house and office cleaning for Moncton, Dieppe and Riverview. Get a
            transparent quote in minutes and come home to a space that feels brand new.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className={btnPrimary}>
              GET A FREE QUOTE
            </a>
            <a href="#services" className={btnSecondary}>
              VIEW SERVICES
            </a>
          </div>
        </div>
        <img
          src={heroImage}
          alt="Bright, freshly cleaned living room with a sofa, armchairs and plants"
          width={1200}
          height={900}
          loading="eager"
          fetchPriority="high"
          className="aspect-[4/3] w-full rounded-2xl object-cover shadow-xl"
        />
      </div>
    </section>
  )
}
