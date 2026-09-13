import QRCode from "qrcode";

const DEFAULT_PUBLIC_SITE_URL = "http://global-website.example.com";

export async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}

export function getPublicSiteUrl(): string {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configuredSiteUrl
    ? configuredSiteUrl.replace(/\/$/, "")
    : DEFAULT_PUBLIC_SITE_URL;
}

export function getPublicUrl(path: string): string {
  const base = getPublicSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
