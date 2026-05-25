import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const pages = ["", "/menu", "/concept", "/delivery", "/contact"];
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://svolta.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: (page === "" ? "weekly" : "monthly") as
        | "weekly"
        | "monthly",
      priority: page === "" ? 1 : 0.8,
    }))
  );
}
