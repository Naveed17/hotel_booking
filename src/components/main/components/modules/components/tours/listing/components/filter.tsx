'use client'
import React, { useState, useEffect } from 'react'
import { ChevronDown, Filter, X, Star, Clock, Users, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterProps {
    onFilterChange?: (filters: any) => void;
}

const ToursFilter = ({ onFilterChange }: FilterProps): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 500],
        rating: '',
        duration: '',
        category: '',
        groupSize: ''
    });

    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const categories = [
        'Cultural', 'Historical', 'Adventure', 'Culinary', 'Nature', 'Art & Museums', 'Religious', 'Photography'
    ];

    const durations = [
        '1-3 hours', '4-6 hours', 'Half day', 'Full day', 'Multi-day'
    ];

    const groupSizes = [
        'Small (1-8)', 'Medium (9-15)', 'Large (16+)', 'Private'
    ];

    const handleFilterChange = (key: string, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            priceRange: [0, 500],
            rating: '',
            duration: '',
            category: '',
            groupSize: ''
        };
        setFilters(clearedFilters);
        onFilterChange?.(clearedFilters);
    };

    return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-semibold"
                >
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {/* Filter Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        FILTERS
                    </div>
                </div>
                <button
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
                >
                    <X className="w-4 h-4" />
                    Clear All
                </button>
            </div>

            <AnimatePresence>
                {(isOpen || isDesktop) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6"
                    >
                        {/* Price Range */}
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Price Range (per person)
                            </label>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange[0]}
                                        onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <span className="text-gray-400">to</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange[1]}
                                        onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 500])}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-500" />
                                Minimum Rating
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {['4.5+', '4.0+', '3.5+', '3.0+'].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => handleFilterChange('rating', rating === filters.rating ? '' : rating)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            filters.rating === rating
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <Clock className="w-4 h-4 text-blue-500" />
                                Duration
                            </label>
                            <div className="space-y-2">
                                {durations.map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => handleFilterChange('duration', duration === filters.duration ? '' : duration)}
                                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                                            filters.duration === duration
                                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {duration}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" />
                                Category
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleFilterChange('category', category === filters.category ? '' : category)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            filters.category === category
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Group Size */}
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <Users className="w-4 h-4 text-orange-500" />
                                Group Size
                            </label>
                            <div className="space-y-2">
                                {groupSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => handleFilterChange('groupSize', size === filters.groupSize ? '' : size)}
                                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                                            filters.groupSize === size
                                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ToursFilter