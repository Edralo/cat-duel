import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Duel",
  description: "Cat Duel : Who's the cutest cat?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen flex flex-col items-center">
        <header className="flex flex-col h-28 items-center justify-around">
          <h1 className="font-bold">Cat Duel</h1>
        </header>
        <main className="flex flex-grow flex-col items-center content-between">
          {children}
        </main>
      </body>
    </html>
  );
}
