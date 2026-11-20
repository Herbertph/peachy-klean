import { HOME_SIZES } from '../data/cleaningData'

/** Starting price for a package at a home size; unknown size ids fall back to the base price. */
export function getPackagePrice(basePrice: number, sizeId: string): number {
  const size = HOME_SIZES.find((s) => s.id === sizeId)
  return basePrice + (size?.surcharge ?? 0)
}
