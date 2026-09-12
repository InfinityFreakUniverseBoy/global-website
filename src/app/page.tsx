import { headers } from "next/headers";
import styles from "./page.module.css";
import { getSiteUrl } from "@/lib/site-url";

export default async function Home() {
  const localUrl = "http://localhost:3000";
  const isDevelopment = process.env.NODE_ENV === "development";

  // Address of this dev server as seen from the network — on Android, open
  // this URL instead of localhost (localhost on the phone is the phone itself).
  const headersList = await headers();
  const host = headersList.get("host");
  const networkUrl = host ? `http://${host}` : localUrl;

  const siteUrl = getSiteUrl();

  // Server-only (no NEXT_PUBLIC_ prefix) so the value is never bundled into the
  // JavaScript sent to the browser. Configure it in .env.local (gitignored).
  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Global Website</h1>
          <p>A minimal website starter built with Next.js.</p>
          {siteUrl ? (
            <p>
              Visit the website at{" "}
              <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                webcamrandome.com
              </a>
              .
            </p>
          ) : null}
          <p>
            {isDevelopment ? (
              <>
                Open it at{" "}
                <a href={localUrl} target="_blank" rel="noopener noreferrer">
                  {localUrl}
                </a>
                . On Android (same Wi-Fi), use{" "}
                <a href={networkUrl} target="_blank" rel="noopener noreferrer">
                  {networkUrl}
                </a>
                .
              </>
            ) : (
              <>
                Run it locally at <span className={styles.code}>{localUrl}</span>.
              </>
            )}
          </p>
          {adminPhoneNumber ? (
            <div className={styles.adminContact}>
              <h2>Admin Dębice</h2>
              <a href={`sms:${adminPhoneNumber}`}>Send SMS to admin</a>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
