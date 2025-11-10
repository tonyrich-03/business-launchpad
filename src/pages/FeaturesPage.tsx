// src/pages/FeaturesPage.tsx
import React from 'react';
import MainNavbar from '../components/MainNavbar';
import { Link } from 'react-router-dom';

const FeaturesPage: React.FC = () => {
  const features = [
    {
      title: "Media Management",
      description: "Upload, organize, and manage your images and videos with our intuitive interface.",
      icon: "🖼️",
      features: ["Drag & drop upload", "Batch operations", "Smart organization"]
    },
    {
      title: "Secure Storage",
      description: "Your files are securely stored with browser-based storage that respects your privacy.",
      icon: "🔒",
      features: ["Local browser storage", "No external servers", "Your data stays yours"]
    },
    {
      title: "Easy Sharing",
      description: "Share your media collections with others quickly and efficiently.",
      icon: "📤",
      features: ["Quick sharing options", "Organized galleries", "Public/private controls"]
    },
    {
      title: "Cross-Platform",
      description: "Access your media from any device with a modern web browser.",
      icon: "🌐",
      features: ["Responsive design", "Mobile friendly", "Works on all devices"]
    },
    {
      title: "Smart Organization",
      description: "Automatically organize your media with smart tagging and categorization.",
      icon: "🏷️",
      features: ["Auto-tagging", "Custom categories", "Quick search"]
    },
    {
      title: "Bulk Operations",
      description: "Manage multiple files at once with powerful bulk operations.",
      icon: "⚡",
      features: ["Bulk upload", "Batch delete", "Multi-select editing"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
      <MainNavbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Your Media
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the tools and features that make Business Launchpad the perfect platform 
            for managing and sharing your visual content.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 bg-white rounded-2xl shadow-lg p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join thousands of users who are already managing their media with Business Launchpad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
            >
              Start Free Trial
            </Link>
            <Link
              to="/pricing"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;