'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileSpreadsheet,
  Plus,
  Search,
  ChevronDown,
  X,
  Upload,
} from 'lucide-react';
import SellerProductsTable, { SellerProductItem, ProductStatusType } from './SellerProductsTable';

const INITIAL_PRODUCTS: SellerProductItem[] = [
  {
    id: 'prod-1',
    name: 'Wireless ANC Headphones',
    sku: 'SKU SE-HP-0142',
    category: 'Headphones',
    price: 2499,
    originalPrice: 3199,
    stock: 8,
    isVisible: true,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-2',
    name: 'Fit Pro Smartwatch',
    sku: 'SKU SE-SW-0088',
    category: 'Smartwatches',
    price: 3499,
    originalPrice: 4999,
    stock: 15,
    isVisible: true,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-3',
    name: 'Classic Wired Monitor',
    sku: 'SKU SE-HP-0097',
    category: 'Headphones',
    price: 4290,
    stock: 2,
    isVisible: true,
    status: 'low_stock',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-4',
    name: 'Fit Pro Smartwatch LTE',
    sku: 'SKU SE-SW-0091',
    category: 'Smartwatches',
    price: 4799,
    stock: 4,
    isVisible: false,
    status: 'under_review',
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-5',
    name: 'Active 2 Smartwatch',
    sku: 'SKU SE-SW-0072',
    category: 'Smartwatches',
    price: 2199,
    stock: 0,
    isVisible: false,
    status: 'out_of_stock',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prod-6',
    name: 'USB-C 65W Fast Charger',
    sku: 'SKU SE-CH-0210',
    category: 'Chargers',
    price: 1199,
    stock: 30,
    isVisible: false,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80',
  },
];

type FilterTabKey = 'all' | 'active' | 'draft' | 'out_of_stock' | 'under_review';

interface SellerProductsViewProps {
  onOpenAddProduct?: () => void;
  className?: string;
}

export default function SellerProductsView({
  onOpenAddProduct,
  className = '',
}: SellerProductsViewProps) {
  const router = useRouter();
  const [products, setProducts] = useState<SellerProductItem[]>(INITIAL_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState<string[]>(['prod-1', 'prod-2']); // initial 2 selected matching screenshot
  const [activeTab, setActiveTab] = useState<FilterTabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [sortBy, setSortBy] = useState('Recently updated');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [newStockValue, setNewStockValue] = useState<number>(20);
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Headphones',
    price: '',
    originalPrice: '',
    stock: '',
    sku: '',
  });

  const filterTabs: { key: FilterTabKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: 185 },
    { key: 'active', label: 'Active', count: 168 },
    { key: 'draft', label: 'Drafts', count: 6 },
    { key: 'out_of_stock', label: 'Out of stock', count: 7 },
    { key: 'under_review', label: 'Under review', count: 4 },
  ];

  // Selection handlers
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map((p) => p.id));
    }
  };

  // Visibility toggle
  const handleToggleVisibility = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p))
    );
  };

  // Single delete
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  // Bulk actions
  const handleBulkHide = () => {
    setProducts((prev) =>
      prev.map((p) => (selectedIds.includes(p.id) ? { ...p, isVisible: false } : p))
    );
  };

  const handleBulkDelete = () => {
    setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  const handleBulkUpdateStock = () => {
    setIsStockModalOpen(true);
  };

  const applyStockUpdate = () => {
    setProducts((prev) =>
      prev.map((p) =>
        selectedIds.includes(p.id)
          ? {
              ...p,
              stock: newStockValue,
              status: newStockValue <= 3 && newStockValue > 0 ? 'low_stock' : newStockValue === 0 ? 'out_of_stock' : p.status === 'out_of_stock' ? 'active' : p.status,
            }
          : p
      )
    );
    setIsStockModalOpen(false);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name) return;

    const newProd: SellerProductItem = {
      id: `prod-${Date.now()}`,
      name: newProductForm.name,
      sku: newProductForm.sku || `SKU SE-${Math.floor(1000 + Math.random() * 9000)}`,
      category: newProductForm.category,
      price: Number(newProductForm.price) || 999,
      originalPrice: newProductForm.originalPrice ? Number(newProductForm.originalPrice) : undefined,
      stock: Number(newProductForm.stock) || 10,
      isVisible: true,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80',
    };

    setProducts((prev) => [newProd, ...prev]);
    setIsAddModalOpen(false);
    setNewProductForm({
      name: '',
      category: 'Headphones',
      price: '',
      originalPrice: '',
      stock: '',
      sku: '',
    });
  };

  // Filter & Search Logic
  const filteredProducts = products.filter((p) => {
    // 1. Tab filter
    if (activeTab === 'active' && p.status !== 'active' && p.status !== 'low_stock') return false;
    if (activeTab === 'draft' && p.status !== 'draft') return false;
    if (activeTab === 'out_of_stock' && p.status !== 'out_of_stock') return false;
    if (activeTab === 'under_review' && p.status !== 'under_review') return false;

    // 2. Category filter
    if (selectedCategory !== 'All categories' && p.category !== selectedCategory) {
      return false;
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      return matchName || matchSku;
    }

    return true;
  });

  return (
    <div className={`space-y-6 select-none ${className}`}>
      {/* 1. Page Header Title + Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
            Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage your catalogue, prices and stock
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert('Opening CSV import tool...')}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 shadow-2xs transition flex items-center gap-2 cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#059669]" />
            <span>Import CSV</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onOpenAddProduct) {
                onOpenAddProduct();
              } else {
                router.push('/seller-add-product');
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-98 text-white text-xs font-bold shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add product</span>
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {filterTabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-600 border border-gray-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className="ml-1.5 opacity-80">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-3 sm:p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or SKU"
            className="w-full pl-9 pr-3 py-2 bg-[#f8faf9] border border-gray-200/90 rounded-xl text-xs text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
          />
        </div>

        {/* Filters: Category & Sort Dropdowns */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Category Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200/90 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-gray-700 outline-none focus:border-[#059669] cursor-pointer"
            >
              <option value="All categories">All categories</option>
              <option value="Headphones">Headphones</option>
              <option value="Smartwatches">Smartwatches</option>
              <option value="Chargers">Chargers</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200/90 rounded-xl px-3 py-2 pr-8 text-xs font-semibold text-gray-700 outline-none focus:border-[#059669] cursor-pointer"
            >
              <option value="Recently updated">Sort: Recently updated</option>
              <option value="Price low to high">Sort: Price: Low to High</option>
              <option value="Price high to low">Sort: Price: High to Low</option>
              <option value="Stock">Sort: Low stock first</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 4. Products Table */}
      <SellerProductsTable
        products={filteredProducts}
        selectedIds={selectedIds}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onToggleVisibility={handleToggleVisibility}
        onEditProduct={(p) => alert(`Editing product ${p.name}`)}
        onDeleteProduct={handleDeleteProduct}
        onBulkUpdateStock={handleBulkUpdateStock}
        onBulkHide={handleBulkHide}
        onBulkDelete={handleBulkDelete}
        currentPage={currentPage}
        totalPages={3}
        onPageChange={setCurrentPage}
      />

      {/* 5. Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 z-10 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-extrabold text-gray-900">
                Add New Product
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wireless ANC Headphones"
                  value={newProductForm.name}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                  >
                    <option value="Headphones">Headphones</option>
                    <option value="Smartwatches">Smartwatches</option>
                    <option value="Chargers">Chargers</option>
                    <option value="Mobiles">Mobiles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SKU SE-HP-0145"
                    value={newProductForm.sku}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, sku: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="2499"
                    value={newProductForm.price}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, price: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="3199"
                    value={newProductForm.originalPrice}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, originalPrice: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Stock Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="10"
                    value={newProductForm.stock}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, stock: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold shadow-xs transition"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Bulk Stock Update Modal */}
      {isStockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsStockModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 z-10 space-y-4">
            <h3 className="text-base font-extrabold text-gray-900">
              Update Stock for {selectedIds.length} Items
            </h3>
            <p className="text-xs text-gray-500">
              Set new inventory count for all selected products:
            </p>

            <input
              type="number"
              min={0}
              value={newStockValue}
              onChange={(e) => setNewStockValue(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 outline-none focus:border-[#059669]"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsStockModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyStockUpdate}
                className="px-5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-xs transition"
              >
                Apply Stock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

