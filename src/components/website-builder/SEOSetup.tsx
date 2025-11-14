import React, { useState } from 'react';
import type { SEOConfig, WebsiteRequirements, WebsiteContent } from './types';

interface SEOSetupProps {
  requirements: WebsiteRequirements;
  websiteContent?: WebsiteContent;
  onSEOConfigured: (seo: SEOConfig) => void;
}

const SEOSetup: React.FC<SEOSetupProps> = ({
  requirements,
  onSEOConfigured
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [seoOptions, setSeoOptions] = useState<SEOConfig[]>([]);
  const [selectedSEO, setSelectedSEO] = useState<SEOConfig | null>(null);

  const generateSEO = async () => {
    setIsGenerating(true);
    
    // Simulate AI SEO generation
    setTimeout(() => {
      const mockSEO: SEOConfig[] = [
        {
          title: `${requirements.industry} Services | Professional ${requirements.industry} Solutions`,
          description: `Expert ${requirements.industry.toLowerCase()} services delivering exceptional results. Professional team, proven track record. Get your free consultation today.`,
          keywords: [
            requirements.industry.toLowerCase(),
            `${requirements.industry} services`,
            'professional solutions',
            'business growth',
            'expert consultation'
          ],
          metaTags: [
            'professional',
            'trusted',
            'experienced',
            'quality',
            'reliable'
          ],
          openGraph: {
            title: `Transform Your Business with Our ${requirements.industry} Services`,
            description: `Discover how our expert ${requirements.industry.toLowerCase()} solutions can help your business achieve remarkable growth and success.`,
            image: '/og-image.jpg'
          }
        },
        {
          title: `Best ${requirements.industry} Company | Award-Winning ${requirements.industry} Services`,
          description: `Leading ${requirements.industry.toLowerCase()} company with 5-star ratings. Innovative solutions, dedicated support. Schedule your discovery call now.`,
          keywords: [
            `best ${requirements.industry}`,
            'award-winning',
            'top-rated',
            'premium services',
            'industry leaders'
          ],
          metaTags: [
            'premium',
            'award-winning',
            'leading',
            'innovative',
            'exclusive'
          ],
          openGraph: {
            title: `Experience Excellence with Our ${requirements.industry} Services`,
            description: `Join industry leaders who trust our premium ${requirements.industry.toLowerCase()} solutions for outstanding business results.`,
            image: '/og-image-premium.jpg'
          }
        },
        {
          title: `Affordable ${requirements.industry} Solutions | Quality ${requirements.industry} Services`,
          description: `Budget-friendly ${requirements.industry.toLowerCase()} services without compromising quality. Get professional results at competitive prices. Start today!`,
          keywords: [
            'affordable',
            'budget-friendly',
            'cost-effective',
            'quality services',
            'value pricing'
          ],
          metaTags: [
            'affordable',
            'value',
            'budget',
            'cost-effective',
            'accessible'
          ],
          openGraph: {
            title: `Quality ${requirements.industry} Services at Amazing Prices`,
            description: `Get professional ${requirements.industry.toLowerCase()} solutions that fit your budget and deliver exceptional value for your business.`,
            image: '/og-image-value.jpg'
          }
        }
      ];
      
      setSeoOptions(mockSEO);
      setIsGenerating(false);
    }, 2500);
  };

  const SEOCard: React.FC<{ seo: SEOConfig; index: number }> = ({ seo, index }) => (
    <div
      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
        selectedSEO === seo
          ? 'border-orange-500 bg-orange-50'
          : 'border-gray-200 hover:border-orange-300'
      }`}
      onClick={() => {
        setSelectedSEO(seo);
        onSEOConfigured(seo);
      }}
    >
      <h4 className="font-semibold text-gray-800 mb-3">
        SEO Strategy {index + 1}
      </h4>

      {/* Page Title */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">Page Title</div>
        <div className="text-gray-800 text-sm font-medium leading-relaxed">
          {seo.title}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {seo.title.length} characters
        </div>
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-1">Meta Description</div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {seo.description}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {seo.description.length} characters
        </div>
      </div>

      {/* Keywords */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Keywords</div>
        <div className="flex flex-wrap gap-1">
          {seo.keywords.slice(0, 5).map((keyword, kwIndex) => (
            <span
              key={kwIndex}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Open Graph */}
      <div className="border-t pt-3">
        <div className="text-sm text-gray-600 mb-2">Open Graph</div>
        <div className="space-y-1 text-xs">
          <div><strong>Title:</strong> {seo.openGraph.title}</div>
          <div><strong>Description:</strong> {seo.openGraph.description.substring(0, 80)}...</div>
        </div>
      </div>

      {/* SEO Score */}
      <div className="mt-4 p-2 bg-gray-50 rounded text-center">
        <div className="text-xs text-gray-600 mb-1">Estimated SEO Score</div>
        <div className="text-lg font-bold text-green-600">
          {85 + index * 5}%
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">AI SEO Optimizer</h3>
          <p className="text-gray-600">Get AI-optimized SEO strategies for better search rankings</p>
        </div>
        <button
          onClick={generateSEO}
          disabled={isGenerating}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 disabled:opacity-50"
        >
          {isGenerating ? 'Optimizing SEO...' : 'Generate SEO'}
        </button>
      </div>

      {requirements.industry && (
        <div className="mb-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-orange-700 text-sm">
            Optimizing for: <strong>{requirements.industry}</strong> industry
            {requirements.targetAudience && ` targeting ${requirements.targetAudience}`}
          </p>
        </div>
      )}

      {isGenerating && (
        <div className="animate-pulse space-y-6 mb-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-gray-200 rounded-xl p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      )}

      {seoOptions.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {seoOptions.map((seo, index) => (
            <SEOCard key={index} seo={seo} index={index} />
          ))}
        </div>
      )}

      {!isGenerating && seoOptions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h4 className="font-medium text-gray-700 mb-2">Ready to Boost Your SEO</h4>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Click the button above to generate AI-optimized SEO strategies 
            that will help your website rank higher in search results.
          </p>
        </div>
      )}

      {selectedSEO && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">
                SEO Strategy Selected
              </h4>
              <p className="text-green-700 text-sm mt-1">
                Title: {selectedSEO.title.substring(0, 50)}...
              </p>
            </div>
            <button
              onClick={() => setSelectedSEO(null)}
              className="text-green-600 hover:text-green-800"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* SEO Tips */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">💡 SEO Best Practices</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Keep title tags under 60 characters</li>
          <li>• Meta descriptions should be 150-160 characters</li>
          <li>• Use primary keywords naturally in content</li>
          <li>• Optimize images with alt text</li>
          <li>• Ensure fast page loading speeds</li>
        </ul>
      </div>
    </div>
  );
};

export default SEOSetup;