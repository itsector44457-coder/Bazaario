'use client';

import React from 'react';
import Image from 'next/image';
import { Crown } from 'lucide-react';

interface UserProfileCardProps {
  name?: string;
  phone?: string;
  avatarUrl?: string;
  tier?: string;
  className?: string;
}

export default function UserProfileCard({
  name = 'Rahul Verma',
  phone = '+91 98201 44518',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  tier = 'Bazaario Gold',
  className = '',
}: UserProfileCardProps) {
  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-6 text-center shadow-2xs select-none ${className}`}
    >
      {/* Avatar with colorful ring */}
      <div className="relative w-18 h-18 mx-auto mb-3">
        <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-emerald-500 via-teal-400 to-amber-400 p-0.5">
          <div className="w-full h-full rounded-full bg-white overflow-hidden relative">
            <Image
              src={avatarUrl}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Name & Phone */}
      <h3 className="text-sm font-extrabold text-gray-950 tracking-tight">{name}</h3>
      <p className="text-xs text-gray-400 mt-0.5 font-medium">{phone}</p>

      {/* Membership Tier Badge */}
      <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200/60 text-amber-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
        <Crown className="w-3 h-3 text-amber-600 fill-current" />
        <span>{tier}</span>
      </div>
    </div>
  );
}

