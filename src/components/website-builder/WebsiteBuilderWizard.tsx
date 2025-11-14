import React, { useState } from 'react';
import WebsiteTemplateSelector from './WebsiteTemplateSelector';
import ContentGenerator from './ContentGenerator';
import DesignCustomizer from './DesignCustomizer';
import ComponentGenerator from './ComponentGenerator';
import SEOSetup from './SEOSetup';
import DeploymentManager from './DeploymentManager';
import type { 
  WebsiteRequirements, 
  WebsiteProject, 
  WebsiteTemplate, 
  WebsiteContent, 
  DesignConfig, 
  SEOConfig 
} from './types';

const WebsiteBuilderWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [websiteRequirements] = useState<WebsiteRequirements>({
    businessType: '',
    industry: '',
    targetAudience: '',
    primaryGoal: '',
    stylePreferences: [],
    features: [],
    contentNeeds: []
  });
  const [websiteProject, setWebsiteProject] = useState<Partial<WebsiteProject>>({});
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    { id: 'template', title: 'Template', description: 'Choose your website template' },
    { id: 'content', title: 'Content', description: 'Generate website content' },
    { id: 'design', title: 'Design', description: 'Customize design system' },
    { id: 'components', title: 'Components', description: 'Select website components' },
    { id: 'seo', title: 'SEO', description: 'Optimize for search engines' },
    { id: 'deploy', title: 'Deploy', description: 'Launch your website' }
  ];

  const handleTemplateSelected = (template: WebsiteTemplate) => {
    setWebsiteProject(prev => ({ ...prev, template }));
  };

  const handleContentGenerated = (content: WebsiteContent) => {
    setWebsiteProject(prev => ({ ...prev, content }));
  };

  const handleDesignConfigured = (design: DesignConfig) => {
    setWebsiteProject(prev => ({ ...prev, design }));
  };

  const handleComponentsGenerated = (components: string[]) => {
    setWebsiteProject(prev => ({ ...prev, components }));
  };

  const handleSEOConfigured = (seo: SEOConfig) => {
    setWebsiteProject(prev => ({ ...prev, seo }));
  };

  const handleDeploy = (platform: string) => {
    console.log(`Deploying to ${platform}`);
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
          <WebsiteTemplateSelector
            requirements={websiteRequirements}
            onTemplateSelected={handleTemplateSelected}
          />
        );
      case 1:
        return (
          <ContentGenerator
            requirements={websiteRequirements}
            selectedTemplate={websiteProject.template}
            onContentGenerated={handleContentGenerated}
          />
        );
      case 2:
        return (
          <DesignCustomizer
            requirements={websiteRequirements}
            selectedTemplate={websiteProject.template}
            onDesignConfigured={handleDesignConfigured}
          />
        );
      case 3:
        return (
          <ComponentGenerator
            requirements={websiteRequirements}
            selectedTemplate={websiteProject.template}
            designConfig={websiteProject.design}
            onComponentsGenerated={handleComponentsGenerated}
          />
        );
      case 4:
        return (
          <SEOSetup
            requirements={websiteRequirements}
            websiteContent={websiteProject.content}
            onSEOConfigured={handleSEOConfigured}
          />
        );
      case 5:
        return (
          <DeploymentManager
            websiteProject={websiteProject as WebsiteProject}
            onDeploy={handleDeploy}
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
            AI Website Builder
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create a complete, professional website in minutes with AI-powered tools for 
            templates, content, design, and deployment.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-0 mb-8">
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
                  Complete Website
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Progress Stats */}
        {!isComplete && (
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`text-2xl font-bold ${
                websiteProject.template ? 'text-green-600' : 'text-gray-400'
              }`}>
                {websiteProject.template ? '✓' : '—'}
              </div>
              <div className="text-gray-600 text-sm">Template</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`text-2xl font-bold ${
                websiteProject.content ? 'text-green-600' : 'text-gray-400'
              }`}>
                {websiteProject.content ? '✓' : '—'}
              </div>
              <div className="text-gray-600 text-sm">Content</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`text-2xl font-bold ${
                websiteProject.design ? 'text-green-600' : 'text-gray-400'
              }`}>
                {websiteProject.design ? '✓' : '—'}
              </div>
              <div className="text-gray-600 text-sm">Design</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`text-2xl font-bold ${
                websiteProject.components ? 'text-green-600' : 'text-gray-400'
              }`}>
                {websiteProject.components ? '✓' : '—'}
              </div>
              <div className="text-gray-600 text-sm">Components</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className={`text-2xl font-bold ${
                websiteProject.seo ? 'text-green-600' : 'text-gray-400'
              }`}>
                {websiteProject.seo ? '✓' : '—'}
              </div>
              <div className="text-gray-600 text-sm">SEO</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-lg text-center">
              <div className="text-2xl font-bold text-gray-400">—</div>
              <div className="text-gray-600 text-sm">Deploy</div>
            </div>
          </div>
        )}

        {isComplete && (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-8 text-center text-white">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Website Complete!</h3>
            <p className="text-white/90 mb-6">
              Your professional website has been created and deployed. 
              You can now share it with the world and start growing your business online.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setCurrentStep(0);
                  setIsComplete(false);
                  setWebsiteProject({});
                }}
                className="bg-white text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-100"
              >
                Build Another Website
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10">
                View Live Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteBuilderWizard;