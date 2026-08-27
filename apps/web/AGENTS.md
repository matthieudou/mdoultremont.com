# Portfolio web guide

- Keep this app limited to the portfolio UI, routes, content loading, and
  Cloudflare application configuration.
- Edit content records under `content/`. Update the repository-root
  `.pages.yml` when their schema or media paths change.
- Generate `src/routeTree.gen.ts` with TanStack Router tooling.
- Run `pnpm check` and `pnpm build` from the repository root.
