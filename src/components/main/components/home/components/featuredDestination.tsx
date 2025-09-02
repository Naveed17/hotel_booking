'use client'
import React from 'react'

import { FeaturedCard, HotelCard } from '@components/core/components';
const destinationCards = [
    {
        id: 1,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/cd88d2feb15faf6fa53e1eb74ecb573514c9e51e?width=810",
        name: "Santorini, Greece"
    },
    {
        id: 2,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/b3f402bf9c1a0d8a6d8900c1a730a57c8be64a8b?width=810",
        name: "Kyoto, Japan"
    },
    {
        id: 3,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/538fdefebef543b08165a483e867e06bac746cb7?width=810",
        name: "Cape Town, South Africa"
    },
    {
        id: 4,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/15e28be660fb38fb700daf33fb5ed441ac217a51?width=810",
        name: "Paris, France"
    },
    {
        id: 5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/b02c84945675dbed381754ab7ced66c289693aa5?width=810",
        name: "Bali, Indonesia"
    },
    {
        id: 6,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/e1d4dc07452a89bf536b5bd31aa7abdb583977ab?width=810",
        name: "Banff, Canada"
    }
];
function FeaturedDestination() {
    return (
        <section id="destinations" className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-travel-gray-900 mb-4 font-urbanist">
                        Featured Destination
                    </h2>
                    <p className="text-travel-gray-600 text-lg max-w-2xl mx-auto">
                        Uncover the most stunning and sought-after travel spots, curated for unforgettable experiences around the globe.
                    </p>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {destinationCards.map((destination) => (
                        <React.Fragment key={destination.id}>
                            <FeaturedCard destination={destination} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedDestination