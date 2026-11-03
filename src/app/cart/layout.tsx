import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review items in your Bazaario cart and proceed to checkout.",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
