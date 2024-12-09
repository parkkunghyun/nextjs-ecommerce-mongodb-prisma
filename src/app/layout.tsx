import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: "Flowmazon",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
          {children}
        </main>
      </body>
    </html>
  );
}
