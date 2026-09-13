import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import QRCodeSection from "@/components/qr-code-section";

export default function Home() {
  const localUrl = "http://localhost:3000";
  const internetUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://global-website.example.com";
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Global Website</h1>
          <p>A minimal website starter built with Next.js.</p>
          <p>
            Find us on the internet at{" "}
            <a href={internetUrl} target="_blank" rel="noopener noreferrer">
              {internetUrl}
            </a>
            .
          </p>
          <p>
            {isDevelopment ? (
              <>
                Open it at{" "}
                <a href={localUrl} target="_blank" rel="noopener noreferrer">
                  {localUrl}
                </a>
                .
              </>
            ) : (
              <>
                Run it locally at <code className={styles.code}>{localUrl}</code>.
              </>
            )}
          </p>
          <p>
            <Link href="/scan" className={styles.code}>
              Open QR scanner
            </Link>
          </p>
          <QRCodeSection path="/" label="Homepage QR code" imageSrc="/globe.svg" imageAlt="Globe logo" />
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
          />
        </div>
      </main>
    </div>
  );
}
