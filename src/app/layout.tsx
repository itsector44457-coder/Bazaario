import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileBottomNavClient from "@/components/navbar/MobileBottomNavClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://bazaario.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bazaario – Hyperlocal Marketplace | Shop from Local Stores",
    template: "%s | Bazaario",
  },
  description:
    "Bazaario is Mumbai's hyperlocal marketplace. Shop groceries, electronics, fashion & more from local stores near you. Fast delivery, real-time tracking, best deals.",
  keywords: [
    "hyperlocal marketplace",
    "local shopping Mumbai",
    "nearby stores",
    "online grocery Mumbai",
    "local delivery",
    "bazaario",
    "deals of the day",
    "shop local",
    "fast delivery Mumbai",
  ],
  authors: [{ name: "Bazaario", url: BASE_URL }],
  creator: "Bazaario",
  publisher: "Bazaario",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Bazaario",
    title: "Bazaario – Hyperlocal Marketplace | Shop from Local Stores",
    description:
      "Shop groceries, electronics, fashion & more from local stores near you. Fast delivery, real-time tracking, best deals — only on Bazaario.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bazaario – Hyperlocal Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bazaario",
    creator: "@bazaario",
    title: "Bazaario – Hyperlocal Marketplace",
    description:
      "Shop groceries, electronics, fashion & more from local stores near you. Fast delivery, real-time tracking.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "shopping",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        {children}
        <MobileBottomNavClient />
      </body>
    </html>
  );
}
