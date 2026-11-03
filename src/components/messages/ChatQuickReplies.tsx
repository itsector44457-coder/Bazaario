'use client';

import React from 'react';

interface ChatQuickRepliesProps {
  replies?: string[];
  onSelectReply: (reply: string) => void;
  className?: string;
}

const DEFAULT_REPLIES = [
  'Thank you! 🙏',
  'How long will it take?',
  'Can I pick it up instead?',
];

export default function ChatQuickReplies({
  replies = DEFAULT_REPLIES,
  onSelectReply,
  className = '',
}: ChatQuickRepliesProps) {
  return (
    <div className={`flex items-center gap-2 overflow-x-auto select-none px-4 py-2 ${className}`}>
      {replies.map((reply, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectReply(reply)}
          className="bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200/90 text-gray-700 text-xs font-semibold px-3.5 py-1.5 rounded-full transition shadow-2xs whitespace-nowrap cursor-pointer"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}

