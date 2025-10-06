import type { MetadataRoute } from "next";

// Travel destinations
const destinations = [
  "new-york",
  "dubai",
  "paris",
  "london",
  "tokyo",
  "singapore",
  "sydney",
  "rome",
  "barcelona",
  "amsterdam",
  "istanbul",
  "bangkok",
  "hong-kong",
  "los-angeles",
  "miami",
];

// Travel categories/tags
const travelTags = [
  "luxury-hotels",
  "budget-hotels",
  "business-hotels",
  "resort-hotels",
  "domestic-flights",
  "international-flights",
  "business-class",
  "economy-flights",
  "city-tours",
  "adventure-tours",
  "cultural-tours",
  "food-tours",
  "group-tours",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")!;
  const lastModified = new Date().toISOString();

  const travelLandingPages = travelTags
    .map((tag) =>
      destinations.map((destination) => ({
        url: `${baseUrl}/${destination}/${tag}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    )
    .flat() as MetadataRoute.Sitemap;

  // Main static pages
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hotels`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flights`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    ...travelLandingPages,
  ];

  return staticPages;
}
