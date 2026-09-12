import type { Metadata } from "next";
import "./globals.css";
import { getPublicSiteUrl } from "@/lib/site-url";

const publicSiteUrl = getPublicSiteUrl();

export const metadata: Metadata = {
  title: "Global Website",
  description: "Simple website built with Next.js",
  ...(publicSiteUrl
    ? {
        metadataBase: new URL(publicSiteUrl),
        alternates: {
          canonical: "/",
        },
      }
    : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
