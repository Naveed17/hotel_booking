'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plane,
    Clock,
    Users,
    Wifi,
    Coffee,
    Monitor,
    Filter,
    ArrowUpDown,
    Star,
    X,
    MapPin,
    Shield,
    Luggage
} from 'lucide-react'
import Select from '@components/core/select'
import { useRouter } from 'next/navigation'

// Mock flight data
const mockFlights = [
    {
        id: 1,
        airline: "Emirates",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        flightNumber: "EK205",
        departure: {
            airport: "JFK",
            city: "New York",
            time: "14:30",
            date: "Mar 15",
            terminal: "Terminal 4"
        },
        arrival: {
            airport: "DXB",
            city: "Dubai",
            time: "06:45+1",
            date: "Mar 16",
            terminal: "Terminal 3"
        },
        duration: "12h 15m",
        stops: 0,
        price: 1299,
        class: "Economy",
        amenities: ["wifi", "entertainment", "meals"],
        rating: 4.8,
        aircraft: "Boeing 777-300ER",
        classes: [
            { name: "Economy", price: 1299, available: true },
            { name: "Premium Economy", price: 1899, available: true },
            { name: "Business", price: 4299, available: true },
            { name: "First", price: 8999, available: false }
        ],
        baggage: {
            carry: "7kg",
            checked: "23kg"
        }
    },
    {
        id: 2,
        airline: "Qatar Airways",
        logo: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100",
        flightNumber: "QR701",
        departure: {
            airport: "JFK",
            city: "New York",
            time: "22:15",
            date: "Mar 15",
            terminal: "Terminal 4"
        },
        arrival: {
            airport: "DOH",
            city: "Doha",
            time: "18:30+1",
            date: "Mar 16",
            terminal: "Terminal 1"
        },
        duration: "11h 15m",
        stops: 0,
        price: 1199,
        class: "Economy",
        amenities: ["wifi", "entertainment", "meals"],
        rating: 4.9,
        aircraft: "Airbus A350-900",
        classes: [
            { name: "Economy", price: 1199, available: true },
            { name: "Premium Economy", price: 1699, available: true },
            { name: "Business", price: 3899, available: true },
            { name: "First", price: 7999, available: true }
        ],
        baggage: {
            carry: "7kg",
            checked: "30kg"
        }
    }
];

const FlightsListing = (): React.JSX.Element => {
    const [sortBy, setSortBy] = useState('price');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<any>(null);
    const [selectedClass, setSelectedClass] = useState('Economy');
    const [activeTab, setActiveTab] = useState('general');
    const [selectedBaggage, setSelectedBaggage] = useState('20kg');
    const router = useRouter()
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                            FLIGHT SEARCH RESULTS
                        </div>
                        <h1 className="text-4xl font-black  mb-4 bg-gradient-to-r from-gray-900 to-sky-600 bg-clip-text text-transparent">
                            Available Flights
                        </h1>
                        <p className="text-gray-600">New York → Dubai • Mar 15, 2024 • 2 passengers</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                                    <Filter className="w-5 h-5 text-sky-600" />
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                                    <div className="space-y-2">
                                        <input
                                            type="range"
                                            min="500"
                                            max="3000"
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>$500</span>
                                            <span>$3000</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Airlines */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Airlines</h3>
                                    <div className="space-y-2">
                                        {['Emirates', 'Qatar Airways', 'Etihad', 'Turkish Airlines'].map((airline) => (
                                            <label key={airline} className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span className="text-sm text-gray-700">{airline}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Stops */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Stops</h3>
                                    <div className="space-y-2">
                                        {['Non-stop', '1 Stop', '2+ Stops'].map((stop) => (
                                            <label key={stop} className="flex items-center gap-2">
                                                <input type="checkbox" className="rounded border-gray-300" />
                                                <span className="text-sm text-gray-700">{stop}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Flight Results */}
                        <div className="lg:col-span-3">
                            {/* Sort Options */}
                            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-4 mb-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-600">{mockFlights.length} flights found</p>
                                    <div className="flex items-center gap-2">
                                        <ArrowUpDown className="w-4 h-4 text-gray-500" />
                                        <Select
                                            value={{ value: sortBy, label: sortBy === 'price' ? 'Price (Low to High)' : sortBy === 'duration' ? 'Duration' : sortBy === 'departure' ? 'Departure Time' : 'Rating' }}
                                            onChange={(option) => setSortBy((option as any)?.value || 'price')}
                                            options={[
                                                { value: 'price', label: 'Price (Low to High)' },
                                                { value: 'duration', label: 'Duration' },
                                                { value: 'departure', label: 'Departure Time' },
                                                { value: 'rating', label: 'Rating' }
                                            ]}
                                            className="min-w-[200px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Flight Cards */}
                            <div className="space-y-4">
                                {mockFlights.map((flight, index) => (
                                    <motion.div
                                        key={flight.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                                            {/* Airline Info */}
                                            <div className="md:col-span-2">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={flight.logo}
                                                        alt={flight.airline}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{flight.airline}</p>
                                                        <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Flight Route */}
                                            <div className="md:col-span-6">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-center">
                                                        <p className="text-2xl font-bold text-gray-900">{flight.departure.time}</p>
                                                        <p className="text-sm text-gray-600">{flight.departure.airport}</p>
                                                        <p className="text-xs text-gray-500">{flight.departure.date}</p>
                                                    </div>

                                                    <div className="flex-1 mx-4">
                                                        <div className="relative">
                                                            <div className="h-px bg-gray-300 w-full"></div>
                                                            <Plane className="w-5 h-5 text-sky-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                                                        </div>
                                                        <div className="text-center mt-2">
                                                            <p className="text-sm text-gray-600">{flight.duration}</p>
                                                            <p className="text-xs text-gray-500">
                                                                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <p className="text-2xl font-bold text-gray-900">{flight.arrival.time}</p>
                                                        <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
                                                        <p className="text-xs text-gray-500">{flight.arrival.date}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price & Book */}
                                            <div className="md:col-span-4 text-center md:text-right">
                                                <div className="flex items-center justify-center md:justify-end gap-1 mb-2">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm text-gray-600">{flight.rating}</span>
                                                </div>
                                                <p className="text-3xl font-bold text-gray-900 mb-1">${flight.price}</p>
                                                <p className="text-sm text-gray-600 mb-4">per person</p>
                                                <button
                                                    onClick={() => setSelectedFlight(flight)}
                                                    className="w-full md:w-auto bg-gradient-to-r from-sky-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>

                                        {/* Amenities */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-4">
                                                {flight.amenities.includes('wifi') && (
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Wifi className="w-4 h-4" />
                                                        <span>WiFi</span>
                                                    </div>
                                                )}
                                                {flight.amenities.includes('entertainment') && (
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Monitor className="w-4 h-4" />
                                                        <span>Entertainment</span>
                                                    </div>
                                                )}
                                                {flight.amenities.includes('meals') && (
                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Coffee className="w-4 h-4" />
                                                        <span>Meals</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flight Details Drawer */}
                <AnimatePresence>
                    {selectedFlight && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/50 z-50"
                                onClick={() => setSelectedFlight(null)}
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white z-50 overflow-y-auto"
                            >
                                <div className="p-6">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900">Flight Details</h2>
                                        <button
                                            onClick={() => setSelectedFlight(null)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Tab Navigation */}
                                    <div className="flex border-b border-gray-200 mb-6">
                                        <button
                                            onClick={() => setActiveTab('general')}
                                            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'general'
                                                    ? 'border-sky-500 text-sky-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            General
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('segments')}
                                            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'segments'
                                                    ? 'border-sky-500 text-sky-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Segments
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('baggage')}
                                            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${activeTab === 'baggage'
                                                    ? 'border-sky-500 text-sky-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                                }`}
                                        >
                                            Baggage
                                        </button>
                                    </div>

                                    {/* Tab Content */}
                                    {activeTab === 'general' && (
                                        <>
                                            {/* Flight Info */}
                                            <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <img
                                                        src={selectedFlight.logo}
                                                        alt={selectedFlight.airline}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-900">{selectedFlight.airline}</h3>
                                                        <p className="text-gray-600">{selectedFlight.flightNumber} • {selectedFlight.aircraft}</p>
                                                    </div>
                                                    <div className="ml-auto flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="font-semibold">{selectedFlight.rating}</span>
                                                    </div>
                                                </div>

                                                {/* Route */}
                                                <div className="flex items-center justify-between">
                                                    <div className="text-center">
                                                        <p className="text-2xl font-bold text-gray-900">{selectedFlight.departure.time}</p>
                                                        <p className="font-semibold text-gray-700">{selectedFlight.departure.airport}</p>
                                                        <p className="text-sm text-gray-600">{selectedFlight.departure.city}</p>
                                                        <p className="text-xs text-gray-500">{selectedFlight.departure.terminal}</p>
                                                    </div>
                                                    <div className="flex-1 mx-6">
                                                        <div className="relative">
                                                            <div className="h-px bg-gray-300 w-full"></div>
                                                            <Plane className="w-5 h-5 text-sky-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50" />
                                                        </div>
                                                        <div className="text-center mt-2">
                                                            <p className="font-semibold text-gray-900">{selectedFlight.duration}</p>
                                                            <p className="text-sm text-gray-600">Non-stop</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-2xl font-bold text-gray-900">{selectedFlight.arrival.time}</p>
                                                        <p className="font-semibold text-gray-700">{selectedFlight.arrival.airport}</p>
                                                        <p className="text-sm text-gray-600">{selectedFlight.arrival.city}</p>
                                                        <p className="text-xs text-gray-500">{selectedFlight.arrival.terminal}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Class Selection */}
                                            <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Class</h3>
                                                <div className="space-y-3">
                                                    {selectedFlight.classes?.map((flightClass: any) => (
                                                        <div
                                                            key={flightClass.name}
                                                            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${selectedClass === flightClass.name
                                                                ? 'border-sky-500 bg-sky-50'
                                                                : flightClass.available
                                                                    ? 'border-gray-200 hover:border-sky-300'
                                                                    : 'border-gray-200 opacity-50 cursor-not-allowed'
                                                                }`}
                                                            onClick={() => flightClass.available && setSelectedClass(flightClass.name)}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <h4 className="font-semibold text-gray-900">{flightClass.name}</h4>
                                                                    <p className="text-sm text-gray-600">
                                                                        {flightClass.available ? 'Available' : 'Sold out'}
                                                                    </p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xl font-bold text-gray-900">${flightClass.price}</p>
                                                                    <p className="text-sm text-gray-600">per person</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Amenities */}
                                            <div className="mb-6">
                                                <h3 className="text-lg font-bold text-gray-900 mb-4">Amenities & Services</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Wifi className="w-5 h-5 text-sky-600" />
                                                        <span className="text-gray-700">Free WiFi</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Monitor className="w-5 h-5 text-sky-600" />
                                                        <span className="text-gray-700">Entertainment</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Coffee className="w-5 h-5 text-sky-600" />
                                                        <span className="text-gray-700">Meals</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Luggage className="w-5 h-5 text-sky-600" />
                                                        <span className="text-gray-700">Baggage: {selectedFlight.baggage?.carry} + {selectedFlight.baggage?.checked}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {activeTab === 'segments' && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Flight Segments</h3>
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <Plane className="w-6 h-6 text-sky-600" />
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">{selectedFlight.flightNumber}</h4>
                                                        <p className="text-sm text-gray-600">{selectedFlight.aircraft}</p>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{selectedFlight.departure.time}</p>
                                                            <p className="text-sm text-gray-600">{selectedFlight.departure.airport} - {selectedFlight.departure.city}</p>
                                                            <p className="text-xs text-gray-500">{selectedFlight.departure.terminal}</p>
                                                        </div>
                                                        <div className="text-center">
                                                            <p className="text-sm text-gray-600">{selectedFlight.duration}</p>
                                                            <p className="text-xs text-gray-500">Non-stop</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-semibold text-gray-900">{selectedFlight.arrival.time}</p>
                                                            <p className="text-sm text-gray-600">{selectedFlight.arrival.airport} - {selectedFlight.arrival.city}</p>
                                                            <p className="text-xs text-gray-500">{selectedFlight.arrival.terminal}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'baggage' && (
                                        <div className="mb-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Baggage Information</h3>
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 rounded-xl p-6">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <Luggage className="w-5 h-5 text-sky-600" />
                                                        <h4 className="font-semibold text-gray-900">Carry-on Baggage</h4>
                                                    </div>
                                                    <p className="text-gray-700 mb-2">Weight: {selectedFlight.baggage?.carry}</p>
                                                    <p className="text-sm text-gray-600">Dimensions: 55cm x 40cm x 20cm</p>
                                                </div>

                                                {/* Checked Baggage Selection */}
                                                <div className="bg-gray-50 rounded-xl p-6">
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <Luggage className="w-5 h-5 text-sky-600" />
                                                        <h4 className="font-semibold text-gray-900">Checked Baggage Options</h4>
                                                    </div>
                                                    <div className="space-y-3">
                                                        {[
                                                            { weight: '20kg', price: 0, description: 'Standard allowance' },
                                                            { weight: '30kg', price: 75, description: 'Extra 10kg' },
                                                            { weight: '40kg', price: 150, description: 'Extra 20kg' }
                                                        ].map((option) => (
                                                            <div
                                                                key={option.weight}
                                                                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${selectedBaggage === option.weight
                                                                        ? 'border-sky-500 bg-sky-50'
                                                                        : 'border-gray-200 hover:border-sky-300 bg-white'
                                                                    }`}
                                                                onClick={() => setSelectedBaggage(option.weight)}
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <h5 className="font-semibold text-gray-900">{option.weight}</h5>
                                                                        <p className="text-sm text-gray-600">{option.description}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-lg font-bold text-gray-900">
                                                                            {option.price === 0 ? 'Included' : `+$${option.price}`}
                                                                        </p>
                                                                        {option.price > 0 && (
                                                                            <p className="text-sm text-gray-600">per person</p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Book Button */}
                                    <div className="border-t pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-semibold text-gray-900">Total Price</span>
                                            <span className="text-2xl font-bold text-sky-600">
                                                ${selectedFlight.classes?.find((c: any) => c.name === selectedClass)?.price || selectedFlight.price}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => router.push('/flights/booking')}
                                            className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                                        >
                                            Book This Flight
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FlightsListing;