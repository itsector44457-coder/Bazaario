'use client';

import React from 'react';
import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';

export default function ShopReviewsView() {
  const reviews = [
    {
      id: 'sr-1',
      author: 'Priya Mukherjee',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '2 days ago',
      verified: true,
      text: 'Delivered headphones within 30 minutes! The packaging was intact with official warranty seal. Best electronics store in Lokhandwala.',
    },
    {
      id: 'sr-2',
      author: 'Arjun Kapoor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      date: '1 week ago',
      verified: true,
      text: 'Bought Fit Pro smartwatch. The seller explained all features over chat before I placed the order. Highly recommended!',
    },
    {
      id: 'sr-3',
      author: 'Sameer Sheikh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 4,
      date: '2 weeks ago',
      verified: true,
      text: 'Fast pickup service. Reserved item online and collected in 15 minutes without any hassle.',
    },
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-2xs select-none">
      {/* Score Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl font-black text-gray-950">4.6</div>
          <div>
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 1,248 verified customer ratings</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('Opening review form for Sharma Electronics...')}
          className="self-start sm:self-auto px-4 py-2 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
        >
          Rate this store
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="border-b border-gray-50 pb-4 space-y-2 last:border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <Image
                    src={rev.avatar}
                    alt={rev.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#059669]">
                        <CheckCircle2 className="w-3 h-3 text-[#059669]" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400">{rev.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-normal">{rev.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

