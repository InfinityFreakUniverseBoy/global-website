"use server";

import { redirect } from "next/navigation";
import {
  createAdminSession,
  deleteAdminSession,
  isValidAdminToken,
} from "@/lib/session";

export type LoginState = { error?: string } | undefined;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const token = formData.get("token");

  if (typeof token !== "string" || !isValidAdminToken(token)) {
    return { error: "Invalid admin token." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await deleteAdminSession();
  redirect("/admin/login");
}
