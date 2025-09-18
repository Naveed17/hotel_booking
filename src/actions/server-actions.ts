"use server";
import { createSession, getSession, logout } from "@lib/auth/session";
import { siteUrl } from "./actions";

export const fetchAppData = async (payload: {
  language: string;
  currency: string;
}) => {
  try {
    const response = await fetch(`${siteUrl}/api/mock/app`, {
      method: "POST",
      body: JSON.stringify({
        language: payload?.language,
        currency: payload?.currency,
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
    const response = await fetch(`${siteUrl}/api/mock/newsletter`, {
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
export const hotels_search = async (slug: string[]) => {
  const keys = [
    "city",
    "checkin",
    "checkout",
    "rooms",
    "adults",
    "childs",
    "nationality",
    "language",
    "currency",
    "child_age",
    "module_name",
    "pagination",
  ];

  const payload = keys.reduce((acc, key, index) => {
    // Fill from slug if exists
    acc[key] = slug[index] ?? "";

    // Override defaults based on key
    switch (key) {
      case "language":
        acc[key] = slug[index] ?? "en";
        break;
      case "currency":
        acc[key] = slug[index] ?? "usd";
        break;
      case "module_name":
        acc[key] = "hotels";
        break;
      case "pagination":
        acc[key] = "1";
        break;
      case "child_age":
        acc[key] = "0";
        break;
    }

    return acc;
  }, {} as Record<string, string>);

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(`${siteUrl}/api/mock/hotels`, {
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
export const hotels_filter = async ({
  filter,
  slug,
}: {
  filter: any;
  slug: any;
}) => {
  try {
    const response = await fetch(`${siteUrl}/api/hotels/filter`, {
      method: "POST",
      body: JSON.stringify({
        filter,
        slug,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }

    return data;
  } catch (error) {
    console.error("Flight listing error:", error); // Added error logging
    return { error: (error as Error).message || "An error occurred" };
  }
};

//---------------------------- SIGN UP --------------------------------------//
export const sign_up = async (payload: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      // Convert numbers & booleans to string
      formData.append(key, String(value));
    } else if (typeof value === "string") {
      formData.append(key, value);
    }
  });

  try {
    const response = await fetch(`${siteUrl}/api/mock/auth/signup`, {
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

//---------------------------- LOGIN --------------------------------------//
export const signIn = async (payload: { email: string; password: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  try {
    const response = await fetch(`${siteUrl}/api/mock/auth/login`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok || data?.status === false) {
      return { error: data?.message || "Something went wrong" };
    }
    await createSession(data?.data);
    return { success: "Logged in successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};
export const signOut = async () => {
  try {
    await logout();
    return { success: "Logged out successfully" };
  } catch (error) {
    return { error: (error as Error).message || "An error occurred" };
  }
};

export const getUser = async () => {
  const session = await getSession();
  return session?.user;
};
export const fetchCountries = async () => {
  try {
    const response = await fetch(`${siteUrl}/api/mock/countries`, {
      method: "POST",
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
export const forget_password = async (email: string) => {
  const formData = new FormData();
  formData.append("email", email);
  try {
    const response = await fetch(`${siteUrl}/api/mock/auth/forgot`, {
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
