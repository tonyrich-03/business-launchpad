import React, { useState } from 'react';
import type { TypographyPair, BrandPreferences } from './types';

interface TypographySelectorProps {
  preferences: BrandPreferences;
  onTypographySelected: (typography: TypographyPair) => void;
}

const TypographySelector: React.FC<TypographySelectorProps> = ({
  onTypographySelected
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPairs, setGeneratedPairs] = useState<TypographyPair[]>([]);
  const [selectedPair, setSelectedPair] = useState<TypographyPair | null>(null);

  const generateTypographyPairs = async () => {
    setIsGenerating(true);
    
    // Simulate AI typography generation
    setTimeout(() => {
      const mockPairs: TypographyPair[] = [
        {
          heading: 'Inter',
          body: 'Inter',
          description: 'Clean, modern sans-serif pair for tech and corporate brands',
          pairingRationale: 'Using the same font family creates consistency while varying weights establishes hierarchy'
        },
        {
          heading: 'Playfair Display',
          body: 'Source Sans Pro',
          description: 'Elegant serif heading with clean sans-serif body for luxury brands',
          pairingRationale: 'Contrast between elegant serif and readable sans-serif creates sophistication'
        },
        {
          heading: 'Montserrat',
          body: 'Open Sans',
          description: 'Modern geometric heading with friendly body font for creative brands',
          pairingRationale: 'Geometric heading adds modernity while friendly body maintains approachability'
        },
        {
          heading: 'Poppins',
          body: 'Lato',
          description: 'Geometric sans-serif pair with excellent readability for modern businesses',
          pairingRationale: 'Both fonts share geometric roots but differ in character for visual interest'
        }
      ];
      
      setGeneratedPairs(mockPairs);
      setIsGenerating(false);
    }, 2000);
  };

  const FontPreview: React.FC<{ pair: TypographyPair; isSelected: boolean }> = ({ 
    pair, 
    isSelected 
  }) => (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-200 hover:border-purple-300'
      }`}
      onClick={() => {
        setSelectedPair(pair);
        onTypographySelected(pair);
      }}
    >
      {/* Font Preview */}
      <div className="space-y-3 mb-3">
        <div style={{ fontFamily: pair.heading, fontSize: '24px', fontWeight: 'bold' }}>
          The quick brown fox jumps
        </div>
        <div style={{ fontFamily: pair.body, fontSize: '16px', lineHeight: '1.5' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div>

      {/* Font Details */}
      <div className="border-t pt-3">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="font-medium text-gray-800">{pair.heading}</div>
            <div className="text-sm text-gray-600">Heading Font</div>
          </div>
          <div>
            <div className="font-medium text-gray-800 text-right">{pair.body}</div>
            <div className="text-sm text-gray-600 text-right">Body Font</div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-2">{pair.description}</p>
        
        <div className="mt-2 p-2 bg-gray-50 rounded">
          <p className="text-gray-700 text-xs italic">
            {pair.pairingRationale}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Typography Selector</h3>
          <p className="text-gray-600">AI-powered font pairing suggestions</p>
        </div>
        <button
          onClick={generateTypographyPairs}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Fonts'}
        </button>
      </div>

      {isGenerating && (
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedPairs.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {generatedPairs.map((pair, index) => (
            <FontPreview 
              key={index} 
              pair={pair} 
              isSelected={selectedPair?.heading === pair.heading}
            />
          ))}
        </div>
      )}

      {!isGenerating && generatedPairs.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔤</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Choose Fonts</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered font pairings 
            that match your brand personality and ensure readability.
          </p>
        </div>
      )}

      {selectedPair && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-purple-800">
                Selected Typography
              </h4>
              <p className="text-purple-700 text-sm mt-1">
                Heading: {selectedPair.heading} • Body: {selectedPair.body}
              </p>
            </div>
            <button
              onClick={() => setSelectedPair(null)}
              className="text-purple-600 hover:text-purple-800"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypographySelector;