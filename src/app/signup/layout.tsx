import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Bazaario account. Join as a shopper or register your local shop to start selling.",
  openGraph: {
    title: "Sign Up | Bazaario",
    description:
      "Create your Bazaario account. Join as a shopper or register your local shop.",
    url: "https://bazaario.com/signup",
  },
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
