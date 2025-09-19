import { ImageWithFallback } from "@components/ImageWithFallback";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Enhanced Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Stunning mountain landscape with crystal clear lake"
          className="w-full h-full object-cover scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-purple-900/40 to-cyan-900/60"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>

        {/* Enhanced Branding Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-white/20">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              TRUSTED BY 100K+ TRAVELERS
            </div>

            <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
              Travel
            </h1>

            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Embark on extraordinary journeys to breathtaking destinations. From luxury resorts to hidden gems, we curate the perfect escape for every traveler.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div>Destinations</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100K+</div>
                <div>Happy Travelers</div>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div>Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Right Side - Dynamic Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-8">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
