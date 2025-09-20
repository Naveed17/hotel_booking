'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, Grid, Heart, List, SlidersHorizontal, Star, Clock, Users } from 'lucide-react'
import { formatPrice } from '@src/utils/formatNumber';
import ImageBlur from '@src/utils/blurImage';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Select from '@components/core/select';

// Mock tour data
const mockTours = [
    {
        id: "1",
        name: "Paris City Walking Tour",
        location: "Paris, France",
        image: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
        price: "89",
        currency: "USD",
        rating: "4.8",
        reviews: 324,
        duration: "3 hours",
        groupSize: "12 people max",
        highlights: ["Eiffel Tower", "Louvre Museum", "Notre Dame"],
        category: "Cultural"
    },
    {
        id: "2",
        name: "Rome Ancient History Tour",
        location: "Rome, Italy",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800",
        price: "125",
        currency: "USD",
        rating: "4.9",
        reviews: 567,
        duration: "4 hours",
        groupSize: "8 people max",
        highlights: ["Colosseum", "Roman Forum", "Palatine Hill"],
        category: "Historical"
    },
    {
        id: "3",
        name: "Tokyo Food Adventure",
        location: "Tokyo, Japan",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        price: "95",
        currency: "USD",
        rating: "4.7",
        reviews: 289,
        duration: "5 hours",
        groupSize: "10 people max",
        highlights: ["Tsukiji Market", "Ramen Tasting", "Sake Experience"],
        category: "Culinary"
    }
];

const ToursWrapper = (): React.JSX.Element => {
    const params = useParams();
    const lang = params?.lang as string || 'en';
    const [selectedSort, setSelectedSort] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isLoading] = useState(false);
    const tours = mockTours;
    const total = tours.length;

    const handleSort = (value: string) => {
        setSelectedSort(value);
    }

    return (
        <>
            <div className="hidden mb-4">
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg font-medium text-text-primary hover:bg-gray-50 transition-colors w-full sm:w-auto">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters & Search
                </button>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl border border-gray-200 p-3 lg:p-4 mb-4 lg:mb-6">
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center justify-between gap-3 lg:gap-4">
                    <div className="flex items-center gap-3 lg:gap-4">
                        <span className="text-text-muted font-medium text-sm lg:text-base">{total} tours found</span>
                        <button className="p-1.5 lg:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                            <BarChart3 className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-600" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 lg:gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 font-medium text-sm lg:text-base">Sort :</span>
                            <Select
                                value={{ value: selectedSort, label: selectedSort === 'popularity' ? 'Popularity' : selectedSort === 'low_to_high' ? 'Price Low to High' : selectedSort === 'high_to_low' ? 'Price High to Low' : selectedSort === 'rating' ? 'Rating' : 'Duration' }}
                                onChange={(option) => handleSort((option as any)?.value || 'popularity')}
                                options={[
                                    { value: 'popularity', label: 'Popularity' },
                                    { value: 'low_to_high', label: 'Price Low to High' },
                                    { value: 'high_to_low', label: 'Price High to Low' },
                                    { value: 'rating', label: 'Rating' },
                                    { value: 'duration', label: 'Duration' }
                                ]}
                                className="min-w-[180px]"
                            />
                        </div>
                        <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'grid' ? 'bg-white border-r border-gray-300' : 'bg-gray-50'}`}
                            >
                                <Grid className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-600" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 hover:bg-gray-50 transition-colors ${viewMode === 'list' ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <List className="h-3 w-3 lg:h-4 lg:w-4 text-text-secondary" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`grid gap-4 lg:gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1"}`}>
                <AnimatePresence mode='popLayout'>
                    {isLoading ? (
                        Array.from({ length: viewMode === "grid" ? 6 : 3 }).map((_, i) => (
                            <motion.div
                                key={`skeleton-${i}`}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 animate-pulse"
                            >
                                <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </motion.div>
                        ))
                    ) : tours && tours?.length > 0 ? (
                        tours?.map((tour) => (
                            <motion.div
                                key={`${tour.id}-${viewMode}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""}`}
                            >
                                {/* Image Section */}
                                <motion.div
                                    className={`relative overflow-hidden ${viewMode === "list"
                                        ? "sm:w-80 flex-shrink-0 h-48 sm:h-full rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                                        : "h-60 sm:h-72 lg:h-80 rounded-t-2xl"
                                        }`}
                                >
                                    <ImageBlur
                                        src={tour.image}
                                        alt={tour.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Animated Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                            {tour.category}
                                        </div>
                                    </div>
                                    {/* Heart Button */}
                                    <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                                    </button>
                                </motion.div>

                                {/* Content Section */}
                                <motion.div
                                    className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}
                                >
                                    <div className="space-y-4">
                                        <div className={`${viewMode === "list" ? "flex items-start justify-between" : "space-y-2"}`}>
                                            <div className={viewMode === "list" ? "flex-1 pr-4" : ""}>
                                                <h3 className="bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent text-xl font-bold leading-tight">
                                                    {tour.name}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-gray-600 text-sm">{tour.location}</span>
                                                </div>
                                            </div>

                                            <div className={`flex items-center gap-1 ${viewMode === "list" ? "" : "mt-2"}`}>
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-semibold text-gray-900">{tour.rating}</span>
                                                <span className="text-xs text-gray-500 ml-1">({tour.reviews} reviews)</span>
                                            </div>
                                        </div>

                                        {/* Tour Details */}
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                <span>{tour.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                <span>{tour.groupSize}</span>
                                            </div>
                                        </div>

                                        {/* Highlights */}
                                        <div className="flex flex-wrap gap-2">
                                            {tour.highlights.slice(0, 3).map((highlight, index) => (
                                                <span key={index} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs font-medium">
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={`${viewMode === "list" ? "mt-4" : "mt-6"} space-y-4`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-2xl font-bold text-gray-900">
                                                    {formatPrice((tour as any)?.price, tour?.currency)}
                                                </span>
                                                <span className="text-gray-500 text-sm">/person</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                                <span className="text-emerald-600 text-sm font-medium">Available</span>
                                            </div>
                                        </div>

                                        <Link href={`/${lang}/tours/${tour.id}`} className="block">
                                            <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                                Book Tour
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-12 gap-6">
                            <div className="w-full max-w-xs mx-auto">
                                <div className="text-center">
                                    <p className="text-gray-600 text-lg font-semibold">No tours found</p>
                                    <p className="text-gray-400 mt-2">Try adjusting your filters or search criteria.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

export default ToursWrapper