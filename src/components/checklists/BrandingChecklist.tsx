import type { FC } from 'react';
import { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  category: string;
}

export const BrandingChecklist: FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    { id: '1', text: 'Define brand mission and vision', completed: false, category: 'Foundation' },
    { id: '2', text: 'Identify target audience and personas', completed: false, category: 'Foundation' },
    { id: '3', text: 'Research competitor branding', completed: false, category: 'Research' },
    { id: '4', text: 'Define brand voice and personality', completed: false, category: 'Identity' },
    { id: '5', text: 'Create brand style guide', completed: false, category: 'Identity' },
    { id: '6', text: 'Design primary logo', completed: false, category: 'Visual' },
    { id: '7', text: 'Design alternative logo variations', completed: false, category: 'Visual' },
    { id: '8', text: 'Choose primary brand colors', completed: false, category: 'Visual' },
    { id: '9', text: 'Select brand typography', completed: false, category: 'Visual' },
    { id: '10', text: 'Design business cards', completed: false, category: 'Collateral' },
    { id: '11', text: 'Create email signature template', completed: false, category: 'Collateral' },
    { id: '12', text: 'Design social media graphics kit', completed: false, category: 'Collateral' },
    { id: '13', text: 'Set up brand social media profiles', completed: false, category: 'Digital' },
    { id: '14', text: 'Create brand presentation template', completed: false, category: 'Collateral' },
    { id: '15', text: 'Develop brand story and messaging', completed: false, category: 'Content' },
  ]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const categories = ['Foundation', 'Research', 'Identity', 'Visual', 'Collateral', 'Digital', 'Content'];
  
  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-6">
      {/* Header with Progress */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Branding Checklist</h2>
        <p className="text-gray-600 mb-4">Build a strong, memorable brand identity</p>
        
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-700">Branding Progress</span>
            <span className="text-sm font-semibold text-blue-600">{completedCount}/{totalCount} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
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
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                  <span className="text-sm text-purple-600 font-medium">
                    {completedInCategory}/{categoryItems.length}
                  </span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-500"
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
                        : 'bg-white border-gray-200 hover:border-purple-200 hover:shadow-sm'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        item.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                    >
                      {item.completed && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <span
                      className={`flex-1 text-left font-medium transition-all ${
                        item.completed
                          ? 'text-gray-500 line-through'
                          : 'text-gray-900'
                      }`}
                    >
                      {item.text}
                    </span>

                    {/* AI Suggestion Button */}
                    {!item.completed && (
                      <button
                        className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-2 rounded-lg bg-amber-50 text-amber-500 hover:bg-amber-100 transition-all duration-200"
                        title="Get AI suggestions"
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

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Need help with branding?</h3>
            <p className="text-purple-100 text-sm">Get AI-powered suggestions for your brand identity</p>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap">
           Get Branding Help
          </button>
        </div>
      </div>
    </div>
  );
};