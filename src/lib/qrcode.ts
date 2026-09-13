import QRCode from "qrcode";

export async function generateQRCode(data: string): Promise<string> {
  return QRCode.toDataURL(data, {
    width: 256,
    margin: 2,
    errorCorrectionLevel: "M",
  });
}

export function getPublicUrl(path: string): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://global-website.example.com";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
