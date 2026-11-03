'use client';

import React from 'react';
import Image from 'next/image';
import {
  AlertTriangle,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Package,
} from 'lucide-react';

export type ProductStatusType = 'active' | 'low_stock' | 'under_review' | 'out_of_stock' | 'draft';

export interface SellerProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  isVisible: boolean;
  status: ProductStatusType;
  image?: string;
}

interface SellerProductsTableProps {
  products: SellerProductItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onToggleSelectAll: () => void;
  onToggleVisibility: (id: string) => void;
  onEditProduct?: (product: SellerProductItem) => void;
  onDeleteProduct?: (id: string) => void;
  onBulkUpdateStock?: () => void;
  onBulkHide?: () => void;
  onBulkDelete?: () => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export default function SellerProductsTable({
  products,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onToggleVisibility,
  onEditProduct,
  onDeleteProduct,
  onBulkUpdateStock,
  onBulkHide,
  onBulkDelete,
  currentPage = 1,
  totalPages = 3,
  onPageChange,
  className = '',
}: SellerProductsTableProps) {
  const isAllSelected = products.length > 0 && selectedIds.length === products.length;
  const isSomeSelected = selectedIds.length > 0;

  const getStatusBadge = (status: ProductStatusType) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            Active
          </span>
        );
      case 'low_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Low stock
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-sky-50 text-sky-700 border border-sky-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Under review
          </span>
        );
      case 'out_of_stock':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200/80 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Out of stock
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-gray-100 text-gray-600 border border-gray-200/80 shadow-2xs">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden ${className}`}>
      {/* 1. Bulk Actions Banner (Shown when 1 or more items are selected) */}
      {isSomeSelected && (
        <div className="bg-[#f0fdf4] border-b border-emerald-100 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap text-xs">
            <span className="font-extrabold text-[#059669]">
              {selectedIds.length} selected
            </span>
            <span className="text-emerald-200">|</span>
            <button
              type="button"
              onClick={onBulkUpdateStock}
              className="font-bold text-gray-700 hover:text-[#059669] transition cursor-pointer"
            >
              Update stock
            </button>
            <button
              type="button"
              onClick={onBulkHide}
              className="font-bold text-gray-700 hover:text-[#059669] transition cursor-pointer"
            >
              Hide
            </button>
            <button
              type="button"
              onClick={onBulkDelete}
              className="font-bold text-rose-600 hover:text-rose-800 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
          <button
            type="button"
            onClick={onToggleSelectAll}
            className="text-[11px] font-bold text-gray-500 hover:text-gray-800 transition"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* 2. Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse select-none">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider bg-[#fafbfb]">
              <th className="py-3.5 pl-4 sm:pl-6 pr-3 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Select all products"
                  className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-gray-300 cursor-pointer accent-[#059669]"
                />
              </th>
              <th className="py-3.5 px-3 min-w-[260px]">PRODUCT</th>
              <th className="py-3.5 px-3 min-w-[130px]">CATEGORY</th>
              <th className="py-3.5 px-3 min-w-[110px]">PRICE</th>
              <th className="py-3.5 px-3 min-w-[90px]">STOCK</th>
              <th className="py-3.5 px-3 min-w-[90px]">VISIBLE</th>
              <th className="py-3.5 px-3 min-w-[120px]">STATUS</th>
              <th className="py-3.5 pr-4 sm:pr-6 pl-3 text-right w-20">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
            {products.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-gray-400">
                  <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="font-bold text-gray-600">No products found</p>
                  <p className="text-xs text-gray-400 mt-0.5">Try altering your search or filters.</p>
                </td>
              </tr>
            ) : (
              products.map((p) => {
                const isSelected = selectedIds.includes(p.id);

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-[#fcfdfd] transition group ${
                      isSelected ? 'bg-emerald-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 pl-4 sm:pl-6 pr-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect(p.id)}
                        aria-label={`Select ${p.name}`}
                        className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] border-gray-300 cursor-pointer accent-[#059669]"
                      />
                    </td>

                    {/* Product Name, SKU & Thumbnail */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden relative shrink-0 flex items-center justify-center">
                          {p.image ? (
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Package className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-gray-900 group-hover:text-[#059669] transition truncate max-w-xs sm:max-w-sm">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-medium">
                            {p.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-3 font-medium text-gray-600">
                      {p.category}
                    </td>

                    {/* Price with strikethrough original price */}
                    <td className="py-3.5 px-3">
                      <div className="font-extrabold text-gray-950">
                        ₹{p.price.toLocaleString('en-IN')}
                      </div>
                      {p.originalPrice && (
                        <div className="text-[10px] text-gray-400 line-through">
                          ₹{p.originalPrice.toLocaleString('en-IN')}
                        </div>
                      )}
                    </td>

                    {/* Stock Count */}
                    <td className="py-3.5 px-3">
                      {p.status === 'low_stock' ? (
                        <span className="flex items-center gap-1 font-extrabold text-rose-600">
                          <AlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>{p.stock}</span>
                        </span>
                      ) : p.stock === 0 ? (
                        <span className="font-extrabold text-rose-600">
                          0
                        </span>
                      ) : (
                        <span className="font-bold text-gray-800">
                          {p.stock}
                        </span>
                      )}
                    </td>

                    {/* Visibility Toggle Switch */}
                    <td className="py-3.5 px-3">
                      <button
                        type="button"
                        onClick={() => onToggleVisibility(p.id)}
                        className={`w-11 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer focus:outline-none ${
                          p.isVisible ? 'bg-[#10b981]' : 'bg-gray-200'
                        }`}
                        aria-label={`Toggle visibility for ${p.name}`}
                      >
                        <span
                          className={`block w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform ${
                            p.isVisible ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-3">
                      {getStatusBadge(p.status)}
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="py-3.5 pr-4 sm:pr-6 pl-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => onEditProduct?.(p)}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
                          title="Edit product"
                        >
                          <Pencil className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProduct?.(p.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 3. Pagination Footer */}
      <div className="border-t border-gray-100 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500 font-medium">
          Showing 1-{products.length} of 185
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange?.(currentPage - 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange?.(page)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                currentPage === page
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange?.(currentPage + 1)}
            className="w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

