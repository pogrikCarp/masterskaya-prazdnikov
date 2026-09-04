import type { MetadataRoute } from "next";
import { getSiteUrl } from "./site/content/seo";

const PUBLIC_PATHS = [
  "/",
  "/animators",
  "/shows",
  "/quests",
  "/workshops",
  "/services",
  "/gallery",
  "/privacy",
  "/personal-data-policy",
  "/personal-data-consent",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return PUBLIC_PATHS.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
