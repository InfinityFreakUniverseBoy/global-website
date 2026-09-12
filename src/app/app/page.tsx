import Image from "next/image";
import styles from "../page.module.css";
import { generateQRCode, getPublicUrl } from "@/lib/qrcode";

export const metadata = {
  title: "Randomeweb App — Global Website",
  description: "Download the Randomeweb app",
};

export default async function AppPage() {
  const appUrl = getPublicUrl("/app");
  const qrCode = await generateQRCode(appUrl);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Randomeweb App</h1>
          <p>
            Access the app by scanning the QR code or visiting the link below.
          </p>
          <p>
            App link:{" "}
            <a href={appUrl} target="_blank" rel="noopener noreferrer">
              {appUrl}
            </a>
          </p>
          <Image
            src={qrCode}
            alt="QR code for Randomeweb app"
            width={256}
            height={256}
            unoptimized
          />
        </div>
      </main>
    </div>
  );
}
