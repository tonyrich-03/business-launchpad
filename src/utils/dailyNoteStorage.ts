import type { DailyNote } from '../hooks/useDailyNotes';

const STORAGE_KEY = 'daily-notes';

export const loadDailyNote = async (date: Date): Promise<DailyNote | null> => {
  try {
    const dateKey = date.toISOString().split('T')[0];
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      return notes[dateKey] || null;
    }
  } catch (error) {
    console.error('Error loading daily note:', error);
  }
  
  return null;
};

export const saveDailyNote = async (date: Date, note: DailyNote): Promise<void> => {
  try {
    const dateKey = date.toISOString().split('T')[0];
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    const notes = savedNotes ? JSON.parse(savedNotes) : {};
    
    notes[dateKey] = {
      ...note,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving daily note:', error);
  }
};

export const getAllDailyNotes = async (): Promise<Record<string, DailyNote>> => {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    return savedNotes ? JSON.parse(savedNotes) : {};
  } catch (error) {
    console.error('Error loading all daily notes:', error);
    return {};
  }
};

export const deleteDailyNote = async (date: Date): Promise<void> => {
  try {
    const dateKey = date.toISOString().split('T')[0];
    const savedNotes = localStorage.getItem(STORAGE_KEY);
    
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      delete notes[dateKey];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  } catch (error) {
    console.error('Error deleting daily note:', error);
  }
};