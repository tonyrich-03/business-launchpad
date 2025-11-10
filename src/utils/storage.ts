// utils/storage.ts
export const StorageUtils = {
  // Save data for a specific date
  saveDayData: (date: Date, content: string): void => {
    const key = `planner-${date.toISOString().split('T')[0]}`;
    if (content.trim()) {
      localStorage.setItem(key, content);
    } else {
      localStorage.removeItem(key);
    }
  },

  // Load data for a specific date
  loadDayData: (date: Date): string => {
    const key = `planner-${date.toISOString().split('T')[0]}`;
    return localStorage.getItem(key) || '';
  },

  // Load all data for a week
  loadWeekData: (weekStart: Date): { [key: string]: string } => {
    const weekData: { [key: string]: string } = {};
    const oneDay = 24 * 60 * 60 * 1000;
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart.getTime() + (i * oneDay));
      const key = `planner-${currentDate.toISOString().split('T')[0]}`;
      const savedData = localStorage.getItem(key);
      
      if (savedData) {
        weekData[key] = savedData;
      }
    }
    
    return weekData;
  },

  // Export all planner data
  exportData: (): string => {
    const allData: { [key: string]: string } = {};
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('planner-')) {
        allData[key] = localStorage.getItem(key) || '';
      }
    }
    
    return JSON.stringify(allData, null, 2);
  },

  // Import planner data
  importData: (jsonData: string): boolean => {
    try {
      const data = JSON.parse(jsonData);
      
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith('planner-') && typeof value === 'string') {
          localStorage.setItem(key, value);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
};