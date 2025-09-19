import { NextResponse } from "next/server";

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockAppData = {
    status: true,
    data: {
      app: {
        business_name: "TopTier Travel",
        home_title: "TopTier Travel - Premium Hotel Booking",
        site_url: "https://toptier-travel.com",
        meta_description:
          "Book premium hotels worldwide with TopTier Travel. Find the best deals on luxury accommodations.",
        header_logo_img:
          "https://via.placeholder.com/200x60/2563eb/ffffff?text=TopTier+Travel",
        favicon_img: "https://via.placeholder.com/32x32/2563eb/ffffff?text=T",
        contact_email: "info@toptier-travel.com",
        contact_phone: "+1-800-TOPTIER",
        currency: "USD",
        language: "en",
        social_facebook: "https://facebook.com/toptiertravel",
        social_twitter: "https://twitter.com/toptiertravel",
        social_instagram: "https://instagram.com/toptiertravel",
        social_linkedin: "https://linkedin.com/company/toptiertravel",
        social_youtube: "https://youtube.com/toptiertravel",
      },
      featured_tours: [
        {
          id: "1",
          title: "Dubai Marina",
          description:
            "Experience luxury in the heart of Dubai's stunning marina district",
          image:
            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
          price: "From $299",
          location: "Dubai, UAE",
          rating: 4.8,
        },
        {
          id: "2",
          title: "Istanbul Historic",
          description:
            "Discover the rich history and culture of Istanbul's old city",
          image:
            "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&h=600&fit=crop",
          price: "From $199",
          location: "Istanbul, Turkey",
          rating: 4.7,
        },
        {
          id: "3",
          title: "London Explorer",
          description: "Explore iconic landmarks and hidden gems in London",
          image:
            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
          price: "From $399",
          location: "London, UK",
          rating: 4.9,
        },
      ],
      featured_hotels: [
        {
          id: "1",
          name: "Grand Palace Hotel",
          location: "Dubai Marina",
          image:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
          price: 450,
          rating: 4.8,
          stars: 5,
          amenities: ["WiFi", "Pool", "Spa"],
        },
        {
          id: "2",
          name: "City Center Inn",
          location: "Downtown",
          image:
            "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
          price: 280,
          rating: 4.2,
          stars: 4,
          amenities: ["WiFi", "Business Center"],
        },
        {
          id: "3",
          name: "Beach Resort Paradise",
          location: "Beachfront",
          image:
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
          price: 650,
          rating: 4.9,
          stars: 5,
          amenities: ["WiFi", "Pool", "Beach Access"],
        },
      ],
      testimonials: [
        {
          id: "1",
          name: "Sarah Johnson",
          location: "New York, USA",
          rating: 5,
          comment:
            "Amazing service and beautiful hotels. TopTier Travel made our vacation unforgettable!",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          status: "1",
          photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        },
        {
          id: "2",
          name: "Ahmed Al-Rashid",
          location: "Dubai, UAE",
          rating: 5,
          comment:
            "Professional service and excellent hotel recommendations. Highly recommended!",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          status: "1",
          photo: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        },
      ],
      our_services: [
        {
          title: "Best Price Guarantee",
          description:
            "We guarantee the best prices for your hotel bookings with our price match promise.",
          button_text: "Learn More",
          slug: "price-guarantee",
          background_image:
            "/images/png-right-tick-icon-jewelry-purple-white-background 1.png",
        },
        {
          title: "24/7 Customer Support",
          description:
            "Our dedicated support team is available around the clock to assist you.",
          button_text: "Contact Us",
          slug: "support",
          background_image: "/images/34449178_calendar_lima_84 1.png",
        },
        {
          title: "Instant Confirmation",
          description:
            "Get instant booking confirmation and peace of mind for your travels.",
          button_text: "Book Now",
          slug: "booking",
          background_image:
            "/images/144152676_98453b34-9cb4-42bf-8c80-5950a6a7111a 1.png",
        },
      ],
      languages: [
        {
          id: "1",
          name: "English",
          language_code: "en",
          status: "1",
        },
        {
          id: "2",
          name: "العربية",
          language_code: "ar",
          status: "1",
        },
      ],
      currencies: [
        {
          id: "1",
          name: "US Dollar",
          iso: "USD",
          status: "1",
        },
        {
          id: "2",
          name: "Euro",
          iso: "EUR",
          status: "1",
        },
        {
          id: "3",
          name: "British Pound",
          iso: "GBP",
          status: "1",
        },
      ],
      cms: [
        {
          id: "1",
          name: "Footer",
          page_name: "Hotels",
          slug_url: "hotels",
        },
        {
          id: "2",
          name: "Footer",
          page_name: "Help Center",
          slug_url: "help",
        },
        {
          id: "3",
          name: "Footer",
          page_name: "About Us",
          slug_url: "about",
        },
        {
          id: "4",
          name: "Footer",
          page_name: "Destinations",
          slug_url: "destinations",
        },
        {
          id: "5",
          name: "Footer",
          page_name: "Contact Support",
          slug_url: "contact",
        },
        {
          id: "6",
          name: "Footer",
          page_name: "Privacy Policy",
          slug_url: "privacy",
        },
      ],
    },
  };

  return NextResponse.json(mockAppData);
}
