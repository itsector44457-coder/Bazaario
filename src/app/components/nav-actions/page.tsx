'use client';

import React, { useState } from 'react';
import NavActions from '@/components/navbar/NavActions';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function NavActionsPage() {
  const [cartCount, setCartCount] = useState(3);
  const [unreadMsg, setUnreadMsg] = useState(1);
  const [copied, setCopied] = useState(false);
  const [lastAction, setLastAction] = useState('');

  const usageCode = `import NavActions from '@/components/navbar/NavActions';

export default function MyPage() {
  return (
    <NavActions
      cartCount={${cartCount}}
      unreadMessagesCount={${unreadMsg}}
      userName="Rahul"
      onOpenCart={() => console.log('Open Cart')}
      onOpenOrders={() => console.log('Open Orders')}
      onOpenMessages={() => console.log('Open Messages')}
      onOpenSellerModal={() => console.log('Open Seller Modal')}
    />
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <span className="text-xs font-bold text-gray-900">NavActions Component</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          Modular Component
        </span>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Navigation Actions & Account Bar
          </h1>
          <p className="text-sm text-gray-500">
            Encapsulates the Chat badge (orange &apos;1&apos;), Orders package icon, Cart badge (green &apos;3&apos;), Rahul user profile menu, and &quot;Sell on Bazaario&quot; outlined button.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center space-y-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Live Preview (Interactive)
          </div>
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <NavActions
              cartCount={cartCount}
              unreadMessagesCount={unreadMsg}
              userName="Rahul"
              onOpenCart={() => setLastAction('Clicked Cart Icon')}
              onOpenOrders={() => setLastAction('Clicked Orders Icon')}
              onOpenMessages={() => setLastAction('Clicked Messages Icon')}
              onOpenSellerModal={() => setLastAction('Clicked Sell on Bazaario')}
            />
          </div>

          {lastAction && (
            <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-medium">
              Event Triggered: <strong>{lastAction}</strong>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-gray-900">Configurable Badges</h3>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Cart Count:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCartCount(Math.max(0, cartCount - 1))}
                  className="px-2.5 py-1 bg-gray-100 rounded-md font-bold text-xs"
                >
                  -
                </button>
                <span className="text-xs font-bold w-6 text-center">{cartCount}</span>
                <button
                  onClick={() => setCartCount(cartCount + 1)}
                  className="px-2.5 py-1 bg-gray-100 rounded-md font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-700">Unread Messages:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setUnreadMsg(Math.max(0, unreadMsg - 1))}
                  className="px-2.5 py-1 bg-gray-100 rounded-md font-bold text-xs"
                >
                  -
                </button>
                <span className="text-xs font-bold w-6 text-center">{unreadMsg}</span>
                <button
                  onClick={() => setUnreadMsg(unreadMsg + 1)}
                  className="px-2.5 py-1 bg-gray-100 rounded-md font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl p-5 text-zinc-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-zinc-300">
                  Integration Code
                </span>
              </div>
              <button
                type="button"
                onClick={copyCode}
                className="flex items-center gap-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-lg transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono bg-black/50 p-4 rounded-xl overflow-x-auto text-emerald-300/90 leading-relaxed">
              {usageCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
