# peachy-klean

Orientacao na primeira msg

Built with a multi-agent pipeline: requirements analyst → developer → tester → pull request. A human reviews and merges every PR.

## Stack

Vite + React 18 + TypeScript (strict), Tailwind CSS 3 (brand tokens in `tailwind.config.js`), lucide-react, framer-motion, self-hosted fonts via `@fontsource`. Unit tests: Vitest. End-to-end: Playwright (Chromium, desktop 1280x800 and mobile 375x812) with `@axe-core/playwright`. Deployed to GitHub Pages under the base path `/peachy-klean/`.

## Commands

- `npm install`: install dependencies (`npx playwright install chromium` once for e2e)
- `npm run dev`: dev server
- `npm run build`: type-check and build to `dist/`
- `npm run preview`: serve the build
- `npm test`: unit tests (Vitest)
- `npm run test:e2e`: Playwright tests; builds and serves the site on port 4173 (never 4545)

## Structure

- `src/data/`: business info, packages, sizes, add-ons, checklist, discounts, reviews (replace placeholder content here)
- `src/lib/`: pure logic (`getPackagePrice`, `validateQuote`) with `*.test.ts` unit tests next to it
- `src/components/`: one component per page section; shared UI bits in `ui.tsx`
- `src/assets/placeholders/`: placeholder photos and `CREDITS.md`
- `tests/e2e/`: Playwright specs, test names start with their AC id
- `.github/workflows/`: `ci.yml` (build + unit + e2e on PRs and `main`), `deploy.yml` (GitHub Pages on push to `main`)

- `docs/specs/`: feature specs written by the requirements analyst
- `docs/test-cases/`: test cases (TC-n, with steps and expected results) written by the tester
- `docs/test-reports/`: test reports written by the tester
- Bugs found in testing are filed as GitHub issues labeled `bug` and `severity: *`. Fix commits reference the issue (`fix: ... (#12)`), and PRs close them with `Fixes #12`.

## Conventions

- Everything in the repository is written in English: code, comments, docs, commit messages, PR descriptions.
- Keep business logic in pure, testable functions, separate from UI code.
- Never render user input as HTML.
- Prefer accessible markup (labels, roles, `aria-*`). End-to-end tests locate elements with `getByRole`, `getByLabel` and `getByText` where possible.
- Name tests after behavior. Acceptance tests start with their criterion ID, for example `AC-2: rejects a blank title`.
- Commits follow Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
- Feature branches are named `feature/<slug>`, or keep the branch Claude Code created for a worktree session. Never commit to `main`.

## Definition of done

- Every acceptance criterion in the spec is covered by at least one test.
- Build, unit tests and end-to-end tests all pass.
- No unrelated changes in the diff.
