'use client';

import React, { useState } from 'react';
import { Paperclip, Image as ImageIcon, Send } from 'lucide-react';

interface ChatMessageInputProps {
  onSendMessage: (text: string) => void;
  onAttachFile?: () => void;
  onAttachImage?: () => void;
  className?: string;
}

export default function ChatMessageInput({
  onSendMessage,
  onAttachFile,
  onAttachImage,
  className = '',
}: ChatMessageInputProps) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2 select-none ${className}`}
    >
      {/* 1. Attachment actions */}
      <button
        type="button"
        onClick={onAttachFile || (() => alert('Upload document / attachment'))}
        title="Attach file"
        className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
      >
        <Paperclip className="w-4 h-4 stroke-[2]" />
      </button>

      <button
        type="button"
        onClick={onAttachImage || (() => alert('Upload photo'))}
        title="Upload photo"
        className="w-8 h-8 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
      >
        <ImageIcon className="w-4 h-4 stroke-[2]" />
      </button>

      {/* 2. Text input */}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 bg-[#f8faf9] border border-gray-200/80 rounded-xl px-4 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
      />

      {/* 3. Send button */}
      <button
        type="submit"
        disabled={!inputText.trim()}
        title="Send message"
        className="w-9 h-9 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-40 disabled:hover:bg-[#059669] text-white flex items-center justify-center transition shadow-xs cursor-pointer shrink-0"
      >
        <Send className="w-4 h-4 stroke-[2.2]" />
      </button>
    </form>
  );
}

