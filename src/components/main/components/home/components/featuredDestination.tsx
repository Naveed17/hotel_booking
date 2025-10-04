'use client'
import React from 'react'
import { useAppSelector } from '@lib/redux/store';
import { FeaturedCard } from '@components/core/components';
import Container from '@components/core/container';


function FeaturedDestination() {
    const { data } = useAppSelector((state) => state?.appData);
    const featured_tours = data?.featured_tours || [];
    return (
        <section id="destinations" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
            <Container>
                {/* Enhanced Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        EXPLORE THE WORLD
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 font-urbanist">
                        Featured Destinations
                    </h2>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                        Embark on extraordinary journeys to the world's most captivating destinations. From ancient wonders to modern marvels, discover places that will leave you breathless.
                    </p>
                </div>

                {/* Enhanced Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {featured_tours.map((destination: any, index: number) => (
                        <div
                            key={destination.id}
                            className="transform transition-all duration-500"
                            style={{
                                animationDelay: `${index * 150}ms`
                            }}
                        >
                            <FeaturedCard destination={destination} />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready for your next adventure?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Browse our complete collection of 500+ destinations across 80+ countries
                        </p>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            View All Destinations
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default FeaturedDestination