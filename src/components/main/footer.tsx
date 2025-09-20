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
import { Alert } from "@components/core/alert";
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
        <footer className="bg-gradient-to-br from-gray-900 to-slate-800 text-white pt-20 pb-8">
            {/* Brand Info */}
            <Container>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                        TRUSTED BY 100K+ TRAVELERS
                    </div>
                    <h3 className="text-4xl font-black mb-4 font-urbanist bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Travels Website
                    </h3>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        Your gateway to extraordinary adventures. We curate the world's finest experiences,
                        connecting you with unforgettable destinations and premium accommodations.
                    </p>
                </div>
            </Container>
            <Container>
                {/* === Top Row: Brand + Newsletter === */}

                {/* === Links Grid === */}
                <div className="grid grid-cols-1 md:grid-cols-8 gap-12 mb-16">
                    <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-12">
                        <div className="group">
                            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                Explore
                            </h4>
                            <ul className="space-y-4">
                                {exploreLinks.map((item: any, i: number) => (
                                    <li key={i}>
                                        <Link
                                            href={`/${item.slug_url}`}
                                            className="text-gray-300 hover:text-blue-400 transition-all duration-300 capitalize hover:translate-x-1 inline-block"
                                        >
                                            {item.page_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="group">
                            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                                Support
                            </h4>
                            <ul className="space-y-4">
                                {supportLinks.map((item: any, i: number) => (
                                    <li key={i}>
                                        <Link
                                            href={`/${item.slug_url}`}
                                            className="text-gray-300 hover:text-emerald-400 transition-all duration-300 capitalize hover:translate-x-1 inline-block"
                                        >
                                            {item.page_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="group">
                            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                Company
                            </h4>
                            <ul className="space-y-4">
                                {companyLinks.map((item: any, i: number) => (
                                    <li key={i}>
                                        <Link
                                            href={`/${item.slug_url}`}
                                            className="text-gray-300 hover:text-purple-400 transition-all duration-300 capitalize hover:translate-x-1 inline-block"
                                        >
                                            {item.page_name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="group">
                            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
                                <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                                Downloads
                            </h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-1 inline-block">iOS App</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-all duration-300 hover:translate-x-1 inline-block">Android App</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-span-2">

                        <h4 className="font-bold text-white mb-4 text-lg flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                            Stay Connected
                        </h4>


                        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
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
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                            >
                                {mutation.isPending ? "Submitting..." : "Join Now"}
                            </button>
                        </form>

                    </div>
                </div>

                {/* === Bottom Bar === */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
                    <p className="text-center md:text-left text-sm text-gray-400">
                        © 2025 Travels Website. All rights reserved. Made with ❤️ for travelers worldwide.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <LocaleCurrencySelectors />

                        <div className="flex items-center gap-3">
                            <a href={data?.app?.social_facebook || "#"} className="w-10 h-10 bg-white/10 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a href={data?.app?.social_twitter || "#"} className="w-10 h-10 bg-white/10 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a href={data?.app?.social_instagram || "#"} className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a href={data?.app?.social_linkedin || "#"} className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                            <a href={data?.app?.social_youtube || "#"} className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>

    );
};

export default Footer;
