import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/session";
import styles from "../page.module.css";
import { logout } from "./actions";

export const metadata = {
  title: "Admin — Global Website",
  description: "Admin dashboard",
};

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>Admin dashboard</h1>
          <p>You are signed in as admin.</p>
          <form action={logout}>
            <button type="submit" className={styles.code}>
              Sign out
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
