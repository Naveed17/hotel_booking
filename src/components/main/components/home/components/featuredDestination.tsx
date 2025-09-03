'use client'
import React from 'react'
import { useAppSelector } from '@lib/redux/store';
import { FeaturedCard } from '@components/core/components';

function FeaturedDestination() {
    const { data } = useAppSelector((state) => state?.appData);
    const featured_tours = data?.featured_tours || [];
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
                    {featured_tours.map((destination: any) => (
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