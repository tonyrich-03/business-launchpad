import React, { useState } from 'react';
import { Tabs } from '../businesslaunch/Tabs';
import MarketingAnalyticsWizard from './MarketingAnalyticsWizard';
import MarketingStrategyGenerator from './MarketingStrategyGenerator';
import ContentCalendarGenerator from './ContentCalendarGenerator';
import SocialMediaPlanner from './SocialMediaPlanner';
import EmailCampaignBuilder from './EmailCampaignBuilder';
import AnalyticsDashboard from './AnalyticsDashboard';
import CompetitorAnalyzer from './CompetitorAnalyzer';
import type {
  MarketingGoals,
  MarketingStrategy,
  ContentCalendar,
  SocialMediaPlan,
  EmailCampaign,
  AnalyticsData
} from './types';

// Create default/empty objects for initial state
const defaultMarketingStrategy: MarketingStrategy = {
  overview: '',
  channels: [],
  budgetAllocation: [],
  timeline: [],
  keyMessages: [],
  targetPersonas: []
};

const defaultMarketingGoals: MarketingGoals = {
  primaryGoal: '',
  secondaryGoals: [],
  targetAudience: '',
  budget: 0,
  timeline: '',
  kpis: []
};

const MarketingAnalyticsSuite: React.FC = () => {
  const [activeTab, setActiveTab] = useState('wizard');
  const [wizardData, setWizardData] = useState<{
    goals?: MarketingGoals;
    strategy?: MarketingStrategy;
    contentCalendar?: ContentCalendar;
    socialMediaPlan?: SocialMediaPlan;
    emailCampaigns?: EmailCampaign[];
    analytics?: AnalyticsData;
  }>({});

  const handleWizardComplete = (data: {
    goals: MarketingGoals;
    strategy: MarketingStrategy;
    contentCalendar: ContentCalendar;
    socialMediaPlan: SocialMediaPlan;
    emailCampaigns: EmailCampaign[];
    analytics: AnalyticsData;
  }) => {
    setWizardData(data);
    setActiveTab('analytics');
  };

  const handleStrategyGenerated = (strategy: MarketingStrategy) => {
    setWizardData(prev => ({ ...prev, strategy }));
  };

  const handleContentCalendarGenerated = (contentCalendar: ContentCalendar) => {
    setWizardData(prev => ({ ...prev, contentCalendar }));
  };

  const handleSocialMediaPlanGenerated = (socialMediaPlan: SocialMediaPlan) => {
    setWizardData(prev => ({ ...prev, socialMediaPlan }));
  };

  const handleEmailCampaignsGenerated = (emailCampaigns: EmailCampaign[]) => {
    setWizardData(prev => ({ ...prev, emailCampaigns }));
  };

  const handleAnalyticsGenerated = (analytics: AnalyticsData) => {
    setWizardData(prev => ({ ...prev, analytics }));
  };

  const marketingTabs = [
    { id: 'wizard', label: 'AI Wizard' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'content', label: 'Content' },
    { id: 'social', label: 'Social Media' },
    { id: 'email', label: 'Email' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'competitor', label: 'Competitor' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'wizard':
        return <MarketingAnalyticsWizard onWizardComplete={handleWizardComplete} />;
      case 'strategy':
        return (
          <MarketingStrategyGenerator 
            goals={wizardData.goals || defaultMarketingGoals}
            onStrategyGenerated={handleStrategyGenerated}
          />
        );
      case 'content':
        return (
          <ContentCalendarGenerator 
            marketingStrategy={wizardData.strategy || defaultMarketingStrategy}
            onCalendarGenerated={handleContentCalendarGenerated}
          />
        );
      case 'social':
        return (
          <SocialMediaPlanner 
            marketingStrategy={wizardData.strategy || defaultMarketingStrategy}
            onPlanGenerated={handleSocialMediaPlanGenerated}
          />
        );
      case 'email':
        return (
          <EmailCampaignBuilder 
            marketingStrategy={wizardData.strategy || defaultMarketingStrategy}
            onCampaignsGenerated={handleEmailCampaignsGenerated}
          />
        );
      case 'analytics':
        return (
          <AnalyticsDashboard 
            marketingStrategy={wizardData.strategy || defaultMarketingStrategy}
            onAnalyticsGenerated={handleAnalyticsGenerated}
          />
        );
      case 'competitor':
        return <CompetitorAnalyzer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Marketing & Analytics Suite
          </h1>
          <p className="text-gray-600 mt-2">
            End-to-end AI-powered marketing strategy, planning, and analytics
          </p>
        </div>

        {/* Use your custom Tabs component */}
        <div className="mb-6">
          <Tabs 
            tabs={marketingTabs} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {renderTabContent()}
        </div>

        {/* Data Summary */}
        {wizardData.strategy && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Marketing Data Generated
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div>
                <p className="font-semibold text-green-700">Goals</p>
                <p className="text-green-600">
                  {wizardData.goals ? '✓' : '○'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Strategy</p>
                <p className="text-green-600">
                  {wizardData.strategy ? '✓' : '○'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Content</p>
                <p className="text-green-600">
                  {wizardData.contentCalendar ? '✓' : '○'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Social Media</p>
                <p className="text-green-600">
                  {wizardData.socialMediaPlan ? '✓' : '○'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Email</p>
                <p className="text-green-600">
                  {wizardData.emailCampaigns ? '✓' : '○'}
                </p>
              </div>
              <div>
                <p className="font-semibold text-green-700">Analytics</p>
                <p className="text-green-600">
                  {wizardData.analytics ? '✓' : '○'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketingAnalyticsSuite;