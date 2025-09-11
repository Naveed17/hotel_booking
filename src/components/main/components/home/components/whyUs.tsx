'use client'
import Container from "@components/core/container";
import { useAppSelector } from "@lib/redux/store";
import { useRouter } from "next/navigation";
const WhyUs = (): React.JSX.Element => {
    const whyChooseUsFeatures = useAppSelector((state) => state?.appData.data?.our_services);
    const router = useRouter();
    return (

        <section className="py-20" >
            <Container>
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
                    {whyChooseUsFeatures?.map((feature: any, index: number) => (
                        <article key={index} className="group">
                            <div className="overflow-hidden rounded-2xl bg-travel-blue text-white border-none shadow-lg relative transition-transform duration-300 hover:scale-105">
                                {/* Feature Content */}
                                <div className="p-8 relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 font-urbanist">
                                        {feature?.title}
                                    </h3>
                                    <p className="text-white/80 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>
                                    <button onClick={() => router.push(`/${feature.slug}`)} className="bg-white text-travel-blue hover:bg-gray-100 rounded-full px-6 py-2 font-medium cursor-pointer transition-colors">
                                        {feature.button_text}
                                    </button>
                                </div>

                                {/* Background Image */}
                                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                                    <img
                                        src={feature.background_image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    )
}


export default WhyUs 
