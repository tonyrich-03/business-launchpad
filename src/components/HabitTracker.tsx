import { useState } from 'react';

// Define the Habit type
interface Habit {
  id: number;
  name: string;
  days: boolean[];
}

const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Morning routine', days: [false, false, false, false, false, false, false] },
    { id: 2, name: 'Exercise', days: [false, true, false, true, false, true, false] },
    { id: 3, name: 'Read book', days: [true, true, false, true, false, false, true] },
    { id: 4, name: 'Meditation', days: [false, false, true, false, true, false, false] },
  ]);

  const toggleHabitDay = (habitId: number, dayIndex: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            days: [...habit.days.slice(0, dayIndex), !habit.days[dayIndex], ...habit.days.slice(dayIndex + 1)] 
          }
        : habit
    ));
  };

  const getCompletionRate = (days: boolean[]) => {
    const completed = days.filter(day => day).length;
    return Math.round((completed / days.length) * 100);
  };

  const getCurrentDayIndex = () => {
    return new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-6xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Habit Tracker</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg">
            {habits.length} habits
          </span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Completed</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-max">
          {/* Table Header */}
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-700 min-w-[200px]">
                Habit
              </th>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                <th 
                  key={i} 
                  className={`py-4 px-3 font-semibold text-gray-700 text-center ${
                    i === getCurrentDayIndex() ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm">{day}</span>
                    <span className={`text-xs mt-1 ${
                      i === getCurrentDayIndex() ? 'text-blue-600 font-bold' : 'text-gray-500'
                    }`}>
                      {i + 1}
                    </span>
                  </div>
                </th>
              ))}
              <th className="py-4 px-6 font-semibold text-gray-700 text-center min-w-[120px]">
                Progress
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100">
            {habits.map((habit) => {
              const completionRate = getCompletionRate(habit.days);
              return (
                <tr 
                  key={habit.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Habit Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{habit.name}</span>
                    </div>
                  </td>

                  {/* Day Checkboxes */}
                  {habit.days.map((completed, dayIndex) => (
                    <td key={dayIndex} className="py-3 px-2 text-center">
                      <button
                        onClick={() => toggleHabitDay(habit.id, dayIndex)}
                        className={`
                          w-10 h-10 rounded-xl border-2 transition-all duration-200 
                          flex items-center justify-center font-semibold text-sm
                          hover:scale-105 active:scale-95
                          ${completed 
                            ? 'bg-green-500 border-green-500 text-white shadow-md hover:bg-green-600 hover:border-green-600' 
                            : 'border-gray-300 bg-white text-transparent hover:border-gray-400 hover:bg-gray-50'
                          }
                          ${dayIndex === getCurrentDayIndex() 
                            ? completed 
                              ? 'ring-2 ring-green-200 ring-offset-1' 
                              : 'ring-2 ring-blue-200 ring-offset-1 border-blue-400'
                            : ''
                          }
                        `}
                        aria-label={`${completed ? 'Mark as incomplete' : 'Mark as complete'} for ${habit.name} on ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex]}`}
                      >
                        ✓
                      </button>
                    </td>
                  ))}

                  {/* Progress Bar */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-[120px]">
                        {/* Progress Bar */}
                        <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${completionRate}%` }}
                          ></div>
                          {/* Progress Text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-800 drop-shadow-sm">
                              {completionRate}%
                            </span>
                          </div>
                        </div>
                        {/* Streak Info */}
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {habit.days.filter(day => day).length}/7 days
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Completed habit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span>Not completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitTracker;