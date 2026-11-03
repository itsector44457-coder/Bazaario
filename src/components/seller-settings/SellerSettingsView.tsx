'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Store,
  Phone,
  MessageSquare,
  Clock,
  Truck,
  Landmark,
  Bell,
  Camera,
  Pencil,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Calendar,
  X,
  Plus,
  Umbrella,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface SellerSettingsViewProps {
  className?: string;
}

export default function SellerSettingsView({ className = '' }: SellerSettingsViewProps) {
  const [activeSection, setActiveSection] = useState('storefront');
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Storefront Form State
  const [shopName, setShopName] = useState('Sharma Electronics');
  const [category, setCategory] = useState('Electronics & Mobiles');
  const [aboutShop, setAboutShop] = useState(
    'Trusted electronics store in Lokhandwala since 2009. Genuine products with shop bill & brand warranty. Mobiles, audio, smartwatches & accessories.'
  );
  const [coverPhoto, setCoverPhoto] = useState(
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1400&q=80'
  );

  // Contact Options State
  const [inAppChat, setInAppChat] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('+91 98330 21045');
  const [phoneEnabled, setPhoneEnabled] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('+91 22 2632 1045');
  const [showDirections, setShowDirections] = useState(true);

  // Business Hours State
  const [hours, setHours] = useState({
    monday: { enabled: true, open: '10:00 AM', close: '9:30 PM' },
    tueFri: { enabled: true, open: '10:00 AM', close: '9:30 PM' },
    saturday: { enabled: true, open: '10:00 AM', close: '10:00 PM' },
    sunday: { enabled: true, open: '11:00 AM', close: '6:00 PM' },
  });

  // Delivery & Pickup State
  const [deliveryRadius, setDeliveryRadius] = useState(6);
  const [deliveryFee, setDeliveryFee] = useState('30');
  const [freeDeliveryAbove, setFreeDeliveryAbove] = useState('999');
  const [minOrder, setMinOrder] = useState('199');
  const [pickupReadyIn, setPickupReadyIn] = useState('20 minutes');

  // Notifications State
  const [notifOrderAlerts, setNotifOrderAlerts] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifLowStock, setNotifLowStock] = useState(true);
  const [notifWeeklySummary, setNotifWeeklySummary] = useState(false);

  // Section references for scrolling
  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    storefront: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    hours: useRef<HTMLDivElement>(null),
    delivery: useRef<HTMLDivElement>(null),
    bank: useRef<HTMLDivElement>(null),
    notifications: useRef<HTMLDivElement>(null),
  };

  const navItems = [
    { id: 'storefront', label: 'Storefront', icon: Store },
    { id: 'contact', label: 'Contact options', icon: MessageSquare },
    { id: 'hours', label: 'Business hours', icon: Clock },
    { id: 'delivery', label: 'Delivery & pickup', icon: Truck },
    { id: 'bank', label: 'Bank & KYC', icon: Landmark },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const targetRef = sectionRefs[id];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSave = () => {
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 3000);
  };

  const handleDiscard = () => {
    setShopName('Sharma Electronics');
    setCategory('Electronics & Mobiles');
    setAboutShop(
      'Trusted electronics store in Lokhandwala since 2009. Genuine products with shop bill & brand warranty. Mobiles, audio, smartwatches & accessories.'
    );
    setDeliveryRadius(6);
  };

  return (
    <div className={`w-full space-y-6 select-none ${className}`}>
      {/* ── 1. Top Header with Discard and Save Changes ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Shop settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
            Manage your public storefront profile, contact channels, operating hours and fulfilment rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs sm:text-sm font-bold text-gray-700 transition shadow-2xs cursor-pointer"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] active:scale-95 text-white text-xs sm:text-sm font-black transition shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Save changes</span>
          </button>
        </div>
      </div>

      {/* ── 2. Settings Grid (Left Nav Tabs + Right Content Panels) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Sub-Navigation Sidebar (Sticky on desktop) */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200/80 p-3 sm:p-4 shadow-2xs lg:sticky lg:top-20">
          <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition whitespace-nowrap cursor-pointer text-left w-full ${
                    isActive
                      ? 'bg-[#e8f7f0] text-[#059669] shadow-2xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 stroke-[2.2] shrink-0 ${
                      isActive ? 'text-[#059669]' : 'text-gray-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Content Column (All Sections matching screenshots) */}
        <div className="lg:col-span-9 space-y-6">
          {/* ── SECTION 1: STOREFRONT ── */}
          <div
            ref={sectionRefs.storefront}
            className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden"
          >
            {/* Cover Photo Banner */}
            <div className="relative h-44 sm:h-56 w-full bg-gray-100 overflow-hidden">
              <Image
                src={coverPhoto}
                alt="Shop Cover"
                fill
                sizes="(max-width: 1200px) 100vw, 900px"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  setCoverPhoto(
                    'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1400&q=80'
                  )
                }
                className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-800 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 border border-gray-200 transition backdrop-blur-xs cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5 text-gray-700" />
                <span>Change cover</span>
              </button>
            </div>

            {/* Avatar & Storefront Meta */}
            <div className="px-5 sm:px-8 pb-6 pt-0 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 -mt-10 sm:-mt-12 mb-5">
                <div className="flex items-end gap-3.5">
                  {/* Avatar with edit pencil badge */}
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center font-black text-2xl sm:text-3xl border-4 border-white shadow-md">
                      SE
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#059669] hover:bg-[#047857] text-white flex items-center justify-center border-2 border-white shadow-xs transition"
                      title="Change logo"
                    >
                      <Pencil className="w-3.5 h-3.5 stroke-[2.2]" />
                    </button>
                  </div>

                  <div className="pb-1">
                    <Link
                      href="/"
                      target="_blank"
                      className="text-xs sm:text-sm font-extrabold text-[#059669] hover:underline flex items-center gap-1"
                    >
                      <span>Preview storefront →</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Form Fields: Shop Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                    Shop name *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-semibold outline-none focus:border-[#059669] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-900 font-semibold outline-none focus:border-[#059669] focus:bg-white transition cursor-pointer"
                  >
                    <option value="Electronics & Mobiles">Electronics & Mobiles</option>
                    <option value="Grocery & Staples">Grocery & Staples</option>
                    <option value="Pharmacy & Health">Pharmacy & Health</option>
                    <option value="Fashion & Footwear">Fashion & Footwear</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                  </select>
                </div>
              </div>

              {/* About your shop */}
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                  About your shop
                </label>
                <textarea
                  rows={3}
                  value={aboutShop}
                  onChange={(e) => setAboutShop(e.target.value)}
                  className="w-full p-4 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-900 font-medium leading-relaxed outline-none focus:border-[#059669] focus:bg-white transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── SECTION 2: CONTACT OPTIONS FOR SHOPPERS ── */}
          <div
            ref={sectionRefs.contact}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-5"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Contact options for shoppers
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Choose how customers can reach you from your products & storefront.
              </p>
            </div>

            <div className="space-y-3.5 divide-y divide-gray-100">
              {/* Option 1: In-app chat */}
              <div className="pt-3.5 first:pt-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#064e3b] text-white flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-gray-900">
                      In-app chat
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium truncate">
                      Recommended · keeps all conversations in Bazaario
                    </p>
                  </div>
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setInAppChat(!inAppChat)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    inAppChat ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      inAppChat ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Option 2: WhatsApp */}
              <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f7f0] text-[#059669] border border-emerald-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-gray-900">
                      WhatsApp
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Opens WhatsApp with product details
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-auto self-end">
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-44 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                  <button
                    type="button"
                    onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      whatsappEnabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        whatsappEnabled ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Option 3: Phone call */}
              <div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-gray-900">
                      Phone call
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium">
                      Only during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-auto self-end">
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-44 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                  <button
                    type="button"
                    onClick={() => setPhoneEnabled(!phoneEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      phoneEnabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        phoneEnabled ? 'left-6.5' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Option 4: Show directions to shop */}
              <div className="pt-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#edf7f2] text-[#059669] border border-emerald-200/60 flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-black text-gray-900">
                      Show directions to shop
                    </h3>
                    <p className="text-[11px] text-gray-400 font-medium truncate">
                      Map pin on storefront & product page
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDirections(!showDirections)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    showDirections ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      showDirections ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* ── SECTION 3: BUSINESS HOURS ── */}
          <div
            ref={sectionRefs.hours}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-4"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Business hours
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Orders and pickup will follow your scheduled shop timings.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Monday */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 rounded-2xl hover:bg-gray-50/70 transition">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 w-28">
                  Monday
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setHours({
                        ...hours,
                        monday: { ...hours.monday, enabled: !hours.monday.enabled },
                      })
                    }
                    className={`w-11 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      hours.monday.enabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        hours.monday.enabled ? 'left-6' : 'left-0.5'
                      }`}
                    />
                  </button>

                  <input
                    type="text"
                    value={hours.monday.open}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        monday: { ...hours.monday, open: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="text"
                    value={hours.monday.close}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        monday: { ...hours.monday, close: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                </div>
              </div>

              {/* Tue - Fri */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 rounded-2xl hover:bg-gray-50/70 transition">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 w-28">
                  Tue – Fri
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setHours({
                        ...hours,
                        tueFri: { ...hours.tueFri, enabled: !hours.tueFri.enabled },
                      })
                    }
                    className={`w-11 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      hours.tueFri.enabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        hours.tueFri.enabled ? 'left-6' : 'left-0.5'
                      }`}
                    />
                  </button>

                  <input
                    type="text"
                    value={hours.tueFri.open}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        tueFri: { ...hours.tueFri, open: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="text"
                    value={hours.tueFri.close}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        tueFri: { ...hours.tueFri, close: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                </div>
              </div>

              {/* Saturday */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 rounded-2xl hover:bg-gray-50/70 transition">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 w-28">
                  Saturday
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setHours({
                        ...hours,
                        saturday: { ...hours.saturday, enabled: !hours.saturday.enabled },
                      })
                    }
                    className={`w-11 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      hours.saturday.enabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        hours.saturday.enabled ? 'left-6' : 'left-0.5'
                      }`}
                    />
                  </button>

                  <input
                    type="text"
                    value={hours.saturday.open}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        saturday: { ...hours.saturday, open: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="text"
                    value={hours.saturday.close}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        saturday: { ...hours.saturday, close: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                </div>
              </div>

              {/* Sunday */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 rounded-2xl hover:bg-gray-50/70 transition">
                <span className="text-xs sm:text-sm font-extrabold text-gray-900 w-28">
                  Sunday
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setHours({
                        ...hours,
                        sunday: { ...hours.sunday, enabled: !hours.sunday.enabled },
                      })
                    }
                    className={`w-11 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                      hours.sunday.enabled ? 'bg-[#10b981]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`block w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                        hours.sunday.enabled ? 'left-6' : 'left-0.5'
                      }`}
                    />
                  </button>

                  <input
                    type="text"
                    value={hours.sunday.open}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        sunday: { ...hours.sunday, open: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="text"
                    value={hours.sunday.close}
                    onChange={(e) =>
                      setHours({
                        ...hours,
                        sunday: { ...hours.sunday, close: e.target.value },
                      })
                    }
                    className="w-24 px-3 py-1.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-center text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Holiday / Temporary Closure Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsHolidayModalOpen(true)}
                className="text-xs font-extrabold text-amber-800 hover:text-amber-900 flex items-center gap-2 cursor-pointer"
              >
                <Umbrella className="w-4 h-4 text-amber-700 stroke-[2.2]" />
                <span>Add holiday / temporary closure</span>
              </button>
            </div>
          </div>

          {/* ── SECTION 4: DELIVERY & PICKUP ── */}
          <div
            ref={sectionRefs.delivery}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-6"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Delivery & pickup
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Set dispatch distance, order minimums and pickup preparation times.
              </p>
            </div>

            {/* Delivery Radius Slider with interactive control */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-gray-800">
                  Delivery radius
                </label>
                <span className="text-xs font-black text-[#059669] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {deliveryRadius} km
                </span>
              </div>

              <div className="relative pt-1">
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={deliveryRadius}
                  onChange={(e) => setDeliveryRadius(Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1">
                  <span>1 km</span>
                  <span>15 km</span>
                </div>
              </div>
            </div>

            {/* 4 Delivery & Pickup Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                  Delivery fee
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={deliveryFee}
                    onChange={(e) => setDeliveryFee(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                  Free delivery above
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={freeDeliveryAbove}
                    onChange={(e) => setFreeDeliveryAbove(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                  Minimum order
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="text"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                  Pickup ready in
                </label>
                <select
                  value={pickupReadyIn}
                  onChange={(e) => setPickupReadyIn(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669] cursor-pointer"
                >
                  <option value="15 minutes">15 minutes</option>
                  <option value="20 minutes">20 minutes</option>
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="1 hour">1 hour</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── SECTION 5: BANK, KYC & COMMISSION ── */}
          <div
            ref={sectionRefs.bank}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-4"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Bank, KYC & commission
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Financial verification credentials managed by Bazaario Trust & Safety.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Card 1: Payout account */}
              <div className="bg-[#fcfdfd] border border-gray-150 rounded-2xl p-4 space-y-2 shadow-2xs">
                <span className="block text-[11px] font-semibold text-gray-400">
                  Payout account
                </span>
                <p className="text-sm font-black text-gray-950">
                  HDFC ••••8823
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Card 2: KYC documents */}
              <div className="bg-[#fcfdfd] border border-gray-150 rounded-2xl p-4 space-y-2 shadow-2xs">
                <span className="block text-[11px] font-semibold text-gray-400">
                  KYC documents
                </span>
                <p className="text-sm font-black text-gray-950">
                  PAN · Aadhaar · Udyam
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved 31 Oct</span>
                </div>
              </div>

              {/* Card 3: Commission rate (Soft Amber Background) */}
              <div className="bg-[#fffdf5] border border-amber-200/70 rounded-2xl p-4 space-y-2 shadow-2xs">
                <span className="block text-[11px] font-semibold text-amber-700">
                  Commission rate
                </span>
                <p className="text-sm font-black text-amber-950">
                  8% <span className="text-xs font-bold text-amber-700">+ GST</span>
                </p>
                <p className="text-[11px] font-bold text-amber-600">
                  Set by Bazaario admin
                </p>
              </div>
            </div>
          </div>

          {/* ── SECTION 6: NOTIFICATIONS ── */}
          <div
            ref={sectionRefs.notifications}
            className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-7 shadow-2xs space-y-4"
          >
            <div>
              <h2 className="text-base sm:text-lg font-black text-gray-950">
                Notifications
              </h2>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Choose how and when Bazaario alerts you for store activity.
              </p>
            </div>

            <div className="space-y-4 divide-y divide-gray-100 pt-1">
              {/* Alert 1 */}
              <div className="pt-3 first:pt-0 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  New order alerts (sound + SMS)
                </span>
                <button
                  type="button"
                  onClick={() => setNotifOrderAlerts(!notifOrderAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    notifOrderAlerts ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      notifOrderAlerts ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Alert 2 */}
              <div className="pt-3 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  New customer messages
                </span>
                <button
                  type="button"
                  onClick={() => setNotifMessages(!notifMessages)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    notifMessages ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      notifMessages ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Alert 3 */}
              <div className="pt-3 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Low stock warnings
                </span>
                <button
                  type="button"
                  onClick={() => setNotifLowStock(!notifLowStock)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    notifLowStock ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      notifLowStock ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Alert 4 */}
              <div className="pt-3 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Weekly payout summary email
                </span>
                <button
                  type="button"
                  onClick={() => setNotifWeeklySummary(!notifWeeklySummary)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                    notifWeeklySummary ? 'bg-[#10b981]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-white shadow-sm transition-transform absolute top-0.5 ${
                      notifWeeklySummary ? 'left-6.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Holiday / Temporary Closure Modal ── */}
      {isHolidayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsHolidayModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-150 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-150">
              <div className="flex items-center gap-2">
                <Umbrella className="w-5 h-5 text-amber-700" />
                <h3 className="text-base font-black text-gray-950">Add Temporary Closure</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsHolidayModalOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                  Reason for closure
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diwali Holiday, Renovation"
                  defaultValue="Diwali Holiday & Festival Break"
                  className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                    From date
                  </label>
                  <input
                    type="date"
                    defaultValue="2024-11-01"
                    className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase mb-1">
                    To date
                  </label>
                  <input
                    type="date"
                    defaultValue="2024-11-04"
                    className="w-full p-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-800">
                Customers will be notified on your storefront and new incoming orders will be temporarily paused during this window.
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsHolidayModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 font-bold text-xs text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Holiday closure scheduled successfully!');
                  setIsHolidayModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white font-bold text-xs shadow-xs"
              >
                Schedule Closure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Success Toast */}
      {isSavedToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#064e3b] text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200 border border-emerald-700">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <div className="text-xs">
            <p className="font-bold">Settings saved successfully!</p>
            <p className="text-emerald-200">Your storefront changes are now live on Bazaario.</p>
          </div>
        </div>
      )}
    </div>
  );
}

