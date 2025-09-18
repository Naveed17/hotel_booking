import { NextResponse } from 'next/server';

export async function POST() {
  await new Promise(resolve => setTimeout(resolve, 100));

  const mockCountries = {
    status: true,
    data: [
      { id: 1, name: "United States", code: "US", currency: "USD" },
      { id: 2, name: "United Arab Emirates", code: "AE", currency: "AED" },
      { id: 3, name: "United Kingdom", code: "GB", currency: "GBP" },
      { id: 4, name: "Canada", code: "CA", currency: "CAD" },
      { id: 5, name: "Australia", code: "AU", currency: "AUD" },
      { id: 6, name: "Germany", code: "DE", currency: "EUR" },
      { id: 7, name: "France", code: "FR", currency: "EUR" },
      { id: 8, name: "Japan", code: "JP", currency: "JPY" }
    ]
  };

  return NextResponse.json(mockCountries);
}