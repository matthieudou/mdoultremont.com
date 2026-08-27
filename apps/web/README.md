# matthieu.doultremont.me

The portfolio is a TanStack Start app. Git is its content database and Pages CMS is the editing UI.

## Run locally

```bash
pnpm dev
```

Install dependencies once from the repository root. Run the command above from
the root or directly from this `apps/web` directory.

## Content

Editable records live in `content/`:

- `profile.json` contains shared identity, contact, and professional introduction fields.
- `pages.json` contains editable headings and introductory copy.
- `experiences.json` contains ordered professional timeline entries.
- `photography.json` contains ordered photo metadata.
- `places.json` contains travel locations.
- `life-events.json` contains personal milestones shown in the personal timeline.
- `flights.json` contains flight statistics and optional trace paths.

Public media lives in `public/media/photography` and `public/media/flights`. The
repository-root `.pages.yml` exposes these records and uploads in Pages CMS.

The `/admin` route redirects to the hosted Pages CMS editor for this repository.
CMS edits become ordinary Git commits, which can trigger a new deployment.

## Checks

```bash
pnpm check
pnpm build
```

Oxlint handles linting, Oxfmt handles formatting, and TypeScript runs separately. React Compiler is enabled through the Vite integration.

## Routes

- `/` contains the professional profile and experience timeline.
- `/photography` contains the photo grid and lightbox.
- `/personal` contains travel, cooking, and paragliding content.
- `/admin` opens the content editor.

The app currently targets Cloudflare Workers through the Cloudflare Vite plugin.
