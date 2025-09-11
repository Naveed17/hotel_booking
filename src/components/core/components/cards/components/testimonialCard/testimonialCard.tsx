'use client';
import { Star } from "lucide-react";
import React from "react";

const TestimonialCard = ({ ...props }): React.JSX.Element => {
    const { testimonial } = props;
    const rating = Math.round(Number(testimonial.ratings));
    return (
        <article key={testimonial.id} className="flex-shrink-0 w-full max-w-4xl bg-[#F5F6F7] border-none rounded-2xl overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row">
                {/* Testimonial Content */}
                <div className="flex-1 p-8">
                    {/* Profile */}
                    <div className="flex flex-col items-start gap-4 mb-2">
                        <div className="w-15 h-15 bg-gray-300 rounded-full overflow-hidden">
                            <img
                                src={testimonial.profile_photo}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-travel-gray-900 text-[22px]">
                                {testimonial.name}
                            </h4>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                        {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-travel-orange text-travel-orange" />
                        ))}
                    </div>

                    {/* Testimonial */}
                    <h3 className="text-xl font-semibold text-travel-gray-900 mb-4 text-[22px]">
                        {testimonial.title}
                    </h3>
                    <p className="text-travel-gray-600 text-[20px] leading-relaxed">
                        {testimonial.description}
                    </p>
                </div>

                {/* Room Image */}
                <div className="md:w-1/2 h-100 relative">
                    <img
                        src={testimonial.photo}
                        alt="Hotel room"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-black/40 text-white px-3 py-1 rounded text-sm">
                        See Room
                    </div>
                </div>
            </div>
        </article>
    )
}
export default TestimonialCard;