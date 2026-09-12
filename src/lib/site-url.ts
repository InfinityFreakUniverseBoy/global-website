/**
 * Returns the public site URL when NEXT_PUBLIC_SITE_URL is a valid
 * http/https URL, otherwise null. Used for the homepage website link
 * and metadata base URL.
 */
export function getSiteUrl(): string | null {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    return null;
  }
  try {
    const url = new URL(siteUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.origin;
    }
    return null;
  } catch {
    return null;
  }
}
