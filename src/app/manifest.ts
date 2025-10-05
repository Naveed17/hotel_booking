import type { MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const base_url = process.env.NEXT_PUBLIC_SITE_URL;

  return {
    name: "TravelNext - Next Generation Travel Booking",
    short_name: "TravelNext",
    description: "Book hotels, flights, and tours with TravelNext - Your next adventure starts here",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: `${base_url}/images/logo.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${base_url}/images/logo.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
