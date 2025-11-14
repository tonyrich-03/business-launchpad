import React, { useState } from 'react';
import type { EmailCampaign, MarketingStrategy } from './types';

interface EmailCampaignBuilderProps {
  marketingStrategy: MarketingStrategy;
  onCampaignsGenerated: (campaigns: EmailCampaign[]) => void;
}

const EmailCampaignBuilder: React.FC<EmailCampaignBuilderProps> = ({
  onCampaignsGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);

  const generateCampaigns = async () => {
    setIsGenerating(true);
    
    // Simulate AI campaign generation
    setTimeout(() => {
      const mockCampaigns: EmailCampaign[] = [
        {
          id: '1',
          name: 'Welcome Series',
          audience: 'New Subscribers',
          subject: 'Welcome to Our Community!',
          content: 'Thank you for joining us...',
          schedule: new Date(),
          goals: ['Onboarding', 'Engagement'],
          metrics: {
            openRate: 42.5,
            clickRate: 8.3,
            conversions: 15,
            unsubscribeRate: 0.2
          }
        },
        {
          id: '2',
          name: 'Product Launch',
          audience: 'Existing Customers',
          subject: 'New Feature Released!',
          content: 'We are excited to announce...',
          schedule: new Date(Date.now() + 86400000),
          goals: ['Feature Adoption', 'Upsell'],
          metrics: {
            openRate: 38.7,
            clickRate: 6.8,
            conversions: 12,
            unsubscribeRate: 0.4
          }
        }
      ];
      
      setCampaigns(mockCampaigns);
      onCampaignsGenerated(mockCampaigns);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Email Campaign Builder</h3>
          <p className="text-gray-600">Generate personalized email campaigns based on your marketing strategy</p>
        </div>
        <button
          onClick={generateCampaigns}
          disabled={isGenerating}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isGenerating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isGenerating ? 'Generating Campaigns...' : 'Generate Email Campaigns'}
        </button>
      </div>

      <div className="space-y-4">
        {campaigns.length > 0 ? (
          <div>
            <h4 className="text-lg font-semibold mb-4">Generated Campaigns</h4>
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border rounded-lg p-4 mb-4">
                <h5 className="font-semibold">{campaign.name}</h5>
                <p className="text-gray-600">{campaign.subject}</p>
                <p className="text-sm text-gray-500">Audience: {campaign.audience}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No campaigns generated yet. Click the button above to create AI-powered email campaigns.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCampaignBuilder;