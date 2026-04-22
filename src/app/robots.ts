import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/chat/", "/prompt-builder/", "/semantic-layer/"],
      },
    ],
    sitemap: "https://getthere268.com/sitemap.xml",
  };
}
