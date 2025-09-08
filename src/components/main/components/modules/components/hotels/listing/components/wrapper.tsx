'use client'
import renderStars from '@src/utils/renderStars';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, Grid, Heart, List, SlidersHorizontal, MapIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useHotelFilters } from '@src/context/hotelFilterContext';
import { HotelCardLoading } from '@components/core/components';
import { formatPrice } from '@src/utils/formatNumber';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import { HotelsMap } from '@components/ui/hotelMap';
const Wrapper = (): React.JSX.Element => {
    const [selectedSort, setSelectedSort] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [openMap, setOpenMap] = useState(false)
    const { data: hotels, total, isLoading, setSort, resetFilters } = useHotelFilters();
    const handleSort = (value: string) => {
        setSelectedSort(value);
        setSort(value);
    }

    return (
        <>
            <div className="lg:hidden mb-4">
                <button

                    className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg font-medium text-text-primary hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters & Search
                </button>
            </div>
            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-3 lg:p-4 mb-4 lg:mb-6">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <span className="text-text-muted font-medium text-sm lg:text-base">{total} hotels found</span>
                        <button className="p-1.5 lg:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4 text-brand-blue" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 font-medium text-sm lg:text-base">Sort :</span>
                            <div className="relative">
                                <select
                                    value={selectedSort}
                                    onChange={(e) => handleSort(e.target.value)}
                                    className="appearance-none bg-filter-bg px-3 lg:px-4 py-2 pr-7 lg:pr-8 rounded-lg text-xs lg:text-sm text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-blue border-none"
                                >
                                    <option value="popularity">Popularity</option>
                                    <option value="low_to_high">Price Low to High</option>
                                    <option value='high_to_low'>Price High to Low</option>
                                    <option value='rating'>Rating</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-text-secondary pointer-events-none" />
                            </div>
                        </div>
                        <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => { setViewMode('grid'); setOpenMap(false) }}
                                className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'grid' && !openMap ? 'bg-white border-r border-gray-300' : 'bg-gray-50'}`}
                            >
                                <Grid className="h-3 w-3 lg:h-4 lg:w-4 text-brand-blue" />
                            </button>
                            <button
                                onClick={() => { setViewMode('list'); setOpenMap(false) }}
                                className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'list' && !openMap ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <List className="h-3 w-3 lg:h-4 lg:w-4 text-text-secondary" />
                            </button>
                            <Drawer open={openMap} onOpenChange={setOpenMap}>
                                <DrawerTitle />
                                <DrawerTrigger asChild>
                                    <button
                                        onClick={() => setOpenMap(!openMap)}
                                        className={`p-2 hover:bg-gray-50 transition-colors ${openMap ? 'bg-white' : 'bg-gray-50 border-l border-gray-300'}`}
                                    >
                                        <MapIcon className="h-3 w-3 lg:h-4 lg:w-4 text-text-secondary" />
                                    </button>
                                </DrawerTrigger>

                                <DrawerContent
                                    className="fixed inset-y-0 right-0 h-full w-full max-w-[600px] rounded-l-[10px] border bg-background"
                                >
                                    <HotelsMap />
                                </DrawerContent>
                            </Drawer>

                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`grid gap-4 lg:gap-6 ${viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-1"
                    }`}
            >
                <AnimatePresence mode='popLayout'>
                    {
                        isLoading ? (
                            Array.from({ length: viewMode === "grid" ? 6 : 3 }).map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <HotelCardLoading viewMode={viewMode} />
                                </motion.div>
                            ))
                        ) : hotels && hotels?.length > 0 ? (
                            hotels?.map((hotel) => (
                                <motion.div
                                    key={`${hotel.hotel_id}-${viewMode}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={`bg-white rounded-[2.8rem] lg:rounded-[3rem] border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                                        }`}
                                >
                                    {/* Image Section */}
                                    <motion.div
                                        className={`relative overflow-hidden rounded-[2.5rem] lg:rounded-[2.8rem] bg-white ${viewMode === "list"
                                            ? "sm:w-80 flex-shrink-0 h-48 sm:h-full"
                                            : "h-60 sm:h-72 lg:h-80 p-2"
                                            }`}
                                    >
                                        <img
                                            src={hotel.img}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover rounded-[2rem] lg:rounded-[2.3rem]"
                                        />
                                    </motion.div>

                                    {/* Content Section */}
                                    <motion.div
                                        className={`p-5 pt-2 ${viewMode === "list"
                                            ? "flex-1 flex flex-col justify-between"
                                            : ""
                                            }`}
                                    >
                                        <div>
                                            <div
                                                className={`flex ${viewMode === "list"
                                                    ? "flex-row items-center"
                                                    : "flex-col gap-1"
                                                    } justify-between mb-2`}
                                            >
                                                <h3
                                                    className="text-lg lg:text-xl font-bold text-[#0F172B] pr-2 truncate"
                                                    title={hotel.name}
                                                >
                                                    {hotel.name}
                                                </h3>

                                                <span className="text-xs lg:text-sm flex items-center gap-0.5 text-gray-400 whitespace-nowrap">
                                                    {renderStars(parseFloat(hotel.stars), 3.5)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-4">
                                                <span className="text-sm text-text-secondary">
                                                    {hotel.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xl lg:text-2xl font-black text-text-primary">
                                                        {formatPrice(
                                                            hotel.actual_price,
                                                            hotel.currency
                                                        )}
                                                    </span>

                                                    <span className="text-sm text-text-secondary">
                                                        /night
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-success rounded-full"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="w-full bg-travel-blue text-white py-3 rounded-full font-semibold hover:bg-travel-blue/90 transition-colors text-sm lg:text-base">
                                                    Book now
                                                </button>
                                                <button className="p-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-12 gap-6">
                                {/* Illustration */}
                                <div className="w-full max-w-xs mx-auto">
                                    <svg
                                        viewBox="0 0 600 420"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-full h-auto animate-float"
                                        role="img"
                                        aria-labelledby="noHotelsTitle noHotelsDesc"
                                    >
                                        <title id="noHotelsTitle">No hotels illustration</title>
                                        <desc id="noHotelsDesc">
                                            A friendly illustration showing an empty hotel search with luggage and a magnifying glass.
                                        </desc>

                                        <defs>
                                            <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                                                <stop offset="0" stopColor="#E6F0FF" />
                                                <stop offset="1" stopColor="#F7FBFF" />
                                            </linearGradient>
                                            <linearGradient id="g2" x1="0" x2="1">
                                                <stop offset="0" stopColor="#A5DBFF" />
                                                <stop offset="1" stopColor="#4EA8F8" />
                                            </linearGradient>
                                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="#0b1220" floodOpacity="0.08" />
                                            </filter>
                                        </defs>


                                        <rect x="40" y="300" rx="16" width="520" height="90" fill="url(#g1)" />


                                        <g filter="url(#shadow)">
                                            <rect x="120" y="120" rx="12" width="220" height="180" fill="#ffffff" stroke="#E6EEF9" />
                                            <rect x="360" y="150" rx="10" width="120" height="150" fill="#ffffff" stroke="#E6EEF9" />

                                            {Array.from({ length: 3 }).map((_, r) => (
                                                <g key={r}>
                                                    {Array.from({ length: 4 }).map((__, c) => (
                                                        <rect
                                                            key={`${r}-${c}`}
                                                            x={140 + c * 45}
                                                            y={140 + r * 45}
                                                            width="30"
                                                            height="24"
                                                            rx="4"
                                                            fill={c === 1 && r === 1 ? "#ffd28a" : "#EAF4FF"}
                                                        />
                                                    ))}
                                                </g>
                                            ))}
                                            {/* door */}
                                            <rect x="180" y="260" width="60" height="40" rx="6" fill="#F0F7FF" stroke="#DCEEFF" />
                                            <rect x="380" y="220" width="40" height="80" rx="6" fill="#F0F7FF" stroke="#DCEEFF" />
                                            {/* roof sign */}
                                            <rect x="140" y="100" width="160" height="24" rx="6" fill="url(#g2)" />
                                            <text x="220" y="118" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Inter, Arial, sans-serif">
                                                HOTEL
                                            </text>
                                        </g>

                                        {/* Luggage */}
                                        <g transform="translate(80,260)">
                                            <rect x="0" y="-10" rx="8" width="80" height="60" fill="#FFDAB9" stroke="#E8B78B" />
                                            <rect x="12" y="-28" rx="4" width="56" height="20" fill="#fff" opacity="0.06" />
                                            <rect x="22" y="0" width="36" height="8" rx="2" fill="#E8B78B" />
                                        </g>

                                        {/* Magnifier */}
                                        <g transform="translate(430,260) rotate(-18)">
                                            <circle cx="0" cy="0" r="34" fill="#EFF8FF" stroke="#CFE8FF" />
                                            <circle cx="0" cy="0" r="22" fill="#fff" />
                                            <rect x="28" y="28" width="42" height="10" rx="6" transform="rotate(35 28 28)" fill="#cfe8ff" />
                                        </g>

                                        {/* Subtle sparkle */}
                                        <g opacity="0.9" transform="translate(320,60)">
                                            <rect x="-8" y="-18" width="6" height="18" rx="2" fill="#FFF3C4" transform="rotate(25)" />
                                            <rect x="8" y="-26" width="4" height="12" rx="2" fill="#FFE8C2" transform="rotate(-12)" />
                                        </g>
                                    </svg>
                                </div>

                                {/* Message */}
                                <div className="text-center">
                                    <p className="text-gray-600 text-lg font-semibold">No hotels found</p>
                                    <p className="text-gray-400 mt-2">Try adjusting your filters or search criteria.</p>
                                </div>

                                {/* Optional quick actions */}
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => resetFilters && resetFilters()}
                                        className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:bg-gray-50"
                                    >
                                        Reset filters
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                        className="px-4 py-2 bg-travel-blue text-white rounded-full text-sm font-medium shadow hover:bg-brand-600"
                                    >
                                        Refine search
                                    </button>
                                </div>

                                <style jsx>{`
    /* small float animation */
    @keyframes floatY {
      0% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
      100% { transform: translateY(0); }
    }
    .animate-float { animation: floatY 4s ease-in-out infinite; }
  `}</style>
                            </div>

                        )
                    }

                </AnimatePresence>
            </div>

        </>
    )
}
export default Wrapper