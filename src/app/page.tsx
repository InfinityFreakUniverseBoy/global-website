import styles from "./page.module.css";

export default function Home() {
  const localUrl = "http://localhost:3000";
  const isDevelopment = process.env.NODE_ENV === "development";

  // Server-only (no NEXT_PUBLIC_ prefix) so the value is never bundled into the
  // JavaScript sent to the browser. Configure it in .env.local (gitignored).
  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Global Website</h1>
          <p>A minimal website starter built with Next.js.</p>
          <p>drobne nr coijd 50 — ale credit Coin. Joe much coin i have.</p>
          <p>Nie much is people on Webcam random and open link Webside.</p>
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
