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
  }, [adults, children, rooms]);

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
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 w-5 h-5 pointer-events-none z-10" />
        <input
          type="text"
          value={value}
          readOnly
          className="w-full pl-10 pr-10 h-12 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer transition-all duration-300 hover:border-purple-300"
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 min-w-[320px]">
          {/* Enhanced Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              CUSTOMIZE YOUR STAY
            </div>
            <h3 className="text-lg font-bold text-gray-900">Select Guests & Rooms</h3>
          </div>

          {/* Enhanced Adults */}
          <div className="flex items-center justify-between py-4 px-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl mb-4">
            <div>
              <div className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Adults
              </div>
              <div className="text-sm text-blue-600 font-medium">Ages 13+</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementAdults}
                disabled={adults <= 1}
                className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Minus className="w-4 h-4 text-blue-600" />
              </button>
              <span className="w-8 text-center font-bold text-lg text-gray-900">{adults}</span>
              <button
                onClick={incrementAdults}
                disabled={adults >= 10}
                className="w-10 h-10 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Plus className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Enhanced Children */}
          <div className="flex items-center justify-between py-4 px-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl mb-4">
            <div>
              <div className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Children
              </div>
              <div className="text-sm text-emerald-600 font-medium">Ages 2-12</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementChildren}
                disabled={children <= 0}
                className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Minus className="w-4 h-4 text-emerald-600" />
              </button>
              <span className="w-8 text-center font-bold text-lg text-gray-900">{children}</span>
              <button
                onClick={incrementChildren}
                disabled={children >= 10}
                className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Plus className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Enhanced Rooms */}
          <div className="flex items-center justify-between py-4 px-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl mb-6">
            <div>
              <div className="font-bold text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Rooms
              </div>
              <div className="text-sm text-purple-600 font-medium">Accommodation units</div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={decrementRooms}
                disabled={rooms <= 1}
                className="w-10 h-10 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Minus className="w-4 h-4 text-purple-600" />
              </button>
              <span className="w-8 text-center font-bold text-lg text-gray-900">{rooms}</span>
              <button
                onClick={incrementRooms}
                disabled={rooms >= 5}
                className="w-10 h-10 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
              >
                <Plus className="w-4 h-4 text-purple-600" />
              </button>
            </div>
          </div>

          {/* Enhanced Done Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ✨ Confirm Selection
          </button>
        </div>
      )}
    </div>
  );
}
