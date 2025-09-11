import React from 'react';
import {
    Heart,
    Star,
    Waves,
    Car,
    Utensils,
    Dumbbell
} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';
import { getFeatureIcon } from '@src/utils/featureIcon';
import renderStars from '@src/utils/renderStars';

function HotelCard({ ...props }: any): React.JSX.Element {
    const { hotel } = props;

    return (
        <article key={hotel.id} className="group">
            <div className="overflow-hidden rounded-6xl p-3 bg-travel-gray-soft border-none shadow-sm transition-all duration-300 hover:shadow-lg">
                {/* Hotel Image */}
                <div className="relative w-full h-100">
                    <ImageBlur
                        src={hotel.img}
                        alt={hotel.name}
                        fill
                        priority
                        quality={100}
                        className="object-cover rounded-6xl transition-transform duration-300 group-hover:scale-105"
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
                        {renderStars(parseFloat(hotel.stars))}

                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-black text-travel-gray-900 font-urbanist">
                            ${hotel.price}
                        </span>
                        {/* <span className="text-travel-gray-400 line-through">
                            ${hotel.originalPrice}
                        </span> */}
                        <span className="text-travel-gray-600">/night</span>
                    </div>



                    {/* ✅ Amenities - Hidden by default, expand on hover */}
                    <div
                        className="
                            grid grid-cols-2 gap-3 overflow-hidden 
                            max-h-0 group-hover:max-h-48 
                            transition-all duration-500 ease-in-out
                        "
                    >
                        {hotel.amenities.map((amenity: string) => {
                            const { icon, bg } = getFeatureIcon(amenity);
                            return (
                                <div key={amenity} className="flex items-center gap-2">
                                    <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center`}>
                                        {icon}
                                    </div>
                                    <span className="text-sm text-travel-gray-600">{amenity}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full py-3 font-semibold transition-colors">
                            Book now
                        </button>

                    </div>
                </div>
            </div>
        </article>
    );
}

export default HotelCard;
