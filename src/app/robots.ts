import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/seller-products/",
          "/seller-orders/",
          "/seller-earnings/",
          "/seller-messages/",
          "/seller-settings/",
          "/seller-verification/",
          "/seller/",
          "/checkout/",
          "/order-success/",
          "/api/",
        ],
      },
    ],
    sitemap: "https://bazaario.com/sitemap.xml",
  };
}
