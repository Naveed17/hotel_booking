import React from 'react';
import { DashboardProvider } from '@src/context/dashboardContext';
import Sidebar from './Sidebar';
import Header from './Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:pl-64 relative">
          <Header />
          <main className="pt-24 p-6">
            {children}
          </main>
        </div>
      </div>
    </DashboardProvider>
  )
}

export default DashboardLayout;