'use client';

import React from 'react';
import CategoryIconCard, { CategoryIconItem } from './CategoryIconCard';
import {
  Carrot,
  Shirt,
  Smartphone,
  Armchair,
  Pill,
  Footprints,
  UtensilsCrossed,
  LayoutGrid,
} from 'lucide-react';

export const CATEGORY_ICON_ITEMS: CategoryIconItem[] = [
  {
    id: 'grocery',
    name: 'Grocery',
    icon: Carrot,
    bgColor: 'bg-[#d1fae5]',
    iconColor: 'text-[#059669]',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    bgColor: 'bg-[#fce7f3]',
    iconColor: 'text-[#db2777]',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    bgColor: 'bg-[#e0f2fe]',
    iconColor: 'text-[#0284c7]',
  },
  {
    id: 'home',
    name: 'Home',
    icon: Armchair,
    bgColor: 'bg-[#fef3c7]',
    iconColor: 'text-[#d97706]',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: Pill,
    bgColor: 'bg-[#ffe4e6]',
    iconColor: 'text-[#e11d48]',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: Footprints,
    bgColor: 'bg-[#ede9fe]',
    iconColor: 'text-[#7c3aed]',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: UtensilsCrossed,
    bgColor: 'bg-[#ffedd5]',
    iconColor: 'text-[#ea580c]',
  },
  {
    id: 'more',
    name: 'More',
    icon: LayoutGrid,
    bgColor: 'bg-[#f3f4f6]',
    iconColor: 'text-[#4b5563]',
  },
];

interface CategoryIconBarProps {
  items?: CategoryIconItem[];
  activeCategoryId?: string;
  onSelectCategory?: (categoryId: string) => void;
  className?: string;
}

export default function CategoryIconBar({
  items = CATEGORY_ICON_ITEMS,
  activeCategoryId = 'grocery',
  onSelectCategory,
  className = '',
}: CategoryIconBarProps) {
  return (
    <div className={`w-full select-none ${className}`}>
      {/* Responsive Grid matching the exact screenshot: 8 items horizontal */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-2.5 sm:gap-3.5">
        {items.map((item) => (
          <CategoryIconCard
            key={item.id}
            item={item}
            isActive={activeCategoryId === item.id}
            onClick={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}

export { default as CategoryIconCard } from './CategoryIconCard';
