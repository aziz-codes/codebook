import type { Metadata } from "next";
import { auth } from "@/auth";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/providers/SessionProvider";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
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

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-row gap-4">
              {session && (
                <div className="relative flex  md:w-16 lg:w-64">
                  <aside className="fixed  h-[100vh] rounded-md md:w-16 lg:w-56 overflow-y-auto hidden md:flex   bg-bgCard">
                    <Sidebar />
                  </aside>
                </div>
              )}
              <div className="w-full  min-h-screen flex flex-col">
                {session && (
                  <nav className="sticky h-14 left-0 right-0 top-0 z-50">
                    <Navbar />
                  </nav>
                )}
                <main className="flex flex-1  bg-[#121212]">
                  <div className="w-full px-4">{children}</div>
                  
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
