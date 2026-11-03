import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Rent Products Near You",
  description:
    "Rent electronics, furniture, cameras, party equipment and more from local stores near you on Bazaario.",
  openGraph: {
    title: "Rent Products Near You | Bazaario",
    description:
      "Affordable product rentals from local stores — electronics, furniture, cameras, and more.",
    url: "https://bazaario.com/rental",
  },
};

export default function RentalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
