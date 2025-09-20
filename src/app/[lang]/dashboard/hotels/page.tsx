'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, TrendingUp, Calendar, MapPin, Star } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const HotelsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Bookings" value="8" change="+2 this month" changeType="positive" icon={Building} color="blue" />
        <StatsCard title="Upcoming Stays" value="2" change="Next: March 20" changeType="neutral" icon={Calendar} color="green" />
        <StatsCard title="Favorite Hotels" value="5" change="4.8 avg rating" changeType="positive" icon={Star} color="yellow" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hotel Bookings</h3>
        <div className="space-y-4">
          {[
            { name: 'Grand Plaza Hotel', location: 'New York', date: 'March 20-25, 2024', status: 'Confirmed', price: '$450' },
            { name: 'Ocean View Resort', location: 'Miami', date: 'April 10-15, 2024', status: 'Confirmed', price: '$680' }
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Building className="h-10 w-10 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">{booking.name}</p>
                  <p className="text-sm text-gray-500 flex items-center"><MapPin className="h-3 w-3 mr-1" />{booking.location} • {booking.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{booking.price}</p>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{booking.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );

  const renderAgentView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Active Bookings" value="45" change="+8 this week" changeType="positive" icon={Building} color="blue" />
        <StatsCard title="Total Customers" value="89" change="+12 new" changeType="positive" icon={Users} color="green" />
        <StatsCard title="Revenue" value="$23,450" change="+15% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Occupancy Rate" value="78%" change="+5% improvement" changeType="positive" icon={TrendingUp} color="yellow" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hotel Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Hotel</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Check-in</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { customer: 'John Smith', hotel: 'Grand Plaza Hotel', checkin: 'March 20, 2024', amount: '$450', status: 'Confirmed' },
                { customer: 'Sarah Johnson', hotel: 'Ocean View Resort', checkin: 'March 25, 2024', amount: '$680', status: 'Confirmed' }
              ].map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{booking.customer}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.hotel}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.checkin}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{booking.amount}</td>
                  <td className="py-3 px-4"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{booking.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </>
  );

  const renderAdminView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Hotels" value="1,234" change="+45 new listings" changeType="positive" icon={Building} color="blue" />
        <StatsCard title="Active Bookings" value="2,847" change="+180 this week" changeType="positive" icon={Users} color="green" />
        <StatsCard title="Revenue" value="$456,789" change="+25% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Avg Rating" value="4.6" change="Quality score" changeType="positive" icon={Star} color="yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Hotels</h3>
          <div className="space-y-4">
            {[
              { name: 'Grand Plaza Hotel', bookings: '234', revenue: '$45,600', rating: '4.8' },
              { name: 'Ocean View Resort', bookings: '189', revenue: '$38,900', rating: '4.7' }
            ].map((hotel, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{hotel.name}</p>
                  <p className="text-sm text-gray-500">{hotel.bookings} bookings • Rating: {hotel.rating}</p>
                </div>
                <p className="font-semibold text-blue-600">{hotel.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const getTitle = () => {
    switch (user.role) {
      case 'customer': return 'My Hotels';
      case 'agent': return 'Hotel Management';
      case 'admin':
      case 'super-admin': return 'Hotel Administration';
      default: return 'Hotels';
    }
  };

  const getSubtitle = () => {
    switch (user.role) {
      case 'customer': return 'Manage your hotel bookings and reservations';
      case 'agent': return 'Manage hotel bookings and customer reservations';
      case 'admin':
      case 'super-admin': return 'Manage hotel listings, bookings, and system settings';
      default: return 'Hotel management system';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
        <p className="text-gray-600 mt-2">{getSubtitle()}</p>
      </motion.div>

      {user.role === 'customer' && renderCustomerView()}
      {user.role === 'agent' && renderAgentView()}
      {(user.role === 'admin' || user.role === 'super-admin') && renderAdminView()}
    </div>
  );
};

export default HotelsPage;