'use client';

import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Edit2,
  Package,
  Layers,
  FileText,
  ShieldCheck,
  Check,
} from 'lucide-react';
import AdminSidebar from './AdminSidebar';
import AdminHeaderNav from './AdminHeaderNav';

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  shopsCount: number;
  productsCount: number;
  commission: number;
  badgeDoc?: 'FSSAI' | 'GST' | 'Drug license';
  active: boolean;
  expanded?: boolean;
  subcategories: string[];
}

export default function AdminCategoriesView() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: '1',
      name: 'Grocery & Staples',
      icon: '🥕',
      shopsCount: 412,
      productsCount: 3210,
      commission: 5,
      badgeDoc: 'FSSAI',
      active: true,
      expanded: true,
      subcategories: ['Fruits & Vegetables', 'Rice, Atta & Dal', 'Dairy & Bakery', 'Snacks', 'Beverages'],
    },
    {
      id: '2',
      name: 'Fashion & Ethnic',
      icon: '👗',
      shopsCount: 231,
      productsCount: 2854,
      commission: 12,
      badgeDoc: 'GST',
      active: true,
      expanded: false,
      subcategories: ['Women Ethnic', 'Men Casuals', 'Kids Wear', 'Footwear'],
    },
    {
      id: '3',
      name: 'Electronics',
      icon: '📱',
      shopsCount: 196,
      productsCount: 1920,
      commission: 8,
      badgeDoc: 'GST',
      active: true,
      expanded: false,
      subcategories: ['Smartphones', 'Audio & Headphones', 'Accessories', 'Smartwatches'],
    },
    {
      id: '4',
      name: 'Pharmacy & Beauty',
      icon: '💊',
      shopsCount: 148,
      productsCount: 988,
      commission: 6,
      badgeDoc: 'Drug license',
      active: true,
      expanded: false,
      subcategories: ['Medicines', 'Personal Care', 'Baby Care', 'Vitamins & Supplements'],
    },
    {
      id: '5',
      name: 'Home & Kitchen',
      icon: '🛋️',
      shopsCount: 184,
      productsCount: 1402,
      commission: 10,
      badgeDoc: 'GST',
      active: true,
      expanded: false,
      subcategories: ['Cookware', 'Storage & Containers', 'Decor & Lighting', 'Bedding'],
    },
  ]);

  // Add Category form state
  const [newCatName, setNewCatName] = useState('Stationery & Books');
  const [newCatCommission, setNewCatCommission] = useState(7);
  const [selectedIconIdx, setSelectedIconIdx] = useState(0);
  const [requireGst, setRequireGst] = useState(true);
  const [requireFssai, setRequireFssai] = useState(false);
  const [requireDrug, setRequireDrug] = useState(false);
  const [showHomepage, setShowHomepage] = useState(true);

  const iconsList = ['📗', '✒️', '🎁', '🐾', '👶', '🏋️'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleExpand = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, expanded: !c.expanded } : c))
    );
  };

  const toggleActive = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    showToast('Category visibility updated');
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const newCat: CategoryItem = {
      id: String(Date.now()),
      name: newCatName,
      icon: iconsList[selectedIconIdx] || '📦',
      shopsCount: 0,
      productsCount: 0,
      commission: newCatCommission,
      badgeDoc: requireGst ? 'GST' : undefined,
      active: true,
      expanded: false,
      subcategories: ['General'],
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCatName}" created successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex antialiased">
      {/* Sidebar */}
      <AdminSidebar
        activeTab="categories"
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeaderNav onOpenSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                Categories
              </h1>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                8 main categories · 46 sub-categories
              </p>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Category List */}
            <div className="lg:col-span-7 space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs overflow-hidden transition"
                >
                  <div className="p-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleExpand(cat.id)}
                        className="text-slate-400 hover:text-slate-600 transition"
                      >
                        {cat.expanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-lg shadow-2xs">
                        {cat.icon}
                      </div>

                      {/* Title & Stats */}
                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                          {cat.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 font-medium">
                          {cat.shopsCount} shops · {cat.productsCount.toLocaleString('en-IN')} products
                        </p>
                      </div>
                    </div>

                    {/* Right Meta and Actions */}
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                        {cat.commission}%
                      </span>

                      {cat.badgeDoc && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          <FileText className="w-3 h-3 text-slate-400" />
                          <span>{cat.badgeDoc}</span>
                        </span>
                      )}

                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleActive(cat.id)}
                        className={`w-9 h-5 rounded-full transition relative flex items-center ${
                          cat.active ? 'bg-[#10b981]' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-full bg-white shadow-xs transition transform ${
                            cat.active ? 'translate-x-4.5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>

                      <button
                        onClick={() => showToast(`Edit category ${cat.name}`)}
                        className="text-slate-400 hover:text-slate-700 p-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Subcategories */}
                  {cat.expanded && (
                    <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-gray-100 flex flex-wrap gap-2 items-center">
                      {cat.subcategories.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-gray-200/80 text-slate-700 shadow-2xs"
                        >
                          {sub}
                        </span>
                      ))}

                      <button
                        onClick={() => showToast(`Add subcategory to ${cat.name}`)}
                        className="text-xs font-bold px-3 py-1 rounded-full border border-dashed border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition flex items-center gap-1"
                      >
                        <span>+ Sub</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right 5 cols: Add Category Form */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-6 space-y-4">
              <h3 className="font-black text-slate-900 text-base tracking-tight">
                Add category
              </h3>

              <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Category name
                  </label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20"
                    placeholder="e.g. Stationery & Books"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Parent
                  </label>
                  <select className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20">
                    <option>None (main category)</option>
                    <option>Grocery & Staples</option>
                    <option>Fashion & Ethnic</option>
                    <option>Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1.5">
                    Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconsList.map((ic, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedIconIdx(i)}
                        className={`h-9 rounded-xl border text-base flex items-center justify-center transition ${
                          selectedIconIdx === i
                            ? 'border-[#10b981] bg-emerald-50/50 shadow-2xs ring-1 ring-[#10b981]'
                            : 'border-gray-200 hover:bg-slate-50'
                        }`}
                      >
                        {ic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">
                    Commission
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={newCatCommission}
                      onChange={(e) => setNewCatCommission(Number(e.target.value))}
                      className="w-20 bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#10b981]/20 text-center"
                    />
                    <span className="font-bold text-slate-400">%</span>
                  </div>
                </div>

                {/* Required seller documents */}
                <div className="space-y-2 pt-1">
                  <label className="text-[11px] font-bold text-slate-500 block">
                    Required seller documents
                  </label>
                  <div className="space-y-1.5 font-semibold text-slate-700">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={requireGst}
                        onChange={(e) => setRequireGst(e.target.checked)}
                        className="rounded text-[#10b981] focus:ring-0"
                      />
                      <span>GSTIN</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={requireFssai}
                        onChange={(e) => setRequireFssai(e.target.checked)}
                        className="rounded text-[#10b981] focus:ring-0"
                      />
                      <span>FSSAI license</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={requireDrug}
                        onChange={(e) => setRequireDrug(e.target.checked)}
                        className="rounded text-[#10b981] focus:ring-0"
                      />
                      <span>Drug license</span>
                    </label>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 font-bold text-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showHomepage}
                      onChange={(e) => setShowHomepage(e.target.checked)}
                      className="rounded text-[#10b981] focus:ring-0"
                    />
                    <span>Show on homepage</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs shadow-xs transition mt-2"
                >
                  + Create category
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

