'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    CheckCircle,
    Plane,
    Calendar,
    Users,
    MapPin,
    Clock,
    Download,
    Mail,
    Phone
} from 'lucide-react'
import { useRouter } from 'next/navigation';

// Mock booking data
const mockBooking = {
    id: "FB-2024-001",
    flight: {
        airline: "Emirates",
        flightNumber: "EK205",
        aircraft: "Boeing 777-300ER",
        departure: {
            airport: "JFK",
            city: "New York",
            time: "14:30",
            date: "March 15, 2024",
            terminal: "Terminal 4"
        },
        arrival: {
            airport: "DXB",
            city: "Dubai",
            time: "06:45+1",
            date: "March 16, 2024",
            terminal: "Terminal 3"
        },
        duration: "12h 15m",
        class: "Economy"
    },
    passengers: 2,
    totalPrice: 2687,
    currency: "USD",
    customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567"
    },
    status: "Confirmed"
};

const FlightBookingComplete = (): React.JSX.Element => {
    const [isDownloading, setIsDownloading] = useState(false);
    const router = useRouter()
    const handleDownloadTicket = async () => {
        setIsDownloading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsDownloading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-sky-100 rounded-full">
                                <CheckCircle className="w-10 h-10 text-sky-600" />
                            </div>
                            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold">
                                <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                                BOOKING CONFIRMED
                            </div>
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-sky-600 bg-clip-text text-transparent">
                            Flight Booked Successfully!
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Your flight has been confirmed. E-tickets have been sent to your email address.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Flight Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Flight Details</h2>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center">
                                        <Plane className="w-8 h-8 text-sky-600" />
                                    </div>
                                    <div>
                                        <div className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                                            {mockBooking.flight.class}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">{mockBooking.flight.airline}</h3>
                                        <p className="text-gray-600">{mockBooking.flight.flightNumber} • {mockBooking.flight.aircraft}</p>
                                    </div>
                                </div>

                                {/* Flight Route */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 mb-1">{mockBooking.flight.departure.time}</p>
                                            <p className="text-lg font-semibold text-gray-700">{mockBooking.flight.departure.airport}</p>
                                            <p className="text-sm text-gray-600">{mockBooking.flight.departure.city}</p>
                                            <p className="text-xs text-gray-500">{mockBooking.flight.departure.date}</p>
                                            <p className="text-xs text-gray-500">{mockBooking.flight.departure.terminal}</p>
                                        </div>

                                        <div className="flex-1 mx-8">
                                            <div className="relative">
                                                <div className="h-px bg-gray-300 w-full"></div>
                                                <Plane className="w-6 h-6 text-sky-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50" />
                                            </div>
                                            <div className="text-center mt-3">
                                                <p className="font-semibold text-gray-900">{mockBooking.flight.duration}</p>
                                                <p className="text-sm text-gray-600">Non-stop</p>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900 mb-1">{mockBooking.flight.arrival.time}</p>
                                            <p className="text-lg font-semibold text-gray-700">{mockBooking.flight.arrival.airport}</p>
                                            <p className="text-sm text-gray-600">{mockBooking.flight.arrival.city}</p>
                                            <p className="text-xs text-gray-500">{mockBooking.flight.arrival.date}</p>
                                            <p className="text-xs text-gray-500">{mockBooking.flight.arrival.terminal}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-sky-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Passengers</p>
                                            <p className="font-semibold text-gray-900">{mockBooking.passengers} {mockBooking.passengers === 1 ? 'Person' : 'People'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-sky-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <p className="font-semibold text-sky-600">{mockBooking.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8"
                            >
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-sky-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-semibold text-gray-900">{mockBooking.customer.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-sky-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phone</p>
                                            <p className="font-semibold text-gray-900">{mockBooking.customer.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Actions Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
                            >
                                <div className="text-center mb-6">
                                    <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                                        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                                        BOOKING #{mockBooking.id}
                                    </div>
                                    <p className="text-3xl font-bold text-gray-900 mb-1">${mockBooking.totalPrice}</p>
                                    <p className="text-gray-600">Total Amount Paid</p>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleDownloadTicket}
                                        disabled={isDownloading}
                                        className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        {isDownloading ? 'Generating...' : 'Download E-Ticket'}
                                    </button>

                                    <button className="w-full border-2 border-sky-600 text-sky-600 py-3 rounded-xl font-semibold hover:bg-sky-50 transition-all duration-300">
                                        Manage Booking
                                    </button>

                                    <button
                                        onClick={() => router.push('/')}
                                        className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Back to Home
                                    </button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 text-center">
                                        Check-in opens 24 hours before departure
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightBookingComplete;