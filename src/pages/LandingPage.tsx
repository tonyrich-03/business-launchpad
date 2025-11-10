import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold">Business Launchpad</div>
          <div className="space-x-2">
            <Link to="/auth" className="text-white hover:text-blue-200 transition-colors">
              Sign In
            </Link>
            <Link 
              to="/auth" 
              className="bg-blue-600 text-white px-1 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            Launch Your Business
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              With AI Power
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto">
            Everything you need to start, grow, and scale your business. 
            From planning and branding to execution and analytics - all in one platform.
          </p>
          
          <div className="space-x-6">
            <Link 
              to="/auth" 
              className="bg-blue-600 text-white px-2 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/explore" 
              className="border border-white text-white px-2 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Explore Features
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { icon: '🚀', title: 'AI Planning', desc: 'Smart business planning with AI assistance' },
            { icon: '📊', title: 'Analytics', desc: 'Track your progress with detailed insights' },
            { icon: '🛠️', title: 'Tools', desc: 'All the tools you need in one place' },
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;