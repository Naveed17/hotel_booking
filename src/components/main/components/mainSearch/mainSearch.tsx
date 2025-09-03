'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    ChevronDown,
    MapPin,
    Search,
    SearchX,
} from "lucide-react";
import { getDestinations } from '@src/actions';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface Destination {
    id: string;
    country: string;
    country_code: string;
    city: string;
    latitude: string | null;
    longitude: string | null;
    status: string;
}

// Zod validation schema
const searchFormSchema = z.object({
    destination: z.object({
        id: z.string().min(1, "Please select a destination"),
        city: z.string().min(1, "City is required"),
        country: z.string().min(1, "Country is required"),
        country_code: z.string().min(1),
        latitude: z.string().nullable(),
        longitude: z.string().nullable(),
        status: z.string()
    }).refine((data) => data.id !== "", {
        message: "Please select a valid destination",
        path: ["id"]
    }),
    checkIn: z.string().min(1, "Check-in date is required").refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }, {
        message: "Check-in date must be today or later"
    }),
    checkOut: z.string().min(1, "Check-out date is required"),
    guests: z.string().min(1, "Please select number of guests")
}).refine((data) => {
    if (data.checkIn && data.checkOut) {
        const checkInDate = new Date(data.checkIn);
        const checkOutDate = new Date(data.checkOut);
        return checkOutDate > checkInDate;
    }
    return true;
}, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"]
});

type SearchFormData = z.infer<typeof searchFormSchema>;

const popularDestinations: Destination[] = [
    {
        id: "1",
        city: "Dubai",
        country: "United Arab Emirates",
        country_code: "AE",
        latitude: "25.276987",
        longitude: "55.296249",
        status: "active",
    },
    {
        id: "2",
        city: "Istanbul",
        country: "Turkey",
        country_code: "TR",
        latitude: "41.008238",
        longitude: "28.978359",
        status: "active",
    },
    {
        id: "3",
        city: "London",
        country: "United Kingdom",
        country_code: "GB",
        latitude: "51.507351",
        longitude: "-0.127758",
        status: "active",
    },
    {
        id: "4",
        city: "Paris",
        country: "France",
        country_code: "FR",
        latitude: "48.856613",
        longitude: "2.352222",
        status: "active",
    },
];

function MainSearch() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const searchValueRef = useRef("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [, forceRender] = useState(0);


    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting }
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            destination: {
                id: "",
                city: "",
                country: "",
                country_code: "",
                latitude: null,
                longitude: null,
                status: ""
            },
            checkIn: "",
            checkOut: "",
            guests: "2 Guests, 1 Room"
        }
    });

    const { data, error, isFetching } = useQuery({
        queryKey: ["destinations", searchValueRef.current],
        queryFn: () => getDestinations(searchValueRef.current),
        enabled: searchValueRef.current.length > 2,
    });

    const handleSearch = useMemo(
        () =>
            debounce((value: string) => {
                setQuery(value);
                searchValueRef.current = value;
                forceRender((c) => c + 1);
                if (value.length > 2) {
                    setIsOpen(true);
                } else {
                    setIsOpen(false);
                }
            }, 500),
        []
    );

    const handleSelectDestination = (destination: Destination) => {
        setValue("destination", destination, { shouldValidate: true });
        setIsOpen(false);
        if (inputRef.current) {
            inputRef.current.value = `${destination.city}`;
        }
    };

    const suggestions = useMemo(() => {
        const source = data && data.length > 0 ? data : popularDestinations;

        if (!query) return source.slice(0, 3);

        const searchWords = query.toLowerCase().split(" ");
        const similar = source.filter((dest: Destination) => {
            const destWords = `${dest.city} ${dest.country}`.toLowerCase().split(" ");
            return searchWords.some((sw) =>
                destWords.some((dw) => dw.includes(sw) || sw.includes(dw))
            );
        });

        return similar.length > 0 ? similar.slice(0, 3) : source.slice(0, 3);
    }, [query, data]);


    const onSubmit = async (data: SearchFormData) => {
        try {
            console.log("Form submitted with data:", data);
            alert(`Searching for homes in ${data.destination.city}, ${data.destination.country} from ${data.checkIn} to ${data.checkOut} for ${data.guests}`);
        } catch (error) {
            console.error("Search submission error:", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.8,
                delay: 1.5,
                ease: "easeOut"
            }}
            className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-6xl mx-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Where to search */}
                <div className="mb-6">
                    <label htmlFor="destination" className="text-travel-gray text-sm font-medium mb-3 block">
                        Where to?
                    </label>
                    <div className="relative" ref={wrapperRef}>
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-travel-gray w-4 h-4" />
                        <input
                            id="destination"
                            ref={inputRef}
                            type="text"
                            placeholder="Search destinations..."
                            onFocus={(e) => e.target.value.length > 2 && setIsOpen(true)}
                            onChange={(e) => handleSearch(e.target.value)}
                            className={`w-full pl-10 h-11 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:border-transparent ${errors.destination
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-200 focus:ring-blue-500'
                                }`}
                        />
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                        {isFetching && (
                            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                                <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        )}

                        {/* Dropdown */}
                        {isOpen && (
                            <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-2 max-h-64 pb-3 overflow-y-auto">
                                <div className="text-xs font-medium text-gray-500 mb-2 px-3 py-2">
                                    Popular Destinations
                                </div>
                                <div>
                                    {isFetching ? (
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                                            <span className="text-gray-500 loading-dots">Loading</span>
                                            <style jsx>{`
                                                .loading-dots::after {
                                                    content: "...";
                                                    animation: dots 1.5s steps(4, end) infinite;
                                                    margin-left: 2px;
                                                }
                                                @keyframes dots {
                                                    0%, 20% { content: ""; }
                                                    40% { content: "."; }
                                                    60% { content: ".."; }
                                                    80%, 100% { content: "..."; }
                                                }
                                            `}</style>
                                        </div>
                                    ) : data?.length > 0 ? (
                                        data?.map((destination: any) => (
                                            <div
                                                key={destination.id}
                                                onClick={() => handleSelectDestination(destination)}
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <span className="text-gray-900">{destination.city}, {destination.country}</span>
                                            </div>
                                        ))
                                    ) : (
                                        !isFetching && (
                                            <div className="px-3 py-4 text-center text-gray-500">
                                                <div className="flex items-center justify-center mb-3">
                                                    <SearchX className="w-8 h-8 text-gray-400" />
                                                </div>
                                                <div className="font-medium text-gray-800 mb-1">
                                                    No destinations found {query && `for "${query}"`}
                                                </div>
                                                <div className="text-sm text-gray-600 mb-3">
                                                    {query
                                                        ? `We couldn't find any destinations matching "${query}". Try these:`
                                                        : "No destinations available at the moment."}
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-xs font-medium text-gray-600 mb-2">
                                                        Try these popular destinations:
                                                    </div>
                                                    {suggestions?.map((s: Destination) => (
                                                        <div
                                                            key={s.id}
                                                            onClick={() => handleSelectDestination(s)}
                                                            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                                                        >
                                                            <MapPin className="w-3 h-3 text-gray-400" />
                                                            <span>{s.city}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    {errors.destination && (
                        <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
                    )}
                </div>

                {/* Date and Guest Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    {/* Check-in */}
                    <div>
                        <label className="text-travel-gray text-sm font-medium mb-3 block">
                            Check-in
                        </label>
                        <Controller
                            name="checkIn"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Select date"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.checkIn ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.checkIn && (
                            <p className="mt-1 text-sm text-red-600">{errors.checkIn.message}</p>
                        )}
                    </div>

                    {/* Check-out */}
                    <div>
                        <label className="text-travel-gray text-sm font-medium mb-3 block">
                            Check-out
                        </label>
                        <Controller
                            name="checkOut"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Select date"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.checkOut ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.checkOut && (
                            <p className="mt-1 text-sm text-red-600">{errors.checkOut.message}</p>
                        )}
                    </div>

                    {/* Guests */}
                    <div>
                        <label className="text-travel-gray text-sm font-medium mb-3 block">
                            Guests
                        </label>
                        <Controller
                            name="guests"
                            control={control}
                            render={({ field }) => (
                                <GuestSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.guests ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.guests && (
                            <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                        )}
                    </div>

                    {/* Search Button */}
                    <div className="md:self-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 bg-travel-blue hover:bg-travel-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" />
                                    Search Homes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default MainSearch