'use client'
import React, { useState, useEffect } from "react";
import { newsLetter } from "@src/actions";
import { useMutation } from "@tanstack/react-query";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Alert } from "@components/core/alert";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@components/core/container";


const newsletterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = (): React.JSX.Element => {
    const [showSuccess, setShowSuccess] = useState(false);


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


    const onSubmit = (data: NewsletterFormData) => {
        mutation.mutate(data);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
            <Container>
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
                            STAY IN THE LOOP
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-urbanist bg-gradient-to-r from-gray-900 to-cyan-600 bg-clip-text text-transparent">
                            Your Travel Journey Starts Here
                        </h2>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
                            Get exclusive travel deals, insider tips, and destination inspiration delivered straight to your inbox.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-2/5 relative">
                                <div className="h-64 lg:h-full relative overflow-hidden">
                                    <img
                                        src="/images/news-letter.jpg"
                                        alt="Travel journey"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20" />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                                        <span className="text-sm font-semibold text-gray-900">🌍 50K+ Subscribers</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-3/5 p-8 px-6 lg:px-0 lg:p-12">

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
                                        <div className="flex-1">
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

                                        <div className="flex-1">
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

                                    <button
                                        type="submit"
                                        disabled={mutation.isPending}
                                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {mutation.isPending ? "Subscribing..." : "Subscribe Now"}
                                    </button>

                                    {/* Additional Information */}
                                    <div className="mt-6 space-y-4">
                                        <div className="flex flex-col md:flex-row md:items-center justify-center gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                <span>Weekly travel deals</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                <span>Destination guides</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                                <span>Travel tips</span>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 mb-2">
                                                Join thousands of travelers who save up to 40% on their trips
                                            </p>

                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Newsletter;
