import React, { useState } from 'react';
import type { BrandVoice, BrandPreferences } from './types';

interface BrandVoiceDefinerProps {
  preferences: BrandPreferences;
  onVoiceDefined: (voice: BrandVoice) => void;
}

const BrandVoiceDefiner: React.FC<BrandVoiceDefinerProps> = ({
  onVoiceDefined
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVoices, setGeneratedVoices] = useState<BrandVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<BrandVoice | null>(null);

  const generateBrandVoices = async () => {
    setIsGenerating(true);
    
    // Simulate AI brand voice generation
    setTimeout(() => {
      const mockVoices: BrandVoice[] = [
        {
          tone: ['Professional', 'Authoritative', 'Clear'],
          communicationStyle: 'Direct and informative',
          keyMessages: ['Innovation', 'Reliability', 'Expertise'],
          do: [
            'Use industry-specific terminology',
            'Provide data-driven insights',
            'Maintain formal but approachable tone'
          ],
          dont: [
            'Use slang or casual language',
            'Make unsubstantiated claims',
            'Overuse technical jargon'
          ]
        },
        {
          tone: ['Friendly', 'Inspirational', 'Empowering'],
          communicationStyle: 'Conversational and motivational',
          keyMessages: ['Growth', 'Community', 'Transformation'],
          do: [
            'Use inclusive language (we, our, together)',
            'Share success stories and testimonials',
            'Ask engaging questions'
          ],
          dont: [
            'Sound corporate or bureaucratic',
            'Use passive voice excessively',
            'Make it about you instead of the customer'
          ]
        },
        {
          tone: ['Innovative', 'Bold', 'Forward-thinking'],
          communicationStyle: 'Visionary and disruptive',
          keyMessages: ['Innovation', 'Future', 'Breakthrough'],
          do: [
            'Use powerful action verbs',
            'Paint vivid pictures of the future',
            'Challenge conventional thinking'
          ],
          dont: [
            'Sound hesitant or uncertain',
            'Use clichés or overused phrases',
            'Focus on limitations or obstacles'
          ]
        }
      ];
      
      setGeneratedVoices(mockVoices);
      setIsGenerating(false);
    }, 2500);
  };

  const VoiceCard: React.FC<{ voice: BrandVoice; index: number; isSelected: boolean }> = ({ 
    voice, 
    index, 
    isSelected 
  }) => (
    <div
      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300'
      }`}
      onClick={() => {
        setSelectedVoice(voice);
        onVoiceDefined(voice);
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-3">
        Voice Option {index + 1}
      </h4>

      {/* Tone Tags */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-2">Tone</div>
        <div className="flex flex-wrap gap-1">
          {voice.tone.map((tone, toneIndex) => (
            <span
              key={toneIndex}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {tone}
            </span>
          ))}
        </div>
      </div>

      {/* Communication Style */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">Communication Style</div>
        <p className="text-gray-800 font-medium">{voice.communicationStyle}</p>
      </div>

      {/* Key Messages */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-2">Key Messages</div>
        <div className="flex flex-wrap gap-1">
          {voice.keyMessages.map((message, msgIndex) => (
            <span
              key={msgIndex}
              className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
            >
              {message}
            </span>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-green-600 font-medium mb-1">Do</div>
          <ul className="text-gray-600 space-y-1">
            {voice.do.map((item, doIndex) => (
              <li key={doIndex} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-red-600 font-medium mb-1">Don't</div>
          <ul className="text-gray-600 space-y-1">
            {voice.dont.map((item, dontIndex) => (
              <li key={dontIndex} className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Brand Voice Definer</h3>
          <p className="text-gray-600">AI-powered tone and communication style</p>
        </div>
        <button
          onClick={generateBrandVoices}
          disabled={isGenerating}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
        >
          {isGenerating ? 'Defining...' : 'Define Voice'}
        </button>
      </div>

      {isGenerating && (
        <div className="animate-pulse space-y-4 mb-6">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
      )}

      {generatedVoices.length > 0 && (
        <div className="space-y-4">
          {generatedVoices.map((voice, index) => (
            <VoiceCard 
              key={index} 
              voice={voice} 
              index={index}
              isSelected={selectedVoice === voice}
            />
          ))}
        </div>
      )}

      {!isGenerating && generatedVoices.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎭</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Define Your Voice</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-powered brand voice options 
            that align with your target audience and brand personality.
          </p>
        </div>
      )}

      {selectedVoice && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-orange-800">
                Selected Brand Voice
              </h4>
              <p className="text-orange-700 text-sm mt-1">
                {selectedVoice.tone.join(' • ')} - {selectedVoice.communicationStyle}
              </p>
            </div>
            <button
              onClick={() => setSelectedVoice(null)}
              className="text-orange-600 hover:text-orange-800"
            >
              Change
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandVoiceDefiner;