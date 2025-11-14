import React, { useState } from 'react';
import { 
  Search, 
  TrendingUp, 
  Users, 
  Share2,
  AlertTriangle,
  CheckCircle2 
} from 'lucide-react';
import Input from '../ui/input';
import type { Competitor } from './types';

const mockCompetitors: Competitor[] = [
  {
    name: 'TechCorp Inc',
    strengths: ['Strong brand recognition', 'Large customer base', 'Advanced technology stack'],
    weaknesses: ['Limited social media presence', 'Slow customer support response'],
    strategy: 'Enterprise-focused solutions with premium pricing',
    marketShare: 35
  },
  {
    name: 'InnovateLabs',
    strengths: ['Agile development', 'Strong social media engagement', 'Innovative features'],
    weaknesses: ['Limited funding', 'Small team size', 'Brand awareness'],
    strategy: 'SMB-focused with freemium model',
    marketShare: 18
  }
];

const CompetitorAnalyzer: React.FC = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>(mockCompetitors);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('swot');

  const analyzeCompetitor = async () => {
    if (!searchQuery.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add new competitor analysis
    const newCompetitor: Competitor = {
      name: searchQuery,
      strengths: ['Analyzing...', 'Data collection in progress'],
      weaknesses: ['Analysis pending', 'More data needed'],
      strategy: 'Under analysis',
      marketShare: 0
    };
    
    setCompetitors(prev => [...prev, newCompetitor]);
    setSearchQuery('');
    setIsAnalyzing(false);
  };

  const CompetitorCard = ({ competitor }: { competitor: Competitor; index: number }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {competitor.name}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              competitor.marketShare >= 30 
                ? 'bg-green-100 text-green-800'
                : competitor.marketShare >= 15
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {competitor.marketShare}% market share
            </span>
          </h3>
          <p className="text-gray-600 text-sm mt-1">{competitor.strategy}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            Strengths
          </h4>
          <div className="space-y-2">
            {competitor.strengths.map((strength, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-4 w-4" />
            Weaknesses
          </h4>
          <div className="space-y-2">
            {competitor.weaknesses.map((weakness, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{weakness}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-semibold text-sm mb-3 text-gray-700">Competitive Position</h4>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Market Share</span>
              <span>{competitor.marketShare}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${competitor.marketShare}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Competitor Analysis</h1>
          <p className="text-gray-600">Analyze and benchmark against your competitors</p>
        </div>
      </div>

      {/* Search and Analyze Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              label="Add Competitor"
              placeholder="Enter competitor website or company name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
              size="md"
              variant="filled"
              helperText="Enter a competitor's website or company name to analyze"
              onKeyPress={(e) => e.key === 'Enter' && analyzeCompetitor()}
            />
          </div>
          <button
            onClick={analyzeCompetitor}
            disabled={isAnalyzing || !searchQuery.trim()}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap ${
              isAnalyzing || !searchQuery.trim()
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200'
            }`}
          >
            <Search className="h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'swot', label: 'SWOT Analysis' },
            { id: 'market', label: 'Market Position' },
            { id: 'strategy', label: 'Strategy Comparison' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* SWOT Analysis Tab */}
      {activeTab === 'swot' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {competitors.map((competitor, index) => (
              <CompetitorCard key={index} competitor={competitor} index={index} />
            ))}
          </div>
          
          {competitors.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Competitors Analyzed</h3>
              <p className="text-gray-600 mb-4">Add competitors to start your analysis</p>
            </div>
          )}
        </div>
      )}

      {/* Market Position Tab */}
      {activeTab === 'market' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Market Share Comparison</h3>
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{competitor.name}</h4>
                    <p className="text-sm text-gray-600">{competitor.strategy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{competitor.marketShare}%</p>
                  <p className="text-sm text-gray-600">Market Share</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategy Comparison Tab */}
      {activeTab === 'strategy' && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Strategy Comparison</h3>
          <div className="space-y-6">
            {competitors.map((competitor, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-blue-500" />
                  {competitor.name}
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Business Strategy</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{competitor.strategy}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Target Market</p>
                      <p className="text-sm text-gray-600">
                        {competitor.marketShare >= 30 ? 'Enterprise' : 
                         competitor.marketShare >= 15 ? 'Mid-market' : 'SMB'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Market Position</p>
                      <p className="text-sm text-gray-600">
                        {competitor.marketShare >= 30 ? 'Market Leader' : 
                         competitor.marketShare >= 15 ? 'Strong Contender' : 'Emerging Player'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Opportunities & Threats Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Opportunities & Threats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Market Opportunities
            </h4>
            <div className="space-y-2">
              {[
                'Growing demand for AI-powered solutions',
                'Expansion into emerging markets',
                'Increasing mobile adoption',
                'New partnership opportunities'
              ].map((opportunity, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Market Threats
            </h4>
            <div className="space-y-2">
              {[
                'Increasing competition from new entrants',
                'Economic uncertainty affecting budgets',
                'Rapid technology changes',
                'Regulatory changes in key markets'
              ].map((threat, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAnalyzer;