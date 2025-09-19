import React from "react";

const HotelCardLoading = ({ viewMode }: { viewMode: "grid" | "list" }) => {
    return (
        <div
            className={`bg-white rounded border border-gray-200 overflow-hidden animate-pulse ${viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
        >
            {/* Image placeholder */}
            <div
                className={`bg-gray-200 ${viewMode === "list"
                    ? "sm:w-80 flex-shrink-0 h-48 sm:h-full"
                    : "h-60 sm:h-72 lg:h-80"
                    }`}
            />

            {/* Content placeholder */}
            <div className="p-4 lg:p-6 flex-1 space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />

                <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
                <div className="flex gap-2 mt-6">
                    <div className="h-10 bg-gray-200 rounded w-full" />

                </div>
            </div>
        </div>
    );
};
export default HotelCardLoading
