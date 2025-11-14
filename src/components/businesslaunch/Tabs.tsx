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

const tabIcons = {
  'ai-plan': '🤖',
  'ai-branding': '🎨',
  'ai-website': '🌐',
  'ai-marketing': '📊', 
  'market-research': '🔍',
  'branding': '🏷️',
  'website': '🌐',
  'content': '📝',
  'launch': '🚀'
};

const Tabs: FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  // Split tabs into three rows for mobile
  const firstRowTabs = tabs.slice(0, 4);  // Tabs 0-3: ai-plan, ai-branding, ai-website, ai-marketing
  const secondRowTabs = tabs.slice(4, 8); // Tabs 4-7: market-research, branding, website, content
  const thirdRowTabs = tabs.slice(8, 9);  // Tab 8 only: launch

  // Tab button styling function
  const getTabClass = (isMobile: boolean, isActive: boolean) => `
    flex flex-col items-center justify-center rounded-lg transition-all duration-300
    flex-shrink-0 group
    ${isMobile 
      ? 'py-1 px-1 min-w-[70px]' 
      : 'py-2 sm:py-3 px-2 sm:px-4 min-w-[70px] sm:min-w-[80px]'
    }
    ${isActive 
      ? 'bg-white text-blue-600 shadow-sm border border-gray-100' 
      : 'text-gray-500 hover:text-gray-700 hover:bg-white/80'
    }
  `;

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-1 sm:p-2 border border-gray-200">
      {/* Mobile: Three rows */}
      <div className="sm:hidden space-y-1">
        {/* First Row - Tabs 0-3 */}
        <div className="flex space-x-1 justify-center">
          {firstRowTabs.map((tab) => (
            <button
              key={tab.id}
              className={getTabClass(true, activeTab === tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-xs mb-0.5">
                {tabIcons[tab.id as keyof typeof tabIcons] || '○'}
              </span>
              <span className="text-[10px] font-semibold whitespace-nowrap leading-tight">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
        
        {/* Second Row - Tabs 4-7 */}
        <div className="flex space-x-1 justify-center">
          {secondRowTabs.map((tab) => (
            <button
              key={tab.id}
              className={getTabClass(true, activeTab === tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-xs mb-0.5">
                {tabIcons[tab.id as keyof typeof tabIcons] || '○'}
              </span>
              <span className="text-[10px] font-semibold whitespace-nowrap leading-tight">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
        
        {/* Third Row - Tab 8 (Launch) only */}
        <div className="flex space-x-1 justify-center">
          {thirdRowTabs.map((tab) => (
            <button
              key={tab.id}
              className={getTabClass(true, activeTab === tab.id)}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-xs mb-0.5">
                {tabIcons[tab.id as keyof typeof tabIcons] || '○'}
              </span>
              <span className="text-[10px] font-semibold whitespace-nowrap leading-tight">
                {tab.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Single row */}
      <div className="hidden sm:flex flex-wrap justify-center gap-1 sm:gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={getTabClass(false, activeTab === tab.id)}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="text-sm sm:text-lg mb-0.5">
              {tabIcons[tab.id as keyof typeof tabIcons] || '○'}
            </span>
            <span className="text-xs font-semibold whitespace-nowrap leading-tight">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export { Tabs };