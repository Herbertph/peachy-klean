# Test report: landing-page

- Branch: `feature/landing-page`, commit `82143ac`
- Spec: `docs/specs/landing-page.md` · Test cases: `docs/test-cases/landing-page.md`
- Date: 2026-11-20

## Verdict: PASS

Every AC (43/43) has at least one passing test case, build and both suites pass, and no critical or major issue is open. One minor issue stays open as backlog.

## Counts

| | Result |
|---|---|
| Build (`npm run build`) | Pass (JS 284.8 KB, 94.5 KB gzip) |
| Unit (Vitest) | 21/21 pass |
| E2E (Playwright, desktop + mobile) | 96 passed, 12 skipped (viewport-specific tests skip on the other project), includes TC-48 as an expected failure (`test.fail`, #1) |
| Test cases | 52: 51 Pass, 1 Fail (#1) |
| `npm audit --omit=dev` | 0 vulnerabilities |

## Traceability

| AC | Test cases and result |
|---|---|
| AC-1 | TC-1 Pass |
| AC-2 | TC-2 Pass |
| AC-3 | TC-3 Pass |
| AC-4 | TC-4 Pass |
| AC-5 | TC-5 Pass |
| AC-6 | TC-6 Pass, TC-46 Pass |
| AC-7 | TC-7 Pass |
| AC-8 | TC-8 Pass |
| AC-9 | TC-9 Pass |
| AC-10 | TC-10 Pass |
| AC-11 | TC-11 Pass |
| AC-12 | TC-12 Pass |
| AC-13 | TC-13 Pass |
| AC-14 | TC-14 Pass |
| AC-15 | TC-15 Pass |
| AC-16 | TC-16 Pass |
| AC-17 | TC-17 Pass |
| AC-18 | TC-18 Pass, TC-47 Pass |
| AC-19 | TC-19 Pass |
| AC-20 | TC-20 Pass |
| AC-21 | TC-21 Pass |
| AC-22 | TC-22 Pass |
| AC-23 | TC-23 Pass, TC-45 Pass |
| AC-24 | TC-24 Pass |
| AC-25 | TC-25 Pass |
| AC-26 | TC-26 Pass |
| AC-27 | TC-27 Pass |
| AC-28 | TC-28 Pass, TC-50 Pass |
| AC-29 | TC-29 Pass |
| AC-30 | TC-30 Pass |
| AC-31 | TC-31 Pass |
| AC-32 | TC-32 Pass, TC-49 Pass, TC-51 Pass |
| AC-33 | TC-33 Pass |
| AC-34 | TC-34 Pass |
| AC-35 | TC-35 Pass |
| AC-36 | TC-36 Pass, TC-48 Fail (#1) |
| AC-37 | TC-37 Pass |
| AC-38 | TC-38 Pass |
| AC-39 | TC-39 Pass |
| AC-40 | TC-40 Pass, TC-52 Pass |
| AC-41 | TC-41 Pass, TC-44 Pass |
| AC-42 | TC-42 Pass |
| AC-43 | TC-43 Pass |

## Issues opened

- #1 (minor): Package CTA does not preselect the service after a quote was submitted. TC-48 is annotated `test.fail` with a pointer to #1; it will turn red once fixed, and the annotation must then be removed.

## Flaky tests

None. Every run was stable (TC-48 failed 3/3, deterministic).

## Spec issues

- FR-17 phone: "10 digits, or 11 digits starting with 1, optionally preceded by +" does not say whether `+` with 10 digits (`+5068741197`) is valid. The code rejects it; no test pins either behavior (a mutation removing that rule kept the suite green). The Analyst should decide.

## Motion (Reveal, Checklist, mobile drawer) after the LazyMotion change

- Reveal uses transform only; TC-44 confirms no element in `main` stays below opacity 1 after scrolling with normal motion; AC-41 covers reduced motion.
- Checklist tab transition ends at opacity 1 (TC-45); drawer opens and closes repeatedly with no leftover backdrop or scroll lock (TC-46). `LazyMotion strict` would throw on any remaining `motion.*` usage; none found, no console errors (AC-42).

## Lighthouse (FR-25, reported by Front-End Dev, mobile, local preview, not blocking)

| Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|
| 88–89 (target 90) | 100 | 100 | 100 |

Performance is below the 90 target; LCP is the hero text waiting for JS. Re-measure on the deployed GitHub Pages URL after merge.

## Code review (`git diff main...HEAD`)

No defects beyond #1. Suggestions (not issues):
- Consider: the confirmation price reads the live `sizeId`, so changing the size selector after submit changes the shown "Starting at" price. Matches FR-19 wording ("currently chosen"), but a snapshot at submit would be more predictable.
- Nit: inactive checklist tabs have `aria-controls` pointing to panel ids that are not in the DOM (only the active panel renders). axe passes; rendering all panels with `hidden` would be cleaner.
- Nit: `validateQuote` returns "Please keep this under 100 characters." for fields whose `maxLength` already prevents it; harmless defense in depth.
- Security: user input rendered only as React text (AC-35 passes), no `dangerouslySetInnerHTML`, no network calls on submit, external Maps link uses `noopener noreferrer`.

## Not covered

Placeholder copy in `src/data/` needs Analyst review; deployment workflows run only on GitHub.
