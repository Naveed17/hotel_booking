import React from 'react';
import Link from 'next/link';
import {
    Heart,
    MapPin,
    Star,
    Wifi,
    Car,
    Coffee,
    Waves,
    Award,
    Clock
} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';
import { getFeatureIcon } from '@src/utils/featureIcon';
import renderStars from '@src/utils/renderStars';

function HotelCard({ ...props }: any): React.JSX.Element {
    const { hotel, lang = 'en', viewMode = 'grid' } = props;

    // Mock additional data for enhanced card
    const mockData = {
        discount: '15% OFF',
        originalPrice: hotel.price ? (parseFloat(hotel.price) * 1.2).toFixed(0) : '500',
        rating: hotel.rating || '4.5',
        reviewCount: Math.floor(Math.random() * 500) + 100,
        amenities: ['WiFi', 'Pool', 'Parking'],
        badge: Math.random() > 0.5 ? 'Best Seller' : 'Top Rated',
        availability: 'Only 3 rooms left'
    };

    if (viewMode === 'list') {
        return (
            <article className="group relative">
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                    <div className="flex">
                        {/* Hotel Image */}
                        <div className="relative w-80 h-48 flex-shrink-0 overflow-hidden">
                            <ImageBlur
                                src={hotel.image || hotel.img}
                                alt={hotel.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />

                            {/* Badges */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    {mockData.discount}
                                </span>
                            </div>
                            <div className="absolute top-4 right-4">
                                <span className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                    <Award className="w-3 h-3" />
                                    {mockData.badge}
                                </span>
                            </div>

                            <button className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                <Heart className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                            <div className="flex justify-between h-full">
                                <div className="flex-1">
                                    {/* Hotel Name & Location */}
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-black text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                                            {hotel.name}
                                        </h3>
                                        <div className="flex items-center text-gray-600">
                                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                                            <span>{hotel.location}</span>
                                        </div>
                                    </div>

                                    {/* Rating & Reviews */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex items-center gap-1">
                                            {renderStars(parseFloat(hotel.stars || '4'), 4)}
                                            <span className="font-bold text-gray-900">{mockData.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({mockData.reviewCount} reviews)</span>
                                    </div>

                                    {/* Amenities */}
                                    <div className="flex items-center gap-3 mb-4">
                                        {mockData.amenities.slice(0, 4).map((amenity, index) => {
                                            const { icon } = getFeatureIcon(amenity);
                                            return (
                                                <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                                                    <span className="text-blue-600">{icon}</span>
                                                    <span className="text-sm font-medium text-blue-700">{amenity}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Availability */}
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span className="text-sm text-orange-600 font-medium">{mockData.availability}</span>
                                    </div>
                                </div>

                                {/* Price & Action */}
                                <div className="flex flex-col items-end justify-between ml-6">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm text-gray-400 line-through">
                                                ${mockData.originalPrice}
                                            </span>
                                        </div>
                                        <div className="text-3xl font-black text-gray-900 mb-1">
                                            ${hotel.price || hotel.actual_price}
                                        </div>
                                        <span className="text-sm text-gray-600">/night</span>
                                    </div>

                                    <Link href={`/${lang}/hotels/${hotel.hotel_id || hotel.id}`}>
                                        <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                            Book Now
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className="group relative">
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Enhanced Badges */}
                <div className="absolute top-4 left-4 z-10">
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        {mockData.discount}
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        <Award className="w-3 h-3" />
                        {mockData.badge}
                    </div>
                </div>

                {/* Enhanced Hotel Image */}
                <div className="relative h-56 overflow-hidden">
                    <ImageBlur
                        src={hotel.image || hotel.img}
                        alt={hotel.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    <button className="absolute bottom-4 right-4 w-12 h-12 bg-white/95 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                    <div className="mb-4">
                        <h3 className="text-xl font-black text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent line-clamp-1">
                            {hotel.name}
                        </h3>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            <span className="line-clamp-1 font-medium">{hotel.location}</span>
                        </div>
                    </div>

                    {/* Enhanced Rating & Reviews */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                            {renderStars(parseFloat(hotel.stars || '4'), 4)}
                            <span className="font-bold text-gray-900">{mockData.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium">({mockData.reviewCount} reviews)</span>
                    </div>

                    {/* Enhanced Amenities */}
                    <div className="flex items-center gap-2 mb-4">
                        {mockData.amenities.slice(0, 3).map((amenity, index) => {
                            const { icon } = getFeatureIcon(amenity);
                            return (
                                <div key={index} className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <span className="text-blue-600">{icon}</span>
                                </div>
                            );
                        })}
                        {mockData.amenities.length > 3 && (
                            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">+{mockData.amenities.length - 3}</span>
                        )}
                    </div>

                    {/* Enhanced Availability */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                            <Clock className="w-3 h-3" />
                            {mockData.availability}
                        </div>
                    </div>

                    {/* Enhanced Price & Action */}
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-gray-400 line-through">
                                    ${mockData.originalPrice}
                                </span>
                            </div>
                            <div className="text-2xl font-black text-gray-900">
                                ${hotel.price || hotel.actual_price}
                            </div>
                            <span className="text-sm text-gray-600 font-medium">/night</span>
                        </div>

                        <Link href={`/${lang}/hotels/${hotel.hotel_id || hotel.id}`}>
                            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Enhanced Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                    <div className="p-6 text-white w-full">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            WHY CHOOSE THIS HOTEL?
                        </div>
                        <ul className="text-sm space-y-2 mb-4">
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                Free cancellation until 24h before
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                Best price guarantee
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-white rounded-full"></span>
                                Instant confirmation
                            </li>
                        </ul>
                        <Link href={`/${lang}/hotels/${hotel.hotel_id || hotel.id}`}>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                Book Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default HotelCard;
