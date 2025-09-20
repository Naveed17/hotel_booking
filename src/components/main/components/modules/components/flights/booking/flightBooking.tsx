'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Plane,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DatePicker } from '@components/DatePicker'

const bookingSchema = z.object({
    passengers: z.array(z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        dateOfBirth: z.string().min(1, 'Date of birth is required'),
        passportNumber: z.string().min(1, 'Passport number is required'),
        nationality: z.string().min(1, 'Nationality is required')
    })),
    contact: z.object({
        email: z.string().email('Invalid email address'),
        phone: z.string().min(1, 'Phone number is required'),
        emergencyContact: z.string().min(1, 'Emergency contact is required')
    }),
    payment: z.object({
        cardNumber: z.string().min(16, 'Card number must be 16 digits'),
        expiryDate: z.string().min(1, 'Expiry date is required'),
        cvv: z.string().min(3, 'CVV must be 3 digits'),
        cardholderName: z.string().min(1, 'Cardholder name is required')
    })
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Mock flight data
const mockFlight = {
    airline: "Emirates",
    flightNumber: "EK205",
    departure: {
        airport: "JFK",
        city: "New York",
        time: "14:30",
        date: "Mar 15, 2024"
    },
    arrival: {
        airport: "DXB",
        city: "Dubai",
        time: "06:45+1",
        date: "Mar 16, 2024"
    },
    duration: "12h 15m",
    class: "Economy",
    price: 1299,
    passengers: 2
};

const FlightBooking = (): React.JSX.Element => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, watch, control } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            passengers: Array(mockFlight.passengers).fill(null).map(() => ({
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                passportNumber: '',
                nationality: ''
            })),
            contact: {
                email: '',
                phone: '',
                emergencyContact: ''
            },
            payment: {
                cardNumber: '',
                expiryDate: '',
                cvv: '',
                cardholderName: ''
            }
        }
    });
    const onSubmit = async (data: BookingFormData) => {
        setIsSubmitting(true);
        // Simulate booking process
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        router.push('/flights/booking/confirmation');

    };

    const totalPrice = mockFlight.price * mockFlight.passengers;

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 pt-20">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></span>
                            FLIGHT BOOKING
                        </div>
                        <h1 className="text-4xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-sky-600 bg-clip-text text-transparent">
                            Complete Your Booking
                        </h1>
                        <p className="text-gray-600">Just a few more steps to secure your flight</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Passenger Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-white/95 relative z-40 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Information</h2>

                                    {Array(mockFlight.passengers).fill(null).map((_, index) => (
                                        <div key={index} className="mb-8 last:mb-0">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                                Passenger {index + 1}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        {...register(`passengers.${index}.firstName`)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                        placeholder="Enter first name"
                                                    />
                                                    {errors.passengers?.[index]?.firstName && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.passengers[index]?.firstName?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        {...register(`passengers.${index}.lastName`)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                        placeholder="Enter last name"
                                                    />
                                                    {errors.passengers?.[index]?.lastName && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.passengers[index]?.lastName?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Date of Birth
                                                    </label>
                                                    <div className="relative">
                                                        <Controller
                                                            name={`passengers.${index}.dateOfBirth`}
                                                            control={control}
                                                            render={({ field }) => (
                                                                <DatePicker
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    placeholder="Select date of birth"
                                                                    className="w-full"
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                    {errors.passengers?.[index]?.dateOfBirth && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.passengers[index]?.dateOfBirth?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Passport Number
                                                    </label>
                                                    <input
                                                        {...register(`passengers.${index}.passportNumber`)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                        placeholder="Enter passport number"
                                                    />
                                                    {errors.passengers?.[index]?.passportNumber && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.passengers[index]?.passportNumber?.message}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Nationality
                                                    </label>
                                                    <input
                                                        {...register(`passengers.${index}.nationality`)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                        placeholder="Enter nationality"
                                                    />
                                                    {errors.passengers?.[index]?.nationality && (
                                                        <p className="text-red-500 text-sm mt-1">
                                                            {errors.passengers[index]?.nationality?.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Contact Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/95 relative z-0 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"

                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                {...register('contact.email')}
                                                type="email"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Enter email address"
                                            />
                                            {errors.contact?.email && (
                                                <p className="text-red-500 text-sm mt-1">{errors.contact.email.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                {...register('contact.phone')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Enter phone number"
                                            />
                                            {errors.contact?.phone && (
                                                <p className="text-red-500 text-sm mt-1">{errors.contact.phone.message}</p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Emergency Contact
                                            </label>
                                            <input
                                                {...register('contact.emergencyContact')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Enter emergency contact"
                                            />
                                            {errors.contact?.emergencyContact && (
                                                <p className="text-red-500 text-sm mt-1">{errors.contact.emergencyContact.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Payment Information */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 pt-8 md:pt-8 md:p-8"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <input
                                                {...register('payment.cardNumber')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                            {errors.payment?.cardNumber && (
                                                <p className="text-red-500 text-sm mt-1">{errors.payment.cardNumber.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Expiry Date
                                            </label>
                                            <input
                                                {...register('payment.expiryDate')}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                            {errors.payment?.expiryDate && (
                                                <p className="text-red-500 text-sm mt-1">{errors.payment.expiryDate.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                CVV
                                            </label>
                                            <input
                                                {...register('payment.cvv')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="123"
                                            />
                                            {errors.payment?.cvv && (
                                                <p className="text-red-500 text-sm mt-1">{errors.payment.cvv.message}</p>
                                            )}
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Cardholder Name
                                            </label>
                                            <input
                                                {...register('payment.cardholderName')}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Enter cardholder name"
                                            />
                                            {errors.payment?.cardholderName && (
                                                <p className="text-red-500 text-sm mt-1">{errors.payment.cardholderName.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Processing...' : `Complete Booking - $${totalPrice}`}
                                </button>
                            </form>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24"
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Summary</h2>

                                {/* Flight Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <Plane className="w-5 h-5 text-sky-600" />
                                        <div>
                                            <p className="font-semibold text-gray-900">{mockFlight.airline}</p>
                                            <p className="text-sm text-gray-600">{mockFlight.flightNumber}</p>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">Departure</span>
                                            <span className="font-semibold text-gray-900">{mockFlight.departure.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">Arrival</span>
                                            <span className="font-semibold text-gray-900">{mockFlight.arrival.time}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Duration</span>
                                            <span className="font-semibold text-gray-900">{mockFlight.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">{mockFlight.class} × {mockFlight.passengers}</span>
                                            <span className="text-gray-900">${mockFlight.price * mockFlight.passengers}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Taxes & Fees</span>
                                            <span className="text-gray-900">$89</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-sky-600">${totalPrice + 89}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightBooking;