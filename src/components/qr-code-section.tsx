import Image from "next/image";
import { generateQRCode, getPublicUrl } from "@/lib/qrcode";
import styles from "./qr-code-section.module.css";

interface QRCodeSectionProps {
  path: string;
  label: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default async function QRCodeSection({
  path,
  label,
  imageSrc,
  imageAlt,
}: QRCodeSectionProps) {
  const pageUrl = getPublicUrl(path);
  const qrCode = await generateQRCode(pageUrl);

  return (
    <div className={styles.qrSection}>
      <p>
        {label}:{" "}
        <a href={pageUrl} target="_blank" rel="noopener noreferrer">
          {pageUrl}
        </a>
      </p>
      <div className={styles.qrWrapper}>
        <Image
          src={qrCode}
          alt={`QR code for ${label}`}
          width={256}
          height={256}
          unoptimized
        />
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ?? "Logo"}
            width={48}
            height={48}
            className={styles.qrLogo}
            unoptimized
          />
        )}
      </div>
    </div>
  );
}
