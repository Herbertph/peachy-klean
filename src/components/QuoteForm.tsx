import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from 'react'
import { CircleCheck } from 'lucide-react'
import {
  CLEANING_PACKAGES,
  FREQUENCIES,
  HOME_SIZES,
  PROPERTY_TYPES,
  SERVICE_TYPES,
  type ServiceType,
  type SizeId,
} from '../data/cleaningData'
import { getPackagePrice } from '../lib/pricing'
import { validateQuote, type QuoteErrors, type QuoteValues } from '../lib/validateQuote'
import { btnPrimary, btnSecondary, Eyebrow, SectionHeading } from './ui'

export interface PackagePreset {
  serviceType: ServiceType
  /** Changes on every CTA click so the same package can be selected twice */
  nonce: number
}

const EMPTY: QuoteValues = {
  fullName: '',
  phone: '',
  email: '',
  propertyType: PROPERTY_TYPES[0],
  bedrooms: '',
  serviceType: SERVICE_TYPES[0],
  frequency: FREQUENCIES[0],
  preferredDate: '',
  notes: '',
}

// Order used to focus the first invalid field
const FIELD_ORDER: (keyof QuoteValues)[] = ['fullName', 'phone', 'email', 'bedrooms', 'preferredDate']

const inputClass =
  'mt-1.5 block w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-navy placeholder:text-slate-500 focus:border-peach-text focus:outline-none focus:ring-2 focus:ring-peach/40 aria-[invalid=true]:border-red-600'

export function QuoteForm({ sizeId, preset }: { sizeId: SizeId; preset: PackagePreset | null }) {
  const [values, setValues] = useState<QuoteValues>(EMPTY)
  const [errors, setErrors] = useState<QuoteErrors>({})
  const [submitted, setSubmitted] = useState<QuoteValues | null>(null)
  const form = useRef<HTMLFormElement>(null)
  const confirmation = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!preset) return
    const sizeLabel = HOME_SIZES.find((s) => s.id === sizeId)?.label ?? ''
    setValues((v) => ({ ...v, serviceType: preset.serviceType, bedrooms: v.bedrooms || sizeLabel }))
    // Only react to new CTA clicks, not to size changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset])

  useEffect(() => {
    if (submitted) confirmation.current?.focus()
  }, [submitted])

  const set = (field: keyof QuoteValues, value: string) => setValues((v) => ({ ...v, [field]: value }))

  const onBlur = (field: keyof QuoteValues) => {
    if (!errors[field]) return
    setErrors((e) => ({ ...e, [field]: validateQuote(values)[field] }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validateQuote(values)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((f) => found[f])
    if (firstInvalid) {
      form.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setSubmitted(values)
  }

  const reset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(null)
  }

  const field = (name: keyof QuoteValues) => ({
    id: `quote-${name}`,
    name,
    value: values[name],
    onBlur: () => onBlur(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `quote-${name}-error` : undefined,
    className: inputClass,
  })

  const error = (name: keyof QuoteValues) =>
    errors[name] && (
      <p id={`quote-${name}-error`} className="mt-1.5 text-sm font-medium text-red-700">
        {errors[name]}
      </p>
    )

  return (
    <section id="quote" aria-labelledby="quote-title" className="scroll-mt-24 bg-slate-light py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <Eyebrow>FAST, FREE & NO OBLIGATION</Eyebrow>
          <SectionHeading id="quote-title">Get Your Free Instant Cleaning Quote</SectionHeading>
          <p className="mt-4 text-lg text-slate-body">
            Tell us about your space and our team will get back to you within 30 minutes.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10">
          {submitted ? (
            <Confirmation values={submitted} sizeId={sizeId} headingRef={confirmation} onReset={reset} />
          ) : (
            <form ref={form} noValidate onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="quote-fullName">Full Name</Label>
                <input {...field('fullName')} type="text" autoComplete="name" placeholder="John Doe" maxLength={200} onChange={(e) => set('fullName', e.target.value)} />
                {error('fullName')}
              </div>
              <div>
                <Label htmlFor="quote-phone">Phone Number / SMS</Label>
                <input {...field('phone')} type="tel" autoComplete="tel" placeholder="(506) 555-0199" onChange={(e) => set('phone', e.target.value)} />
                {error('phone')}
              </div>
              <div>
                <Label htmlFor="quote-email">Email Address (Optional)</Label>
                <input {...field('email')} type="email" autoComplete="email" onChange={(e) => set('email', e.target.value)} />
                {error('email')}
              </div>
              <div>
                <Label htmlFor="quote-propertyType">Property Type</Label>
                <select {...field('propertyType')} onChange={(e) => set('propertyType', e.target.value)}>
                  {PROPERTY_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="quote-bedrooms">Bedrooms &amp; Bathrooms</Label>
                <input {...field('bedrooms')} type="text" placeholder="e.g. 3 Bed / 2 Bath" maxLength={100} onChange={(e) => set('bedrooms', e.target.value)} />
                {error('bedrooms')}
              </div>
              <div>
                <Label htmlFor="quote-serviceType">Service Type</Label>
                <select {...field('serviceType')} onChange={(e) => set('serviceType', e.target.value)}>
                  {SERVICE_TYPES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="quote-frequency">Preferred Frequency</Label>
                <select {...field('frequency')} onChange={(e) => set('frequency', e.target.value)}>
                  {FREQUENCIES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="quote-preferredDate">Preferred Date &amp; Window</Label>
                <input {...field('preferredDate')} type="text" placeholder="e.g. Next Tuesday - Morning" maxLength={100} onChange={(e) => set('preferredDate', e.target.value)} />
                {error('preferredDate')}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="quote-notes">Additional Notes</Label>
                <textarea
                  {...field('notes')}
                  rows={4}
                  maxLength={1000}
                  placeholder="Pets, access instructions, areas needing extra attention..."
                  onChange={(e) => set('notes', e.target.value)}
                />
              </div>
              <button type="submit" className={`${btnPrimary} sm:col-span-2`}>
                GET MY FREE QUOTE
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-navy">
      {children}
    </label>
  )
}

function Confirmation({
  values,
  sizeId,
  headingRef,
  onReset,
}: {
  values: QuoteValues
  sizeId: SizeId
  headingRef: RefObject<HTMLHeadingElement>
  onReset: () => void
}) {
  const firstName = values.fullName.trim().split(/\s+/)[0]
  const pkg = CLEANING_PACKAGES.find((p) => p.serviceType === values.serviceType)
  const price = pkg ? `Starting at $${getPackagePrice(pkg.basePrice, sizeId)}` : 'Custom quote'

  const rows: [string, string][] = [
    ['Service', values.serviceType],
    ['Frequency', values.frequency],
    ['Property', values.propertyType],
    ['Bedrooms & Bathrooms', values.bedrooms],
    ['Preferred date', values.preferredDate],
    ['Notes', values.notes],
    ['Estimate', price],
  ]

  return (
    <div role="status" className="text-center">
      <CircleCheck aria-hidden="true" className="mx-auto h-12 w-12 text-peach-text" />
      <h3 ref={headingRef} tabIndex={-1} className="mt-4 font-heading text-2xl font-bold text-navy focus:outline-none">
        Thanks, {firstName}! Your quote request is in.
      </h3>
      <p className="mt-2 text-slate-body">Our team will get back to you within 30 minutes.</p>
      <dl className="mx-auto mt-6 max-w-md divide-y divide-line rounded-lg border border-line text-left">
        {rows
          .filter(([, value]) => value.trim())
          .map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
              <dt className="text-slate-body">{label}</dt>
              <dd className="break-words text-right font-semibold text-navy [overflow-wrap:anywhere]">{value}</dd>
            </div>
          ))}
      </dl>
      <button type="button" onClick={onReset} className={`${btnSecondary} mt-8`}>
        Send another request
      </button>
    </div>
  )
}
