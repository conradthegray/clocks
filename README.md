# Clocks

A collection of various clocks and creative ways of measuring time. The goal is
to explore unconventional, playful, and beautiful ways to represent the passage
of time. Each clock is an experiment in turning something we usually take for
granted into something worth looking at.

## Tech stack

- React 19 + TypeScript
- Vite for dev server and builds
- Tailwind CSS with Nord colour theme
- Vitest + Testing Library for unit tests

## Getting started

Install dependencies:

```sh
npm install
```

### Run

Start the development server with hot module replacement:

```sh
npm run dev
```

Then open the URL printed in the terminal (defaults to http://localhost:5173).

### Build

Type-check and produce an optimized production build in `dist/`:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

### Test

Run the unit tests once:

```sh
npm test
```

Run the tests in watch mode while developing:

```sh
npm run test:watch
```

Generate a coverage report:

```sh
npm run coverage
```

### Lint

```sh
npm run lint
```

## Project structure

```text
src/
  components/      UI components, each with co-located *.test.tsx files
  hooks/           Reusable hooks (e.g. useTheme)
  test/            Vitest setup
```
