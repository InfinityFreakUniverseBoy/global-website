import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Global Website",
  description: "Simple website built with Next.js",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
