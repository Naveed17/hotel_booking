'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select';
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
    const { countries, selectedCountry } = useCountries();
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
        const payload = {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            phone_country_code: data.country,
            email: data.email,
            password: data.password,
            user_type: 'Customer'
        }
        mutate(payload);
        setIsLoading(false);
    };
    useEffect(() => {
        if (selectedCountry) {
            setValue("country", selectedCountry.code, { shouldValidate: true });
        }
    }, [selectedCountry, setValue]);
    return (
        <div className="w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl text-[#0F172B] mb-3">Create your account</h1>
                <p className="text-[#0F172B]/70">
                    Already have an account?{' '}
                    <Link
                        href='/auth/sign-in'
                        className="text-[#163c8c] hover:text-[#163c8c]/80 transition-colors"
                    >
                        Sign in
                    </Link>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="firstName" className="block text-[#0F172B] mb-2 text-sm">
                            First name
                        </label>
                        <Input
                            id="firstName"
                            {...register('firstName')}
                            className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20 text-base"
                            placeholder="First name"
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-[#0F172B] mb-2 text-sm">
                            Last name
                        </label>
                        <Input
                            id="lastName"
                            {...register('lastName')}
                            className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20 text-base"
                            placeholder="Last name"
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                {/* Country */}
                <div>
                    <label htmlFor="country" className="block text-[#0F172B] mb-2 text-sm">
                        Country
                    </label>
                    <Controller
                        control={control}
                        name="country"
                        render={({ field }) => {
                            const [search, setSearch] = useState("");
                            const filteredCountries: any[] = countries && countries?.filter((c: { value: string; label: string; code: string }) =>
                                c.label.toLowerCase().includes(search.toLowerCase())
                            );

                            return (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger
                                        ref={field.ref}
                                        className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20"
                                    >
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>

                                    <SelectContent
                                        // prevent focus loss when typing inside input
                                        onCloseAutoFocus={(e) => e.preventDefault()}
                                    >
                                        {/* Search Box */}
                                        <div className="p-2 sticky top-0 z-50 bg-white border-b border-gray-200">
                                            <input
                                                type="text"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search country..."
                                                className="w-full h-9 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#163c8c]/20"
                                                onKeyDown={(e) => e.stopPropagation()} // stop Radix from hijacking keys
                                            />
                                        </div>

                                        {/* Filtered Items */}
                                        {filteredCountries?.length > 0 ? (
                                            filteredCountries?.map((country, idx) => (
                                                <SelectItem key={`${country.value}-${idx}`} value={country.value}>
                                                    {country.label}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <div className="p-2 text-sm text-gray-500">No results found</div>
                                        )}
                                    </SelectContent>
                                </Select>
                            );
                        }}
                    />



                    {errors.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-[#0F172B] mb-2 text-sm">
                        Phone number
                    </label>
                    <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20 text-base"
                        placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-[#0F172B] mb-2 text-sm">
                        Email address
                    </label>
                    <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20 text-base"
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-[#0F172B] mb-2 text-sm">
                        Password
                    </label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            className="w-full h-11 border-gray-200 rounded-lg focus:border-[#163c8c] focus:ring-[#163c8c]/20 pr-10 text-base"
                            placeholder="Create a password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">


                    {/* Privacy Policy */}
                    <label className="flex items-start cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('acceptPrivacy')}
                            className="w-4 h-4 text-[#163c8c] border-gray-300 rounded focus:ring-[#163c8c]/20 mt-0.5"
                        />
                        <span className="ml-2 text-[#0F172B]/70 text-sm leading-relaxed">
                            I agree to the{' '}
                            <button
                                type="button"
                                className="text-[#163c8c] hover:text-[#163c8c]/80 transition-colors underline"
                            >
                                Privacy Policy
                            </button>{' '}
                            and{' '}
                            <button
                                type="button"
                                className="text-[#163c8c] hover:text-[#163c8c]/80 transition-colors underline"
                            >
                                Terms of Service
                            </button>
                        </span>
                    </label>
                    {errors.acceptPrivacy && (
                        <p className="text-red-500 text-xs mt-1">{errors.acceptPrivacy.message}</p>
                    )}
                </div>

                {/* Sign Up Button */}
                <Button
                    type="submit"

                    disabled={isLoading}
                    className="w-full h-11 cursor-pointer bg-[#163c8c] hover:bg-[#163c8c]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Creating account...
                        </div>
                    ) : (
                        'Sign up'
                    )}
                </Button>
            </form>
        </div>
    );
}
export default Signup