'use client'
import React from 'react'
import {
    Heart,
    MapPin,
    Star,
    Users,
    Calendar,
    Compass,
    TrendingUp
} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';
import Link from 'next/link';

function FeaturedCard({ ...props }: any): React.JSX.Element {
    const { destination } = props;

    // Mock additional data for enhanced card
    const mockData = {
        rating: (4.2 + Math.random() * 0.8).toFixed(1),
        reviewCount: Math.floor(Math.random() * 800) + 200,
        tourCount: Math.floor(Math.random() * 50) + 15,
        badge: Math.random() > 0.5 ? 'Trending' : 'Popular',
        startingPrice: Math.floor(Math.random() * 300) + 199,
        highlights: ['Cultural Sites', 'Local Cuisine', 'Adventure']
    };

    return (
        <article className="group relative">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {mockData.badge}
                    </span>
                </div>

                {/* Destination Image */}
                <div className="relative h-64 overflow-hidden">
                    <ImageBlur
                        src={destination.image}
                        alt={destination.title || `${destination.city}, ${destination.country}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Heart button */}
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                    </button>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold mb-1">
                            {destination.city}
                        </h3>
                        <div className="flex items-center text-sm opacity-90">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{destination.country}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-semibold text-gray-900">{mockData.rating}</span>
                            </div>
                            <span className="text-xs text-gray-500">({mockData.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Compass className="w-4 h-4" />
                            <span>{mockData.tourCount} tours</span>
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {mockData.highlights.map((highlight, index) => (
                            <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                                {highlight}
                            </span>
                        ))}
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Starting from</span>
                            <div className="flex items-center gap-1">
                                <span className="text-2xl font-black text-gray-900">
                                    ${mockData.startingPrice}
                                </span>
                                <span className="text-sm text-gray-600">/person</span>
                            </div>
                        </div>

                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Explore
                        </button>
                    </div>
                </div>

                {/* Hover overlay with additional info */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-5 text-white w-full">
                        <h4 className="font-bold mb-2">What makes this special?</h4>
                        <ul className="text-sm space-y-1 mb-4">
                            <li>• UNESCO World Heritage sites</li>
                            <li>• Expert local guides included</li>
                            <li>• Small group experiences</li>
                        </ul>
                        <Link href={`/hotels/${destination.id}`}>
                            <button className="w-full cursor-pointer bg-white text-blue-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Explore Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FeaturedCard