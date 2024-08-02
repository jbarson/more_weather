import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/ui/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  // weight: ['400', '600']
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Yet Another Weather Widget",
  description: "weather widget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <main className="px-4 md:px-6 lg:px-8 grid gap-4">
        <Header />

          <div className="flex justify-center w-5/6 py-4 m-auto">
            <p className="text-2xl font-semibold">{new Date().toDateString()}</p>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
