import React, { useState } from 'react';
import type { DesignConfig, WebsiteTemplate, WebsiteRequirements } from './types';

interface DesignCustomizerProps {
  requirements: WebsiteRequirements;
  selectedTemplate?: WebsiteTemplate;
  onDesignConfigured: (design: DesignConfig) => void;
}

const DesignCustomizer: React.FC<DesignCustomizerProps> = ({
  selectedTemplate,
  onDesignConfigured
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [designOptions, setDesignOptions] = useState<DesignConfig[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<DesignConfig | null>(null);

  const generateDesigns = async () => {
    setIsGenerating(true);
    
    // Simulate AI design generation
    setTimeout(() => {
      const mockDesigns: DesignConfig[] = [
        {
          colors: {
            primary: '#3B82F6',
            secondary: '#1E40AF',
            accent: '#10B981',
            background: '#FFFFFF',
            text: '#1F2937'
          },
          typography: {
            heading: 'Inter, sans-serif',
            body: 'Inter, sans-serif'
          },
          spacing: 'moderate',
          borderRadius: 'medium'
        },
        {
          colors: {
            primary: '#7C3AED',
            secondary: '#5B21B6',
            accent: '#EC4899',
            background: '#F8FAFC',
            text: '#374151'
          },
          typography: {
            heading: 'Poppins, sans-serif',
            body: 'Open Sans, sans-serif'
          },
          spacing: 'generous',
          borderRadius: 'large'
        },
        {
          colors: {
            primary: '#059669',
            secondary: '#047857',
            accent: '#DC2626',
            background: '#FFFFFF',
            text: '#111827'
          },
          typography: {
            heading: 'Montserrat, sans-serif',
            body: 'Lato, sans-serif'
          },
          spacing: 'compact',
          borderRadius: 'small'
        }
      ];
      
      setDesignOptions(mockDesigns);
      setIsGenerating(false);
    }, 2500);
  };

  const ColorPalette: React.FC<{ colors: DesignConfig['colors'] }> = ({ colors }) => (
    <div className="flex space-x-1">
      {Object.entries(colors).map(([name, color]) => (
        <div key={name} className="flex flex-col items-center">
          <div
            className="w-8 h-8 rounded border border-gray-200"
            style={{ backgroundColor: color }}
            title={`${name}: ${color}`}
          />
          <span className="text-[10px] text-gray-500 mt-1 capitalize">
            {name}
          </span>
        </div>
      ))}
    </div>
  );

  const DesignPreview: React.FC<{ design: DesignConfig; index: number }> = ({ 
    design, 
    index 
  }) => (
    <div
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedDesign === design
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 hover:border-purple-300'
      }`}
      onClick={() => {
        setSelectedDesign(design);
        onDesignConfigured(design);
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-3">
        Design Option {index + 1}
      </h4>

      {/* Color Palette */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Color Scheme</div>
        <ColorPalette colors={design.colors} />
      </div>

      {/* Typography */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Typography</div>
        <div className="space-y-2 text-sm">
          <div style={{ fontFamily: design.typography.heading, fontWeight: 'bold' }}>
            Heading Font: {design.typography.heading.split(',')[0]}
          </div>
          <div style={{ fontFamily: design.typography.body }}>
            Body Font: {design.typography.body.split(',')[0]}
          </div>
        </div>
      </div>

      {/* Design Properties */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-600">Spacing</div>
          <div className="font-medium capitalize">{design.spacing}</div>
        </div>
        <div>
          <div className="text-gray-600">Border Radius</div>
          <div className="font-medium capitalize">{design.borderRadius}</div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-white">
        <div className="text-xs text-gray-500 mb-2">Preview</div>
        <div 
          className="space-y-2"
          style={{
            fontFamily: design.typography.body,
            color: design.colors.text
          }}
        >
          <div 
            className="font-bold"
            style={{
              fontFamily: design.typography.heading,
              color: design.colors.primary
            }}
          >
            Sample Heading
          </div>
          <div>Sample paragraph text showing how your content will look.</div>
          <button
            className="px-3 py-1 rounded text-white text-xs"
            style={{ backgroundColor: design.colors.primary }}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Design Customizer</h3>
          <p className="text-gray-600">Get AI-recommended design systems for your website</p>
        </div>
        <button
          onClick={generateDesigns}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        >
          {isGenerating ? 'Creating Designs...' : 'Generate Designs'}
        </button>
      </div>

      {selectedTemplate && (
        <div className="mb-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-purple-700 text-sm">
            Customizing design for: <strong>{selectedTemplate.name}</strong> template
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-xl p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {designOptions.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {designOptions.map((design, index) => (
            <DesignPreview key={index} design={design} index={index} />
          ))}
        </div>
      )}

      {!isGenerating && designOptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Design Your Website</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered design systems 
            with perfect color schemes and typography for your business.
          </p>
        </div>
      )}

      {selectedDesign && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">
                Design System Selected
              </h4>
              <p className="text-green-700 text-sm mt-1">
                Primary: {selectedDesign.colors.primary} • 
                Heading: {selectedDesign.typography.heading.split(',')[0]}
              </p>
            </div>
            <button
              onClick={() => setSelectedDesign(null)}
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

export default DesignCustomizer;