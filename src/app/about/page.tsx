import styles from "../page.module.css";
import QRCodeSection from "@/components/qr-code-section";

export const metadata = {
  title: "About — Global Website",
  description: "About the Global Website project",
};

export default function About() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1>About</h1>
          <p>
            Global Website is a minimal website starter built with Next.js. It
            serves as a simple home on the internet with a public HTTP address.
          </p>
          <p>
            This site is statically generated and can be deployed to any static
            host or run locally with Node.js.
          </p>
          <QRCodeSection path="/about" label="About page QR code" imageSrc="/file.svg" imageAlt="File icon" />
        </div>
      </main>
    </div>
  );
}
