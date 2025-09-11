'use client'
import React, { useState, useEffect } from "react";
import { newsLetter } from "@src/actions";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert } from "@components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@components/core/container";

// ✅ Zod validation schema
const newsletterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = (): React.JSX.Element => {
    // ✅ Local state for showing success
    const [showSuccess, setShowSuccess] = useState(false);

    // ✅ React Hook Form setup
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setError,
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            name: "",
            email: "",
        },
    });

    // ✅ React Query mutation
    const mutation = useMutation({
        mutationFn: (data: NewsletterFormData) => newsLetter(data),
        onSuccess: (data) => {
            if (data.error) {
                setError("root", { type: "manual", message: data.error });
                return;
            }

            reset(); // clear form after success
            setShowSuccess(true); // show success alert

            // hide after 3s
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        },
        onError: () => {
            setError("email", { type: "manual", message: "Subscription failed. Please try again." });
        },
    });

    // ✅ Handle submit
    const onSubmit = (data: NewsletterFormData) => {
        mutation.mutate(data);
    };

    return (
        <section className="py-20 px-4">
            <Container>
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Newsletter Image */}
                    <div className="lg:w-1/2">
                        <img
                            src="https://api.builder.io/api/v1/image/assets/TEMP/c2d705ffb3e356d78a88075f7eb97b8771651af6?width=1396"
                            alt="Travel journey"
                            className="w-full h-96 object-cover rounded-6xl"
                        />
                    </div>

                    {/* Newsletter Content */}
                    <div className="lg:w-1/2">
                        <div className="inline-block bg-black/60 text-white px-3 py-1 rounded text-sm mb-6">
                            Newsletter
                        </div>

                        <h2 className="text-4xl font-bold text-travel-gray-900 mb-6 font-urbanist">
                            Your Travel<br />Journey Starts Here
                        </h2>

                        <p className="text-travel-gray-600 text-lg mb-8 leading-relaxed">
                            Begin your adventure with handpicked stays, exclusive deals, and effortless booking — everything you need for a perfect getaway, all in one place.
                        </p>

                        {/* Newsletter Form */}
                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

                            <AnimatePresence>
                                {errors.root && (
                                    <motion.div
                                        key="error-alert"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Alert variant="destructive">
                                            {errors.root.message}
                                        </Alert>
                                    </motion.div>
                                )}

                                {showSuccess && (
                                    <motion.div
                                        key="success-alert"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Alert variant="success">
                                            Successfully subscribed to the newsletter!
                                        </Alert>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-col gap-4 flex-1">
                                    {/* Name */}
                                    <Controller
                                        name="name"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder="Name"
                                                className={`w-full h-12 bg-gray-100 border ${errors.name ? "border-red-500" : "border-transparent"
                                                    } rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm">{errors.name.message}</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 flex-1">
                                    {/* Email */}
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="email"
                                                placeholder="Email"
                                                className={`w-full h-12 bg-gray-100 border ${errors.email ? "border-red-500" : "border-transparent"
                                                    } rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="w-full h-12 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                            >
                                {mutation.isPending ? "Submitting..." : "Continue"}
                            </button>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
