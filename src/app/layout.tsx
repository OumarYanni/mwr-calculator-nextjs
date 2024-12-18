import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculateur MWR",
  description:
    "Calculateur de taux de rendement interne pour vos investissements",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-xl font-bold">Calculateur MWR</h1>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-200 text-center p-4">
          <p>© 2024 Calculateur MWR</p>
        </footer>
      </body>
    </html>
  );
}
