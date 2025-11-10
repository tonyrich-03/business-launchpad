// src/components/Layout/DashboardNavbar.tsx - For authenticated dashboard pages
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const DashboardNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 lg:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/dashboard" className="ml-4 flex items-center">
              <span className="text-xl font-bold text-blue-600">Launchpad</span>
            </Link>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-slate-700 text-sm hidden sm:block">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth"
                  className="text-slate-700 hover:text-blue-600 transition-colors text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;