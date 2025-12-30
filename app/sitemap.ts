import { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import keywordsData from "@/data/keywords.json";
import hubsData from "@/data/hubs.json";
import { legacySlugs } from "@/data/legacySlugs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.domain;
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/wedding-fair-schedule`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Region hubs
  hubsData
    .filter((hub) => hub.hubSlug.startsWith("region-"))
    .forEach((hub) => {
      urls.push({
        url: `${baseUrl}/region/${hub.hubSlug.replace("region-", "")}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

  // Topic hubs
  hubsData
    .filter((hub) => hub.hubSlug.startsWith("topic-"))
    .forEach((hub) => {
      urls.push({
        url: `${baseUrl}/topic/${hub.hubSlug.replace("topic-", "")}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });

  // Detail pages (keywords.json)
  keywordsData.forEach((keyword) => {
    urls.push({
      url: `${baseUrl}/${keyword.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Legacy slugs
  legacySlugs.forEach((slug) => {
    urls.push({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  // Trust pages
  ["about", "contact", "terms", "privacy", "disclaimer"].forEach((page) => {
    urls.push({
      url: `${baseUrl}/${page}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  });

  return urls;
}

