import { describe, expect, it } from 'vitest'
import { getPackagePrice } from './pricing'

describe('getPackagePrice', () => {
  it('AC-21: adds the size surcharge to the base price', () => {
    expect(getPackagePrice(119, 'small')).toBe(119)
    expect(getPackagePrice(119, 'medium')).toBe(159)
    expect(getPackagePrice(119, 'large')).toBe(199)
  })

  it('AC-21: falls back to the base price for an unknown size id', () => {
    expect(getPackagePrice(119, 'huge')).toBe(119)
  })
})
