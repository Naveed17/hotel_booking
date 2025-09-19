'use client';
import React, { useState, useRef, useMemo, useEffect } from 'react'
import { DatePicker } from "@components/DatePicker";
import { GuestSelector } from "@components/GuestSelector";
import {
    ChevronDown,
    MapPin,
    Search,
    SearchX,
    Plane,
    ArrowRightLeft
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

interface Airport {
    id: string;
    code: string;
    name: string;
    city: string;
    country: string;
}

const searchFormSchema = z.object({
    from: z.object({
        id: z.string().min(1, "Please select departure airport"),
        code: z.string().min(1),
        name: z.string().min(1),
        city: z.string().min(1),
        country: z.string().min(1)
    }),
    to: z.object({
        id: z.string().min(1, "Please select destination airport"),
        code: z.string().min(1),
        name: z.string().min(1),
        city: z.string().min(1),
        country: z.string().min(1)
    }),
    departDate: z.string().min(1, "Departure date is required"),
    returnDate: z.string().optional(),
    passengers: z.string().min(1, "Please select number of passengers"),
    tripType: z.enum(['roundtrip', 'oneway']),
    class: z.enum(['economy', 'business', 'first'])
});

type SearchFormData = z.infer<typeof searchFormSchema>;

const popularAirports: Airport[] = [
    { id: "1", code: "JFK", name: "John F. Kennedy International", city: "New York", country: "USA" },
    { id: "2", code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "USA" },
    { id: "3", code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
    { id: "4", code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
    { id: "5", code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
    { id: "6", code: "NRT", name: "Narita International", city: "Tokyo", country: "Japan" }
];

function FlightsMainSearch() {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [fromQuery, setFromQuery] = useState("");
    const [toQuery, setToQuery] = useState("");
    const [fromOpen, setFromOpen] = useState(false);
    const [toOpen, setToOpen] = useState(false);
    const fromRef = useRef<HTMLInputElement | null>(null);
    const toRef = useRef<HTMLInputElement | null>(null);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<SearchFormData>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            from: { id: "", code: "", name: "", city: "", country: "" },
            to: { id: "", code: "", name: "", city: "", country: "" },
            departDate: "",
            returnDate: "",
            passengers: "1 Passenger",
            tripType: "roundtrip",
            class: "economy"
        }
    });

    const watchedValues = watch();

    const handleSwapAirports = () => {
        const fromValue = watchedValues.from;
        const toValue = watchedValues.to;
        setValue('from', toValue);
        setValue('to', fromValue);
        if (fromRef.current && toRef.current) {
            fromRef.current.value = toValue.city || '';
            toRef.current.value = fromValue.city || '';
        }
    };

    const handleSelectAirport = (airport: Airport, type: 'from' | 'to') => {
        setValue(type, airport, { shouldValidate: true });
        if (type === 'from') {
            setFromOpen(false);
            if (fromRef.current) fromRef.current.value = airport.city;
        } else {
            setToOpen(false);
            if (toRef.current) toRef.current.value = airport.city;
        }
    };

    const onSubmit = async (data: SearchFormData) => {
        setLoading(true);
        try {
            const locale = params?.locale ?? "en";
            const departDate = dayjs(data.departDate, "MM/DD/YYYY").format("DD-MM-YYYY");
            const returnDate = data.returnDate ? dayjs(data.returnDate, "MM/DD/YYYY").format("DD-MM-YYYY") : "";
            const passengers = data.passengers.split(" ")[0];
            
            const url = `/${locale}/flights/${data.from.code}/${data.to.code}/${departDate}${returnDate ? `/${returnDate}` : ''}/${passengers}/${data.class}/${data.tripType}`;
            router.push(url);
        } catch (error) {
            console.error("Search submission error:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-6xl mx-auto"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Enhanced Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                        FLY TO YOUR DREAMS
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Where would you like to fly?</h3>
                    <p className="text-gray-600">Find the best flights at unbeatable prices worldwide</p>
                </div>

                {/* Trip Type & Class */}
                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="roundtrip"
                                {...control.register('tripType')}
                                className="text-sky-600 focus:ring-sky-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Round Trip</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="oneway"
                                {...control.register('tripType')}
                                className="text-sky-600 focus:ring-sky-500"
                            />
                            <span className="text-sm font-medium text-gray-700">One Way</span>
                        </label>
                    </div>
                    
                    <Controller
                        name="class"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            >
                                <option value="economy">Economy</option>
                                <option value="business">Business</option>
                                <option value="first">First Class</option>
                            </select>
                        )}
                    />
                </div>

                {/* Airport Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* From Airport */}
                    <div className="relative">
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <Plane className="w-4 h-4 text-sky-500" />
                            From
                        </label>
                        <div className="relative">
                            <input
                                ref={fromRef}
                                type="text"
                                placeholder="Departure city or airport"
                                onChange={(e) => {
                                    setFromQuery(e.target.value);
                                    setFromOpen(e.target.value.length > 0);
                                }}
                                className={`w-full pl-4 pr-10 h-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                    errors.from ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-sky-500'
                                }`}
                            />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                            
                            {fromOpen && (
                                <div className="absolute z-50 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl mt-2 max-h-64 overflow-y-auto border border-gray-100">
                                    {popularAirports.filter(airport => 
                                        airport.city.toLowerCase().includes(fromQuery.toLowerCase()) ||
                                        airport.code.toLowerCase().includes(fromQuery.toLowerCase())
                                    ).map((airport) => (
                                        <div
                                            key={airport.id}
                                            onClick={() => handleSelectAirport(airport, 'from')}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                                <Plane className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{airport.code}</p>
                                                <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.from && <p className="mt-1 text-sm text-red-600">{errors.from.message}</p>}
                    </div>

                    {/* To Airport */}
                    <div className="relative">
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-sky-500" />
                            To
                        </label>
                        <div className="relative">
                            <input
                                ref={toRef}
                                type="text"
                                placeholder="Destination city or airport"
                                onChange={(e) => {
                                    setToQuery(e.target.value);
                                    setToOpen(e.target.value.length > 0);
                                }}
                                className={`w-full pl-4 pr-10 h-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                                    errors.to ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-sky-500'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={handleSwapAirports}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors"
                            >
                                <ArrowRightLeft className="w-3 h-3 text-sky-600" />
                            </button>
                            
                            {toOpen && (
                                <div className="absolute z-50 w-full bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl mt-2 max-h-64 overflow-y-auto border border-gray-100">
                                    {popularAirports.filter(airport => 
                                        airport.city.toLowerCase().includes(toQuery.toLowerCase()) ||
                                        airport.code.toLowerCase().includes(toQuery.toLowerCase())
                                    ).map((airport) => (
                                        <div
                                            key={airport.id}
                                            onClick={() => handleSelectAirport(airport, 'to')}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                                                <MapPin className="w-4 h-4 text-sky-600" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{airport.code}</p>
                                                <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.to && <p className="mt-1 text-sm text-red-600">{errors.to.message}</p>}
                    </div>
                </div>

                {/* Date and Passenger Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {/* Departure Date */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Departure
                        </label>
                        <Controller
                            name="departDate"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    placeholder="Select date"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={errors.departDate ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.departDate && <p className="mt-1 text-sm text-red-600">{errors.departDate.message}</p>}
                    </div>

                    {/* Return Date */}
                    {watchedValues.tripType === 'roundtrip' && (
                        <div>
                            <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                Return
                            </label>
                            <Controller
                                name="returnDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholder="Select date"
                                        value={field.value || ''}
                                        onChange={field.onChange}
                                        className={errors.returnDate ? 'border-red-500' : ''}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* Passengers */}
                    <div>
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Passengers
                        </label>
                        <Controller
                            name="passengers"
                            control={control}
                            render={({ field }) => (
                                <GuestSelector
                                    value={field.value}
                                    onChange={(value) => {
                                        const guests = value.split(',');
                                        const adults = parseInt(guests[0]);
                                        const children = parseInt(guests[1]);
                                        setValue('passengers', `${adults + children} ${adults + children === 1 ? 'Passenger' : 'Passengers'}`);
                                    }}
                                    className={errors.passengers ? 'border-red-500' : ''}
                                />
                            )}
                        />
                        {errors.passengers && <p className="mt-1 text-sm text-red-600">{errors.passengers.message}</p>}
                    </div>

                    {/* Search Button */}
                    <div className="md:self-end">
                        <label className="text-gray-700 text-sm font-semibold mb-3 block flex items-center gap-2">
                            <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                            Ready to fly?
                        </label>
                        <button
                            type="submit"
                            disabled={isSubmitting || loading}
                            className="w-full h-12 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                        >
                            {isSubmitting || loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" />
                                    Search Flights
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export default FlightsMainSearch