"use client";
import { motion } from "framer-motion";
import { Star, Users, Shield, Zap, Globe, Code, Smartphone, Award, Gem, Download, ShieldCheck, Rocket, Mail, Palette, Database, Layers, FileCode, Repeat, Radio, Puzzle, Map, Hotel, Plane, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ShowcasePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 py-20">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
                            <Award className="w-5 h-5 text-yellow-400" />
                            <span className="text-white/90 text-sm font-medium">Premium CodeCanyon Template</span>
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black hero-gradient-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-8 leading-tight">
                            TravelNext
                        </h1>
                        <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
                            Professional Next.js 15 Travel Booking Platform with Advanced Features, Multi-Language Support & Enterprise-Grade Dashboards
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/home">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3"
                                >
                                    <Rocket className="w-5 h-5" /> Live Demo
                                </motion.button>
                            </Link>
                            <Link href="/documentation">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                                >
                                    <Code className="w-5 h-5" /> View Source
                                </motion.button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">50+</div>
                                <div className="text-white/60 text-sm">Components</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">4</div>
                                <div className="text-white/60 text-sm">Dashboard Types</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">7</div>
                                <div className="text-white/60 text-sm">Languages</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white mb-2">100%</div>
                                <div className="text-white/60 text-sm">Responsive</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-8 mb-20"
                    >
                        {[
                            { icon: Hotel, title: "Hotel Booking System", desc: "Advanced reservation management with real-time availability, interactive maps, and multi-room configurations" },
                            { icon: Plane, title: "Flight Booking Engine", desc: "Comprehensive flight search with multi-city support, seat selection, and automated e-ticket generation" },
                            { icon: MapPin, title: "Tour Package Manager", desc: "Curated travel experiences with custom itinerary builder and group booking capabilities" }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group relative"
                            >
                                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all duration-300 h-full">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-white/70 leading-relaxed">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center text-white mb-4">Enterprise-Grade Technology Stack</h2>
                        <p className="text-white/60 text-center mb-16 max-w-2xl mx-auto">Built with cutting-edge technologies for maximum performance, scalability, and developer experience</p>
                        <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-6">
                            {[
                                { name: "Next.js 15", icon: Layers },
                                { name: "TypeScript", icon: FileCode },
                                { name: "Tailwind CSS", icon: Palette },
                                { name: "Framer Motion", icon: Zap },
                                { name: "Redux Toolkit", icon: Repeat },
                                { name: "React Query", icon: Radio },
                                { name: "Radix UI", icon: Puzzle },
                                { name: "Leaflet Maps", icon: Map }
                            ].map((tech, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="text-center group"
                                >
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:shadow-2xl transition-all duration-300">
                                        <tech.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">{tech.name}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl font-bold text-white mb-4">Advanced Multi-Role Dashboard System</h2>
                        <p className="text-white/60 mb-16 max-w-2xl mx-auto">Comprehensive role-based access control with specialized interfaces for every user type</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { role: "Customer Dashboard", icon: Users, desc: "Booking history, profile management, payment methods, travel preferences", features: ["Booking History", "Profile Settings", "Payment Methods", "Travel Preferences"] },
                                { role: "Agent Dashboard", icon: Shield, desc: "Client management, booking creation, commission tracking, performance analytics", features: ["Client Management", "Commission Tracking", "Booking Creation", "Performance Reports"] },
                                { role: "Admin Dashboard", icon: Zap, desc: "User management, content control, booking oversight, financial reporting", features: ["User Management", "Content Control", "Financial Reports", "System Settings"] },
                                { role: "Super Admin", icon: Star, desc: "Complete system control, analytics, module management, audit logs", features: ["Full System Access", "Advanced Analytics", "Module Management", "Audit Logs"] }
                            ].map((dashboard, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.05 }}
                                    className="group relative"
                                >
                                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-3xl text-white relative overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                        <dashboard.icon className="w-12 h-12 mb-6 relative z-10" />
                                        <h4 className="font-bold text-white text-xl mb-3 relative z-10">{dashboard.role}</h4>
                                        <p className="text-sm opacity-90 mb-6 relative z-10">{dashboard.desc}</p>
                                        <div className="space-y-2 relative z-10">
                                            {dashboard.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-xs">
                                                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                                                    <span className="opacity-80">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Key Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mb-20"
                    >
                        <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose TravelNext?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: Globe, title: "Multi-Language Support", desc: "Built-in i18n with 7 languages, RTL support, and dynamic routing" },
                                { icon: Smartphone, title: "Mobile-First Design", desc: "Fully responsive with PWA capabilities and touch-optimized interface" },
                                { icon: Shield, title: "Enterprise Security", desc: "JWT authentication, role-based access, and comprehensive data protection" },
                                { icon: Zap, title: "High Performance", desc: "Next.js 15 optimization, lazy loading, and efficient caching strategies" },
                                { icon: Code, title: "Developer Friendly", desc: "TypeScript, clean architecture, comprehensive documentation" },
                                { icon: Star, title: "Production Ready", desc: "Battle-tested codebase with error handling and monitoring" }
                            ].map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                                    className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                                        <p className="text-white/70 text-sm">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                        className="relative mb-20"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-16 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full">
                                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-pulse delay-1000"></div>
                                <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
                            </div>
                            <div className="relative z-10">
                                <h2 className="text-5xl font-bold text-white mb-6">Ready to Launch Your Travel Empire?</h2>
                                <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">Get instant access to the complete source code, documentation, and premium support</p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-white/25 transition-all duration-300 flex items-center gap-3"
                                    >
                                        <Rocket className="w-6 h-6" /> Purchase on CodeCanyon
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                                    >
                                        <Mail className="w-6 h-6" /> Contact Support
                                    </motion.button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Gem className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="font-bold text-white mb-1">Premium Quality</div>
                                        <div className="text-white/70 text-sm">Enterprise-grade codebase</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Download className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="font-bold text-white mb-1">Instant Download</div>
                                        <div className="text-white/70 text-sm">Start building immediately</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <ShieldCheck className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="font-bold text-white mb-1">6 Months Support</div>
                                        <div className="text-white/70 text-sm">Expert assistance included</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sleek Footer */}
                    <motion.footer
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="border-t border-white/10 pt-12"
                    >
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4">TravelNext</h3>
                                <p className="text-white/60 mb-4">Professional travel booking platform built with modern technologies for the next generation of travel businesses.</p>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <Github className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <Twitter className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Features</h4>
                                <ul className="space-y-2 text-white/60">
                                    <li>Hotel Booking System</li>
                                    <li>Flight Reservations</li>
                                    <li>Tour Packages</li>
                                    <li>Multi-Language Support</li>
                                    <li>Role-Based Dashboards</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Support</h4>
                                <ul className="space-y-2 text-white/60">
                                    <li>Documentation</li>
                                    <li>Email Support</li>
                                    <li>Video Tutorials</li>
                                    <li>Community Forum</li>
                                    <li>6 Months Updates</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-8 text-center">
                            <p className="text-white/60">© {new Date().getFullYear()} TravelNext. Premium CodeCanyon Template. All rights reserved.</p>
                        </div>
                    </motion.footer>
                </div>
            </div>
        </div>
    );
}