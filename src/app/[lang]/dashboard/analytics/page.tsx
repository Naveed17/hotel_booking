'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Building, MapPin, Plane } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const AnalyticsPage = () => {
  const { user } = useDashboard();

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">System performance and business insights</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$2.8M"
          change="+25% this month"
          changeType="positive"
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Active Users"
          value="15,234"
          change="+1,240 this month"
          changeType="positive"
          icon={Users}
          color="blue"
        />
        <StatsCard
          title="Conversion Rate"
          value="68%"
          change="+5% improvement"
          changeType="positive"
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Total Bookings"
          value="89,234"
          change="+12% this month"
          changeType="positive"
          icon={BarChart3}
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Module</h3>
          <div className="space-y-4">
            {[
              { module: 'Hotels', revenue: '$1.5M', percentage: '54%', icon: Building, color: 'blue' },
              { module: 'Flights', revenue: '$890K', percentage: '32%', icon: Plane, color: 'sky' },
              { module: 'Tours', revenue: '$410K', percentage: '14%', icon: MapPin, color: 'emerald' }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className={`h-8 w-8 text-${item.color}-600 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">{item.module}</p>
                      <p className="text-sm text-gray-500">{item.percentage} of total</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{item.revenue}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { metric: 'Average Order Value', value: '$312', change: '+8%', trend: 'positive' },
              { metric: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'positive' },
              { metric: 'Booking Completion', value: '94%', change: '+3%', trend: 'positive' },
              { metric: 'Support Response Time', value: '2.3h', change: '-15%', trend: 'positive' }
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{metric.metric}</p>
                  <p className="text-sm text-gray-500">Current period</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-green-600">{metric.change}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Chart</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Revenue & Booking Trends Chart</p>
            <p className="text-sm text-gray-400 mt-1">Chart visualization would be integrated here</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;