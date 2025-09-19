'use client';
import { useEffect, useState } from 'react';
import Container from '@components/core/container';
import ImageBlur from '@src/utils/blurImage';
import renderStars from '@src/utils/renderStars';
import { CheckCircle, MapPin, Calendar, Users, Download, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { generateReceipt } from '@src/utils/generateReceipt';

interface Hotel {
  hotel_id: string;
  img: string;
  name: string;
  location: string;
  address: string;
  stars: string;
  rating: string;
  actual_price: string;
  currency: string;
}

interface BookingCompleteProps {
  hotelId: string;
  dict: any;
}

export default function BookingComplete({ hotelId, dict }: BookingCompleteProps) {
  const params = useParams();
  const lang = params?.lang as string || 'en';
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock booking data
  const bookingData = {
    confirmationNumber: 'HTL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    checkIn: '2024-03-15',
    checkOut: '2024-03-17',
    guests: 2,
    nights: 2,
    totalAmount: 925.00,
    guestName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  };

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

  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadReceipt = async () => {
    if (!hotel) return;

    setIsGeneratingPDF(true);
    try {
      await generateReceipt({
        confirmationNumber: bookingData.confirmationNumber,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        hotelAddress: hotel.address,
        guestName: bookingData.guestName,
        email: bookingData.email,
        phone: bookingData.phone,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        nights: bookingData.nights,
        roomRate: parseFloat(hotel.actual_price),
        taxes: 25.00,
        totalAmount: bookingData.totalAmount
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-page">
        <Container className="py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20">
      <Container className="py-8">
        {/* Enhanced Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold mb-8">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            BOOKING CONFIRMED SUCCESSFULLY
          </div>
          <div className="w-20 h-20 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-black  mb-4 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Congratulations! Your reservation has been successfully confirmed. Get ready for an amazing experience.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Confirmation Details */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                    Booking Details
                  </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Confirmation Number
                    </label>
                    <p className="text-lg font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">{bookingData.confirmationNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Guest Name
                    </label>
                    <p className="text-gray-900 font-semibold text-lg">{bookingData.guestName}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Check-in Date
                    </label>
                    <p className="text-gray-900 font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      {new Date(bookingData.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Check-out Date
                    </label>
                    <p className="text-gray-900 font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      {new Date(bookingData.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Number of Guests
                    </label>
                    <p className="text-gray-900 font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-500" />
                      {bookingData.guests} Guests
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-500 flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Total Amount Paid
                    </label>
                    <p className="text-2xl font-black text-gray-900 bg-gradient-to-r from-yellow-100 to-orange-100 px-4 py-2 rounded-xl">${bookingData.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></span>
                  <span className="bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
                    Contact Information
                  </span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <Mail className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-900 font-semibold">{bookingData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <Phone className="w-5 h-5 text-indigo-600" />
                    <span className="text-gray-900 font-semibold">{bookingData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></span>
                  <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                    What's Next?
                  </span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                    <CheckCircle className="w-6 h-6 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Confirmation Email Sent</p>
                      <p className="text-sm text-gray-600">Check your email for booking details and receipt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                    <CheckCircle className="w-6 h-6 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Hotel Notified</p>
                      <p className="text-sm text-gray-600">The hotel has been informed of your reservation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
                    <CheckCircle className="w-6 h-6 text-purple-500 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Check-in Ready</p>
                      <p className="text-sm text-gray-600">Present your confirmation number at check-in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  onClick={handleDownloadReceipt}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Download className={`w-5 h-5 ${isGeneratingPDF ? 'animate-spin' : ''}`} />
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download Receipt'}
                </button>
                <Link href={`/${lang}/hotels`} className="flex items-center justify-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-xl border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book Another Hotel
                </Link>
              </div>
            </div>

            {/* Hotel Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-100">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    YOUR HOTEL
                  </div>

                  {/* Hotel Info */}
                  <div className="mb-6">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
                      <ImageBlur
                        src={hotel.img}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{hotel.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{hotel.location}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      {renderStars(parseFloat(hotel.stars), 3)}
                    </div>
                    <p className="text-sm text-gray-600">{hotel.address}</p>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>${hotel.actual_price} × {bookingData.nights} nights</span>
                        <span>${(parseFloat(hotel.actual_price) * bookingData.nights).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>$25.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-base border-t border-gray-200 pt-2">
                        <span>Total Paid</span>
                        <span>${bookingData.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}