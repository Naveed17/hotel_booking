
'use client'
import Container from "@components/core/container";
import { Button } from "@components/ui/button";
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
            <header className="bg-white border-b border-gray-100 fixed w-full top-0 z-40">
                <Container>
                    <div className="flex items-center  h-16 sm:h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold logo">Top Tier Travel</h1>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-8">
                            <a href="#" className="muted hover:text-brand-blue transition-colors text-sm xl:text-base">Hotels</a>
                            <a href="#" className="text-muted hover:text-brand-blue transition-colors text-sm xl:text-base">Contact</a>
                            <a href="#" className="text-muted hover:text-brand-blue transition-colors text-sm xl:text-base">Support</a>
                        </nav>



                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 ml-auto rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5 text-brand-blue" />
                            ) : (
                                <Menu className="h-5 w-5 text-brand-blue" />
                            )}
                        </button>

                        {/* Desktop Menu Button */}
                        <button className="hidden md:block lg:hidden p-2 ml-auto rounded-lg border border-gray-300 hover:bg-gray-50">
                            <Menu className="h-5 w-5 text-brand-blue" />
                        </button>
                        {user && (
                            <div className="ms-auto">
                                <UserDropdown />
                            </div>
                        )}
                        {!isLoading && !user && (
                            <div className="hidden lg:flex items-center space-x-3 ml-auto">
                                <Button onClick={() => router.push('/auth/signup')} variant="outline" className="border-travel-gray-800 text-travel-gray-800 hover:bg-travel-gray-50 rounded-full px-6">
                                    Sign up
                                </Button>
                                <Button onClick={() => router.push('/auth/sign-in')} className="bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full px-6">
                                    Login
                                </Button>
                            </div>
                        )}

                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                key="mobile-menu"
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={menuVariants}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="md:hidden border-t border-gray-100 py-4 space-y-4 absolute top-full left-0 w-full bg-white shadow-lg z-50"
                            >
                                {/* Mobile Navigation Links */}
                                <nav className="space-y-2 pb-3">
                                    <Link
                                        href="/"

                                        className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Hotels
                                    </Link>
                                    <Link
                                        href="/contact"

                                        className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Contact
                                    </Link>
                                    <Link
                                        href="/support"

                                        className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors"
                                    >
                                        Support
                                    </Link>
                                    {!isLoading && !user && (
                                        <div className="flex items-center space-x-3 px-3">
                                            <Button onClick={() => router.push('/auth/signup')} variant="outline" className="border-travel-gray-800 text-travel-gray-800 hover:bg-travel-gray-50 rounded-full px-6">
                                                Sign up
                                            </Button>
                                            <Button onClick={() => router.push('/auth/sign-in')} className="bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full px-6">
                                                Login
                                            </Button>
                                        </div>
                                    )}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Container>
            </header>
            <div className="md:h-20 h-10" />
        </>
    );
}
