import React, { useState } from 'react';
import type { ColorPalette, BrandPreferences } from './types';

interface ColorPaletteGeneratorProps {
  preferences: BrandPreferences;
  onPaletteGenerated: (palette: ColorPalette) => void;
}

const ColorPaletteGenerator: React.FC<ColorPaletteGeneratorProps> = ({
  onPaletteGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPalettes, setGeneratedPalettes] = useState<ColorPalette[]>([]);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null);

  const generatePalettes = async () => {
    setIsGenerating(true);
    
    // Simulate AI color palette generation
    setTimeout(() => {
      const mockPalettes: ColorPalette[] = [
        {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#10B981',
          neutral: '#6B7280',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626',
          shades: {
            primary: ['#DBEAFE', '#93C5FD', '#3B82F6', '#1E40AF', '#1E3A8A'],
            secondary: ['#E0E7FF', '#A5B4FC', '#6366F1', '#4F46E5', '#3730A3'],
            accent: ['#D1FAE5', '#A7F3D0', '#10B981', '#047857', '#064E3B']
          }
        },
        {
          primary: '#7C3AED',
          secondary: '#5B21B6',
          accent: '#EC4899',
          neutral: '#4B5563',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626',
          shades: {
            primary: ['#EDE9FE', '#C4B5FD', '#7C3AED', '#5B21B6', '#4C1D95'],
            secondary: ['#F3E8FF', '#E9D5FF', '#A855F7', '#9333EA', '#7E22CE'],
            accent: ['#FCE7F3', '#FBCFE8', '#EC4899', '#DB2777', '#BE185D']
          }
        },
        {
          primary: '#059669',
          secondary: '#047857',
          accent: '#DC2626',
          neutral: '#374151',
          success: '#059669',
          warning: '#D97706',
          error: '#DC2626',
          shades: {
            primary: ['#D1FAE5', '#A7F3D0', '#10B981', '#059669', '#047857'],
            secondary: ['#CCFBF1', '#99F6E4', '#2DD4BF', '#14B8A6', '#0D9488'],
            accent: ['#FEE2E2', '#FECACA', '#F87171', '#EF4444', '#DC2626']
          }
        }
      ];
      
      setGeneratedPalettes(mockPalettes);
      setIsGenerating(false);
    }, 2000);
  };

  const ColorSwatch: React.FC<{ color: string; label: string; size?: 'sm' | 'lg' }> = ({ 
    color, 
    label, 
    size = 'sm' 
  }) => (
    <div className="flex items-center space-x-2">
      <div
        className={`rounded border border-gray-200 ${
          size === 'lg' ? 'w-12 h-12' : 'w-8 h-8'
        }`}
        style={{ backgroundColor: color }}
      />
      <div className="text-xs">
        <div className="font-mono">{color}</div>
        <div className="text-gray-500">{label}</div>
      </div>
    </div>
  );

  const PaletteCard: React.FC<{ palette: ColorPalette; index: number }> = ({ 
    palette, 
    index 
  }) => (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        selectedPalette === palette
          ? 'border-green-500 bg-green-50'
          : 'border-gray-200 hover:border-green-300'
      }`}
      onClick={() => {
        setSelectedPalette(palette);
        onPaletteGenerated(palette);
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-3">
        Palette {index + 1}
      </h4>
      
      {/* Main Colors */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <ColorSwatch color={palette.primary} label="Primary" size="lg" />
        <ColorSwatch color={palette.secondary} label="Secondary" size="lg" />
        <ColorSwatch color={palette.accent} label="Accent" size="lg" />
        <ColorSwatch color={palette.neutral} label="Neutral" size="lg" />
      </div>

      {/* Status Colors */}
      <div className="border-t pt-3">
        <div className="text-xs text-gray-500 mb-2">Status Colors</div>
        <div className="flex space-x-2">
          <ColorSwatch color={palette.success} label="Success" />
          <ColorSwatch color={palette.warning} label="Warning" />
          <ColorSwatch color={palette.error} label="Error" />
        </div>
      </div>

      {/* Color Shades */}
      <div className="border-t pt-3 mt-3">
        <div className="text-xs text-gray-500 mb-2">Color Shades</div>
        <div className="space-y-2">
          {Object.entries(palette.shades).map(([colorName, shades]) => (
            <div key={colorName} className="flex items-center justify-between">
              <span className="text-xs text-gray-600 capitalize">{colorName}</span>
              <div className="flex">
                {shades.slice(0, 3).map((shade, shadeIndex) => (
                  <div
                    key={shadeIndex}
                    className="w-4 h-4 rounded border border-gray-200"
                    style={{ backgroundColor: shade }}
                    title={shade}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Color Palette Generator</h3>
          <p className="text-gray-600">AI-powered color scheme suggestions</p>
        </div>
        <button
          onClick={generatePalettes}
          disabled={isGenerating}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Generate Palettes'}
        </button>
      </div>

      {isGenerating && (
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-40 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedPalettes.length > 0 && (
        <div className="grid md:grid-cols-3 gap-4">
          {generatedPalettes.map((palette, index) => (
            <PaletteCard key={index} palette={palette} index={index} />
          ))}
        </div>
      )}

      {!isGenerating && generatedPalettes.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Create Color Palettes</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered color schemes 
            that match your brand personality and industry standards.
          </p>
        </div>
      )}

      {selectedPalette && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">
                Selected Color Palette
              </h4>
              <p className="text-green-700 text-sm mt-1">
                Primary: {selectedPalette.primary} • Secondary: {selectedPalette.secondary}
              </p>
            </div>
            <button
              onClick={() => setSelectedPalette(null)}
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

export default ColorPaletteGenerator;