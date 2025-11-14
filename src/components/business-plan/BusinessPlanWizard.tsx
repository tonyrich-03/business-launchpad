import React, { useState } from 'react';
import BusinessIdeaInput from './BusinessIdeaInput';
import MarketResearch from './MarketResearch';
import type { BusinessIdea, MarketResearch as MarketResearchType } from './types';

const BusinessPlanWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'research' | 'financial' | 'marketing' | 'summary'>('input');
  const [businessIdea, setBusinessIdea] = useState<BusinessIdea | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [marketResearch, setMarketResearch] = useState<MarketResearchType | null>(null);

  const handleIdeaSubmit = async (idea: BusinessIdea) => {
    setBusinessIdea(idea);
    setIsGenerating(true);
    setCurrentStep('research');

    // Simulate AI analysis - in real app, this would call your backend
    setTimeout(() => {
      const mockResearch: MarketResearchType = {
        marketSize: `The ${idea.industry} market is growing rapidly with an estimated value of $50B annually.`,
        trends: [
          'Increasing demand for digital solutions',
          'Growing focus on sustainability',
          'Rise of remote work solutions',
          'Personalization and AI integration'
        ],
        competitors: [
          {
            name: 'Existing Solution A',
            strength: 'Strong brand recognition',
            weakness: 'Poor user experience'
          },
          {
            name: 'Traditional Service B', 
            strength: 'Established customer base',
            weakness: 'Slow to innovate'
          }
        ],
        opportunities: [
          'Untapped niche in the market',
          'Growing target audience',
          'Technology advancements enabling new features'
        ],
        threats: [
          'Established competitors with large budgets',
          'Market saturation in some segments',
          'Regulatory changes'
        ]
      };

      setMarketResearch(mockResearch);
      setIsGenerating(false);
    }, 2000);
  };

  const generateExecutiveSummary = (): string => {
    if (!businessIdea || !marketResearch) return '';
    
    return `${businessIdea.title} is positioned to capitalize on the growing ${businessIdea.industry} market. 
    With a focus on ${businessIdea.uniqueValue || 'innovative solutions'}, the business targets ${businessIdea.targetAudience || 'a broad market'}.
    Key opportunities include ${marketResearch.opportunities[0]?.toLowerCase() || 'market growth'} while addressing challenges like ${marketResearch.threats[0]?.toLowerCase() || 'competition'}.`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-2">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Business Plan Generator</h1>
          <p className="text-gray-600 mt-2">Get a comprehensive business plan in minutes</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-6">
  <div className="flex items-center space-x-0 sm:space-x-4 overflow-x-auto pb-2 w-full justify-center">
    {['input', 'research', 'financial', 'marketing', 'summary'].map((step, index) => (
      <div key={step} className="flex items-center flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            currentStep === step
              ? 'bg-blue-600 text-white'
              : step === 'input' || (businessIdea && index <= 1)
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-600'
          }`}
        >
          {index + 1}
        </div>
        {index < 4 && (
          <div
            className={`w-6 sm:w-12 h-1 ${
              step === 'input' || (businessIdea && index < 1)
                ? 'bg-green-500'
                : 'bg-gray-300'
            }`}
          />
        )}
      </div>
    ))}
  </div>
</div>

        {/* Step Content */}
        {currentStep === 'input' && (
          <BusinessIdeaInput onIdeaSubmit={handleIdeaSubmit} />
        )}

        {currentStep === 'research' && (
          <div className="space-y-6">
            <MarketResearch 
              research={marketResearch!} 
              isLoading={isGenerating}
            />
            
            {!isGenerating && (
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('input')}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep('financial')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Continue to Financials
                </button>
              </div>
            )}
          </div>
        )}

        {/* Executive Summary Preview */}
        {businessIdea && marketResearch && !isGenerating && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Executive Summary Preview</h3>
            <p className="text-blue-800 leading-relaxed">
              {generateExecutiveSummary()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessPlanWizard;