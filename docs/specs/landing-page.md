# Spec: Moncton Peachy Klean Services landing page (prototype)

## Context

Herbert is building a **prototype website** for Moncton Peachy Klean Services, a residential and commercial cleaning company in Greater Moncton, New Brunswick, Canada. He will send the link in a cold email to the business owner to offer his web services. The prototype must look finished and convincing: real layout, real interactions, transparent pricing and a working quote form experience.

Because it is a prototype:

- The quote form has **no backend**. It validates input and shows a confirmation, but sends nothing.
- Customer reviews are **mock content** to show the owner how the section will look.
- Images are **placeholders** to be replaced with the company's own photos.

The full source brief (visual identity, section markup, copy, data shape) was provided by Herbert. This spec keeps that brief as the design reference and turns it into testable requirements. Where this spec and the brief disagree, this spec wins.

## Scope

### In scope

- A single-page site with 11 sections in this order: Top Bar, Sticky Navbar, Hero, Why Choose Us, Services & Packages (with size selector and add-ons), Cleaning Checklist tabs, Recurring Discounts banner, Customer Reviews, About Us, Quote form, Footer.
- Mobile-first responsive layout (from 360px to wide desktop) and a mobile navigation drawer.
- Interactive price selector by home size.
- Interactive checklist tabs by room.
- Client-side validation and confirmation for the quote form.
- Local SEO metadata and JSON-LD `HouseCleaning` schema.
- Automated deployment to GitHub Pages, so Herbert has a public link to send.
- Project scaffolding, unit tests, end-to-end tests and CI.

### Out of scope

- Sending form data anywhere (email, API, SMS gateway, storage).
- Real reviews, real photos, real social media accounts (social links point to `#`).
- Multiple pages, blog, CMS, booking calendar, payments, analytics, cookie banner.
- French translation.
- Custom domain (the JSON-LD may reference `monctonpeachyklean.ca` as written in the brief).

## Visual identity (summary of the brief)

| Token | Hex | Use |
|---|---|---|
| Primary accent | `#F97316` | Primary CTAs, highlights, active borders |
| Primary hover | `#EA580C` | Hover/active of primary buttons and links |
| Navy | `#0F172A` | Headings, top bar, footer, secondary buttons |
| Body text | `#475569` | Paragraphs, secondary labels |
| Background | `#FFFFFF` | Cards, hero, odd sections |
| Soft peach | `#FFFBF7` | Trust bar, highlighted alternate sections |
| Light slate | `#F8FAFC` | Form and checklist backgrounds |
| Border | `#E2E8F0` | Dividers, unselected card borders |
| Rating | `#FACC15` | Stars |

- Headings: Plus Jakarta Sans 700/800, tracking -0.02em. Body: Inter 400/500/600, line-height 1.5.
- Buttons: 6px radius, generous padding, `transition-colors duration-200`.
- A thin `#F97316` line separates the header from the hero (see the mockup).
- The section markup and Tailwind classes in Herbert's brief are the visual reference. Developers may adjust classes for accessibility (for example contrast) and responsiveness.

## Functional requirements

### Layout and navigation

- **FR-1 Top Bar.** Navy bar (~36px) at the very top. Desktop: address on the left (links to Google Maps in a new tab with `rel="noopener noreferrer"`), phone and hours on the right. Mobile (< 768px): address and hours are hidden; the phone is centered. The phone is a `tel:+15068741197` link.
- **FR-2 Sticky Navbar.** Stays at the top while scrolling (`sticky top-0`), white 95% with backdrop blur and a 1px `#F97316` bottom border. Shows the logo ("MONCTON PEACHY KLEAN" + "SERVICES" + a peach/sparkles icon in `#F97316`), the links HOME, SERVICES, PRICING, ABOUT US, REVIEWS, and a "GET A FREE QUOTE" button.
- **FR-3 In-page navigation.** Links smooth-scroll to anchors: HOME → `#home` (hero), SERVICES → `#services`, PRICING → `#pricing`, ABOUT US → `#about`, REVIEWS → `#reviews`, every quote CTA → `#quote`. Section headings must not be hidden behind the sticky navbar after scrolling (use `scroll-margin-top`). Smooth scrolling is disabled when the user prefers reduced motion.
- **FR-4 Mobile drawer.** Below the `lg` breakpoint the center links and CTA are replaced by a hamburger button (`aria-label="Open menu"`, `aria-expanded`, `aria-controls`). It opens a side drawer containing all nav links and the highlighted CTA. The drawer closes on: the close button, the Escape key, a click on the backdrop, or a click on any link. While open, focus stays inside the drawer and the page behind does not scroll. When it closes, focus returns to the hamburger button.

### Content sections

- **FR-5 Hero** (`#home`). Eyebrow "TRUSTED CLEANING IN MONCTON", one `h1` ("SPOTLESS HOMES. FRESH SPACES." / "Moncton's Trusted Cleaning Services."), the subheadline from the brief, a "GET A FREE QUOTE" button (→ `#quote`) and a "VIEW SERVICES" button (→ `#services`). A placeholder image on the right (desktop) or below (mobile), with meaningful `alt` text.
- **FR-6 Why Choose Us.** `h2` "Why Choose Us" and 3 items: "5-Star Local Service" (5 stars), "Vetted & Insured Team" (shield icon), "Eco-Friendly & Pet-Safe" (sparkles icon), with the copy from the brief. The star group has an accessible label "Rated 5 out of 5"; decorative icons are `aria-hidden`.
- **FR-7 Services & Packages** (`#services`, with `#pricing` on the package area). Eyebrow, `h2` "Cleaning Packages Tailored to Your Space" and subtitle from the brief, and 3 package cards built from `src/data/cleaningData.ts` (`CLEANING_PACKAGES` as in the brief): Standard Maintenance Clean, Peachy Deep Clean (highlighted, "MOST POPULAR" badge, orange border and price), Move-In / Move-Out & Commercial. Each card shows "Starting at", price, "/ clean", description, feature list with check icons, and its CTA: "Select Standard", "Book Deep Clean", "Request Custom Quote".
- **FR-8 Home size selector.** Three options above the cards: "1–2 Bedrooms / Condo" (+$0, selected by default), "3–4 Bedrooms House" (+$40), "5+ Bedrooms / Large Home" (+$80). Exactly one option is selected at a time. Selecting one updates the price on all 3 cards to `basePrice + surcharge`. Implemented as an accessible single-choice control (radio group or `aria-pressed` buttons), keyboard operable, with the selected option visually distinct. Price changes are announced to screen readers (`aria-live="polite"` on the price region).

  | Size | Standard | Deep | Move/Commercial |
  |---|---|---|---|
  | 1–2 Bedrooms / Condo | $119 | $219 | $279 |
  | 3–4 Bedrooms House | $159 | $259 | $319 |
  | 5+ Bedrooms / Large Home | $199 | $299 | $359 |

- **FR-9 Package CTA preselects the form.** Clicking a package CTA scrolls to `#quote` and preselects the matching "Service Type" in the form: Standard → "Standard Maintenance Clean", Deep → "Peachy Deep Clean", Move/Commercial → "Move-In / Move-Out Clean". It also fills "Bedrooms & Bathrooms" with the selected size label **only if that field is empty**.
- **FR-10 Add-ons.** A grid of 4 items below the cards: Inside Oven Deep Clean $35, Inside Fridge Cleanout $35, Interior Window Washing $45+, Laundry Wash & Fold $30/load. Add-on prices do not change with the size selector.
- **FR-11 Cleaning Checklist** (`#checklist`). `h2` "Our Cleaning Checklist" and an accessible tabs component (WAI-ARIA tabs pattern: `role="tablist"`, `tab`, `tabpanel`, `aria-selected`, arrow keys / Home / End move between tabs) with 4 tabs. "Kitchen" is selected by default. Content lives in `src/data/cleaningData.ts`:
  - **Kitchen:** Countertops & backsplash wiped and sanitized; Sink and faucet scrubbed and polished; Exterior of appliances cleaned; Stovetop degreased; Cabinet fronts spot-cleaned; Floors vacuumed and mopped; Trash emptied and liner replaced.
  - **Bathrooms:** Toilets cleaned and sanitized inside and out; Showers and tubs scrubbed; Sinks, faucets and countertops sanitized; Mirrors cleaned streak-free; Towel bars and fixtures polished; Floors vacuumed and mopped; Trash emptied and liner replaced.
  - **Living Areas & Bedrooms:** All reachable surfaces dusted; Baseboards and window sills dusted; Light switches and door handles wiped; Mirrors and glass surfaces cleaned; Beds made (linens changed on request); Floors and rugs vacuumed, hard floors mopped; Trash emptied.
  - **Commercial Offices:** Desks and workstations wiped and sanitized; High-touch points disinfected (handles, switches, phones); Break room and kitchenette cleaned; Restrooms sanitized and restocked; Glass doors and partitions cleaned; Floors vacuumed and mopped; Waste and recycling removed.
  - **Before/After:** below the tabs, a simple two-image "Before / After" pair using placeholder images with labels "Before" and "After". No slider is required.
- **FR-12 Recurring Discounts banner.** Peach box (`#FFFBF7`, `#F97316` 40% border) with: Weekly — Save 20%; Bi-Weekly — Save 15% (marked "Most Popular"); Monthly — Save 10%. Plus a "GET A FREE QUOTE" link to `#quote`.
- **FR-13 Customer Reviews** (`#reviews`). `h2` "Trusted by Busy Families & Offices in Moncton" and 3 review cards (Mélanie B. – Moncton, Ryan K. – Dieppe, Claire D. – Riverview) with the quotes from the brief and 5 stars each ("Rated 5 out of 5"). Reviews come from a data array in `src/data/`.
- **FR-14 About Us** (`#about`). Two columns (image left, text right; stacked on mobile). `h2` "Local, Reliable & Detail-Obsessed", 2 short paragraphs about the local team saving time for families in Moncton, Dieppe and Riverview, and 3 guarantees: "100% Satisfaction Guarantee" (free re-clean within 24 hours), "Bonded & Insured" (full protection against property damage), "No Hidden Fees" (transparent prices agreed in advance).
- **FR-15 Footer.** Navy background, 4 columns (stacked on mobile): Brand (logo, short description, social icon links to `#` with accessible names "Facebook", "Instagram"); Quick Links (Home, Services, Pricing, About Us, Reviews, Get a Quote → anchors); Service Areas (Moncton, Dieppe, Riverview, Shediac, Salisbury); Contact (address, `tel:` phone link, hours). Bottom line: "© {current year} Moncton Peachy Klean Services. All rights reserved. | Moncton, New Brunswick."

### Quote form

- **FR-16 Fields** (`#quote`), all with visible `<label>` elements associated to their inputs:

  | Field | Type | Required | Default / options |
  |---|---|---|---|
  | Full Name | text | yes | placeholder "John Doe" |
  | Phone Number / SMS | tel | yes | placeholder "(506) 555-0199" |
  | Email Address (Optional) | email | no | |
  | Property Type | select | — | House (default), Apartment / Condo, Townhouse, Commercial Office |
  | Bedrooms & Bathrooms | text | no | placeholder "e.g. 3 Bed / 2 Bath" |
  | Service Type | select | — | Standard Maintenance Clean (default), Peachy Deep Clean, Move-In / Move-Out Clean, Commercial Cleaning |
  | Preferred Frequency | select | — | One-Time Cleaning (default), Weekly (Save 20%), Bi-Weekly (Save 15%), Monthly (Save 10%) |
  | Preferred Date & Window | text | no | placeholder "e.g. Next Tuesday - Morning" |
  | Additional Notes | textarea | no | placeholder from the brief |

- **FR-17 Validation rules** (a pure function, for example `validateQuote(values) → errors`), applied on submit and re-checked on blur of a field that already shows an error:
  - Full Name: after trimming, 2 to 80 characters. Errors: "Please enter your full name." (empty or 1 char) / "Name must be 80 characters or fewer."
  - Phone: after removing spaces, dashes, dots and parentheses, must be 10 digits, or 11 digits starting with `1`, optionally preceded by `+`. Error: "Please enter a valid 10-digit phone number."  Empty → "Please enter your phone number."
  - Email: optional; if filled, must look like `name@domain.tld`. Error: "Please enter a valid email address."
  - Bedrooms & Bathrooms and Preferred Date & Window: max 100 characters each. Additional Notes: max 1000 characters (enforced with `maxLength`; no error needed).
- **FR-18 Error display.** Each error appears under its field, linked with `aria-describedby`; the field gets `aria-invalid="true"`. On a failed submit, focus moves to the first invalid field. The browser's native validation bubbles are disabled (`noValidate`) so the custom messages are the ones shown.
- **FR-19 Successful submit (prototype behavior).** With valid input, no network request is made. The form is replaced by a confirmation panel (`role="status"`) with heading "Thanks, {first name}! Your quote request is in." and a summary of the submitted choices (service type, frequency, property type, and the starting price for the selected service at the size currently chosen in the size selector, for example "Starting at $259"). For "Commercial Cleaning" the summary says "Custom quote" instead of a price. The panel has a "Send another request" button that restores an empty form with defaults. All user input is rendered as text, never as HTML.
- **FR-20 Starting-price logic** is a pure function (for example `getPackagePrice(basePrice, sizeId)`) shared by the cards and the confirmation. Unknown size ids fall back to the base price.

### SEO, accessibility and quality

- **FR-21 Metadata.** `<html lang="en-CA">`, `<title>` "Moncton Peachy Klean Services | House & Office Cleaning in Moncton, NB", a meta description (≤ 160 chars) mentioning Moncton, Dieppe and Riverview, Open Graph title/description/type, a theme color `#F97316`, and a favicon.
- **FR-22 JSON-LD.** A `<script type="application/ld+json">` in `index.html` with the `HouseCleaning` object from the brief, **with `telePhone` corrected to `telephone`** (the schema.org property name).
- **FR-23 Accessibility.** One `h1`; sections use `h2`, cards `h3`. All interactive elements are keyboard reachable with a visible focus ring. Text meets WCAG AA contrast (4.5:1 for body text; where the brief's colors fail, for example white text on `#F97316` at small sizes, use the nearest passing shade and note it). A "Skip to content" link is the first focusable element.
- **FR-24 Motion.** Framer Motion is used for tab transitions, the drawer, and a subtle reveal of cards on scroll. All motion is disabled or reduced when `prefers-reduced-motion: reduce` is set. Content must be visible even if JavaScript animations do not run (no element stays at opacity 0).
- **FR-25 Performance.** Images have explicit `width`/`height` (or aspect-ratio) to avoid layout shift; the hero image loads eagerly, all other images lazily. Fonts are self-hosted (`@fontsource`) with `font-display: swap`. Target: Lighthouse mobile Performance ≥ 90 and Accessibility ≥ 95 on the deployed page (measured and reported, not a blocking test).
- **FR-26 Placeholder content is easy to replace.** Business data (name, address, phone, hours, areas), packages, add-ons, checklist, discounts and reviews live in `src/data/`. Placeholder images live in `src/assets/placeholders/` (free-license images, for example Unsplash, with sources listed in `src/assets/placeholders/CREDITS.md`). No hotlinked images.
- **FR-27 Deployment.** A GitHub Actions workflow builds the site and deploys it to GitHub Pages on every push to `main`. Vite `base` is set so the site works at `https://herbertph.github.io/peachy-klean/`. A second workflow (or job) runs build, unit and end-to-end tests on pull requests.

## Acceptance criteria

### Top bar and navigation

- **AC-1** Given a desktop viewport (1280×800), when the page loads, then the top bar shows "100 Mountain Rd, Moncton, NB E1C 7B1" as a link to Google Maps opening in a new tab with `rel` containing `noopener`, the phone "+1 (506) 874-1197" as a link with `href="tel:+15068741197"`, and "Mon–Sat: 8:00 AM – 6:00 PM".
- **AC-2** Given a mobile viewport (375×812), when the page loads, then the top bar address and hours are not visible and the phone link is visible.
- **AC-3** Given a desktop viewport, when the user clicks each navbar link (HOME, SERVICES, PRICING, ABOUT US, REVIEWS), then the matching section scrolls into view, its heading is not covered by the sticky navbar, and the navbar is still visible at the top.
- **AC-4** Given any viewport, when the user clicks "GET A FREE QUOTE" in the navbar, the hero or the discounts banner, then the quote form heading "Get Your Free Instant Cleaning Quote" is in view.
- **AC-5** Given a mobile viewport, when the user clicks the "Open menu" button, then a drawer shows all 5 nav links and the "GET A FREE QUOTE" button, and the button has `aria-expanded="true"`.
- **AC-6** Given the mobile drawer is open, when the user presses Escape, clicks the backdrop, or clicks the close button, then the drawer closes, `aria-expanded` is "false" and focus is back on the "Open menu" button (each closing method is tested).
- **AC-7** Given the mobile drawer is open, when the user clicks "REVIEWS", then the drawer closes and the reviews section is in view.
- **AC-8** Given a mobile viewport, when the page loads, then the desktop nav links are not visible and the page has no horizontal scroll (document width ≤ viewport width), also checked at 360px wide.

### Content

- **AC-9** Given the page loads, then exactly one `h1` exists and it contains "SPOTLESS HOMES. FRESH SPACES." and "Moncton's Trusted Cleaning Services."; the hero shows "GET A FREE QUOTE" and "VIEW SERVICES", and "VIEW SERVICES" brings the services section into view.
- **AC-10** Given the page loads, then "Why Choose Us" shows the 3 items "5-Star Local Service", "Vetted & Insured Team", "Eco-Friendly & Pet-Safe", and the stars have the accessible name "Rated 5 out of 5".
- **AC-11** Given the page loads, then the 3 package cards show their names, "Starting at" prices $119, $219 and $279, their full feature lists from `CLEANING_PACKAGES`, and only "Peachy Deep Clean" shows the "MOST POPULAR" badge.
- **AC-12** Given the page loads, then the add-ons show Inside Oven Deep Clean $35, Inside Fridge Cleanout $35, Interior Window Washing $45+, Laundry Wash & Fold $30/load.
- **AC-13** Given the page loads, then the discounts banner shows Weekly 20%, Bi-Weekly 15% with "Most Popular", Monthly 10%.
- **AC-14** Given the page loads, then the reviews section shows 3 reviews by "Mélanie B.", "Ryan K." and "Claire D." with their towns, each rated 5 out of 5.
- **AC-15** Given the page loads, then About Us shows "Local, Reliable & Detail-Obsessed" and the 3 guarantees "100% Satisfaction Guarantee", "Bonded & Insured", "No Hidden Fees".
- **AC-16** Given the page loads, then the footer shows the 5 service areas, the address, a `tel:+15068741197` link, the hours, Quick Links that scroll to their sections, and "© {current year} Moncton Peachy Klean Services. All rights reserved."

### Size selector and pricing

- **AC-17** Given the page loads, then "1–2 Bedrooms / Condo" is the only selected size and prices are $119 / $219 / $279.
- **AC-18** Given the user selects "3–4 Bedrooms House", then prices become $159 / $259 / $319 and only that option is selected; selecting "5+ Bedrooms / Large Home" gives $199 / $299 / $359; selecting "1–2 Bedrooms / Condo" again restores $119 / $219 / $279.
- **AC-19** Given any size is selected, then the add-on prices stay unchanged.
- **AC-20** Given keyboard-only use, when the user tabs to the size selector and changes the option with the keyboard (arrow keys for a radio group, or Enter/Space for buttons), then the prices update.
- **AC-21 (unit)** `getPackagePrice(119, 'small')` = 119, `(119, 'medium')` = 159, `(119, 'large')` = 199; an unknown size id returns the base price. (Exact size ids are the developer's choice; the test uses them.)

### Checklist tabs

- **AC-22** Given the page loads, then the checklist shows 4 tabs, "Kitchen" is selected (`aria-selected="true"`) and its panel lists the Kitchen items.
- **AC-23** Given the user clicks "Bathrooms", "Living Areas & Bedrooms" and then "Commercial Offices", then each time only that tab is selected and its panel shows its own items (for example "Toilets cleaned and sanitized inside and out" for Bathrooms, "Desks and workstations wiped and sanitized" for Commercial Offices) and no Kitchen items.
- **AC-24** Given focus is on the "Kitchen" tab, when the user presses ArrowRight, then "Bathrooms" is focused and selected; ArrowLeft from "Kitchen" wraps to "Commercial Offices"; Home and End go to the first and last tab.
- **AC-25** Given the page loads, then the Before/After area shows two images with the labels "Before" and "After" and non-empty `alt` text.

### Quote form

- **AC-26** Given the form, then every field in FR-16 is reachable with `getByLabel`, and the selects have the listed options and defaults.
- **AC-27** Given an empty form, when the user submits, then "Please enter your full name." and "Please enter your phone number." appear, both fields have `aria-invalid="true"`, focus is on Full Name, and no confirmation is shown.
- **AC-28** Given Full Name is "   " (spaces only) or "A", when the user submits, then the name error is shown. Given a name of 81 characters, then "Name must be 80 characters or fewer." is shown. Given exactly 2 and exactly 80 characters, then no name error is shown.
- **AC-29** Given phone values "506-874", "abcdefghij", "2 506 874 1197" and "+44 20 7946 0958", when the user submits, then "Please enter a valid 10-digit phone number." is shown. Given "(506) 874-1197", "506.874.1197", "5068741197", "+1 506 874 1197" and "15068741197", then no phone error is shown.
- **AC-30** Given an email "john@", "john.example.com" or "john@example", when the user submits, then "Please enter a valid email address." is shown. Given an empty email or "john@example.com", then no email error is shown.
- **AC-31** Given a field shows an error, when the user corrects the value and leaves the field, then that field's error disappears and `aria-invalid` is removed.
- **AC-32** Given valid name "Mélanie Bourque", phone "(506) 555-0199", service "Peachy Deep Clean", frequency "Bi-Weekly (Save 15%)", and the size selector on "3–4 Bedrooms House", when the user submits, then a status panel shows "Thanks, Mélanie! Your quote request is in.", the summary contains "Peachy Deep Clean", "Bi-Weekly" and "Starting at $259", and no network request (fetch/XHR/form navigation) was made during submit.
- **AC-33** Given valid data with service "Commercial Cleaning", when the user submits, then the summary says "Custom quote" and shows no dollar price.
- **AC-34** Given the confirmation is shown, when the user clicks "Send another request", then the empty form returns with default selections and no errors.
- **AC-35** Given the name `<img src=x onerror=alert(1)>` and notes `<b>bold</b>`, when the user submits valid data, then the confirmation shows those strings as literal text, no `img` or `b` element is created from them, and no dialog opens.
- **AC-36** Given the size selector is on "5+ Bedrooms / Large Home" and the Bedrooms & Bathrooms field is empty, when the user clicks "Select Standard", then the form is in view, Service Type is "Standard Maintenance Clean" and Bedrooms & Bathrooms is "5+ Bedrooms / Large Home". Given the field already contains "2 Bed / 1 Bath", when the user clicks "Book Deep Clean", then Service Type is "Peachy Deep Clean" and the field still reads "2 Bed / 1 Bath". "Request Custom Quote" selects "Move-In / Move-Out Clean".
- **AC-37 (unit)** `validateQuote` returns no errors for a valid object and the exact messages from FR-17 for each invalid case in AC-27 to AC-30.

### SEO, accessibility, motion and build

- **AC-38** Given the built page, then `<html lang="en-CA">`, the title from FR-21, a meta description of 160 characters or fewer, and `og:title` exist; the JSON-LD script parses as JSON with `@type` "HouseCleaning", `telephone` "+1-506-874-1197", `postalCode` "E1C 7B1", and 5 `areaServed` entries, and has no `telePhone` key.
- **AC-39** Given the page loads, when an automated accessibility scan (`@axe-core/playwright`, WCAG 2 A/AA rules) runs on desktop and mobile, and again with the mobile drawer open and with form errors visible, then there are no violations.
- **AC-40** Given keyboard-only use, when the user presses Tab once from the top of the page, then a "Skip to content" link is focused and activating it moves focus to the main content.
- **AC-41** Given `prefers-reduced-motion: reduce`, when the page loads and the user scrolls to the reviews, then all cards are fully visible (opacity 1) without waiting for animations.
- **AC-42** Given the production build served under the `/peachy-klean/` base path, when the page loads, then all images, fonts and scripts load without 404 errors and there are no console errors.
- **AC-43** Given the page loads, then every `img` has non-empty `alt` (or `alt=""` with `aria-hidden` when purely decorative) and explicit dimensions or aspect ratio; images below the hero have `loading="lazy"`.

## Assumptions (Herbert, please confirm in review)

1. Prototype only: the form sends nothing and shows a confirmation; reviews and photos are placeholders. There is **no visible "prototype" or "sample content" notice** on the page, so the owner sees it as a finished site.
2. The size surcharge (+$40 / +$80) applies to all 3 packages, including Move-In / Move-Out & Commercial.
3. The confirmation shows a starting price based on the size selected in the pricing section (not parsed from the free-text "Bedrooms & Bathrooms" field). Frequency discounts are listed but **not** subtracted from the displayed price.
4. Copy stays in English, as in the brief, including "our team will get back to you within 30 minutes".
5. Social links (Facebook, Instagram) point to `#`.
6. Footer year is computed from the current date (the brief says 2026, which is the current year today).
7. Hosted on GitHub Pages at `https://herbertph.github.io/peachy-klean/`, deployed from `main` after Herbert merges.
8. Stack: React + Vite + TypeScript instead of Next.js, because the site is a single static page with no server.

## Technical notes

### Stack

- Vite + React 18 + TypeScript (strict), Tailwind CSS 3.4+ with the color tokens above as theme colors (for example `peach`, `peach-dark`, `navy`, `slate-body`, `cream`), `lucide-react`, `framer-motion`, `@fontsource/plus-jakarta-sans`, `@fontsource/inter`.
- Tests: Vitest (+ React Testing Library for components where useful) for unit tests; Playwright (Chromium, desktop 1280×800 and mobile 375×812 projects) with `@axe-core/playwright` for end-to-end tests. Playwright's `webServer` must use its own port (for example `vite preview --port 4173`), **never 4545**.
- npm scripts: `dev`, `build`, `preview`, `test` (Vitest run), `test:e2e` (Playwright), `lint` (optional).

### Suggested structure

```
src/
  data/business.ts        # name, address, phone, hours, areas, maps URL
  data/cleaningData.ts    # CLEANING_PACKAGES, HOME_SIZES, ADD_ONS, CHECKLIST, DISCOUNTS
  data/reviews.ts
  lib/pricing.ts          # getPackagePrice (pure)
  lib/validateQuote.ts    # validateQuote, normalizePhone (pure)
  components/             # TopBar, Navbar, MobileDrawer, Hero, WhyChooseUs, Packages, SizeSelector,
                          # AddOns, Checklist, DiscountsBanner, Reviews, About, QuoteForm, Footer
  assets/placeholders/    # placeholder images + CREDITS.md
tests/e2e/                # Playwright specs, named after ACs
```

- Shared state needed across sections: the selected home size (Packages ↔ QuoteForm) and the "preselect service" action from package CTAs. Lift it to `App` or use a small React context; no state library.

### Task list for the developer

1. Scaffold Vite + React + TS, Tailwind with tokens, fonts, lucide, framer-motion; set Vite `base: '/peachy-klean/'`; add Vitest and Playwright (+ axe); fill in `CLAUDE.md` (stack, commands, structure).
2. Data files and pure functions (`getPackagePrice`, `validateQuote`) with unit tests (AC-21, AC-37).
3. Static sections: TopBar, Navbar (desktop), Hero, Why Choose Us, Reviews, About, Footer; placeholder images + credits; skip link.
4. Interactive pieces: mobile drawer, size selector + package cards + add-ons, checklist tabs + before/after, discounts banner.
5. Quote form: validation, errors, confirmation, reset, CTA preselection.
6. `index.html` metadata, JSON-LD, favicon; motion with reduced-motion support.
7. GitHub Actions: CI (build + unit + e2e) on pull requests; deploy to GitHub Pages on push to `main` (enable Pages with source "GitHub Actions" via `gh api` if needed).
8. Check no horizontal scroll at 360/375px, run Lighthouse locally on the preview build, and note the scores in the PR handoff.
