'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Star, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock featured flights data
const featuredFlights = [
    {
        id: 1,
        airline: "Emirates",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        route: "New York → Dubai",
        departure: "JFK",
        arrival: "DXB",
        duration: "12h 15m",
        price: 1299,
        originalPrice: 1599,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
        badge: "Popular"
    },
    {
        id: 2,
        airline: "Qatar Airways",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        route: "London → Tokyo",
        departure: "LHR",
        arrival: "NRT",
        duration: "11h 45m",
        price: 899,
        originalPrice: 1199,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
        badge: "Best Deal"
    },
    {
        id: 3,
        airline: "Singapore Airlines",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        route: "Los Angeles → Singapore",
        departure: "LAX",
        arrival: "SIN",
        duration: "17h 30m",
        price: 1599,
        originalPrice: 1899,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
        badge: "Premium"
    }
];

const FeaturedFlights = (): React.JSX.Element => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                            FEATURED FLIGHTS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 font-urbanist">
                            Best Flight Deals
                        </h2>
                        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Discover amazing flight deals to your favorite destinations with top-rated airlines
                        </p>
                    </motion.div>

                    {/* Flight Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredFlights.map((flight, index) => (
                            <motion.div
                                key={flight.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <Link href={`/en/flights`}>
                                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                        {/* Flight Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={flight.image}
                                                alt={flight.route}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                                            {/* Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                                    {flight.badge}
                                                </span>
                                            </div>

                                            {/* Rating */}
                                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-semibold text-gray-900">{flight.rating}</span>
                                            </div>

                                            {/* Route Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="flex items-center justify-between text-white">
                                                    <div className="text-center">
                                                        <p className="text-lg font-bold">{flight.departure}</p>
                                                    </div>
                                                    <div className="flex-1 mx-4">
                                                        <div className="relative">
                                                            <div className="h-px bg-white/50 w-full"></div>
                                                            <Plane className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent" />
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-lg font-bold">{flight.arrival}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Flight Details */}
                                        <div className="p-6">
                                            {/* Airline Info */}
                                            <div className="flex items-center gap-3 mb-4">
                                                <img
                                                    src={flight.logo}
                                                    alt={flight.airline}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                                                    <p className="text-sm text-gray-600">{flight.route}</p>
                                                </div>
                                            </div>

                                            {/* Duration */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-gray-600">{flight.duration}</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl font-bold text-gray-900">${flight.price}</span>
                                                        <span className="text-sm text-gray-500 line-through">${flight.originalPrice}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">per person</p>
                                                </div>
                                                <div className="flex items-center gap-2 text-blue-600 group-hover:gap-3 transition-all duration-300">
                                                    <span className="text-sm font-semibold">Book Now</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* View All Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Link href="/en/flights">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                View All Flights
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedFlights;