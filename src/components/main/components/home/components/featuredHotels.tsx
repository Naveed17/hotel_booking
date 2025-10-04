'use client'
import { HotelCard } from '@components/core/components'
import Container from '@components/core/container';
import { useAppSelector } from '@lib/redux/store';
import { useParams } from 'next/navigation';
import React from 'react'

function FeaturedHotels() {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const { data } = useAppSelector((state) => state?.appData);
    const featured_hotels = data?.featured_hotels || [];
    return (

        <section id="hotels" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <Container>
                {/* Enhanced Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        HANDPICKED FOR YOU
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 font-urbanist">
                        Featured Hotels
                    </h2>
                    <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                        Discover extraordinary stays that redefine luxury and comfort. Each property is carefully selected for its unique character and exceptional service.
                    </p>
                </div>

                {/* Enhanced Hotel Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {featured_hotels.map((hotel: any, index: number) => (
                        <div
                            key={hotel.id}
                            className="transform transition-all duration-500"
                            style={{
                                animationDelay: `${index * 150}ms`
                            }}
                        >
                            <HotelCard hotel={hotel} lang={lang} />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Can't find what you're looking for?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Explore our complete collection of over 1,000+ premium hotels worldwide
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            View All Hotels
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FeaturedHotels