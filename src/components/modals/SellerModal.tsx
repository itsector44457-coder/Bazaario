'use client';

import React, { useState } from 'react';
import { X, Store, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface SellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated?: () => void;
}

export default function SellerModal({ isOpen, onClose, onProductCreated }: SellerModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'grocery',
    price: '',
    stockCount: '25',
    seller: 'Rahul Express Mart (Andheri West)',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submit — backend will be added separately
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('Your product is now LIVE on Bazaario for 1,200+ local customers!');
      if (onProductCreated) onProductCreated();
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1800);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#084c37] text-white flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Sell on Bazaario</h3>
              <p className="text-xs text-gray-500">Reach thousands of nearby shoppers with same-day delivery</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMessage ? (
          <div className="p-8 flex flex-col items-center text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 animate-bounce" />
            <h4 className="font-bold text-gray-900 text-lg">Product Listed Successfully!</h4>
            <p className="text-xs text-gray-500 max-w-xs">{successMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Organic Alphonso Mangoes 1 Dozen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600 bg-white"
                >
                  <option value="grocery">Grocery & Fresh</option>
                  <option value="fashion">Fashion & Apparel</option>
                  <option value="electronics">Electronics & Audio</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="accessories">Footwear & Accessories</option>
                  <option value="artisan">Artisan & Handcrafted</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Selling Price (₹) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="e.g. 399"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Shop Name / Seller Tag
              </label>
              <input
                type="text"
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                placeholder="Fresh stock sourced today from local growers..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#084c37] hover:bg-[#063d2c] text-white py-3 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Publishing...' : 'List Product on Bazaario'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
