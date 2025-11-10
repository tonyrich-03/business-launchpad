import React, { useState } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface DailyTasksProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (taskId: string) => void;
}

const DailyTasks: React.FC<DailyTasksProps> = ({
  tasks,
  onAddTask,
  onToggleTask
}) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask('');
    }
  };

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="space-y-4">
      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium"
        >
          Add
        </button>
      </form>

      {/* Pending Tasks */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">To Do ({pendingTasks.length})</h4>
        {pendingTasks.map(task => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="flex-1 text-gray-800">{task.text}</span>
          </div>
        ))}
        {pendingTasks.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-4">No pending tasks. Great job! 🎉</p>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Completed ({completedTasks.length})</h4>
          {completedTasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg opacity-75"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="w-5 h-5 text-green-500 rounded focus:ring-green-500"
              />
              <span className="flex-1 text-gray-600 line-through">{task.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DailyTasks;