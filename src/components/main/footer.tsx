import Link from "next/link";
import {
    ChevronDown,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
} from "lucide-react";

const Footer = (): React.JSX.Element => {
    return (
        <footer className="bg-white border-t border-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto">
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
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full h-12 rounded-full border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full px-6 py-2 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Featured Hotels
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Popular Destinations
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Travel Guides
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Special Offers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Booking Policies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Cancellation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-travel-gray-900 mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Partners
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-travel-gray-600 hover:text-travel-blue transition-colors"
                                >
                                    Terms & Conditions
                                </Link>
                            </li>
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
                        <div className="flex items-center gap-4 text-travel-gray-600">
                            <div className="flex items-center gap-1">
                                <span>English</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="flex items-center gap-1">
                                <span>USD</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="#"
                                className="text-travel-blue hover:text-travel-blue-600 transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-travel-blue hover:text-travel-blue-600 transition-colors"
                            >
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-travel-blue hover:text-travel-blue-600 transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-travel-blue hover:text-travel-blue-600 transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-travel-blue hover:text-travel-blue-600 transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
