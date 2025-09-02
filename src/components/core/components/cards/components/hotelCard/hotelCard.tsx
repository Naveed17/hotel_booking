import React from 'react';
import {
    Heart,
    Star,
    Waves,
    Car,
    Utensils,
    Dumbbell
} from "lucide-react";

function HotelCard({ ...props }: any): React.JSX.Element {
    const { hotel } = props;

    return (
        <article key={hotel.id} className="group">
            <div className="overflow-hidden rounded-6xl p-3 bg-travel-gray-soft border-none shadow-sm transition-all duration-300 hover:shadow-lg">
                {/* Hotel Image */}
                <div className="relative">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-64 object-cover rounded-t-6xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Always visible content */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-travel-gray-900 mb-1 font-urbanist">
                            {hotel.name}
                        </h3>
                        <p className="text-travel-gray-600">{hotel.location}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <Star className="w-4 h-4 fill-travel-orange text-travel-orange" />
                        <span className="ml-1 text-sm text-travel-gray-600">({hotel.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-black text-travel-gray-900 font-urbanist">
                            ${hotel.currentPrice}
                        </span>
                        <span className="text-travel-gray-400 line-through">
                            ${hotel.originalPrice}
                        </span>
                        <span className="text-travel-gray-600">/night</span>
                    </div>

                    {/* Rooms Left */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-travel-green rounded-full"></div>
                        <span className="text-sm text-travel-green font-medium">
                            {hotel.roomsLeft} rooms left
                        </span>
                    </div>

                    {/* ✅ Amenities - Hidden by default, expand on hover */}
                    <div
                        className="
                            grid grid-cols-2 gap-3 overflow-hidden 
                            max-h-0 group-hover:max-h-48 
                            transition-all duration-500 ease-in-out
                        "
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Waves className="w-4 h-4 text-yellow-600" />
                            </div>
                            <span className="text-sm text-travel-gray-600">Private Beach</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Car className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm text-travel-gray-600">Valet Parking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <Utensils className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="text-sm text-travel-gray-600">5 Restaurants</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <Dumbbell className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm text-travel-gray-600">Fitness Center</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full py-3 font-semibold transition-colors">
                            Book now
                        </button>
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default HotelCard;
