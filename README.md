# Citron UI

The core UI component library for the company CRM. A collection of accessible, design-token-driven React components built with consistency and scalability in mind.

## Architecture

The project consumes design tokens from the **@citron-systems/citron-ds** NPM package. The package provides CSS variables (e.g. `var(--inkblot-semantic-color-*)`) which are activated via `@import '@citron-systems/citron-ds/css'` in the main CSS entry point. All components use **semantic tokens only**—never primitives—ensuring automatic dark mode support via `[data-theme="dark"]` and alignment with WCAG AAA standards. Spacing and border-radius from the package are mapped into Tailwind's theme via `src/utils/inkblotTheme.ts`.

## Tech Stack

- React
- TypeScript
- Vite (Library Mode for bundling)
- Tailwind CSS
- Storybook (Vite builder)
- tsup
- @citron-systems/citron-ds

## Project Structure

| Path | Purpose |
|------|---------|
| `src/components` | React components. Each component lives in its own folder with the component file and optional stories. |
| `src/utils/inkblotTheme.ts` | Maps @citron-systems/citron-ds resolved tokens (Inkblot prefix) to Tailwind spacing and borderRadius. |
| `src/index.ts` | Library entry point. Exports all public components and their types. |

## Development Workflow

**Run the preview**

```bash
npm run dev
```

Starts Storybook on `http://localhost:6006`. Use it to develop and document components in isolation.

**Build the library**

```bash
npm run build
```

Uses tsup to bundle the library. Output is written to the `dist` folder.

## Library Consumption

The build produces artifacts in the `dist` folder:

- `dist/index.js` (CommonJS)
- `dist/index.mjs` (ESM)
- `dist/index.d.ts` (TypeScript definitions)

Consumers must import the design system CSS and can optionally set `data-theme="dark"` on a parent element for dark mode. Ensure `react` and `react-dom` are peer dependencies in your project.

## Publishing (CI/CD)

Pushes to `main` automatically publish to npm via GitHub Actions. Version bumps follow [Conventional Commits](https://www.conventionalcommits.org/):

- **patch** – `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`
- **minor** – `feat:`
- **major** – `feat!:`, `fix!:`, or `BREAKING CHANGE` in commit body

**Setup (one-time):** Configure [Trusted Publisher](https://docs.npmjs.com/trusted-publishers) on npm for this repo. No `NPM_TOKEN` secret needed—OIDC handles auth.

1. Go to [npmjs.com](https://www.npmjs.com/) → your package → Package settings → **Trusted Publishers**
2. Click **Set up connection**
3. Choose **GitHub Actions**
4. Enter:
   - **Organization or user:** `Inkblot-Studio` (or your GitHub org/user)
   - **Repository:** `citron-ui`
   - **Workflow filename:** `publish.yml`

## Guidelines

All new components **must** use semantic tokens from @citron-systems/citron-ds via CSS variables (e.g. `var(--inkblot-semantic-color-interactive-primary)`). Never use primitives or hardcoded colors. Follow the Principles of Radical Clarity and use semantic tokens for all states (hover, focus, disabled, error). Components automatically support dark mode when `[data-theme="dark"]` is applied.