export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const getDestinations = async (city: string) => {
  try {
    const response = await fetch(
      `${baseUrl}/hotels_locations?city=${encodeURIComponent(city)}`,
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
    console.log(data);

    return data?.data || [];
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
