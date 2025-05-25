// lib/actions/auth.ts
"use server";

import { cookies } from "next/headers";

export async function getSessionToken(): Promise<string | null> {
  const sessionCookie = cookies().get("session")?.value;
  return sessionCookie || null;
}
