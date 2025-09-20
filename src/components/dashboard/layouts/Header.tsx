'use client'
import React, { useState } from 'react';
import { Bell, Search, Menu, LogOut, User, ChevronDown, X } from 'lucide-react';
import { useDashboard } from '@src/context/dashboardContext';
import { useUser } from '@hooks/use-user';
import { useParams, useRouter } from 'next/navigation';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@src/components/drawer';
import Link from 'next/link';
import { LayoutDashboard, Building, MapPin, Plane, Users, Settings, BookOpen, BarChart3, Shield } from 'lucide-react';

const Header = () => {
  const { user, modules } = useDashboard();
  const { logout } = useUser();
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang as string || 'en';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = async () => {
    if (logout) {
      await logout();
      router.push(`/${lang}`);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-4 lg:ml-0 flex-1 min-w-0">
            <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
              {user?.role === 'super-admin' ? 'Super Admin' : user ? user?.role.charAt(0).toUpperCase() + user?.role.slice(1) : 'Admin'} Dashboard
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="p-1 text-gray-400 hover:text-gray-500 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs sm:text-sm font-medium text-blue-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 hidden xs:block" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <DrawerContent className="w-80 bg-white">
          <DrawerHeader className="border-b border-gray-200">
            <DrawerTitle className="text-xl font-bold text-gray-900">Dashboard</DrawerTitle>
            <DrawerClose className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </DrawerClose>
          </DrawerHeader>

          <nav className="p-4 flex-1">
            <div className="space-y-1">
              {getNavigationItems(user?.role).map((item) => {
                const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/');
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </DrawerContent>
      </Drawer>
    </header>
  );

  function getNavigationItems(role: any) {
    const baseItems = [
      { name: 'Dashboard', href: `/${lang}/dashboard/${role}`, icon: LayoutDashboard }
    ];

    const moduleItems = [];
    if (modules.hotels.enabled) {
      moduleItems.push({ name: 'Hotels', href: `/${lang}/dashboard/hotels`, icon: Building });
    }
    if (modules.tours.enabled) {
      moduleItems.push({ name: 'Tours', href: `/${lang}/dashboard/tours`, icon: MapPin });
    }
    if (modules.flights.enabled) {
      moduleItems.push({ name: 'Flights', href: `/${lang}/dashboard/flights`, icon: Plane });
    }

    const roleSpecificItems = [];

    const bookingLabel = role === 'customer' ? 'My Bookings' : 'Bookings';
    roleSpecificItems.push(
      { name: bookingLabel, href: `/${lang}/dashboard/bookings`, icon: BookOpen }
    );

    if (role === 'agent') {
      roleSpecificItems.push(
        { name: 'Customers', href: `/${lang}/dashboard/${role}/customers`, icon: Users }
      );
    } else if (role === 'admin' || role === 'super-admin') {
      roleSpecificItems.push(
        { name: 'Analytics', href: `/${lang}/dashboard/analytics`, icon: BarChart3 },
        { name: 'Users', href: `/${lang}/dashboard/users`, icon: Users }
      );

      if (role === 'admin' || role === 'super-admin') {
        roleSpecificItems.push(
          { name: 'Modules', href: `/${lang}/dashboard/modules/settings`, icon: Settings }
        );
      }

      if (role === 'super-admin') {
        roleSpecificItems.push(
          { name: 'System', href: `/${lang}/dashboard/system`, icon: Shield }
        );
      }
    }

    return [...baseItems, ...moduleItems, ...roleSpecificItems];
  }
};

export default Header;