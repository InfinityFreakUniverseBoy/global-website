import styles from "./page.module.css";

export default function Home() {
  const localUrl = "http://localhost:3000";
  const internetUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://global-website.example.com";
  const isDevelopment = process.env.NODE_ENV === "development";
  const hasPrivateAdminEmail = Boolean(process.env.ADMIN_EMAIL?.trim());

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
            {hasPrivateAdminEmail
              ? "Private admin contact is configured."
              : "Private admin contact is not configured yet."}
          </p>
        </div>
      </main>
    </div>
  );
}
