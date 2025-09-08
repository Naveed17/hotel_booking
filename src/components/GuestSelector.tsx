import { useState, useRef, useEffect } from 'react';
import { Users, ChevronDown, Plus, Minus } from 'lucide-react';

interface GuestSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function GuestSelector({ value, onChange }: GuestSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const totalAdults = adults;
    const adultText = totalAdults === 1 ? 'Adult' : 'Adults';
    const totalChildren = children;
    const childText = totalChildren === 1 ? 'Child' : 'Children';
    const roomText = rooms === 1 ? 'Room' : 'Rooms';
    onChange(`${totalAdults} ${adultText}, ${totalChildren} ${childText}, ${rooms} ${roomText}`);
  }, [adults, children, rooms, onChange]);

  const incrementAdults = () => setAdults(prev => Math.min(prev + 1, 10));
  const decrementAdults = () => setAdults(prev => Math.max(prev - 1, 1));

  const incrementChildren = () => setChildren(prev => Math.min(prev + 1, 10));
  const decrementChildren = () => setChildren(prev => Math.max(prev - 1, 0));

  const incrementRooms = () => setRooms(prev => Math.min(prev + 1, 5));
  const decrementRooms = () => setRooms(prev => Math.max(prev - 1, 1));

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          value={value}
          readOnly
          className="w-full pl-10 pr-10 h-11 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-50 min-w-[280px]">
          {/* Adults */}
          <div className="flex items-center justify-between py-3">
            <div>
              <div className="font-medium text-gray-900">Adults</div>
              <div className="text-sm text-gray-500">Ages 13+</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementAdults}
                disabled={adults <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{adults}</span>
              <button
                onClick={incrementAdults}
                disabled={adults >= 10}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div>
              <div className="font-medium text-gray-900">Children</div>
              <div className="text-sm text-gray-500">Ages 2-12</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementChildren}
                disabled={children <= 0}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{children}</span>
              <button
                onClick={incrementChildren}
                disabled={children >= 10}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div>
              <div className="font-medium text-gray-900">Rooms</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementRooms}
                disabled={rooms <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{rooms}</span>
              <button
                onClick={incrementRooms}
                disabled={rooms >= 5}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Done Button */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
