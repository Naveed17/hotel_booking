import { ImageWithFallback } from "@components/ui/ImageWithFallback";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1682685797898-6d7587974771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTczNjY4MTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Desert landscape travel destination"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Branding Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Top Tier Travel</h1>
            <p className="text-xl text-white/90 max-w-md leading-relaxed">
              Discover extraordinary destinations and create unforgettable memories
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Dynamic Form */}
      <div className="flex-1 lg:max-w-md xl:max-w-lg flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
