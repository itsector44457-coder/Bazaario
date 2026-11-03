import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Register Your Shop",
  description:
    "Register your local shop on Bazaario and start selling to thousands of nearby customers. Easy onboarding, fast payouts, zero setup fees.",
  openGraph: {
    title: "Register Your Shop | Bazaario",
    description:
      "Start selling on Bazaario. Register your shop in 4 simple steps.",
    url: "https://bazaario.com/seller-registration",
  },
};

export default function SellerRegistrationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
