import React, { useState } from 'react';
import type { WebsiteRequirements, WebsiteTemplate, DesignConfig } from './types';

interface ComponentGeneratorProps {
  requirements: WebsiteRequirements;
  selectedTemplate?: WebsiteTemplate;
  designConfig?: DesignConfig;
  onComponentsGenerated: (components: string[]) => void;
}

interface WebsiteComponent {
  id: string;
  name: string;
  type: string;
  description: string;
  code: string;
  preview: string;
  category: string;
}

const ComponentGenerator: React.FC<ComponentGeneratorProps> = ({
  designConfig,
  onComponentsGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<WebsiteComponent[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  const generateComponents = async () => {
    setIsGenerating(true);
    
    // Simulate AI component generation
    setTimeout(() => {
      const mockComponents: WebsiteComponent[] = [
        {
          id: 'hero-1',
          name: 'Modern Hero',
          type: 'Hero Section',
          description: 'Eye-catching hero section with gradient background and CTA',
          code: 'Hero component code...',
          preview: 'Hero preview',
          category: 'Layout'
        },
        {
          id: 'nav-1',
          name: 'Sticky Navigation',
          type: 'Navigation',
          description: 'Fixed navigation bar with smooth scrolling',
          code: 'Nav component code...',
          preview: 'Nav preview',
          category: 'Navigation'
        },
        {
          id: 'feature-1',
          name: 'Feature Grid',
          type: 'Features',
          description: 'Grid layout for showcasing key features',
          code: 'Feature component code...',
          preview: 'Feature preview',
          category: 'Content'
        },
        {
          id: 'testimonial-1',
          name: 'Testimonial Carousel',
          type: 'Testimonials',
          description: 'Swipeable carousel for customer testimonials',
          code: 'Testimonial component code...',
          preview: 'Testimonial preview',
          category: 'Social Proof'
        },
        {
          id: 'contact-1',
          name: 'Contact Form',
          type: 'Form',
          description: 'Modern contact form with validation',
          code: 'Contact component code...',
          preview: 'Contact preview',
          category: 'Forms'
        },
        {
          id: 'footer-1',
          name: 'Multi-column Footer',
          type: 'Footer',
          description: 'Comprehensive footer with links and social media',
          code: 'Footer component code...',
          preview: 'Footer preview',
          category: 'Layout'
        }
      ];
      
      setGeneratedComponents(mockComponents);
      setIsGenerating(false);
    }, 3000);
  };

  const toggleComponent = (componentId: string) => {
    setSelectedComponents(prev => {
      const newSelection = prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId];
      
      onComponentsGenerated(newSelection);
      return newSelection;
    });
  };

  const ComponentCard: React.FC<{ component: WebsiteComponent }> = ({ component }) => {
    const isSelected = selectedComponents.includes(component.id);
    
    return (
      <div
        className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
          isSelected
            ? 'border-green-500 bg-green-50'
            : 'border-gray-200 hover:border-green-300'
        }`}
        onClick={() => toggleComponent(component.id)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-800">{component.name}</h4>
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
              {component.type}
            </span>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            isSelected ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
          }`}>
            {isSelected && '✓'}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">{component.description}</p>

        {/* Component Preview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-3 border border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            {component.preview} Preview
          </div>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{component.category}</span>
          <span>AI Generated</span>
        </div>
      </div>
    );
  };

  const componentCategories = [...new Set(generatedComponents.map(comp => comp.category))];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Component Generator</h3>
          <p className="text-gray-600">Get AI-built website components ready to use</p>
        </div>
        <button
          onClick={generateComponents}
          disabled={isGenerating}
          className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-indigo-600 hover:to-blue-600 disabled:opacity-50"
        >
          {isGenerating ? 'Building Components...' : 'Generate Components'}
        </button>
      </div>

      {designConfig && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            Components will use your selected design system
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between mb-3">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-20 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {generatedComponents.length > 0 && (
        <div className="space-y-6">
          {/* Component Selection Summary */}
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-800">
                {selectedComponents.length} of {generatedComponents.length} components selected
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedComponents([]);
                onComponentsGenerated([]);
              }}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Clear All
            </button>
          </div>

          {/* Components by Category */}
          {componentCategories.map(category => (
            <div key={category}>
              <h4 className="font-semibold text-gray-800 mb-3">{category}</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {generatedComponents
                  .filter(comp => comp.category === category)
                  .map(component => (
                    <ComponentCard key={component.id} component={component} />
                  ))
                }
              </div>
            </div>
          ))}

          {/* Selected Components Preview */}
          {selectedComponents.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">Selected Components</h4>
              <div className="flex flex-wrap gap-2">
                {selectedComponents.map(componentId => {
                  const component = generatedComponents.find(c => c.id === componentId);
                  return component ? (
                    <span
                      key={componentId}
                      className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center space-x-1"
                    >
                      <span>{component.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleComponent(componentId);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {!isGenerating && generatedComponents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Build Your Website</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered website components 
            that match your design system and business needs.
          </p>
        </div>
      )}
    </div>
  );
};

export default ComponentGenerator;