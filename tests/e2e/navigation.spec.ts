import { expect, test } from '@playwright/test'
import { expectInViewBelowNavbar, isMobile } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('AC-1: top bar shows address, phone and hours on desktop', async ({ page }) => {
  test.skip(isMobile(page), 'desktop only')
  const address = page.getByRole('link', { name: '100 Mountain Rd, Moncton, NB E1C 7B1' })
  await expect(address).toBeVisible()
  await expect(address).toHaveAttribute('href', /google\.com\/maps/)
  await expect(address).toHaveAttribute('target', '_blank')
  await expect(address).toHaveAttribute('rel', /noopener/)
  const phone = page.getByRole('link', { name: '+1 (506) 874-1197' }).first()
  await expect(phone).toBeVisible()
  await expect(phone).toHaveAttribute('href', 'tel:+15068741197')
  await expect(page.getByText('Mon–Sat: 8:00 AM – 6:00 PM').first()).toBeVisible()
})

test('AC-2: top bar hides address and hours on mobile', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await expect(page.getByRole('link', { name: '100 Mountain Rd, Moncton, NB E1C 7B1' })).toBeHidden()
  await expect(page.getByText('Mon–Sat: 8:00 AM – 6:00 PM').first()).toBeHidden()
  await expect(page.getByRole('link', { name: '+1 (506) 874-1197' }).first()).toBeVisible()
})

test('AC-3: navbar links scroll to their sections below the sticky navbar', async ({ page }) => {
  test.skip(isMobile(page), 'desktop only')
  const nav = page.getByRole('navigation', { name: 'Main' })
  const targets: [string, RegExp | string][] = [
    ['SERVICES', 'Cleaning Packages Tailored to Your Space'],
    ['PRICING', 'Select your home size'],
    ['ABOUT US', 'Local, Reliable & Detail-Obsessed'],
    ['REVIEWS', 'Trusted by Busy Families & Offices in Moncton'],
    ['HOME', /SPOTLESS HOMES/],
  ]
  for (const [link, heading] of targets) {
    await nav.getByRole('link', { name: link, exact: true }).click()
    const target =
      link === 'PRICING' ? page.getByText('Select your home size') : page.getByRole('heading', { name: heading })
    await expectInViewBelowNavbar(page, target)
    await expect(nav).toBeInViewport()
  }
})

test('AC-4: every "GET A FREE QUOTE" CTA brings the quote form into view', async ({ page }) => {
  const quoteHeading = page.getByRole('heading', { name: 'Get Your Free Instant Cleaning Quote' })
  const ctas = [
    isMobile(page) ? null : page.getByRole('banner').getByRole('link', { name: 'GET A FREE QUOTE' }),
    page.locator('#home').getByRole('link', { name: 'GET A FREE QUOTE' }),
    page.getByRole('region', { name: 'Save More with Recurring Cleaning' }).getByRole('link', { name: 'GET A FREE QUOTE' }),
  ]
  for (const cta of ctas) {
    if (!cta) continue
    await page.evaluate(() => window.scrollTo(0, 0))
    await cta.click()
    await expectInViewBelowNavbar(page, quoteHeading)
  }
})

test.describe('mobile drawer', () => {
  test.beforeEach(async ({ page }) => {
    test.skip(!isMobile(page), 'mobile only')
  })

  test('AC-5: opens with all links and the quote CTA', async ({ page }) => {
    const menu = page.getByRole('button', { name: 'Open menu' })
    await menu.click()
    const drawer = page.getByRole('dialog', { name: 'Menu' })
    for (const link of ['HOME', 'SERVICES', 'PRICING', 'ABOUT US', 'REVIEWS']) {
      await expect(drawer.getByRole('link', { name: link, exact: true })).toBeVisible()
    }
    await expect(drawer.getByRole('link', { name: 'GET A FREE QUOTE' })).toBeVisible()
    await expect(menu).toHaveAttribute('aria-expanded', 'true')
  })

  const closers = {
    Escape: async (page: import('@playwright/test').Page) => page.keyboard.press('Escape'),
    backdrop: async (page: import('@playwright/test').Page) => page.getByTestId('drawer-backdrop').click({ position: { x: 20, y: 300 } }),
    'close button': async (page: import('@playwright/test').Page) => page.getByRole('button', { name: 'Close menu' }).click(),
  }
  for (const [method, close] of Object.entries(closers)) {
    test(`AC-6: closes with ${method} and returns focus`, async ({ page }) => {
      const menu = page.getByRole('button', { name: 'Open menu' })
      await menu.click()
      await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
      await close(page)
      await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
      await expect(menu).toHaveAttribute('aria-expanded', 'false')
      await expect(menu).toBeFocused()
    })
  }

  test('AC-7: clicking REVIEWS closes the drawer and shows the reviews', async ({ page }) => {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: 'REVIEWS' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeHidden()
    await expectInViewBelowNavbar(page, page.getByRole('heading', { name: 'Trusted by Busy Families & Offices in Moncton' }))
  })

  test('keeps focus inside the drawer and locks page scroll', async ({ page }) => {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
      expect(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true)
    }
  })
})

for (const width of [375, 360]) {
  test(`AC-8: no desktop links and no horizontal scroll at ${width}px`, async ({ page }) => {
    test.skip(!isMobile(page), 'mobile only')
    await page.setViewportSize({ width, height: 812 })
    await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'ABOUT US' })).toBeHidden()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow).toBeLessThanOrEqual(0)
  })
}
