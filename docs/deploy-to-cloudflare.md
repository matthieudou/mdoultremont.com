# Deploy to Cloudflare

Cloudflare Workers Builds deploys `apps/web` from the GitHub repository. A
push to `main` starts the production build. Pushes to other branches create
preview builds.

GitHub Actions checks formatting, linting, types, and the production build. It
does not deploy.

## Cloudflare build configuration

Configure the Worker with these values:

- Git repository: `matthieudou/mdoultremont.com`
- Production branch: `main`
- Root directory: `/`
- Build command: `pnpm build`
- Deploy command: `pnpm --filter @mdoultremont/portfolio exec wrangler deploy`
- Version command: `pnpm --filter @mdoultremont/portfolio exec wrangler versions upload`

The repository-root pnpm workspace installs the app dependencies. Wrangler
reads `apps/web/wrangler.jsonc`, which declares the Worker name and custom
domain.

## Check a deployment

Open **Workers & Pages > mdoultremont-me > Deployments** in Cloudflare. A
successful production deployment shows the `main` commit and its build log.

Then check the live response:

```bash
curl --fail --head https://mdoultremont.com
```

## Deploy from your computer

Authenticate Wrangler once, then run the root deployment command:

```bash
pnpm --dir apps/web exec wrangler login
pnpm deploy
```

Run `pnpm --dir apps/web exec wrangler whoami` to check the active Cloudflare
account before a local deployment.
