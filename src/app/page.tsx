import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Global Website</h1>
          <p>A minimal website starter built with Next.js.</p>
          <p>
            Open it at{" "}
            <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
              http://localhost:3000
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
