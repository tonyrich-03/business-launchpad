import { useState } from 'react';
import ResourceSuggestionModal from './ResourceSuggestionModal';

interface ResourceSuggestion {
  name: string;
  url: string;
  category: string;
  description: string;
  whyRecommend: string;
}

const Resources = () => {
const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);

  const resourceCategories = [
    {
      name: 'Design Tools',
      icon: '🎨',
      items: [
        { name: 'Canva', url: 'https://canva.com', description: 'Graphic design platform', icon: '🖼️' },
        { name: 'Figma', url: 'https://figma.com', description: 'UI/UX design tool', icon: '📐' },
        { name: 'Adobe Creative Cloud', url: 'https://adobe.com', description: 'Professional design suite', icon: '✨' }
      ]
    },
    {
      name: 'Development',
      icon: '💻',
      items: [
        { name: 'GitHub', url: 'https://github.com', description: 'Code collaboration platform', icon: '🔗' },
        { name: 'VS Code', url: 'https://code.visualstudio.com', description: 'Code editor', icon: '⚡' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', description: 'Developer community', icon: '❓' }
      ]
    },
    {
      name: 'Productivity',
      icon: '🚀',
      items: [
        { name: 'Notion', url: 'https://notion.so', description: 'All-in-one workspace', icon: '📝' },
        { name: 'Slack', url: 'https://slack.com', description: 'Team communication', icon: '💬' },
        { name: 'Trello', url: 'https://trello.com', description: 'Project management', icon: '📋' }
      ]
    },
    {
      name: 'Marketing',
      icon: '📢',
      items: [
        { name: 'Mailchimp', url: 'https://mailchimp.com', description: 'Email marketing platform', icon: '✉️' },
        { name: 'Hootsuite', url: 'https://hootsuite.com', description: 'Social media management', icon: '📱' },
        { name: 'Google Analytics', url: 'https://analytics.google.com', description: 'Website analytics', icon: '📊' }
      ]
    }
  ];
 
  const handleSuggestionSubmit = (suggestion: ResourceSuggestion) => {
    // In a real app, you would send this to your backend
    console.log('Resource suggestion submitted:', suggestion);
    
    // Show success message (you can add a toast notification here)
    alert(`Thank you for suggesting "${suggestion.name}"! We'll review it and add it to our collection if it fits.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-2 px-4 sm:px-6 lg:px-8">
      {/* Resource Suggestion Modal */}
      <ResourceSuggestionModal
        isOpen={isSuggestionModalOpen}
        onClose={() => setIsSuggestionModalOpen(false)}
        onSubmit={handleSuggestionSubmit}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-4">
            Business Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated collection of essential tools and platforms to help you build and grow your business
          </p>
        </div>
        {/* Resources Grid */}
        <div className="space-y-8">
          {resourceCategories.map((category) => (
            <section 
              key={category.name}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-100/60 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800">{category.name}</h2>
                  <span className="ml-auto px-3 py-1 bg-white/80 rounded-full text-sm font-medium text-gray-600 border border-gray-200/60">
                    {category.items.length} tools
                  </span>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group bg-white border-2 border-gray-100 rounded-2xl p-5
                        hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10
                        transition-all duration-300 ease-out
                        hover:scale-105 active:scale-95
                        cursor-pointer
                      "
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                            {item.icon}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {item.name}
                          </h3>
                        </div>
                        <div className="
                          opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0
                          transition-all duration-300 ease-out
                        ">
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          {new URL(item.url).hostname}
                        </span>
                        <div className="
                          px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg
                          group-hover:bg-blue-500 group-hover:text-white
                          transition-all duration-300
                        ">
                          Visit →
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Have a resource to suggest?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We're always looking for great tools to add to our collection. Share your favorites with us!
            </p>
           <button 
            onClick={() => setIsSuggestionModalOpen(true)} 
              className="
              inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500
              text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25
              hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105
              active:scale-95 transition-all duration-300
            ">
             <span className="text-xl">💡</span>
              Suggest a Resource
            </button>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">50+</div>
                <div className="text-xs text-gray-500">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">10+</div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">Community</div>
                <div className="text-xs text-gray-500">Driven</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;