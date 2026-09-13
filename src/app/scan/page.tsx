import QRCodeScanner from "@/components/qr-code-scanner";
import styles from "../page.module.css";

export const metadata = {
  title: "QR Scanner — Global Website",
  description: "Scan a QR code and open the link",
};

export default function ScanPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>QR Scanner</h1>
          <p>Point your camera at a QR code to scan it and open the link.</p>
          <QRCodeScanner />
        </div>
      </main>
    </div>
  );
}
