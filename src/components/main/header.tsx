
import Container from "@components/core/container";
import { Button } from "@components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
export default function Header({ ...props }: { dictionary: any }): React.JSX.Element {
    const { dictionary } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <Container>
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold logo">Top Tier Travel</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        <a href="#" className="text-text-muted hover:text-brand-blue transition-colors text-sm xl:text-base">Hotels</a>
                        <a href="#" className="text-text-muted hover:text-brand-blue transition-colors text-sm xl:text-base">Contact</a>
                        <a href="#" className="text-text-muted hover:text-brand-blue transition-colors text-sm xl:text-base">Support</a>
                    </nav>
                    <div className="sm:min-w-md" />


                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5 text-brand-blue" />
                        ) : (
                            <Menu className="h-5 w-5 text-brand-blue" />
                        )}
                    </button>

                    {/* Desktop Menu Button */}
                    <button className="hidden md:block lg:hidden p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                        <Menu className="h-5 w-5 text-brand-blue" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 py-4 space-y-4">


                        {/* Mobile Navigation Links */}
                        <nav className="space-y-2">
                            <a href="#" className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors">Hotels</a>
                            <a href="#" className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors">Contact</a>
                            <a href="#" className="block px-3 py-2 text-text-muted hover:text-brand-blue hover:bg-gray-50 rounded-lg transition-colors">Support</a>
                        </nav>
                    </div>
                )}
            </Container>
        </header>
    );
}
