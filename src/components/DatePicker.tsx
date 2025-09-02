import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  placeholder: string;
  value: string;
  onChange: (date: string) => void;
}

export function DatePicker({ placeholder, value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit', 
      year: 'numeric'
    });
  };

  const handleDateSelect = (date: Date) => {
    onChange(formatDate(date));
    setIsOpen(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative" ref={containerRef}>
      <div 
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        <input 
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly
          className="w-full pl-10 h-11 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50 min-w-[300px]">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-gray-900">
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button 
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`
                  w-8 h-8 text-sm rounded hover:bg-blue-50 transition-colors
                  ${isCurrentMonth(date) ? 'text-gray-900' : 'text-gray-400'}
                  ${isToday(date) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                `}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
