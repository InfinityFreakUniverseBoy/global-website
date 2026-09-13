/**
 * Returns the value of the given env var when it is a valid http/https URL,
 * otherwise null.
 */
function getPublicUrl(envValue: string | undefined): string | null {
  if (!envValue) {
    return null;
  }
  try {
    const url = new URL(envValue);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Public site URL (NEXT_PUBLIC_SITE_URL). Used for the homepage website link
 * and metadata base URL.
 */
export function getSiteUrl(): string | null {
  const siteUrl = getPublicUrl(process.env.NEXT_PUBLIC_SITE_URL);
  return siteUrl ? new URL(siteUrl).origin : null;
}

/**
 * Google Play Store URL of the Android app (NEXT_PUBLIC_PLAY_STORE_URL).
 * Used for the homepage "Get the app on Google Play" link.
 */
export function getPlayStoreUrl(): string | null {
  return getPublicUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL);
}
