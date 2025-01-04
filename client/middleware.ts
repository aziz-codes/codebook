import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublicPath = path === "/login";
  const isOnboardingPage = path === "/onboarding"; // Check if the user is already on the onboarding page

  // If no token, redirect to login (applies to non-public paths)
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If token exists but user is trying to access login page, redirect to home
  if (token && isPublicPath) {
    console.log("Redirecting logged-in user to home page from login.");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // If token exists but user isn't onboarded, redirect to onboarding page
  if (token?.isOnboarded === false && !isOnboardingPage) {
    console.log("User is not onboarded, redirecting to onboarding page.");
    return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
  }

  // If user is onboarded, allow them to proceed
  if (token?.isOnboarded === true) {
    console.log("User is onboarded, proceeding to the dashboard.");
    return NextResponse.next(); // Allow request to proceed
  }

  // If no other conditions are met, proceed with the request
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
