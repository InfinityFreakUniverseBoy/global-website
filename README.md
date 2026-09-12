# global-website

Simple Next.js website.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Configuration

### Admin SMS contact (private)

The homepage can show an "Admin Dębice" section with a **Send SMS to admin**
link. The phone number is kept private: it is read from a server-only
environment variable (no `NEXT_PUBLIC_` prefix), so it is never bundled into
the JavaScript sent to the browser.

To enable it, copy `.env.local.example` to `.env.local` (gitignored) and set
the number:

```bash
cp .env.local.example .env.local
```

```env
ADMIN_PHONE_NUMBER=+48123456789
```

When `ADMIN_PHONE_NUMBER` is not set, the admin contact section is not shown.
