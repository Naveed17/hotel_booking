'use client'
import { HotelCard } from '@components/core/components'
import Container from '@components/core/container';
import { useAppSelector } from '@lib/redux/store';
import React from 'react'

function FeaturedHotels() {
    const { data } = useAppSelector((state) => state?.appData);
    const featured_hotels = data?.featured_hotels || [];
    return (

        <section id="hotels" className="py-20 px-4 bg-gray-50">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-travel-gray-900 mb-4 font-urbanist">
                        Featured Hotels
                    </h2>
                    <p className="text-travel-gray-600 text-lg max-w-lg mx-auto">
                        Experience world-class comfort and unmatched hospitality in the heart of paradise.
                    </p>
                </div>

                {/* Hotel Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured_hotels.map((hotel: any) => (
                        <React.Fragment key={hotel.id}>
                            <HotelCard hotel={hotel} />
                        </React.Fragment>
                    ))}
                </div>
            </Container>
        </section>
    )
}

export default FeaturedHotels