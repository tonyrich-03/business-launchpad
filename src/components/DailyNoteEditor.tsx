import React, { useState, useCallback } from 'react';

interface DailyNoteEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  onSave: () => void;
}

const DailyNoteEditor: React.FC<DailyNoteEditorProps> = ({
  content,
  onContentChange,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  }, [onContentChange]);

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">Journal Entry</h3>
        <div className="text-sm text-gray-500">
          {wordCount} words
        </div>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        onFocus={() => setIsEditing(true)}
        placeholder="Write your thoughts, ideas, and reflections for today..."
        className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />

      {isEditing && (
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Save Note
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        {[
          "What am I grateful for today?",
          "What did I learn today?",
          "What could I improve tomorrow?",
          "Today's highlight was..."
        ].map((prompt) => (
          <button
            key={prompt}
            onClick={() => onContentChange(content + prompt + " ")}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors duration-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DailyNoteEditor;