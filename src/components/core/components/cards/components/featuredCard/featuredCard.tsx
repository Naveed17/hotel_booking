'use client'
import React from 'react'
import {

    Heart,

} from "lucide-react";
import ImageBlur from '@src/utils/blurImage';
function FeaturedCard({ ...props }: any): React.JSX.Element {
    const { destination } = props;
    return (
        <article key={destination.id} className="group">
            <div className="overflow-hidden rounded-6xl bg-travel-gray-soft p-3 shadow-sm transition-transform duration-300 group-hover:scale-105">
                {/* Destination Image */}
                <div className="relative w-full h-64">
                    <ImageBlur
                        src={destination.img}
                        alt={destination.name}
                        fill
                        priority
                        quality={100}
                        className="object-cover rounded-t-6xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Destination Name */}
                    <h3 className="text-xl font-bold text-travel-gray-900 mb-6 font-urbanist">
                        {destination.city}, {destination.country}
                    </h3>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button className="flex-1 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full py-3 px-6 font-semibold transition-colors">
                            Explore Now
                        </button>
                        <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                            <Heart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FeaturedCard