import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("Token:", token);
  console.log("Is Onboarded:", token?.isOnboarded);

  const isPublicPath = path === "/login";

  // If no token, redirect to login (applies to non-public paths)
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If token exists but user isn't onboarded, redirect to onboarding
  if (token && !token.isOnboarded && path !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
  }

  // If user is logged in and tries to access the login page, redirect to dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // Allow request to proceed for other cases
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
    "/onboarding"
  ],
};
