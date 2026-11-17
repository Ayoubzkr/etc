import type { MetadataRoute } from "next";
import { navigation, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...navigation.map((item) => ({
      url: `${site.url}${item.href === "/" ? "" : item.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : item.href === "/competences" || item.href === "/contact" ? 0.9 : 0.7,
    })),
    { url: `${site.url}/credits`, lastModified, changeFrequency: "yearly" as const, priority: 0.1 },
  ];
}
