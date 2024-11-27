import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
 
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
 
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log(token?.isNewUser);  

  const publicPath = path === "/login";

 
  if (publicPath && token) {
  
     
     
      return NextResponse.redirect(new URL("/", req.nextUrl));
     
  }
 

  
  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (token?.isNewUser) {
    console.log("Redirecting to new-user setup page");
    return NextResponse.redirect(new URL("/new-user", req.nextUrl));
  }

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
    "/create-snippet"
  ],
};
