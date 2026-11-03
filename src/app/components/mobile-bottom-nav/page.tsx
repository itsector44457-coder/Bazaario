'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles, Smartphone, Monitor } from 'lucide-react';
import MobileBottomNav from '@/components/navbar/MobileBottomNav';

export default function MobileBottomNavDemoPage() {
  const [copied, setCopied] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(2);
  const [previewMode, setPreviewMode] = useState<'mobile' | 'wide'>('mobile');

  const usageCode = `import MobileBottomNav from '@/components/navbar/MobileBottomNav';

// Inside your root layout (layout.tsx) or App Shell:
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pb-16 md:pb-0">
        {children}
        <MobileBottomNav cartCount={3} unreadMessagesCount={2} />
      </body>
    </html>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">MobileBottomNav Component</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs font-semibold text-[#084c37] bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition"
          >
            Open Live Home →
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Responsive Navigation
          </span>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mobile Bottom Navigation Bar</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            iOS & Android style fixed 5-tab bottom navigation with route-active indicators, numeric badge counters for cart & unread messages, backdrop blur, and safe area insets.
          </p>
        </div>

        {/* Interactive Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span>Cart items badge:</span>
              <div className="flex items-center gap-1">
                {[0, 1, 3, 5].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setCartCount(cnt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      cartCount === cnt
                        ? 'bg-[#059669] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <span>Unread chat badge:</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 4].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setUnreadMessages(cnt)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                      unreadMessages === cnt
                        ? 'bg-[#f59e0b] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                previewMode === 'mobile'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile Mockup</span>
            </button>
            <button
              onClick={() => setPreviewMode('wide')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition ${
                previewMode === 'wide'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Full Width View</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-3xl border border-gray-200 p-6 flex items-center justify-center min-h-[480px]">
          {previewMode === 'mobile' ? (
            /* Smartphone Frame */
            <div className="w-[375px] h-[580px] bg-white rounded-[44px] shadow-2xl border-[10px] border-gray-900 overflow-hidden flex flex-col relative">
              {/* Phone Speaker & Dynamic Island */}
              <div className="h-7 bg-white flex items-center justify-center shrink-0">
                <div className="w-20 h-4 bg-gray-900 rounded-full" />
              </div>

              {/* Fake App Screen Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8faf9]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hyperlocal</p>
                    <h2 className="text-base font-extrabold text-gray-900">Bazaario Mobile</h2>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center">
                    RV
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs space-y-1.5">
                  <span className="text-[10px] font-bold text-[#059669] bg-emerald-50 px-2 py-0.5 rounded-md">
                    LIVE PREVIEW
                  </span>
                  <h3 className="text-sm font-bold text-gray-900">Mobile Navigation Active</h3>
                  <p className="text-xs text-gray-500">
                    Observe the 5 tabs pinned to the bottom: Home, Search, Orders, Chat (orange badge), and Cart (green badge).
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="h-16 bg-white rounded-2xl border border-gray-100 shadow-xs p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] font-bold text-xs flex items-center justify-center">
                      SE
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Sharma Electronics</p>
                      <p className="text-[11px] text-gray-500">Delivers in 45 min · 1.2 km</p>
                    </div>
                  </div>

                  <div className="h-16 bg-white rounded-2xl border border-gray-100 shadow-xs p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-700 font-bold text-xs flex items-center justify-center">
                      LB
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Libas Boutique</p>
                      <p className="text-[11px] text-gray-500">Delivers in 40 min · 2.1 km</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rendered MobileBottomNav inside phone container (override fixed to absolute for mockup) */}
              <div className="shrink-0 relative border-t border-gray-100 bg-white">
                <MobileBottomNav
                  cartCount={cartCount}
                  unreadMessagesCount={unreadMessages}
                  className="!relative !inset-x-auto !bottom-auto !block"
                />
              </div>
            </div>
          ) : (
            /* Full Width Container */
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  FULL-WIDTH PREVIEW
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">Standalone Bar Preview</h3>
                <p className="text-xs text-gray-500">
                  Fixed at the bottom of viewport on screens below 768px (`md:hidden`).
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-xs bg-white">
                <MobileBottomNav
                  cartCount={cartCount}
                  unreadMessagesCount={unreadMessages}
                  className="!relative !inset-x-auto !bottom-auto !block"
                />
              </div>
            </div>
          )}
        </div>

        {/* Code Snippet */}
        <div className="bg-gray-900 rounded-2xl p-5 text-gray-100 text-xs font-mono relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 border-b border-gray-800 pb-2">
            <div className="flex items-center gap-2 text-gray-400">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Usage Code</span>
            </div>
            <button
              onClick={copyCode}
              type="button"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto text-gray-300">
            <code>{usageCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

