import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://getthere268.com"),
  title: {
    default: "GET THERE 268 — AI-Powered Data Analytics Platform",
    template: "%s | GET THERE 268",
  },
  description:
    "Transform your data into decisions with GET THERE 268. The AI-native analytics platform for teams who move fast — natural language queries, live dashboards, semantic layer, and prompt engineering in one place.",
  keywords: [
    "data analytics",
    "AI analytics",
    "natural language SQL",
    "business intelligence",
    "dashboard",
    "data visualization",
    "Antigua",
    "SaaS",
    "prompt builder",
    "semantic layer",
  ],
  authors: [{ name: "GET THERE 268" }],
  creator: "GET THERE 268",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://getthere268.com",
    siteName: "GET THERE 268",
    title: "GET THERE 268 — AI-Powered Data Analytics Platform",
    description:
      "Transform your data into decisions. Natural language queries, live dashboards, semantic layer, and AI prompt engineering — all in one platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GET THERE 268 — AI Analytics Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GET THERE 268 — AI-Powered Data Analytics Platform",
    description:
      "Transform your data into decisions with GET THERE 268. The AI-native analytics platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
