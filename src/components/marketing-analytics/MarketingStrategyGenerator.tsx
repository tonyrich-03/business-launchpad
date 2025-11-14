import React, { useState } from 'react';
import type { MarketingGoals, MarketingStrategy } from './types';

interface MarketingStrategyGeneratorProps {
  goals: MarketingGoals;
  onStrategyGenerated: (strategy: MarketingStrategy) => void;
}

const MarketingStrategyGenerator: React.FC<MarketingStrategyGeneratorProps> = ({
  goals,
  onStrategyGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStrategy, setGeneratedStrategy] = useState<MarketingStrategy | null>(null);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const generateStrategy = async () => {
    setIsGenerating(true);
    
    // Simulate AI strategy generation
    setTimeout(() => {
      const mockStrategy: MarketingStrategy = {
        overview: `Comprehensive marketing strategy focused on ${goals.primaryGoal.toLowerCase()} through targeted digital channels. This strategy leverages data-driven insights to maximize ROI while building brand awareness and driving conversions.`,
        channels: [
          {
            name: 'Social Media Marketing',
            description: 'Strategic content distribution across key social platforms',
            budget: goals.budget * 0.3,
            expectedROI: 4.2,
            keyMetrics: ['Engagement Rate', 'Follower Growth', 'Click-through Rate'],
            contentTypes: ['Educational Posts', 'Behind-the-Scenes', 'User Testimonials']
          },
          {
            name: 'Content Marketing',
            description: 'Value-driven content creation and distribution',
            budget: goals.budget * 0.25,
            expectedROI: 3.8,
            keyMetrics: ['Organic Traffic', 'Time on Page', 'Content Shares'],
            contentTypes: ['Blog Posts', 'Case Studies', 'Video Tutorials']
          },
          {
            name: 'Email Marketing',
            description: 'Personalized communication and nurturing campaigns',
            budget: goals.budget * 0.2,
            expectedROI: 5.1,
            keyMetrics: ['Open Rate', 'Click Rate', 'Conversion Rate'],
            contentTypes: ['Newsletters', 'Promotional Offers', 'Educational Series']
          },
          {
            name: 'Search Engine Optimization',
            description: 'Organic visibility and traffic growth',
            budget: goals.budget * 0.15,
            expectedROI: 2.9,
            keyMetrics: ['Keyword Rankings', 'Organic Traffic', 'Backlinks'],
            contentTypes: ['Optimized Content', 'Technical SEO', 'Local SEO']
          },
          {
            name: 'Paid Advertising',
            description: 'Targeted paid campaigns for immediate results',
            budget: goals.budget * 0.1,
            expectedROI: 2.5,
            keyMetrics: ['CPC', 'Conversion Rate', 'ROAS'],
            contentTypes: ['Search Ads', 'Social Ads', 'Display Ads']
          }
        ],
        budgetAllocation: [
          { channel: 'Social Media', percentage: 30, amount: goals.budget * 0.3, rationale: 'High engagement potential and brand building' },
          { channel: 'Content Marketing', percentage: 25, amount: goals.budget * 0.25, rationale: 'Long-term organic growth and authority building' },
          { channel: 'Email Marketing', percentage: 20, amount: goals.budget * 0.2, rationale: 'High ROI and customer retention' },
          { channel: 'SEO', percentage: 15, amount: goals.budget * 0.15, rationale: 'Sustainable organic traffic growth' },
          { channel: 'Paid Ads', percentage: 10, amount: goals.budget * 0.1, rationale: 'Immediate results and testing' }
        ],
        timeline: [
          {
            phase: 'Foundation & Setup',
            duration: 'Weeks 1-4',
            activities: [
              'Audit current marketing presence',
              'Set up analytics and tracking',
              'Develop brand messaging',
              'Create content calendar'
            ],
            goals: ['Establish brand presence', 'Set up tracking systems']
          },
          {
            phase: 'Growth & Engagement',
            duration: 'Weeks 5-12',
            activities: [
              'Launch social media campaigns',
              'Publish weekly content',
              'Build email list',
              'Run targeted ads'
            ],
            goals: ['Increase brand awareness', 'Grow engaged audience']
          },
          {
            phase: 'Optimization & Scale',
            duration: 'Months 4-6',
            activities: [
              'Analyze performance data',
              'Optimize high-performing channels',
              'Scale successful campaigns',
              'Expand to new audiences'
            ],
            goals: ['Maximize ROI', 'Scale proven strategies']
          }
        ],
        keyMessages: [
          'Focus on solving customer pain points',
          'Highlight unique value proposition',
          'Build trust through social proof',
          'Create urgency with limited offers'
        ],
        targetPersonas: [
          {
            name: 'Professional Decision-Maker',
            demographics: ['35-55 years old', 'College educated', 'Business professional'],
            painPoints: ['Time constraints', 'Need for reliable solutions', 'Budget management'],
            motivations: ['Efficiency', 'Professional growth', 'Competitive advantage'],
            preferredChannels: ['LinkedIn', 'Industry publications', 'Email newsletters']
          },
          {
            name: 'Tech-Savvy Early Adopter',
            demographics: ['25-40 years old', 'Urban professional', 'Digital native'],
            painPoints: ['Outdated solutions', 'Poor user experience', 'Lack of innovation'],
            motivations: ['Innovation', 'Time savings', 'Social proof'],
            preferredChannels: ['Twitter', 'Product Hunt', 'Tech blogs']
          }
        ]
      };
      
      setGeneratedStrategy(mockStrategy);
      onStrategyGenerated(mockStrategy);
      setIsGenerating(false);
    }, 3500);
  };

  const ChannelCard: React.FC<{ channel: any }> = ({ channel }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800">{channel.name}</h4>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
          ROI: {channel.expectedROI}x
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <div className="text-gray-500">Budget</div>
          <div className="font-medium">${channel.budget.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Expected Value</div>
          <div className="font-medium">${(channel.budget * channel.expectedROI).toLocaleString()}</div>
        </div>
      </div>
      <div className="text-xs text-gray-600">
        <strong>Metrics:</strong> {channel.keyMetrics.join(', ')}
      </div>
    </div>
  );

  const BudgetChart: React.FC<{ allocations: any[] }> = ({ allocations }) => (
    <div className="space-y-3">
      {allocations.map((allocation, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-gray-700">{allocation.channel}</span>
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${allocation.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-16 text-right">
              {allocation.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Marketing Strategy Generator</h3>
          <p className="text-gray-600">Get a comprehensive, data-driven marketing strategy</p>
        </div>
        <button
          onClick={generateStrategy}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating Strategy...' : 'Generate Strategy'}
        </button>
      </div>

      {goals.primaryGoal && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-700 text-sm">
            Creating strategy for: <strong>{goals.primaryGoal}</strong> with ${goals.budget.toLocaleString()} budget
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedStrategy && (
        <div className="space-y-6">
          {/* Strategy Navigation */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: '📊 Overview' },
              { id: 'channels', label: '📢 Channels' },
              { id: 'budget', label: '💰 Budget' },
              { id: 'timeline', label: '⏰ Timeline' },
              { id: 'personas', label: '👥 Personas' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  activeSection === item.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Strategy Content */}
          <div className="min-h-[400px]">
            {activeSection === 'overview' && (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Strategy Overview</h4>
                  <p className="text-gray-600 leading-relaxed">{generatedStrategy.overview}</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {generatedStrategy.channels.length}
                    </div>
                    <div className="text-sm text-gray-600">Marketing Channels</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      ${goals.budget.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Budget</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {generatedStrategy.timeline.length}
                    </div>
                    <div className="text-sm text-gray-600">Implementation Phases</div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'channels' && (
              <div className="grid md:grid-cols-2 gap-4">
                {generatedStrategy.channels.map((channel, index) => (
                  <ChannelCard key={index} channel={channel} />
                ))}
              </div>
            )}

            {activeSection === 'budget' && (
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-4">Budget Allocation</h4>
                  <BudgetChart allocations={generatedStrategy.budgetAllocation} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {generatedStrategy.budgetAllocation.map((allocation, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">{allocation.channel}</span>
                        <span className="text-lg font-bold text-purple-600">
                          ${allocation.amount.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{allocation.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'timeline' && (
              <div className="space-y-4">
                {generatedStrategy.timeline.map((phase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">{phase.phase}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {phase.duration}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Key Activities</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Goals</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {phase.goals.map((goal, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-500 mr-2">🎯</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'personas' && (
              <div className="grid md:grid-cols-2 gap-4">
                {generatedStrategy.targetPersonas.map((persona, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">{persona.name}</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="font-medium text-gray-700 text-sm mb-1">Demographics</h5>
                        <div className="flex flex-wrap gap-1">
                          {persona.demographics.map((demo, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {demo}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 text-sm mb-1">Pain Points</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {persona.painPoints.map((pain, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              {pain}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 text-sm mb-1">Preferred Channels</h5>
                        <div className="flex flex-wrap gap-1">
                          {persona.preferredChannels.map((channel, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {channel}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strategy Summary */}
          <div className="border-t pt-6 mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Strategy Performance Predictions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">4.2x</div>
                <div className="text-xs text-gray-600">Avg. ROI</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">85%</div>
                <div className="text-xs text-gray-600">Success Probability</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">6 mos</div>
                <div className="text-xs text-gray-600">Timeline</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">${(goals.budget * 4.2).toLocaleString()}</div>
                <div className="text-xs text-gray-600">Expected Value</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isGenerating && !generatedStrategy && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Create Your Marketing Strategy</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate a comprehensive, data-driven marketing strategy 
            tailored to your business goals and budget.
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketingStrategyGenerator;