export const BUSINESS = {
  name: 'Moncton Peachy Klean Services',
  shortDescription:
    'Professional residential and commercial cleaning in Greater Moncton. Locally owned, fully insured and detail-obsessed.',
  address: '100 Mountain Rd, Moncton, NB E1C 7B1',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=100+Mountain+Rd%2C+Moncton%2C+NB+E1C+7B1',
  phoneDisplay: '+1 (506) 874-1197',
  phoneHref: 'tel:+15068741197',
  hours: 'Mon–Sat: 8:00 AM – 6:00 PM',
  serviceAreas: ['Moncton', 'Dieppe', 'Riverview', 'Shediac', 'Salisbury'],
  socials: [
    { name: 'Facebook', href: '#' },
    { name: 'Instagram', href: '#' },
  ],
} as const

export const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'SERVICES', href: '#services' },
  { label: 'PRICING', href: '#pricing' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'REVIEWS', href: '#reviews' },
] as const
