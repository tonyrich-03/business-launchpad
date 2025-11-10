import type { FC } from 'react';
import { Checkbox } from './ui/checkbox';
import { FaLightbulb as LightbulbIcon } from 'react-icons/fa';

type ChecklistItemType = {
  id: string;
  text: string;
  completed: boolean;
};

type ChecklistItemProps = {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
  onAIPrompt: (item: ChecklistItemType) => void;
  className?: string;
  priority?: 'low' | 'medium' | 'high';
};

export const ChecklistItem: FC<ChecklistItemProps> = ({ 
  item, 
  onToggle, 
  onAIPrompt,
  className = '',
  priority = 'medium'
}) => {
  const priorityColors = {
    low: 'border-gray-200 hover:border-gray-300',
    medium: 'border-blue-200 hover:border-blue-300',
    high: 'border-red-200 hover:border-red-300'
  };

  const priorityIcons = {
    low: 'text-gray-400',
    medium: 'text-blue-400',
    high: 'text-red-400'
  };

  return (
    <div 
      className={`
        group flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
        ${item.completed 
          ? 'bg-green-50 border-green-200 shadow-sm' 
          : `bg-white ${priorityColors[priority]} shadow-sm hover:shadow-md`
        }
        ${className}
      `}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0">
        <Checkbox 
          checked={item.completed}
          onChange={() => onToggle(item.id)}
          label=""
          size="md"
        />
      </div>

      {/* Item Text */}
      <div className="flex-1 min-w-0">
        <span 
          className={`
            block text-base font-medium transition-all duration-300
            ${item.completed 
              ? 'text-gray-500 line-through' 
              : 'text-gray-900'
            }
            break-words
          `}
        >
          {item.text}
        </span>
        
        {/* Priority Indicator (only show for incomplete items) */}
        {!item.completed && priority !== 'medium' && (
          <div className="flex items-center gap-2 mt-2">
            <div className={`
              w-2 h-2 rounded-full
              ${priority === 'high' ? 'bg-red-400' : 'bg-gray-400'}
            `} />
            <span className={`
              text-xs font-medium uppercase tracking-wide
              ${priority === 'high' ? 'text-red-600' : 'text-gray-500'}
            `}>
              {priority} priority
            </span>
          </div>
        )}
      </div>

      {/* AI Suggestion Button */}
      {!item.completed && (
        <button 
          className={`
            flex-shrink-0 p-2 rounded-lg transition-all duration-300
            opacity-0 group-hover:opacity-100 focus:opacity-100
            transform translate-x-2 group-hover:translate-x-0
            ${item.completed 
              ? 'text-gray-400 cursor-not-allowed' 
              : `text-amber-500 hover:bg-amber-50 hover:text-amber-600 active:bg-amber-100 ${priorityIcons[priority]}`
            }
          `}
          onClick={() => onAIPrompt(item)}
          disabled={item.completed}
          aria-label={`Get AI suggestions for: ${item.text}`}
          title="Get AI suggestions"
        >
          <LightbulbIcon className="w-4 h-4" />
        </button>
      )}

      {/* Completion Animation */}
      {item.completed && (
        <div className="flex-shrink-0">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-green-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};