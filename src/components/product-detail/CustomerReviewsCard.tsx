'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  verified: boolean;
  rating: number;
  comment: string;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Priya M.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    verified: true,
    rating: 5,
    comment: 'Delivered in 35 minutes! Sound is amazing and the shop owner helped me pair it over chat.',
  },
  {
    id: 'rev-2',
    author: 'Arjun K.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: false,
    rating: 5,
    comment: 'Great ANC for the price. Picked it up from the store, very genuine product.',
  },
];

interface CustomerReviewsCardProps {
  averageRating?: number;
  totalRatingsCount?: number;
  reviews?: ReviewItem[];
  onWriteReview?: () => void;
  className?: string;
}

export default function CustomerReviewsCard({
  averageRating = 4.5,
  reviews = DEFAULT_REVIEWS,
  onWriteReview,
  className = '',
}: CustomerReviewsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your verified local review has been posted.');
    setIsModalOpen(false);
    setReviewText('');
  };

  return (
    <div
      className={`w-full bg-white rounded-3xl border border-gray-100 p-6 space-y-5 shadow-2xs select-none ${className}`}
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-950 text-base">Customer reviews</h3>
        <button
          type="button"
          onClick={() => {
            if (onWriteReview) onWriteReview();
            else setIsModalOpen(true);
          }}
          className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
        >
          Write a review
        </button>
      </div>

      {/* 2. Rating Score & Breakdown Bars */}
      <div className="flex items-center gap-6">
        {/* Score & Stars */}
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-gray-950">
            {averageRating}
          </div>
          <div className="flex items-center gap-0.5 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            ))}
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 space-y-1.5 text-xs text-gray-500">
          {/* 5 star */}
          <div className="flex items-center gap-2">
            <span className="w-3 text-right font-medium">5</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#059669] rounded-full w-[78%]" />
            </div>
          </div>
          {/* 4 star */}
          <div className="flex items-center gap-2">
            <span className="w-3 text-right font-medium">4</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#059669] rounded-full w-[45%]" />
            </div>
          </div>
          {/* 3 star */}
          <div className="flex items-center gap-2">
            <span className="w-3 text-right font-medium">3</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-300 rounded-full w-[15%]" />
            </div>
          </div>
          {/* 2 star */}
          <div className="flex items-center gap-2">
            <span className="w-3 text-right font-medium">2</span>
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full w-[6%]" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Review Items */}
      <div className="space-y-4 pt-2">
        {reviews.map((rev) => (
          <div key={rev.id} className="space-y-1.5 border-t border-gray-50 pt-3">
            {/* Author row */}
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={rev.avatar}
                  alt={rev.author}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-bold text-gray-900">{rev.author}</span>
              {rev.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#059669]">
                  <CheckCircle2 className="w-3 h-3 text-[#059669]" />
                  <span>Verified buyer</span>
                </span>
              )}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(rev.rating)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
              ))}
            </div>

            {/* Comment */}
            <p className="text-xs text-gray-600 leading-relaxed font-normal">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-sm">Write a Local Review</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-xs text-gray-400 hover:text-gray-900 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <textarea
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with delivery time, sound quality, and shop support..."
                className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                className="w-full bg-[#059669] hover:bg-[#047857] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

