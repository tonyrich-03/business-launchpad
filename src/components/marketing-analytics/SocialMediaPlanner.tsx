import React, { useState } from 'react';
import type { SocialMediaPlan, MarketingStrategy } from './types';

interface SocialMediaPlannerProps {
  marketingStrategy: MarketingStrategy;
  onPlanGenerated: (plan: SocialMediaPlan) => void;
}

const SocialMediaPlanner: React.FC<SocialMediaPlannerProps> = ({
  onPlanGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [socialMediaPlan, setSocialMediaPlan] = useState<SocialMediaPlan | null>(null);

  const generateSocialMediaPlan = async () => {
    setIsGenerating(true);
    
    // Simulate AI plan generation
    setTimeout(() => {
      const mockPlan: SocialMediaPlan = {
        platforms: [
          {
            name: 'LinkedIn',
            audience: 'Professionals & Businesses',
            contentStrategy: 'Thought leadership & industry insights',
            postingFrequency: '3-5 times per week',
            keyMetrics: ['Engagement rate', 'Click-through rate', 'Lead generation']
          },
          {
            name: 'Twitter',
            audience: 'Tech enthusiasts & real-time engagement',
            contentStrategy: 'Quick updates, news & conversations',
            postingFrequency: '1-3 times daily',
            keyMetrics: ['Retweets', 'Likes', 'Mentions']
          },
          {
            name: 'Instagram',
            audience: 'Visual learners & creative professionals',
            contentStrategy: 'Visual storytelling & behind-the-scenes',
            postingFrequency: '1-2 times daily',
            keyMetrics: ['Reach', 'Saves', 'Story views']
          }
        ],
        postingSchedule: [
          {
            platform: 'LinkedIn',
            bestTimes: ['8:00 AM', '12:00 PM', '5:00 PM'],
            frequency: 'Weekdays',
            contentTypes: ['Articles', 'Case studies', 'Industry news']
          },
          {
            platform: 'Twitter',
            bestTimes: ['7:00 AM', '12:00 PM', '3:00 PM', '7:00 PM'],
            frequency: 'Daily',
            contentTypes: ['Threads', 'Polls', 'Quick tips']
          }
        ],
        contentMix: [
          {
            type: 'Educational',
            percentage: 40,
            examples: ['How-to guides', 'Industry insights', 'Tutorials']
          },
          {
            type: 'Promotional',
            percentage: 20,
            examples: ['Product updates', 'Special offers', 'Case studies']
          },
          {
            type: 'Engaging',
            percentage: 30,
            examples: ['Polls', 'Questions', 'User stories']
          },
          {
            type: 'Entertaining',
            percentage: 10,
            examples: ['Memes', 'Behind-the-scenes', 'Team culture']
          }
        ],
        growthTargets: {
          followers: 5000,
          engagement: 8.5,
          websiteClicks: 1200,
          timeframe: '3 months'
        }
      };
      
      setSocialMediaPlan(mockPlan);
      onPlanGenerated(mockPlan);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Social Media Planner</h3>
          <p className="text-gray-600">Generate optimized social media strategy and content calendar</p>
        </div>
        <button
          onClick={generateSocialMediaPlan}
          disabled={isGenerating}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isGenerating ? 'Generating Plan...' : 'Generate Social Media Plan'}
        </button>
      </div>

      {socialMediaPlan ? (
        <div className="space-y-6">
          {/* Platforms Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform Strategy</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {socialMediaPlan.platforms.map((platform, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800">{platform.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">{platform.audience}</p>
                  <p className="text-sm text-gray-700 mt-2">{platform.contentStrategy}</p>
                  <p className="text-xs text-gray-500 mt-2">Frequency: {platform.postingFrequency}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Mix Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Content Mix</h4>
            <div className="space-y-3">
              {socialMediaPlan.contentMix.map((content, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{content.type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${content.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{content.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Targets */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">Growth Targets</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{socialMediaPlan.growthTargets.followers.toLocaleString()}</p>
                <p className="text-sm text-blue-700">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{socialMediaPlan.growthTargets.engagement}%</p>
                <p className="text-sm text-blue-700">Engagement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{socialMediaPlan.growthTargets.websiteClicks.toLocaleString()}</p>
                <p className="text-sm text-blue-700">Website Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{socialMediaPlan.growthTargets.timeframe}</p>
                <p className="text-sm text-blue-700">Timeframe</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No social media plan generated yet. Click the button above to create an AI-optimized strategy.</p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPlanner;