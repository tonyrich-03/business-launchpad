import React, { useState } from 'react';
import type { WebsiteTemplate, WebsiteRequirements } from './types';

interface WebsiteTemplateSelectorProps {
  requirements: WebsiteRequirements;
  onTemplateSelected: (template: WebsiteTemplate) => void;
}

const WebsiteTemplateSelector: React.FC<WebsiteTemplateSelectorProps> = ({
  requirements,
  onTemplateSelected
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendedTemplates, setRecommendedTemplates] = useState<WebsiteTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null);

  const generateTemplates = async () => {
    setIsGenerating(true);
    
    // Simulate AI template recommendation
    setTimeout(() => {
      const mockTemplates: WebsiteTemplate[] = [
        {
          id: '1',
          name: 'Nexus Pro',
          description: 'Modern corporate website with clean lines and professional aesthetic',
          category: 'Corporate',
          style: 'Modern & Professional',
          previewImage: '/api/placeholder/300/200',
          colors: ['#3B82F6', '#1E40AF', '#6B7280'],
          features: ['Hero section', 'Services grid', 'Testimonials', 'Contact form'],
          recommendedFor: ['Consulting', 'Professional Services', 'Technology']
        },
        {
          id: '2',
          name: 'Creative Flow',
          description: 'Vibrant and dynamic design perfect for creative agencies and portfolios',
          category: 'Creative',
          style: 'Modern & Artistic',
          previewImage: '/api/placeholder/300/200',
          colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
          features: ['Portfolio grid', 'Animation effects', 'Colorful sections', 'Interactive elements'],
          recommendedFor: ['Design Agencies', 'Freelancers', 'Creative Studios']
        },
        {
          id: '3',
          name: 'E-commerce Elite',
          description: 'Optimized online store with product showcases and seamless shopping experience',
          category: 'E-commerce',
          style: 'Modern & Functional',
          previewImage: '/api/placeholder/300/200',
          colors: ['#059669', '#DC2626', '#D97706'],
          features: ['Product catalog', 'Shopping cart', 'Payment integration', 'Inventory management'],
          recommendedFor: ['Retail', 'Online Stores', 'Product Businesses']
        },
        {
          id: '4',
          name: 'Startup Launch',
          description: 'Fast-loading, conversion-focused design for startups and tech companies',
          category: 'Startup',
          style: 'Modern & Minimal',
          previewImage: '/api/placeholder/300/200',
          colors: ['#2563EB', '#7C3AED', '#0F766E'],
          features: ['Feature highlights', 'Pricing tables', 'Team section', 'CTA optimization'],
          recommendedFor: ['Startups', 'SaaS', 'Tech Companies']
        }
      ];
      
      setRecommendedTemplates(mockTemplates);
      setIsGenerating(false);
    }, 2000);
  };

  const TemplateCard: React.FC<{ template: WebsiteTemplate; isSelected: boolean }> = ({ 
    template, 
    isSelected 
  }) => (
    <div
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => {
        setSelectedTemplate(template);
        onTemplateSelected(template);
      }}
    >
      {/* Template Preview */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">{template.category}</div>
          <div className="text-sm text-gray-600">Template Preview</div>
        </div>
      </div>

      {/* Template Info */}
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800">{template.name}</h4>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
            {template.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm">{template.description}</p>
        
        {/* Color Palette Preview */}
        <div className="flex space-x-1">
          {template.colors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1">
          {template.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
              +{template.features.length - 3}
            </span>
          )}
        </div>

        {/* Recommended For */}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Perfect for:</div>
          <div className="text-xs text-gray-700">
            {template.recommendedFor.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Template Selector</h3>
          <p className="text-gray-600">Get AI-recommended website templates for your business</p>
        </div>
        <button
          onClick={generateTemplates}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 disabled:opacity-50"
        >
          {isGenerating ? 'Finding Templates...' : 'Find Templates'}
        </button>
      </div>

      {requirements.industry && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            Generating templates for: <strong>{requirements.industry}</strong> business
            {requirements.primaryGoal && ` focused on ${requirements.primaryGoal}`}
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-xl p-4">
              <div className="bg-gray-200 rounded-lg h-32 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {recommendedTemplates.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {recommendedTemplates.map((template) => (
            <TemplateCard 
              key={template.id} 
              template={template} 
              isSelected={selectedTemplate?.id === template.id}
            />
          ))}
        </div>
      )}

      {!isGenerating && recommendedTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Find Your Perfect Template</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to get AI-powered website template recommendations 
            tailored to your business type and industry.
          </p>
        </div>
      )}

      {selectedTemplate && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">
                Selected Template: {selectedTemplate.name}
              </h4>
              <p className="text-green-700 text-sm mt-1">
                {selectedTemplate.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedTemplate(null)}
              className="text-green-600 hover:text-green-800"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteTemplateSelector;