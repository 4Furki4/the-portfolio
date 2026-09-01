import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/directus/data";

export const dynamic = "force-dynamic";

const baseUrl = "https://furkan-cengiz.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/tr`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tr/hakkimda`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tr/projeler`, changeFrequency: "weekly", priority: 0.9 },
  ];

  for (const slug of slugs) {
    const encodedSlug = encodeURIComponent(slug);
    entries.push(
      {
        url: `${baseUrl}/projects/${encodedSlug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${baseUrl}/tr/projeler/${encodedSlug}`,
        changeFrequency: "monthly",
        priority: 0.7,
      },
    );
  }

  return entries;
}
