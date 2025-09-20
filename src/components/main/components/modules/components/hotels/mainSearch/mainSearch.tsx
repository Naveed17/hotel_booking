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
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from "dayjs";

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
    guests: z.string().min(1, "Please select number of guests"),
    children: z.string().optional()
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
    const router = useRouter()
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const searchValueRef = useRef("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [, forceRender] = useState(0);
    const params = useParams(); // includes locale if using i18n routing
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
            guests: "2 Guests, 1 Room",
            children: "0"
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

        const city = data.destination.city.toLocaleLowerCase();
        const checkIn = dayjs(data.checkIn, "MM/DD/YYYY").format("DD-MM-YYYY");
        const checkOut = dayjs(data.checkOut, "MM/DD/YYYY").format("DD-MM-YYYY");
        const rooms = data.guests.split(" ")[2];
        const adults = data.guests.split(" ")[0];
        const children = data.children;
        setLoading(true);
        try {
            const locale = params?.locale ?? "en"; // fallback to default if needed
            const url = `/${locale}/hotels/${city}/${checkIn}/${checkOut}/${rooms}/${adults}/${children}/${data.destination.country_code}`;
            router.push(url);
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
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-8 w-full max-w-6xl mx-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Where to search */}
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        FIND YOUR PERFECT STAY
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Where would you like to go?</h3>
                    <p className="text-gray-600">Discover amazing places to stay around the world</p>
                </div>

                <div className="mb-6">
                    <label htmlFor="destination" className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Destination
                    </label>
                    <div className="relative" ref={wrapperRef}>
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 z-10" />
                        <input
                            id="destination"
                            ref={inputRef}
                            type="text"
                            placeholder="Search destinations, cities, countries..."
                            onFocus={(e) => e.target.value.length > 2 && setIsOpen(true)}
                            onChange={(e) => handleSearch(e.target.value)}
                            className={`w-full pl-10 h-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.destination
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-200 focus:ring-blue-500 hover:border-blue-300'
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

                        {/* Enhanced Dropdown */}
                        {isOpen && (
                            <div className="absolute z-50 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl mt-2 max-h-64 pb-3 overflow-y-auto border border-gray-100">
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2 sm:mb-8">
                    {/* Check-in */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
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
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Guests & Rooms
                        </label>
                        <Controller
                            name="guests"
                            control={control}
                            render={({ field }) => (
                                <GuestSelector
                                    value={field.value}
                                    onChange={(value) => {
                                        const guests = value.split(',')
                                        const adults = parseInt(guests[0]);   // "3"
                                        const children = parseInt(guests[1]); // "4"
                                        const rooms = parseInt(guests[2]);    // "1"
                                        setValue('guests', `${adults + children} ${adults + children === 1 ? 'Guest' : 'Guests'}, ${rooms} ${rooms === 1 ? 'Room' : 'Rooms'}`)
                                        setValue('children', `${children}`)

                                    }}
                                    className={errors.guests ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.guests && (
                            <p className="mt-1 text-sm text-red-600">{errors.guests.message}</p>
                        )}
                    </div>

                    {/* Enhanced Search Button */}
                    <div className="md:self-end">
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            Ready to explore?
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            {isSubmitting || loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Find Perfect Stay
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