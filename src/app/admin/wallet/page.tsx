import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/session";
import QRCodeSection from "@/components/qr-code-section";
import styles from "../../page.module.css";

export const metadata = {
  title: "Admin wallet — Global Website",
  description: "Admin wallet and contact information",
};

export default async function AdminWalletPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

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
          <QRCodeSection
            path="/admin/wallet"
            label="Admin wallet QR code"
            imageSrc="/vercel.svg"
            imageAlt="Vercel logo"
          />
        </div>
      </main>
    </div>
  );
}
