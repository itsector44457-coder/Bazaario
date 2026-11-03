'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Step1ShopDetails, { ShopDetailsFormData } from './Step1ShopDetails';
import Step2OwnerKYC, { OwnerKYCFormData } from './Step2OwnerKYC';
import Step3BankDetails, { BankDetailsFormData } from './Step3BankDetails';
import Step4Review from './Step4Review';

const STEPS = [
  { id: 1, label: '1. Shop details' },
  { id: 2, label: '2. Owner & KYC' },
  { id: 3, label: '3. Bank details' },
  { id: 4, label: '4. Review' },
];

export default function SellerRegistrationView() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State across all 4 steps
  const [shopData, setShopData] = useState<ShopDetailsFormData>({
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
  });

  const [kycData, setKycData] = useState<OwnerKYCFormData>({
    ownerName: 'Rajesh Sharma',
    email: 'rajesh.sharma@sharmaelectronics.in',
    phone: '+91 98330 21045',
    panNumber: 'ABCPS1234F',
    panFileUploaded: true,
    aadhaarNumber: 'XXXX-XXXX-4821',
    aadhaarFileUploaded: true,
    gstin: '27ABCPS1234F1Z5',
  });

  const [bankData, setBankData] = useState<BankDetailsFormData>({
    accountHolderName: 'SHARMA ELECTRONICS',
    bankName: 'HDFC Bank',
    accountType: 'current',
    accountNumber: '50200012345678',
    confirmAccountNumber: '50200012345678',
    ifscCode: 'HDFC0000240',
    chequeFileUploaded: true,
  });

  const handleUpdateShop = (updates: Partial<ShopDetailsFormData>) => {
    setShopData((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateKyc = (updates: Partial<OwnerKYCFormData>) => {
    setKycData((prev) => ({ ...prev, ...updates }));
  };

  const handleUpdateBank = (updates: Partial<BankDetailsFormData>) => {
    setBankData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmitAll = () => {
    router.push('/seller-verification');
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex-1">
      {/* 1. 4-Step Progress Stepper */}
      <div className="border-b border-gray-100 pb-5 mb-6">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
          {STEPS.map((s) => {
            const isActive = currentStep === s.id;
            const isCompleted = currentStep > s.id;

            return (
              <div key={s.id} className="relative">
                <span
                  className={`block text-[11px] sm:text-xs font-bold truncate mb-2 ${
                    isActive
                      ? 'text-[#059669]'
                      : isCompleted
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}
                >
                  {s.label}
                </span>

                <div
                  className={`h-1 rounded-full transition-all ${
                    isActive || isCompleted ? 'bg-[#059669]' : 'bg-gray-100'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Step Views */}
      {currentStep === 1 && (
        <Step1ShopDetails
          data={shopData}
          onChange={handleUpdateShop}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <Step2OwnerKYC
          data={kycData}
          onChange={handleUpdateKyc}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3BankDetails
          data={bankData}
          onChange={handleUpdateBank}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <Step4Review
          shopData={shopData}
          kycData={kycData}
          bankData={bankData}
          onEditStep={(step) => setCurrentStep(step)}
          onSubmit={handleSubmitAll}
          onBack={() => setCurrentStep(3)}
        />
      )}
    </div>
  );
}

