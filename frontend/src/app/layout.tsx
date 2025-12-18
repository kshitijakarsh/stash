import type { Metadata } from "next";
import { Geist, Geist_Mono, Hepta_Slab, Slackey } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const slackey = Slackey({
  weight: "400",         
  variable: "--font-slackey",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hepta = Hepta_Slab({
  variable: "--font-hepta-slab",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "StashIt",
  description: "A website for your links",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${hepta.variable} ${slackey.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
