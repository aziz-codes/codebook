import type { Metadata } from "next";
import { auth } from "@/auth";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Provider from "@/providers/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBook",
  description: "Developers Only Platfrom",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {session && (
              <nav className="fixed bottom-[calc(100vh-theme(spacing.12))] left-0 right-0 top-0 z-50">
                <Navbar />
              </nav>
            )}

            <div className="flex min-h-screen gap-10">
              {session && (
                <aside className="sticky top-12 h-[calc(100vh-theme(spacing.12))] md:w-16 lg:w-56 overflow-y-auto border-r  hidden md:flex">
                  <Sidebar />
                </aside>
              )}

              <main className="mt-12 flex flex-1 ">
                <div className="flex-1 w-full py-4 px-4">{children}</div>
                {/* <div className="w-44 border border-red-500 hidden md:flex">
              <div className="fixed right-0">right bar</div>
            </div> */}
              </main>
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
// navbar done here.
