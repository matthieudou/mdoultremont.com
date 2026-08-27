# Deploy to Cloudflare

The `CI` workflow checks and builds every push and pull request. After a push
to `main` passes, the workflow deploys `apps/web` as the
`matthieu-doultremont-me` Cloudflare Worker.

## Configure Cloudflare

1. Open the [Cloudflare API Tokens page](https://dash.cloudflare.com/profile/api-tokens).
2. Create a token from the **Edit Cloudflare Workers** template.
3. Limit the token to the Cloudflare account that owns the Worker.
4. Copy the token before you leave the page. Cloudflare shows it once.
5. Copy the account ID from the Cloudflare dashboard account overview.

The application does not read runtime environment variables or secrets. Add
new Worker secrets only when the application starts using them.

## Configure GitHub

1. Open **Settings > Secrets and variables > Actions** in the GitHub repository.
2. Create the repository secret `CLOUDFLARE_API_TOKEN` with the API token.
3. Create the repository variable `CLOUDFLARE_ACCOUNT_ID` with the account ID.
4. Open **Settings > Environments** and select the `production` environment
   after the first workflow run creates it.
5. Add deployment protection rules if you want manual approval before each
   production deployment.

You can also configure the values with GitHub CLI:

```bash
gh secret set CLOUDFLARE_API_TOKEN --repo matthieudou/mdoultremont.com
gh variable set CLOUDFLARE_ACCOUNT_ID --repo matthieudou/mdoultremont.com --body "YOUR_ACCOUNT_ID"
```

## Run the first deployment

Push a commit to `main`, then open the repository's **Actions** tab. The
`Deploy to Cloudflare` job starts only after the `Quality` job passes.

Wrangler deploys to the Worker named in `apps/web/wrangler.jsonc`. If the
Worker already has a custom domain, the domain remains attached. Otherwise,
open the Worker in Cloudflare and add a custom domain under **Settings >
Domains & Routes**.

## Deploy from your computer

Authenticate Wrangler once, then run the root deployment command:

```bash
pnpm --dir apps/web exec wrangler login
pnpm deploy
```

Run `pnpm --dir apps/web exec wrangler whoami` to check the active Cloudflare
account before a local deployment.
