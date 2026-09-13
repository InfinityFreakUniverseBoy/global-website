import styles from "./site-footer.module.css";

export default function SiteFooter() {
  const internetUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://global-website.example.com";

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
