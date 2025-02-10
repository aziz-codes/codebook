"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getSessionFromCookie() {
  try {
    // Get cookies
    const sessionToken = cookies().get("next-auth.session-token")?.value;

    if (!sessionToken) {
      console.log("No session token found");
      return null;
    }

    // Decode the session token
    const decoded = await decode({
      token: sessionToken,
      secret: process.env.NEXTAUTH_SECRET as string,
    });

    console.log("Decoded Session:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error decoding session:", error);
    return null;
  }
}
