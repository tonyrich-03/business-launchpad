import React, { useState } from 'react';
import MonthNavigation from './MonthNavigation';
import MonthGrid from '../components/MonthGrid';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (day: Date) => {
    setSelectedDate(day);
    console.log('Selected date:', day.toDateString());
  };

  const renderCustomDay = (day: Date) => {
    const isToday = day.toDateString() === new Date().toDateString();
    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    
    // Sample events data - you can replace this with real data
    const hasEvent = Math.random() > 0.7; // Random events for demo
    const eventType = hasEvent ? (Math.random() > 0.5 ? 'meeting' : 'task') : null;

    return (
      <div 
        className={`
          relative w-full h-24 p-2 border border-gray-100 rounded-lg
          transition-all duration-200 cursor-pointer
          hover:shadow-md hover:border-blue-200 hover:bg-blue-50
          ${isToday ? 'bg-blue-50 border-blue-200 shadow-sm' : ''}
          ${isSelected ? 'bg-blue-100 border-blue-300 shadow-md ring-2 ring-blue-200' : ''}
          ${isWeekend ? 'bg-gray-50' : 'bg-white'}
          group
        `}
        onClick={() => handleDateClick(day)}
      >
        {/* Date Number */}
        <div className={`
          flex items-center justify-between mb-1
          ${isToday ? 'font-bold' : 'font-medium'}
          ${isSelected ? 'text-blue-700' : isToday ? 'text-blue-600' : 'text-gray-900'}
        `}>
          <span className="text-sm">{day.getDate()}</span>
          
          {/* Today Badge */}
          {isToday && (
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          )}
        </div>

        {/* Events Indicator */}
        {hasEvent && (
          <div className="space-y-1">
            <div className={`
              text-xs p-1 rounded text-left truncate
              ${eventType === 'meeting' 
                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
              }
            `}>
              {eventType === 'meeting' ? 'Meeting' : 'Task'}
            </div>
          </div>
        )}

        {/* Add Event Button (shown on hover) */}
        <button 
          className={`
            absolute bottom-1 right-1 w-5 h-5 rounded-full
            bg-gray-100 text-gray-400 hover:bg-blue-500 hover:text-white
            flex items-center justify-center opacity-0 group-hover:opacity-100
            transition-all duration-200 text-xs
          `}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Add event to:', day.toDateString());
          }}
          title="Add event"
        >
          +
        </button>

        {/* Current day indicator dot */}
        {isToday && !hasEvent && (
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        )}
      </div>
    );
  };

  // Quick navigation functions
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay organized and manage your schedule with our interactive calendar
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Meetings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Tasks</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousMonth}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Previous
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors font-medium"
              >
                Today
              </button>
              <button
                onClick={goToNextMonth}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Selected Date Info */}
        {selectedDate && (
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Selected Date</h3>
                <p className="text-blue-700">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Calendar Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Month Navigation */}
          <div className="border-b border-gray-200 bg-gray-50/50 p-6">
            <MonthNavigation 
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
          </div>
          
          {/* Month Grid */}
          <div className="p-6">
            <MonthGrid date={currentDate} renderDay={renderCustomDay} />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {currentDate.toLocaleDateString('en-US', { month: 'long' })}
            </div>
            <div className="text-sm text-gray-600">Current Month</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()}
            </div>
            <div className="text-sm text-gray-600">Days in Month</div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-200">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {selectedDate ? '1' : '0'}
            </div>
            <div className="text-sm text-gray-600">Selected Date</div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Quick Tips
          </h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Click on any date to select it</li>
            <li>• Hover over a date and click "+" to add an event</li>
            <li>• Use the navigation buttons or the Today button to quickly navigate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;