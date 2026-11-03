'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  Zap,
  ShoppingBasket,
  Shirt,
  Smartphone,
  Home,
  HeartPulse,
  Footprints,
  BookOpen,
  Sparkles,
  ChevronRight,
  Store,
} from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  href?: string;
  icon?: React.ElementType;
  badge?: string;
  subcategories?: string[];
}

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'grocery',
    name: 'Grocery',
    icon: ShoppingBasket,
    subcategories: ['Fresh Fruits & Veggies', 'Dairy & Eggs', 'Atta, Rice & Dals', 'Snacks & Munchies', 'Spices & Oils'],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: Shirt,
    subcategories: ["Men's Wear", "Women's Ethnic", 'Streetwear & Denim', 'Winterwear', 'Handcrafted Silk'],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: Smartphone,
    subcategories: ['Smartphones & Accessories', 'Headphones & Audio', 'Smartwatches', 'Laptops & Chargers', 'Home Appliances'],
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    icon: Home,
    subcategories: ['Cookware & Serveware', 'Storage & Containers', 'Decor & Lighting', 'Bedsheets & Curtains'],
  },
  {
    id: 'pharmacy-beauty',
    name: 'Pharmacy & Beauty',
    icon: HeartPulse,
    subcategories: ['Ayurvedic & Wellness', 'Skin Care & Sunscreen', 'Hair Care', 'First Aid & Essentials'],
  },
  {
    id: 'footwear',
    name: 'Footwear',
    icon: Footprints,
    subcategories: ['Sneakers & Casuals', 'Formal Leather Shoes', 'Sandals & Slides', 'Traditional Mojris'],
  },
  {
    id: 'stationery',
    name: 'Stationery',
    icon: BookOpen,
    subcategories: ['Notebooks & Journals', 'Art & Craft Supplies', 'Premium Pens', 'Desk Organizers'],
  },
];

interface CategoryNavProps {
  categories?: CategoryItem[];
  selectedCategory?: string;
  onSelectCategory?: (categoryId: string) => void;
  deliveryPromoText?: string;
  className?: string;
}

export default function CategoryNav({
  categories = DEFAULT_CATEGORIES,
  selectedCategory,
  onSelectCategory,
  deliveryPromoText = 'Same-day delivery from 1,200+ local shops',
  className = '',
}: CategoryNavProps) {
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);
  const [activeHoveredCat, setActiveHoveredCat] = useState<CategoryItem | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAllCategoriesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (id: string) => {
    if (onSelectCategory) {
      onSelectCategory(id);
    }
    setIsAllCategoriesOpen(false);
  };

  return (
    <nav
      aria-label="Category Navigation"
      className={`w-full bg-white/95 backdrop-blur-md border-b border-gray-200/80 relative z-40 select-none shadow-2xs ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 text-xs sm:text-sm">
          {/* Left Side: All Categories dropdown trigger + horizontal category links */}
          <div className="flex items-center space-x-1 sm:space-x-3 md:space-x-4 overflow-x-auto no-scrollbar py-1">
            {/* 1. All Categories Button with Hamburger */}
            <div className="relative shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
                className={`flex items-center gap-2 py-1.5 px-3 rounded-xl font-bold text-[#064e3b] hover:bg-emerald-50 transition cursor-pointer ${
                  isAllCategoriesOpen ? 'bg-emerald-50 text-[#046c4e] ring-1 ring-emerald-200' : ''
                }`}
                aria-expanded={isAllCategoriesOpen}
              >
                <Menu className="w-4 h-4 text-[#064e3b] stroke-[2.5]" />
                <span className="whitespace-nowrap tracking-tight">All Categories</span>
              </button>

              {/* Flyout Mega Menu for All Categories */}
              {isAllCategoriesOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-xs sm:text-sm">
                      Explore All Departments
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                      Bazaario Direct
                    </span>
                  </div>

                  <div className="py-2 space-y-1">
                    {categories.map((cat) => {
                      const Icon = cat.icon || Sparkles;
                      const isSelected = selectedCategory === cat.id;

                      return (
                        <div key={cat.id} className="group relative">
                          <button
                            type="button"
                            onClick={() => handleCategoryClick(cat.id)}
                            onMouseEnter={() => setActiveHoveredCat(cat)}
                            className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition ${
                              isSelected
                                ? 'bg-emerald-50 text-emerald-900 font-bold'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-800'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-emerald-100/70 flex items-center justify-center transition">
                                <Icon className="w-4 h-4 text-[#084c37]" />
                              </div>
                              <span className="font-semibold text-gray-800">{cat.name}</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-gray-100 bg-gray-50/70 p-2.5 rounded-xl mt-1 flex items-center gap-2 text-[11px] text-gray-600">
                    <Store className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Shopping from verified neighborhood vendors in your area.</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Exact Category Links from Screenshot with Premium Pills */}
            <div className="flex items-center space-x-1 sm:space-x-2 text-slate-600 font-semibold text-xs sm:text-[13px] shrink-0">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#064e3b] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side: Exact Amber / Orange Same-Day Delivery Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-amber-700 font-bold text-xs shrink-0 pl-4 bg-amber-50/80 border border-amber-200/60 px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500 shrink-0 animate-pulse" />
            <span className="text-amber-800 tracking-tight">{deliveryPromoText}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
