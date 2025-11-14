import React, { useState } from 'react';
import type { MarketingStrategy, AnalyticsData, ChannelPerformance } from './types';

interface AnalyticsDashboardProps {
  marketingStrategy: MarketingStrategy;
  onAnalyticsGenerated: (analytics: AnalyticsData) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  marketingStrategy,
  onAnalyticsGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeframe, setTimeframe] = useState<string>('30days');

  const generateAnalytics = async () => {
    setIsGenerating(true);
    
    // Simulate AI analytics generation
    setTimeout(() => {
      const mockAnalytics: AnalyticsData = {
        overview: {
          totalVisitors: 15420,
          conversionRate: 3.8,
          bounceRate: 42.3,
          averageSession: '00:03:45',
          revenue: 45280
        },
        channelPerformance: [
          {
            channel: 'Organic Search',
            visitors: 6450,
            conversions: 285,
            conversionRate: 4.4,
            cost: 0,
            roi: 0
          },
          {
            channel: 'Social Media',
            visitors: 3280,
            conversions: 98,
            conversionRate: 3.0,
            cost: 1250,
            roi: 3.2
          },
          {
            channel: 'Email Marketing',
            visitors: 2150,
            conversions: 172,
            conversionRate: 8.0,
            cost: 450,
            roi: 5.8
          },
          {
            channel: 'Direct Traffic',
            visitors: 1850,
            conversions: 67,
            conversionRate: 3.6,
            cost: 0,
            roi: 0
          },
          {
            channel: 'Referral',
            visitors: 920,
            conversions: 45,
            conversionRate: 4.9,
            cost: 0,
            roi: 0
          },
          {
            channel: 'Paid Ads',
            visitors: 770,
            conversions: 23,
            conversionRate: 3.0,
            cost: 850,
            roi: 1.5
          }
        ],
        audienceInsights: {
          demographics: [
            { category: '25-34 years', percentage: 42 },
            { category: '35-44 years', percentage: 28 },
            { category: '18-24 years', percentage: 15 },
            { category: '45-54 years', percentage: 10 },
            { category: '55+ years', percentage: 5 }
          ],
          interests: ['Technology', 'Business Growth', 'Professional Development', 'Industry Trends', 'Networking'],
          behavior: {
            pagesPerSession: 3.2,
            avgSessionDuration: '00:03:45',
            newVsReturning: { new: 65, returning: 35 }
          }
        },
        recommendations: [
          'Optimize landing pages for mobile users (42% of traffic)',
          'Increase email frequency to 2x per week for engaged segments',
          'Create more video content for social media (47% higher engagement)',
          'Improve page load speed by 1.2 seconds to reduce bounce rate',
          'Launch retargeting campaign for cart abandoners'
        ]
      };
      
      setAnalyticsData(mockAnalytics);
      onAnalyticsGenerated(mockAnalytics);
      setIsGenerating(false);
    }, 2500);
  };

  const PerformanceChart: React.FC<{ channels: ChannelPerformance[] }> = ({ channels }) => (
    <div className="space-y-3">
      {channels.map((channel, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`w-3 h-3 rounded-full ${
              channel.conversionRate >= 5 ? 'bg-green-500' :
              channel.conversionRate >= 3 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">{channel.channel}</span>
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  channel.conversionRate >= 5 ? 'bg-green-500' :
                  channel.conversionRate >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(channel.visitors / 15420) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-20 text-right">
              {channel.visitors.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const DemographicChart: React.FC<{ demographics: { category: string; percentage: number }[] }> = ({ demographics }) => (
    <div className="space-y-3">
      {demographics.map((demo, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm text-gray-700 w-24">{demo.category}</span>
          <div className="flex items-center space-x-3 flex-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${demo.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-8 text-right">
              {demo.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const MetricCard: React.FC<{ title: string; value: string | number; subtitle?: string; color?: string }> = ({ 
    title, 
    value, 
    subtitle, 
    color = 'blue' 
  }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <h4 className="text-sm font-medium text-gray-600 mb-1">{title}</h4>
      <p className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );

  const getTopPerformingChannels = () => {
    if (!analyticsData) return [];
    return analyticsData.channelPerformance
      .filter(channel => channel.conversions > 0)
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, 3);
  };

  const getStrategyAlignment = () => {
    if (!analyticsData || !marketingStrategy.channels) return [];
    
    const strategyChannels = marketingStrategy.channels.map(ch => ch.name);
    const performingChannels = analyticsData.channelPerformance
      .filter(ch => ch.conversionRate > 3)
      .map(ch => ch.channel);
    
    return strategyChannels.filter(channel => 
      performingChannels.includes(channel)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Analytics Dashboard</h3>
          <p className="text-gray-600">Get AI-powered insights and performance predictions</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          
          <button
            onClick={generateAnalytics}
            disabled={isGenerating}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? 'Generating Insights...' : 'Generate AI Analytics'}
          </button>
        </div>
      </div>

      {!analyticsData ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">No Analytics Data Yet</h4>
          <p className="text-gray-600 mb-4">Generate AI-powered insights to see your marketing performance</p>
          <button
            onClick={generateAnalytics}
            disabled={isGenerating}
            className={`px-6 py-3 rounded-md text-white font-medium ${
              isGenerating 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Analytics'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard 
              title="Total Visitors" 
              value={analyticsData.overview.totalVisitors.toLocaleString()}
              color="blue"
            />
            <MetricCard 
              title="Conversion Rate" 
              value={`${analyticsData.overview.conversionRate}%`}
              color="green"
            />
            <MetricCard 
              title="Bounce Rate" 
              value={`${analyticsData.overview.bounceRate}%`}
              color="red"
            />
            <MetricCard 
              title="Avg. Session" 
              value={analyticsData.overview.averageSession}
              color="purple"
            />
            <MetricCard 
              title="Revenue" 
              value={`$${analyticsData.overview.revenue.toLocaleString()}`}
              color="green"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Channel Performance */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Channel Performance</h4>
              <PerformanceChart channels={analyticsData.channelPerformance} />
              
              {/* Top Performing Channels */}
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h5 className="font-semibold text-gray-700 mb-3">Top Performing Channels</h5>
                <div className="space-y-2">
                  {getTopPerformingChannels().map((channel, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{channel.channel}</span>
                      <span className="text-sm font-semibold text-green-600">
                        {channel.conversionRate}% conversion
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Audience Demographics */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Audience Demographics</h4>
              <DemographicChart demographics={analyticsData.audienceInsights.demographics} />
              
              {/* Audience Interests */}
              <div className="mt-6">
                <h5 className="font-semibold text-gray-700 mb-3">Top Audience Interests</h5>
                <div className="flex flex-wrap gap-2">
                  {analyticsData.audienceInsights.interests.map((interest, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Behavior & ROI Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">User Behavior</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-sm text-gray-600">Pages per Session</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {analyticsData.audienceInsights.behavior.pagesPerSession}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-sm text-gray-600">Avg. Session Duration</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {analyticsData.audienceInsights.behavior.avgSessionDuration}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="text-sm text-gray-600">New vs Returning Visitors</span>
                  <span className="text-lg font-semibold text-gray-800">
                    {analyticsData.audienceInsights.behavior.newVsReturning.new}% / {analyticsData.audienceInsights.behavior.newVsReturning.returning}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">ROI Analysis</h4>
              <div className="space-y-4">
                {analyticsData.channelPerformance
                  .filter(channel => channel.cost > 0)
                  .map((channel, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg border">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{channel.channel}</span>
                        <p className="text-xs text-gray-500">Spent: ${channel.cost.toLocaleString()}</p>
                      </div>
                      <span className={`text-lg font-semibold ${
                        channel.roi >= 5 ? 'text-green-600' : 
                        channel.roi >= 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {channel.roi > 0 ? `${channel.roi}x ROI` : 'N/A'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-4">AI Recommendations</h4>
            <div className="space-y-3">
              {analyticsData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Alignment */}
          {marketingStrategy && (
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-4">Strategy Alignment</h4>
              <div className="space-y-3">
                <p className="text-sm text-green-700">
                  <strong>Target Audience:</strong> {marketingStrategy.targetPersonas?.[0]?.name || 'General Audience'}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Aligned Channels:</strong> {getStrategyAlignment().join(', ') || 'None yet'}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Key Messages:</strong> {marketingStrategy.keyMessages?.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;