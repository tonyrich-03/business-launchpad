import type { FC } from 'react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  timeline: 'pre-launch' | 'launch-week' | 'post-launch';
}

export const LaunchChecklist: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Finalize all website content and copy', completed: false, category: 'Website', timeline: 'pre-launch' },
    { id: '2', text: 'Test website on all devices and browsers', completed: false, category: 'Technical', timeline: 'pre-launch' },
    { id: '3', text: 'Set up Google Analytics and tracking', completed: false, category: 'Analytics', timeline: 'pre-launch' },
    { id: '4', text: 'Install SSL certificate and ensure HTTPS', completed: false, category: 'Technical', timeline: 'pre-launch' },
    { id: '5', text: 'Create and schedule launch announcement posts', completed: false, category: 'Social Media', timeline: 'pre-launch' },
    { id: '6', text: 'Prepare email launch sequence', completed: false, category: 'Email', timeline: 'pre-launch' },
    { id: '7', text: 'Set up social media advertising campaigns', completed: false, category: 'Advertising', timeline: 'pre-launch' },
    { id: '8', text: 'Coordinate with team and stakeholders', completed: false, category: 'Team', timeline: 'pre-launch' },
    { id: '9', text: 'Prepare press kit and media materials', completed: false, category: 'PR', timeline: 'pre-launch' },
    { id: '10', text: 'Finalize pricing and payment systems', completed: false, category: 'Business', timeline: 'pre-launch' },
    { id: '11', text: 'Go live with website and services', completed: false, category: 'Technical', timeline: 'launch-week' },
    { id: '12', text: 'Send launch announcement to email list', completed: false, category: 'Email', timeline: 'launch-week' },
    { id: '13', text: 'Publish social media launch posts', completed: false, category: 'Social Media', timeline: 'launch-week' },
    { id: '14', text: 'Activate paid advertising campaigns', completed: false, category: 'Advertising', timeline: 'launch-week' },
    { id: '15', text: 'Send press releases to media contacts', completed: false, category: 'PR', timeline: 'launch-week' },
    { id: '16', text: 'Monitor website performance and traffic', completed: false, category: 'Analytics', timeline: 'launch-week' },
    { id: '17', text: 'Respond to initial customer inquiries', completed: false, category: 'Customer Service', timeline: 'launch-week' },
    { id: '18', text: 'Share launch on relevant online communities', completed: false, category: 'Community', timeline: 'launch-week' },
    { id: '19', text: 'Collect and analyze first-week data', completed: false, category: 'Analytics', timeline: 'post-launch' },
    { id: '20', text: 'Send follow-up email to early users', completed: false, category: 'Email', timeline: 'post-launch' },
    { id: '21', text: 'Gather customer feedback and testimonials', completed: false, category: 'Customer Service', timeline: 'post-launch' },
    { id: '22', text: 'Optimize based on initial performance data', completed: false, category: 'Optimization', timeline: 'post-launch' },
    { id: '23', text: 'Plan first product update or feature release', completed: false, category: 'Product', timeline: 'post-launch' },
    { id: '24', text: 'Schedule ongoing marketing activities', completed: false, category: 'Marketing', timeline: 'post-launch' },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const timelines = [
    { key: 'pre-launch', label: 'Pre-Launch', color: 'bg-orange-500', textColor: 'text-orange-700', borderColor: 'border-orange-200' },
    { key: 'launch-week', label: 'Launch Week', color: 'bg-green-500', textColor: 'text-green-700', borderColor: 'border-green-200' },
    { key: 'post-launch', label: 'Post-Launch', color: 'bg-blue-500', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  ];

    // ACTUALLY USE the categories array by creating a category summary
  const categories = ['Website', 'Technical', 'Analytics', 'Social Media', 'Email', 'Advertising', 'Team', 'PR', 'Business', 'Customer Service', 'Community', 'Optimization', 'Product', 'Marketing'];
  
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  // Create category progress summary
  const categoryProgress = categories.map(category => {
    const categoryItems = items.filter(item => item.category === category);
    const completedInCategory = categoryItems.filter(item => item.completed).length;
    return {
      name: category,
      completed: completedInCategory,
      total: categoryItems.length,
      progress: categoryItems.length > 0 ? (completedInCategory / categoryItems.length) * 100 : 0
    };
  }).filter(cat => cat.total > 0); // Only show categories that have items

  const getTimelineBadge = (timeline: string) => {
  const timelineConfig = timelines.find(t => t.key === timeline);
    return timelineConfig ? `px-2 py-1 text-xs rounded-full ${timelineConfig.textColor} ${timelineConfig.borderColor} border` : '';
  };

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-lg mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Launch Week Checklist</h2>
        <p className="text-gray-600 mb-4">Your complete guide to a successful business launch</p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Launch Preparation</span>
            <span className="text-sm font-semibold text-orange-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}>
            </div>
          </div>
        </div>
      </div>
     {/* Category Progress Summary - NOW USING THE CATEGORIES ARRAY */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Progress by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categoryProgress.map(category => (
            <div key={category.name} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-1">{category.name}</div>
              <div className="text-xs text-gray-500 mb-2">
                {category.completed}/{category.total}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-green-500 h-1 rounded-full transition-all duration-500"
                  style={{ width: `${category.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Legend */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Launch Timeline</h3>
        <div className="flex flex-wrap gap-4">
          {timelines.map(timeline => (
            <div key={timeline.key} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${timeline.color}`}></div>
              <span className="text-sm text-gray-600">{timeline.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Items by Timeline */}
      <div className="space-y-8">
        {timelines.map(timeline => {
          const timelineItems = items.filter(item => item.timeline === timeline.key);
          if (timelineItems.length === 0) return null;
          
          const completedInTimeline = timelineItems.filter(item => item.completed).length;
          const timelineProgress = (completedInTimeline / timelineItems.length) * 100;

          return (
            <div key={timeline.key} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Timeline Header */}
              <div className={`bg-gradient-to-r ${timeline.key === 'pre-launch' ? 'from-orange-50 to-red-50' : timeline.key === 'launch-week' ? 'from-green-50 to-emerald-50' : 'from-blue-50 to-cyan-50'} px-6 py-4 border-b border-gray-200`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${timeline.color}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{timeline.label}</h3>
                  </div>
                  <span className={`text-sm font-medium ${timeline.textColor}`}>
                    {completedInTimeline}/{timelineItems.length}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${timeline.color}`}
                    style={{ width: `${timelineProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="p-6 space-y-3">
                {timelineItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 group ${
                      item.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:border-orange-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
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
                          <span className={`text-xs rounded-full px-2 py-1 border ${getTimelineBadge(item.timeline)}`}>
                            {timelines.find(t => t.key === item.timeline)?.label}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Quick Action Button */}
                    {!item.completed && (
                      <button
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 transition-all duration-200"
                        title="Quick action"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

      {/* Countdown & Motivation Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">🚀 Launch Countdown Ready!</h3>
            <p className="text-orange-100 text-sm">
              You're {Math.round(progress)}% prepared for launch. Complete the remaining tasks to ensure a smooth and successful launch day.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Website Ready</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Marketing Set</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Team Prepared</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs">Analytics Tracking</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{totalCount - completedCount}</div>
            <div className="text-orange-100 text-sm">Tasks Remaining</div>
          </div>
        </div>
      </div>

      {/* Launch Readiness Score */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-orange-600 mb-1">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-600">Overall Ready</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {items.filter(item => item.timeline === 'pre-launch' && item.completed).length}
          </div>
          <div className="text-sm text-gray-600">Pre-Launch Done</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {items.filter(item => item.timeline === 'launch-week').length}
          </div>
          <div className="text-sm text-gray-600">Launch Week Tasks</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {items.filter(item => item.timeline === 'post-launch').length}
          </div>
          <div className="text-sm text-gray-600">Post-Launch Plans</div>
        </div>
      </div>
    </div>
  );
};