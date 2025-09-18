export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const getDestinations = async (city: string) => {
  try {
    const response = await fetch(
      `${siteUrl}/api/mock/locations?city=${encodeURIComponent(city)}`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data?.data || [];
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
