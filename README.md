# React CV Starter

JSON-driven React portfolio starter for GitHub Pages.

## Stack

- React 19 + TypeScript
- Vite
- TanStack Router with hash history for GitHub Pages-safe navigation
- TanStack Query for the content boundary
- Tailwind CSS v4
- Zod for schema validation
- Motion for page transitions

## Edit content

Update `src/content/cv.json`. The app schema-validates this file before rendering.

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run test
npm run build
```

## Deploy

GitHub Actions deploys the built `dist` output to GitHub Pages on pushes to `main`.
