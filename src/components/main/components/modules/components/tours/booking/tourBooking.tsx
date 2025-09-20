'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Calendar,
    Users,
    CreditCard,
    Shield,
    Clock,
    MapPin,
    Star,
    ChevronLeft,
    Check
} from 'lucide-react'
import { DatePicker } from '@components/DatePicker'
import { GuestSelector } from '@components/GuestSelector'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Mock tour data
const mockTour = {
    id: "1",
    name: "Paris City Walking Tour with Local Guide",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400",
    price: 89,
    currency: "USD",
    rating: "4.8",
    reviews: 324,
    duration: "3 hours",
    category: "Cultural"
};

const bookingSchema = z.object({
    date: z.string().min(1, "Please select a date"),
    travelers: z.string().min(1, "Please select number of travelers"),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().min(10, "Valid phone number is required"),
    specialRequests: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

const TourBooking = (): React.JSX.Element => {
    const params = useParams();
    const router = useRouter();
    const lang = params?.lang as string || 'en';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            date: '',
            travelers: '2 Travelers',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            specialRequests: ''
        }
    });

    const watchedValues = watch();
    const travelerCount = parseInt(watchedValues.travelers?.split(' ')[0] || '2');
    const totalPrice = mockTour.price * travelerCount;

    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push(`/${lang}/tours/${mockTour.id}/booking/complete`);
        } catch (error) {
            console.error('Booking error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link href={`/${lang}/tours/${mockTour.id}`} className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-6">
                    <ChevronLeft className="w-4 h-4" />
                    Back to Tour Details
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-0 md:p-8"
                        >
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    BOOK YOUR TOUR
                                </div>
                                <h1 className="text-3xl font-black  bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                                    Complete Your Booking
                                </h1>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                {/* Tour Selection */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                        Tour Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                Select Date
                                            </label>
                                            <DatePicker
                                                value={watchedValues.date}
                                                onChange={(value) => setValue('date', value)}
                                                placeholder="Choose your tour date"
                                                className={errors.date ? 'border-red-500' : ''}
                                            />
                                            {errors.date && (
                                                <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                Number of Travelers
                                            </label>
                                            <GuestSelector
                                                value={watchedValues.travelers}
                                                onChange={(value) => {
                                                    const guests = value.split(',');
                                                    const adults = parseInt(guests[0]);
                                                    const children = parseInt(guests[1]);
                                                    setValue('travelers', `${adults + children} ${adults + children === 1 ? 'Traveler' : 'Travelers'}`);
                                                }}
                                                className={errors.travelers ? 'border-red-500' : ''}
                                            />
                                            {errors.travelers && (
                                                <p className="mt-1 text-sm text-red-600">{errors.travelers.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-emerald-600" />
                                        Personal Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                First Name
                                            </label>
                                            <input
                                                {...register('firstName')}
                                                type="text"
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-emerald-500'
                                                    }`}
                                                placeholder="Enter your first name"
                                            />
                                            {errors.firstName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                Last Name
                                            </label>
                                            <input
                                                {...register('lastName')}
                                                type="text"
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-emerald-500'
                                                    }`}
                                                placeholder="Enter your last name"
                                            />
                                            {errors.lastName && (
                                                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                Email Address
                                            </label>
                                            <input
                                                {...register('email')}
                                                type="email"
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-emerald-500'
                                                    }`}
                                                placeholder="Enter your email"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                                Phone Number
                                            </label>
                                            <input
                                                {...register('phone')}
                                                type="tel"
                                                className={`w-full px-4 py-3 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-emerald-500'
                                                    }`}
                                                placeholder="Enter your phone number"
                                            />
                                            {errors.phone && (
                                                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                <div>
                                    <label className="text-gray-700 text-sm font-semibold mb-2 block">
                                        Special Requests (Optional)
                                    </label>
                                    <textarea
                                        {...register('specialRequests')}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Any special requirements or requests..."
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing Booking...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5" />
                                            Complete Booking
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Booking Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h3>

                            {/* Tour Info */}
                            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
                                <img
                                    src={mockTour.image}
                                    alt={mockTour.name}
                                    className="w-20 h-20 rounded-xl object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{mockTour.name}</h4>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                        <MapPin className="w-3 h-3" />
                                        <span>{mockTour.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-3 h-3" />
                                        <span>{mockTour.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Details */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Date:</span>
                                    <span className="font-medium">{watchedValues.date || 'Not selected'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Travelers:</span>
                                    <span className="font-medium">{watchedValues.travelers}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Price per person:</span>
                                    <span className="font-medium">${mockTour.price}</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xl font-bold text-gray-900">Total:</span>
                                    <span className="text-2xl font-black text-emerald-600">${totalPrice}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Check className="w-4 h-4 text-emerald-600" />
                                    <span>Free cancellation up to 24h</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Shield className="w-4 h-4 text-emerald-600" />
                                    <span>Secure payment processing</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Star className="w-4 h-4 text-emerald-600" />
                                    <span>Best price guarantee</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourBooking