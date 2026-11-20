import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { isMobile } from './helpers'

const axe = (page: Page) => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()

test('AC-38: SEO metadata and JSON-LD', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-CA')
  await expect(page).toHaveTitle('Moncton Peachy Klean Services | House & Office Cleaning in Moncton, NB')
  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description!.length).toBeLessThanOrEqual(160)
  expect(description).toMatch(/Moncton.*Dieppe.*Riverview/)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /\S/)
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#F97316')
  const json = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!)
  expect(json['@type']).toBe('HouseCleaning')
  expect(json.telephone).toBe('+1-506-874-1197')
  expect(json.address.postalCode).toBe('E1C 7B1')
  expect(json.areaServed).toHaveLength(5)
  expect(json).not.toHaveProperty('telePhone')
})

test('AC-39: no axe violations on load, with form errors and with the drawer open', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  expect((await axe(page)).violations).toEqual([])

  await page.getByRole('button', { name: 'GET MY FREE QUOTE' }).click()
  await expect(page.getByText('Please enter your full name.')).toBeVisible()
  expect((await axe(page)).violations).toEqual([])

  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    expect((await axe(page)).violations).toEqual([])
  }
})

test('AC-40: first Tab focuses the skip link, which moves focus to main', async ({ page }) => {
  await page.goto('./')
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})

test('AC-41: with reduced motion the review cards are fully visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  await page.getByRole('heading', { name: 'Trusted by Busy Families & Offices in Moncton' }).scrollIntoViewIfNeeded()
  const cards = page.getByTestId('review-card')
  for (let i = 0; i < 3; i++) {
    const opacities = await cards.nth(i).evaluate((el) => {
      const values: number[] = []
      for (let node: Element | null = el; node; node = node.parentElement) values.push(Number(getComputedStyle(node).opacity))
      return values
    })
    expect(opacities.every((o) => o === 1)).toBe(true)
    await cards.nth(i).scrollIntoViewIfNeeded()
    await expect(cards.nth(i)).toBeInViewport({ ratio: 0.5 })
  }
})

test('AC-42: all assets load under the base path with no console errors', async ({ page }) => {
  const failures: string[] = []
  const errors: string[] = []
  page.on('response', (r) => r.status() >= 400 && failures.push(`${r.status()} ${r.url()}`))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  await page.goto('./')
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => document.fonts.ready)
  expect(failures).toEqual([])
  expect(errors).toEqual([])
  const brokenImages = await page.$$eval('img', (imgs) => imgs.filter((i) => !(i as HTMLImageElement).naturalWidth).length)
  expect(brokenImages).toBe(0)
})

test('AC-43: images have alt text, dimensions and lazy loading below the hero', async ({ page }) => {
  await page.goto('./')
  const images = await page.$$eval('img', (imgs) =>
    imgs.map((i) => ({
      alt: i.getAttribute('alt'),
      hidden: i.getAttribute('aria-hidden'),
      width: i.getAttribute('width'),
      height: i.getAttribute('height'),
      loading: i.getAttribute('loading'),
      inHero: !!i.closest('#home'),
    })),
  )
  expect(images.length).toBeGreaterThan(0)
  for (const img of images) {
    expect(img.alt === '' ? img.hidden === 'true' : !!img.alt?.trim()).toBe(true)
    expect(img.width && img.height).toBeTruthy()
    if (!img.inHero) expect(img.loading).toBe('lazy')
  }
})
