import styles from "../page.module.css";
import QRCodeSection from "@/components/qr-code-section";

export const metadata = {
  title: "Randomeweb App — Global Website",
  description: "Download the Randomeweb app",
};

export default function AppPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Randomeweb App</h1>
          <p>
            Access the app by scanning the QR code or visiting the link below.
          </p>
          <QRCodeSection path="/app" label="App page QR code" imageSrc="/vercel.svg" imageAlt="Vercel logo" />
        </div>
      </main>
    </div>
  );
}
