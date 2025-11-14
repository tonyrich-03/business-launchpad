import React from 'react';
import type { MarketResearch as MarketResearchType } from './types';

interface MarketResearchProps {
  research: MarketResearchType;
  isLoading?: boolean;
}

const MarketResearch: React.FC<MarketResearchProps> = ({ research, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Analyzing Market...</h3>
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
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Market Research</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Market Overview</h4>
          <p className="text-gray-600 mb-4">{research.marketSize}</p>
          
          <h4 className="font-medium text-gray-700 mb-3">Key Trends</h4>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {research.trends.map((trend, index) => (
              <li key={index}>{trend}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-700 mb-3">Opportunities</h4>
          <ul className="list-disc list-inside text-green-600 space-y-1">
            {research.opportunities.map((opportunity, index) => (
              <li key={index}>{opportunity}</li>
            ))}
          </ul>

          <h4 className="font-medium text-gray-700 mb-3 mt-4">Potential Threats</h4>
          <ul className="list-disc list-inside text-red-600 space-y-1">
            {research.threats.map((threat, index) => (
              <li key={index}>{threat}</li>
            ))}
          </ul>
        </div>
      </div>

      {research.competitors.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-700 mb-3">Competitor Analysis</h4>
          <div className="space-y-3">
            {research.competitors.map((competitor, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="font-medium">{competitor.name}</div>
                <div className="text-sm text-gray-600">
                  <span className="text-green-600">Strengths: {competitor.strength}</span> • 
                  <span className="text-red-600"> Weaknesses: {competitor.weakness}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketResearch;