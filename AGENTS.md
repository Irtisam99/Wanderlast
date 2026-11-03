# Wanderlust

Next.js 16.4.4 / React 19.3 App Router project (`src/` alias `@/*`). npm only — no lockfile conflicts: use `npm`, not pnpm/yarn/bun.

## Commands

- `npm run dev` — dev server (Turbopack, http://localhost:3000)
- `npm run lint` — ESLint 9 flat config
- `npx tsc --noEmit` — typecheck (no script; run after edits since there is no test suite)
- `npm run build` — verify before finishing changes

## This version of Next.js differs from training data

Read the relevant guide in `node_modules/next/dist/docs/` before writing App Router code (check deprecations first).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Conventions that differ from defaults

- **shadcn components use Base UI, not Radix**: imports are `@base-ui/react/*` (e.g. `@base-ui/react/button`). Don't add Radix deps or rewrite to Radix patterns. Add components with `npx shadcn@latest add <name>`; they land in `src/components/ui/`.
- **`cn` comes from the `cn` package**, re-exported by `src/lib/utils.ts` — don't import `clsx`/`tailwind-merge` directly.
- **Tailwind v4 has no `tailwind.config.js`**: theme tokens are defined via `@theme inline` and CSS variables in `src/app/globals.css`. Change theme colors/fonts there, not in a config file. Dark mode is class-based (`.dark`, via `@custom-variant`).
- **`next.config.ts` enables cacheComponents, reactCompiler, and partialPrefetching**:
  - `params`/`searchParams` are Promises — `await` them in pages/layouts/generateMetadata.
  - React Compiler handles memoization — don't add `useMemo`/`useCallback`/`React.memo`.
- **Typed route props**: pages/layouts use generated `PageProps<"/route">` / `LayoutProps<"/">` types (synced by `next dev` into `.next/types`), not hand-written param types. `next-env.d.ts` and `.next` type imports are generated — never edit.
- Multi-page routes exist now: pages live flat in `src/app/<route>/page.tsx` (e.g. `add-destination/`).
- **Navbar/Footer are global (`src/app/layout.tsx`); the navbar is an absolute overlay** — `<main>` has `pt-[90px]` so normal page content clears it. Full-bleed hero sections must self-compensate with `-mt-[90px]` (see `src/components/layout/banner.tsx`).
