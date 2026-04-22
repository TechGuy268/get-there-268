import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://getthere268.com"),
  title: {
    default: "GET THERE 268 — Ride-Hailing in Antigua & Barbuda",
    template: "%s | GET THERE 268",
  },
  description:
    "The fastest way to get around Antigua & Barbuda. Book a ride in seconds with GET THERE 268 — safe, affordable, always on time.",
  keywords: ["ride hailing", "Antigua", "Barbuda", "taxi", "transport", "268", "Caribbean"],
  openGraph: {
    type: "website",
    siteName: "GET THERE 268",
    title: "GET THERE 268 — Ride-Hailing in Antigua & Barbuda",
    description: "Book a ride anywhere in Antigua & Barbuda. Fast, safe, affordable.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GET THERE 268 — Ride-Hailing in Antigua & Barbuda",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
