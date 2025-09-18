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
                            <div className="relative overflow-hidden flex flex-col rounded-2xl bg-travel-blue text-white border-none shadow-lg transition-transform duration-300 hover:scale-105">

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow z-10">
                                    <h3 className="text-2xl font-bold mb-4 font-urbanist">
                                        {feature?.title}
                                    </h3>

                                    {/* Fixed 3 lines */}
                                    <div className="text-white/80 mb-8 leading-relaxed line-clamp-3">
                                        {feature?.description}
                                    </div>

                                    {/* Button */}
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => router.push(`/${feature.slug}`)}
                                            className="bg-white text-travel-blue hover:bg-gray-100 rounded-full px-6 py-2 font-medium cursor-pointer transition-colors"
                                        >
                                            {feature.button_text}
                                        </button>
                                    </div>
                                </div>

                                {/* Image normalized */}
                                <div className={`absolute ${index === 0 ? '-bottom-6 -right-6' : '-bottom-2 -right-2'}   w-36 h-36 rounded-full flex items-center justify-center`}>
                                    <img
                                        src={feature.background_image}
                                        alt={feature.title}
                                        className={`w-full h-full object-cover ${index === 0 ? 'scale-[0.7]' : ''}`}
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
