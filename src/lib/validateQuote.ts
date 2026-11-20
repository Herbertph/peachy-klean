export interface QuoteValues {
  fullName: string
  phone: string
  email: string
  propertyType: string
  bedrooms: string
  serviceType: string
  frequency: string
  preferredDate: string
  notes: string
}

export type QuoteErrors = Partial<Record<keyof QuoteValues, string>>

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-.()]/g, '')
}

// 10 digits, or 11 digits starting with 1, optionally preceded by +
const PHONE_RE = /^\+?1?\d{10}$/
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

export function validateQuote(values: QuoteValues): QuoteErrors {
  const errors: QuoteErrors = {}

  const name = values.fullName.trim()
  if (name.length < 2) errors.fullName = 'Please enter your full name.'
  else if (name.length > 80) errors.fullName = 'Name must be 80 characters or fewer.'

  const phone = normalizePhone(values.phone)
  if (!phone) errors.phone = 'Please enter your phone number.'
  else if (!PHONE_RE.test(phone) || (phone.startsWith('+') && phone.length !== 12))
    errors.phone = 'Please enter a valid 10-digit phone number.'

  const email = values.email.trim()
  if (email && !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'

  if (values.bedrooms.length > 100) errors.bedrooms = 'Please keep this under 100 characters.'
  if (values.preferredDate.length > 100) errors.preferredDate = 'Please keep this under 100 characters.'

  return errors
}
