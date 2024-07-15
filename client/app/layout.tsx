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
            <div className="flex min-h-screen flex-row gap-4 px-4 py-2">
              <div className="relative flex  md:w-16 lg:w-64">
                <aside className="fixed top-2 h-[98vh] rounded-md md:w-16 lg:w-56 overflow-y-auto hidden md:flex   bg-[#191919]">
                  <Sidebar />
                </aside>
              </div>
              <div className="w-full  min-h-screen flex flex-col">
                <nav className="sticky h-14 left-0 right-0 top-0 z-50">
                  <Navbar />
                </nav>
                <main className="mt-16 flex flex-1 dark:bg-[#121212]">
                  <div className="flex-1 w-full px-4 py-4">{children}</div>
                  {/* <div className="w-44 border border-red-500 hidden md:flex"></div> */}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
