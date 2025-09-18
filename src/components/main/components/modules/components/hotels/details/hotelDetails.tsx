'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { getFeatureIcon } from '@src/utils/featureIcon';
import { MapPin, Heart, Share2, Wifi, Car, Coffee, Dumbbell, Waves, Utensils } from 'lucide-react';
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
    <div className="min-h-screen bg-bg-page">
      <Container className="py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <span>Hotels</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">{hotel.name}</span>
        </nav>

        {/* Hotel Image */}
        <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden mb-8">
          <ImageBlur
            src={hotel.img}
            alt={hotel.name}
            fill
            priority
            quality={100}
            className="object-cover"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hotel Info */}
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-urbanist">
                {hotel.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {renderStars(parseFloat(hotel.stars))}
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.location}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{hotel.address}</p>

              <div className="flex items-center gap-2 mb-6">
                <span className="bg-travel-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                  {hotel.rating} Rating
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hotel</h2>
              <p className="text-gray-600 leading-relaxed">
                Experience luxury and comfort at {hotel.name}, located in the heart of {hotel.location}. 
                Our hotel offers world-class amenities and exceptional service to make your stay memorable. 
                Whether you're traveling for business or leisure, we provide the perfect blend of comfort and convenience.
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mockAmenities.map((amenity) => {
                  const { icon, bg } = getFeatureIcon(amenity);
                  return (
                    <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                        {icon}
                      </div>
                      <span className="font-medium text-gray-900">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-black text-gray-900 font-urbanist">
                      ${hotel.actual_price}
                    </span>
                    <span className="text-gray-600">/night</span>
                  </div>
                  <p className="text-sm text-gray-500">Taxes and fees included</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-travel-blue focus:border-transparent">
                      <option>1 Guest</option>
                      <option>2 Guests</option>
                      <option>3 Guests</option>
                      <option>4 Guests</option>
                    </select>
                  </div>
                </div>

                <Link href={`/${lang}/hotels/${hotel.hotel_id}/booking`}>
                  <button className="w-full bg-travel-blue hover:bg-travel-blue-600 text-white font-semibold py-3 rounded-lg transition-colors mb-4">
                    Book Now
                  </button>
                </Link>

                <p className="text-xs text-gray-500 text-center">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}