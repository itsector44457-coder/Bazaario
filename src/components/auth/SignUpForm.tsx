'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RoleSelector, { UserRole } from './RoleSelector';
import { Eye, EyeOff, ArrowRight, Store } from 'lucide-react';

interface SignUpFormProps {
  initialRole?: UserRole;
  onSuccess?: (role: UserRole) => void;
  className?: string;
}

export default function SignUpForm({
  initialRole = 'shopper',
  onSuccess,
  className = '',
}: SignUpFormProps) {
  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [area, setArea] = useState('Andheri West, Mumbai');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const roleLabels: Record<UserRole, string> = {
    shopper: 'Shopper',
    seller: 'Shop Owner',
    admin: 'Admin',
  };

  const roleRedirects: Record<UserRole, string> = {
    shopper: '/',
    seller: '/seller-registration',
    admin: '/admin/dashboard',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSuccess) {
        onSuccess(role);
      } else {
        router.push(roleRedirects[role]);
      }
    }, 900);
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Heading */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          Create your account
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Choose your account type to get started
        </p>
      </div>

      {/* Role Selector */}
      <RoleSelector selectedRole={role} onSelectRole={setRole} />

      {/* Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800">
            Full name
          </label>
          <input
            id="signup-fullname"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Rahul Verma"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Mobile Number with +91 */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800">
            Mobile number
          </label>
          <div className="flex rounded-2xl border border-gray-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 bg-white transition">
            <span className="bg-gray-50/80 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-gray-700 border-r border-gray-200 flex items-center select-none shrink-0">
              +91
            </span>
            <input
              id="signup-mobile"
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="98765 43210"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800">
            Email address
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rahul@example.com"
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/15 transition bg-white text-gray-900 placeholder-gray-400"
          />
        </div>

        {/* Conditional Shop Owner Fields */}
        {role === 'seller' && (
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#084c37]">
              <Store className="w-4 h-4 text-[#059669]" />
              <span>Shop Details</span>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Shop / Store Name
              </label>
              <input
                id="signup-shopname"
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g. Sharma General Store"
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                Neighborhood / Locality
              </label>
              <input
                id="signup-area"
                type="text"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-gray-800">
            Create password
          </label>
          <div className="relative flex items-center rounded-2xl border border-gray-200 overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/15 bg-white transition">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
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

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
          <input
            id="signup-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded text-[#059669] focus:ring-emerald-500 accent-[#059669] cursor-pointer shrink-0"
          />
          <label
            htmlFor="signup-terms"
            className="text-[11px] text-gray-600 cursor-pointer select-none leading-relaxed"
          >
            I agree to Bazaario&apos;s{' '}
            <a href="#" className="font-bold text-[#059669] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-bold text-[#059669] hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit Button */}
        <button
          id="signup-submit"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#059669] hover:bg-[#047857] active:scale-[0.98] text-white py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
        >
          <span>
            {isSubmitting
              ? 'Creating Account...'
              : `Create ${roleLabels[role]} Account`}
          </span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>

      {/* OR Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-gray-200" />
        <span className="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          OR
        </span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      {/* Google Sign Up */}
      <button
        id="signup-google"
        type="button"
        onClick={() => router.push(roleRedirects[role])}
        className="w-full bg-white hover:bg-gray-50 border border-gray-200 active:scale-[0.98] text-gray-700 py-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2.5 cursor-pointer"
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
        <span>Sign up with Google</span>
      </button>

      {/* Switch to Login */}
      <div className="text-center">
        <p className="text-xs text-gray-500 font-medium">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-[#059669] hover:underline">
            Log in →
          </Link>
        </p>
      </div>
    </div>
  );
}
