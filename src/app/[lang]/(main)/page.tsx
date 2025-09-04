import { FeaturedDestinations, Hero, FeaturedHotels, WhyUs, Newsletter, Testimonials } from "@components/main";

export default function Page(): React.JSX.Element {
    return <>
        {/* Hero Section */}
        <Hero />
        {/* Featured Destinations */}
        <FeaturedDestinations />
        {/* Featured Hotels */}
        <FeaturedHotels />
        {/* Why Us Section */}
        <WhyUs />
        {/* Testimonials */}
        <Testimonials />
        {/* News Letter */}
        <Newsletter />


    </>
}
