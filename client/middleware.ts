import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function middlware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const publicPath = path === "/login";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/discussions",
    "/bounties",
    "/snippets",
    "/peoples",
    "/create-snippet"
  ],
};
