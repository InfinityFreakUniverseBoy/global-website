import styles from "./site-footer.module.css";
import { getPublicSiteUrl } from "@/lib/qrcode";

export default function SiteFooter() {
  const internetUrl = getPublicSiteUrl();

  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} Global Website —{" "}
        <a href={internetUrl} target="_blank" rel="noopener noreferrer">
          {internetUrl}
        </a>
      </p>
    </footer>
  );
}
