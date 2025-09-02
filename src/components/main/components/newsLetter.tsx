'use client'
import React from "react";

const Newsletter = (): React.JSX.Element => {
    return (<section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Newsletter Image */}
                <div className="lg:w-1/2">
                    <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/c2d705ffb3e356d78a88075f7eb97b8771651af6?width=1396"
                        alt="Travel journey"
                        className="w-full h-96 object-cover rounded-3xl"
                    />
                </div>

                {/* Newsletter Content */}
                <div className="lg:w-1/2">
                    <div className="inline-block bg-black/60 text-white px-3 py-1 rounded text-sm mb-6">
                        Newsletter
                    </div>

                    <h2 className="text-4xl font-bold text-travel-gray-900 mb-6 font-urbanist">
                        Your Travel<br />Journey Starts Here
                    </h2>

                    <p className="text-travel-gray-600 text-lg mb-8 leading-relaxed">
                        Begin your adventure with handpicked stays, exclusive deals, and effortless booking — everything you need for a perfect getaway, all in one place.
                    </p>

                    {/* Newsletter Form */}
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="flex-1 h-12 bg-gray-100 border-none rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="flex-1 h-12 bg-gray-100 border-none rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full h-12 bg-travel-blue hover:bg-travel-blue-600 text-white rounded-lg font-medium transition-colors"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>)
};
export default Newsletter;