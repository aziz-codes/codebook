"use server";
import { cookies } from "next/headers";

export const setTokens = async (token: any) => {
  cookies().set("session", token, {
    httpOnly: true, // not accessible to client-side JS
    secure: process.env.NODE_ENV === "production", // only send over HTTPS in production
    sameSite: "lax", // adjust as needed ("strict" or "none")
    path: "/", // available on all routes
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
  });
};
