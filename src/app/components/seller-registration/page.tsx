'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import SellerHeader from '@/components/seller-registration/SellerHeader';
import SellerBenefitsSidebar from '@/components/seller-registration/SellerBenefitsSidebar';
import Step1ShopDetails from '@/components/seller-registration/Step1ShopDetails';
import Step2OwnerKYC from '@/components/seller-registration/Step2OwnerKYC';
import Step3BankDetails from '@/components/seller-registration/Step3BankDetails';
import Step4Review from '@/components/seller-registration/Step4Review';
import SellerRegistrationView from '@/components/seller-registration/SellerRegistrationView';

export default function SellerRegistrationComponentPage() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'step1' | 'step2' | 'step3' | 'step4' | 'sidebar'>('all');

  const usageCode = `import SellerHeader from '@/components/seller-registration/SellerHeader';
import SellerBenefitsSidebar from '@/components/seller-registration/SellerBenefitsSidebar';
import SellerRegistrationView from '@/components/seller-registration/SellerRegistrationView';

export default function MySellerRegistrationPage() {
  return (
    <>
      <SellerHeader />
      <div className="flex flex-col lg:flex-row gap-8">
        <SellerBenefitsSidebar />
        <SellerRegistrationView />
      </div>
    </>
  );
}`;

  const copyCode = () => {
    navigator.clipboard.writeText(usageCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link
            href="/components"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Components Hub</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-xs font-bold text-gray-900">Seller Registration Components</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/seller-registration"
            className="text-xs font-bold text-[#059669] hover:underline px-3 py-1.5"
          >
            View Live Flow →
          </Link>
          <button
            type="button"
            onClick={copyCode}
            className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2 flex items-center gap-2 overflow-x-auto text-xs">
        {[
          { id: 'all', label: 'Full 4-Step Wizard' },
          { id: 'step1', label: '1. Shop Details' },
          { id: 'step2', label: '2. Owner & KYC' },
          { id: 'step3', label: '3. Bank Details' },
          { id: 'step4', label: '4. Review & Submit' },
          { id: 'sidebar', label: '5. Benefits Sidebar' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#059669] text-white shadow-2xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-8">
        {activeTab === 'all' && (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-extrabold text-gray-900">Complete Seller Registration Experience</h2>
              <p className="text-xs text-gray-500">
                Exact replica of Bazaario for Business onboarding wizard with all 4 steps and left feature benefits card.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
              <SellerHeader />
              <div className="p-6 sm:p-8 bg-gray-50 flex flex-col lg:flex-row gap-8 items-start">
                <SellerBenefitsSidebar />
                <SellerRegistrationView />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'step1' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Step 1: Tell Us About Your Shop</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
              <Step1ShopDetails
                data={{
                  shopName: 'Sharma Electronics',
                  category: 'Electronics & Mobiles',
                  phone: '+91 98330 21045',
                  address: 'Shop 14, Lokhandwala Market, Andheri West',
                  city: 'Mumbai',
                  pincode: '400053',
                  openTime: '10:00 AM',
                  closeTime: '9:30 PM',
                  hasDelivery: true,
                  hasPickup: true,
                  photoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
                }}
                onChange={() => {}}
                onNext={() => alert('Proceed to Step 2')}
              />
            </div>
          </div>
        )}

        {activeTab === 'step2' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Step 2: Owner Details & KYC</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
              <Step2OwnerKYC
                data={{
                  ownerName: 'Rajesh Sharma',
                  email: 'rajesh.sharma@sharmaelectronics.in',
                  phone: '+91 98330 21045',
                  panNumber: 'ABCPS1234F',
                  panFileUploaded: true,
                  aadhaarNumber: 'XXXX-XXXX-4821',
                  aadhaarFileUploaded: true,
                  gstin: '27ABCPS1234F1Z5',
                }}
                onChange={() => {}}
                onNext={() => alert('Proceed to Step 3')}
                onBack={() => alert('Back to Step 1')}
              />
            </div>
          </div>
        )}

        {activeTab === 'step3' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Step 3: Bank Details for Weekly Payouts</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
              <Step3BankDetails
                data={{
                  accountHolderName: 'SHARMA ELECTRONICS',
                  bankName: 'HDFC Bank',
                  accountType: 'current',
                  accountNumber: '50200012345678',
                  confirmAccountNumber: '50200012345678',
                  ifscCode: 'HDFC0000240',
                  chequeFileUploaded: true,
                }}
                onChange={() => {}}
                onNext={() => alert('Proceed to Step 4')}
                onBack={() => alert('Back to Step 2')}
              />
            </div>
          </div>
        )}

        {activeTab === 'step4' && (
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-base font-bold text-gray-900">Step 4: Review All Details & Submit</h2>
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8">
              <Step4Review
                shopData={{
                  shopName: 'Sharma Electronics',
                  category: 'Electronics & Mobiles',
                  phone: '+91 98330 21045',
                  address: 'Shop 14, Lokhandwala Market, Andheri West',
                  city: 'Mumbai',
                  pincode: '400053',
                  openTime: '10:00 AM',
                  closeTime: '9:30 PM',
                  hasDelivery: true,
                  hasPickup: true,
                  photoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80',
                }}
                kycData={{
                  ownerName: 'Rajesh Sharma',
                  email: 'rajesh.sharma@sharmaelectronics.in',
                  phone: '+91 98330 21045',
                  panNumber: 'ABCPS1234F',
                  panFileUploaded: true,
                  aadhaarNumber: 'XXXX-XXXX-4821',
                  aadhaarFileUploaded: true,
                  gstin: '27ABCPS1234F1Z5',
                }}
                bankData={{
                  accountHolderName: 'SHARMA ELECTRONICS',
                  bankName: 'HDFC Bank',
                  accountType: 'current',
                  accountNumber: '50200012345678',
                  confirmAccountNumber: '50200012345678',
                  ifscCode: 'HDFC0000240',
                  chequeFileUploaded: true,
                }}
                onEditStep={(s) => alert(`Edit step ${s}`)}
                onSubmit={() => alert('Submitted! Navigating to /seller-verification')}
                onBack={() => alert('Back to Step 3')}
              />
            </div>
          </div>
        )}

        {activeTab === 'sidebar' && (
          <div className="space-y-4 max-w-sm">
            <h2 className="text-base font-bold text-gray-900">Benefits & Pricing Sidebar</h2>
            <SellerBenefitsSidebar />
          </div>
        )}
      </div>
    </div>
  );
}

