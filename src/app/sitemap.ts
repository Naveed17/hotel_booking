import type { MetadataRoute } from "next";

// TravelNext - Next Generation Travel Booking Platform Sitemap

// Utility to escape XML special characters
const escapeXml = (unsafe: string): string =>
  unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;
  const currentDate = new Date().toISOString();

  // Main travel booking pages
  const mainRoutes = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/hotels', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/flights', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/tours', priority: 0.9, changeFreq: 'daily' as const },
    { path: '/auth/sign-in', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/auth/signup', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  // Support and info pages
  const supportRoutes = [
    { path: '/privacy-policy', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/contact-us', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/about-us', priority: 0.6, changeFreq: 'monthly' as const },
    { path: '/terms-of-service', priority: 0.5, changeFreq: 'yearly' as const },
    { path: '/help', priority: 0.6, changeFreq: 'monthly' as const },
  ];

  const allRoutes = [...mainRoutes, ...supportRoutes];

  return allRoutes.map(route => ({
    url: escapeXml(`${baseUrl}${route.path}`),
    lastModified: currentDate,
    changeFrequency: route.changeFreq,
    priority: route.priority,
    alternates: {
      languages: {
        en: escapeXml(`${baseUrl}/en${route.path}`),
        ar: escapeXml(`${baseUrl}/ar${route.path}`),
      },
    },
  }));
}
