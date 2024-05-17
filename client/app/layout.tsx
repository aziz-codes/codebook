import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeBook",
  description: "Developers Only Platfrom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  `}>
        <nav className="fixed bottom-[calc(100vh-theme(spacing.12))] left-0 right-0 top-0 ">
          <Navbar />
        </nav>

        <div className="flex min-h-screen gap-20">
          <aside className="sticky top-12 h-[calc(100vh-theme(spacing.12))] w-56 overflow-y-auto border-r  hidden md:flex">
            <Sidebar />
          </aside>

          <main className="mt-12 flex flex-1 ">
            <div className="flex-1 w-full max-w-lg py-4 px-4">{children}</div>
            {/* <div className="w-44 border border-red-500 hidden md:flex">
              <div className="fixed right-0">right bar</div>
            </div> */}
          </main>
        </div>
      </body>
    </html>
  );
}
// navbar done here.
