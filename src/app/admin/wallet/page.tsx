import Image from "next/image";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAdminAuthenticated } from "@/lib/session";
import { generateQRCode, getPublicUrl } from "@/lib/qrcode";
import styles from "../../page.module.css";

export const metadata = {
  title: "Admin wallet — Global Website",
  description: "Admin wallet and contact information",
};

export default async function AdminWalletPage() {
  await connection();

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER?.trim() || undefined;
  const adminPhoneDigits = adminPhoneNumber?.replace(/\D/g, "");
  const adminPhoneLink = adminPhoneDigits
    ? `${adminPhoneNumber?.startsWith("+") ? "+" : ""}${adminPhoneDigits}`
    : undefined;
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
            {adminPhoneNumber && adminPhoneLink ? (
              <a href={`tel:${adminPhoneLink}`}>{adminPhoneNumber}</a>
            ) : (
              "Not configured."
            )}
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
