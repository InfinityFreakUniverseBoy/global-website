# global-website

Simple Next.js website.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Optional live website link

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your deployed `http://` or `https://` address.

Example:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

When set, the homepage shows a clickable public website link and Next.js metadata uses that domain as the site base URL.
