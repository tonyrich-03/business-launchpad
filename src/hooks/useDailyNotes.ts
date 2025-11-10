import { useState, useEffect } from 'react';
import { loadDailyNote, saveDailyNote } from '../utils/dailyNoteStorage';

export interface DailyNote {
  date: string;
  content: string;
  tasks: Task[];
  mood: string;
  wordCount: number;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const useDailyNotes = (date: Date) => {
  const [dailyNote, setDailyNote] = useState<DailyNote>({
    date: date.toISOString().split('T')[0],
    content: '',
    tasks: [],
    mood: '',
    wordCount: 0
  });

  useEffect(() => {
    const loadNote = async () => {
      const savedNote = await loadDailyNote(date);
      if (savedNote) {
        setDailyNote(savedNote);
      } else {
        setDailyNote({
          date: date.toISOString().split('T')[0],
          content: '',
          tasks: [],
          mood: '',
          wordCount: 0
        });
      }
    };
    
    loadNote();
  }, [date]);

  const updateNote = (content: string) => {
    const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    setDailyNote(prev => ({
      ...prev,
      content,
      wordCount
    }));
  };

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setDailyNote(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask]
    }));
  };

  const toggleTask = (taskId: string) => {
    setDailyNote(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const updateMood = (mood: string) => {
    setDailyNote(prev => ({
      ...prev,
      mood
    }));
  };

  const saveNote = async () => {
    await saveDailyNote(date, dailyNote);
  };

  // Auto-save when note changes
  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (dailyNote.content || dailyNote.tasks.length > 0 || dailyNote.mood) {
        saveNote();
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [dailyNote]);

  return {
    dailyNote,
    updateNote,
    addTask,
    toggleTask,
    updateMood,
    saveNote
  };
};