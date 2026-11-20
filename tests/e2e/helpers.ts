import { expect, type Locator, type Page } from '@playwright/test'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 1024

/** Heading top is below the sticky navbar and inside the viewport. */
export async function expectInViewBelowNavbar(page: Page, heading: Locator) {
  const navbar = page.locator('header')
  await expect(async () => {
    const nav = await navbar.boundingBox()
    const box = await heading.boundingBox()
    const viewport = page.viewportSize()!
    expect(nav).not.toBeNull()
    expect(box).not.toBeNull()
    expect(nav!.y).toBeGreaterThanOrEqual(0)
    expect(nav!.y).toBeLessThanOrEqual(36) // stuck at the top, or just below the top bar
    expect(box!.y).toBeGreaterThanOrEqual(nav!.y + nav!.height - 1)
    expect(box!.y).toBeLessThan(viewport.height)
  }).toPass({ timeout: 5000 })
}

export const prices = (page: Page) =>
  Promise.all(['standard', 'deep', 'move'].map((id) => page.getByTestId(`price-${id}`).textContent()))
