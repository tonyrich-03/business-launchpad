import React, { useState } from 'react';
import { AIService } from '../../services/aiService';
import type { AIBrandingRequest, AIBrandingResponse } from '../../services/aiService';

const AIBrandingAssistance: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [businessDetails, setBusinessDetails] = useState({
    industry: '',
    targetAudience: '',
    brandValues: '',
    keywords: '',
    businessName: '',
    preferences: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIBrandingResponse | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setBusinessDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateBrandSuggestions = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate required fields
      if (!businessDetails.industry.trim()) {
        throw new Error('Industry is required');
      }

      const requestData: AIBrandingRequest = {
        businessName: businessDetails.businessName || 'Your Business',
        industry: businessDetails.industry,
        targetAudience: businessDetails.targetAudience,
        brandValues: businessDetails.brandValues ? [businessDetails.brandValues] : [],
        preferences: businessDetails.preferences
      };

      let response: AIBrandingResponse;

      try {
        // Try to get real AI suggestions
        response = await AIService.getBrandingSuggestions(requestData);
      } catch (apiError) {
        console.warn('AI API failed, using mock data:', apiError);
        // Fallback to mock data if API fails
        response = AIService.getMockBrandingSuggestions(requestData);
      }

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setBusinessDetails({
      industry: '',
      targetAudience: '',
      brandValues: '',
      keywords: '',
      businessName: '',
      preferences: ''
    });
    setResult(null);
    setError(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  return (
    <>
      {/* Get Branding Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="
          px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600
          text-white font-semibold rounded-xl shadow-lg
          hover:from-purple-700 hover:to-blue-700
          transform hover:scale-105 transition-all duration-200
          flex items-center gap-2
        "
      >
        <span>🎨</span>
        Get Branding Help
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">AI Branding Assistant</h2>
                  <p className="text-purple-100 mt-1">
                    Get personalized brand identity suggestions powered by AI
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-purple-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Business Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessDetails.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="e.g., Tech Innovations Inc..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <input
                    type="text"
                    value={businessDetails.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    placeholder="e.g., Tech, Fashion, Food..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={businessDetails.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="e.g., Young professionals, Parents..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Values
                  </label>
                  <input
                    type="text"
                    value={businessDetails.brandValues}
                    onChange={(e) => handleInputChange('brandValues', e.target.value)}
                    placeholder="e.g., Innovation, Trust, Sustainability..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <input
                    type="text"
                    value={businessDetails.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="e.g., Modern, Reliable, Eco-friendly..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferences
                  </label>
                  <input
                    type="text"
                    value={businessDetails.preferences}
                    onChange={(e) => handleInputChange('preferences', e.target.value)}
                    placeholder="e.g., Minimalist, Bold, Playful..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <div className="text-center mb-8">
                <button
                  onClick={generateBrandSuggestions}
                  disabled={loading || !businessDetails.industry}
                  className="
                    px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600
                    text-white font-semibold rounded-xl shadow-lg
                    hover:from-green-600 hover:to-emerald-700
                    disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed
                    transform hover:scale-105 transition-all duration-200
                    flex items-center gap-3 mx-auto
                  "
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating AI Suggestions...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Generate Brand Suggestions
                    </>
                  )}
                </button>
              </div>

              {/* Results Display */}
              {result && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800 text-center">
                    AI-Generated Brand Suggestions
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Brand Name */}
                      <h4 className="text-lg font-bold text-gray-800 mb-2">
                        {result.brandName}
                      </h4>
                      
                      {/* Tagline */}
                      <p className="text-gray-600 italic mb-4">
                        "{result.tagline}"
                      </p>
                      
                      {/* Color Palette */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                          Color Palette
                        </h5>
                        <div className="flex gap-2">
                          {result.colorPalette.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Typography */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-1">
                          Typography
                        </h5>
                        <p className="text-sm text-gray-600">{result.typography}</p>
                      </div>
                      
                      {/* Brand Voice */}
                      <div className="mb-4">
                        <h5 className="text-sm font-semibold text-gray-700 mb-1">
                          Brand Voice
                        </h5>
                        <p className="text-sm text-gray-600">{result.brandVoice}</p>
                      </div>
                      
                      {/* Logo Concept */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-1">
                          Logo Concept
                        </h5>
                        <p className="text-sm text-gray-600">{result.logoDescription}</p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                        <button className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
                          Use This
                        </button>
                        <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition-colors">
                          Save
                        </button>
                      </div>
                    </div>

                    {/* Additional Info Card */}
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Next Steps
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            1
                          </div>
                          <span className="text-sm text-gray-700">Refine your brand identity</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            2
                          </div>
                          <span className="text-sm text-gray-700">Create logo and assets</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            3
                          </div>
                          <span className="text-sm text-gray-700">Develop brand guidelines</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            4
                          </div>
                          <span className="text-sm text-gray-700">Launch your brand</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Regenerate Button */}
                  <div className="text-center">
                    <button
                      onClick={resetForm}
                      className="
                        px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500
                        text-white font-semibold rounded-xl shadow-lg
                        hover:from-purple-600 hover:to-blue-600
                        transform hover:scale-105 transition-all duration-200
                        flex items-center gap-2 mx-auto
                      "
                    >
                      <span>🔄</span>
                      Generate New Suggestions
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!result && !loading && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Ready to Build Your Brand?
                  </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Fill in your business details above and let AI generate unique brand identity suggestions tailored to your vision.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIBrandingAssistance;