'use client';
import React, { useState } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    MapPin,
    Search,
} from "lucide-react";
function MainSearch() {
    const [destination, setDestination] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2 Guests, 1 Room");
    const handleSearch = () => {
        console.log("Search submitted:", { destination, checkIn, checkOut, guests });
    };
    return (
        <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-6xl mx-auto">
            {/* Where to search */}
            <div className="mb-6">
                <label htmlFor="destination" className="text-travel-gray text-sm font-medium mb-3 block">
                    Where to?
                </label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-travel-gray w-4 h-4" />
                    <input
                        id="destination"
                        type="text"
                        placeholder="Search destinations..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-10 h-11 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Date and Guest Selection */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* Check-in */}
                <div>
                    <label className="text-travel-gray text-sm font-medium mb-3 block">
                        Check - in
                    </label>
                    <DatePicker
                        placeholder="Select date"
                        value={checkIn}
                        onChange={setCheckIn}
                    />
                </div>

                {/* Check-out */}
                <div>
                    <label className="text-travel-gray text-sm font-medium mb-3 block">
                        Check - out
                    </label>
                    <DatePicker
                        placeholder="Select date"
                        value={checkOut}
                        onChange={setCheckOut}
                    />
                </div>

                {/* Guests */}
                <div>
                    <label className="text-travel-gray text-sm font-medium mb-3 block">
                        Guests
                    </label>
                    <GuestSelector
                        value={guests}
                        onChange={setGuests}
                    />
                </div>

                {/* Search Button */}
                <div className="md:self-end">
                    <button
                        onClick={handleSearch}
                        className="w-full h-11 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                        <Search className="w-4 h-4" />
                        Search Homes
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MainSearch