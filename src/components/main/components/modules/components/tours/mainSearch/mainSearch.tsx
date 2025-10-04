'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { TravelerSelector } from "@components/TravelerSelector";
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
    startDate: z.string().min(1, "Start date is required").refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }, {
        message: "Start date must be today or later"
    }),
    endDate: z.string().min(1, "End date is required"),
    travelers: z.string().min(1, "Please select number of travelers"),
});

type SearchFormData = z.infer<typeof searchFormSchema>;

const popularDestinations: Destination[] = [
    {
        id: "1",
        city: "Paris",
        country: "France",
        country_code: "FR",
        latitude: "48.856613",
        longitude: "2.352222",
        status: "active",
    },
    {
        id: "2",
        city: "Rome",
        country: "Italy",
        country_code: "IT",
        latitude: "41.902783",
        longitude: "12.496366",
        status: "active",
    },
    {
        id: "3",
        city: "Tokyo",
        country: "Japan",
        country_code: "JP",
        latitude: "35.676762",
        longitude: "139.650344",
        status: "active",
    },
    {
        id: "4",
        city: "Barcelona",
        country: "Spain",
        country_code: "ES",
        latitude: "41.385064",
        longitude: "2.173403",
        status: "active",
    },
];

function ToursMainSearch() {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter()
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const searchValueRef = useRef("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [, forceRender] = useState(0);
    const params = useParams();
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
            startDate: "",
            endDate: "",
            travelers: "2 Travelers",
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
        const startDate = dayjs(data.startDate, "MM/DD/YYYY").format("DD-MM-YYYY");
        const endDate = dayjs(data.endDate, "MM/DD/YYYY").format("DD-MM-YYYY");
        const travelers = data.travelers.split(" ")[0];

        setLoading(true);
        try {
            const locale = params?.locale ?? "en";
            const url = `/${locale}/tours/${city}/${startDate}/${endDate}/${travelers}/${data.destination.country_code}`;
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
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        DISCOVER AMAZING TOURS
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Where would you like to explore?</h3>
                    <p className="text-gray-600">Find unforgettable experiences and guided tours worldwide</p>
                </div>

                <div className="mb-6">
                    <label htmlFor="destination" className="text-gray-700 text-sm font-semibold mb-3 flex items-center gap-2">
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

                {/* Date and Traveler Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-2 sm:mb-8">
                    {/* Start Date */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Start Date
                        </label>
                        <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Select date"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.startDate ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.startDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                        )}
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            End Date
                        </label>
                        <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Select date"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.endDate ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.endDate && (
                            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                        )}
                    </div>

                    {/* Travelers */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Travelers
                        </label>
                        <Controller
                            name="travelers"
                            control={control}
                            render={({ field }) => (
                                <TravelerSelector
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.travelers ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.travelers && (
                            <p className="mt-1 text-sm text-red-600">{errors.travelers.message}</p>
                        )}
                    </div>

                    {/* Enhanced Search Button */}
                    <div className="md:self-end">
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Ready to explore?
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            {isSubmitting || loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Find Amazing Tours
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default ToursMainSearch