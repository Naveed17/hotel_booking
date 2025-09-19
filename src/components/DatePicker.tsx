import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  placeholder: string;
  value: string;
  onChange: (date: string) => void;
  className?: string;
}

export function DatePicker({ placeholder, value, onChange, className }: DatePickerProps) {
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
        className="relative cursor-pointer z-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none z-10" />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          readOnly
          className={`w-full pl-10 h-12 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:border-transparent cursor-pointer transition-all duration-300 hover:border-blue-300 ${className || 'border-gray-200 focus:ring-blue-500'}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 z-[99] min-w-[320px]">
          {/* Enhanced Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={goToPreviousMonth}
              className="w-10 h-10 hover:bg-blue-50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-lg">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>
            </div>
            <button
              onClick={goToNextMonth}
              className="w-10 h-10 hover:bg-blue-50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Enhanced Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-bold text-gray-600 py-3 bg-gray-50 rounded-lg">
                {day}
              </div>
            ))}
          </div>

          {/* Enhanced Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`
                  w-10 h-10 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-110
                  ${isCurrentMonth(date)
                    ? 'text-gray-900 hover:bg-blue-50 hover:text-blue-600'
                    : 'text-gray-300 hover:text-gray-400'
                  }
                  ${isToday(date)
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:from-blue-600 hover:to-cyan-600'
                    : ''
                  }
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
