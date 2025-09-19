'use client'
import Container from "@components/core/container";
import { useAppSelector } from "@lib/redux/store";
import { useRouter } from "next/navigation";
import { Shield, Award, Users, Zap, Heart, ArrowRight } from "lucide-react";

const WhyUs = (): React.JSX.Element => {
    const whyChooseUsFeatures = useAppSelector((state) => state?.appData.data?.our_services);
    const router = useRouter();
    
    const getFeatureIcon = (index: number) => {
        const icons = [Shield, Award, Users, Zap, Heart];
        const Icon = icons[index % icons.length];
        return <Icon className="w-8 h-8" />;
    };
    
    const getColorScheme = (index: number) => {
        const schemes = [
            { bg: 'from-purple-600 to-indigo-700', accent: 'bg-purple-100 text-purple-700' },
            { bg: 'from-orange-500 to-red-600', accent: 'bg-orange-100 text-orange-700' },
            { bg: 'from-teal-500 to-cyan-600', accent: 'bg-teal-100 text-teal-700' }
        ];
        return schemes[index % schemes.length];
    };
    
    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
            <Container>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                        WHY TRAVELERS CHOOSE US
                    </div>
                    <h2 className="text-5xl font-black text-gray-900 mb-6 font-urbanist bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                        We're not just another travel platform. We're your trusted partner in creating extraordinary memories that last a lifetime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {whyChooseUsFeatures?.map((feature: any, index: number) => {
                        const colorScheme = getColorScheme(index);
                        return (
                            <article 
                                key={index} 
                                className="group transform transition-all duration-500 hover:-translate-y-2"
                            >
                                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                                    <div className={`h-2 bg-gradient-to-r ${colorScheme.bg}`}></div>
                                    
                                    <div className="p-8 flex flex-col h-full">
                                        <div className={`w-16 h-16 ${colorScheme.accent} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            {getFeatureIcon(index)}
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-urbanist">
                                            {feature?.title}
                                        </h3>

                                        <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                            {feature?.description}
                                        </p>

                                        <button
                                            onClick={() => router.push(`/${feature.slug}`)}
                                            className={`group/btn bg-gradient-to-r ${colorScheme.bg} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2`}
                                        >
                                            {feature.button_text}
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
                                </div>
                            </article>
                        );
                    })}
                </div>
                
                <div className="text-center mt-16">
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to experience the difference?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join over 100,000+ satisfied travelers who chose us for their perfect getaway
                        </p>
                        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                            Start Your Journey
                        </button>
                    </div>
                </div>
            </Container>
        </section>
    )
}


export default WhyUs 
