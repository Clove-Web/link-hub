# AGENTS.md

Guidance for LLMs and coding agents working in this repository.

## Required skills

Before doing any work in this repo, load these two skills and follow them for the whole session:

- **`i-have-adhd`** — shape all output for an ADHD reader: lead with concrete next actions, number multi-step work, keep it brief, suppress tangents, and make progress visible.
- **`dyslexia-friendly-code`** — shape all generated and reformatted code for a dyslexic reader: favour vertical layout (one item per line), keep names visually distinct, and align consistently.

These apply to every response, including casual conversation, not just code changes.

## What this is

**doughmination.gay** — the personal homepage and hub for Clove Nytrix Doughmination Twilight. Live site, deployed on Cloudflare Pages. Sections cover projects, music, live Discord presence, dev stats, self-hosted server info, and image galleries.

## Stack

- **Next.js 16** (App Router) + **React 19**, built as a static export (`output: "export"` in `next.config.ts`).
- **TypeScript** everywhere. TypeScript is the preferred language for this project.
- **Vanilla Extract** for styling: `.css.ts` files compiled to static CSS at build time (zero runtime). Do not add a runtime CSS-in-JS library.
- **Turbopack** for dev/build; **Bun** as the package manager.
- **@tanstack/react-query** for data fetching; **@doughmination/react-api** as the live-data client.
- **Deployed on Cloudflare Pages.** The `./out` static export is served by Pages, with locale routing handled at the edge by a Pages Function (`functions/_middleware.ts`).

## Layout

```
src/app/            App Router pages
src/components/chrome/   Site shell: nav, settings, 3D model, i18n text
src/scripts/        Feature components (PresenceCard, Guestbook, galleries, …)
src/styles/         Vanilla Extract stylesheets (.css.ts)
src/i18n/           Locale config + 13 language files
functions/          Cloudflare Pages edge middleware (locale routing)
```

## Conventions

- Every source file carries the DASL-1.0 licence header — keep it on new files.
- Path aliases are configured in `tsconfig.json` (`@components`, `@styles`, `@/…`). Use them.
- Styling goes in a matching `.css.ts` file under `src/styles/`, not inline or in a runtime library. Import order in `layout.tsx` **is** the cascade order — preserve it.
- User-facing text is a translation key resolved at render time; add strings to every locale in `src/i18n/locales/`, starting with `en.ts`. Do not hard-code display strings.
- Locale routing lives at the edge in `functions/_middleware.ts` (static export disables Next's middleware). It imports the same helpers from `src/i18n/config.ts` the app uses — keep that single source of truth.
- `reactStrictMode` is intentionally off; the ported imperative page scripts double-run under Strict Mode. Don't flip it on without making those scripts idempotent.

## Common commands

```bash
bun install
bun dev          # dev server, Turbopack
bun run build    # static export to ./out
bun run lint     # ESLint
```

## Before finishing

Run `bun run lint` and confirm a clean `bun run build` (static export) after non-trivial changes.
