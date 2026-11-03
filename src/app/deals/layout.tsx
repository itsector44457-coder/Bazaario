import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Deals of the Day",
  description:
    "Today's best deals from local stores near you. Limited-time discounts on groceries, electronics, fashion, and more — only on Bazaario.",
  keywords: [
    "deals of the day",
    "today's offers",
    "best deals Mumbai",
    "discount products",
    "local store deals",
    "flash sale",
  ],
  openGraph: {
    title: "Deals of the Day | Bazaario",
    description:
      "Today's best deals from local stores near you. Limited-time discounts — only on Bazaario.",
    url: "https://bazaario.com/deals",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deals of the Day – Bazaario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deals of the Day | Bazaario",
    description:
      "Flash deals from local stores. Grab them before time runs out!",
  },
  alternates: {
    canonical: "https://bazaario.com/deals",
  },
};

export default function DealsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
