'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Server, Database, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

import StatsCard from '@src/components/dashboard/shared/widgets/StatsCard';

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System administration and monitoring</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="System Health"
            value="99.9%"
            change="All systems operational"
            changeType="positive"
            icon={CheckCircle}
            color="green"
          />
          <StatsCard
            title="Server Load"
            value="23%"
            change="Normal load"
            changeType="positive"
            icon={Server}
            color="blue"
          />
          <StatsCard
            title="Database Size"
            value="2.4 GB"
            change="+120 MB this week"
            changeType="neutral"
            icon={Database}
            color="purple"
          />
          <StatsCard
            title="Active Sessions"
            value="1,247"
            change="+89 from yesterday"
            changeType="positive"
            icon={Activity}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              {[
                { service: 'Web Server', status: 'Online', uptime: '99.9%', color: 'green' },
                { service: 'Database', status: 'Online', uptime: '99.8%', color: 'green' },
                { service: 'Payment Gateway', status: 'Online', uptime: '99.7%', color: 'green' },
                { service: 'Email Service', status: 'Warning', uptime: '98.2%', color: 'yellow' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      service.color === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{service.service}</p>
                      <p className="text-sm text-gray-500">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    service.color === 'green' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {service.status}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Alerts</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <p className="font-medium text-red-900">Failed Login Attempts</p>
                    <p className="text-sm text-red-600">23 attempts from suspicious IPs</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-900">SSL Certificate</p>
                    <p className="text-sm text-yellow-600">Expires in 30 days</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-green-900">Backup Completed</p>
                    <p className="text-sm text-green-600">Daily backup successful</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <p className="font-medium text-blue-900">Security Settings</p>
              <p className="text-sm text-blue-600">Manage system security</p>
            </button>
            
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <Database className="h-8 w-8 text-green-600 mb-2" />
              <p className="font-medium text-green-900">Database Management</p>
              <p className="text-sm text-green-600">Backup and maintenance</p>
            </button>
            
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <Server className="h-8 w-8 text-purple-600 mb-2" />
              <p className="font-medium text-purple-900">Server Configuration</p>
              <p className="text-sm text-purple-600">System settings</p>
            </button>
          </div>
        </motion.div>
    </div>
  );
};

export default SuperAdminDashboard;