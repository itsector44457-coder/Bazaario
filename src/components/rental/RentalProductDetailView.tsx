'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  HelpCircle,
  HardHat,
  Glasses,
  Footprints,
  Shirt,
  Volume2,
  ArrowRight,
  Info,
  Check,
  PhoneCall,
  X,
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export interface RentalAddon {
  id: string;
  name: string;
  ratePerDay: number;
  image: string;
  selected?: boolean;
}

export default function RentalProductDetailView() {
  const router = useRouter();

  // Duration Slider & Tiers state
  const [selectedDurationDays, setSelectedDurationDays] = useState(3);
  const [selectedDurationHours, setSelectedDurationHours] = useState(4);
  const [activeTier, setActiveTier] = useState<'4h' | '24h' | 'week'>('24h');

  // Dates state
  const [startDate, setStartDate] = useState('2026-11-05T09:30');
  const [endDate, setEndDate] = useState('2026-11-08T13:30');

  // Quantity state
  const [quantity, setQuantity] = useState(1);

  // Add-ons state
  const [addons, setAddons] = useState<RentalAddon[]>([
    {
      id: 'addon-1',
      name: 'LGR Dehumidifier',
      ratePerDay: 75,
      image: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=200&auto=format&fit=crop&q=80',
      selected: false,
    },
    {
      id: 'addon-2',
      name: 'HEPA Vacuum',
      ratePerDay: 50,
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&auto=format&fit=crop&q=80',
      selected: false,
    },
  ]);

  // Gallery images
  const images = [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80', // Industrial air mover style
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&auto=format&fit=crop&q=80',
  ];
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Accordion open/close state
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    usages: true,
    description: true,
    features: true,
    safety: true,
    specs: true,
    conditions: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Enquiry modal state
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryPhone, setEnquiryPhone] = useState('');
  const [enquiryNotes, setEnquiryNotes] = useState('');

  // Base pricing calculations
  const baseRatePerDay = 20; // $20.00 per day
  const calculatedDays = selectedDurationDays + (selectedDurationHours > 0 ? 0.5 : 0);
  const baseEquipmentCost = Math.round(baseRatePerDay * calculatedDays * quantity * 2.5); // base tier pricing scale
  const selectedAddonsCost = addons
    .filter((a) => a.selected)
    .reduce((sum, a) => sum + a.ratePerDay * calculatedDays, 0);
  const estimatedTotal = baseEquipmentCost + selectedAddonsCost;

  const handleToggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    );
  };

  const handleAddToCart = () => {
    setToastMessage(`${quantity} x Axial Air Mover has been added to your cart`);
    setToastVisible(true);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnquiryOpen(false);
    setToastMessage('Enquiry sent successfully! Our equipment manager will call you shortly.');
    setToastVisible(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased">
      <Navbar cartCount={quantity} />

      {/* Floating Toast Notification matching Screenshot 2 */}
      {toastVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[90%] bg-white rounded-2xl shadow-2xl border border-emerald-100 p-4 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              {toastMessage}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/rental/cart')}
              className="px-4 py-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-black rounded-xl shadow-xs transition"
            >
              View Cart
            </button>
            <button
              onClick={() => setToastVisible(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full text-xs font-medium text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-slate-700">Home</Link>
        <span>/</span>
        <Link href="/rental" className="hover:text-slate-700">All Equipment</Link>
        <span>/</span>
        <span className="text-slate-700 font-bold">Air Mover & Dehumidifiers</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full space-y-8">
        {/* Top Product & Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery & Paired Add-ons */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Product Image Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[380px]">
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-500 transition">
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Product Visual */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-4">
                <Image
                  src={images[activeImgIdx]}
                  alt="Axial Air Mover"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center gap-2 pt-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      activeImgIdx === i ? 'w-6 bg-slate-800' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Frequently Paired With Add-ons */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 space-y-3.5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Frequently Paired With
              </h4>

              <div className="space-y-2.5">
                {addons.map((addon) => (
                  <div
                    key={addon.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border transition ${
                      addon.selected
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : 'border-gray-100 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 overflow-hidden relative shrink-0">
                        <Image
                          src={addon.image}
                          alt={addon.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-900">
                          {addon.name}
                        </h5>
                        <p className="text-[11px] font-black text-rose-600">
                          ${addon.ratePerDay.toFixed(2)} Per Day
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition shadow-2xs ${
                        addon.selected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white hover:bg-rose-700'
                      }`}
                    >
                      {addon.selected ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[3]" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Rates Matrix, Duration Picker, and Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Title & Daily Base Rate */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Axial Air Mover
              </h1>
              <p className="text-base sm:text-lg font-black text-rose-600">
                ${baseRatePerDay.toFixed(2)} per day <span className="text-xs font-semibold text-slate-500">incl. GST</span>
              </p>
            </div>

            {/* Rent Rates Box (with tiers and slider matching screenshots) */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-6 space-y-5">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Rent Rates (incl. GST)
              </span>

              {/* 3 Tier Cards */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTier('4h');
                    setSelectedDurationDays(0);
                    setSelectedDurationHours(4);
                  }}
                  className={`p-3 rounded-2xl border transition ${
                    activeTier === '4h'
                      ? 'border-[#10b981] bg-emerald-50/40 ring-2 ring-[#10b981]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-black text-slate-900 block">$80</span>
                  <span className="text-[11px] font-semibold text-slate-500">4 hours</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTier('24h');
                    setSelectedDurationDays(1);
                    setSelectedDurationHours(0);
                  }}
                  className={`p-3 rounded-2xl border transition ${
                    activeTier === '24h'
                      ? 'border-[#10b981] bg-emerald-50/40 ring-2 ring-[#10b981]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-black text-slate-900 block">$80</span>
                  <span className="text-[11px] font-semibold text-slate-500">24 hours</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTier('week');
                    setSelectedDurationDays(7);
                    setSelectedDurationHours(0);
                  }}
                  className={`p-3 rounded-2xl border transition ${
                    activeTier === 'week'
                      ? 'border-[#10b981] bg-emerald-50/40 ring-2 ring-[#10b981]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-black text-slate-900 block">$300</span>
                  <span className="text-[11px] font-semibold text-slate-500">Week</span>
                </button>
              </div>

              {/* Interactive Duration Slider */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600">Rental duration:</span>
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-bold text-[11px]">
                    {selectedDurationDays} Days {selectedDurationHours > 0 ? `· ${selectedDurationHours} Hours` : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={selectedDurationDays}
                  onChange={(e) => {
                    setSelectedDurationDays(Number(e.target.value));
                    setActiveTier(Number(e.target.value) >= 7 ? 'week' : '24h');
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#10b981]"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>1 Day</span>
                  <span>7 Days (Weekly)</span>
                  <span>14 Days</span>
                </div>
              </div>

              {/* Estimated Total Display */}
              <div className="pt-3 border-t border-gray-100 flex items-baseline justify-end gap-2 text-right">
                <span className="text-xs font-semibold text-slate-400">
                  Estimated Total
                </span>
                <span className="text-2xl font-black text-slate-900">
                  ${estimatedTotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 text-right">
                Includes selected equipment and add-ons
              </p>
            </div>

            {/* Rent Duration Box (Hire From & Until Pickers) */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-6 space-y-4">
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                Rent Duration
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Hire From
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Until
                  </label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons Row matching Screenshot 1 & 3 */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 font-bold text-xs transition text-center"
                >
                  Send Enquiry
                </button>

                {/* Quantity + Add to Cart */}
                <div className="w-full sm:w-1/2 flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-slate-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-xs shadow-xs transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specs & Information Accordions */}
        <div className="space-y-4 max-w-4xl">
          {/* Common Usages */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('usages')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Common Usages</h3>
              {openSections.usages ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.usages && (
              <div className="flex flex-wrap gap-2 pt-3">
                {[
                  'Water damage',
                  'Structural drying',
                  'Hallway drying',
                  'Large water damage',
                  'Improve indoor air quality',
                ].map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700"
                  >
                    • {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('description')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Description</h3>
              {openSections.description ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.description && (
              <div className="pt-3 text-xs text-slate-600 leading-relaxed space-y-2">
                <p>
                  Large CFM unit used for moving large amounts of air with minimal power usage. Due to its high CFM it can move air longer distances than other fans can. Minimal power usage means you can put more equipment on your job. These units are great for drying hallways, or drying long sections of wall or carpet.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-600">
                  <li>Low Profile Air Mover for powerful ventilation.</li>
                  <li>Compact size that does not compromise on power.</li>
                  <li>A 1/3 HP motor and large intake area to maximize drying area efficiently.</li>
                  <li>Vents on the underside of unit dry surface below the fan.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Features</h3>
              {openSections.features ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.features && (
              <ul className="pt-3 list-disc pl-4 text-xs text-slate-600 space-y-1.5">
                <li>Built for high-temperature environments - Heat resistant up to 60°C / 140°F</li>
                <li>1/3 HP SEALED motor - Protected against contaminants and water damage</li>
                <li>Low 2.8 AMP draw with 3600 CFM airflow capacity</li>
                <li>Includes rack/stand with 360-degree rotation for multiple drying positions</li>
              </ul>
            )}
          </div>

          {/* Safety Gear Visual Cards matching screenshot */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('safety')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Safety (while using)</h3>
              {openSections.safety ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.safety && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
                {[
                  { label: 'Ear Protection', icon: Volume2 },
                  { label: 'Hi Vis Vest', icon: Shirt },
                  { label: 'Safety Boots', icon: Footprints },
                  { label: 'Safety Glasses', icon: Glasses },
                  { label: 'Safety Helmet', icon: HardHat },
                ].map((gear, i) => {
                  const Icon = gear.icon;
                  return (
                    <div
                      key={i}
                      className="border border-gray-200/80 rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2 bg-slate-50/50"
                    >
                      <Icon className="w-5 h-5 text-slate-600" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {gear.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Specifications Table */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('specs')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Specifications</h3>
              {openSections.specs ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.specs && (
              <div className="pt-3 divide-y divide-gray-100 text-xs">
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Model:</span>
                  <span className="font-bold text-slate-900">XPOWER X-48ATR</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Voltage/Hertz:</span>
                  <span className="font-bold text-slate-900">115V / 60Hz</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Motor:</span>
                  <span className="font-bold text-slate-900">1/3 HP / 250 W</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Rated Airflow:</span>
                  <span className="font-bold text-slate-900">3600 CFM</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Speeds:</span>
                  <span className="font-bold text-slate-900">Variable speed</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-slate-500">Cord length:</span>
                  <span className="font-bold text-slate-900">20ft</span>
                </div>
              </div>
            )}
          </div>

          {/* Hire Conditions */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-2xs">
            <button
              onClick={() => toggleSection('conditions')}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-sm font-black text-slate-900">Hire Conditions</h3>
              {openSections.conditions ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>
            {openSections.conditions && (
              <ul className="pt-3 list-disc pl-4 text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>Hire must be brought back on hire end date, e.g. if hire ends on 31st, it must be brought back on the 31st.</li>
                <li>Equipment can be picked up between 7am-3:00pm.</li>
                <li>You must have received confirmation for collection (via phone call or email) to guarantee collection when you arrive.</li>
                <li>Shipping times subject to courier delivery times.</li>
                <li>Valid government photo ID and signature required for hire.</li>
                <li className="text-rose-600 font-bold">
                  <Link href="#terms" className="underline">Full Terms & Conditions</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </main>

      {/* Enquiry Modal */}
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-black text-slate-900">
                Equipment Hire Enquiry
              </h3>
              <button onClick={() => setIsEnquiryOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendEnquiry} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={enquiryPhone}
                  onChange={(e) => setEnquiryPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  placeholder="+91 98330 00000"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Notes / Site Requirements</label>
                <textarea
                  rows={3}
                  value={enquiryNotes}
                  onChange={(e) => setEnquiryNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                  placeholder="e.g. Basement water damage drying required for 4 days..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs shadow-xs transition mt-2"
              >
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
