import type { FC } from 'react';
import { useState } from 'react';

interface Priority {
  id: string;
  text: string;
  completed: boolean;
}

interface PriorityListProps {
  priorities: Priority[];
  setPriorities: (priorities: Priority[]) => void;
}

const PriorityList: FC<PriorityListProps> = ({ priorities, setPriorities }) => {
  const [newPriority, setNewPriority] = useState<string>('');

  const addPriority = () => {
    if (newPriority.trim()) {
      const newPriorityItem: Priority = {
        id: Date.now().toString(),
        text: newPriority.trim(),
        completed: false,
      };
      setPriorities([...priorities, newPriorityItem]);
      setNewPriority('');
    }
  };

  const togglePriority = (id: string) => {
    setPriorities(
      priorities.map(priority =>
        priority.id === id
          ? { ...priority, completed: !priority.completed }
          : priority
      )
    );
  };

  const deletePriority = (id: string) => {
    setPriorities(priorities.filter(priority => priority.id !== id));
  };

  return (
    <div className="priority-list space-y-3">
      {/* Add new priority input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addPriority()}
          placeholder="Add a top priority..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addPriority}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Priorities list */}
      <div className="space-y-2">
        {priorities.map((priority) => (
          <div
            key={priority.id}
            className={`flex items-center gap-3 p-3 border rounded-lg transition-all ${
              priority.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={priority.completed}
              onChange={() => togglePriority(priority.id)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
            />
            <span
              className={`flex-1 text-sm ${
                priority.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
            >
              {priority.text}
            </span>
            <button
              onClick={() => deletePriority(priority.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        {priorities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No priorities yet. Add your top priorities for today!</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {priorities.length > 0 && (
        <div className="text-sm text-gray-500 text-center">
          {priorities.filter(p => p.completed).length} of {priorities.length} completed
        </div>
      )}
    </div>
  );
};

export default PriorityList;