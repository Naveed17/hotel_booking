'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Star, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const CustomerDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your bookings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Bookings"
            value="12"
            change="+2 this month"
            changeType="positive"
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Upcoming Trips"
            value="3"
            change="Next: March 15"
            changeType="neutral"
            icon={Calendar}
            color="green"
          />
          <StatsCard
            title="Total Spent"
            value="$2,450"
            change="+$340 this month"
            changeType="positive"
            icon={TrendingUp}
            color="purple"
          />
          <StatsCard
            title="Average Rating"
            value="4.8"
            change="Based on 8 reviews"
            changeType="positive"
            icon={Star}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {[
                { name: 'Paris City Tour', date: 'March 15, 2024', status: 'Confirmed', type: 'tour' },
                { name: 'Hotel Grand Plaza', date: 'March 20, 2024', status: 'Confirmed', type: 'hotel' },
                { name: 'Flight to Tokyo', date: 'April 5, 2024', status: 'Pending', type: 'flight' }
              ].map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.name}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-medium text-blue-900">Book a Hotel</p>
                <p className="text-sm text-blue-600">Find your perfect stay</p>
              </button>
              <button className="w-full text-left p-3 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors">
                <p className="font-medium text-emerald-900">Book a Tour</p>
                <p className="text-sm text-emerald-600">Explore new destinations</p>
              </button>
              <button className="w-full text-left p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors">
                <p className="font-medium text-sky-900">Book a Flight</p>
                <p className="text-sm text-sky-600">Plan your next journey</p>
              </button>
            </div>
          </motion.div>
        </div>
    </div>
  );
};

export default CustomerDashboard;