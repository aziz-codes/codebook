import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = path === "/login";
  const isOnboardingPage = path === "/onboarding";

  // No token at all = user not logged in
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Logged-in user trying to access /login
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // User logged in but not onboarded
  if (token && token.isOnboarded === false && !isOnboardingPage) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/discussions",
    "/bounties",
    "/snippets",
    "/peoples",
    "/create-snippet",
    "/onboarding",
    "/p/",
  ],
};
