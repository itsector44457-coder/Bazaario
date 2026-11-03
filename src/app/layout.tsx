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

export const metadata: Metadata = {
  title: "Bazaario – Hyperlocal Marketplace",
  description: "Shop from local stores near you. Fast delivery, real-time tracking.",
  icons: {
    icon: "/Images/Modern Blue Shopping Bag B Logo.png",
    shortcut: "/Images/Modern Blue Shopping Bag B Logo.png",
    apple: "/Images/Modern Blue Shopping Bag B Logo.png",
  },
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
