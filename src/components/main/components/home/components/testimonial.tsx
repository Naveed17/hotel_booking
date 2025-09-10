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
    <section className="py-20 px-4 bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-travel-gray-900 mb-4 font-urbanist">
              What Our<br />Guests Are Saying
            </h2>
          </div>
          <div className="flex flex-col items-end gap-4">
            <p className="text-travel-gray-600 text-lg max-w-md">
              See why travelers trust us — real reviews of comfort, convenience, and unforgettable stays.
            </p>

            {/* Custom Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                className="w-11 h-11 cursor-pointer bg-white hover:bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                className="w-11 h-11 cursor-pointer bg-travel-blue-600 hover:bg-travel-blue-700 rounded-full flex items-center justify-center transition-colors shadow-sm"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
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
            {testimonials?.filter((t: any) => t.status === "1")?.map((testimonial: any) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
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