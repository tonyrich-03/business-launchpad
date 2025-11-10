import type { FC } from 'react';
import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="todo-list space-y-4">
      {/* Add new todo input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a task..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Todos list */}
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 border rounded-lg transition-all group ${
              todo.completed
                ? 'bg-gray-50 border-gray-200'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
            />
            <span
              className={`flex-1 text-sm ${
                todo.completed
                  ? 'text-gray-500 line-through'
                  : 'text-gray-900'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-1 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        
        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <p>No tasks yet. Add your to-do items!</p>
          </div>
        )}
      </div>

      {/* Footer with stats and actions */}
      {todos.length > 0 && (
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {todos.filter(t => t.completed).length} of {todos.length} completed
          </div>
          {todos.some(todo => todo.completed) && (
            <button
              onClick={clearCompleted}
              className="text-sm text-red-500 hover:text-red-700 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;