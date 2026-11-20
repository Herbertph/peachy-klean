# Test cases: landing-page

Spec: `docs/specs/landing-page.md`. TC-1 to TC-43 map one-to-one to the ACs and are automated by the developer's acceptance tests (reviewed by QA); TC-44 to TC-52 are QA gap and exploratory tests.

## Traceability

| AC | Test cases |
|---|---|
| AC-1 | TC-1 |
| AC-2 | TC-2 |
| AC-3 | TC-3 |
| AC-4 | TC-4 |
| AC-5 | TC-5 |
| AC-6 | TC-6, TC-46 |
| AC-7 | TC-7 |
| AC-8 | TC-8 |
| AC-9 | TC-9 |
| AC-10 | TC-10 |
| AC-11 | TC-11 |
| AC-12 | TC-12 |
| AC-13 | TC-13 |
| AC-14 | TC-14 |
| AC-15 | TC-15 |
| AC-16 | TC-16 |
| AC-17 | TC-17 |
| AC-18 | TC-18, TC-47 |
| AC-19 | TC-19 |
| AC-20 | TC-20 |
| AC-21 | TC-21 |
| AC-22 | TC-22 |
| AC-23 | TC-23, TC-45 |
| AC-24 | TC-24 |
| AC-25 | TC-25 |
| AC-26 | TC-26 |
| AC-27 | TC-27 |
| AC-28 | TC-28, TC-50 |
| AC-29 | TC-29 |
| AC-30 | TC-30 |
| AC-31 | TC-31 |
| AC-32 | TC-32, TC-49, TC-51 |
| AC-33 | TC-33 |
| AC-34 | TC-34 |
| AC-35 | TC-35 |
| AC-36 | TC-36, TC-48 |
| AC-37 | TC-37 |
| AC-38 | TC-38 |
| AC-39 | TC-39 |
| AC-40 | TC-40, TC-52 |
| AC-41 | TC-41, TC-44 |
| AC-42 | TC-42 |
| AC-43 | TC-43 |

## Test cases

### TC-1: Given a desktop viewport (1280×800), when the page loads, then the top bar shows "100 Moun…
- **Acceptance criterion:** AC-1
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a desktop viewport (1280×800), when the page loads, then the top bar shows "100 Mountain Rd, Moncton, NB E1C 7B1" as a link to Google Maps opening in a new tab with `rel` containing `noopener`, the phone "+1 (506) 874-1197" as a link with `href="tel:+15068741197"`, and "Mon–Sat: 8:00 AM – 6:00 PM".
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-1: top bar shows address, phone and hours on desktop`
- **Status:** Pass

### TC-2: Given a mobile viewport (375×812), when the page loads, then the top bar address and hours…
- **Acceptance criterion:** AC-2
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a mobile viewport (375×812), when the page loads, then the top bar address and hours are not visible and the phone link is visible.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-2: top bar hides address and hours on mobile`
- **Status:** Pass

### TC-3: Given a desktop viewport, when the user clicks each navbar link (HOME, SERVICES, PRICING,…
- **Acceptance criterion:** AC-3
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a desktop viewport, when the user clicks each navbar link (HOME, SERVICES, PRICING, ABOUT US, REVIEWS), then the matching section scrolls into view, its heading is not covered by the sticky navbar, and the navbar is still visible at the top.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-3: navbar links scroll to their sections below the sticky navbar`
- **Status:** Pass

### TC-4: Given any viewport, when the user clicks "GET A FREE QUOTE" in the navbar, the hero or the…
- **Acceptance criterion:** AC-4
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given any viewport, when the user clicks "GET A FREE QUOTE" in the navbar, the hero or the discounts banner, then the quote form heading "Get Your Free Instant Cleaning Quote" is in view.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-4: every "GET A FREE QUOTE" CTA brings the quote form into view`
- **Status:** Pass

### TC-5: Given a mobile viewport, when the user clicks the "Open menu" button, then a drawer shows…
- **Acceptance criterion:** AC-5
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a mobile viewport, when the user clicks the "Open menu" button, then a drawer shows all 5 nav links and the "GET A FREE QUOTE" button, and the button has `aria-expanded="true"`.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-5: opens with all links and the quote CTA`
- **Status:** Pass

### TC-6: Given the mobile drawer is open, when the user presses Escape, clicks the backdrop, or cli…
- **Acceptance criterion:** AC-6
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the mobile drawer is open, when the user presses Escape, clicks the backdrop, or clicks the close button, then the drawer closes, `aria-expanded` is "false" and focus is back on the "Open menu" button (each closing method is tested).
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-6: closes with ${method} and returns focus`
- **Status:** Pass

### TC-7: Given the mobile drawer is open, when the user clicks "REVIEWS", then the drawer closes an…
- **Acceptance criterion:** AC-7
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the mobile drawer is open, when the user clicks "REVIEWS", then the drawer closes and the reviews section is in view.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-7: clicking REVIEWS closes the drawer and shows the reviews`
- **Status:** Pass

### TC-8: Given a mobile viewport, when the page loads, then the desktop nav links are not visible a…
- **Acceptance criterion:** AC-8
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a mobile viewport, when the page loads, then the desktop nav links are not visible and the page has no horizontal scroll (document width ≤ viewport width), also checked at 360px wide.
- **Automated by:** `tests/e2e/navigation.spec.ts` › `AC-8: no desktop links and no horizontal scroll at ${width}px`
- **Status:** Pass

### TC-9: Given the page loads, then exactly one `h1` exists and it contains "SPOTLESS HOMES. FRESH…
- **Acceptance criterion:** AC-9
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then exactly one `h1` exists and it contains "SPOTLESS HOMES. FRESH SPACES." and "Moncton's Trusted Cleaning Services."; the hero shows "GET A FREE QUOTE" and "VIEW SERVICES", and "VIEW SERVICES" brings the services section into view.
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-9: one h1 with the hero headline and working hero CTAs`
- **Status:** Pass

### TC-10: Given the page loads, then "Why Choose Us" shows the 3 items "5-Star Local Service", "Vett…
- **Acceptance criterion:** AC-10
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then "Why Choose Us" shows the 3 items "5-Star Local Service", "Vetted & Insured Team", "Eco-Friendly & Pet-Safe", and the stars have the accessible name "Rated 5 out of 5".
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-10: Why Choose Us shows its 3 items and the star rating`
- **Status:** Pass

### TC-11: Given the page loads, then the 3 package cards show their names, "Starting at" prices $119…
- **Acceptance criterion:** AC-11
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the 3 package cards show their names, "Starting at" prices $119, $219 and $279, their full feature lists from `CLEANING_PACKAGES`, and only "Peachy Deep Clean" shows the "MOST POPULAR" badge.
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-11: package cards show names, prices, features and one MOST POPULAR badge`
- **Status:** Pass

### TC-12: Given the page loads, then the add-ons show Inside Oven Deep Clean $35, Inside Fridge Clea…
- **Acceptance criterion:** AC-12
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the add-ons show Inside Oven Deep Clean $35, Inside Fridge Cleanout $35, Interior Window Washing $45+, Laundry Wash & Fold $30/load.
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-12: add-ons show their prices`
- **Status:** Pass

### TC-13: Given the page loads, then the discounts banner shows Weekly 20%, Bi-Weekly 15% with "Most…
- **Acceptance criterion:** AC-13
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the discounts banner shows Weekly 20%, Bi-Weekly 15% with "Most Popular", Monthly 10%.
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-13: discounts banner shows the 3 frequencies`
- **Status:** Pass

### TC-14: Given the page loads, then the reviews section shows 3 reviews by "Mélanie B.", "Ryan K."…
- **Acceptance criterion:** AC-14
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the reviews section shows 3 reviews by "Mélanie B.", "Ryan K." and "Claire D." with their towns, each rated 5 out of 5.
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-14: 3 reviews with towns and 5-star ratings`
- **Status:** Pass

### TC-15: Given the page loads, then About Us shows "Local, Reliable & Detail-Obsessed" and the 3 gu…
- **Acceptance criterion:** AC-15
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then About Us shows "Local, Reliable & Detail-Obsessed" and the 3 guarantees "100% Satisfaction Guarantee", "Bonded & Insured", "No Hidden Fees".
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-15: About Us shows the heading and 3 guarantees`
- **Status:** Pass

### TC-16: Given the page loads, then the footer shows the 5 service areas, the address, a `tel:+1506…
- **Acceptance criterion:** AC-16
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the footer shows the 5 service areas, the address, a `tel:+15068741197` link, the hours, Quick Links that scroll to their sections, and "© {current year} Moncton Peachy Klean Services. All rights reserved."
- **Automated by:** `tests/e2e/content.spec.ts` › `AC-16: footer shows areas, contact, quick links and copyright`
- **Status:** Pass

### TC-17: Given the page loads, then "1–2 Bedrooms / Condo" is the only selected size and prices are…
- **Acceptance criterion:** AC-17
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then "1–2 Bedrooms / Condo" is the only selected size and prices are $119 / $219 / $279.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-17: small size is selected by default`
- **Status:** Pass

### TC-18: Given the user selects "3–4 Bedrooms House", then prices become $159 / $259 / $319 and onl…
- **Acceptance criterion:** AC-18
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the user selects "3–4 Bedrooms House", then prices become $159 / $259 / $319 and only that option is selected; selecting "5+ Bedrooms / Large Home" gives $199 / $299 / $359; selecting "1–2 Bedrooms / Condo" again restores $119 / $219 / $279.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-18 / AC-19: changing size updates package prices but not add-ons`
- **Status:** Pass

### TC-19: Given any size is selected, then the add-on prices stay unchanged.
- **Acceptance criterion:** AC-19
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given any size is selected, then the add-on prices stay unchanged.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-18 / AC-19: changing size updates package prices but not add-ons`
- **Status:** Pass

### TC-20: Given keyboard-only use, when the user tabs to the size selector and changes the option wi…
- **Acceptance criterion:** AC-20
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given keyboard-only use, when the user tabs to the size selector and changes the option with the keyboard (arrow keys for a radio group, or Enter/Space for buttons), then the prices update.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-20: size selector works with the keyboard`
- **Status:** Pass

### TC-21: `getPackagePrice(119, 'small')` = 119, `(119, 'medium')` = 159, `(119, 'large')` = 199; an…
- **Acceptance criterion:** AC-21
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** `getPackagePrice(119, 'small')` = 119, `(119, 'medium')` = 159, `(119, 'large')` = 199; an unknown size id returns the base price. (Exact size ids are the developer's choice; the test uses them.)
- **Automated by:** `src/lib/pricing.test.ts` › `getPackagePrice`
- **Status:** Pass

### TC-22: Given the page loads, then the checklist shows 4 tabs, "Kitchen" is selected (`aria-select…
- **Acceptance criterion:** AC-22
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the checklist shows 4 tabs, "Kitchen" is selected (`aria-selected="true"`) and its panel lists the Kitchen items.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-22: Kitchen tab is selected by default`
- **Status:** Pass

### TC-23: Given the user clicks "Bathrooms", "Living Areas & Bedrooms" and then "Commercial Offices"…
- **Acceptance criterion:** AC-23
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the user clicks "Bathrooms", "Living Areas & Bedrooms" and then "Commercial Offices", then each time only that tab is selected and its panel shows its own items (for example "Toilets cleaned and sanitized inside and out" for Bathrooms, "Desks and workstations wiped and sanitized" for Commercial Offices) and no Kitchen items.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-23: each tab shows only its own items`
- **Status:** Pass

### TC-24: Given focus is on the "Kitchen" tab, when the user presses ArrowRight, then "Bathrooms" is…
- **Acceptance criterion:** AC-24
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given focus is on the "Kitchen" tab, when the user presses ArrowRight, then "Bathrooms" is focused and selected; ArrowLeft from "Kitchen" wraps to "Commercial Offices"; Home and End go to the first and last tab.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-24: arrow keys, Home and End move between tabs`
- **Status:** Pass

### TC-25: Given the page loads, then the Before/After area shows two images with the labels "Before"…
- **Acceptance criterion:** AC-25
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then the Before/After area shows two images with the labels "Before" and "After" and non-empty `alt` text.
- **Automated by:** `tests/e2e/pricing-checklist.spec.ts` › `AC-25: before/after images with labels and alt text`
- **Status:** Pass

### TC-26: Given the form, then every field in FR-16 is reachable with `getByLabel`, and the selects…
- **Acceptance criterion:** AC-26
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the form, then every field in FR-16 is reachable with `getByLabel`, and the selects have the listed options and defaults.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-26: every field has a label and the selects have their options`
- **Status:** Pass

### TC-27: Given an empty form, when the user submits, then "Please enter your full name." and "Pleas…
- **Acceptance criterion:** AC-27
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given an empty form, when the user submits, then "Please enter your full name." and "Please enter your phone number." appear, both fields have `aria-invalid="true"`, focus is on Full Name, and no confirmation is shown.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-27: empty submit shows required errors and focuses the name`
- **Status:** Pass

### TC-28: Given Full Name is "   " (spaces only) or "A", when the user submits, then the name error…
- **Acceptance criterion:** AC-28
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given Full Name is "   " (spaces only) or "A", when the user submits, then the name error is shown. Given a name of 81 characters, then "Name must be 80 characters or fewer." is shown. Given exactly 2 and exactly 80 characters, then no name error is shown.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-28: name length rules`
- **Status:** Pass

### TC-29: Given phone values "506-874", "abcdefghij", "2 506 874 1197" and "+44 20 7946 0958", when…
- **Acceptance criterion:** AC-29
- **Priority:** high
- **Type:** negative
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given phone values "506-874", "abcdefghij", "2 506 874 1197" and "+44 20 7946 0958", when the user submits, then "Please enter a valid 10-digit phone number." is shown. Given "(506) 874-1197", "506.874.1197", "5068741197", "+1 506 874 1197" and "15068741197", then no phone error is shown.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-29: phone format rules`
- **Status:** Pass

### TC-30: Given an email "john@", "john.example.com" or "john@example", when the user submits, then…
- **Acceptance criterion:** AC-30
- **Priority:** medium
- **Type:** negative
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given an email "john@", "john.example.com" or "john@example", when the user submits, then "Please enter a valid email address." is shown. Given an empty email or "john@example.com", then no email error is shown.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-30: email format rules`
- **Status:** Pass

### TC-31: Given a field shows an error, when the user corrects the value and leaves the field, then…
- **Acceptance criterion:** AC-31
- **Priority:** medium
- **Type:** negative
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given a field shows an error, when the user corrects the value and leaves the field, then that field's error disappears and `aria-invalid` is removed.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-31: correcting a field clears its error on blur`
- **Status:** Pass

### TC-32: Given valid name "Mélanie Bourque", phone "(506) 555-0199", service "Peachy Deep Clean", f…
- **Acceptance criterion:** AC-32
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given valid name "Mélanie Bourque", phone "(506) 555-0199", service "Peachy Deep Clean", frequency "Bi-Weekly (Save 15%)", and the size selector on "3–4 Bedrooms House", when the user submits, then a status panel shows "Thanks, Mélanie! Your quote request is in.", the summary contains "Peachy Deep Clean", "Bi-Weekly" and "Starting at $259", and no network request (fetch/XHR/form navigation) was made during submit.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-32: valid submit shows the confirmation without any network request`
- **Status:** Pass

### TC-33: Given valid data with service "Commercial Cleaning", when the user submits, then the summa…
- **Acceptance criterion:** AC-33
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given valid data with service "Commercial Cleaning", when the user submits, then the summary says "Custom quote" and shows no dollar price.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-33: commercial cleaning shows a custom quote`
- **Status:** Pass

### TC-34: Given the confirmation is shown, when the user clicks "Send another request", then the emp…
- **Acceptance criterion:** AC-34
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the confirmation is shown, when the user clicks "Send another request", then the empty form returns with default selections and no errors.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-34: "Send another request" restores an empty form`
- **Status:** Pass

### TC-35: Given the name `<img src=x onerror=alert(1)>` and notes `<b>bold</b>`, when the user submi…
- **Acceptance criterion:** AC-35
- **Priority:** high
- **Type:** security
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the name `<img src=x onerror=alert(1)>` and notes `<b>bold</b>`, when the user submits valid data, then the confirmation shows those strings as literal text, no `img` or `b` element is created from them, and no dialog opens.
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-35: user input is rendered as text, never HTML`
- **Status:** Pass

### TC-36: Given the size selector is on "5+ Bedrooms / Large Home" and the Bedrooms & Bathrooms fiel…
- **Acceptance criterion:** AC-36
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the size selector is on "5+ Bedrooms / Large Home" and the Bedrooms & Bathrooms field is empty, when the user clicks "Select Standard", then the form is in view, Service Type is "Standard Maintenance Clean" and Bedrooms & Bathrooms is "5+ Bedrooms / Large Home". Given the field already contains "2 Bed / 1 Bath", when the user clicks "Book Deep Clean", then Service Type is "Peachy Deep Clean" and the field still reads "2 Bed / 1 Bath". "Request Custom Quote" selects "Move-In / Move-Out Clean".
- **Automated by:** `tests/e2e/quote-form.spec.ts` › `AC-36: package CTAs preselect the service and size`
- **Status:** Pass

### TC-37: `validateQuote` returns no errors for a valid object and the exact messages from FR-17 for…
- **Acceptance criterion:** AC-37
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** `validateQuote` returns no errors for a valid object and the exact messages from FR-17 for each invalid case in AC-27 to AC-30.
- **Automated by:** `src/lib/validateQuote.test.ts` › `validateQuote`
- **Status:** Pass

### TC-38: Given the built page, then `<html lang="en-CA">`, the title from FR-21, a meta description…
- **Acceptance criterion:** AC-38
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the built page, then `<html lang="en-CA">`, the title from FR-21, a meta description of 160 characters or fewer, and `og:title` exist; the JSON-LD script parses as JSON with `@type` "HouseCleaning", `telephone` "+1-506-874-1197", `postalCode` "E1C 7B1", and 5 `areaServed` entries, and has no `telePhone` key.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-38: SEO metadata and JSON-LD`
- **Status:** Pass

### TC-39: Given the page loads, when an automated accessibility scan (`@axe-core/playwright`, WCAG 2…
- **Acceptance criterion:** AC-39
- **Priority:** high
- **Type:** accessibility
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, when an automated accessibility scan (`@axe-core/playwright`, WCAG 2 A/AA rules) runs on desktop and mobile, and again with the mobile drawer open and with form errors visible, then there are no violations.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-39: no axe violations on load, with form errors and with the drawer open`
- **Status:** Pass

### TC-40: Given keyboard-only use, when the user presses Tab once from the top of the page, then a "…
- **Acceptance criterion:** AC-40
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given keyboard-only use, when the user presses Tab once from the top of the page, then a "Skip to content" link is focused and activating it moves focus to the main content.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-40: first Tab focuses the skip link, which moves focus to main`
- **Status:** Pass

### TC-41: Given `prefers-reduced-motion: reduce`, when the page loads and the user scrolls to the re…
- **Acceptance criterion:** AC-41
- **Priority:** medium
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given `prefers-reduced-motion: reduce`, when the page loads and the user scrolls to the reviews, then all cards are fully visible (opacity 1) without waiting for animations.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-41: with reduced motion the review cards are fully visible`
- **Status:** Pass

### TC-42: Given the production build served under the `/peachy-klean/` base path, when the page load…
- **Acceptance criterion:** AC-42
- **Priority:** high
- **Type:** functional
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the production build served under the `/peachy-klean/` base path, when the page loads, then all images, fonts and scripts load without 404 errors and there are no console errors.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-42: all assets load under the base path with no console errors`
- **Status:** Pass

### TC-43: Given the page loads, then every `img` has non-empty `alt` (or `alt=""` with `aria-hidden`…
- **Acceptance criterion:** AC-43
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** production build served at `http://localhost:4173/peachy-klean/`; desktop 1280×800 and/or mobile 375×812 as the AC states
- **Test data:** as listed in the AC
- **Steps:**
  1. Open the page.
  2. Perform the action described in the AC.
- **Expected result:** Given the page loads, then every `img` has non-empty `alt` (or `alt=""` with `aria-hidden` when purely decorative) and explicit dimensions or aspect ratio; images below the hero have `loading="lazy"`.
- **Automated by:** `tests/e2e/quality.spec.ts` › `AC-43: images have alt text, dimensions and lazy loading below the hero`
- **Status:** Pass

### TC-44: with normal motion every revealed element ends fully visible after scrolling
- **Acceptance criterion:** AC-41
- **Priority:** high
- **Type:** functional
- **Preconditions:** normal motion (no reduced-motion)
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Scroll the full page with the mouse wheel; wait 800 ms; count visible elements in `main` with opacity < 1
- **Expected result:** 0 elements below opacity 1 (FR-24: no element stays at opacity 0)
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-44 (AC-41): with normal motion every revealed element ends fully visible after scrolling`
- **Status:** Pass

### TC-45: switching checklist tabs with normal motion ends with fully opaque items
- **Acceptance criterion:** AC-23
- **Priority:** medium
- **Type:** functional
- **Preconditions:** normal motion
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Click "Commercial Offices"; read the panel list opacity
- **Expected result:** "Desks and workstations wiped and sanitized" visible, list opacity reaches 1
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-45 (AC-23): switching checklist tabs with normal motion ends with fully opaque items`
- **Status:** Pass

### TC-46: drawer opens and closes with animation and leaves no overlay behind
- **Acceptance criterion:** AC-6
- **Priority:** medium
- **Type:** functional
- **Preconditions:** mobile, normal motion
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Open the drawer and press Escape 3 times in a row
- **Expected result:** Dialog and backdrop removed, body scroll unlocked, focus on "Open menu"
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-46 (AC-6): drawer opens and closes with animation and leaves no overlay behind`
- **Status:** Pass

### TC-47: rapid size changes always end on the last selected price
- **Acceptance criterion:** AC-18
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** default size
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Click 3–4, 5+, 1–2, 5+ quickly
- **Expected result:** Prices $199 / $299 / $359
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-47 (AC-18): rapid size changes always end on the last selected price`
- **Status:** Pass

### TC-48: a package CTA while the confirmation is shown leads to a form with that service
- **Acceptance criterion:** AC-36
- **Priority:** low
- **Type:** negative
- **Preconditions:** a quote was submitted (confirmation shown)
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Click "Book Deep Clean", then "Send another request" if the form is not shown
- **Expected result:** Service Type is "Peachy Deep Clean" (FR-9)
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-48 (AC-36): a package CTA while the confirmation is shown leads to a form with that service`
- **Status:** Fail (#1)

### TC-49: first name uses trimmed input and long unbroken input does not overflow on mobile
- **Acceptance criterion:** AC-32
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** empty form
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Name "   Mélanie    Bourque  ", phone "+1 506 874 1197", notes 1000 × "x"; submit
- **Expected result:** Heading "Thanks, Mélanie! Your quote request is in."; no horizontal scroll
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-49 (AC-32): first name uses trimmed input and long unbroken input does not overflow on mobile`
- **Status:** Pass

### TC-50: Full Name input caps very long pastes and still shows the 80-character error
- **Acceptance criterion:** AC-28
- **Priority:** medium
- **Type:** boundary
- **Preconditions:** empty form
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Paste 500 × "a" in Full Name, valid phone; submit
- **Expected result:** "Name must be 80 characters or fewer." and focus on Full Name
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-50 (AC-28): Full Name input caps very long pastes and still shows the 80-character error`
- **Status:** Pass

### TC-51: double submit with valid data shows exactly one confirmation
- **Acceptance criterion:** AC-32
- **Priority:** medium
- **Type:** negative
- **Preconditions:** empty form
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Valid name and phone; double-click submit
- **Expected result:** Exactly one confirmation panel
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-51 (AC-32): double submit with valid data shows exactly one confirmation`
- **Status:** Pass

### TC-52: keyboard-only user can submit the quote form with Enter
- **Acceptance criterion:** AC-40
- **Priority:** medium
- **Type:** accessibility
- **Preconditions:** empty form
- **Test data:** see steps
- **Steps:**
  1. Open the page.
  2. Keyboard only: type name, Tab, type phone, Enter
- **Expected result:** Confirmation shown and its heading focused
- **Automated by:** `tests/e2e/qa-exploratory.spec.ts` › `TC-52 (AC-40): keyboard-only user can submit the quote form with Enter`
- **Status:** Pass

## Not covered

- FR-25 Lighthouse scores: measured manually (not a blocking test), see the test report.
- FR-27 deployment: workflows reviewed, not executed (they run on GitHub after merge).
- Visual identity (exact colors, fonts, mockup fidelity): reviewed by eye, not automated.
- Phone "+" followed by 10 digits (e.g. "+5068741197"): FR-17 is ambiguous, logged as a spec issue in the report.
