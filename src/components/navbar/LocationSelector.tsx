'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check, Search, Crosshair } from 'lucide-react';

interface LocationSelectorProps {
  currentLocation?: string;
  onLocationChange?: (location: string) => void;
  className?: string;
}

const POPULAR_LOCATIONS = [
  { area: 'Andheri West', city: 'Mumbai', pincode: '400058' },
  { area: 'Bandra West', city: 'Mumbai', pincode: '400050' },
  { area: 'Powai', city: 'Mumbai', pincode: '400076' },
  { area: 'Juhu', city: 'Mumbai', pincode: '400049' },
  { area: 'Colaba', city: 'Mumbai', pincode: '400005' },
  { area: 'Koramangala', city: 'Bengaluru', pincode: '560034' },
  { area: 'Indiranagar', city: 'Bengaluru', pincode: '560038' },
  { area: 'Connaught Place', city: 'New Delhi', pincode: '110001' },
];

export default function LocationSelector({
  currentLocation = 'Andheri West, Mumbai',
  onLocationChange,
  className = '',
}: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (locString: string) => {
    setSelectedLocation(locString);
    if (onLocationChange) onLocationChange(locString);
    setIsOpen(false);
  };

  const filteredLocations = POPULAR_LOCATIONS.filter(
    (loc) =>
      loc.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.pincode.includes(searchQuery)
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-left py-1.5 px-2 rounded-lg hover:bg-gray-100/80 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        aria-expanded={isOpen}
      >
        <MapPin className="w-5 h-5 text-[#059669] shrink-0" />
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-normal text-gray-500">Deliver to</span>
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-semibold text-gray-900 max-w-[155px] truncate">
              {selectedLocation}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-emerald-600' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* Popover / Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900">Choose delivery location</h4>
            <span className="text-[11px] text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-full">
              Live Express
            </span>
          </div>

          {/* Search Input */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area or pincode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-emerald-600 focus:bg-white transition"
              autoFocus
            />
          </div>

          {/* Detect current GPS location button */}
          <button
            type="button"
            onClick={() => handleSelect('Andheri West, Mumbai')}
            className="w-full flex items-center gap-2.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 p-2.5 rounded-xl mb-3 transition"
          >
            <Crosshair className="w-4 h-4 text-emerald-600" />
            <span>Use current location (GPS)</span>
          </button>

          {/* Locations List */}
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 px-1">
            Nearby Areas
          </div>
          <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredLocations.map((loc) => {
              const fullLoc = `${loc.area}, ${loc.city}`;
              const isSelected = selectedLocation === fullLoc;

              return (
                <button
                  key={`${loc.area}-${loc.pincode}`}
                  type="button"
                  onClick={() => handleSelect(fullLoc)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition ${
                    isSelected
                      ? 'bg-emerald-50 text-emerald-900 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{loc.area}</span>
                    <span className="text-[10px] text-gray-400">
                      {loc.city} - {loc.pincode}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
            {filteredLocations.length === 0 && (
              <p className="text-xs text-gray-400 text-center py-4">No matching locations found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
