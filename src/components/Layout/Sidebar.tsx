import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSidebar } from '../../context/SidebarContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Inbox', href: '/inbox', icon: '📬' }, 
    { name: 'Calendar', href: '/calendar', icon: '📅' },
    { name: 'Weekly Planner', href: '/weeklyplanner', icon: '📋' },
    { name: 'Daily Planner', href: '/dailyplanner', icon: '📝' },
    { name: 'Business Launch', href: '/businesslaunch', icon: '🚀' },
    { name: 'Resources', href: '/resources', icon: '📚' },
    { name: 'Explore', href: '/explore', icon: '🔍' },
    
  ];

  const isActive = (path: string) => location.pathname === path;

   return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-slate-800 text-white min-h-screen p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between mb-8 p-4 border-b border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-white">Business Launchpad</h1>
            <p className="text-slate-400 text-sm">AI-Powered Platform</p>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={closeSidebar} // Close sidebar on mobile when link is clicked
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="mt-auto pt-4 border-t border-slate-700">
          <div className="flex items-center px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name}
              </p>
              <p className="text-sm text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="ml-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              title="Sign out"
            >
              <span className="text-lg">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;