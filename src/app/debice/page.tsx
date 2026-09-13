import styles from "../page.module.css";

export const metadata = {
  title: "Dębice — Global Website",
  description: "Dębice page for Global Website",
};

export default function DebicePage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Dębice</h1>
          <p>Dębice.</p>
        </div>
      </main>
    </div>
  );
}
