'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
    Star, 
    Clock, 
    Users, 
    MapPin, 
    Calendar,
    Shield,
    Award,
    Heart,
    Share2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react'
import ImageBlur from '@src/utils/blurImage'
import { DatePicker } from '@components/DatePicker'
import { GuestSelector } from '@components/GuestSelector'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Mock tour data
const mockTour = {
    id: "1",
    name: "Paris City Walking Tour with Local Guide",
    location: "Paris, France",
    images: [
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800",
        "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800",
        "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800"
    ],
    price: "89",
    currency: "USD",
    rating: "4.8",
    reviews: 324,
    duration: "3 hours",
    groupSize: "12 people max",
    category: "Cultural",
    description: "Discover the magic of Paris with our expert local guide. Walk through historic neighborhoods, learn fascinating stories, and see iconic landmarks from a unique perspective.",
    highlights: [
        "Visit iconic Eiffel Tower viewpoints",
        "Explore the historic Louvre district", 
        "Walk along the Seine River",
        "Discover hidden local gems",
        "Learn about Parisian history and culture",
        "Small group experience"
    ],
    included: [
        "Professional local guide",
        "Walking tour of major attractions",
        "Historical insights and stories",
        "Photo opportunities",
        "Small group experience"
    ],
    notIncluded: [
        "Food and drinks",
        "Transportation",
        "Entrance fees to monuments",
        "Personal expenses"
    ],
    meetingPoint: "Place de la Concorde, near the fountain",
    languages: ["English", "French", "Spanish"],
    cancellation: "Free cancellation up to 24 hours before"
};

const TourDetails = (): React.JSX.Element => {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [travelers, setTravelers] = useState('2 Travelers');

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % mockTour.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + mockTour.images.length) % mockTour.images.length);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="relative h-96 group">
                                <ImageBlur
                                    src={mockTour.images[currentImageIndex]}
                                    alt={mockTour.name}
                                    fill
                                    className="object-cover"
                                />
                                
                                {/* Navigation Buttons */}
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-700" />
                                </button>

                                {/* Image Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {mockTour.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                        <Heart className="w-5 h-5 text-gray-700" />
                                    </button>
                                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                        <Share2 className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tour Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-8"
                        >
                            {/* Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                                        {mockTour.category}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold">{mockTour.rating}</span>
                                        <span className="text-gray-500">({mockTour.reviews} reviews)</span>
                                    </div>
                                </div>
                                
                                <h1 className="text-3xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                                    {mockTour.name}
                                </h1>
                                
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{mockTour.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-4 h-4" />
                                        <span>{mockTour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{mockTour.groupSize}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Tour</h3>
                                <p className="text-gray-600 leading-relaxed">{mockTour.description}</p>
                            </div>

                            {/* Highlights */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {mockTour.highlights.map((highlight, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <span className="text-gray-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* What's Included */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-emerald-600" />
                                        What's Included
                                    </h3>
                                    <ul className="space-y-2">
                                        {mockTour.included.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Not Included</h3>
                                    <ul className="space-y-2">
                                        {mockTour.notIncluded.map((item, index) => (
                                            <li key={index} className="flex items-center gap-2 text-gray-600">
                                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
                        >
                            {/* Price */}
                            <div className="text-center mb-6">
                                <div className="text-3xl font-black text-gray-900 mb-1">
                                    ${mockTour.price}
                                </div>
                                <span className="text-gray-600">per person</span>
                            </div>

                            {/* Booking Form */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                        Select Date
                                    </label>
                                    <DatePicker
                                        value={selectedDate}
                                        onChange={setSelectedDate}
                                        placeholder="Choose date"
                                    />
                                </div>

                                <div>
                                    <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                        Travelers
                                    </label>
                                    <GuestSelector
                                        value={travelers}
                                        onChange={(value) => {
                                            const guests = value.split(',');
                                            const adults = parseInt(guests[0]);
                                            const children = parseInt(guests[1]);
                                            setTravelers(`${adults + children} ${adults + children === 1 ? 'Traveler' : 'Travelers'}`);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Book Button */}
                            <Link href={`/${lang}/tours/${mockTour.id}/booking`}>
                                <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-4">
                                    Book This Tour
                                </button>
                            </Link>

                            {/* Tour Details */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Meeting Point:</span>
                                    <span className="font-medium text-gray-900">{mockTour.meetingPoint}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Languages:</span>
                                    <span className="font-medium text-gray-900">{mockTour.languages.join(', ')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Cancellation:</span>
                                    <span className="font-medium text-emerald-600">{mockTour.cancellation}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Shield className="w-4 h-4" />
                                        <span>Secure Booking</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Award className="w-4 h-4" />
                                        <span>Best Price</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetails