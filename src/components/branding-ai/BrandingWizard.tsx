import React, { useState } from 'react';
import BrandNameGenerator from './BrandingNameGenerator';
import LogoConceptGenerator from './LogoConceptGenerator';
import ColorPaletteGenerator from './ColorPaletteGenerator';
import TypographySelector from './TypographySelector';
import BrandVoiceDefiner from './BrandVoiceDefiner';
import BrandAssetsExporter from './BrandAssetsExporter';
import type { BrandPreferences, BrandKit, BrandName, LogoConcept, ColorPalette, TypographyPair, BrandVoice } from './types';

const BrandingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [brandPreferences] = useState<BrandPreferences>({
    industry: '',
    targetAudience: '',
    brandPersonality: [],
    keywords: [],
    stylePreferences: []
  });
  const [brandKit, setBrandKit] = useState<Partial<BrandKit>>({});
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 'name', title: 'Brand Name', description: 'Generate and select your business name' },
    { id: 'logo', title: 'Logo Concepts', description: 'Choose logo design direction' },
    { id: 'colors', title: 'Color Palette', description: 'Select your brand colors' },
    { id: 'typography', title: 'Typography', description: 'Choose font pairings' },
    { id: 'voice', title: 'Brand Voice', description: 'Define tone and messaging' },
    { id: 'export', title: 'Export', description: 'Download your brand assets' }
  ];

  const handleBrandNameGenerated = (names: BrandName[]) => {
    // In real app, user would select one
    const selectedName = names[0];
    setBrandKit(prev => ({ ...prev, brandName: selectedName }));
  };

  const handleLogoConceptsGenerated = (concepts: LogoConcept[]) => {
    setBrandKit(prev => ({ ...prev, logoConcepts: concepts }));
  };

  const handlePaletteGenerated = (palette: ColorPalette) => {
    setBrandKit(prev => ({ ...prev, colorPalette: palette }));
  };

  const handleTypographySelected = (typography: TypographyPair) => {
    setBrandKit(prev => ({ ...prev, typography }));
  };

  const handleVoiceDefined = (voice: BrandVoice) => {
    setBrandKit(prev => ({ ...prev, brandVoice: voice }));
  };

  const handleExport = (format: string) => {
    console.log(`Exporting brand kit in ${format} format`);
    // In real app, this would trigger download
    setIsComplete(true);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BrandNameGenerator
            preferences={brandPreferences}
            onNamesGenerated={handleBrandNameGenerated}
          />
        );
      case 1:
        return (
          <LogoConceptGenerator
            preferences={brandPreferences}
            selectedBrandName={brandKit.brandName?.name}
            onConceptsGenerated={handleLogoConceptsGenerated}
          />
        );
      case 2:
        return (
          <ColorPaletteGenerator
            preferences={brandPreferences}
            onPaletteGenerated={handlePaletteGenerated}
          />
        );
      case 3:
        return (
          <TypographySelector
            preferences={brandPreferences}
            onTypographySelected={handleTypographySelected}
          />
        );
      case 4:
        return (
          <BrandVoiceDefiner
            preferences={brandPreferences}
            onVoiceDefined={handleVoiceDefined}
          />
        );
      case 5:
        return (
          <BrandAssetsExporter
            brandKit={brandKit as BrandKit}
            onExport={handleExport}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-1">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Branding Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a complete brand identity in minutes with AI-powered tools for naming, 
            logo design, colors, typography, and brand voice.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-1 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </div>
              <div className="text-sm font-semibold text-blue-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      index === currentStep
                        ? 'bg-blue-600 text-white'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-xs mt-2 text-gray-600 text-center max-w-16">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 ${
                      index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[500px]">
            {getStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-3">
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={() => setIsComplete(true)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Complete Branding
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {!isComplete && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {brandKit.brandName ? '✓' : '—'}
              </div>
              <div className="text-gray-600">Brand Name</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {brandKit.logoConcepts ? '✓' : '—'}
              </div>
              <div className="text-gray-600">Logo Concepts</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {brandKit.colorPalette ? '✓' : '—'}
              </div>
              <div className="text-gray-600">Color Palette</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {brandKit.typography ? '✓' : '—'}
              </div>
              <div className="text-gray-600">Typography</div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-center text-white">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Branding Complete!</h3>
            <p className="text-white/90 mb-6">
              Your complete brand identity has been created. You can now use your brand assets across all platforms.
            </p>
            <button
              onClick={() => {
                setCurrentStep(0);
                setIsComplete(false);
                setBrandKit({});
              }}
              className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
            >
              Create Another Brand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandingWizard;