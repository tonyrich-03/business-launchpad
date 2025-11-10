import type { FC } from 'react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  phase: 'planning' | 'development' | 'testing' | 'launch';
}

interface DevTool {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'tool' | 'guide' | 'checklist' | 'test';
  url?: string;
}

export const WebsiteChecklist: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Define website goals and objectives', completed: false, category: 'Strategy', phase: 'planning' },
    { id: '2', text: 'Create sitemap and information architecture', completed: false, category: 'Planning', phase: 'planning' },    { id: '3', text: 'Design wireframes for key pages', completed: false, category: 'Design', phase: 'planning' },
    { id: '4', text: 'Choose and purchase domain name', completed: false, category: 'Technical', phase: 'planning' },
    { id: '5', text: 'Select web hosting provider', completed: false, category: 'Technical', phase: 'planning' },
    { id: '6', text: 'Set up development environment', completed: false, category: 'Development', phase: 'development' },
    { id: '7', text: 'Develop responsive homepage layout', completed: false, category: 'Development', phase: 'development' },
    { id: '8', text: 'Create about us/company page', completed: false, category: 'Content', phase: 'development' },
    { id: '9', text: 'Build products/services pages', completed: false, category: 'Content', phase: 'development' },
    { id: '10', text: 'Implement contact form and information', completed: false, category: 'Functionality', phase: 'development' },
    { id: '11', text: 'Set up blog/news section', completed: false, category: 'Content', phase: 'development' },
    { id: '12', text: 'Integrate social media links', completed: false, category: 'Social', phase: 'development' },
    { id: '13', text: 'Install SSL certificate', completed: false, category: 'Security', phase: 'development' },
    { id: '14', text: 'Optimize website for SEO', completed: false, category: 'SEO', phase: 'development' },
    { id: '15', text: 'Test website on different browsers', completed: false, category: 'Testing', phase: 'testing' },
    { id: '16', text: 'Test website on mobile devices', completed: false, category: 'Testing', phase: 'testing' },
    { id: '17', text: 'Check all links and forms functionality', completed: false, category: 'Testing', phase: 'testing' },
    { id: '18', text: 'Optimize website loading speed', completed: false, category: 'Performance', phase: 'testing' },
    { id: '19', text: 'Test contact forms and email delivery', completed: false, category: 'Testing', phase: 'testing' },
    { id: '20', text: 'Set up Google Analytics', completed: false, category: 'Analytics', phase: 'testing' },
    { id: '21', text: 'Install Google Search Console', completed: false, category: 'SEO', phase: 'testing' },
    { id: '22', text: 'Create 404 error page', completed: false, category: 'User Experience', phase: 'testing' },
    { id: '23', text: 'Final content review and proofreading', completed: false, category: 'Content', phase: 'testing' },
    { id: '24', text: 'Go live and launch website', completed: false, category: 'Launch', phase: 'launch' },
    { id: '25', text: 'Submit sitemap to search engines', completed: false, category: 'SEO', phase: 'launch' },
    { id: '26', text: 'Set up website backup system', completed: false, category: 'Security', phase: 'launch' },
    { id: '27', text: 'Monitor website performance post-launch', completed: false, category: 'Analytics', phase: 'launch' },
    { id: '28', text: 'Plan ongoing maintenance schedule', completed: false, category: 'Maintenance', phase: 'launch' },
  ]);
  
  const [showDevTools, setShowDevTools] = useState(false);
  const [selectedTool, setSelectedTool] = useState<DevTool | null>(null);

  const devTools: DevTool[] = [
    {
      id: '1',
      title: 'Domain Name Search',
      description: 'Find and check availability for your perfect domain name across multiple registrars',
      category: 'Domain Tools',
      type: 'tool',
      url: 'https://www.namecheap.com/'
    },
    {
      id: '2',
      title: 'Hosting Provider Comparison',
      description: 'Compare features, pricing, and performance of top web hosting providers',
      category: 'Hosting Guide',
      type: 'guide'
    },
    {
      id: '3',
      title: 'SEO Audit Tool',
      description: 'Comprehensive SEO analysis and optimization recommendations for your website',
      category: 'SEO Checklist',
      type: 'tool',
      url: 'https://pagespeed.web.dev/'
    },
    {
      id: '4',
      title: 'Website Performance Test',
      description: 'Test your website loading speed and get optimization suggestions',
      category: 'Performance Test',
      type: 'test',
      url: 'https://gtmetrix.com/'
    },
    {
      id: '5',
      title: 'SSL Certificate Checker',
      description: 'Verify your SSL certificate installation and security configuration',
      category: 'Security Setup',
      type: 'tool',
      url: 'https://www.ssllabs.com/ssltest/'
    },
    {
      id: '6',
      title: 'Mobile Responsiveness Test',
      description: 'Check how your website looks and performs on mobile devices',
      category: 'Performance Test',
      type: 'test',
      url: 'https://search.google.com/test/mobile-friendly'
    },
    {
      id: '7',
      title: 'Code Validator',
      description: 'Validate your HTML, CSS, and JavaScript code for standards compliance',
      category: 'Development',
      type: 'tool',
      url: 'https://validator.w3.org/'
    },
    {
      id: '8',
      title: 'Browser Compatibility Guide',
      description: 'Ensure your website works across all major browsers and versions',
      category: 'Testing',
      type: 'guide'
    }
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

 const openDevTool = (tool: DevTool) => {
    if (tool.url) {
      // Open external tool in new tab
      window.open(tool.url, '_blank', 'noopener,noreferrer');
    } else {
      // Show internal tool/modal
      setSelectedTool(tool);
    }
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  const phases = [
    { key: 'planning', label: 'Planning', color: 'bg-blue-500', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
    { key: 'development', label: 'Development', color: 'bg-green-500', textColor: 'text-green-700', borderColor: 'border-green-200' },
    { key: 'testing', label: 'Testing', color: 'bg-yellow-500', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
    { key: 'launch', label: 'Launch', color: 'bg-purple-500', textColor: 'text-purple-700', borderColor: 'border-purple-200' },
  ];

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  const getPhaseBadge = (phase: string) => {
    const phaseConfig = phases.find(p => p.key === phase);
    return phaseConfig ? `px-2 py-1 text-xs rounded-full ${phaseConfig.textColor} ${phaseConfig.borderColor} border` : '';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tool': return 'bg-blue-100 text-blue-700';
      case 'guide': return 'bg-purple-100 text-purple-700';
      case 'checklist': return 'bg-green-100 text-green-700';
      case 'test': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tool': return '🛠️';
      case 'guide': return '📚';
      case 'checklist': return '✅';
      case 'test': return '🧪';
      default: return '📁';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl shadow-lg mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Website Development Checklist</h2>
        <p className="text-gray-600 mb-4">Build a professional, high-performing website from planning to launch</p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Website Progress</span>
            <span className="text-sm font-semibold text-teal-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-teal-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Development Phases Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Website Development Phases</h3>
        <div className="flex flex-wrap gap-4">
          {phases.map(phase => (
            <div key={phase.key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${phase.color}`}></div>
              <span className="text-sm text-gray-600">{phase.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Website Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-teal-600 mb-1">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600">Overall Ready</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {items.filter(item => item.phase === 'planning' && item.completed).length}
          </div>
          <div className="text-sm text-gray-600">Planning Done</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {items.filter(item => item.phase === 'development' && item.completed).length}
          </div>
          <div className="text-sm text-gray-600">Development Done</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {items.filter(item => item.phase === 'launch').length}
          </div>
          <div className="text-sm text-gray-600">Launch Tasks</div>
        </div>
      </div>

      {/* Checklist Items by Phase */}
      <div className="space-y-8">
        {phases.map(phase => {
          const phaseItems = items.filter(item => item.phase === phase.key);
          if (phaseItems.length === 0) return null;
          
          const completedInPhase = phaseItems.filter(item => item.completed).length;
          const phaseProgress = (completedInPhase / phaseItems.length) * 100;

          return (
            <div key={phase.key} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Phase Header */}
              <div className={`bg-gradient-to-r ${phase.key === 'planning' ? 'from-blue-50 to-cyan-50' : phase.key === 'development' ? 'from-green-50 to-emerald-50' : phase.key === 'testing' ? 'from-yellow-50 to-amber-50' : 'from-purple-50 to-pink-50'} px-6 py-4 border-b border-gray-200`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${phase.color}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{phase.label}</h3>
                  </div>
                  <span className={`text-sm font-medium ${phase.textColor}`}>
                    {completedInPhase}/{phaseItems.length}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${phase.color}`}
                    style={{ width: `${phaseProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-6 space-y-3">
                {phaseItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 group ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-teal-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-teal-400 hover:bg-teal-50'
                      }`}
                    >
                      {item.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <span
                        className={`block font-medium transition-all ${
                          item.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {item.text}
                      </span>
                      {!item.completed && (
                        <div className="flex gap-2 mt-2">
                          <span className={`text-xs rounded-full px-2 py-1 border ${getPhaseBadge(item.phase)}`}>
                            {phases.find(p => p.key === item.phase)?.label}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Web Development Tools Button */}
                    {!item.completed && (
                      <button
                        onClick={() => setShowDevTools(true)}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 rounded-lg bg-teal-50 text-teal-500 hover:bg-teal-100 transition-all duration-200"
                        title="Web development resources"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Web Development Resources */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Web Development Resources</h3>
            <p className="text-teal-100 text-sm mb-4">
              Access tools for domain registration, hosting setup, SEO optimization, and performance testing to build your perfect website.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Domain Tools</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Hosting Guide</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">SEO Checklist</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Performance Test</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Security Setup</span>
            </div>
          </div>
          <button 
           onClick={() => setShowDevTools(true)} 
           className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Open Dev Tools
          </button>
        </div>
      </div>

      {/* Dev Tools Modal */}
      {showDevTools && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Web Development Tools</h2>
                  <p className="text-teal-100 mt-1">
                    Essential tools and resources for building and optimizing your website
                  </p>
                </div>
                <button
                  onClick={() => setShowDevTools(false)}
                  className="text-white hover:text-teal-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {devTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl">
                        {getTypeIcon(tool.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{tool.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(tool.type)}`}>
                            {tool.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {tool.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tool.category}
                          </span>
                          <button
                            onClick={() => openDevTool(tool)}
                            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                          >
                            {tool.url ? 'Open Tool' : 'View Guide'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Categories */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {['Domain Tools', 'Hosting Guide', 'SEO Checklist', 'Performance Test', 'Security Setup'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        const tool = devTools.find(t => t.category === category);
                        if (tool) openDevTool(tool);
                      }}
                      className="bg-gray-50 hover:bg-teal-50 border border-gray-200 rounded-lg p-4 text-center transition-colors group"
                    >
                      <div className="text-2xl mb-2">🌐</div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-teal-700">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internal Tool Modal */}
      {selectedTool && !selectedTool.url && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTool.title}</h2>
                  <p className="text-teal-100 mt-1">{selectedTool.description}</p>
                </div>
                <button
                  onClick={closeTool}
                  className="text-white hover:text-teal-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="prose max-w-none">
                {selectedTool.category === 'Hosting Guide' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Top Hosting Providers</h3>
                    <ul className="space-y-2">
                      <li>• <strong>Bluehost</strong> - Best for beginners, WordPress optimized</li>
                      <li>• <strong>SiteGround</strong> - Excellent performance and support</li>
                      <li>• <strong>HostGator</strong> - Affordable shared hosting plans</li>
                      <li>• <strong>A2 Hosting</strong> - High-speed performance focused</li>
                      <li>• <strong>Cloudways</strong> - Managed cloud hosting</li>
                    </ul>
                  </div>
                )}
                {selectedTool.category === 'Testing' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Browser Compatibility Checklist</h3>
                    <ul className="space-y-2">
                      <li>✅ Test on Chrome (latest 2 versions)</li>
                      <li>✅ Test on Firefox (latest 2 versions)</li>
                      <li>✅ Test on Safari (latest 2 versions)</li>
                      <li>✅ Test on Edge (latest 2 versions)</li>
                      <li>✅ Test on mobile browsers</li>
                      <li>✅ Check responsive design breakpoints</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Launch Status */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Launch Readiness</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-green-800">Essential Tasks</div>
              <div className="text-sm text-green-600">{items.filter(item => ['planning', 'development'].includes(item.phase) && item.completed).length} completed</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-medium text-blue-800">Testing Phase</div>
              <div className="text-sm text-blue-600">{items.filter(item => item.phase === 'testing' && item.completed).length} completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};