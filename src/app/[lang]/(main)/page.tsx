import { FeaturedDestinations, Hero, FeaturedHotels, FeaturedFlights, WhyUs, Newsletter, Testimonials } from "@components/main";

export default function Page(): React.JSX.Element {
    return <>
        {/* Hero Section */}
        <Hero />
        {/* Featured Destinations */}
        <FeaturedDestinations />
        {/* Featured Hotels */}
        <FeaturedHotels />
        {/* Featured Flights */}
        <FeaturedFlights />
        {/* Why Us Section */}
        <WhyUs />
        {/* Testimonials */}
        <Testimonials />
        {/* News Letter */}
        <Newsletter />


    </>
}
