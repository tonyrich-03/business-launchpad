import React, { useState } from 'react';
import type { BusinessIdea } from './types';

interface BusinessIdeaInputProps {
  onIdeaSubmit: (idea: BusinessIdea) => void;
}

const industries = [
  'Technology',
  'E-commerce',
  'Healthcare',
  'Education',
  'Food & Beverage',
  'Finance',
  'Real Estate',
  'Creative Services',
  'Consulting',
  'Other'
];

const BusinessIdeaInput: React.FC<BusinessIdeaInputProps> = ({ onIdeaSubmit }) => {
  const [idea, setIdea] = useState<BusinessIdea>({
    title: '',
    description: '',
    industry: '',
    targetAudience: '',
    uniqueValue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.title && idea.description && idea.industry) {
      onIdeaSubmit(idea);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell Us About Your Business Idea</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={idea.title}
            onChange={(e) => setIdea({ ...idea, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your business name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            value={idea.industry}
            onChange={(e) => setIdea({ ...idea, industry: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            value={idea.description}
            onChange={(e) => setIdea({ ...idea, description: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your business idea, what problem it solves, and how it works..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            value={idea.targetAudience}
            onChange={(e) => setIdea({ ...idea, targetAudience: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Young professionals, Small businesses, Parents..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unique Value Proposition
          </label>
          <textarea
            value={idea.uniqueValue}
            onChange={(e) => setIdea({ ...idea, uniqueValue: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What makes your business different from competitors?"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          Generate Business Plan
        </button>
      </form>
    </div>
  );
};

export default BusinessIdeaInput;