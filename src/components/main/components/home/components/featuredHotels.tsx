import { HotelCard } from '@components/core/components'
import React from 'react'
const hotelCards = [
    {
        id: 1,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/ba1aba69c8c8f1792266dd8d8f353002cff78048?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 2,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/8239f269d16483860849bf664d61af0544f40814?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 3,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/0ce5f8e573dc1a432e083e7994346460081bedc4?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 4,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/ba1aba69c8c8f1792266dd8d8f353002cff78048?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 5,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/8239f269d16483860849bf664d61af0544f40814?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2

    },
    {
        id: 6,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/0ce5f8e573dc1a432e083e7994346460081bedc4?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 7,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/0ce5f8e573dc1a432e083e7994346460081bedc4?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2

    },
    {
        id: 8,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/8239f269d16483860849bf664d61af0544f40814?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
    {
        id: 9,
        image: "https://api.builder.io/api/v1/image/assets/TEMP/ba1aba69c8c8f1792266dd8d8f353002cff78048?width=810",
        name: "Marmaris Resort",
        location: "Marmaris, Turkey",
        rating: 5,
        reviews: 245,
        originalPrice: 560,
        currentPrice: 420,
        amenities: ["Private Beach", "Valet Parking", "5 Restaurants", "Fitness Center"],
        roomsLeft: 2
    },
];
function FeaturedHotels() {
    return (

        <section id="hotels" className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-travel-gray-900 mb-4 font-urbanist">
                        Featured Hotels
                    </h2>
                    <p className="text-travel-gray-600 text-lg max-w-lg mx-auto">
                        Experience world-class comfort and unmatched hospitality in the heart of paradise.
                    </p>
                </div>

                {/* Hotel Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {hotelCards.map((hotel) => (
                        <React.Fragment key={hotel.id}>
                            <HotelCard hotel={hotel} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedHotels