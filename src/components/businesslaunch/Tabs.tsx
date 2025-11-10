import type { FC } from 'react';

type Tab = {
  id: string;
  label: string;
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
};

// Icons for each tab (you can customize these)
const tabIcons = {
  'market-research': '🔍',
  'branding': '🎨',
  'website': '🌐',
  'content': '📝',
  'launch': '🚀'
};

const Tabs: FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-300
            min-w-[80px] group
            ${activeTab === tab.id 
              ? 'bg-white text-blue-600 shadow-lg border border-gray-100' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-white/80'
            }
          `}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="text-lg mb-1">
            {tabIcons[tab.id as keyof typeof tabIcons] || '○'}
          </span>
          <span className="text-xs font-semibold whitespace-nowrap">
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export { Tabs };