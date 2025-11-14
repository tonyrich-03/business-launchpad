import React, { useState } from 'react';
import type { BrandName, BrandPreferences } from './types';

interface BrandNameGeneratorProps {
  preferences: BrandPreferences;
  onNamesGenerated: (names: BrandName[]) => void;
}

const BrandNameGenerator: React.FC<BrandNameGeneratorProps> = ({
 onNamesGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<BrandName[]>([]);
  const [selectedName, setSelectedName] = useState<BrandName | null>(null);

  const generateNames = async () => {
    setIsGenerating(true);
    
    // Simulate AI name generation
    setTimeout(() => {
      const mockNames: BrandName[] = [
        {
          name: "NexusFlow",
          meaning: "Represents connection and smooth operation in your industry",
          availability: true,
          domainAvailable: true,
          socialHandlesAvailable: true
        },
        {
          name: "AuraSphere",
          meaning: "Evokes a sense of comprehensive presence and influence",
          availability: true,
          domainAvailable: true,
          socialHandlesAvailable: false
        },
        {
          name: "VividPath",
          meaning: "Suggests clear direction and vibrant solutions",
          availability: true,
          domainAvailable: false,
          socialHandlesAvailable: true
        },
        {
          name: "ElevateCore",
          meaning: "Focuses on improvement and fundamental excellence",
          availability: true,
          domainAvailable: true,
          socialHandlesAvailable: true
        },
        {
          name: "SynergyLabs",
          meaning: "Combines collaboration and innovation in one name",
          availability: true,
          domainAvailable: true,
          socialHandlesAvailable: true
        }
      ];
      
      setGeneratedNames(mockNames);
      onNamesGenerated(mockNames);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Brand Name Generator</h3>
          <p className="text-gray-600">AI-powered business name suggestions</p>
        </div>
        <button
          onClick={generateNames}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Names'}
        </button>
      </div>

      {isGenerating && (
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedNames.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 mb-3">
            Generated Names ({generatedNames.length})
          </h4>
          {generatedNames.map((name, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedName?.name === name.name
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedName(name)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">
                      {name.name}
                    </span>
                    <div className="flex space-x-2">
                      {name.domainAvailable && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Domain
                        </span>
                      )}
                      {name.socialHandlesAvailable && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Social
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{name.meaning}</p>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    name.availability ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {name.availability ? 'Available' : 'Taken'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isGenerating && generatedNames.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Generate Names</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered brand name suggestions 
            based on your industry and preferences.
          </p>
        </div>
      )}

      {selectedName && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">
                Selected: {selectedName.name}
              </h4>
              <p className="text-green-700 text-sm mt-1">
                {selectedName.meaning}
              </p>
            </div>
            <button
              onClick={() => setSelectedName(null)}
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

export default BrandNameGenerator;