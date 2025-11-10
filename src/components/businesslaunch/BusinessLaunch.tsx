import { useState } from 'react';
import { Tabs } from './Tabs';
import { MarketResearchChecklist } from '../checklists/MarketResearchChecklist';
import { BrandingChecklist } from '../checklists/BrandingChecklist';
import { WebsiteChecklist } from '../checklists/WebsiteChecklist';
import { ContentChecklist } from '../checklists/ContentChecklist';
import { LaunchChecklist } from '../checklists/LaunchChecklist';
import AIBrandingAssistant from './AIBrandingAssistant';

const BusinessLaunch = () => {
  const [activeTab, setActiveTab] = useState('market-research');
  
  // Define your tabs
  const tabs = [
    { id: 'market-research', label: 'Market Research' },
    { id: 'branding', label: 'Branding' },
    { id: 'website', label: 'Website Setup' },
    { id: 'content', label: 'Content Strategy' },
    { id: 'launch', label: 'Launch Week' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Business Launch Center
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to launch and grow your business, from branding to market strategy.
          </p>
          
          {/* AI Branding Help Button */}
          <div className="flex justify-center mt-6">
            <AIBrandingAssistant />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Launch Progress</span>
            <span className="text-sm font-semibold text-blue-600">
              Step {tabs.findIndex(tab => tab.id === activeTab) + 1} of {tabs.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${((tabs.findIndex(tab => tab.id === activeTab) + 1) / tabs.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Tabs Section */}
          <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          
          {/* Content Area */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/30">
            <div className="min-h-[500px] animate-fade-in">
              {activeTab === 'market-research' && <MarketResearchChecklist />}
              {activeTab === 'branding' && <BrandingChecklist />}
              {activeTab === 'website' && <WebsiteChecklist />}
              {activeTab === 'content' && <ContentChecklist />}
              {activeTab === 'launch' && <LaunchChecklist />}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Step-by-Step Guide</h3>
            <p className="text-sm text-gray-600">Follow each stage systematically for best results</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
            <p className="text-sm text-gray-600">Complete checklist prevents missing critical steps</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
            <p className="text-sm text-gray-600">Monitor your launch journey with visual indicators</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{tabs.length}</div>
            <div className="text-gray-600">Checklists</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">AI-Powered</div>
            <div className="text-gray-600">Branding Assistant</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">50+</div>
            <div className="text-gray-600">Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunch;