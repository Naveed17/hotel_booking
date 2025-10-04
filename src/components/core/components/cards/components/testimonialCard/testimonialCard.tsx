'use client';
import { Star, Quote, MapPin, Calendar } from "lucide-react";
import React from "react";

const TestimonialCard = ({ ...props }): React.JSX.Element => {
    const { testimonial } = props;
    const rating = Math.round(Number(testimonial.rating));

    return (
        <article className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
            {/* Quote decoration */}
            <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-blue-600" />
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Content Section */}
                <div className="flex-1 p-8">
                    {/* Profile Section */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-pink-100">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-white font-bold">✓</span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">
                                {testimonial.name}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-3 h-3" />
                                <span>{testimonial.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                            {rating}.0 out of 5
                        </span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                        "{testimonial.comment}"
                    </blockquote>

                    {/* Travel Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Traveled in March 2024</span>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-2/5 relative">
                    <div className="h-64 md:h-full relative overflow-hidden">
                        <img
                            src={testimonial.photo}
                            alt="Travel experience"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        {/* Floating badge */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                            <span className="text-sm font-semibold text-gray-900">Verified Stay</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-500"></div>
        </article>
    )
}
export default TestimonialCard;