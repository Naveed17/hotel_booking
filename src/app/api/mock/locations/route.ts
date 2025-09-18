import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || '';

  await new Promise(resolve => setTimeout(resolve, 150));

  const mockLocations = [
    {
      id: "1",
      city: "Dubai",
      country: "United Arab Emirates",
      country_code: "AE",
      latitude: "25.276987",
      longitude: "55.296249",
      status: "active",
    },
    {
      id: "2",
      city: "Istanbul",
      country: "Turkey",
      country_code: "TR",
      latitude: "41.008238",
      longitude: "28.978359",
      status: "active",
    },
    {
      id: "3",
      city: "London",
      country: "United Kingdom",
      country_code: "GB",
      latitude: "51.507351",
      longitude: "-0.127758",
      status: "active",
    },
    {
      id: "4",
      city: "New York",
      country: "United States",
      country_code: "US",
      latitude: "40.712776",
      longitude: "-74.005974",
      status: "active",
    },
    {
      id: "5",
      city: "Paris",
      country: "France",
      country_code: "FR",
      latitude: "48.856613",
      longitude: "2.352222",
      status: "active",
    },
    {
      id: "6",
      city: "Tokyo",
      country: "Japan",
      country_code: "JP",
      latitude: "35.676098",
      longitude: "139.650311",
      status: "active",
    }
  ];

  const filteredLocations = city 
    ? mockLocations.filter(loc => 
        loc.city.toLowerCase().includes(city.toLowerCase())
      )
    : mockLocations;

  return NextResponse.json({
    status: true,
    data: filteredLocations
  });
}