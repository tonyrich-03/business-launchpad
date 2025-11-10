import type { FC } from 'react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface ContentTool {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'generator' | 'template' | 'optimizer' | 'planner';
  prompt?: string;
}

export const ContentChecklist: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Define content strategy and goals', completed: false, category: 'Strategy', priority: 'high' },
    { id: '2', text: 'Create content calendar for first 3 months', completed: false, category: 'Planning', priority: 'high' },
    { id: '3', text: 'Develop brand messaging framework', completed: false, category: 'Strategy', priority: 'high' },
    { id: '4', text: 'Write website copy (Home, About, Services)', completed: false, category: 'Website', priority: 'high' },
    { id: '5', text: 'Create 5 pillar blog posts', completed: false, category: 'Blog', priority: 'high' },
    { id: '6', text: 'Write 10 social media captions', completed: false, category: 'Social Media', priority: 'medium' },
    { id: '7', text: 'Create email newsletter template', completed: false, category: 'Email', priority: 'medium' },
    { id: '8', text: 'Write welcome email sequence', completed: false, category: 'Email', priority: 'medium' },
    { id: '9', text: 'Develop FAQ page content', completed: false, category: 'Website', priority: 'medium' },
    { id: '10', text: 'Create case studies or testimonials', completed: false, category: 'Social Proof', priority: 'medium' },
    { id: '11', text: 'Write product/service descriptions', completed: false, category: 'Website', priority: 'high' },
    { id: '12', text: 'Create video script ideas', completed: false, category: 'Video', priority: 'low' },
    { id: '13', text: 'Develop lead magnet (ebook, checklist)', completed: false, category: 'Lead Generation', priority: 'high' },
    { id: '14', text: 'Write about us/company story', completed: false, category: 'Website', priority: 'medium' },
    { id: '15', text: 'Create social media profile bios', completed: false, category: 'Social Media', priority: 'medium' },
    { id: '16', text: 'Develop content promotion plan', completed: false, category: 'Strategy', priority: 'medium' },
    { id: '17', text: 'Write guest post pitches', completed: false, category: 'Outreach', priority: 'low' },
    { id: '18', text: 'Create presentation slides deck', completed: false, category: 'Collateral', priority: 'low' },
  ]);

const [showContentTools, setShowContentTools] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ContentTool | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTools: ContentTool[] = [
    {
      id: '1',
      title: 'Blog Topic Generator',
      description: 'Generate engaging blog post ideas based on your industry and target audience',
      category: 'Blog Ideas',
      type: 'generator',
      prompt: 'Generate 5 blog post ideas for a [industry] business targeting [audience]'
    },
    {
      id: '2',
      title: 'Social Media Content Planner',
      description: 'Create a week worth of social media content across different platforms',
      category: 'Social Media',
      type: 'planner'
    },
    {
      id: '3',
      title: 'Email Template Builder',
      description: 'Create professional email templates for newsletters, promotions, and sequences',
      category: 'Email Templates',
      type: 'template'
    },
    {
      id: '4',
      title: 'SEO Content Optimizer',
      description: 'Optimize your content for search engines with keyword suggestions and structure tips',
      category: 'SEO Optimization',
      type: 'optimizer'
    },
    {
      id: '5',
      title: 'Headline Generator',
      description: 'Create compelling headlines that grab attention and improve click-through rates',
      category: 'Blog Ideas',
      type: 'generator',
      prompt: 'Generate 10 compelling headlines for a blog post about [topic]'
    },
    {
      id: '6',
      title: 'Content Calendar Template',
      description: 'Plan and organize your content strategy with a customizable calendar template',
      category: 'Social Media',
      type: 'template'
    },
    {
      id: '7',
      title: 'Copywriting Framework',
      description: 'Use proven copywriting formulas to create persuasive and engaging content',
      category: 'SEO Optimization',
      type: 'template'
    },
    {
      id: '8',
      title: 'Content Idea Expander',
      description: 'Turn a single idea into multiple content pieces across different formats',
      category: 'Blog Ideas',
      type: 'generator',
      prompt: 'Expand this content idea into 3 different formats: [idea]'
    }
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

 const openContentTool = (tool: ContentTool) => {
    setSelectedTool(tool);
    setToolInput('');
    setGeneratedContent('');
  };

  const closeTool = () => {
    setSelectedTool(null);
    setToolInput('');
    setGeneratedContent('');
  };

  const generateContent = () => {
    if (!selectedTool) return;
    
    // Simulate AI content generation
    setGeneratedContent('Generating content...');
    
    setTimeout(() => {
      let content = '';
      
      switch (selectedTool.id) {
        case '1':
          content = `Based on your input "${toolInput}", here are 5 engaging blog post ideas:\n\n1. "The Ultimate Guide to [Topic] for [Audience]"\n2. "5 Common Mistakes in [Industry] and How to Avoid Them"\n3. "How [Solution] Can Transform Your [Business Area]"\n4. "The Future of [Industry]: Trends to Watch in 2024"\n5. "Case Study: How We Achieved [Result] for Our Clients"`;
          break;
        case '5':
          content = `Compelling headlines for "${toolInput}":\n\n1. "The Secret to Mastering [Topic] Revealed"\n2. "Why [Topic] Matters More Than You Think"\n3. "5 Proven Strategies for Better [Topic] Results"\n4. "The [Topic] Guide You Wish You Had Sooner"\n5. "How to [Achieve Goal] With Simple [Topic] Tips"\n6. "The Truth About [Topic] Nobody Tells You"\n7. "[Number] Ways [Topic] Can Transform Your Business"\n8. "Avoid These [Number] [Topic] Mistakes at All Costs"\n9. "The Ultimate [Topic] Checklist for Beginners"\n10. "What Experts Won't Tell You About [Topic]"`;
          break;
        case '8':
          content = `Content expansion for "${toolInput}":\n\n📝 BLOG POST: Comprehensive guide diving deep into the topic\n🎥 VIDEO: Short explainer video demonstrating key concepts\n📊 INFOGRAPHIC: Visual representation of data and statistics\n🎧 PODCAST: Interview with industry expert on the subject\n📱 SOCIAL MEDIA: Bite-sized tips and insights for daily posts\n📧 NEWSLETTER: Exclusive insights and practical applications\n📚 EBOOK: Extended resource with actionable frameworks`;
          break;
        default:
          content = `Content template for ${selectedTool.title}:\n\nThis is a sample structure for your ${selectedTool.category.toLowerCase()} content. Customize it based on your specific needs and brand voice.`;
      }
      
      setGeneratedContent(content);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Content copied to clipboard!');
  };

  const categories = ['Strategy', 'Planning', 'Website', 'Blog', 'Social Media', 'Email', 'Social Proof', 'Video', 'Lead Generation', 'Outreach', 'Collateral'];
  
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Priority';
    }
  };

 const getTypeColor = (type: string) => {
    switch (type) {
      case 'generator': return 'bg-purple-100 text-purple-700';
      case 'template': return 'bg-blue-100 text-blue-700';
      case 'optimizer': return 'bg-green-100 text-green-700';
      case 'planner': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'generator': return '✨';
      case 'template': return '📄';
      case 'optimizer': return '⚡';
      case 'planner': return '📅';
      default: return '🛠️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Content Strategy Checklist</h2>
        <p className="text-gray-600 mb-4">Build engaging content that connects with your audience</p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Content Progress</span>
            <span className="text-sm font-semibold text-blue-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Priority Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Priority Guide</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">High Priority - Do First</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Medium Priority - Do Next</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Low Priority - Do Last</span>
          </div>
        </div>
      </div>

      {/* Checklist Items by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          
          const completedInCategory = categoryItems.filter(item => item.completed).length;
          const categoryProgress = (completedInCategory / categoryItems.length) * 100;

          return (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  <span className="text-sm text-blue-600 font-medium">
                    {completedInCategory}/{categoryItems.length}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-teal-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${categoryProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-6 space-y-3">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 group ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
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
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full border ${getPriorityColor(item.priority)}`}>
                          {getPriorityLabel(item.priority)}
                        </span>
                      )}
                    </div>

                    {/* Content Tools Button */}
                    {!item.completed && (
                      <button
                        onClick={() => setShowContentTools(true)}
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 rounded-lg bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all duration-200"
                        title="Get content ideas"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

      {/* Content Tools Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Content Creation Tools</h3>
            <p className="text-blue-100 text-sm mb-4">
              Generate engaging content ideas, optimize your copy, and plan your content calendar with AI assistance.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Blog Ideas</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Social Media</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Email Templates</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">SEO Optimization</span>
            </div>
          </div>
          <button 
           onClick={() => setShowContentTools(true)}
           className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Open Content Tools
          </button>
        </div>
      </div>

 {/* Content Tools Modal */}
      {showContentTools && !selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Content Creation Tools</h2>
                  <p className="text-blue-100 mt-1">
                    AI-powered tools to generate, optimize, and plan your content strategy
                  </p>
                </div>
                <button
                  onClick={() => setShowContentTools(false)}
                  className="text-white hover:text-blue-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
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
                            onClick={() => openContentTool(tool)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                          >
                            Use Tool
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Blog Ideas', 'Social Media', 'Email Templates', 'SEO Optimization'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        const tool = contentTools.find(t => t.category === category);
                        if (tool) openContentTool(tool);
                      }}
                      className="bg-gray-50 hover:bg-blue-50 border border-gray-200 rounded-lg p-4 text-center transition-colors group"
                    >
                      <div className="text-2xl mb-2">📝</div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
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

      {/* Content Generator Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{selectedTool.title}</h2>
                  <p className="text-blue-100 mt-1">{selectedTool.description}</p>
                </div>
                <button
                  onClick={closeTool}
                  className="text-white hover:text-blue-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {selectedTool.prompt && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your content needs
                  </label>
                  <textarea
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    placeholder={selectedTool.prompt}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                  <button
                    onClick={generateContent}
                    disabled={!toolInput.trim()}
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Generate Content
                  </button>
                </div>
              )}

              {generatedContent && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Generated Content
                    </label>
                    <button
                      onClick={copyToClipboard}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              )}

              {!selectedTool.prompt && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-3">Content Template</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600">
                      This tool provides a structured framework for your {selectedTool.category.toLowerCase()} content.
                      Use it as a starting point and customize based on your specific needs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {items.filter(item => item.priority === 'high' && !item.completed).length}
          </div>
          <div className="text-sm text-gray-600">High Priority Remaining</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600 mb-1">{completedCount}</div>
          <div className="text-sm text-gray-600">Tasks Completed</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {items.filter(item => !item.completed).length}
          </div>
          <div className="text-sm text-gray-600">Tasks Remaining</div>
        </div>
      </div>
    </div>
  );
};
