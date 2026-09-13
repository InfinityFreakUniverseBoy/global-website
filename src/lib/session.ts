import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours

function getAdminToken(): string | undefined {
  return process.env.ADMIN_TOKEN;
}

function sign(payload: string): string {
  return createHmac("sha256", getAdminToken() ?? "").update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function isValidAdminToken(token: string): boolean {
  const adminToken = getAdminToken();
  if (!adminToken || !token) return false;
  return safeEqual(token, adminToken);
}

export async function createAdminSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;
  const value = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return false;

  const parts = value.split(".");
  if (parts.length !== 3) return false;

  const [role, expiresAtRaw, signature] = parts;
  if (role !== "admin") return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  const payload = `${role}.${expiresAtRaw}`;
  return safeEqual(signature, sign(payload));
}
