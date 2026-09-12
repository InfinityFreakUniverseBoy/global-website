#!/usr/bin/env node
/**
 * Starts `next start` and restarts it automatically when it crashes.
 *
 * - On a clean exit (code 0, or SIGINT/SIGTERM from Ctrl+C / process
 *   managers) the wrapper exits too — it only restarts on failure.
 * - Restarts immediately so the site comes back as fast as possible. The
 *   `.next` build cache is reused, so startup after a crash is quick.
 * - Up to MAX_RESTARTS restarts within WINDOW_MS; if crashes keep happening
 *   faster than that, the wrapper gives up and exits non-zero so the failure
 *   is visible instead of looping forever.
 */
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";

const MAX_RESTARTS = 5;
const WINDOW_MS = 60_000;
const LOG_FILE = ".next/server-crash.log";

const restartTimes = [];
let stopping = false;
let child = null;

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  process.stdout.write(line);
  try {
    createWriteStream(LOG_FILE, { flags: "a" }).write(line);
  } catch {
    // Logging must never crash the wrapper.
  }
}

function start() {
  child = spawn("npx", ["next", "start", ...process.argv.slice(2)], {
    stdio: "inherit",
    env: process.env,
    // Own process group so we can signal the whole tree (npx → sh →
    // next-server) on shutdown and on crash cleanup.
    detached: true,
  });

  child.on("exit", (code, signal) => {
    if (stopping) return;

    if (signal === "SIGINT" || signal === "SIGTERM") {
      process.exit(0);
    }
    if (code === 0) {
      process.exit(0);
    }

    const now = Date.now();
    restartTimes.push(now);
    while (restartTimes.length && now - restartTimes[0] > WINDOW_MS) {
      restartTimes.shift();
    }

    if (restartTimes.length > MAX_RESTARTS) {
      log(
        `Server crashed ${restartTimes.length} times within ${WINDOW_MS / 1000}s — giving up. See ${LOG_FILE}.`,
      );
      process.exit(code ?? 1);
    }

    log(`Server exited (code ${code ?? "unknown"}${signal ? `, ${signal}` : ""}) — restarting now.`);
    start();
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopping = true;
    // Forward the signal to the whole process group so the server can shut
    // down gracefully; the exit handler then sees `stopping` and does not
    // restart.
    if (child && child.pid) {
      try {
        process.kill(-child.pid, signal);
      } catch {
        // Process group already gone.
      }
    }
    setTimeout(() => process.exit(0), 500).unref();
  });
}

start();
