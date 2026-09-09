const SUPPORTED_PROTOCOLS = new Set(["http:", "https:"]);

export function getPublicSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    return null;
  }

  try {
    const url = new URL(siteUrl);

    if (!SUPPORTED_PROTOCOLS.has(url.protocol)) {
      return null;
    }

    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}
