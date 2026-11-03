'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Clock,
  Trash2,
  Edit2,
  MapPin,
  Phone,
  CreditCard,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function RentalCartView() {
  const router = useRouter();

  // Fulfilment mode
  const [fulfilmentMode, setFulfilmentMode] = useState<'pickup' | 'delivery'>('pickup');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'stripe' | 'paypal' | 'square'>('card');

  // Quantities
  const [airMoverQty, setAirMoverQty] = useState(5);
  const [airMoverWithTech, setAirMoverWithTech] = useState(true);
  const [lgrDehumQty, setLgrDehumQty] = useState(2);
  const [lgrWithTech, setLgrWithTech] = useState(false);

  // Addons under Item 1
  const [pairedDehumidifierQty, setPairedDehumidifierQty] = useState(1);
  const [pairedVacuumQty, setPairedVacuumQty] = useState(1);
  const [hasPairedDehumidifier, setHasPairedDehumidifier] = useState(true);
  const [hasPairedVacuum, setHasPairedVacuum] = useState(true);

  // Dates state
  const [hireDateString, setHireDateString] = useState('15 June 09:30 AM - 25 June 10:00 PM');
  const [isEditingDate, setIsEditingDate] = useState(false);

  // Summary figures matching screenshot
  const subTotal = 1700.0;
  const deposit = 800.0; // Refundable security deposit
  const technicianFees = airMoverWithTech ? 80.0 : 0.0;
  const memberDiscount = 20.0;
  const totalPay = subTotal + deposit + technicianFees - memberDiscount;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased">
      <Navbar cartCount={airMoverQty + lgrDehumQty} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
        {/* Header Row */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-200/80">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Shopping Cart: 4 items
          </h1>
          <div className="flex items-center gap-4 text-xs font-bold">
            <button
              onClick={() => {
                if (confirm('Clear all items from rental cart?')) {
                  router.push('/rental');
                }
              }}
              className="text-rose-600 hover:underline"
            >
              Remove All
            </button>
            <Link href="/rental" className="text-slate-600 hover:text-slate-900 underline">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Rental Items */}
          <div className="lg:col-span-8 space-y-6">
            {/* Item 1: Axial Air Mover + Paired Add-ons */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 space-y-5">
              {/* Main equipment header */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-gray-100 overflow-hidden relative shrink-0 p-2">
                    <Image
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80"
                      alt="Axial Air Mover"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 text-base">
                      Axial Air Mover
                    </h3>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-slate-50">
                        <button
                          onClick={() => setAirMoverQty((q) => Math.max(1, q - 1))}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-slate-900">
                          {airMoverQty}
                        </span>
                        <button
                          onClick={() => setAirMoverQty((q) => q + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="font-black text-rose-600 text-sm">
                        $100.00 <span className="text-[10px] text-slate-400 font-medium">incl. GST</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Technician toggle & Delete */}
                <div className="flex flex-col sm:items-end justify-between gap-2 self-stretch">
                  <button className="text-slate-400 hover:text-rose-600 transition p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={airMoverWithTech}
                      onChange={(e) => setAirMoverWithTech(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-0"
                    />
                    <span>With Technician</span>
                    <Info className="w-3 h-3 text-slate-400" />
                  </label>
                </div>
              </div>

              {/* Rate and Dates Bar */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-gray-100 gap-2">
                <span>Rate Applied: <strong className="text-slate-800">$721.00 | Week (3 days)</strong></span>

                <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-xl border border-gray-100">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hireDateString}</span>
                  <button
                    onClick={() => {
                      const newD = prompt('Edit rental period:', hireDateString);
                      if (newD) setHireDateString(newD);
                    }}
                    className="text-slate-400 hover:text-slate-700 ml-1"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Paired Add-ons Section */}
              <div className="bg-slate-50/70 rounded-2xl p-4 space-y-3 border border-slate-100">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  Paired Add-ons
                </span>

                {/* Paired 1: LGR Dehumidifier */}
                {hasPairedDehumidifier && (
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 overflow-hidden relative shrink-0 p-1">
                        <Image
                          src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=100&auto=format&fit=crop&q=80"
                          alt="LGR Dehumidifier"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">LGR Dehumidifier</h5>
                        <p className="text-rose-600 font-bold">$75.00 incl. GST</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-white">
                        <button
                          onClick={() => setPairedDehumidifierQty((q) => Math.max(1, q - 1))}
                          className="w-5 h-5 flex items-center justify-center text-slate-500"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-slate-900">
                          {pairedDehumidifierQty}
                        </span>
                        <button
                          onClick={() => setPairedDehumidifierQty((q) => q + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setHasPairedDehumidifier(false)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Paired 2: HEPA Vacuum */}
                {hasPairedVacuum && (
                  <div className="flex items-center justify-between gap-3 text-xs pt-2 border-t border-slate-200/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 overflow-hidden relative shrink-0 p-1">
                        <Image
                          src="https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100&auto=format&fit=crop&q=80"
                          alt="HEPA Vacuum"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-900">HEPA Vacuum</h5>
                        <p className="text-rose-600 font-bold">$50.00 incl. GST</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg p-0.5 bg-white">
                        <button
                          onClick={() => setPairedVacuumQty((q) => Math.max(1, q - 1))}
                          className="w-5 h-5 flex items-center justify-center text-slate-500"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-slate-900">
                          {pairedVacuumQty}
                        </span>
                        <button
                          onClick={() => setPairedVacuumQty((q) => q + 1)}
                          className="w-5 h-5 flex items-center justify-center text-slate-500"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => setHasPairedVacuum(false)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Subtotal of item 1 */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-black text-slate-900">Sub-Total</span>
                <span className="text-base font-black text-rose-600">$1550.00 incl. GST</span>
              </div>
            </div>

            {/* Item 2: LGR-Dehumidifier standalone */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-gray-100 overflow-hidden relative shrink-0 p-2">
                    <Image
                      src="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=300&auto=format&fit=crop&q=80"
                      alt="LGR-Dehumidifier"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 text-base">
                      LGR- Dehumidifier
                    </h3>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-slate-50">
                        <button
                          onClick={() => setLgrDehumQty((q) => Math.max(1, q - 1))}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-black text-slate-900">
                          {lgrDehumQty}
                        </span>
                        <button
                          onClick={() => setLgrDehumQty((q) => q + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="font-black text-rose-600 text-sm">
                        $150.00 <span className="text-[10px] text-slate-400 font-medium">incl. GST</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end justify-between gap-2 self-stretch">
                  <button className="text-slate-400 hover:text-rose-600 transition p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={lgrWithTech}
                      onChange={(e) => setLgrWithTech(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-0"
                    />
                    <span>With Technician</span>
                    <Info className="w-3 h-3 text-slate-400" />
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-gray-100 gap-2">
                <span>Rate Applied: <strong className="text-slate-800">$721.00 | Week (7 days)</strong></span>

                <div className="flex items-center gap-1.5 font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded-xl border border-gray-100">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hireDateString}</span>
                  <Edit2 className="w-3 h-3 text-slate-400 cursor-pointer ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hire Details, Deposit & Payment Summary */}
          <div className="lg:col-span-4 space-y-5">
            {/* Set Your Hire Details Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 space-y-4">
              <h3 className="font-black text-slate-900 text-sm tracking-tight">
                Set Your Hire Details
              </h3>

              {/* Pickup vs Delivery radio options */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setFulfilmentMode('pickup')}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    fulfilmentMode === 'pickup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${fulfilmentMode === 'pickup' ? 'bg-[#10b981]' : 'bg-slate-300'}`} />
                  <span>Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfilmentMode('delivery')}
                  className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    fulfilmentMode === 'delivery'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${fulfilmentMode === 'delivery' ? 'bg-[#10b981]' : 'bg-slate-300'}`} />
                  <span>Delivery</span>
                </button>
              </div>

              {/* Branch Address Details */}
              <div className="space-y-2 text-xs text-slate-600 bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 font-black text-slate-900">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Branch Address</span>
                </div>
                <p className="leading-relaxed pl-6 text-slate-700 font-medium">
                  #105, Neville Street, Middle Park, Victoria 3206, Australia
                </p>
                <div className="pl-6 space-y-1 pt-1 text-[11px] text-slate-500">
                  <p>Open time: <strong className="text-slate-700">6:30 AM - 8:00 PM</strong></p>
                  <p>Phone: <strong className="text-slate-700">+61 423 442 459</strong></p>
                </div>
                <div className="pl-6 pt-1">
                  <Link href="#map" className="text-rose-600 font-bold hover:underline">
                    Find on Map ›
                  </Link>
                </div>
              </div>
            </div>

            {/* Payment Summary Card with Deposit */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 space-y-3.5">
              <h3 className="font-black text-slate-900 text-sm tracking-tight">
                Payment Summary
              </h3>

              <div className="space-y-2 text-xs divide-y divide-gray-100">
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Sub-Total</span>
                  <span className="font-black text-slate-900">${subTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-1 items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-700 font-bold">Deposit</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded-md border border-emerald-200">
                      Refundable
                    </span>
                  </div>
                  <span className="font-black text-slate-900">${deposit.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Technician Fees</span>
                  <span className="font-bold text-slate-900">${technicianFees.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Member Discount</span>
                  <span className="font-bold text-emerald-600">-${memberDiscount.toFixed(2)}</span>
                </div>

                <div className="flex justify-between py-2 text-sm pt-2">
                  <span className="font-black text-slate-900">Total Pay</span>
                  <span className="font-black text-rose-600 text-lg">${totalPay.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-5 space-y-3.5">
              <h3 className="font-black text-slate-900 text-sm tracking-tight">
                Payment Method
              </h3>

              <div className="space-y-2 text-xs font-semibold text-slate-700">
                <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-emerald-600 focus:ring-0"
                    />
                    <span>Credit/Debit Card</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">
                    Visa / MC
                  </span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'stripe'}
                      onChange={() => setPaymentMethod('stripe')}
                      className="text-emerald-600 focus:ring-0"
                    />
                    <span>Stripe</span>
                  </div>
                  <span className="text-[10px] text-blue-600 font-black">stripe</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="text-emerald-600 focus:ring-0"
                    />
                    <span>Paypal</span>
                  </div>
                  <span className="text-[10px] text-sky-600 font-black">PayPal</span>
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'square'}
                      onChange={() => setPaymentMethod('square')}
                      className="text-emerald-600 focus:ring-0"
                    />
                    <span>Square</span>
                  </div>
                  <span className="text-[10px] text-slate-700 font-black">Square</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => router.push('/rental/success')}
                className="w-full py-3.5 rounded-2xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-sm shadow-md hover:shadow-lg transition mt-3"
              >
                Confirm Hire & Pay ${totalPay.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Cross-Sell Section: Best Pair with Your Order */}
        <div className="pt-6 space-y-4">
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            Best Pair with Your Order
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                title: 'Low-Profile Air Mover',
                price: '$22.00 per day',
                img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&auto=format&fit=crop&q=80',
              },
              {
                title: 'Centrifugal Air Mover',
                price: '$25.00 per day',
                img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
              },
              {
                title: 'Indirect Industrial Heater',
                price: '$25.00 per day',
                img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=300&auto=format&fit=crop&q=80',
              },
              {
                title: 'Structural Drying Mats',
                price: '$25.00 per day',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&auto=format&fit=crop&q=80',
              },
            ].map((prod, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs p-4 flex flex-col justify-between hover:shadow-md transition relative group"
              >
                <div className="relative h-32 w-full bg-slate-50 rounded-2xl overflow-hidden mb-3 p-2">
                  <Image src={prod.img} alt={prod.title} fill className="object-contain" />
                  <button
                    onClick={() => alert(`Added ${prod.title} to order!`)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-xs transition"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 tracking-tight line-clamp-1">
                    {prod.title}
                  </h4>
                  <p className="text-xs font-black text-rose-600 mt-1">
                    {prod.price} <span className="text-[10px] text-slate-400 font-semibold">incl. GST</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

