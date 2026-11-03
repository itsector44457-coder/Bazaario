'use client';

import React from 'react';

export interface CategoryIconItem {
  id: string;
  name: string;
  icon: React.ElementType;
  bgColor: string;
  iconColor: string;
}

interface CategoryIconCardProps {
  item: CategoryIconItem;
  isActive?: boolean;
  onClick?: (id: string) => void;
  className?: string;
}

export default function CategoryIconCard({
  item,
  isActive = false,
  onClick,
  className = '',
}: CategoryIconCardProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onClick && onClick(item.id)}
      className={`group flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white border transition-all duration-200 cursor-pointer select-none shadow-2xs ${
        isActive
          ? 'border-[#10b981] ring-3 ring-[#10b981]/15 shadow-sm bg-emerald-50/20'
          : 'border-gray-200/70 hover:border-emerald-400/50 hover:shadow-md hover:-translate-y-1'
      } ${className}`}
    >
      {/* Pastel Rounded Square Icon Box */}
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-108 shadow-2xs ${item.bgColor}`}
      >
        <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${item.iconColor} stroke-[2.2]`} />
      </div>

      {/* Category Label */}
      <span
        className={`text-xs sm:text-[13px] font-bold tracking-tight transition-colors ${
          isActive ? 'text-[#064e3b]' : 'text-slate-800 group-hover:text-slate-950'
        }`}
      >
        {item.name}
      </span>
    </button>
  );
}
