'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building, MapPin, Plane, BarChart3, Settings } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and management</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Users"
            value="2,847"
            change="+180 this month"
            changeType="positive"
            icon={Users}
            color="blue"
          />
          <StatsCard
            title="Hotels"
            value="1,234"
            change="+45 new listings"
            changeType="positive"
            icon={Building}
            color="green"
          />
          <StatsCard
            title="Tours"
            value="567"
            change="+23 new tours"
            changeType="positive"
            icon={MapPin}
            color="purple"
          />
          <StatsCard
            title="Flights"
            value="89,234"
            change="+12% bookings"
            changeType="positive"
            icon={Plane}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Analytics</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Analytics Chart Placeholder</p>
              </div>
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
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-blue-900">Manage Users</p>
                    <p className="text-sm text-blue-600">View and edit user accounts</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <Settings className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Module Settings</p>
                    <p className="text-sm text-green-600">Enable/disable modules</p>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-purple-900">View Analytics</p>
                    <p className="text-sm text-purple-600">Detailed system reports</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activity</h3>
          <div className="space-y-4">
            {[
              { event: 'New user registration', user: 'john.doe@example.com', time: '5 minutes ago', type: 'user' },
              { event: 'Hotel listing approved', user: 'Grand Plaza Hotel', time: '15 minutes ago', type: 'hotel' },
              { event: 'Tour booking cancelled', user: 'Paris City Tour', time: '1 hour ago', type: 'tour' },
              { event: 'Flight module updated', user: 'System Admin', time: '2 hours ago', type: 'system' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'hotel' ? 'bg-green-500' :
                    activity.type === 'tour' ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.event}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
    </div>
  );
};

export default AdminDashboard;