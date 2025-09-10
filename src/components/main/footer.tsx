'use client'
import Link from "next/link";
import {
    ChevronDown,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { z } from "zod";
import { newsLetter } from "@src/actions";
import { Alert } from "@components/ui/alert";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@lib/redux/store";
import useLocale from "@hooks/useLocale";
import Container from "@components/core/container";
import LocaleCurrencySelectors from "./components/localeCurrencySelectors";
const newsletterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Footer = (): React.JSX.Element => {
    const { locale } = useLocale();
    const [showSuccess, setShowSuccess] = useState(false);
    const { data } = useAppSelector((state) => state?.appData);
    const cms = data?.cms || [];
    const footerData = cms?.filter((item: any) => item.name === "Footer") || [];

    // Divide footerData into 3 groups (Explore, Support, Company)
    const exploreLinks = footerData.filter((_: any, i: number) => i % 3 === 0);
    const supportLinks = footerData.filter((_: any, i: number) => i % 3 === 1);
    const companyLinks = footerData.filter((_: any, i: number) => i % 3 === 2);

    const mutation = useMutation({
        mutationFn: (data: NewsletterFormData) => newsLetter(data),
        onSuccess: (data) => {
            if (data.error) {
                setError("root", { type: "manual", message: data.error });
                return;
            }
            reset();
            setShowSuccess(true);
        },
        onError: () => {
            setError("email", { type: "manual", message: "Subscription failed. Please try again." });
        },
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        setError,
    } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: { email: "" },
    });

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const onSubmit = (data: NewsletterFormData) => {
        mutation.mutate(data);
    };

    return (
        <footer className="bg-white border-t border-gray-100 py-16 px-4">
            <Container className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-travel-blue mb-4 font-urbanist">
                            Top Tier Travel
                        </h3>
                        <p className="text-travel-gray-600 mb-6 max-w-md">
                            Unlock extraordinary stays with our expert-curated hotels and
                            exclusive access to the world's finest destinations.
                        </p>

                        {/* Newsletter Signup */}
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <AnimatePresence>
                                {errors.root && (
                                    <motion.div
                                        key="footer-error"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Alert variant="destructive">{errors.root.message}</Alert>
                                    </motion.div>
                                )}
                                {showSuccess && (
                                    <motion.div
                                        key="footer-success"
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

                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email"
                                        className={`w-full h-12 rounded-full border ${errors.email ? "border-red-500" : "border-gray-200"
                                            } px-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                )}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={mutation.isPending}
                                className="bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full px-6 py-2 transition-colors disabled:opacity-50"
                            >
                                {mutation.isPending ? "Submitting..." : "Subscribe"}
                            </button>
                        </form>
                    </div>

                    {/* Explore Links */}
                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Explore</h4>
                        <ul className="space-y-4">
                            {exploreLinks.map((item: any, i: number) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item.slug_url}`}
                                        className="text-travel-gray-600 hover:text-travel-blue transition-colors capitalize"
                                    >
                                        {item.page_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            {supportLinks.map((item: any, i: number) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item.slug_url}`}
                                        className="text-travel-gray-600 hover:text-travel-blue transition-colors capitalize"
                                    >
                                        {item.page_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            {companyLinks.map((item: any, i: number) => (
                                <li key={i}>
                                    <Link
                                        href={`/${item.slug_url}`}
                                        className="text-travel-gray-600 hover:text-travel-blue transition-colors capitalize"
                                    >
                                        {item.page_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-gray-100">
                    <p className="text-travel-gray-600 mb-4 sm:mb-0">
                        © 2025 PHPTARVELS All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        {/* Language & Currency */}
                        <LocaleCurrencySelectors />

                        {/* Social Media */}
                        <div className="flex items-center gap-4">
                            <a href={data?.app?.social_facebook || "#"} className="text-travel-blue hover:text-travel-blue-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                            <a href={data?.app?.social_twitter || "#"} className="text-travel-blue hover:text-travel-blue-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href={data?.app?.social_instagram || "#"} className="text-travel-blue hover:text-travel-blue-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href={data?.app?.social_linkedin || "#"} className="text-travel-blue hover:text-travel-blue-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href={data?.app?.social_youtube || "#"} className="text-travel-blue hover:text-travel-blue-600 transition-colors"><Youtube className="w-5 h-5" /></a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
