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

## Auto-restart on crash (production)

`npm start` runs the production server through a small wrapper
(`scripts/start-with-restart.mjs`). If the server process crashes, the
wrapper **restarts it immediately** so the site comes back as fast as
possible — the `.next` build cache is reused, so startup after a crash takes
about a second.

- Restarts only on failure: a clean stop (Ctrl+C, SIGTERM from a process
  manager) shuts it down normally.
- Gives up after 5 crashes within a minute and exits non-zero, so a real bug
  stays visible instead of looping forever.
- Crash/restart events are logged to `.next/server-crash.log` (gitignored).

Use `npm run start:once` to run the plain `next start` without the wrapper.

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

### Android app link (Google Play)

`NEXT_PUBLIC_PLAY_STORE_URL` sets the **Google Play** link shown on the
homepage. It must be a valid `http`/`https` URL; when unset or invalid, the
link is hidden. Replace the package name with the real one after publishing
the app.

```env
NEXT_PUBLIC_PLAY_STORE_URL=https://play.google.com/store/apps/details?id=com.webcamrandome.app
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
