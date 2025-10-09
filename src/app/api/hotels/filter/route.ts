// app/api/hotels/route.ts
import { hotels_search } from "@src/actions";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type CacheValue = { data: any[]; ts: number };
const CACHE_TTL_MS = 1000 * 60 * 5;
const CACHE_MAX_ENTRIES = 200;
const hotelsCache = new Map<string, CacheValue>();

function cacheGet(key: string): any[] | null {
  const entry = hotelsCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    hotelsCache.delete(key);
    return null;
  }
  // recency bump
  hotelsCache.delete(key);
  hotelsCache.set(key, entry);
  return entry.data;
}
function cacheSet(key: string, data: any[]) {
  if (hotelsCache.size >= CACHE_MAX_ENTRIES) {
    const firstKey = hotelsCache.keys().next().value;
    if (firstKey) hotelsCache.delete(firstKey);
  }
  hotelsCache.set(key, { data, ts: Date.now() });
}

function toNumber(v: any): number {
  if (v == null) return NaN;
  const n =
    typeof v === "number" ? v : parseFloat(String(v).replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { slug, filter } = body as { slug?: string | string[]; filter?: any };
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const slugKey = Array.isArray(slug) ? slug.join("/") : String(slug);

    // Fetch / cache
    let hotels = cacheGet(slugKey);
    if (!hotels) {
      const fetched = await hotels_search(slug as string[]);
      if (!fetched || (fetched as any).error) {
        return NextResponse.json(
          { error: (fetched as any)?.error ?? "Hotels fetch error" },
          { status: 500 }
        );
      }
      const payload = Array.isArray(fetched.response)
        ? fetched.response
        : Array.isArray(fetched)
        ? fetched
        : [];
      if (!Array.isArray(payload)) {
        return NextResponse.json(
          { error: "Invalid hotels data" },
          { status: 500 }
        );
      }
      hotels = payload;
      cacheSet(slugKey, hotels);
    }

    if (!Array.isArray(hotels)) {
      return NextResponse.json({ error: "Got Error" }, { status: 500 });
    }

    let filteredHotels = [...hotels];

    // ==== Apply filters ====
    if (
      filter &&
      typeof filter === "object" &&
      Object.keys(filter).length > 0
    ) {
      filteredHotels = filteredHotels.filter((h: any) => {
        const price = toNumber(h?.actual_price);
        const stars = toNumber(h?.stars);
        const rating = toNumber(h?.rating);

        // search
        if (filter.search) {
          const q = String(filter.search).toLowerCase();
          if (
            !String(h?.name ?? "")
              .toLowerCase()
              .includes(q) &&
            !String(h?.location ?? "")
              .toLowerCase()
              .includes(q) &&
            !String(h?.address ?? "")
              .toLowerCase()
              .includes(q)
          ) {
            return false;
          }
        }

        // price range
        if (filter.price) {
          const min = Number(filter.price.min);
          const max = Number(filter.price.max);
          if (Number.isFinite(price) && (price < min || price > max)) {
            return false;
          }
        }

        // stars
        if (Array.isArray(filter.stars) && filter.stars.length > 0) {
          if (!filter.stars.includes(stars)) return false;
        }

        // rating (minimum)
        if (
          typeof filter.guestRating === "number" &&
          !Number.isNaN(filter.guestRating)
        ) {
          if (rating < filter.guestRating) return false;
        }
        // Amenities
        if (Array.isArray(filter.amenities) && filter.amenities.length > 0) {
          if (
            !Array.isArray(h.amenities) ||
            !h.amenities.some((a: any) => filter.amenities.includes(a))
          ) {
            return false;
          }
        }
        // Hotels Suppliers
        if (Array.isArray(filter.suppliers) && filter.suppliers.length > 0) {
          if (h.supplier_name) {
            if (!filter.suppliers.includes(h.supplier_name)) return false;
          }
        }
        // quick filter
        if (filter.quickFilter) {
          const q = String(filter.quickFilter).toLowerCase();
          if (q === "high rated") {
            // give me 4 or 5 star hotels
            if (stars < 4) return false;
          } else if (q === "high value") {
            // give above 500 plus price hotels
            if (price < 500) return false;
          } else if (q === "business") {
            const amenities = h.amenities ?? [];
            if (!amenities.includes("Business Services")) return false;
          }
        }

        return true;
      });
    }

    // ==== Apply sort ====
    if (filter.sort) {
      if (filter.sort === "low_to_high") {
        filteredHotels.sort((a: any, b: any) => {
          const priceA = toNumber(a.actual_price);
          const priceB = toNumber(b.actual_price);
          return priceA - priceB;
        });
      } else if (filter.sort === "high_to_low") {
        filteredHotels.sort((a: any, b: any) => {
          const priceA = toNumber(a.actual_price);
          const priceB = toNumber(b.actual_price);
          return priceB - priceA;
        });
      } else if (filter.sort === "rating") {
        filteredHotels.sort((a: any, b: any) => {
          const ratingA = toNumber(a.rating);
          const ratingB = toNumber(b.rating);
          return ratingB - ratingA;
        });
      } else if (filter.sort === "popularity") {
        filteredHotels.sort((a: any, b: any) => {
          const starsA = toNumber(a.stars);
          const starsB = toNumber(b.stars);
          return starsB - starsA;
        });
      }
    }

    return NextResponse.json(
      {
        data: filteredHotels,
        total: filteredHotels.length,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Hotel API Error:", err);
    return NextResponse.json(
      {
        error: "Server Error",
        details:
          process.env.NODE_ENV === "development"
            ? (err as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
