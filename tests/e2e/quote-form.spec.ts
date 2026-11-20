import { expect, test, type Page } from '@playwright/test'
import { expectInViewBelowNavbar } from './helpers'

const submit = (page: Page) => page.getByRole('button', { name: 'GET MY FREE QUOTE' }).click()
const fill = async (page: Page, name = 'Mélanie Bourque', phone = '(506) 555-0199') => {
  await page.getByLabel('Full Name').fill(name)
  await page.getByLabel('Phone Number / SMS').fill(phone)
}
const status = (page: Page) => page.getByRole('status').filter({ hasText: 'Your quote request is in' })

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('AC-26: every field has a label and the selects have their options', async ({ page }) => {
  for (const label of ['Full Name', 'Phone Number / SMS', 'Email Address (Optional)', 'Bedrooms & Bathrooms', 'Preferred Date & Window', 'Additional Notes']) {
    await expect(page.getByLabel(label, { exact: true })).toBeVisible()
  }
  const options = async (label: string) => page.getByLabel(label).locator('option').allTextContents()
  expect(await options('Property Type')).toEqual(['House', 'Apartment / Condo', 'Townhouse', 'Commercial Office'])
  expect(await options('Service Type')).toEqual(['Standard Maintenance Clean', 'Peachy Deep Clean', 'Move-In / Move-Out Clean', 'Commercial Cleaning'])
  expect(await options('Preferred Frequency')).toEqual(['One-Time Cleaning', 'Weekly (Save 20%)', 'Bi-Weekly (Save 15%)', 'Monthly (Save 10%)'])
  await expect(page.getByLabel('Property Type')).toHaveValue('House')
  await expect(page.getByLabel('Service Type')).toHaveValue('Standard Maintenance Clean')
  await expect(page.getByLabel('Preferred Frequency')).toHaveValue('One-Time Cleaning')
})

test('AC-27: empty submit shows required errors and focuses the name', async ({ page }) => {
  await submit(page)
  await expect(page.getByText('Please enter your full name.')).toBeVisible()
  await expect(page.getByText('Please enter your phone number.')).toBeVisible()
  await expect(page.getByLabel('Full Name')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByLabel('Phone Number / SMS')).toHaveAttribute('aria-invalid', 'true')
  await expect(page.getByLabel('Full Name')).toHaveAttribute('aria-describedby', 'quote-fullName-error')
  await expect(page.getByLabel('Full Name')).toBeFocused()
  await expect(status(page)).toHaveCount(0)
})

test('AC-28: name length rules', async ({ page }) => {
  for (const [name, error] of [
    ['   ', 'Please enter your full name.'],
    ['A', 'Please enter your full name.'],
    ['a'.repeat(81), 'Name must be 80 characters or fewer.'],
  ]) {
    await page.getByLabel('Full Name').fill(name)
    await submit(page)
    await expect(page.locator('#quote-fullName-error')).toHaveText(error)
  }
  for (const name of ['Al', 'a'.repeat(80)]) {
    await page.goto('./')
    await page.getByLabel('Full Name').fill(name)
    await submit(page)
    await expect(page.getByText('Please enter your phone number.')).toBeVisible()
    await expect(page.locator('#quote-fullName-error')).toHaveCount(0)
  }
})

test('AC-29: phone format rules', async ({ page }) => {
  for (const phone of ['506-874', 'abcdefghij', '2 506 874 1197', '+44 20 7946 0958']) {
    await page.getByLabel('Phone Number / SMS').fill(phone)
    await submit(page)
    await expect(page.locator('#quote-phone-error')).toHaveText('Please enter a valid 10-digit phone number.')
  }
  for (const phone of ['(506) 874-1197', '506.874.1197', '5068741197', '+1 506 874 1197', '15068741197']) {
    await page.getByLabel('Phone Number / SMS').fill(phone)
    await submit(page)
    await expect(page.locator('#quote-phone-error')).toHaveCount(0)
  }
})

test('AC-30: email format rules', async ({ page }) => {
  for (const email of ['john@', 'john.example.com', 'john@example']) {
    await page.getByLabel('Email Address (Optional)').fill(email)
    await submit(page)
    await expect(page.locator('#quote-email-error')).toHaveText('Please enter a valid email address.')
  }
  for (const email of ['', 'john@example.com']) {
    await page.getByLabel('Email Address (Optional)').fill(email)
    await submit(page)
    await expect(page.locator('#quote-email-error')).toHaveCount(0)
  }
})

test('AC-31: correcting a field clears its error on blur', async ({ page }) => {
  await submit(page)
  const name = page.getByLabel('Full Name')
  await name.fill('Mélanie Bourque')
  await name.blur()
  await expect(page.locator('#quote-fullName-error')).toHaveCount(0)
  await expect(name).not.toHaveAttribute('aria-invalid', /.*/)
  await expect(page.getByText('Please enter your phone number.')).toBeVisible()
})

test('AC-32: valid submit shows the confirmation without any network request', async ({ page }) => {
  await page.getByRole('radio', { name: '3–4 Bedrooms House' }).check({ force: true })
  await fill(page)
  await page.getByLabel('Service Type').selectOption('Peachy Deep Clean')
  await page.getByLabel('Preferred Frequency').selectOption('Bi-Weekly (Save 15%)')
  const requests: string[] = []
  page.on('request', (r) => ['fetch', 'xhr', 'document'].includes(r.resourceType()) && requests.push(r.url()))
  const url = page.url()
  await submit(page)
  await expect(status(page)).toContainText('Thanks, Mélanie! Your quote request is in.')
  await expect(status(page)).toContainText('Peachy Deep Clean')
  await expect(status(page)).toContainText('Bi-Weekly')
  await expect(status(page)).toContainText('Starting at $259')
  expect(requests).toEqual([])
  expect(page.url()).toBe(url)
})

test('AC-33: commercial cleaning shows a custom quote', async ({ page }) => {
  await fill(page)
  await page.getByLabel('Service Type').selectOption('Commercial Cleaning')
  await submit(page)
  await expect(status(page)).toContainText('Custom quote')
  await expect(status(page)).not.toContainText('$')
})

test('AC-34: "Send another request" restores an empty form', async ({ page }) => {
  await fill(page)
  await page.getByLabel('Service Type').selectOption('Peachy Deep Clean')
  await submit(page)
  await page.getByRole('button', { name: 'Send another request' }).click()
  await expect(page.getByLabel('Full Name')).toHaveValue('')
  await expect(page.getByLabel('Phone Number / SMS')).toHaveValue('')
  await expect(page.getByLabel('Service Type')).toHaveValue('Standard Maintenance Clean')
  await expect(page.getByLabel('Property Type')).toHaveValue('House')
  await expect(page.getByLabel('Preferred Frequency')).toHaveValue('One-Time Cleaning')
  await expect(page.locator('[id$="-error"]')).toHaveCount(0)
})

test('AC-35: user input is rendered as text, never HTML', async ({ page }) => {
  let dialog = false
  page.on('dialog', async (d) => {
    dialog = true
    await d.dismiss()
  })
  await fill(page, '<img src=x onerror=alert(1)>')
  await page.getByLabel('Additional Notes').fill('<b>bold</b>')
  await submit(page)
  await expect(status(page)).toContainText('<b>bold</b>')
  await expect(status(page)).toContainText('<img')
  await expect(status(page).locator('img, b')).toHaveCount(0)
  expect(dialog).toBe(false)
})

test('AC-36: package CTAs preselect the service and size', async ({ page }) => {
  const bedrooms = page.getByLabel('Bedrooms & Bathrooms')
  await page.getByRole('radio', { name: '5+ Bedrooms / Large Home' }).check({ force: true })
  await page.getByRole('link', { name: 'Select Standard' }).click()
  await expectInViewBelowNavbar(page, page.getByRole('heading', { name: 'Get Your Free Instant Cleaning Quote' }))
  await expect(page.getByLabel('Service Type')).toHaveValue('Standard Maintenance Clean')
  await expect(bedrooms).toHaveValue('5+ Bedrooms / Large Home')

  await bedrooms.fill('2 Bed / 1 Bath')
  await page.getByRole('link', { name: 'Book Deep Clean' }).click()
  await expect(page.getByLabel('Service Type')).toHaveValue('Peachy Deep Clean')
  await expect(bedrooms).toHaveValue('2 Bed / 1 Bath')

  await page.getByRole('link', { name: 'Request Custom Quote' }).click()
  await expect(page.getByLabel('Service Type')).toHaveValue('Move-In / Move-Out Clean')
})
