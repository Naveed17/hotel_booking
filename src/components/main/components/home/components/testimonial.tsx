"use client"

import { TestimonialCard } from "@components/core/components/cards";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Container from "@components/core/container";
import { useAppSelector } from "@lib/redux/store";


const Testimonial = (): React.JSX.Element => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const testimonials = useAppSelector((state) => state?.appData.data?.testimonials);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <Container>
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            REAL STORIES FROM REAL TRAVELERS
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-urbanist">
            What Our Guests Are Saying
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Hear from thousands of satisfied travelers who've experienced the magic of our curated journeys.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative">
          <Swiper
            onSwiper={setSwiperInstance}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-300',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-travel-blue-600',
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },

            }}
            className="!pb-12"
          >
            {testimonials
              ?.filter((t: any) => t.status === "1")
              ?.map((testimonial: any) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} />
                </SwiperSlide>
              ))}
          </Swiper>

          {/* Centered Arrows */}
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="hidden md:flex absolute z-50 top-[calc(50%-24px)] -translate-y-1/2 -left-5 w-11 h-11 cursor-pointer bg-white hover:bg-gray-100 border border-gray-200 rounded-full items-center justify-center transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="hidden md:flex absolute z-50 top-[calc(50%-24px)] -translate-y-1/2 -right-5 w-11 h-11 cursor-pointer bg-travel-blue-600 hover:bg-travel-blue-700 rounded-full items-center justify-center transition-colors shadow-sm"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </Container>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-pagination-bullet {
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          opacity: 1 !important;
        }
        
        .swiper-pagination-bullet-active {
          transform: scale(1.2);
        }
        
        .swiper-slide {
          height: auto !important;
        }
      `}</style>
    </section>
  )
}

export default Testimonial