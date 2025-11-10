import React from 'react';
import { useDailyNotes } from '../hooks/useDailyNotes';
import DailyNoteEditor from './DailyNoteEditor';
import DailyTasks from './DailyTasks';
import MoodSelector from './MoodSelector';

interface DailyNoteProps {
  date: Date;
}

const DailyNote: React.FC<DailyNoteProps> = ({ date }) => {
  const { 
    dailyNote, 
    updateNote, 
    addTask, 
    toggleTask, 
    updateMood,
    saveNote 
  } = useDailyNotes(date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h1>
              <p className="text-gray-600 mt-2">Your daily thoughts and tasks</p>
            </div>
            <MoodSelector 
              mood={dailyNote.mood} 
              onMoodChange={updateMood} 
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Note Editor */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Notes</h2>
            <DailyNoteEditor 
              content={dailyNote.content}
              onContentChange={updateNote}
              onSave={saveNote}
            />
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Tasks</h2>
            <DailyTasks 
              tasks={dailyNote.tasks}
              onAddTask={addTask}
              onToggleTask={toggleTask}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dailyNote.tasks.length}</div>
              <div className="text-gray-600 text-sm">Total Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dailyNote.tasks.filter(task => task.completed).length}
              </div>
              <div className="text-gray-600 text-sm">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {dailyNote.wordCount}
              </div>
              <div className="text-gray-600 text-sm">Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {dailyNote.mood || '😊'}
              </div>
              <div className="text-gray-600 text-sm">Mood</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyNote;