'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RoleSelector, { UserRole } from './RoleSelector';
import { Eye, EyeOff, Smartphone, ArrowRight } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (role: UserRole) => void;
  className?: string;
  initialRole?: UserRole;
}

export default function LoginForm({ onSuccess, className = '', initialRole = 'shopper' }: LoginFormProps) {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [identifier, setIdentifier] = useState('98201 44518');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOtpMode, setIsOtpMode] = useState(false);
  const router = useRouter();

  const roleLabels: Record<UserRole, string> = {
    shopper: 'Shopper',
    seller: 'Shop Owner',
    admin: 'Admin',
  };

  const roleRedirects: Record<UserRole, string> = {
    shopper: '/',
    seller: '/seller-products',
    admin: '/admin/dashboard',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(role);
      } else {
        router.push(roleRedirects[role]);
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    router.push(roleRedirects[role]);
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          Welcome back 👋
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Choose how you want to continue
        </p>
      </div>

      {/* Role Selector: Shopper / Shop Owner / Admin */}
      <RoleSelector selectedRole={role} onSelectRole={setRole} />

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Mobile Number or Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800">
            Mobile number or email
          </label>
          <div className="flex rounded-2xl border border-gray-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 bg-white transition">
            <span className="bg-gray-50/80 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 border-r border-gray-200 flex items-center select-none">
              +91
            </span>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter mobile or email"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        {!isOtpMode && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-gray-800">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-[#059669] hover:text-[#047857] transition"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative flex items-center rounded-2xl border border-gray-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 bg-white transition">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Keep Me Signed In Checkbox */}
        <div className="flex items-center gap-2 pt-0.5">
          <input
            id="keep-signed-in"
            type="checkbox"
            checked={keepSignedIn}
            onChange={(e) => setKeepSignedIn(e.target.checked)}
            className="w-4 h-4 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669] cursor-pointer"
          />
          <label
            htmlFor="keep-signed-in"
            className="text-xs font-semibold text-gray-700 cursor-pointer select-none"
          >
            Keep me signed in
          </label>
        </div>

        {/* Primary Submit Button: Continue as Shopper / Shop Owner / Admin */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#059669] hover:bg-[#047857] active:scale-[0.98] text-white py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>
            {isSubmitting
              ? 'Verifying...'
              : `Continue as ${roleLabels[role]}`}
          </span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Secondary Button: Login with OTP instead */}
        <button
          type="button"
          onClick={() => setIsOtpMode(!isOtpMode)}
          className="w-full bg-white hover:bg-gray-50 border border-gray-200 active:scale-[0.98] text-gray-800 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Smartphone className="w-4 h-4 text-[#059669]" />
          <span>{isOtpMode ? 'Login with Password instead' : 'Login with OTP instead'}</span>
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-gray-200 w-full" />
        <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest relative">
          OR
        </span>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full bg-white hover:bg-gray-50 border border-gray-200 active:scale-[0.98] text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2.5 cursor-pointer"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {/* Bottom Switch to Register Shop */}
      <div className="text-center pt-2">
        <p className="text-xs text-gray-500 font-medium">
          Own a shop?{' '}
          <Link
            href="/seller-registration"
            className="font-bold text-[#059669] hover:underline"
          >
            Register your shop on Bazaario →
          </Link>
        </p>
      </div>
    </div>
  );
}
