import React from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';
import type { MonthGridProps } from '../components/types/calendar';

const MonthGrid: React.FC<MonthGridProps> = ({ date, renderDay }) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = monthStart.getDay();
  const emptyCells = Array(startDay).fill(null);
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const isToday = (day: Date) => format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const isCurrentMonth = (day: Date) => day.getMonth() === date.getMonth();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Weekdays Header with subtle background */}
      <div className="grid grid-cols-7 bg-gray-50/50 border-b border-gray-100">
        {weekdays.map(day => (
          <div 
            key={day} 
            className="text-center py-4 text-xs font-bold text-gray-500 uppercase tracking-widest"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 p-2">
        {emptyCells.map((_, index) => (
          <div 
            key={`empty-${index}`} 
            className="aspect-square p-1"
          />
        ))}
        
        {daysInMonth.map(day => (
          renderDay ? (
            renderDay(day)
          ) : (
            <div 
              key={day.toString()} 
              className={`
                aspect-square p-1
              `}
            >
              <div className={`
                w-full h-full rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center
                ${isToday(day)
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-500 shadow-lg transform scale-105'
                  : isCurrentMonth(day)
                  ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50'
                  : 'bg-gray-50 border-gray-100 text-gray-400'
                }
              `}>
                <span className={`
                  text-sm font-semibold
                  ${isToday(day) ? 'text-white' : ''}
                `}>
                  {format(day, 'd')}
                </span>
                {/* Event indicator dots */}
                {isCurrentMonth(day) && !isToday(day) && Math.random() > 0.7 && (
                  <div className="flex space-x-1 mt-1">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default MonthGrid;