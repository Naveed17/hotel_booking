'use client';
import { HotelSearch } from '@components/main/components/modules';
import { ToursMainSearch } from '@components/main/components/modules/components/tours/mainSearch';
import { FlightsMainSearch } from '@components/main/components/modules/components/flights/mainSearch';
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Building2, MapPin, Plane } from 'lucide-react';

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.2, ease: "easeInOut" }
    }
};


const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: any) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: custom * 0.3,
            ease: "easeOut"
        }
    })
};
function Hero() {
    const [activeTab, setActiveTab] = useState<'hotels' | 'tours' | 'flights'>('hotels');

    return (
        <motion.section
            className="relative pb-10 pt-40 min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center"
            variants={sectionVariants as any}
            initial="hidden"
            animate="visible"
        >
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('https://api.builder.io/api/v1/image/assets/TEMP/8dcf4684796d62a910be9c54b0c2c595edef1e5a?width=2880')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-indigo-900/50"></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Enhanced Hero Content */}
                <div className="text-center mb-12">
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20"
                        variants={titleVariants as any}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                    >
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        TRUSTED BY 100K+ TRAVELERS WORLDWIDE
                    </motion.div>

                    {/* Main Title */}
                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black text-center max-w-6xl mx-auto mb-8 leading-tight">
                        <motion.span
                            className="inline-block bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent"
                            variants={titleVariants as any}
                            initial="hidden"
                            animate="visible"
                            custom={1}
                        >
                            Discover the
                        </motion.span>
                        <br />
                        <motion.span
                            className="inline-block bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent"
                            variants={titleVariants as any}
                            initial="hidden"
                            animate="visible"
                            custom={2}
                        >
                            World's Hidden Treasures
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <motion.p
                        className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
                        variants={titleVariants as any}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                    >
                        Embark on extraordinary journeys to breathtaking destinations. From luxury resorts to hidden gems,
                        we curate the perfect escape for every traveler.
                    </motion.p>
                </div>

                {/* Enhanced Search Form with Tabs */}
                <motion.div
                    variants={titleVariants as any}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className="max-w-6xl mx-auto"
                >
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab('hotels')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        activeTab === 'hotels'
                                            ? 'bg-white text-blue-600 shadow-lg'
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Building2 className="w-5 h-5" />
                                    Hotels
                                </button>
                                <button
                                    onClick={() => setActiveTab('tours')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        activeTab === 'tours'
                                            ? 'bg-white text-emerald-600 shadow-lg'
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <MapPin className="w-5 h-5" />
                                    Tours
                                </button>
                                <button
                                    onClick={() => setActiveTab('flights')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                        activeTab === 'flights'
                                            ? 'bg-white text-sky-600 shadow-lg'
                                            : 'text-white hover:bg-white/10'
                                    }`}
                                >
                                    <Plane className="w-5 h-5" />
                                    Flights
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="relative">
                        {activeTab === 'hotels' && <HotelSearch />}
                        {activeTab === 'tours' && <ToursMainSearch />}
                        {activeTab === 'flights' && <FlightsMainSearch />}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    )
}

export default Hero

