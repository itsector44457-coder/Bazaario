'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Send,
  UploadCloud,
  X,
  Bold,
  Italic,
  List,
  Link2,
  Check,
  Plus,
  ChevronDown,
  CheckSquare,
  Square,
} from 'lucide-react';
import ProductLivePreviewCard from './ProductLivePreviewCard';

interface ColorVariant {
  id: string;
  name: string;
  dotColor: string;
}

export default function SellerAddProductView() {
  const router = useRouter();

  // Form State
  const [productName, setProductName] = useState('Wireless ANC Headphones – 40h Battery');
  const [category, setCategory] = useState('Electronics > Headphones');
  const [brand, setBrand] = useState('boAt');
  const [description, setDescription] = useState(
    'Immerse yourself in rich, balanced sound with hybrid active noise cancellation. 40 hours playback, fast charge, Bluetooth 5.3 dual pairing.'
  );

  // Pricing State
  const [mrp, setMrp] = useState<number>(3199);
  const [sellingPrice, setSellingPrice] = useState<number>(2499);
  const [gstRate, setGstRate] = useState<number>(18);

  // Inventory State
  const [sku, setSku] = useState('SE-HP-0142');
  const [stockQty, setStockQty] = useState<number>(8);
  const [alertBelow, setAlertBelow] = useState<number>(3);

  // Variants State
  const [colors, setColors] = useState<ColorVariant[]>([
    { id: 'black', name: 'Black', dotColor: '#171717' },
    { id: 'white', name: 'White', dotColor: '#e5e7eb' },
    { id: 'green', name: 'Green', dotColor: '#059669' },
  ]);
  const [newColorInput, setNewColorInput] = useState('');
  const [showAddColor, setShowAddColor] = useState(false);

  // Images State
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80',
  ]);

  // Fulfilment Policies State
  const [policies, setPolicies] = useState({
    homeDelivery: true,
    storePickup: true,
    cod: true,
    returns: true,
  });

  // Visibility & Toast State
  const [visibility, setVisibility] = useState<'publish' | 'draft'>('publish');
  const [toastMessage, setToastMessage] = useState('');

  // Calculations
  const discountPercent = mrp > sellingPrice ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;
  const commissionRate = 0.08; // 8% for Electronics
  const commissionAmount = Number((sellingPrice * commissionRate).toFixed(2));
  const sellerEarning = Number((sellingPrice - commissionAmount).toFixed(2));

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddColor = () => {
    if (!newColorInput.trim()) return;
    const newCol: ColorVariant = {
      id: `col-${Date.now()}`,
      name: newColorInput.trim(),
      dotColor: '#4b5563',
    };
    setColors((prev) => [...prev, newCol]);
    setNewColorInput('');
    setShowAddColor(false);
  };

  const handleRemoveColor = (id: string) => {
    setColors((prev) => prev.filter((c) => c.id !== id));
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveDraft = () => {
    showToast('Product draft saved successfully!');
  };

  const handlePublish = () => {
    showToast('Product submitted for review! It will be live within 2 hours.');
    setTimeout(() => {
      router.push('/seller-products');
    }, 1500);
  };

  return (
    <div className="space-y-6 select-none relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#064e3b] text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Bar: Breadcrumb + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/seller-products"
            className="text-gray-400 hover:text-gray-700 transition"
          >
            Products
          </Link>
          <span className="text-gray-300">›</span>
          <span className="font-extrabold text-gray-950">Add product</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs cursor-pointer"
          >
            Save draft
          </button>

          <button
            type="button"
            onClick={handlePublish}
            className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-98 text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Form Cards (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
            <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
              Basic information
            </h3>

            {/* Product Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Product name *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Wireless ANC Headphones – 40h Battery"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 font-medium outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
              />
            </div>

            {/* Category & Brand row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-xs sm:text-sm font-medium text-gray-800 outline-none focus:border-[#059669] cursor-pointer"
                  >
                    <option value="Electronics > Headphones">Electronics &gt; Headphones</option>
                    <option value="Electronics > Smartwatches">Electronics &gt; Smartwatches</option>
                    <option value="Electronics > Chargers & Cables">Electronics &gt; Chargers & Cables</option>
                    <option value="Electronics > Speakers">Electronics &gt; Speakers</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Brand
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. boAt, Sony, Apple"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-gray-900 font-medium outline-none focus:border-[#059669] transition"
                />
              </div>
            </div>

            {/* Description with formatting toolbar */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Description
              </label>
              <div className="border border-gray-200 rounded-2xl overflow-hidden focus-within:border-[#059669] transition">
                {/* Formatting Mini Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-[#fafbfb] text-gray-500">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200/60 hover:text-gray-900 transition"
                    title="Bold"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200/60 hover:text-gray-900 transition"
                    title="Italic"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200/60 hover:text-gray-900 transition"
                    title="Bullet list"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg hover:bg-gray-200/60 hover:text-gray-900 transition"
                    title="Link"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe key features, warranty, specifications..."
                  className="w-full p-3.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 outline-none resize-y"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Product Images */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
                Product images
              </h3>
              <span className="text-xs text-gray-400 font-medium">
                {images.length} / 8 · first image is the cover
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {images.map((imgUrl, idx) => {
                const isCover = idx === 0;

                return (
                  <div
                    key={idx}
                    className={`relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border-2 transition ${
                      isCover ? 'border-[#10b981]' : 'border-gray-200/80'
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Product image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Cover Pill */}
                    {isCover && (
                      <span className="absolute bottom-2 left-2 bg-[#10b981] text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow-xs">
                        COVER
                      </span>
                    )}

                    {/* Delete Icon */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/90 text-gray-600 hover:text-rose-600 flex items-center justify-center shadow-xs transition"
                      aria-label="Remove image"
                    >
                      <X className="w-3 h-3 stroke-[2.5]" />
                    </button>
                  </div>
                );
              })}

              {/* Upload Dropzone */}
              {images.length < 8 && (
                <div
                  onClick={() =>
                    setImages((prev) => [
                      ...prev,
                      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80',
                    ])
                  }
                  className="aspect-square rounded-2xl border-2 border-dashed border-emerald-300 hover:border-[#10b981] bg-[#f0fdf4]/50 hover:bg-[#f0fdf4] flex flex-col items-center justify-center p-3 text-center cursor-pointer transition group"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-800">
                    Drop images or browse
                  </span>
                  <span className="text-[9px] text-gray-400 mt-0.5">
                    JPG/PNG, min 800×800
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Pricing */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
            <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
              Pricing
            </h3>

            {/* Inputs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* MRP */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  MRP *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={mrp}
                    onChange={(e) => setMrp(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              {/* Selling Price */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Selling price *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-semibold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              {/* GST rate */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  GST rate
                </label>
                <div className="relative">
                  <select
                    value={gstRate}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-xs sm:text-sm font-medium text-gray-800 outline-none focus:border-[#059669] cursor-pointer"
                  >
                    <option value={0}>0%</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18%</option>
                    <option value={28}>28%</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Calculated Breakdown Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Box 1: Discount shown */}
              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100">
                <span className="block text-[11px] text-gray-400 font-medium">
                  Discount shown
                </span>
                <span className="block text-sm font-extrabold text-[#d97706] mt-0.5">
                  {discountPercent}% off
                </span>
              </div>

              {/* Box 2: Commission */}
              <div className="bg-[#f8faf9] rounded-2xl p-3 border border-gray-100">
                <span className="block text-[11px] text-gray-400 font-medium">
                  Bazaario commission (8%)
                </span>
                <span className="block text-sm font-bold text-gray-700 mt-0.5">
                  -₹{commissionAmount.toFixed(2)}
                </span>
              </div>

              {/* Box 3: You earn per unit */}
              <div className="bg-[#e6f4ea] rounded-2xl p-3 border border-emerald-200/60">
                <span className="block text-[11px] text-[#059669] font-medium">
                  You earn per unit
                </span>
                <span className="block text-base font-black text-[#059669] mt-0.5">
                  ₹{sellerEarning.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Card 4 & 5: Inventory & Variants Side-by-Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left: Inventory */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
              <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
                Inventory
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  SKU
                </label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="e.g. SE-HP-0142"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Stock qty
                  </label>
                  <input
                    type="number"
                    value={stockQty}
                    onChange={(e) => setStockQty(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Alert below
                  </label>
                  <input
                    type="number"
                    value={alertBelow}
                    onChange={(e) => setAlertBelow(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>
            </div>

            {/* Right: Variants */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
              <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
                Variants
              </h3>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Colour
                </label>

                {/* Color pills */}
                <div className="flex items-center gap-2 flex-wrap">
                  {colors.map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-bold text-gray-800 shadow-2xs"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.dotColor }}
                      />
                      <span>{c.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(c.id)}
                        className="ml-0.5 text-gray-400 hover:text-gray-700 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {/* Add Color Button */}
                  {showAddColor ? (
                    <div className="inline-flex items-center gap-1 bg-gray-50 border border-emerald-300 rounded-full px-2 py-0.5">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Color name"
                        value={newColorInput}
                        onChange={(e) => setNewColorInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddColor()}
                        className="w-20 text-xs px-1 py-0.5 bg-transparent outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="text-xs font-bold text-[#059669] hover:underline px-1"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddColor(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-bold text-[#059669] hover:bg-emerald-50 transition cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Options: Size, RAM, Storage, Material...')}
                  className="text-xs font-bold text-[#059669] hover:underline cursor-pointer"
                >
                  + Add another option (size, storage...)
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Fulfilment & Policies */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xs p-5 sm:p-7 space-y-4">
            <h3 className="text-base font-extrabold text-gray-950 tracking-tight">
              Fulfilment & policies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Policy 1: Home Delivery */}
              <div
                onClick={() =>
                  setPolicies({ ...policies, homeDelivery: !policies.homeDelivery })
                }
                className="p-4 rounded-2xl border border-gray-200/90 hover:border-emerald-300 flex items-start gap-3.5 cursor-pointer transition bg-white"
              >
                <div className="mt-0.5 text-[#059669]">
                  {policies.homeDelivery ? (
                    <CheckSquare className="w-4 h-4 fill-emerald-100 text-[#059669]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Home delivery
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Within 6 km of your shop
                  </p>
                </div>
              </div>

              {/* Policy 2: Store Pickup */}
              <div
                onClick={() =>
                  setPolicies({ ...policies, storePickup: !policies.storePickup })
                }
                className="p-4 rounded-2xl border border-gray-200/90 hover:border-emerald-300 flex items-start gap-3.5 cursor-pointer transition bg-white"
              >
                <div className="mt-0.5 text-[#059669]">
                  {policies.storePickup ? (
                    <CheckSquare className="w-4 h-4 fill-emerald-100 text-[#059669]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Store pickup
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Customer collects from shop
                  </p>
                </div>
              </div>

              {/* Policy 3: Cash on Delivery */}
              <div
                onClick={() => setPolicies({ ...policies, cod: !policies.cod })}
                className="p-4 rounded-2xl border border-gray-200/90 hover:border-emerald-300 flex items-start gap-3.5 cursor-pointer transition bg-white"
              >
                <div className="mt-0.5 text-[#059669]">
                  {policies.cod ? (
                    <CheckSquare className="w-4 h-4 fill-emerald-100 text-[#059669]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    Cash on delivery
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Allow COD for this product
                  </p>
                </div>
              </div>

              {/* Policy 4: 7-day returns */}
              <div
                onClick={() => setPolicies({ ...policies, returns: !policies.returns })}
                className="p-4 rounded-2xl border border-gray-200/90 hover:border-emerald-300 flex items-start gap-3.5 cursor-pointer transition bg-white"
              >
                <div className="mt-0.5 text-[#059669]">
                  {policies.returns ? (
                    <CheckSquare className="w-4 h-4 fill-emerald-100 text-[#059669]" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    7-day returns
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Unused, original packaging
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Live Preview & Visibility (4 cols on desktop) */}
        <div className="lg:col-span-4 sticky top-6">
          <ProductLivePreviewCard
            productName={productName}
            price={sellingPrice}
            originalPrice={mrp}
            image={images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'}
            storeName="Sharma Electronics"
            storeDistance="1.2 km"
            visibility={visibility}
            onVisibilityChange={setVisibility}
          />
        </div>
      </div>
    </div>
  );
}

