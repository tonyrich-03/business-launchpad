// DayCard.tsx
import React, { useState } from 'react';

interface DayCardProps {
  date: Date;
  content: string;
  onContentChange: (content: string) => void;
}

const DayCard: React.FC<DayCardProps> = ({ date, content, onContentChange }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [localContent, setLocalContent] = useState<string>(content);
  
  const isToday = () => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWeekend = () => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleFocus = () => setIsFocused(true);
  
  const handleBlur = () => {
    setIsFocused(false);
    // Save when user leaves the textarea
    onContentChange(localContent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
  };

  // Update local content when prop changes (week navigation)
  React.useEffect(() => {
    setLocalContent(content);
  }, [content]);

  return (
    <div className={`
      bg-white rounded-xl border-2 p-4 min-h-[220px] 
      shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 
      overflow-hidden flex flex-col
      ${isFocused ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' : 'border-gray-200 hover:border-gray-300'}
      ${isToday() ? 'bg-gradient-to-br from-blue-50 to-cyan-50' : ''}
      ${isWeekend() ? 'bg-gray-50' : ''}
      dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100
      ${isToday() ? 'dark:bg-gradient-to-br dark:from-blue-900 dark:to-blue-800' : ''}
      ${isWeekend() ? 'dark:bg-slate-900' : ''}
    `}>
      <div className="text-center mb-3 pb-3 border-b border-slate-100 dark:border-slate-700 relative">
        <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-1 dark:text-slate-400">
          {date.toLocaleDateString('default', { weekday: 'short' })}
        </div>
        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {date.getDate()}
        </div>
        {isToday() && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full uppercase tracking-wide">
            Today
          </div>
        )}
      </div>
      
      <textarea
        value={localContent}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Write your plans, tasks, or notes here..."
        className="w-full flex-1 p-3 text-sm bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-slate-700/80 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
      />
      
      <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-slate-400">
        <span>
          {localContent.length} characters
        </span>
        {localContent.length > 0 && (
          <button
            onClick={() => {
              setLocalContent('');
              onContentChange('');
            }}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Clear content"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default DayCard;