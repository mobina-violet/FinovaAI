import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // صفحه‌های خصوصی نباید ایندکس بشن
      disallow: ["/dashboard", "/auth", "/onboarding"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
