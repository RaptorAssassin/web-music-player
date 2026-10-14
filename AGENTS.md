<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Web Music Player

Single-package Next.js 16.4 + React 19.3 + Tailwind CSS v4 app. No monorepo, no tests, no CI.

## Commands

Use `pnpm` (`packageManager: pnpm@11.25.0`):

- `pnpm dev` — dev server (Turbopack)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — eslint (no `--fix` by default)
- `pnpm format:check` / `pnpm format` — prettier check / write
- `pnpm tsc --noEmit` — typecheck (no `typecheck` script defined; currently fails on `lib/music-player.ts` stub types)

## Structure

- Entry: `app/page.tsx` → `components/music-player.tsx` → `components/music-controls.tsx`
- `app/layout.tsx`: root layout, Geist fonts, `LayoutProps<'/'>` param typing
- `lib/utils.ts`: `cn()` (clsx + tailwind-merge)
- `lib/music-player.ts`: empty stubs (`playMusic`, `pauseMusic`, etc.) — playback currently lives inline in `music-controls.tsx` via `audioRef.current?.play()/pause()`
- Path alias: `@/*` maps to repo root (`./`), e.g. `@/components/button`
- Styling: Tailwind v4 — `app/globals.css` uses `@import 'tailwindcss'` + `@theme inline`

## Quirks

- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `experimental.agentFeedback: true`; Turbopack rule routes `*.css` through `@tailwindcss/turbopack`
- Interactive player components require `'use client'`; `motion` imports come from `motion/react`
- Prettier: no semicolons, single quotes, 2-space, `prettier-plugin-tailwindcss` (class sorting handled automatically)

## Notes

- Do not add code comments.
- Do not do more than asked: keep changes minimal and within the requested scope.
