# global-website

Simple Next.js website.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to your public HTTP address (e.g. `https://example.com`) to change the internet link shown on the homepage.

### Admin Contact (Private)

Admin contact information is kept private and configured via environment variables:

- `ADMIN_EMAIL` - Admin email address (not exposed publicly)
- `ADMIN_PHONE_NUMBER` - Admin phone number for SMS contact (server-only, not exposed to client)

These should be configured in `.env.local` (which is ignored by git). See `.env.local.example` for the required variables.

## Admin access

Set `ADMIN_TOKEN` (e.g. in `.env.local`) to a long random secret to enable the admin area:

```bash
# .env.local — never commit this file
ADMIN_TOKEN=<your-secret-token>
```

Then open `/admin/login`, enter the token, and you will be signed in as admin. Sessions use a signed, httpOnly cookie that expires after 8 hours.

### Public app access

The public `/app` page shows a QR code for the Randomeweb app landing page. Set `NEXT_PUBLIC_SITE_URL` so the QR code points to your public address.

### QR codes on all pages

Public pages (`/`, `/about`, `/contact`, `/app`) display a QR code that links to the current page. The `/download` page shows a QR code that links to `/app`. Set `NEXT_PUBLIC_SITE_URL` so the QR codes point to your public address.

### QR scanner

Open `/scan` to use the browser's camera to scan a QR code and open the scanned link.

### Admin wallet

After signing in as admin, open `/admin/wallet` to view admin contact details (including the configured phone number) and a QR code for the wallet page.
