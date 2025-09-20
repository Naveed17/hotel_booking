'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, Plane, Users, ToggleLeft } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { ModuleId } from '@src/types/dashboard';

const ModuleManager = () => {
  const { modules, toggleModule, user } = useDashboard();

  if (!user || (user.role !== 'admin' && user.role !== 'super-admin')) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  const getModuleIcon = (moduleId: ModuleId) => {
    const icons = {
      hotels: Building,
      tours: MapPin,
      flights: Plane,
      users: Users
    };
    return icons[moduleId];
  };

  const getModuleColor = (moduleId: ModuleId) => {
    const colors = {
      hotels: 'blue',
      tours: 'emerald',
      flights: 'sky',
      users: 'purple'
    };
    return colors[moduleId];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Module Management</h1>
        <p className="text-gray-600 mt-2">Enable or disable travel modules for your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.values(modules).map((module) => {
          const Icon = getModuleIcon(module.id);
          const color = getModuleColor(module.id);

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-${color}-50`}>
                    <Icon className={`h-6 w-6 text-${color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{module.name}</h3>
                    <p className="text-sm text-gray-500">
                      {module.enabled ? 'Active' : 'Disabled'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleModule(module.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${module.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${module.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {module.permissions.map((permission) => (
                    <span
                      key={permission}
                      className={`px-2 py-1 text-xs rounded-full ${module.enabled
                          ? `bg-${color}-50 text-${color}-700`
                          : 'bg-gray-100 text-gray-500'
                        }`}
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {module.enabled
                    ? 'This module is currently available to users'
                    : 'This module is hidden from users'
                  }
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
            <p className="mt-1 text-sm text-yellow-700">
              Disabling a module will hide it from all users and prevent access to related features.
              Existing bookings and data will remain intact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleManager;