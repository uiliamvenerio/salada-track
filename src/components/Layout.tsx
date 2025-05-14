import React, { useState } from 'react';
import { Menu, X, User, Calendar, ClipboardList, LineChart, Book, Home } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const navigationItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/clients', name: 'Clients', icon: <User size={20} /> },
    { path: '/appointments', name: 'Appointments', icon: <Calendar size={20} /> },
    { path: '/nutrition-plans', name: 'Nutrition Plans', icon: <ClipboardList size={20} /> },
    { path: '/progress', name: 'Progress Tracking', icon: <LineChart size={20} /> },
    { path: '/recipes', name: 'Recipe Database', icon: <Book size={20} /> },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
                onClick={toggleSidebar}
              >
                <Menu size={24} />
              </button>
              <div className="ml-2 md:ml-0 flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-green-600 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-semibold text-green-700">NutriTrack</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Dr. Samantha Lee</span>
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-800 font-medium">SL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 z-20 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={closeSidebar}></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-30 transition-transform duration-300 transform">
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-md bg-green-600 flex items-center justify-center">
                  <span className="text-white font-bold">N</span>
                </div>
                <span className="text-xl font-semibold text-green-700">NutriTrack</span>
              </div>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={closeSidebar}
              >
                <X size={24} />
              </button>
            </div>
            <nav className="mt-4 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.path)
                      ? 'bg-green-100 text-green-800'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={closeSidebar}
                >
                  <div
                    className={`mr-4 ${
                      isActive(item.path) ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        isActive(item.path)
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div
                        className={`mr-3 ${
                          isActive(item.path) ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      >
                        {item.icon}
                      </div>
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;