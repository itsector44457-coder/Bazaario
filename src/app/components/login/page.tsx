'use client';

import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';
import { ArrowLeft, Code2, Copy, Check, Sparkles } from 'lucide-react';

export default function LoginComponentPage() {
  const [copied, setCopied] = useState(false);
  const [lastLoggedInRole, setLastLoggedInRole] = useState('');

  const usageCode = `import LoginForm from '@/components/auth/LoginForm';

export default function MyPage() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg">
      <LoginForm
        onSuccess={(role) => console.log('Logged in successfully as:', role)}
      />
    </div>
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
          <span className="text-xs font-bold text-gray-900">LoginForm Component</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="text-xs font-bold text-[#059669] hover:underline"
          >
            Open Full /login Page →
          </Link>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            Auth Unit
          </span>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Login Form Component (Exact Match)
          </h1>
          <p className="text-sm text-gray-500">
            Features Shopper / Shop Owner / Admin role selection, +91 phone input, password with show/hide toggle, &quot;Keep me signed in&quot; checkbox, and Google social login.
          </p>
        </div>

        {/* Live Preview Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Live Preview (Interactive)
            </div>
            <LoginForm
              onSuccess={(role) =>
                setLastLoggedInRole(`Successfully logged in as ${role.toUpperCase()}`)
              }
            />

            {lastLoggedInRole && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-900">
                {lastLoggedInRole}
              </div>
            )}
          </div>

          {/* Integration Code */}
          <div className="md:col-span-6 bg-zinc-900 rounded-2xl p-5 text-zinc-100 flex flex-col justify-between shadow-xs">
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
