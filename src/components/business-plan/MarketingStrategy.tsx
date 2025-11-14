import React from 'react';
import type { MarketingStrategy as MarketingStrategyType } from './types';

interface MarketingStrategyProps {
  strategy: MarketingStrategyType;
  businessIdea: any;
  isLoading?: boolean;
}

const MarketingStrategy: React.FC<MarketingStrategyProps> = ({ 
  strategy, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Creating Marketing Strategy...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  const channelIcons: { [key: string]: string } = {
    'Social Media': '📱',
    'Content Marketing': '📝',
    'SEO': '🔍',
    'Email Marketing': '✉️',
    'Paid Ads': '💸',
    'Partnerships': '🤝',
    'Influencer': '⭐',
    'Referral': '🔄'
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Marketing Strategy</h3>
      
      {/* Marketing Channels */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-700 mb-4">Recommended Marketing Channels</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {strategy.channels.map((channel, index) => (
            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-2xl mr-3">{channelIcons[channel] || '📊'}</span>
              <div>
                <div className="font-medium text-gray-800">{channel}</div>
                <div className="text-sm text-gray-600">
                  {getChannelDescription(channel)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Budget Allocation */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Marketing Budget</h4>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
            <div className="text-3xl font-bold mb-2">${strategy.budget.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Marketing Budget</div>
          </div>
          
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Digital Advertising</span>
              <span className="font-semibold">${(strategy.budget * 0.4).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Content Creation</span>
              <span className="font-semibold">${(strategy.budget * 0.25).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Social Media</span>
              <span className="font-semibold">${(strategy.budget * 0.2).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tools & Software</span>
              <span className="font-semibold">${(strategy.budget * 0.15).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Implementation Timeline</h4>
          <div className="space-y-3">
            {strategy.timeline.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1 flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">{item}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getTimelineDuration(index)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-700 mb-4">Key Performance Metrics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {strategy.keyMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg border">
              <div className="text-lg font-bold text-gray-800">{metric.split(':')[0]}</div>
              <div className="text-xs text-gray-600 mt-1">{metric.split(':')[1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-2">💡 Marketing Tips</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Focus on 2-3 channels initially to maximize impact</li>
          <li>• Track ROI weekly and adjust strategy accordingly</li>
          <li>• Build an email list from day one</li>
          <li>• Leverage customer testimonials and case studies</li>
        </ul>
      </div>
    </div>
  );
};

// Helper functions
const getChannelDescription = (channel: string): string => {
  const descriptions: { [key: string]: string } = {
    'Social Media': 'Build brand awareness and engage with audience',
    'Content Marketing': 'Create valuable content to attract customers',
    'SEO': 'Improve search visibility and organic traffic',
    'Email Marketing': 'Nurture leads and retain customers',
    'Paid Ads': 'Quickly reach target audience with targeted messaging',
    'Partnerships': 'Collaborate with complementary businesses',
    'Influencer': 'Leverage trusted voices in your industry',
    'Referral': 'Encourage existing customers to refer new ones'
  };
  return descriptions[channel] || 'Effective channel for business growth';
};

const getTimelineDuration = (index: number): string => {
  const durations = [
    'Weeks 1-2',
    'Weeks 3-4', 
    'Month 2',
    'Months 3-6',
    'Ongoing'
  ];
  return durations[index] || 'Varies';
};

export default MarketingStrategy;