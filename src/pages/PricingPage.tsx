// src/pages/PricingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic media management",
      features: [
        "5GB storage",
        "Basic media uploads",
        "Community support",
        "Up to 100 files",
        "Standard quality"
      ],
      cta: "Get Started",
      popular: false,
      href: "/auth"
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Ideal for professionals and content creators",
      features: [
        "50GB storage",
        "All Free features",
        "Priority support",
        "Unlimited files",
        "High quality storage",
        "Advanced organization",
        "Bulk operations",
        "No watermarks"
      ],
      cta: "Start Free Trial",
      popular: true,
      href: "/auth"
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "per month",
      description: "For teams and businesses with advanced needs",
      features: [
        "Unlimited storage",
        "All Pro features",
        "Dedicated support",
        "Team collaboration",
        "Custom branding",
        "API access",
        "Advanced analytics",
        "Custom solutions"
      ],
      cta: "Contact Sales",
      popular: false,
      href: "/auth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
      <MainNavbar />
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include core features, 
            with flexible options to scale as your needs grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : 'border border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to={plan.href}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I change plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Is there a free trial?</h3>
              <p className="text-gray-600">All paid plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription at any time. No hidden fees or contracts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;