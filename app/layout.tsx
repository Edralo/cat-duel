import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

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
        <header className="flex h-28 items-center">
          <h1 className="font-bold">Cat Duel</h1>
        </header>
        <main className="flex flex-grow flex-col justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}
