
'use client'
import Container from "@components/core/container";
import { useUser } from "@hooks/use-user";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import UserDropdown from "./userDropdown";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
export default function Header({ ...props }: { dictionary: any }): React.JSX.Element {
    const { dictionary } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };


    const pathname = usePathname();
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);
    const router = useRouter()
    const { user, isLoading } = useUser();
    return (
        <>
            <header className="fixed w-full top-0 z-50 pt-4">
                <Container>
                    <div className="bg-white/95 backdrop-blur-lg border border-gray-200/50 rounded-full shadow-sm">
                        <div className="flex items-center justify-between h-16 px-3">
                            {/* Logo */}
                            <div className="flex-shrink-0 cursor-pointer md:ps-5" onClick={() => router.push('/')}>
                                <h1 className="text-2xl font-black text-gray-900 tracking-tight hover:text-blue-600 transition-colors duration-300">
                                    Travel
                                </h1>
                            </div>

                            {/* Desktop Navigation - Centered */}
                            <nav className="hidden lg:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
                                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-base transition-all duration-300 relative group">
                                    Hotels
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-base transition-all duration-300 relative group">
                                    Destinations
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-base transition-all duration-300 relative group">
                                    About
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                                <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-base transition-all duration-300 relative group">
                                    Contact
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            </nav>



                            {/* Right Side Actions */}
                            <div className={`flex items-center ${user ? 'space-x-4' : ''}`}>
                                {/* Mobile Menu Button */}
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
                                >
                                    {mobileMenuOpen ? (
                                        <X className="h-6 w-6 text-gray-700" />
                                    ) : (
                                        <Menu className="h-6 w-6 text-gray-700" />
                                    )}
                                </button>
                                {/* User Actions */}
                                {user ? (
                                    <>
                                        <UserDropdown />
                                    </>
                                ) : (
                                    !isLoading && (
                                        <div className="hidden lg:flex items-center space-x-3">
                                            <button
                                                onClick={() => router.push('/auth/sign-in')}
                                                className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 transition-all duration-300"
                                            >
                                                Sign In
                                            </button>
                                            <button
                                                onClick={() => router.push('/auth/signup')}
                                                className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105"
                                            >
                                                Sign Up
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>

                        </div>

                        {/* Enhanced Mobile Menu */}
                        <AnimatePresence>
                            {mobileMenuOpen && (
                                <motion.div
                                    key="mobile-menu"
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={menuVariants}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="lg:hidden absolute top-full left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-xl z-50 mt-2"
                                >
                                    <div className="px-6 py-8">
                                        {/* Mobile Navigation Links */}
                                        <nav className="space-y-6 mb-8">
                                            <Link
                                                href="/"
                                                className="block text-gray-700 hover:text-gray-900 font-medium text-lg transition-all duration-300"
                                            >
                                                Hotels
                                            </Link>
                                            <Link
                                                href="/destinations"
                                                className="block text-gray-700 hover:text-gray-900 font-medium text-lg transition-all duration-300"
                                            >
                                                Destinations
                                            </Link>
                                            <Link
                                                href="/about"
                                                className="block text-gray-700 hover:text-gray-900 font-medium text-lg transition-all duration-300"
                                            >
                                                About
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="block text-gray-700 hover:text-gray-900 font-medium text-lg transition-all duration-300"
                                            >
                                                Contact
                                            </Link>
                                        </nav>

                                        {/* Mobile Auth Buttons */}
                                        {!isLoading && !user && (
                                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                                <button
                                                    onClick={() => router.push('/auth/sign-in')}
                                                    className="w-full text-gray-700 hover:text-gray-900 font-medium py-3 text-center transition-all duration-300"
                                                >
                                                    Sign In
                                                </button>
                                                <button
                                                    onClick={() => router.push('/auth/signup')}
                                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 rounded-full transition-all duration-300"
                                                >
                                                    Sign Up
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Container>
            </header>
        </>
    );
}
