import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isAdminAuthenticated } from "@/lib/session";
import styles from "../../page.module.css";
import LoginForm from "./login-form";

export const metadata = {
  title: "Admin login — Global Website",
  description: "Sign in with your admin token",
};

export default async function AdminLoginPage() {
  await connection();

  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Admin login</h1>
          <p>Enter your admin token to access the admin area.</p>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
