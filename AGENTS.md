# Repository guide

- Keep deployable applications under `apps/`.
- Put code shared by more than one app under `packages/`.
- Run `pnpm dev`, `pnpm check`, and `pnpm build` from the repository root.
- Keep Pages CMS configuration in the repository-root `.pages.yml`. Update it
  when changing files or fields under `apps/web/content`.
- Keep content paths valid from the repository root, which is where Pages CMS
  resolves them.
- Treat the JSON files under `apps/web/content` as production content.
