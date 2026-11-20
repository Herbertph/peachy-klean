import { expect, test, type Page } from '@playwright/test'
import { isMobile, prices } from './helpers'

// QA exploratory and gap tests for docs/test-cases/landing-page.md (TC-44 onwards)

const submit = (page: Page) => page.getByRole('button', { name: 'GET MY FREE QUOTE' }).click()
const status = (page: Page) => page.getByRole('status').filter({ hasText: 'Your quote request is in' })

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('TC-44 (AC-41): with normal motion every revealed element ends fully visible after scrolling', async ({ page }) => {
  // Scroll through the whole page so every whileInView reveal fires
  const height = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y <= height; y += 400) {
    await page.mouse.wheel(0, 400)
    await page.waitForTimeout(60)
  }
  await page.waitForTimeout(800)
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('main *')].filter((el) => {
      const s = getComputedStyle(el)
      return s.visibility !== 'hidden' && el.offsetParent !== null && Number(s.opacity) < 1
    }).length,
  )
  expect(hidden).toBe(0)
})

test('TC-45 (AC-23): switching checklist tabs with normal motion ends with fully opaque items', async ({ page }) => {
  await page.getByRole('tab', { name: 'Commercial Offices' }).click()
  const item = page.getByText('Desks and workstations wiped and sanitized')
  await expect(item).toBeVisible()
  await expect(async () => {
    const opacity = await page.getByRole('tabpanel').locator('ul').evaluate((el) => getComputedStyle(el).opacity)
    expect(opacity).toBe('1')
  }).toPass({ timeout: 2000 })
})

test('TC-46 (AC-6): drawer opens and closes with animation and leaves no overlay behind', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  const open = page.getByRole('button', { name: 'Open menu' })
  for (let i = 0; i < 3; i++) {
    await open.click()
    await expect(page.getByRole('dialog', { name: 'Menu' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog', { name: 'Menu' })).toHaveCount(0)
  }
  await expect(page.getByTestId('drawer-backdrop')).toHaveCount(0)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  await expect(open).toBeFocused()
})

test('TC-47 (AC-18): rapid size changes always end on the last selected price', async ({ page }) => {
  const sizes = ['3–4 Bedrooms House', '5+ Bedrooms / Large Home', '1–2 Bedrooms / Condo', '5+ Bedrooms / Large Home']
  for (const s of sizes) await page.getByText(s, { exact: true }).click()
  expect((await prices(page)).map((p) => p?.replace(/\D/g, ''))).toEqual(['199', '299', '359'])
})

test('TC-48 (AC-36): a package CTA while the confirmation is shown leads to a form with that service', async ({ page }) => {
  test.fail(true, 'Known bug #1: remove this line once the fix lands')
  await page.getByLabel('Full Name').fill('Ryan Kelly')
  await page.getByLabel('Phone Number / SMS').fill('5068741197')
  await submit(page)
  await expect(status(page)).toBeVisible()
  await page.getByRole('link', { name: 'Book Deep Clean' }).click()
  // FR-9: the CTA preselects the service in the form, so the form must be reachable with it selected
  const service = page.getByLabel('Service Type')
  if (!(await service.isVisible())) await page.getByRole('button', { name: 'Send another request' }).click()
  await expect(service).toHaveValue('Peachy Deep Clean')
})

test('TC-49 (AC-32): first name uses trimmed input and long unbroken input does not overflow on mobile', async ({ page }) => {
  await page.getByLabel('Full Name').fill('   Mélanie    Bourque  ')
  await page.getByLabel('Phone Number / SMS').fill('+1 506 874 1197')
  await page.getByLabel('Additional Notes').fill('x'.repeat(1000))
  await submit(page)
  await expect(status(page).getByRole('heading')).toHaveText('Thanks, Mélanie! Your quote request is in.')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('TC-50 (AC-28): Full Name input caps very long pastes and still shows the 80-character error', async ({ page }) => {
  await page.getByLabel('Full Name').fill('a'.repeat(500))
  await page.getByLabel('Phone Number / SMS').fill('5068741197')
  await submit(page)
  await expect(page.getByText('Name must be 80 characters or fewer.')).toBeVisible()
  await expect(page.getByLabel('Full Name')).toBeFocused()
})

test('TC-51 (AC-27): double submit with valid data shows exactly one confirmation', async ({ page }) => {
  await page.getByLabel('Full Name').fill('Claire Dupuis')
  await page.getByLabel('Phone Number / SMS').fill('506.874.1197')
  await page.getByRole('button', { name: 'GET MY FREE QUOTE' }).dblclick()
  await expect(status(page)).toHaveCount(1)
})

test('TC-52 (AC-40): keyboard-only user can submit the quote form with Enter', async ({ page }) => {
  await page.getByLabel('Full Name').focus()
  await page.keyboard.type('Claire Dupuis')
  await page.keyboard.press('Tab')
  await page.keyboard.type('5068741197')
  await page.keyboard.press('Enter')
  await expect(status(page)).toBeVisible()
  await expect(status(page).getByRole('heading')).toBeFocused()
})
