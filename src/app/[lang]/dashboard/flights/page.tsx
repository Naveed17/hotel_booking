'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Users, DollarSign, MapPin, Calendar, Clock } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const FlightsPage = () => {
  const { user } = useDashboard();

  if (!user) return null;

  const renderCustomerView = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Flights" value="6" change="+1 this month" changeType="positive" icon={Plane} color="blue" />
        <StatsCard title="Upcoming Flights" value="2" change="Next: April 5" changeType="neutral" icon={Calendar} color="green" />
        <StatsCard title="Miles Traveled" value="12,450" change="+2,100 this year" changeType="positive" icon={MapPin} color="purple" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Flight Bookings</h3>
        <div className="space-y-4">
          {[
            { route: 'NYC → LAX', airline: 'American Airlines', date: 'April 5, 2024', time: '08:30 AM', duration: '6h 15m', status: 'Confirmed', price: '$450' },
            { route: 'LAX → NRT', airline: 'Japan Airlines', date: 'April 12, 2024', time: '11:45 PM', duration: '11h 30m', status: 'Confirmed', price: '$890' }
          ].map((booking, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-sky-50 rounded-lg">
              <div className="flex items-center">
                <Plane className="h-10 w-10 text-sky-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">{booking.route}</p>
                  <p className="text-sm text-gray-500">{booking.airline} • {booking.date} • {booking.time}</p>
                  <p className="text-xs text-gray-400 flex items-center mt-1"><Clock className="h-3 w-3 mr-1" />{booking.duration}</p>
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
        <StatsCard title="Active Bookings" value="67" change="+12 this week" changeType="positive" icon={Plane} color="blue" />
        <StatsCard title="Passengers" value="134" change="+28 new" changeType="positive" icon={Users} color="green" />
        <StatsCard title="Revenue" value="$89,450" change="+22% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Routes" value="24" change="Popular destinations" changeType="neutral" icon={MapPin} color="yellow" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Flight Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Route</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Airline</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { customer: 'Robert Chen', route: 'NYC → LAX', date: 'April 5, 2024', airline: 'American Airlines', amount: '$450', status: 'Confirmed' },
                { customer: 'Lisa Wang', route: 'LAX → NRT', date: 'April 12, 2024', airline: 'Japan Airlines', amount: '$890', status: 'Confirmed' }
              ].map((booking, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900">{booking.customer}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.route}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.date}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.airline}</td>
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
        <StatsCard title="Total Bookings" value="89,234" change="+12% this month" changeType="positive" icon={Plane} color="blue" />
        <StatsCard title="Passengers" value="156,789" change="+2,340 this week" changeType="positive" icon={Users} color="green" />
        <StatsCard title="Revenue" value="$2.4M" change="+28% this month" changeType="positive" icon={DollarSign} color="purple" />
        <StatsCard title="Routes" value="245" change="Active destinations" changeType="neutral" icon={MapPin} color="yellow" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Routes</h3>
          <div className="space-y-4">
            {[
              { route: 'NYC ↔ LAX', bookings: '2,456', revenue: '$1.2M', airline: 'American Airlines' },
              { route: 'LAX ↔ NRT', bookings: '1,890', revenue: '$1.8M', airline: 'Japan Airlines' }
            ].map((route, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-sky-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{route.route}</p>
                  <p className="text-sm text-gray-500">{route.bookings} bookings • {route.airline}</p>
                </div>
                <p className="font-semibold text-sky-600">{route.revenue}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const getTitle = () => {
    switch (user.role) {
      case 'customer': return 'My Flights';
      case 'agent': return 'Flight Management';
      case 'admin':
      case 'super-admin': return 'Flight Administration';
      default: return 'Flights';
    }
  };

  const getSubtitle = () => {
    switch (user.role) {
      case 'customer': return 'Track your flight bookings and travel history';
      case 'agent': return 'Manage flight bookings and customer travel';
      case 'admin':
      case 'super-admin': return 'Manage flight bookings, routes, and airline partnerships';
      default: return 'Flight management system';
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

export default FlightsPage;