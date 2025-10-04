'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Calendar,
    Users,
    MapPin,
    Clock,
    Download,
    Share2,
    Star,
    Mail,
    Phone
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock booking data
const mockBooking = {
    id: "TB-2024-001",
    tour: {
        name: "Paris City Walking Tour with Local Guide",
        location: "Paris, France",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400",
        duration: "3 hours",
        category: "Cultural"
    },
    date: "March 15, 2024",
    time: "10:00 AM",
    travelers: 2,
    totalPrice: 178,
    currency: "USD",
    customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567"
    },
    meetingPoint: "Place de la Concorde, near the fountain",
    status: "Confirmed"
};

const TourBookingComplete = (): React.JSX.Element => {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadReceipt = async () => {
        setIsDownloading(true);
        // Simulate PDF generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDownloading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="flex items-center gap-2 justify-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
                                <CheckCircle className="w-10 h-10 text-blue-600" />
                            </div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                BOOKING CONFIRMED
                            </div>
                        </div>
                        <h1 className="text-4xl font-black mb-4">
                            Your Tour is Booked!
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Congratulations! Your booking has been confirmed. We've sent a confirmation email with all the details.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Tour Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Details</h2>

                                <div className="flex flex-col md:flex-row gap-6 mb-6">
                                    <img
                                        src={mockBooking.tour.image}
                                        alt={mockBooking.tour.name}
                                        className="w-24 h-24 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                                            {mockBooking.tour.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{mockBooking.tour.name}</h3>
                                        <div className="flex items-center gap-4 text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{mockBooking.tour.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{mockBooking.tour.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Date & Time</p>
                                                <p className="font-semibold text-gray-900">{mockBooking.date}</p>
                                                <p className="text-sm text-gray-600">{mockBooking.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Travelers</p>
                                                <p className="font-semibold text-gray-900">{mockBooking.travelers} {mockBooking.travelers === 1 ? 'Person' : 'People'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Meeting Point</p>
                                                <p className="font-semibold text-gray-900">{mockBooking.meetingPoint}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                            <div>
                                                <p className="text-sm text-gray-600">Status</p>
                                                <p className="font-semibold text-blue-600">{mockBooking.status}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Customer Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-semibold text-gray-900">{mockBooking.customer.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone</p>
                                            <p className="font-semibold text-gray-900">{mockBooking.customer.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* What's Next */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 font-bold text-sm">1</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Check Your Email</h3>
                                            <p className="text-gray-600">We've sent a confirmation email with your booking details and meeting instructions.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 font-bold text-sm">2</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Arrive 15 Minutes Early</h3>
                                            <p className="text-gray-600">Please arrive at the meeting point 15 minutes before the tour starts.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className="text-blue-600 font-bold text-sm">3</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">Enjoy Your Tour</h3>
                                            <p className="text-gray-600">Have an amazing experience and don't forget to leave a review!</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Booking ID:</span>
                                        <span className="font-semibold text-gray-900">{mockBooking.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tour Date:</span>
                                        <span className="font-semibold text-gray-900">{mockBooking.date}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Travelers:</span>
                                        <span className="font-semibold text-gray-900">{mockBooking.travelers}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-900">Total Paid:</span>
                                        <span className="text-2xl font-black text-blue-600">${mockBooking.totalPrice}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleDownloadReceipt}
                                        disabled={isDownloading}
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        {isDownloading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Download className="w-4 h-4" />
                                                Download Receipt
                                            </>
                                        )}
                                    </button>

                                    <button className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Booking
                                    </button>
                                </div>

                                {/* Support */}
                                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                    <p className="text-sm text-gray-600 mb-2">Need help?</p>
                                    <Link href={`/${lang}/support`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                        Contact Support
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-12"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={`/${lang}`}>
                                <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                                    Back to Home
                                </button>
                            </Link>
                            <Link href={`/${lang}/tours`}>
                                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg">
                                    Book Another Tour
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default TourBookingComplete