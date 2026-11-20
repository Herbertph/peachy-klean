import { describe, expect, it } from 'vitest'
import { normalizePhone, validateQuote, type QuoteValues } from './validateQuote'

const valid: QuoteValues = {
  fullName: 'Mélanie Bourque',
  phone: '(506) 555-0199',
  email: '',
  propertyType: 'House',
  bedrooms: '',
  serviceType: 'Standard Maintenance Clean',
  frequency: 'One-Time Cleaning',
  preferredDate: '',
  notes: '',
}

const errorsFor = (patch: Partial<QuoteValues>) => validateQuote({ ...valid, ...patch })

describe('validateQuote', () => {
  it('AC-37: returns no errors for a valid quote', () => {
    expect(validateQuote(valid)).toEqual({})
  })

  it('AC-27: requires name and phone', () => {
    expect(errorsFor({ fullName: '', phone: '' })).toEqual({
      fullName: 'Please enter your full name.',
      phone: 'Please enter your phone number.',
    })
  })

  it('AC-28: validates the trimmed name length', () => {
    expect(errorsFor({ fullName: '   ' }).fullName).toBe('Please enter your full name.')
    expect(errorsFor({ fullName: 'A' }).fullName).toBe('Please enter your full name.')
    expect(errorsFor({ fullName: 'a'.repeat(81) }).fullName).toBe('Name must be 80 characters or fewer.')
    expect(errorsFor({ fullName: 'Al' }).fullName).toBeUndefined()
    expect(errorsFor({ fullName: 'a'.repeat(80) }).fullName).toBeUndefined()
  })

  it.each(['506-874', 'abcdefghij', '2 506 874 1197', '+44 20 7946 0958'])(
    'AC-29: rejects phone %s',
    (phone) => {
      expect(errorsFor({ phone }).phone).toBe('Please enter a valid 10-digit phone number.')
    },
  )

  it.each(['(506) 874-1197', '506.874.1197', '5068741197', '+1 506 874 1197', '15068741197'])(
    'AC-29: accepts phone %s',
    (phone) => {
      expect(errorsFor({ phone }).phone).toBeUndefined()
    },
  )

  it.each(['john@', 'john.example.com', 'john@example'])('AC-30: rejects email %s', (email) => {
    expect(errorsFor({ email }).email).toBe('Please enter a valid email address.')
  })

  it.each(['', 'john@example.com'])('AC-30: accepts email "%s"', (email) => {
    expect(errorsFor({ email }).email).toBeUndefined()
  })

  it('limits bedrooms and preferred date to 100 characters', () => {
    const errors = errorsFor({ bedrooms: 'x'.repeat(101), preferredDate: 'x'.repeat(101) })
    expect(errors.bedrooms).toBeDefined()
    expect(errors.preferredDate).toBeDefined()
    expect(errorsFor({ bedrooms: 'x'.repeat(100) }).bedrooms).toBeUndefined()
  })
})

describe('normalizePhone', () => {
  it('strips separators', () => {
    expect(normalizePhone(' (506) 874-1197 ')).toBe('5068741197')
  })
})
