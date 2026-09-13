import styles from "../page.module.css";
import { getPublicSiteUrl } from "@/lib/qrcode";

export const metadata = {
  title: "Contact — Global Website",
  description: "Contact the Global Website team",
};

export default function Contact() {
  const internetUrl = getPublicSiteUrl();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Contact</h1>
          <p>Reach us on the internet through our public website address.</p>
          <p>
            Website:{" "}
            <a href={internetUrl} target="_blank" rel="noopener noreferrer">
              {internetUrl}
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
