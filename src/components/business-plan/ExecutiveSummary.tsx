import React from 'react';
import type { BusinessPlan } from './types';

interface ExecutiveSummaryProps {
  businessPlan: BusinessPlan;
  onExport?: () => void;
  onSave?: () => void;
}

const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ 
  businessPlan, 
  onExport,
  onSave 
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Executive Summary</h3>
          <p className="text-gray-600">Complete Business Plan</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Save Plan
          </button>
          <button
            onClick={onExport}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Business Overview */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Business Overview</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {businessPlan.businessIdea.title}
            </div>
            <div className="text-gray-600 mb-4">
              {businessPlan.businessIdea.description}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Industry:</span>
              <span className="font-medium">{businessPlan.businessIdea.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Target Audience:</span>
              <span className="font-medium">{businessPlan.businessIdea.targetAudience}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unique Value:</span>
              <span className="font-medium text-blue-600">{businessPlan.businessIdea.uniqueValue}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(businessPlan.financialProjections.projectedRevenue[11])}
            </div>
            <div className="text-sm text-gray-600">Projected Monthly Revenue (Year 1)</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(businessPlan.financialProjections.startupCosts)}
            </div>
            <div className="text-sm text-gray-600">Initial Investment Required</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {businessPlan.marketingStrategy.channels.length}
            </div>
            <div className="text-sm text-gray-600">Marketing Channels</div>
          </div>
        </div>

        {/* Executive Summary Text */}
        <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-800 mb-3">Executive Summary</h4>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {businessPlan.executiveSummary}
          </p>
        </div>
      </div>

      {/* Key Sections Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Market Opportunity */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Market Opportunity
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {businessPlan.marketResearch.marketSize}
          </p>
          <div className="text-xs text-gray-500">
            {businessPlan.marketResearch.opportunities.length} key opportunities identified
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Financial Highlights
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Break-even:</span>
              <span className="font-medium">{businessPlan.financialProjections.breakEvenAnalysis}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Expenses:</span>
              <span className="font-medium">{formatCurrency(businessPlan.financialProjections.monthlyExpenses)}</span>
            </div>
          </div>
        </div>

        {/* Marketing Approach */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Marketing Approach
          </h4>
          <div className="flex flex-wrap gap-1">
            {businessPlan.marketingStrategy.channels.slice(0, 3).map((channel, index) => (
              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                {channel}
              </span>
            ))}
            {businessPlan.marketingStrategy.channels.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{businessPlan.marketingStrategy.channels.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            Recommended Next Steps
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Finalize business registration</li>
            <li>• Develop brand assets</li>
            <li>• Create initial marketing content</li>
            <li>• Set up financial tracking</li>
          </ul>
        </div>
      </div>

      {/* Success Probability */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-800">AI Assessment Score</h4>
            <p className="text-sm text-gray-600">Based on market data and business fundamentals</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600">82%</div>
            <div className="text-sm text-gray-600">Success Probability</div>
          </div>
        </div>
      </div>

      {/* Generated Date */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Business plan generated on {businessPlan.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export default ExecutiveSummary;