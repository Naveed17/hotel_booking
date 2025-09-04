
import { Button } from "@components/ui/button";
export default function Header({ ...props }: { dictionary: any }): React.JSX.Element {
    const { dictionary } = props;
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-[90px]">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-travel-blue font-urbanist">
                            Top Tier Travel
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#hotels" className="text-travel-gray-600 hover:text-travel-blue transition-colors font-medium">
                            {dictionary?.header?.hotels}
                        </a>
                        <a href="#contact" className="text-travel-gray-600 hover:text-travel-blue transition-colors font-medium">
                            Contact
                        </a>
                        <a href="#support" className="text-travel-gray-600 hover:text-travel-blue transition-colors font-medium">
                            Support
                        </a>
                    </nav>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-3">
                        <Button variant="outline" className="border-travel-gray-800 text-travel-gray-800 hover:bg-travel-gray-50 rounded-full px-6">
                            Sign up
                        </Button>
                        <Button className="bg-travel-blue hover:bg-travel-blue-600 text-white rounded-full px-6">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
