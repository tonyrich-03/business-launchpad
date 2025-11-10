import { useState } from 'react';
import DatePicker from './DatePicker';
import PriorityList from './PriorityList';
import TodoList from './TodoList';
import Textarea from './ui/textarea';
import WeekNavigation from './WeekNavigation';
import DailyNote from './DailyNote';

// Define types for your state
interface Priority {
  id: string;
  text: string;
  completed: boolean;
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const DailyPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [priorities, setPriorities] = useState<Priority[]>([
    { id: '1', text: 'Complete project proposal', completed: false },
    { id: '2', text: 'Team meeting preparation', completed: false },
    { id: '3', text: 'Client follow-up call', completed: false }
  ]);
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Reply to emails', completed: false },
    { id: '2', text: 'Update project documentation', completed: false },
    { id: '3', text: 'Schedule next week meetings', completed: true }
  ]);
  const [notes, setNotes] = useState<string>('Meeting notes:\n• Discussed Q2 goals\n• Need to follow up on budget approval\n• Team building event next Friday');

  // Calculate daily progress
  const totalTasks = priorities.length + todos.length;
  const completedTasks = [
    ...priorities.filter(p => p.completed),
    ...todos.filter(t => t.completed)
  ].length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getDayEmoji = () => {
    const day = date.getDay();
    const emojis = ['🚀', '💪', '🔥', '🌟', '🌈', '🎯', '✨'];
    return emojis[day];
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Small daily improvements are the key to staggering long-term results.",
      "Your focus determines your reality.",
      "Productivity is never an accident. It is always the result of a commitment to excellence.",
      "The secret of getting ahead is getting started.",
      "Don't count the days, make the days count."
    ];
    return quotes[date.getDate() % quotes.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
            <span className="text-2xl">{getDayEmoji()}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Daily Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your day, track your progress, and achieve your goals
          </p>
        </div>

        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
              <WeekNavigation 
                weekStart={selectedDate} 
                setWeekStart={setSelectedDate} 
              />
            </div>
          </div>

          {/* Daily Note */}
          <DailyNote date={selectedDate} />
        </div>

        {/* Progress Overview */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <p className="text-gray-600 text-sm">
                {getMotivationalQuote()}
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {progressPercentage}%
              </div>
              <div className="text-sm text-gray-500">
                Daily Progress
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Date & Priorities */}
          <div className="xl:col-span-1 space-y-8">
            {/* Date Picker Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select Date
              </h3>
              <DatePicker date={date} setDate={setDate} />
            </div>

            {/* Priorities Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Top Priorities
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {priorities.filter(p => p.completed).length} of {priorities.length} completed
                </p>
              </div>
              <div className="p-6">
                <PriorityList 
                  priorities={priorities}
                  setPriorities={setPriorities}
                />
              </div>
            </div>
          </div>

          {/* Middle Column - To-Do List */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  To-Do List
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {todos.filter(t => t.completed).length} of {todos.length} completed
                </p>
              </div>
              <div className="p-6">
                <TodoList 
                  todos={todos}
                  setTodos={setTodos}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Notes */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Daily Notes
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Thoughts, ideas, and reflections
                </p>
              </div>
              <div className="p-6 h-full">
                <Textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Today's notes, ideas, meeting notes, or reflections..."
                  rows={12}
                  resize="vertical"
                  className="h-full min-h-[300px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {priorities.length}
            </div>
            <div className="text-sm text-gray-600">Priorities</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {todos.length}
            </div>
            <div className="text-sm text-gray-600">To-Do Items</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {completedTasks}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-200">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {notes.length}
            </div>
            <div className="text-sm text-gray-600">Note Characters</div>
          </div>
        </div>

        {/* Daily Tip */}
        <div className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Daily Productivity Tip</h3>
              <p className="text-purple-100">
                Focus on completing your top 3 priorities first. Studies show that tackling your most important tasks early in the day increases overall productivity by 40%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;