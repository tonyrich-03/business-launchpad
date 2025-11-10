// src/components/MainNavbar.tsx - For public pages (Landing, Auth, Explore)
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Explore', href: '/explore', current: location.pathname === '/explore' },
    { name: 'Features', href: '/features', current: location.pathname === '/features' },
    { name: 'Pricing', href: '/pricing', current: location.pathname === '/pricing' },
  ]

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="Business Launchpad Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Business Launchpad
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={logout}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <Link
                  to="/auth"
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Auth buttons */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      Welcome, {user.name}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/auth"
                      className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth"
                      className="block px-3 py-2 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default MainNavbar