'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, DollarSign, Clock, Calendar, Star } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const ToursPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Tours" value="4" change="+1 this month" changeType="positive" icon={MapPin} color="green" />
        <StatsCard title="Upcoming Tours" value="1" change="Next: March 15" changeType="neutral" icon={Calendar} color="blue" />
        <StatsCard title="Hours Explored" value="24" change="6 hours avg" changeType="positive" icon={Clock} color="purple" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tour Bookings</h3>
        <div className="space-y-4">
          {[
            { name: 'Paris City Walking Tour', location: 'Paris, France', date: 'March 15, 2024', duration: '3 hours', status: 'Confirmed', price: '$89' },
            { name: 'Rome Ancient History', location: 'Rome, Italy', date: 'April 8, 2024', duration: '4 hours', status: 'Confirmed', price: '$125' }
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center">
                <MapPin className="h-10 w-10 text-emerald-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">{booking.name}</p>
                  <p className="text-sm text-gray-500">{booking.location} • {booking.date} • {booking.duration}</p>
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
        <StatsCard title="Active Tours" value="28" change="+5 this week" changeType="positive" icon={MapPin} color="green" />
        <StatsCard title="Tour Participants" value="156" change="+23 new" changeType="positive" icon={Users} color="blue" />
        <StatsCard title="Revenue" value="$12,890" change="+18% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Avg Duration" value="4.2h" change="Most popular" changeType="neutral" icon={Clock} color="yellow" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tour Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Tour</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Participants</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { customer: 'Alice Brown', tour: 'Paris City Walking Tour', date: 'March 15, 2024', participants: '2', amount: '$178', status: 'Confirmed' },
                { customer: 'David Lee', tour: 'Rome Ancient History', date: 'March 22, 2024', participants: '4', amount: '$500', status: 'Confirmed' }
              ].map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{booking.customer}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.tour}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.participants}</td>
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
        <StatsCard title="Total Tours" value="567" change="+23 new tours" changeType="positive" icon={MapPin} color="green" />
        <StatsCard title="Active Bookings" value="1,456" change="+89 this week" changeType="positive" icon={Users} color="blue" />
        <StatsCard title="Revenue" value="$234,567" change="+18% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Avg Duration" value="4.2h" change="Popular length" changeType="neutral" icon={Clock} color="yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tours</h3>
          <div className="space-y-4">
            {[
              { name: 'Paris City Walking Tour', bookings: '156', revenue: '$13,884', rating: '4.8' },
              { name: 'Rome Ancient History', bookings: '134', revenue: '$16,750', rating: '4.9' }
            ].map((tour, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{tour.name}</p>
                  <p className="text-sm text-gray-500">{tour.bookings} bookings • Rating: {tour.rating}</p>
                </div>
                <p className="font-semibold text-emerald-600">{tour.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const getTitle = () => {
    switch (user.role) {
      case 'customer': return 'My Tours';
      case 'agent': return 'Tour Management';
      case 'admin':
      case 'super-admin': return 'Tour Administration';
      default: return 'Tours';
    }
  };

  const getSubtitle = () => {
    switch (user.role) {
      case 'customer': return 'Explore your tour bookings and experiences';
      case 'agent': return 'Manage tour bookings and customer experiences';
      case 'admin':
      case 'super-admin': return 'Manage tour listings, bookings, and experiences';
      default: return 'Tour management system';
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

export default ToursPage;