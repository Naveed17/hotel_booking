'use client'
import React from 'react'
import {

    Heart,

} from "lucide-react";
function FeaturedCard({ ...props }: any): React.JSX.Element {
    const { destination } = props;
    return (
        <article key={destination.id} className="group">
            <div className="overflow-hidden rounded-6xl bg-travel-gray-soft p-3 shadow-sm transition-transform duration-300 group-hover:scale-105">
                {/* Destination Image */}
                <div className="relative bg-travel-gray-light rounded-6xl">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-64 object-cover rounded-t-6xl transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <div className="p-6">
                    {/* Destination Name */}
                    <h3 className="text-xl font-bold text-travel-gray-900 mb-6 font-urbanist">
                        {destination.name}
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