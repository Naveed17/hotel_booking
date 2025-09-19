'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Select from '@components/core/select';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import Link from 'next/link';
import useCountries from '@src/hooks/useCountries'
import { useMutation } from '@tanstack/react-query';
import { sign_up } from '@src/actions';
// --- Zod Schema ---
const SignUpSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    country: z.string().min(1, 'Country is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    acceptPrivacy: z.literal(true, { errorMap: () => ({ message: 'You must accept privacy policy' }) }),
});




type SignUpFormData = z.infer<typeof SignUpSchema>;
const Signup = () => {
    return (
        <GoogleReCaptchaProvider reCaptchaKey="6Lcwl68rAAAAABAYhOI_A5X5sxFuabEKutGK0bFZ">
            <SignUpForm />
        </GoogleReCaptchaProvider>
    );
};
function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { countries, isLoading: country_loading } = useCountries();
    const {
        handleSubmit,
        control,
        register,
        getValues,
        setValue,
        formState: { errors },
        reset,
    } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            country: "",
            phone: '',
            email: '',
            password: '',

        },
    });
    const { mutate } = useMutation({
        mutationFn: sign_up,
        onSuccess: (data) => {


        },
        onError: (error) => {
            console.error(error);
        },
    });
    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true);
        const country_code = countries.find((c: any) => c.value === data.country).code;
        const payload = {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            phone_country_code: country_code,
            email: data.email,
            password: data.password,
            user_type: 'Customer'
        }
        mutate(payload);
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    JOIN THE ADVENTURE
                </div>
                <h1 className="text-3xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-emerald-600 bg-clip-text text-transparent">
                    Create Your Account
                </h1>
                <p className="text-gray-600 text-lg">
                    Already have an account?{' '}
                    <Link
                        href='/auth/sign-in'
                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                        Sign in here
                    </Link>
                </p>
            </div>

            {/* Enhanced Form Container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-100">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Enhanced Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                First Name
                            </label>
                            <input
                                id="firstName"
                                {...register('firstName')}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-emerald-300"
                                placeholder="Enter first name"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm font-medium">{errors.firstName.message}</p>
                            )}
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                {...register('lastName')}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300"
                                placeholder="Enter last name"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm font-medium">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Country */}
                    <div className="space-y-3">
                        <label htmlFor="country" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Country
                        </label>
                        <Controller
                            control={control}
                            name="country"
                            render={({ field: { onChange, onBlur, value, name } }) => (
                                <Select
                                    options={countries || []}
                                    placeholder="Select your country"
                                    isLoading={country_loading}
                                    isSearchable
                                    isClearable
                                    value={countries?.find((c: any) => c.value === value) || null}
                                    onChange={(option) => onChange((option as any)?.value || '')}
                                    onBlur={onBlur}
                                    name={name}
                                />
                            )}
                        />
                        {errors.country && (
                            <p className="text-red-500 text-sm font-medium">{errors.country.message}</p>
                        )}
                    </div>

                    {/* Enhanced Phone */}
                    <div className="space-y-3">
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-orange-300"
                            placeholder="Enter your phone number"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm font-medium">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Enhanced Email */}
                    <div className="space-y-3">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-cyan-300"
                            placeholder="Enter your email address"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Enhanced Password */}
                    <div className="space-y-3">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-pink-300"
                                placeholder="Create a secure password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Enhanced Privacy Policy */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <label className="flex items-start cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register('acceptPrivacy')}
                                    className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 mt-0.5 transition-colors"
                                />
                                <span className="ml-3 text-gray-700 text-sm leading-relaxed">
                                    I agree to the{' '}
                                    <button
                                        type="button"
                                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors underline"
                                    >
                                        Privacy Policy
                                    </button>{' '}
                                    and{' '}
                                    <button
                                        type="button"
                                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors underline"
                                    >
                                        Terms of Service
                                    </button>
                                </span>
                            </label>
                            {errors.acceptPrivacy && (
                                <p className="text-red-500 text-sm font-medium mt-2">{errors.acceptPrivacy.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Sign Up Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-3.5 px-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Account...
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Signup