import { expect, test } from '@playwright/test'
import { CHECKLIST } from '../../src/data/cleaningData'
import { prices } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

const size = (page: import('@playwright/test').Page, label: string) => page.getByRole('radio', { name: label })

test('AC-17: small size is selected by default', async ({ page }) => {
  await expect(size(page, '1–2 Bedrooms / Condo')).toBeChecked()
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(1)
  expect(await prices(page)).toEqual(['$119', '$219', '$279'])
})

test('AC-18 / AC-19: changing size updates package prices but not add-ons', async ({ page }) => {
  const addOns = () => page.getByRole('heading', { name: 'Popular Add-Ons' }).locator('xpath=..').textContent()
  const addOnsBefore = await addOns()

  await size(page, '3–4 Bedrooms House').check({ force: true })
  await expect(page.getByTestId('price-deep')).toHaveText('$259')
  expect(await prices(page)).toEqual(['$159', '$259', '$319'])
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(1)
  expect(await addOns()).toBe(addOnsBefore)

  await size(page, '5+ Bedrooms / Large Home').check({ force: true })
  await expect(page.getByTestId('price-deep')).toHaveText('$299')
  expect(await prices(page)).toEqual(['$199', '$299', '$359'])
  expect(await addOns()).toBe(addOnsBefore)

  await size(page, '1–2 Bedrooms / Condo').check({ force: true })
  await expect(page.getByTestId('price-deep')).toHaveText('$219')
  expect(await prices(page)).toEqual(['$119', '$219', '$279'])
})

test('AC-20: size selector works with the keyboard', async ({ page }) => {
  await size(page, '1–2 Bedrooms / Condo').focus()
  await page.keyboard.press('ArrowRight')
  await expect(size(page, '3–4 Bedrooms House')).toBeChecked()
  await expect(page.getByTestId('price-standard')).toHaveText('$159')
})

test('AC-22: Kitchen tab is selected by default', async ({ page }) => {
  await expect(page.getByRole('tab')).toHaveCount(4)
  await expect(page.getByRole('tab', { name: 'Kitchen' })).toHaveAttribute('aria-selected', 'true')
  const panel = page.getByRole('tabpanel')
  for (const item of CHECKLIST[0].items) await expect(panel.getByText(item)).toBeVisible()
})

test('AC-23: each tab shows only its own items', async ({ page }) => {
  for (const tab of CHECKLIST.slice(1)) {
    await page.getByRole('tab', { name: tab.label }).click()
    await expect(page.getByRole('tab', { name: tab.label })).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('[role="tab"][aria-selected="true"]')).toHaveCount(1)
    const panel = page.getByRole('tabpanel', { name: tab.label })
    for (const item of tab.items) await expect(panel.getByText(item)).toBeVisible()
    await expect(panel.getByText('Stovetop degreased')).toHaveCount(0)
  }
})

test('AC-24: arrow keys, Home and End move between tabs', async ({ page }) => {
  const tab = (name: string) => page.getByRole('tab', { name })
  await tab('Kitchen').focus()
  await page.keyboard.press('ArrowRight')
  await expect(tab('Bathrooms')).toBeFocused()
  await expect(tab('Bathrooms')).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Home')
  await expect(tab('Kitchen')).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(tab('Commercial Offices')).toBeFocused()
  await expect(tab('Commercial Offices')).toHaveAttribute('aria-selected', 'true')
  await page.keyboard.press('Home')
  await page.keyboard.press('End')
  await expect(tab('Commercial Offices')).toBeFocused()
})

test('AC-25: before/after images with labels and alt text', async ({ page }) => {
  for (const label of ['Before', 'After']) {
    const figure = page.locator('figure').filter({ has: page.getByText(label, { exact: true }) })
    await expect(figure.locator('img')).toHaveAttribute('alt', /\S/)
  }
})
