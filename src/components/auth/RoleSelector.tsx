'use client';

import React from 'react';
import { ShoppingBag, Store, ShieldCheck } from 'lucide-react';

export type UserRole = 'shopper' | 'seller' | 'admin';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  className?: string;
}

export const ROLES: { id: UserRole; title: string; subtitle: string; icon: React.ElementType }[] = [
  {
    id: 'shopper',
    title: 'Shopper',
    subtitle: 'Buy & order',
    icon: ShoppingBag,
  },
  {
    id: 'seller',
    title: 'Shop Owner',
    subtitle: 'Sell products',
    icon: Store,
  },
  {
    id: 'admin',
    title: 'Admin',
    subtitle: 'Manage platform',
    icon: ShieldCheck,
  },
];

export default function RoleSelector({
  selectedRole,
  onSelectRole,
  className = '',
}: RoleSelectorProps) {
  return (
    <div className={`grid grid-cols-3 gap-2.5 sm:gap-3 select-none ${className}`}>
      {ROLES.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;

        return (
          <button
            key={role.id}
            type="button"
            onClick={() => onSelectRole(role.id)}
            className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
              isSelected
                ? 'border-[#059669] bg-[#ecfdf5] shadow-xs ring-1 ring-[#059669]/30'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
            }`}
          >
            {/* Top Icon */}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 transition ${
                isSelected ? 'text-[#059669]' : 'text-[#059669]/80'
              }`}
            >
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Title & Subtitle */}
            <div>
              <h4
                className={`text-xs sm:text-sm font-bold tracking-tight ${
                  isSelected ? 'text-gray-950 font-black' : 'text-gray-800'
                }`}
              >
                {role.title}
              </h4>
              <p className="text-[11px] text-gray-400 mt-0.5 font-normal">
                {role.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
