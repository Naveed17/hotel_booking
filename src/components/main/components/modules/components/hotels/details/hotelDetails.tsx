'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { getFeatureIcon } from '@src/utils/featureIcon';
import { MapPin, Heart, Share2 } from 'lucide-react';
import { DatePicker } from '@components/DatePicker';
import { GuestSelector } from '@components/GuestSelector';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Hotel {
  hotel_id: string;
  img: string;
  name: string;
  location: string;
  address: string;
  stars: string;
  rating: string;
  latitude: string;
  longitude: string;
  actual_price: string;
  currency: string;
  color: string;
}

interface HotelDetailsProps {
  hotelId: string;
  dict: any;
}

const mockAmenities = ['WiFi', 'Parking', 'Restaurant', 'Gym', 'Pool', 'Room Service'];

export default function HotelDetails({ hotelId, dict }: HotelDetailsProps) {
  const params = useParams();
  const lang = params?.lang as string || 'en';
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch('/api/mock/hotels', { method: 'POST' });
        const data = await response.json();
        const foundHotel = data.response.find((h: Hotel) => h.hotel_id === hotelId);
        setHotel(foundHotel || null);
      } catch (error) {
        console.error('Error fetching hotel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-page">
        <Container className="py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded-xl mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-bg-page flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Hotel Not Found</h1>
          <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
      <Container className="py-8">
        {/* Enhanced Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-full px-4 py-2 shadow-sm border border-gray-100">
            <span className="text-gray-600">Hotels</span>
            <span className="mx-2 text-gray-400">&gt;</span>
            <span className="text-blue-600 font-semibold">{hotel.name}</span>
          </div>
        </nav>

        {/* Enhanced Hotel Image */}
        <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <ImageBlur
            src={hotel.img}
            alt={hotel.name}
            fill
            priority
            quality={100}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button className="w-12 h-12 bg-white/95 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-gray-900">📸 Premium Gallery</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8 mb-8">
              {/* Enhanced Hotel Info */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  LUXURY ACCOMMODATION
                </div>

                <h1 className="text-4xl lg:text-5xl font-black  mb-4 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  {hotel.name}
                </h1>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    {renderStars(parseFloat(hotel.stars))}
                    <span className="text-sm font-medium text-gray-600">({hotel.stars} Stars)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{hotel.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{hotel.address}</p>

                <div className="flex items-center gap-3">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {hotel.rating} Excellent Rating
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Top Choice
                  </span>
                </div>
              </div>
            </div>

            {/* Enhanced Description */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <h2 className="text-3xl font-black  bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">About This Hotel</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location}.
                Our hotel offers world-class amenities and exceptional service to make your stay memorable.
                Whether you're traveling for business or leisure, we provide the perfect blend of comfort and convenience.
              </p>
            </div>

            {/* Enhanced Amenities */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <h2 className="text-3xl font-black  bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">Premium Amenities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAmenities.map((amenity, index) => {
                  const { icon, bg } = getFeatureIcon(amenity, "w-6 h-6");
                  return (
                    <div key={amenity} className="group relative overflow-hidden bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                          <span className="text-4xl">{icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{amenity}</h3>
                          <p className="text-sm text-gray-500 mt-1">Premium service</p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 pt-8 md:pt-8 md:p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    BEST PRICE GUARANTEED
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-black  bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent">
                      ${hotel.actual_price}
                    </span>
                    <span className="text-gray-600 text-lg font-medium">/night</span>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Taxes and fees included</p>
                </div>

                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Check-in Date
                    </label>
                    <DatePicker
                      placeholder="Select check-in date"
                      value=""
                      onChange={() => { }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Check-out Date
                    </label>
                    <DatePicker
                      placeholder="Select check-out date"
                      value=""
                      onChange={() => { }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Number of Guests
                    </label>
                    <GuestSelector
                      value="2 Guests, 1 Room"
                      onChange={() => { }}
                    />
                  </div>
                </div>

                <Link href={`/${lang}/hotels/${hotel.hotel_id}/booking`}>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-6">
                    Book Your Stay Now
                  </button>
                </Link>

                <div className="text-center space-y-2">
                  <p className="text-sm text-green-600 font-medium">
                    Free cancellation until 24h before
                  </p>
                  <p className="text-xs text-gray-500">
                    You won't be charged yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}