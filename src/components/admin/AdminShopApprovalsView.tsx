'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Store,
  Clock,
  Phone,
  CheckCircle2,
  AlertCircle,
  FileText,
  Eye,
  Check,
  X,
  Send,
  Building2,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  ChevronLeft,
  Filter,
} from 'lucide-react';

export interface ShopApplication {
  id: string;
  appNumber: string;
  name: string;
  category: string;
  location: string;
  address: string;
  initials: string;
  color: string;
  timeAgo: string;
  slaLeft?: string;
  status: 'pending' | 'needs_info' | 'approved' | 'rejected';
  tagText: string;
  tagColor: 'amber' | 'blue' | 'green' | 'red';
  alertNote?: string;
  coverImage: string;
  hours: string;
  fulfilment: string;
  phone: string;
  owner: {
    name: string;
    email: string;
    avatar: string;
    pan: string;
    gstin: string;
  };
  kyc: {
    panVerified: boolean;
    aadhaarVerified: boolean;
    udyamVerified: boolean;
    shopPhotoMissing: boolean;
    bankName: string;
    accountLast4: string;
    pennyMatchName: string;
    pennyVerified: boolean;
  };
  commissionRate: string;
  internalNote: string;
}

const APPLICATIONS_DATA: ShopApplication[] = [
  {
    id: 'sharma',
    appNumber: '#APP-2291',
    name: 'Sharma Electronics',
    category: 'Electronics & Mobiles',
    location: 'Andheri West',
    address: 'Shop 14, Lokhandwala Market, Andheri West, Mumbai 400053',
    initials: 'SE',
    color: 'bg-[#064e3b]',
    timeAgo: 'Submitted 2h ago',
    slaLeft: 'SLA 46h left',
    status: 'pending',
    tagText: 'PENDING',
    tagColor: 'amber',
    coverImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1400&q=80',
    hours: '10 AM – 9:30 PM',
    fulfilment: 'Delivery + Pickup',
    phone: '+91 98330 21045',
    owner: {
      name: 'Rajesh Sharma',
      email: 'rajesh@sharmaelectronics.in',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      pan: 'ABCPS1234K',
      gstin: '27ABCPS1234K1Z5',
    },
    kyc: {
      panVerified: true,
      aadhaarVerified: false,
      udyamVerified: true,
      shopPhotoMissing: true,
      bankName: 'HDFC',
      accountLast4: '8823',
      pennyMatchName: 'SHARMA ELECTRONICS',
      pennyVerified: true,
    },
    commissionRate: '8% - Electronics default',
    internalNote: 'Called owner, verified address.',
  },
  {
    id: 'glow',
    appNumber: '#APP-2288',
    name: 'Glow Medicos',
    category: 'Pharmacy',
    location: 'Bandra West',
    address: 'Shop 3, Hill Road, Bandra West, Mumbai 400050',
    initials: 'GM',
    color: 'bg-[#e11d48]',
    timeAgo: 'Submitted 5h ago',
    slaLeft: 'SLA 43h left',
    status: 'pending',
    tagText: 'PENDING',
    tagColor: 'amber',
    alertNote: 'Drug license required',
    coverImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=1400&q=80',
    hours: '9 AM – 11:00 PM',
    fulfilment: 'Delivery Only',
    phone: '+91 98200 44102',
    owner: {
      name: 'Sunita Rao',
      email: 'sunita@glowmedicos.com',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      pan: 'BXTPR9821L',
      gstin: '27BXTPR9821L1Z2',
    },
    kyc: {
      panVerified: true,
      aadhaarVerified: true,
      udyamVerified: false,
      shopPhotoMissing: false,
      bankName: 'ICICI',
      accountLast4: '4190',
      pennyMatchName: 'GLOW MEDICOS CHEMIST',
      pennyVerified: true,
    },
    commissionRate: '6% - Pharmacy default',
    internalNote: 'Waiting for Form 20/21 pharmacy license copy.',
  },
  {
    id: 'kala',
    appNumber: '#APP-2279',
    name: 'Kala Crafts',
    category: 'Home Decor',
    location: 'Juhu',
    address: '12 Juhu Tara Road, Juhu, Mumbai 400049',
    initials: 'KC',
    color: 'bg-[#6366f1]',
    timeAgo: 'Waiting on GSTIN · 1d',
    status: 'needs_info',
    tagText: 'NEEDS INFO',
    tagColor: 'blue',
    coverImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80',
    hours: '11 AM – 8:00 PM',
    fulfilment: 'Pickup Only',
    phone: '+91 97110 59201',
    owner: {
      name: 'Karan Choudhury',
      email: 'karan@kalacrafts.in',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      pan: 'CKMPK4401M',
      gstin: 'Pending verification',
    },
    kyc: {
      panVerified: true,
      aadhaarVerified: false,
      udyamVerified: false,
      shopPhotoMissing: false,
      bankName: 'Axis Bank',
      accountLast4: '7721',
      pennyMatchName: 'KALA CRAFTS STUDIO',
      pennyVerified: true,
    },
    commissionRate: '10% - Home & Lifestyle',
    internalNote: 'Requested updated GSTIN certificate on 30 Oct.',
  },
  {
    id: 'fresh',
    appNumber: '#APP-2275',
    name: 'Fresh Farm Dairy',
    category: 'Grocery',
    location: 'Versova',
    address: 'Gala 5, Yari Road, Versova, Mumbai 400061',
    initials: 'FF',
    color: 'bg-[#d97706]',
    timeAgo: 'Submitted 1d ago',
    status: 'pending',
    tagText: 'PENDING',
    tagColor: 'amber',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80',
    hours: '6 AM – 9:00 PM',
    fulfilment: 'Delivery + Pickup',
    phone: '+91 98331 88402',
    owner: {
      name: 'Ramesh Patel',
      email: 'ramesh@freshfarm.co.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      pan: 'AAPPR7891N',
      gstin: '27AAPPR7891N1Z9',
    },
    kyc: {
      panVerified: true,
      aadhaarVerified: true,
      udyamVerified: true,
      shopPhotoMissing: false,
      bankName: 'SBI',
      accountLast4: '3029',
      pennyMatchName: 'FRESH FARM DAIRY',
      pennyVerified: true,
    },
    commissionRate: '5% - Grocery default',
    internalNote: 'FSSAI registration verified online.',
  },
  {
    id: 'urban',
    appNumber: '#APP-2271',
    name: 'Urban Threads',
    category: 'Fashion',
    location: 'Malad',
    address: 'Linking Road Extension, Malad West, Mumbai 400064',
    initials: 'UT',
    color: 'bg-[#0284c7]',
    timeAgo: 'Submitted 2d ago',
    status: 'pending',
    tagText: 'PENDING',
    tagColor: 'amber',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
    hours: '11 AM – 10:00 PM',
    fulfilment: 'Delivery + Pickup',
    phone: '+91 98212 99014',
    owner: {
      name: 'Pooja Bhatia',
      email: 'pooja@urbanthreads.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      pan: 'ABDPB9123Q',
      gstin: '27ABDPB9123Q1Z8',
    },
    kyc: {
      panVerified: true,
      aadhaarVerified: true,
      udyamVerified: true,
      shopPhotoMissing: false,
      bankName: 'Kotak Bank',
      accountLast4: '6618',
      pennyMatchName: 'URBAN THREADS BOUTIQUE',
      pennyVerified: true,
    },
    commissionRate: '12% - Fashion default',
    internalNote: 'High ratings in local market, all papers clean.',
  },
];

interface AdminShopApprovalsViewProps {
  className?: string;
}

export default function AdminShopApprovalsView({ className = '' }: AdminShopApprovalsViewProps) {
  const [applications, setApplications] = useState<ShopApplication[]>(APPLICATIONS_DATA);
  const [selectedId, setSelectedId] = useState<string>('sharma');
  const [filterTab, setFilterTab] = useState<'pending' | 'needs_info' | 'approved' | 'rejected'>('pending');

  // Modals & Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRequestInfoModalOpen, setIsRequestInfoModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('Missing mandatory regulatory license');
  const [requestInfoText, setRequestInfoText] = useState('Please upload clear signboard and shopfront photograph.');

  const selectedApp = applications.find((a) => a.id === selectedId) || applications[0];

  const filteredApps = applications.filter((app) => {
    if (filterTab === 'pending') return app.status === 'pending';
    if (filterTab === 'needs_info') return app.status === 'needs_info';
    if (filterTab === 'approved') return app.status === 'approved';
    if (filterTab === 'rejected') return app.status === 'rejected';
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? { ...app, status: 'approved', tagText: 'APPROVED', tagColor: 'green' }
          : app
      )
    );
    showToast(`🎉 ${selectedApp.name} approved & successfully published live on Bazaario!`);
  };

  const handleConfirmReject = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? { ...app, status: 'rejected', tagText: 'REJECTED', tagColor: 'red' }
          : app
      )
    );
    setIsRejectModalOpen(false);
    showToast(`Application for ${selectedApp.name} rejected.`);
  };

  const handleConfirmRequestInfo = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? {
              ...app,
              status: 'needs_info',
              tagText: 'NEEDS INFO',
              tagColor: 'blue',
              timeAgo: 'Waiting on seller · Just now',
            }
          : app
      )
    );
    setIsRequestInfoModalOpen(false);
    showToast(`Request sent to ${selectedApp.name} via email & SMS.`);
  };

  const toggleAadhaarVerified = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApp.id
          ? {
              ...app,
              kyc: { ...app.kyc, aadhaarVerified: !app.kyc.aadhaarVerified },
            }
          : app
      )
    );
  };

  return (
    <div className={`w-full space-y-6 select-none ${className}`}>
      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
            Shop approvals
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
            Verify KYC & documents before shops go live
          </p>
        </div>

        {/* Top Header Metrics Badges */}
        <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto text-xs font-bold">
          <div className="bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-amber-800">
            Pending <span className="font-black text-amber-900">12</span>
          </div>
          <div className="bg-sky-50 border border-sky-200/80 px-3 py-1.5 rounded-xl text-sky-800">
            Needs info <span className="font-black text-sky-900">3</span>
          </div>
          <div className="bg-gray-100/90 border border-gray-200 px-3 py-1.5 rounded-xl text-gray-600">
            Avg time <span className="font-black text-gray-800">19h</span>
          </div>
        </div>
      </div>

      {/* ── 2. Master-Detail Workspace (2-Column Grid) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Applications Queue (5 Cols on Desktop) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Filter Tabs */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-3 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              <button
                type="button"
                onClick={() => setFilterTab('pending')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  filterTab === 'pending'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80'
                }`}
              >
                <span>Pending</span>
                <span className="opacity-90">12</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterTab('needs_info')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  filterTab === 'needs_info'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80'
                }`}
              >
                <span>Needs info</span>
                <span className="opacity-90">3</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterTab('approved')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                  filterTab === 'approved'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80'
                }`}
              >
                Approved
              </button>

              <button
                type="button"
                onClick={() => setFilterTab('rejected')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition cursor-pointer whitespace-nowrap ${
                  filterTab === 'rejected'
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100/80'
                }`}
              >
                Rejected
              </button>
            </div>

            {/* Subtle track line matching screenshot */}
            <div className="h-0.5 bg-gray-200/60 rounded-full w-full mt-1.5" />
          </div>

          {/* Applications List */}
          <div className="space-y-3">
            {filteredApps.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200/80 p-8 text-center text-gray-400 text-xs">
                No applications in this category
              </div>
            ) : (
              filteredApps.map((item) => {
                const isSelected = item.id === selectedApp.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`bg-white rounded-3xl p-4.5 border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-2 border-[#10b981] shadow-md ring-4 ring-emerald-500/10'
                        : 'border-gray-200/80 hover:border-gray-300 shadow-2xs hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5 min-w-0">
                        {/* Initial square badge */}
                        <div
                          className={`w-11 h-11 rounded-2xl ${item.color} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-2xs`}
                        >
                          {item.initials}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-black text-gray-950 truncate">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                            {item.category} · {item.location} · {item.appNumber}
                          </p>

                          {/* Alert note if present */}
                          {item.alertNote && (
                            <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1 mt-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{item.alertNote}</span>
                            </p>
                          )}

                          {/* Meta time / SLA */}
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold mt-1.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{item.timeAgo}</span>
                            {item.slaLeft && (
                              <>
                                <span>·</span>
                                <span className="text-gray-500">{item.slaLeft}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tag Badge */}
                      <span
                        className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                          item.tagColor === 'amber'
                            ? 'bg-[#fef3c7] text-[#92400e]'
                            : item.tagColor === 'blue'
                            ? 'bg-[#e0f2fe] text-[#0369a1]'
                            : item.tagColor === 'green'
                            ? 'bg-[#dcfce7] text-[#166534]'
                            : 'bg-[#fee2e2] text-[#991b1b]'
                        }`}
                      >
                        {item.tagText}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Verification & Review Workspace (7 Cols on Desktop) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xs overflow-hidden">
            {/* 1. Shop Banner with Dark Gradient Overlay */}
            <div className="relative h-44 sm:h-52 w-full bg-gray-900 overflow-hidden flex flex-col justify-end p-5 sm:p-6">
              <Image
                src={selectedApp.coverImage}
                alt={selectedApp.name}
                fill
                sizes="(max-width: 1200px) 100vw, 750px"
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-white space-y-1">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {selectedApp.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-200 font-medium">
                  {selectedApp.address}
                </p>
              </div>
            </div>

            {/* 2. Shop Details & Owner Details (2 Cards Grid) */}
            <div className="p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* SHOP Card */}
                <div className="bg-[#fcfdfd] border border-gray-150 rounded-2xl p-4 space-y-2.5">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                    SHOP
                  </span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Category</span>
                      <span className="font-bold text-gray-900">{selectedApp.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Hours</span>
                      <span className="font-bold text-gray-900">{selectedApp.hours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Fulfilment</span>
                      <span className="font-bold text-gray-900">{selectedApp.fulfilment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">Phone</span>
                      <span className="font-bold text-gray-900">{selectedApp.phone}</span>
                    </div>
                  </div>
                </div>

                {/* OWNER Card */}
                <div className="bg-[#fcfdfd] border border-gray-150 rounded-2xl p-4 space-y-2.5">
                  <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                    OWNER
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-gray-200 shrink-0">
                      <Image
                        src={selectedApp.owner.avatar}
                        alt={selectedApp.owner.name}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-xs text-gray-950 truncate">
                        {selectedApp.owner.name}
                      </div>
                      <div className="text-[11px] text-gray-400 truncate font-medium">
                        {selectedApp.owner.email}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs pt-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">PAN</span>
                      <span className="font-mono font-bold text-gray-900">
                        {selectedApp.owner.pan}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-medium">GSTIN</span>
                      <span className="font-mono font-bold text-gray-900">
                        {selectedApp.owner.gstin}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. KYC Documents List */}
              <div className="space-y-3">
                <span className="block text-[10px] font-black uppercase tracking-wider text-gray-400">
                  KYC DOCUMENTS
                </span>

                <div className="space-y-2">
                  {/* PAN Card */}
                  <div className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-black text-gray-900">PAN card</span>
                        <span className="text-[11px] text-[#059669] font-bold ml-2">
                          Auto-verified via NSDL
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => alert(`Viewing PAN document for ${selectedApp.name}`)}
                        className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <div className="flex items-center gap-1 text-[#059669] font-black">
                        <div className="w-4 h-4 rounded bg-[#059669] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Aadhaar (front & back) */}
                  <div className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="font-black text-gray-900">Aadhaar (front & back)</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => alert(`Viewing Aadhaar document for ${selectedApp.name}`)}
                        className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <label className="flex items-center gap-1.5 font-bold text-gray-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedApp.kyc.aadhaarVerified}
                          onChange={toggleAadhaarVerified}
                          className="w-4 h-4 accent-[#059669] rounded cursor-pointer"
                        />
                        <span>Verified</span>
                      </label>
                    </div>
                  </div>

                  {/* Udyam / Shop license */}
                  <div className="bg-[#f8faf9] border border-gray-200/80 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span className="font-black text-gray-900">Udyam / Shop license</span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => alert(`Viewing Udyam certificate for ${selectedApp.name}`)}
                        className="text-gray-500 hover:text-gray-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <div className="flex items-center gap-1 text-[#059669] font-black">
                        <div className="w-4 h-4 rounded bg-[#059669] text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Shop front photo (Alert Box) */}
                  {selectedApp.kyc.shopPhotoMissing && (
                    <div className="bg-[#fff1f2] border border-rose-200/80 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                          <AlertCircle className="w-4 h-4 stroke-[2.2]" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-black text-gray-900">Shop front photo</span>
                          <span className="text-rose-600 font-black ml-2">Missing</span>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold text-gray-400 bg-white/80 border border-gray-200 px-2.5 py-1 rounded-full">
                        Optional for approval
                      </span>
                    </div>
                  )}

                  {/* Bank Account Penny Drop */}
                  <div className="bg-[#edfdf5] border border-emerald-200/80 rounded-2xl p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-black text-gray-900">
                          Bank {selectedApp.kyc.bankName} ••••{selectedApp.kyc.accountLast4}
                        </span>
                        <span className="text-[11px] text-[#059669] font-bold block sm:inline sm:ml-2">
                          ₹1 penny-drop matched &quot;{selectedApp.kyc.pennyMatchName}&quot;
                        </span>
                      </div>
                    </div>

                    <div className="w-5 h-5 rounded-full bg-[#10b981] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Commission Rate & Internal Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                    Commission rate
                  </label>
                  <select
                    defaultValue={selectedApp.commissionRate}
                    className="w-full px-3.5 py-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-bold text-gray-900 outline-none focus:border-[#059669] cursor-pointer"
                  >
                    <option value="8% - Electronics default">8% - Electronics default</option>
                    <option value="5% - Grocery default">5% - Grocery default</option>
                    <option value="6% - Pharmacy default">6% - Pharmacy default</option>
                    <option value="12% - Fashion default">12% - Fashion default</option>
                    <option value="10% - Home & Lifestyle">10% - Home & Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-gray-700 mb-1.5">
                    Internal note
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedApp.internalNote}
                    className="w-full px-3.5 py-2.5 bg-[#f8faf9] border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              {/* 5. Action Footer Buttons */}
              <div className="pt-3 border-t border-gray-150 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-rose-200 bg-white hover:bg-rose-50 text-xs font-bold text-rose-600 transition shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRequestInfoModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>Request more info</span>
                </button>

                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-6 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-95 text-white text-xs font-black transition shadow-sm cursor-pointer flex items-center gap-2"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Approve & make live</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reject Modal ── */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsRejectModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-150 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-rose-950 mb-2">
              Reject Shop Application
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Select the primary reason for rejecting {selectedApp.name}. The seller will receive this explanation via email.
            </p>

            <div className="space-y-3 mb-5">
              {[
                'Missing mandatory regulatory license',
                'Invalid or unverified KYC documents',
                'Shop address unverified / duplicate shop',
                'Prohibited items listed',
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer p-2 rounded-xl hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    checked={rejectReason === reason}
                    onChange={() => setRejectReason(reason)}
                    className="accent-rose-600"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Request More Info Modal ── */}
      {isRequestInfoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsRequestInfoModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-150 animate-in zoom-in-95 duration-200">
            <h3 className="text-base font-black text-gray-950 mb-2">
              Request Additional Information
            </h3>
            <p className="text-xs text-gray-500 mb-4">
              Send a specific request to {selectedApp.name}. Their application SLA will be paused until they reply.
            </p>

            <textarea
              rows={3}
              value={requestInfoText}
              onChange={(e) => setRequestInfoText(e.target.value)}
              className="w-full p-3 bg-[#f8faf9] border border-gray-200 rounded-2xl text-xs font-medium text-gray-900 outline-none focus:border-[#059669] mb-4 resize-none"
            />

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsRequestInfoModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRequestInfo}
                className="px-4 py-2 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white text-xs font-bold"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200 border border-gray-700">
          <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}
    </div>
  );
}

