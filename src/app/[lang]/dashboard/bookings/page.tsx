'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, DollarSign, TrendingUp, Building, MapPin, Plane } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const BookingsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Bookings" value="18" change="+3 this month" changeType="positive" icon={BookOpen} color="blue" />
        <StatsCard title="Upcoming" value="5" change="Next: March 15" changeType="neutral" icon={Calendar} color="green" />
        <StatsCard title="Total Spent" value="$3,240" change="+$450 this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Completion Rate" value="94%" change="Excellent record" changeType="positive" icon={TrendingUp} color="yellow" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">All My Bookings</h3>
        <div className="space-y-4">
          {[
            { type: 'Hotel', name: 'Grand Plaza Hotel', date: 'March 20-25, 2024', status: 'Confirmed', price: '$450', icon: Building, color: 'blue' },
            { type: 'Tour', name: 'Paris City Walking Tour', date: 'March 15, 2024', status: 'Confirmed', price: '$89', icon: MapPin, color: 'emerald' },
            { type: 'Flight', name: 'NYC → LAX', date: 'April 5, 2024', status: 'Confirmed', price: '$450', icon: Plane, color: 'sky' }
          ].map((booking, index) => {
            const Icon = booking.icon;
            return (
              <div key={index} className={`flex items-center justify-between p-4 bg-${booking.color}-50 rounded-lg`}>
                <div className="flex items-center">
                  <Icon className={`h-10 w-10 text-${booking.color}-600 mr-4`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full bg-${booking.color}-100 text-${booking.color}-700 font-medium`}>
                        {booking.type}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mt-1">{booking.name}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{booking.price}</p>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{booking.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );

  const renderAgentView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Total Bookings" value="342" change="+45 this week" changeType="positive" icon={BookOpen} color="blue" />
        <StatsCard title="Pending" value="23" change="Needs attention" changeType="neutral" icon={Calendar} color="yellow" />
        <StatsCard title="Revenue" value="$125,890" change="+18% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Success Rate" value="96%" change="+2% improvement" changeType="positive" icon={TrendingUp} color="green" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { customer: 'John Smith', type: 'Hotel', service: 'Grand Plaza Hotel', date: 'March 20, 2024', amount: '$450', status: 'Confirmed' },
                { customer: 'Alice Brown', type: 'Tour', service: 'Paris City Tour', date: 'March 15, 2024', amount: '$178', status: 'Confirmed' },
                { customer: 'Robert Chen', type: 'Flight', service: 'NYC → LAX', date: 'April 5, 2024', amount: '$450', status: 'Pending' }
              ].map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{booking.customer}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.type === 'Hotel' ? 'bg-blue-100 text-blue-700' :
                      booking.type === 'Tour' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-sky-100 text-sky-700'
                    }`}>
                      {booking.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{booking.service}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{booking.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
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
        <StatsCard title="Total Bookings" value="15,234" change="+1,240 this month" changeType="positive" icon={BookOpen} color="blue" />
        <StatsCard title="Active Today" value="456" change="Peak hours: 2-4 PM" changeType="neutral" icon={Calendar} color="green" />
        <StatsCard title="Revenue" value="$2.8M" change="+25% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Conversion" value="68%" change="+5% improvement" changeType="positive" icon={TrendingUp} color="yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Distribution</h3>
          <div className="space-y-4">
            {[
              { type: 'Hotels', count: '8,456', percentage: '55%', color: 'blue' },
              { type: 'Flights', count: '4,234', percentage: '28%', color: 'sky' },
              { type: 'Tours', count: '2,544', percentage: '17%', color: 'emerald' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full bg-${item.color}-500 mr-3`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.type}</p>
                    <p className="text-sm text-gray-500">{item.count} bookings</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">{item.percentage}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const getTitle = () => {
    switch (user.role) {
      case 'customer': return 'My Bookings';
      case 'agent': return 'Customer Bookings';
      case 'admin':
      case 'super-admin': return 'All Bookings';
      default: return 'Bookings';
    }
  };

  const getSubtitle = () => {
    switch (user.role) {
      case 'customer': return 'View and manage all your travel bookings';
      case 'agent': return 'Manage customer bookings across all services';
      case 'admin':
      case 'super-admin': return 'System-wide booking analytics and management';
      default: return 'Booking management system';
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

export default BookingsPage;