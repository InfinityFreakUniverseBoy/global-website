import styles from "../page.module.css";
import QRCodeSection from "@/components/qr-code-section";

export const metadata = {
  title: "Download App — Global Website",
  description: "Download the app by scanning the QR code",
};

export default function DownloadPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Download App</h1>
          <p>Scan the QR code to open the app page on your device.</p>
          <QRCodeSection
            path="/app"
            label="App download QR code"
            imageSrc="/next.svg"
            imageAlt="App logo"
          />
        </div>
      </main>
    </div>
  );
}
