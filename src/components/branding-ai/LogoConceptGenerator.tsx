import React, { useState } from 'react';
import type { LogoConcept, BrandPreferences } from './types';

interface LogoConceptGeneratorProps {
  preferences: BrandPreferences;
  selectedBrandName?: string;
  onConceptsGenerated: (concepts: LogoConcept[]) => void;
}

const LogoConceptGenerator: React.FC<LogoConceptGeneratorProps> = ({
  selectedBrandName,
  onConceptsGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConcepts, setGeneratedConcepts] = useState<LogoConcept[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<LogoConcept | null>(null);

  const generateConcepts = async () => {
    setIsGenerating(true);
    
    // Simulate AI concept generation
    setTimeout(() => {
      const mockConcepts: LogoConcept[] = [
        {
          id: '1',
          name: 'Modern Abstract',
          description: 'Clean, geometric shapes representing innovation and precision',
          style: 'Minimalist & Modern',
          colors: ['#3B82F6', '#1E40AF', '#93C5FD'],
          symbolism: ['Growth', 'Connection', 'Innovation'],
          sketchDescription: 'Abstract geometric pattern with flowing lines connecting circular elements, representing network and growth'
        },
        {
          id: '2',
          name: 'Professional Emblem',
          description: 'Classic emblem design conveying trust and establishment',
          style: 'Classic & Professional',
          colors: ['#059669', '#047857', '#10B981'],
          symbolism: ['Stability', 'Growth', 'Trust'],
          sketchDescription: 'Circular emblem with layered elements, shield shape in background, modern typography'
        },
        {
          id: '3',
          name: 'Dynamic Symbol',
          description: 'Energetic design showing movement and progress',
          style: 'Contemporary & Dynamic',
          colors: ['#7C3AED', '#5B21B6', '#C4B5FD'],
          symbolism: ['Motion', 'Transformation', 'Energy'],
          sketchDescription: 'Asymmetrical design with upward arrow motif integrated into abstract shape, suggesting growth'
        },
        {
          id: '4',
          name: 'Nature Inspired',
          description: 'Organic shapes reflecting growth and natural harmony',
          style: 'Organic & Natural',
          colors: ['#DC2626', '#B91C1C', '#FCA5A5'],
          symbolism: ['Growth', 'Harmony', 'Sustainability'],
          sketchDescription: 'Leaf-inspired abstract shape with gradient colors, representing natural growth cycles'
        }
      ];
      
      setGeneratedConcepts(mockConcepts);
      onConceptsGenerated(mockConcepts);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Logo Concept Generator</h3>
          <p className="text-gray-600">AI-powered logo design concepts</p>
        </div>
        <button
          onClick={generateConcepts}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50"
        >
          {isGenerating ? 'Designing...' : 'Generate Concepts'}
        </button>
      </div>

      {selectedBrandName && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            Generating concepts for: <strong>{selectedBrandName}</strong>
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg p-4">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {generatedConcepts.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6">
          {generatedConcepts.map((concept) => (
            <div
              key={concept.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedConcept?.id === concept.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => setSelectedConcept(concept)}
            >
              <div className="flex items-start space-x-4">
                {/* Color Swatch Preview */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden">
                    <div className="flex flex-col h-full">
                      {concept.colors.slice(0, 3).map((color, index) => (
                        <div
                          key={index}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {concept.name}
                      </h4>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mt-1">
                        {concept.style}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mt-2">
                    {concept.description}
                  </p>

                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {concept.symbolism.map((symbol, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <p className="text-gray-600 text-xs italic">
                      "{concept.sketchDescription}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isGenerating && generatedConcepts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Design</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered logo concepts 
            that match your brand personality and industry.
          </p>
        </div>
      )}

      {selectedConcept && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-800">
                Selected Concept: {selectedConcept.name}
              </h4>
              <p className="text-blue-700 text-sm mt-1">
                {selectedConcept.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedConcept(null)}
              className="text-blue-600 hover:text-blue-800"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoConceptGenerator;