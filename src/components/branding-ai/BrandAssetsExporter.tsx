import React from 'react';
import type { BrandKit } from './types';

interface BrandAssetsExporterProps {
  brandKit: BrandKit;
  onExport: (format: string) => void;
}

const BrandAssetsExporter: React.FC<BrandAssetsExporterProps> = ({
  brandKit,
  onExport
}) => {
  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Brand Guide',
      description: 'Complete brand guidelines document',
      icon: '📄',
      features: ['Color palette', 'Typography', 'Logo usage', 'Brand voice']
    },
    {
      id: 'zip',
      name: 'Asset Package',
      description: 'All brand assets in one download',
      icon: '📦',
      features: ['Logo files', 'Color swatches', 'Font files', 'Templates']
    },
    {
      id: 'css',
      name: 'CSS Variables',
      description: 'Ready-to-use CSS code',
      icon: '💻',
      features: ['Color variables', 'Font stack', 'Spacing scale', 'Component examples']
    },
    {
      id: 'figma',
      name: 'Figma Kit',
      description: 'Design system for Figma',
      icon: '🎨',
      features: ['Color styles', 'Text styles', 'Logo components', 'UI kit']
    }
  ];

  const AssetPreview: React.FC<{ brandKit: BrandKit }> = ({ brandKit }) => (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h4 className="font-semibold text-gray-800 mb-4">Brand Kit Preview</h4>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Brand Name */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600 mb-2">Brand Name</div>
          <div className="font-bold text-lg text-gray-900">{brandKit.brandName.name}</div>
        </div>

        {/* Colors */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600 mb-2">Primary Color</div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: brandKit.colorPalette.primary }}
            />
            <span className="font-mono text-sm">{brandKit.colorPalette.primary}</span>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600 mb-2">Typography</div>
          <div className="text-sm font-medium">
            {brandKit.typography.heading} + {brandKit.typography.body}
          </div>
        </div>

        {/* Voice */}
        <div className="bg-white p-4 rounded-lg border">
          <div className="text-sm text-gray-600 mb-2">Brand Voice</div>
          <div className="text-sm font-medium">
            {brandKit.brandVoice.tone.slice(0, 2).join(', ')}
          </div>
        </div>
      </div>

      {/* Logo Concepts */}
      <div className="mt-4">
        <div className="text-sm text-gray-600 mb-2">Logo Concepts</div>
        <div className="flex space-x-2">
          {brandKit.logoConcepts.slice(0, 3).map((concept, index) => (
            <div key={index} className="flex items-center space-x-2 bg-white px-3 py-2 rounded border">
              <div className="flex space-x-1">
                {concept.colors.slice(0, 2).map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-700">{concept.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Brand Kit is Ready!</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Export your complete brand identity package in various formats for immediate use.
        </p>
      </div>

      <AssetPreview brandKit={brandKit} />

      <div className="grid md:grid-cols-2 gap-6">
        {exportFormats.map((format) => (
          <div
            key={format.id}
            className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-3xl mb-2">{format.icon}</div>
                <h4 className="font-semibold text-gray-800 text-lg">{format.name}</h4>
                <p className="text-gray-600 text-sm">{format.description}</p>
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {format.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => onExport(format.id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Download {format.name}
            </button>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
        <h4 className="font-semibold text-purple-800 mb-3">Next Steps</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-purple-500">1.</span>
            <div>
              <div className="font-medium text-gray-800">Apply to Website</div>
              <div className="text-gray-600">Use your CSS variables in your site</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-500">2.</span>
            <div>
              <div className="font-medium text-gray-800">Share with Team</div>
              <div className="text-gray-600">Distribute brand guidelines</div>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-purple-500">3.</span>
            <div>
              <div className="font-medium text-gray-800">Start Marketing</div>
              <div className="text-gray-600">Create consistent content</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAssetsExporter;