import Image from "next/image";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/session";
import { generateQRCode, getPublicUrl } from "@/lib/qrcode";
import styles from "../../page.module.css";

export const metadata = {
  title: "Admin wallet — Global Website",
  description: "Admin wallet and contact information",
};

export default async function AdminWalletPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const walletUrl = getPublicUrl("/admin/wallet");
  const qrCode = await generateQRCode(walletUrl);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Admin wallet</h1>
          <p>Private admin access and contact details.</p>
          <p>
            Phone:{" "}
            <a href="tel:+48514404306">+48 514 404 306</a>
          </p>
          <p>
            Wallet page link:{" "}
            <a href={walletUrl} target="_blank" rel="noopener noreferrer">
              {walletUrl}
            </a>
          </p>
          <Image
            src={qrCode}
            alt="QR code for admin wallet page"
            width={256}
            height={256}
            unoptimized
          />
        </div>
      </main>
    </div>
  );
}
