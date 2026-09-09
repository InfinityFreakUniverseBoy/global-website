import { getPublicSiteUrl } from "@/lib/site-url";
import styles from "./page.module.css";

export default function Home() {
  const localUrl = "http://localhost:3000";
  const isDevelopment = process.env.NODE_ENV === "development";
  const publicSiteUrl = getPublicSiteUrl();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Global Website</h1>
          <p>A clean Next.js website starter with clear local and live access links.</p>
          {publicSiteUrl ? (
            <p>
              Open the live website in Google Chrome or any modern browser at{" "}
              <a href={publicSiteUrl} target="_blank" rel="noopener noreferrer">
                {publicSiteUrl}
              </a>
              .
            </p>
          ) : (
            <p>
              Add <code className={styles.code}>NEXT_PUBLIC_SITE_URL</code> to show your
              public website link here.
            </p>
          )}
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
        </div>
      </main>
    </div>
  );
}
