import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
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
        <nav className="fixed bottom-[calc(100vh-theme(spacing.16))] left-0 right-0 top-0 bg-blue-200 ">
          Nav
        </nav>

        <div className="flex min-h-screen">
          <aside className="sticky top-16 h-[calc(100vh-theme(spacing.16))] w-40 overflow-y-auto bg-green-200 hidden md:flex">
            <ul>
              <li>A</li>
              <li>B</li>
              <li>C</li>
            </ul>
          </aside>

          <main className="mt-16 flex flex-1 bg-yellow-200">
            <div className="flex-1">Content area</div>
            <div className="w-44 border border-red-500 hidden md:flex">
              <div className="fixed right-0">right bar</div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
