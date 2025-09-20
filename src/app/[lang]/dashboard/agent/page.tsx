'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AgentDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your customers and bookings</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Customers"
            value="156"
            change="+12 this month"
            changeType="positive"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Active Bookings"
            value="89"
            change="+23 this week"
            changeType="positive"
            icon={BookOpen}
            color="green"
          />
          <StatsCard
            title="Revenue"
            value="$45,230"
            change="+15% from last month"
            changeType="positive"
            icon={DollarSign}
            color="purple"
          />
          <StatsCard
            title="Conversion Rate"
            value="68%"
            change="+5% improvement"
            changeType="positive"
            icon={TrendingUp}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Activity</h3>
            <div className="space-y-4">
              {[
                { customer: 'John Smith', action: 'Booked Paris Tour', time: '2 hours ago', amount: '$299' },
                { customer: 'Sarah Johnson', action: 'Hotel Reservation', time: '4 hours ago', amount: '$450' },
                { customer: 'Mike Wilson', action: 'Flight Booking', time: '6 hours ago', amount: '$680' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.customer}</p>
                    <p className="text-sm text-gray-500">{activity.action} • {activity.time}</p>
                  </div>
                  <span className="font-semibold text-green-600">{activity.amount}</span>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-medium text-yellow-900">Follow up with 3 customers</p>
                <p className="text-sm text-yellow-600">Booking confirmations pending</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">Process 5 refund requests</p>
                <p className="text-sm text-blue-600">Review and approve cancellations</p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-medium text-green-900">Update tour availability</p>
                <p className="text-sm text-green-600">March schedule updates needed</p>
              </div>
            </div>
          </motion.div>
        </div>
    </div>
  );
};

export default AgentDashboard;