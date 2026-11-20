import { expect, test } from '@playwright/test'
import { CLEANING_PACKAGES } from '../../src/data/cleaningData'
import { expectInViewBelowNavbar, prices } from './helpers'

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

test('AC-9: one h1 with the hero headline and working hero CTAs', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('h1')).toContainText('SPOTLESS HOMES. FRESH SPACES.')
  await expect(page.locator('h1')).toContainText("Moncton's Trusted Cleaning Services.")
  const hero = page.locator('#home')
  await expect(hero.getByRole('link', { name: 'GET A FREE QUOTE' })).toBeVisible()
  await hero.getByRole('link', { name: 'VIEW SERVICES' }).click()
  await expectInViewBelowNavbar(page, page.getByRole('heading', { name: 'Cleaning Packages Tailored to Your Space' }))
})

test('AC-10: Why Choose Us shows its 3 items and the star rating', async ({ page }) => {
  const section = page.getByRole('region', { name: 'Why Choose Us' })
  for (const item of ['5-Star Local Service', 'Vetted & Insured Team', 'Eco-Friendly & Pet-Safe']) {
    await expect(section.getByRole('heading', { name: item })).toBeVisible()
  }
  await expect(section.getByRole('img', { name: 'Rated 5 out of 5' })).toBeVisible()
})

test('AC-11: package cards show names, prices, features and one MOST POPULAR badge', async ({ page }) => {
  expect(await prices(page)).toEqual(['$119', '$219', '$279'])
  for (const pkg of CLEANING_PACKAGES) {
    const card = page.getByRole('article', { name: pkg.name })
    await expect(card.getByText('Starting at')).toBeVisible()
    for (const feature of pkg.features) await expect(card.getByText(feature, { exact: true })).toBeVisible()
    await expect(card.getByText('MOST POPULAR', { exact: true })).toHaveCount(pkg.popular ? 1 : 0)
  }
  await expect(page.getByText('MOST POPULAR', { exact: true })).toHaveCount(1)
})

test('AC-12: add-ons show their prices', async ({ page }) => {
  for (const [name, price] of [
    ['Inside Oven Deep Clean', '$35'],
    ['Inside Fridge Cleanout', '$35'],
    ['Interior Window Washing', '$45+'],
    ['Laundry Wash & Fold', '$30/load'],
  ]) {
    await expect(page.getByRole('listitem').filter({ hasText: name })).toContainText(price)
  }
})

test('AC-13: discounts banner shows the 3 frequencies', async ({ page }) => {
  const banner = page.getByRole('region', { name: 'Save More with Recurring Cleaning' })
  await expect(banner.getByRole('listitem').filter({ hasText: 'Weekly' }).first()).toContainText('20%')
  const biWeekly = banner.getByRole('listitem').filter({ hasText: 'Bi-Weekly' })
  await expect(biWeekly).toContainText('15%')
  await expect(biWeekly).toContainText('Most Popular')
  await expect(banner.getByRole('listitem').filter({ hasText: 'Monthly' })).toContainText('10%')
})

test('AC-14: 3 reviews with towns and 5-star ratings', async ({ page }) => {
  const cards = page.getByTestId('review-card')
  await expect(cards).toHaveCount(3)
  for (const [name, town] of [
    ['Mélanie B.', 'Moncton'],
    ['Ryan K.', 'Dieppe'],
    ['Claire D.', 'Riverview'],
  ]) {
    const card = cards.filter({ hasText: name })
    await expect(card).toContainText(town)
    await expect(card.getByRole('img', { name: 'Rated 5 out of 5' })).toBeVisible()
  }
})

test('AC-15: About Us shows the heading and 3 guarantees', async ({ page }) => {
  const about = page.locator('#about')
  await expect(about.getByRole('heading', { name: 'Local, Reliable & Detail-Obsessed' })).toBeVisible()
  for (const g of ['100% Satisfaction Guarantee', 'Bonded & Insured', 'No Hidden Fees']) {
    await expect(about.getByRole('heading', { name: g })).toBeVisible()
  }
})

test('AC-16: footer shows areas, contact, quick links and copyright', async ({ page }) => {
  const footer = page.getByRole('contentinfo')
  for (const area of ['Moncton', 'Dieppe', 'Riverview', 'Shediac', 'Salisbury']) {
    await expect(footer.getByRole('listitem').filter({ hasText: new RegExp(`^${area}$`) })).toBeVisible()
  }
  await expect(footer.getByText('100 Mountain Rd, Moncton, NB E1C 7B1')).toBeVisible()
  await expect(footer.getByRole('link', { name: '+1 (506) 874-1197' })).toHaveAttribute('href', 'tel:+15068741197')
  await expect(footer.getByText('Mon–Sat: 8:00 AM – 6:00 PM')).toBeVisible()
  await expect(footer).toContainText(`© ${new Date().getFullYear()} Moncton Peachy Klean Services. All rights reserved.`)
  await footer.getByRole('link', { name: 'About Us' }).click()
  await expectInViewBelowNavbar(page, page.getByRole('heading', { name: 'Local, Reliable & Detail-Obsessed' }))
  await footer.getByRole('link', { name: 'Get a Quote' }).click()
  await expectInViewBelowNavbar(page, page.getByRole('heading', { name: 'Get Your Free Instant Cleaning Quote' }))
})

test('social links have accessible names', async ({ page }) => {
  const footer = page.getByRole('contentinfo')
  await expect(footer.getByRole('link', { name: 'Facebook' })).toHaveAttribute('href', '#')
  await expect(footer.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', '#')
})
