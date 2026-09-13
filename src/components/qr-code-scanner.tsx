"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./qr-code-scanner.module.css";

export default function QRCodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        setError(
          "Could not access the camera. Please allow camera permissions and use a secure context (HTTPS or localhost).",
        );
      }
    }

    void startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    async function scan() {
      if (!videoRef.current || !canvasRef.current || result) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
        rafRef.current = requestAnimationFrame(scan);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      try {
        const BarcodeDetector = (window as unknown as { BarcodeDetector?: typeof BarcodeDetector }).BarcodeDetector;
        if (BarcodeDetector) {
          const detector = new BarcodeDetector({ formats: ["qr_code"] });
          const codes = await detector.detect(canvas);
          if (codes.length > 0) {
            const url = codes[0].rawValue;
            setResult(url);
            window.open(url, "_blank", "noopener,noreferrer");
            return;
          }
        }
      } catch {
        // Ignore scanning errors and try again on the next frame.
      }

      rafRef.current = requestAnimationFrame(scan);
    }

    rafRef.current = requestAnimationFrame(scan);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [result]);

  return (
    <div className={styles.scanner}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={styles.video}
          />
          <canvas ref={canvasRef} className={styles.canvas} />
          {result && (
            <p className={styles.result}>
              Opened:{" "}
              <a href={result} target="_blank" rel="noopener noreferrer">
                {result}
              </a>
            </p>
          )}
        </>
      )}
    </div>
  );
}
