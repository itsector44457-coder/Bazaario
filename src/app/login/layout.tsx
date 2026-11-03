import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to Bazaario as a shopper, seller, or admin. Access your hyperlocal marketplace account.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Login | Bazaario",
    description: "Sign in to your Bazaario account.",
    url: "https://bazaario.com/login",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
