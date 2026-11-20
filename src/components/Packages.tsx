import { Check } from 'lucide-react'
import { ADD_ONS, CLEANING_PACKAGES, HOME_SIZES, type ServiceType, type SizeId } from '../data/cleaningData'
import { getPackagePrice } from '../lib/pricing'
import { btnPrimary, btnSecondary, Eyebrow, Reveal, SectionHeading } from './ui'

interface Props {
  sizeId: SizeId
  onSizeChange: (id: SizeId) => void
  onSelectPackage: (serviceType: ServiceType) => void
}

export function Packages({ sizeId, onSizeChange, onSelectPackage }: Props) {
  const size = HOME_SIZES.find((s) => s.id === sizeId)!

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-24 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>SERVICES & TRANSPARENT PRICING</Eyebrow>
          <SectionHeading id="services-title">Cleaning Packages Tailored to Your Space</SectionHeading>
          <p className="mt-4 text-lg text-slate-body">
            Choose your home size to see your starting price. No hidden fees, no surprises.
          </p>
        </div>

        <div id="pricing" className="scroll-mt-24 pt-10">
          <SizeSelector sizeId={sizeId} onChange={onSizeChange} />

          <p aria-live="polite" className="sr-only">
            {`Prices for ${size.label}: ${CLEANING_PACKAGES.map((p) => `${p.name} $${getPackagePrice(p.basePrice, sizeId)}`).join(', ')}`}
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {CLEANING_PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.08} className="h-full">
                <article
                  aria-labelledby={`pkg-${pkg.id}`}
                  className={`relative flex h-full flex-col rounded-xl border-2 bg-white p-7 ${
                    pkg.popular ? 'border-peach shadow-xl lg:-translate-y-2' : 'border-line'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-peach-text px-4 py-1 text-xs font-bold tracking-wider text-white">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 id={`pkg-${pkg.id}`} className="font-heading text-xl font-bold text-navy">
                    {pkg.name}
                  </h3>
                  <p className="mt-4 text-sm text-slate-body">Starting at</p>
                  <p className="flex items-baseline gap-1">
                    <span
                      data-testid={`price-${pkg.id}`}
                      className={`font-heading text-4xl font-extrabold ${pkg.popular ? 'text-peach-text' : 'text-navy'}`}
                    >
                      ${getPackagePrice(pkg.basePrice, sizeId)}
                    </span>
                    <span className="text-slate-body">/ clean</span>
                  </p>
                  <p className="mt-4 text-slate-body">{pkg.description}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2.5 text-sm text-navy">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-peach-text" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    onClick={() => onSelectPackage(pkg.serviceType)}
                    className={`${pkg.popular ? btnPrimary : btnSecondary} mt-8 w-full`}
                  >
                    {pkg.cta}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <h3 className="text-center font-heading text-xl font-bold text-navy">Popular Add-Ons</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ADD_ONS.map((addOn) => (
                <li key={addOn.name} className="flex items-center justify-between gap-3 rounded-lg border border-line bg-slate-light px-5 py-4">
                  <span className="font-medium text-navy">{addOn.name}</span>
                  <span className="font-heading font-bold text-peach-text">{addOn.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SizeSelector({ sizeId, onChange }: { sizeId: SizeId; onChange: (id: SizeId) => void }) {
  return (
    <fieldset className="mx-auto max-w-3xl">
      <legend className="mb-4 w-full text-center font-semibold text-navy">Select your home size</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {HOME_SIZES.map((size) => (
          <label
            key={size.id}
            className="cursor-pointer rounded-lg border-2 border-line px-4 py-3 text-center transition-colors duration-200 hover:border-peach has-[:checked]:border-peach has-[:checked]:bg-cream has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy"
          >
            <input
              type="radio"
              name="home-size"
              value={size.id}
              checked={size.id === sizeId}
              onChange={() => onChange(size.id)}
              className="sr-only"
            />
            <span className="block font-semibold text-navy">{size.label}</span>
            <span className="text-sm text-slate-body">{size.surcharge ? `+$${size.surcharge}` : '+$0'}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
