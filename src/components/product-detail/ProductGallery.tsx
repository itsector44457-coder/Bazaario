'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Share2, Play } from 'lucide-react';

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
}

interface ProductGalleryProps {
  discountText?: string;
  mediaItems?: GalleryMediaItem[];
  className?: string;
}

const DEFAULT_MEDIA: GalleryMediaItem[] = [
  {
    id: 'm-1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85',
    alt: 'Wireless ANC Headphones front view',
  },
  {
    id: 'm-2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=85',
    alt: 'Wireless ANC Headphones angle view',
  },
  {
    id: 'm-3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Wireless ANC Headphones folded side view',
  },
  {
    id: 'm-4',
    type: 'video',
    src: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1000&q=85',
    alt: 'Video overview demo',
  },
];

export default function ProductGallery({
  discountText = '22% OFF',
  mediaItems = DEFAULT_MEDIA,
  className = '',
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const activeMedia = mediaItems[activeIndex] || mediaItems[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className={`w-full space-y-4 select-none ${className}`}>
      {/* 1. Main Display Area */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-[#edf5f0] rounded-3xl overflow-hidden flex items-center justify-center p-6 border border-emerald-900/5 shadow-2xs">
        {/* Top-Left Discount Badge */}
        {discountText && (
          <span className="absolute top-4 left-4 bg-[#f59e0b] text-gray-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-xs z-10 tracking-wide">
            {discountText}
          </span>
        )}

        {/* Top-Right Action Floating Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs text-gray-600 hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Save to Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition ${
                isWishlisted
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-gray-500 stroke-[2.2]'
              }`}
            />
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-xs text-gray-600 hover:text-emerald-700 hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Share product"
          >
            <Share2 className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* Center Product Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={activeMedia.src}
            alt={activeMedia.alt}
            fill
            priority
            className="object-contain p-4 drop-shadow-md hover:scale-105 transition-transform duration-500 cursor-zoom-in"
          />
        </div>
      </div>

      {/* 2. Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-3">
        {mediaItems.map((item, index) => {
          const isSelected = activeIndex === index;

          if (item.type === 'video') {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveIndex(index);
                  setIsVideoModalOpen(true);
                }}
                className={`relative h-20 sm:h-24 rounded-2xl bg-[#111827] flex flex-col items-center justify-center text-white gap-1 shadow-2xs overflow-hidden transition cursor-pointer group border-2 ${
                  isSelected ? 'border-emerald-600' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                <span className="text-[11px] font-bold tracking-wide">Video</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-20 sm:h-24 rounded-2xl bg-[#edf5f0] p-1.5 overflow-hidden transition cursor-pointer border-2 ${
                isSelected
                  ? 'border-emerald-600 shadow-xs'
                  : 'border-transparent hover:border-gray-200 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Video Preview Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm">Product Video Demo</h3>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-900 font-semibold cursor-pointer"
              >
                Close ✕
              </button>
            </div>
            <div className="relative w-full h-64 bg-black rounded-2xl flex items-center justify-center text-white">
              <p className="text-xs text-gray-300">
                Playing: 360° Sound Demo & ANC Active Mode (Sharma Electronics)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

