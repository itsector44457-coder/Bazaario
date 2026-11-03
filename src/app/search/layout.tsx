import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Search Products & Local Stores",
  description:
    "Search for groceries, electronics, fashion, medicines and more from local stores near you. Filter by category, price, rating and delivery time.",
  openGraph: {
    title: "Search | Bazaario",
    description:
      "Find products and local stores near you on Bazaario — hyperlocal marketplace.",
    url: "https://bazaario.com/search",
  },
};

export default function SearchLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
