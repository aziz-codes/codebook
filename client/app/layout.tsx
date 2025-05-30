import type { Metadata } from "next";
import { auth } from "@/auth";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/providers/SessionProvider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/query-provider";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getSessionToken } from "@/actions/getSession";
import { redirect } from "next/navigation";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "CodeBook",
  description: "Developers Only Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (typeof window !== "undefined") {
    window.addEventListener("error", (e) => {
      if (e.message?.includes("Loading chunk")) {
        window.location.reload();
      }
    });
  }
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <QueryProvider>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <div className="flex min-h-screen flex-row bg-[#121212] w-full">
                  <div className="2xl:max-w-6xl 2xl:mx-auto w-full flex min-h-screen gap-4">
                    {session && (
                      <div className="relative hidden md:flex md:w-16 lg:w-64">
                        <aside className="fixed h-[100vh] md:w-16 lg:w-56 overflow-y-auto bg-bgCard">
                          <Sidebar />
                        </aside>
                      </div>
                    )}
                    <div className="w-full min-h-screen flex flex-col">
                      {session && (
                        <nav className="sticky h-14 left-0 right-0 top-0 z-50">
                          <Navbar />
                        </nav>
                      )}
                      <main className="flex flex-1 w-full px-4">
                        {children}
                      </main>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </ThemeProvider>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryProvider>
      </body>
    </html>
  );
}
