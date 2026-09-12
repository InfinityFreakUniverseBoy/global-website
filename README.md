# global-website

Simple Next.js website.

## Run locally

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## Configuration

### Admin Contact (Private)

Admin contact information is kept private and configured via environment variables:

- `ADMIN_EMAIL` - Admin email address (not exposed publicly)
- `ADMIN_PHONE_NUMBER` - Admin phone number for SMS contact (server-only, not exposed to client)

These should be configured in `.env.local` (which is ignored by git). See `.env.local.example` for the required variables.

