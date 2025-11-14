import React from 'react';
import type { FinancialProjection } from './types';

interface FinancialProjectionsProps {
  projections: FinancialProjection;
  isLoading?: boolean;
}

const FinancialProjections: React.FC<FinancialProjectionsProps> = ({ 
  projections, 
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Generating Financial Projections...</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Financial Projections</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Startup Costs */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Startup Costs</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Legal & Registration</span>
              <span className="font-semibold">${projections.startupCosts * 0.2}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Technology & Tools</span>
              <span className="font-semibold">${projections.startupCosts * 0.3}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Marketing Initial</span>
              <span className="font-semibold">${projections.startupCosts * 0.25}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-sm text-gray-600">Miscellaneous</span>
              <span className="font-semibold">${projections.startupCosts * 0.25}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 border-t border-green-200 mt-2">
              <span className="font-medium text-gray-700">Total Startup Costs</span>
              <span className="font-bold text-green-700">${projections.startupCosts}</span>
            </div>
          </div>
        </div>

        {/* Monthly Expenses */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Monthly Operating Expenses</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-600">Software Subscriptions</span>
              <span className="font-semibold">${projections.monthlyExpenses * 0.2}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-600">Marketing & Ads</span>
              <span className="font-semibold">${projections.monthlyExpenses * 0.35}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-600">Operations</span>
              <span className="font-semibold">${projections.monthlyExpenses * 0.25}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-gray-600">Contingency</span>
              <span className="font-semibold">${projections.monthlyExpenses * 0.2}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 border-t border-red-200 mt-2">
              <span className="font-medium text-gray-700">Total Monthly Expenses</span>
              <span className="font-bold text-red-700">${projections.monthlyExpenses}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-700 mb-4">12-Month Revenue Projection</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
            {projections.projectedRevenue.slice(0, 12).map((revenue, index) => (
              <div key={index} className="text-center p-2 bg-white rounded border">
                <div className="font-medium text-gray-600">Month {index + 1}</div>
                <div className="font-bold text-green-600">${revenue}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Break-even Analysis */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="font-medium text-purple-800 mb-2">Break-even Analysis</h4>
        <p className="text-purple-700 text-sm">{projections.breakEvenAnalysis}</p>
      </div>

      {/* Key Financial Metrics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-white border border-green-200 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {Math.ceil(projections.startupCosts / projections.monthlyExpenses)}
          </div>
          <div className="text-xs text-gray-600">Months to Break-even</div>
        </div>
        <div className="text-center p-3 bg-white border border-blue-200 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            ${(projections.projectedRevenue[11] - projections.monthlyExpenses).toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Projected Monthly Profit (Month 12)</div>
        </div>
        <div className="text-center p-3 bg-white border border-purple-200 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            ${projections.projectedRevenue[11].toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Projected Monthly Revenue (Month 12)</div>
        </div>
        <div className="text-center p-3 bg-white border border-orange-200 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {((projections.projectedRevenue[11] - projections.projectedRevenue[0]) / projections.projectedRevenue[0] * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-gray-600">Revenue Growth (12 Months)</div>
        </div>
      </div>
    </div>
  );
};

export default FinancialProjections;