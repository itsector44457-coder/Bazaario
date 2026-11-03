
'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'light' | 'dark';
  href?: string;
}

const sizes = {
  sm: {
    icon: 'w-10 h-10',
    text: 'text-xl',
    gap: 'gap-2',
  },
  md: {
    icon: 'w-14 h-14',
    text: 'text-3xl',
    gap: 'gap-2.5',
  },
  lg: {
    icon: 'w-20 h-20',
    text: 'text-5xl',
    gap: 'gap-3',
  },
};

export default function Logo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light',
  href = '/',
}: LogoProps) {
  const currentSize = sizes[size];

  const textColor =
    variant === 'dark' ? 'text-white' : 'text-[#08265C]';

  return (
    <Link
      href={href}
      aria-label="Bazaario home"
      className={`
        inline-flex items-center
        ${currentSize.gap}
        group select-none
        transition-transform duration-300
        hover:scale-[1.03]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-orange-500
        rounded-lg
        ${className}
      `}
    >
      {/* Bazaario Shopping Icon */}
      <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className={`${currentSize.icon} shrink-0`}
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="bazaario-blue"
            x1="20"
            y1="10"
            x2="100"
            y2="110"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#123D91" />
            <stop offset="1" stopColor="#061B49" />
          </linearGradient>

          <linearGradient
            id="bazaario-orange"
            x1="15"
            y1="40"
            x2="110"
            y2="85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFB000" />
            <stop offset="1" stopColor="#FF5A00" />
          </linearGradient>
        </defs>

        {/* Shopping bag handle */}
        <path
          d="M37 30V22C37 9 47 3 60 3S83 9 83 22V30"
          stroke="url(#bazaario-blue)"
          strokeWidth="7"
          strokeLinecap="round"
        />

        {/* Main shopping bag / B shape */}
        <path
          d="M28 28H92L101 103H19L28 28Z"
          fill="url(#bazaario-blue)"
        />

        {/* B-shaped negative space */}
        <path
          d="M38 39H69C82 39 86 55 72 61C91 65 91 85 71 85H38V39Z"
          fill="white"
        />

        <path
          d="M38 39H65C75 39 76 53 65 53H38V39Z"
          fill="url(#bazaario-blue)"
        />

        <path
          d="M38 66H69C80 66 80 81 69 81H38V66Z"
          fill="url(#bazaario-blue)"
        />

        {/* Orange motion swoosh */}
        <path
          d="M12 69C35 78 76 73 108 45C91 76 55 93 17 84"
          stroke="url(#bazaario-orange)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cart wheels */}
        <circle cx="39" cy="108" r="6" fill="#08265C" />
        <circle cx="81" cy="108" r="6" fill="#08265C" />
        <circle cx="39" cy="108" r="2.5" fill="white" />
        <circle cx="81" cy="108" r="2.5" fill="white" />

        {/* Speed lines */}
        <path
          d="M3 49H18M7 57H24"
          stroke="#FF7A00"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Name */}
      {showText && (
        <span
          className={`
            ${currentSize.text}
            ${textColor}
            font-black
            tracking-[-0.06em]
            leading-none
            whitespace-nowrap
          `}
        >
          B<span className="text-[#FF7300]">a</span>zaario
        </span>
      )}
    </Link>
  );
}
