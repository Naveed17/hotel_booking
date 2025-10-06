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
  // Main travel booking pages
  const mainRoutes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/home", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/hotels", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/flights", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/tours", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/auth/sign-in", priority: 0.7, changeFrequency: "weekly" as const },
    { url: "/auth/signup", priority: 0.7, changeFrequency: "weekly" as const },
  ];

  // Support and info pages
  const supportRoutes = [
    {
      url: "/privacy-policy",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    { url: "/contact-us", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/about-us", priority: 0.6, changeFrequency: "monthly" as const },
    {
      url: "/terms-of-service",
      priority: 0.5,
      changeFrequency: "yearly" as const,
    },
    { url: "/help", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const allRoutes = [...mainRoutes, ...supportRoutes];
  const sitemap = allRoutes
    .map((route): MetadataRoute.Sitemap[number] => ({
      url: `${baseUrl}${route.url}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
    .flat() as MetadataRoute.Sitemap;
  return sitemap;
}
