# Citron UI

The core UI component library for the company CRM. A collection of accessible, design-token-driven React components built with consistency and scalability in mind.

## Architecture

The project uses a **Design Tokens** system based on JSON files located in `src/tokens`. These tokens define colors, typography, spacing, radius, and other design primitives. A build-time utility processes these JSON files, extracts the values, and injects them into the Tailwind CSS theme. All components consume these tokens exclusively, ensuring visual consistency across the CRM and alignment with the design system.

## Tech Stack

- React
- TypeScript
- Vite (Library Mode for bundling)
- Tailwind CSS
- Storybook (Vite builder)
- tsup

## Project Structure

| Path | Purpose |
|------|---------|
| `src/tokens` | Design token JSON files. Contains primitive tokens (color, typography, spacing, radius) and semantic tokens. Source of truth for the design system. |
| `src/components` | React components. Each component lives in its own folder with the component file and optional stories. |
| `src/utils/tokenCleaner.ts` | Utility that imports the token JSON files, extracts raw values, and exports a clean object for Tailwind. Cleans the nested JSON structure into a format suitable for Tailwind's theme extension. |
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

Consumers can import components and types from the package. Ensure `react` and `react-dom` are peer dependencies in your project.

## Guidelines

All new components **must** use the design tokens from `src/tokens`. Do not use hardcoded Tailwind color classes such as `bg-blue-500` or arbitrary hex values. Use token-based classes (e.g. `bg-accent-citron-500`, `text-neutral-gray-900`, `border-neutral-gray-200`) so components stay aligned with the design system and benefit from future token updates.
