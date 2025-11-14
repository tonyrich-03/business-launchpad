import React, { useState } from 'react';
import type { WebsiteContent, WebsiteRequirements, WebsiteTemplate } from './types';

interface ContentGeneratorProps {
  requirements: WebsiteRequirements;
  selectedTemplate?: WebsiteTemplate;
  onContentGenerated: (content: WebsiteContent) => void;
}

const ContentGenerator: React.FC<ContentGeneratorProps> = ({
  requirements,
  selectedTemplate,
  onContentGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<WebsiteContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const generateContent = async () => {
    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const mockContent: WebsiteContent = {
        hero: {
          headline: `Transform Your ${requirements.industry} Business`,
          subheadline: `Professional ${requirements.industry.toLowerCase()} services that deliver real results. Experience the difference with our expert team.`,
          cta: 'Get Started Today'
        },
        about: {
          title: 'About Our Company',
          description: `We are a dedicated team of ${requirements.industry.toLowerCase()} professionals committed to delivering exceptional results. With years of experience and a passion for innovation, we help businesses like yours achieve their goals through strategic solutions and personalized service.`
        },
        services: [
          {
            title: 'Consultation',
            description: 'Expert advice tailored to your specific business needs and challenges.',
            icon: '💼'
          },
          {
            title: 'Strategy',
            description: 'Comprehensive planning to help you achieve your business objectives.',
            icon: '🎯'
          },
          {
            title: 'Implementation',
            description: 'Seamless execution of solutions with ongoing support and optimization.',
            icon: '⚡'
          }
        ],
        contact: {
          title: 'Ready to Get Started?',
          description: 'Contact us today to discuss how we can help transform your business and achieve your goals.'
        }
      };
      
      setGeneratedContent(mockContent);
      onContentGenerated(mockContent);
      setIsGenerating(false);
    }, 3000);
  };

  const ContentSection: React.FC<{ title: string; content: any; icon: string }> = ({ 
    title, 
    content, 
    icon 
  }) => (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-lg">{icon}</span>
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      
      {typeof content === 'string' ? (
        <p className="text-gray-600 text-sm leading-relaxed">{content}</p>
      ) : Array.isArray(content) ? (
        <div className="space-y-3">
          {content.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <span className="text-lg mt-1">{item.icon}</span>
              <div>
                <div className="font-medium text-gray-800">{item.title}</div>
                <div className="text-gray-600 text-sm mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                {key}
              </div>
              <div className="text-gray-600 text-sm">{value as string}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI Content Generator</h3>
          <p className="text-gray-600">Automatically generate professional website content</p>
        </div>
        <button
          onClick={generateContent}
          disabled={isGenerating}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 disabled:opacity-50"
        >
          {isGenerating ? 'Writing Content...' : 'Generate Content'}
        </button>
      </div>

      {selectedTemplate && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm">
            Generating content for: <strong>{selectedTemplate.name}</strong> template
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-40 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedContent && (
        <div className="space-y-6">
          {/* Section Navigation */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {Object.entries({
              hero: '🚀 Hero',
              about: '📖 About',
              services: '🛠️ Services',
              contact: '📞 Contact'
            }).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                  activeSection === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content Display */}
          <div className="min-h-[400px]">
            {activeSection === 'hero' && (
              <ContentSection 
                title="Hero Section" 
                content={generatedContent.hero}
                icon="🚀"
              />
            )}
            {activeSection === 'about' && (
              <ContentSection 
                title="About Section" 
                content={generatedContent.about.description}
                icon="📖"
              />
            )}
            {activeSection === 'services' && (
              <ContentSection 
                title="Services" 
                content={generatedContent.services}
                icon="🛠️"
              />
            )}
            {activeSection === 'contact' && (
              <ContentSection 
                title="Contact Section" 
                content={generatedContent.contact}
                icon="📞"
              />
            )}
          </div>

          {/* Content Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {generatedContent.hero.headline.split(' ').length}
              </div>
              <div className="text-xs text-gray-600">Headline Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {generatedContent.services.length}
              </div>
              <div className="text-xs text-gray-600">Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(generatedContent).reduce((acc, section) => {
                  if (typeof section === 'object' && !Array.isArray(section)) {
                    return acc + Object.values(section).filter(val => typeof val === 'string').length;
                  }
                  return acc;
                }, 0)}
              </div>
              <div className="text-xs text-gray-600">Content Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {JSON.stringify(generatedContent).split(' ').length}
              </div>
              <div className="text-xs text-gray-600">Total Words</div>
            </div>
          </div>
        </div>
      )}

      {!isGenerating && !generatedContent && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✍️</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Create Amazing Content</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered website content 
            tailored to your business and target audience.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;