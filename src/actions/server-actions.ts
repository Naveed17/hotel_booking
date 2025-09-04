"use server";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const fetchAppData = async () => {
  try {
    const response = await fetch(`${baseUrl}/app`, {
      method: "POST",
      body: JSON.stringify({
        api_key: "api_key001",
        language: "en",
        currency: "usd",
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
export const newsLetter = async ({
  name = "subscriber",
  email,
}: {
  email: string;
  name?: string;
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("name", name);

  try {
    const response = await fetch(`${baseUrl}/newsletter-subscribe`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
