# global-website

Simple Next.js website.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Open on Android (same Wi-Fi)

`localhost` on the phone points to the phone itself, not your computer.
The dev server already listens on all network interfaces, so:

1. Find your computer's local IP, e.g. `ip addr` (Linux/Mac) or `ipconfig` (Windows).
2. On the Android device connected to the same Wi-Fi, open
   `http://<your-computer-ip>:3000` — for example `http://192.168.1.20:3000`.

In development, the homepage also shows this network URL as a clickable link.

## Configuration

Copy `.env.local.example` to `.env.local` (gitignored) and set the values:

```bash
cp .env.local.example .env.local
```

### Public website URL

`NEXT_PUBLIC_SITE_URL` sets the public website link shown on the homepage
(the "webcamrandome.com" link) and the metadata base URL. It must be a valid
`http`/`https` URL; when unset or invalid, the link is hidden.

```env
NEXT_PUBLIC_SITE_URL=https://webcamrandome.com
```

### Admin SMS contact (private)

The homepage can show an "Admin Dębice" section with a **Send SMS to admin**
link. The phone number is kept private: it is read from a server-only
environment variable (no `NEXT_PUBLIC_` prefix), so it is never bundled into
the JavaScript sent to the browser.

```env
ADMIN_PHONE_NUMBER=+48123456789
```

When `ADMIN_PHONE_NUMBER` is not set, the admin contact section is not shown.
