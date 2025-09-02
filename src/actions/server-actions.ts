"use server";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const dashboardData = async () => {
  const formData = new FormData();
  formData.append("user_id", "20230311051923100");
  try {
    const response = await fetch(`${baseUrl}/agent/dashboard`, {
      cache: "no-store",
      method: "POST",
      body: formData,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    return data.data;
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
