import { useState } from "react";
import { Tabs } from "./Tabs";
import { MarketResearchChecklist } from "../checklists/MarketResearchChecklist";
import { BrandingChecklist } from "../checklists/BrandingChecklist";
import { WebsiteChecklist } from "../checklists/WebsiteChecklist";
import { ContentChecklist } from "../checklists/ContentChecklist";
import { LaunchChecklist } from "../checklists/LaunchChecklist";
import BusinessPlanWizard from "../business-plan/BusinessPlanWizard";
import BrandingWizard from "../branding-ai/BrandingWizard";
import WebsiteBuilderWizard from '../website-builder/WebsiteBuilderWizard';
import MarketingAnalyticsSuite from "../marketing-analytics/MarketingAnalyticsSuite";

const BusinessLaunch = () => {
  const [activeTab, setActiveTab] = useState("ai-plan");

  // Define your tabs 
  const tabs = [
    { id: "ai-plan", label: "AI Business Plan" },
    { id: "ai-branding", label: "AI Branding" },
    { id: 'ai-website', label: 'AI Website Builder' },
    { id: "ai-marketing", label: "AI Marketing" },
    { id: "market-research", label: "Market Research" },
    { id: "branding", label: "Branding" },
    { id: "website", label: "Website Setup" },
    { id: "content", label: "Content Strategy" },
    { id: "launch", label: "Launch Week" },
  ];

   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
            Everything you need to launch and grow your business, from AI-powered planning to execution.
          </p>
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
          <div className="border-b border-gray-200 bg-gray-50/50 px-3 sm:px-6 py-4">
            <div className="overflow-x-auto">
              <Tabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
          
          {/* Content Area */}
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-white to-gray-50/30">
            <div className="min-h-[600px] animate-fade-in">
              {/* AI BUSINESS PLAN TAB */}
              {activeTab === 'ai-plan' && <BusinessPlanWizard />}
              
              {/* AI BRANDING TAB */}
              {activeTab === 'ai-branding' && <BrandingWizard />}
              
              {/* NEW AI WEBSITE BUILDER TAB */}
              {activeTab === 'ai-website' && <WebsiteBuilderWizard />}

              {/* NEW AI MARKETING ANALYTICS TAB */}
              {activeTab === 'ai-marketing' && <MarketingAnalyticsSuite />}
              
              {/* EXISTING CHECKLIST TABS */}
              {activeTab === 'market-research' && <MarketResearchChecklist />}
              {activeTab === 'branding' && <BrandingChecklist />}
              {activeTab === 'website' && <WebsiteChecklist />}
              {activeTab === 'content' && <ContentChecklist />}
              {activeTab === 'launch' && <LaunchChecklist />}
            </div>
          </div>
        </div>

        {/* Update Help Section to include Marketing */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Planning</h3>
            <p className="text-sm text-gray-600">Generate complete business plans with AI assistance</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Branding</h3>
            <p className="text-sm text-gray-600">Create complete brand identity with AI tools</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Website Builder</h3>
            <p className="text-sm text-gray-600">Build complete websites with AI assistance</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Marketing Analytics</h3>
            <p className="text-sm text-gray-600">Complete marketing strategy & analytics suite</p>
          </div>
        </div>

        {/* Update Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">9</div>
            <div className="text-gray-600">Comprehensive Tools</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">AI-Powered</div>
            <div className="text-gray-600">Business Planning</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">AI-Powered</div>
            <div className="text-gray-600">Brand Creation</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">AI-Powered</div>
            <div className="text-gray-600">Marketing Analytics</div>
          </div>
        </div>

        {/* Update AI Features Highlight */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Launch Your Business 10x Faster with AI
          </h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            From business planning to complete brand identity, professional websites, and marketing strategy - everything powered by artificial intelligence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <span className="text-left">AI Business Plan Generator</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🎨</span>
              </div>
              <span className="text-left">AI Brand Name & Logo Generator</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🌐</span>
              </div>
              <span className="text-left">AI Website Builder & Deployer</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <span className="text-left">AI Marketing Strategy Generator</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">💬</span>
              </div>
              <span className="text-left">AI Brand Voice Definer</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm">🔍</span>
              </div>
              <span className="text-left">AI Competitor Analysis</span>
            </div>
          </div>
        </div>

        {/* Update Success Stories */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-green-500 text-2xl mb-3">✓</div>
            <h4 className="font-semibold text-gray-800 mb-2">Complete Business Plan</h4>
            <p className="text-gray-600 text-sm">Generate comprehensive business plans with financial projections in minutes</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-purple-500 text-2xl mb-3">✓</div>
            <h4 className="font-semibold text-gray-800 mb-2">Full Brand Identity</h4>
            <p className="text-gray-600 text-sm">Create complete brand kits with logos, colors, and voice guidelines</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-blue-500 text-2xl mb-3">✓</div>
            <h4 className="font-semibold text-gray-800 mb-2">Professional Website</h4>
            <p className="text-gray-600 text-sm">Build and deploy SEO-optimized websites with AI-generated content</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="text-orange-500 text-2xl mb-3">✓</div>
            <h4 className="font-semibold text-gray-800 mb-2">Marketing Strategy</h4>
            <p className="text-gray-600 text-sm">Complete marketing plans with analytics and competitor analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessLaunch;