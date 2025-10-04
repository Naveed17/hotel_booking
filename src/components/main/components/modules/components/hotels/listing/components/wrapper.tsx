'use client'
import renderStars from '@src/utils/renderStars';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, Grid, Heart, List, SlidersHorizontal, MapIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useHotelFilters } from '@src/context/hotelFilterContext';
import { HotelCardLoading } from '@components/core/components';
import { formatPrice } from '@src/utils/formatNumber';
import { Drawer } from '@components/core/components';
import { HotelsMap } from '@components/hotelMap';
import ImageBlur from '@src/utils/blurImage';
import { useUser } from '@hooks/use-user';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Select from '@components/core/select';
const Wrapper = (): React.JSX.Element => {
    const { user } = useUser();
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [selectedSort, setSelectedSort] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [openMap, setOpenMap] = useState(false)
    const { data: hotels, total, isLoading, setSort, resetFilters, showFilters, setShowFilters } = useHotelFilters();
    const handleSort = (value: string) => {
        setSelectedSort(value);
        setSort(value);
    }
    return (
        <>
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
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
                            <Select
                                value={{ value: selectedSort, label: selectedSort === 'popularity' ? 'Popularity' : selectedSort === 'low_to_high' ? 'Price Low to High' : selectedSort === 'high_to_low' ? 'Price High to Low' : 'Rating' }}
                                onChange={(option) => handleSort((option as any)?.value || 'popularity')}
                                options={[
                                    { value: 'popularity', label: 'Popularity' },
                                    { value: 'low_to_high', label: 'Price Low to High' },
                                    { value: 'high_to_low', label: 'Price High to Low' },
                                    { value: 'rating', label: 'Rating' }
                                ]}
                                className="min-w-[180px]"
                            />
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
                            <button
                                onClick={() => setOpenMap(!openMap)}
                                className={`p-2 hover:bg-gray-50 transition-colors ${openMap ? 'bg-white' : 'bg-gray-50 border-l border-gray-300'}`}
                            >
                                <MapIcon className="h-3 w-3 lg:h-4 lg:w-4 text-text-secondary" />
                            </button>
                            <Drawer
                                isOpen={openMap}
                                onClose={() => setOpenMap(false)}
                                placement="right"
                                width={600}
                                title="Hotels Map"
                            >
                                <HotelsMap />
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
                                    className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                                        }`}
                                >
                                    {/* Image Section */}
                                    <motion.div
                                        className={`relative overflow-hidden ${viewMode === "list"
                                            ? "sm:w-80 flex-shrink-0 h-48 sm:h-full rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                                            : "h-60 sm:h-72 lg:h-80 rounded-t-2xl"
                                            }`}
                                    >
                                        <ImageBlur
                                            src={hotel.img}
                                            alt={hotel.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {/* Animated Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                                Available
                                            </div>
                                        </div>
                                        {/* Heart Button */}
                                        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                                            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                                        </button>
                                    </motion.div>

                                    {/* Content Section */}
                                    <motion.div
                                        className={`p-6 ${viewMode === "list"
                                            ? "flex-1 flex flex-col justify-between"
                                            : ""
                                            }`}
                                    >
                                        <div className="space-y-4">
                                            <div className={`${viewMode === "list" ? "flex items-start justify-between" : "space-y-2"}`}>
                                                <div className={viewMode === "list" ? "flex-1 pr-4" : ""}>
                                                    <h3 className="text-xl font-bold leading-tight">
                                                        {hotel.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <span className="text-gray-600 text-sm">
                                                            {hotel.location}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={`flex items-center gap-1 ${viewMode === "list" ? "" : "mt-2"}`}>
                                                    {renderStars(parseFloat(hotel.stars), 4)}
                                                    <span className="text-sm text-gray-500 ml-1">({hotel.stars})</span>
                                                </div>
                                            </div>

                                            {user && user.user_type === "Admin" && (
                                                <div className="inline-flex items-center gap-2 bg-gray-50 rounded-full px-3 py-1.5 text-sm font-medium border border-gray-200">
                                                    <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 text-xs font-bold">{hotel.supplier_name?.charAt(0) || 'S'}</span>
                                                    </div>
                                                    <span className="text-gray-700">{hotel.supplier_name}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className={`${viewMode === "list" ? "mt-4" : "mt-6"} space-y-4`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-bold text-gray-900">
                                                        {formatPrice(
                                                            hotel.actual_price,
                                                            hotel.currency
                                                        )}
                                                    </span>
                                                    <span className="text-gray-500 text-sm">/night</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                                    <span className="text-emerald-600 text-sm font-medium">Available</span>
                                                </div>
                                            </div>

                                            <Link href={`/${lang}/hotels/${hotel.hotel_id}`} className="block">
                                                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                                    View Details
                                                </button>
                                            </Link>
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