export type SizeId = 'small' | 'medium' | 'large'

export interface HomeSize {
  id: SizeId
  label: string
  surcharge: number
}

export const HOME_SIZES: HomeSize[] = [
  { id: 'small', label: '1–2 Bedrooms / Condo', surcharge: 0 },
  { id: 'medium', label: '3–4 Bedrooms House', surcharge: 40 },
  { id: 'large', label: '5+ Bedrooms / Large Home', surcharge: 80 },
]

export const PROPERTY_TYPES = ['House', 'Apartment / Condo', 'Townhouse', 'Commercial Office']

export const SERVICE_TYPES = [
  'Standard Maintenance Clean',
  'Peachy Deep Clean',
  'Move-In / Move-Out Clean',
  'Commercial Cleaning',
] as const
export type ServiceType = (typeof SERVICE_TYPES)[number]

export const FREQUENCIES = [
  'One-Time Cleaning',
  'Weekly (Save 20%)',
  'Bi-Weekly (Save 15%)',
  'Monthly (Save 10%)',
]

export interface CleaningPackage {
  id: string
  name: string
  basePrice: number
  description: string
  features: string[]
  cta: string
  serviceType: ServiceType
  popular?: boolean
}

export const CLEANING_PACKAGES: CleaningPackage[] = [
  {
    id: 'standard',
    name: 'Standard Maintenance Clean',
    basePrice: 119,
    description: 'Perfect for keeping your home consistently fresh between deep cleans.',
    features: [
      'Dusting of all reachable surfaces',
      'Kitchen counters, sink & appliance exteriors',
      'Bathrooms cleaned & sanitized',
      'Floors vacuumed & mopped',
      'Trash emptied',
    ],
    cta: 'Select Standard',
    serviceType: 'Standard Maintenance Clean',
  },
  {
    id: 'deep',
    name: 'Peachy Deep Clean',
    basePrice: 219,
    description: 'Our top-to-bottom clean for homes that need extra love and attention.',
    features: [
      'Everything in Standard',
      'Baseboards, door frames & window sills',
      'Cabinet fronts & light switches detailed',
      'Shower tile & grout scrubbing',
      'Behind & under reachable furniture',
    ],
    cta: 'Book Deep Clean',
    serviceType: 'Peachy Deep Clean',
    popular: true,
  },
  {
    id: 'move',
    name: 'Move-In / Move-Out & Commercial',
    basePrice: 279,
    description: 'Empty-home and office cleaning that gets keys handed back with confidence.',
    features: [
      'Inside cabinets, drawers & closets',
      'Inside oven & fridge included',
      'Walls spot-cleaned',
      'Detailed bathrooms & kitchen',
      'Flexible after-hours scheduling for offices',
    ],
    cta: 'Request Custom Quote',
    serviceType: 'Move-In / Move-Out Clean',
  },
]

export const ADD_ONS = [
  { name: 'Inside Oven Deep Clean', price: '$35' },
  { name: 'Inside Fridge Cleanout', price: '$35' },
  { name: 'Interior Window Washing', price: '$45+' },
  { name: 'Laundry Wash & Fold', price: '$30/load' },
]

export const CHECKLIST = [
  {
    id: 'kitchen',
    label: 'Kitchen',
    items: [
      'Countertops & backsplash wiped and sanitized',
      'Sink and faucet scrubbed and polished',
      'Exterior of appliances cleaned',
      'Stovetop degreased',
      'Cabinet fronts spot-cleaned',
      'Floors vacuumed and mopped',
      'Trash emptied and liner replaced',
    ],
  },
  {
    id: 'bathrooms',
    label: 'Bathrooms',
    items: [
      'Toilets cleaned and sanitized inside and out',
      'Showers and tubs scrubbed',
      'Sinks, faucets and countertops sanitized',
      'Mirrors cleaned streak-free',
      'Towel bars and fixtures polished',
      'Floors vacuumed and mopped',
      'Trash emptied and liner replaced',
    ],
  },
  {
    id: 'living',
    label: 'Living Areas & Bedrooms',
    items: [
      'All reachable surfaces dusted',
      'Baseboards and window sills dusted',
      'Light switches and door handles wiped',
      'Mirrors and glass surfaces cleaned',
      'Beds made (linens changed on request)',
      'Floors and rugs vacuumed, hard floors mopped',
      'Trash emptied',
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial Offices',
    items: [
      'Desks and workstations wiped and sanitized',
      'High-touch points disinfected (handles, switches, phones)',
      'Break room and kitchenette cleaned',
      'Restrooms sanitized and restocked',
      'Glass doors and partitions cleaned',
      'Floors vacuumed and mopped',
      'Waste and recycling removed',
    ],
  },
]

export const DISCOUNTS = [
  { label: 'Weekly', save: '20%' },
  { label: 'Bi-Weekly', save: '15%', popular: true },
  { label: 'Monthly', save: '10%' },
]
