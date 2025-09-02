const whyChooseUsFeatures = [
    {
        title: "Best Price Guarantee",
        description: "Enjoy unbeatable value with the lowest prices, backed by our promise of quality and comfort.",
        buttonText: "Book with Confidence",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/ad4ec58f91fec7618bdbbdc08aedd8477de0dc1b?width=428"
    },
    {
        title: "Easy & Quick Booking",
        description: "Book your stay in just a few clicks — fast, simple, and hassle-free from start to finish.",
        buttonText: "Start Booking",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/31b46cba87268f6f6551e46a63451f261ad3abdc?width=532"
    },
    {
        title: "Customer Care 24/7",
        description: "We're here for you anytime, anywhere — with dedicated support around the clock.",
        buttonText: "Contact Support",
        image: "https://api.builder.io/api/v1/image/assets/TEMP/3c2a8d460ccdadd511c66582ecce2d6499d9302d?width=680"
    }
];
const WhyUs = (): React.JSX.Element => {
    return (

        <section className="py-20 px-4" >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-travel-gray-900 mb-4 font-urbanist">
                        Why Choose Us
                    </h2>
                    <p className="text-travel-gray-600 text-lg max-w-lg mx-auto">
                        Experience world-class comfort and unmatched hospitality — all in the heart of paradise.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyChooseUsFeatures.map((feature, index) => (
                        <article key={index} className="group">
                            <div className="overflow-hidden rounded-2xl bg-travel-blue text-white border-none shadow-lg relative transition-transform duration-300 hover:scale-105">
                                {/* Feature Content */}
                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 font-urbanist">
                                        {feature.title}
                                    </h3>
                                    <p className="text-white/80 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <button className="bg-white text-travel-blue hover:bg-gray-100 rounded-full px-6 py-2 font-medium transition-colors">
                                        {feature.buttonText}
                                    </button>
                                </div>

                                {/* Background Image */}
                                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}


export default WhyUs 
