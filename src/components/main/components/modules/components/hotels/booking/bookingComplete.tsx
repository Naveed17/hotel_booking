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
    <div className="min-h-screen bg-bg-page">
      <Container className="py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your reservation has been successfully confirmed</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Confirmation Details */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Confirmation Number</label>
                    <p className="text-lg font-bold text-travel-blue">{bookingData.confirmationNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Guest Name</label>
                    <p className="text-gray-900 font-medium">{bookingData.guestName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Check-in</label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(bookingData.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Check-out</label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(bookingData.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Guests</label>
                    <p className="text-gray-900 font-medium flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {bookingData.guests} Guests
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Total Amount</label>
                    <p className="text-xl font-bold text-gray-900">${bookingData.totalAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{bookingData.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-900">{bookingData.phone}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Confirmation Email Sent</p>
                      <p className="text-sm text-gray-600">Check your email for booking details and receipt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Hotel Notified</p>
                      <p className="text-sm text-gray-600">The hotel has been informed of your reservation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Check-in Ready</p>
                      <p className="text-sm text-gray-600">Present your confirmation number at check-in</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleDownloadReceipt}
                  disabled={isGeneratingPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-travel-blue text-white rounded-lg font-medium hover:bg-travel-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className={`w-4 h-4 ${isGeneratingPDF ? 'animate-spin' : ''}`} />
                  {isGeneratingPDF ? 'Generating PDF...' : 'Download Receipt'}
                </button>
                <Link href={`/${lang}/hotels`} className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Book Another Hotel
                </Link>
              </div>
            </div>

            {/* Hotel Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Your Hotel</h3>
                  
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