# global-website

Simple Next.js website.

## Private admin email

Store admin email in a private environment file (do not commit it):

```bash
# .env.local
ADMIN_EMAIL=your-admin-email@example.com
```

Set your specific admin email value only in your local/private `.env.local`.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to your public HTTP address (e.g. `https://example.com`) to change the internet link shown on the homepage.

## Admin access

Set `ADMIN_TOKEN` (e.g. in `.env.local`) to a long random secret to enable the admin area:

```bash
# .env.local — never commit this file
ADMIN_TOKEN=<your-secret-token>
```

Then open `/admin/login`, enter the token, and you will be signed in as admin. Sessions use a signed, httpOnly cookie that expires after 8 hours.
