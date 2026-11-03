'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Send,
  Tag,
  ArrowLeft,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Package,
  PanelRightOpen,
  PanelRightClose,
  PanelLeftClose,
  PanelLeftOpen,
  User,
} from 'lucide-react';
import SellerChatInboxSidebar, { SellerConversation } from './SellerChatInboxSidebar';
import SellerChatCustomerSidebar from './SellerChatCustomerSidebar';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'seller';
  text: string;
  time: string;
  productCard?: {
    title: string;
    price: string;
    image: string;
  };
}

interface ConversationData {
  conversation: SellerConversation;
  productInquiry: {
    title: string;
    price: string;
    image: string;
  };
  orderBanner?: {
    orderId: string;
    amount: string;
    isAccepted?: boolean;
  };
  messages: ChatMessage[];
}

const STORE_PRODUCTS = [
  {
    title: 'Wireless ANC Headphones',
    price: '₹2,499',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Fit Pro Smartwatch',
    price: '₹3,499',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Classic Wired Monitor Headphones',
    price: '₹4,290',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'Fit Pro Smartwatch LTE',
    price: '₹4,799',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=300&q=80',
  },
  {
    title: 'USB-C 65W Fast Charger',
    price: '₹1,199',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80',
  },
];

const INITIAL_CONVERSATIONS_DATA: Record<string, ConversationData> = {
  ananya: {
    conversation: {
      id: 'ananya',
      customerName: 'Ananya Iyer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Is gift wrapping available?',
      time: '2m',
      tag: { text: 'ORDER #48219-A', type: 'order' },
      customerSince: 'Mar 2024',
      location: 'Andheri W',
      totalOrders: 6,
      totalSpent: 14820,
      recentOrders: [
        { id: '#BZ-48219-A', status: 'New' },
        { id: '#BZ-44102', status: 'Delivered' },
        { id: '#BZ-41877', status: 'Delivered' },
      ],
      privateNote: 'Prefers evening delivery.',
    },
    productInquiry: {
      title: 'Wireless ANC Headphones · ₹2,499',
      price: '₹2,499',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    },
    orderBanner: {
      orderId: '#BZ-48219-A',
      amount: '₹2,499',
      isAccepted: false,
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'customer',
        text: "Hi! I just placed an order for these headphones. Is gift wrapping available? It's for my brother's birthday 🎂",
        time: '3:58 PM',
      },
    ],
  },
  karan: {
    conversation: {
      id: 'karan',
      customerName: 'Karan Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Do you have iPhone 15 cases?',
      time: '18m',
      isUnread: true,
      tag: { text: 'ENQUIRY', type: 'enquiry' },
      customerSince: 'Jan 2024',
      location: 'Lokhandwala',
      totalOrders: 2,
      totalSpent: 4200,
      recentOrders: [{ id: '#BZ-43201', status: 'Delivered' }],
      privateNote: 'Looking for rugged silicone case.',
    },
    productInquiry: {
      title: 'Fit Pro Smartwatch · ₹3,499',
      price: '₹3,499',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
    },
    messages: [
      {
        id: 'k-1',
        sender: 'customer',
        text: 'Do you have iPhone 15 cases in matte black? Need one by tomorrow.',
        time: '4:12 PM',
      },
    ],
  },
  meera: {
    conversation: {
      id: 'meera',
      customerName: 'Meera Joshi',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Can I pay by UPI on delivery?',
      time: '25m',
      isUnread: true,
      tag: { text: 'ORDER #48214', type: 'order' },
      customerSince: 'Dec 2023',
      location: 'Four Bungalows',
      totalOrders: 4,
      totalSpent: 8900,
      recentOrders: [
        { id: '#BZ-48214', status: 'New' },
        { id: '#BZ-42110', status: 'Delivered' },
      ],
      privateNote: 'Requires GST invoice on company name.',
    },
    productInquiry: {
      title: 'Fit Pro Smartwatch LTE · ₹4,799',
      price: '₹4,799',
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=300&q=80',
    },
    orderBanner: {
      orderId: '#BZ-48214',
      amount: '₹3,198',
      isAccepted: false,
    },
    messages: [
      {
        id: 'm-1',
        sender: 'customer',
        text: 'Can I pay by UPI on delivery?',
        time: '4:05 PM',
      },
    ],
  },
  rahul: {
    conversation: {
      id: 'rahul',
      customerName: 'Rahul Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'You: Your order is out for delivery 🛵',
      time: '1h',
      tag: { text: 'ORDER #48213-A', type: 'order' },
      customerSince: 'Aug 2023',
      location: 'Andheri West',
      totalOrders: 9,
      totalSpent: 26400,
      recentOrders: [
        { id: '#BZ-48213-A', status: 'New' },
        { id: '#BZ-41009', status: 'Delivered' },
      ],
      privateNote: 'VIP buyer, high repeat orders.',
    },
    productInquiry: {
      title: 'Classic Wired Monitor · ₹4,290',
      price: '₹4,290',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=300&q=80',
    },
    messages: [
      {
        id: 'r-1',
        sender: 'customer',
        text: 'Is my order dispatched today?',
        time: '2:15 PM',
      },
      {
        id: 'r-2',
        sender: 'seller',
        text: 'Your order is out for delivery 🛵',
        time: '2:30 PM',
      },
    ],
  },
  vikram: {
    conversation: {
      id: 'vikram',
      customerName: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
      lastMessage: 'Thanks, will pick it up at 6',
      time: '3h',
      tag: { text: 'PICKUP', type: 'order' },
      customerSince: 'Feb 2024',
      location: 'Versova',
      totalOrders: 1,
      totalSpent: 3499,
      recentOrders: [{ id: '#BZ-48217-B', status: 'New' }],
      privateNote: 'Self pickup customer.',
    },
    productInquiry: {
      title: 'Fit Pro Smartwatch · ₹3,499',
      price: '₹3,499',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
    },
    orderBanner: {
      orderId: '#BZ-48217-B',
      amount: '₹3,499',
      isAccepted: true,
    },
    messages: [
      {
        id: 'v-1',
        sender: 'customer',
        text: 'Can I pick up my order directly from the shop in the evening?',
        time: '1:20 PM',
      },
      {
        id: 'v-2',
        sender: 'seller',
        text: 'Sure Vikram, we keep it packed and ready for you at counter 2.',
        time: '1:32 PM',
      },
      {
        id: 'v-3',
        sender: 'customer',
        text: 'Thanks, will pick it up at 6',
        time: '1:40 PM',
      },
    ],
  },
};

interface SellerMessagesViewProps {
  className?: string;
}

export default function SellerMessagesView({ className = '' }: SellerMessagesViewProps) {
  const router = useRouter();
  const [conversationsData, setConversationsData] = useState<Record<string, ConversationData>>(INITIAL_CONVERSATIONS_DATA);
  const [activeId, setActiveId] = useState('ananya');
  const [filterTab, setFilterTab] = useState('all');
  const [replyInput, setReplyInput] = useState('');
  const [mobileView, setMobileView] = useState<'inbox' | 'chat' | 'customer'>('inbox');
  
  // Collapsible Customer Details Sidebar: default collapsed to give maximum room!
  const [isCustomerSidebarOpen, setIsCustomerSidebarOpen] = useState(false);
  
  // Collapsible Inbox Sidebar for ultra-wide focus mode
  const [isInboxSidebarCollapsed, setIsInboxSidebarCollapsed] = useState(false);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const quickRepliesScrollRef = useRef<HTMLDivElement>(null);
  const chatMessagesEndRef = useRef<HTMLDivElement>(null);

  const activeData = conversationsData[activeId] || conversationsData['ananya'];
  const activeConv = activeData.conversation;
  const activeMessages = activeData.messages;

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, activeId]);

  const quickReplies = [
    'Yes, free gift wrapping 🎁',
    'In stock, order now!',
    'Will deliver within 45 min 🛵',
    'We have black and white options available ✨',
    'GST invoice included with shipment 📄',
  ];

  const handleSendMessage = (textToSend?: string, productToShare?: typeof STORE_PRODUCTS[0]) => {
    const text = textToSend || replyInput;
    if (!text.trim() && !productToShare) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'seller',
      text: text.trim() || `Shared product: ${productToShare?.title}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      productCard: productToShare,
    };

    setConversationsData((prev) => {
      const current = prev[activeId];
      if (!current) return prev;
      return {
        ...prev,
        [activeId]: {
          ...current,
          conversation: {
            ...current.conversation,
            lastMessage: `You: ${newMsg.text}`,
            time: 'Just now',
            isUnread: false,
          },
          messages: [...current.messages, newMsg],
        },
      };
    });

    setReplyInput('');
    setIsShareModalOpen(false);
  };

  const handleAcceptOrder = () => {
    setConversationsData((prev) => {
      const current = prev[activeId];
      if (!current || !current.orderBanner) return prev;
      return {
        ...prev,
        [activeId]: {
          ...current,
          orderBanner: {
            ...current.orderBanner,
            isAccepted: true,
          },
        },
      };
    });
  };

  // User requirement: "jis bi Chat ko khole yeh collapse side ho jaaye"
  // Whenever any chat is opened/clicked, automatically collapse customer details so the chat has full breathing room!
  const handleSelectConversation = (id: string) => {
    setActiveId(id);
    setMobileView('chat');
    setIsCustomerSidebarOpen(false); // Auto-collapse customer sidebar when opening any chat!

    // Mark as read
    setConversationsData((prev) => {
      const item = prev[id];
      if (!item) return prev;
      return {
        ...prev,
        [id]: {
          ...item,
          conversation: {
            ...item.conversation,
            isUnread: false,
          },
        },
      };
    });
  };

  const scrollQuickReplies = (direction: 'left' | 'right') => {
    if (quickRepliesScrollRef.current) {
      const offset = direction === 'left' ? -180 : 180;
      quickRepliesScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const conversationList: SellerConversation[] = Object.values(conversationsData).map(
    (d) => d.conversation
  );

  const filteredConversations = conversationList.filter((c) => {
    if (filterTab === 'unread') return c.isUnread;
    if (filterTab === 'enquiries') return c.tag?.type === 'enquiry';
    if (filterTab === 'orders') return c.tag?.type === 'order';
    return true;
  });

  return (
    <div className={`w-full h-full flex flex-col min-h-0 select-none ${className}`}>
      {/* ── Desktop & Tablet View (>= 768px `md:`) ── */}
      <div className="hidden md:flex flex-1 min-h-0 bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden relative">
        {/* 1. Left: Inbox Conversation List (Collapsible) */}
        <div
          className={`shrink-0 h-full flex flex-col border-r border-gray-150 transition-all duration-300 ease-in-out ${
            isInboxSidebarCollapsed
              ? 'w-16 items-center overflow-hidden'
              : 'w-72 lg:w-80'
          }`}
        >
          {isInboxSidebarCollapsed ? (
            /* Collapsed mini inbox rail */
            <div className="w-full h-full flex flex-col items-center py-4 bg-gray-50/70 justify-between">
              <div className="space-y-4 flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => setIsInboxSidebarCollapsed(false)}
                  className="p-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-emerald-700 shadow-2xs transition"
                  title="Expand Inbox"
                >
                  <PanelLeftOpen className="w-5 h-5 text-[#059669]" />
                </button>

                <div className="space-y-2">
                  {filteredConversations.slice(0, 5).map((conv) => (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => handleSelectConversation(conv.id)}
                      className={`w-10 h-10 rounded-full overflow-hidden relative border-2 transition ${
                        conv.id === activeId
                          ? 'border-[#059669] ring-2 ring-emerald-100 scale-105'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                      title={conv.customerName}
                    >
                      <Image
                        src={conv.avatar}
                        alt={conv.customerName}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col relative">
              <SellerChatInboxSidebar
                conversations={filteredConversations}
                activeId={activeId}
                onSelectConversation={handleSelectConversation}
                activeFilterTab={filterTab}
                onSelectFilterTab={setFilterTab}
                className="border-none"
              />
            </div>
          )}
        </div>

        {/* 2. Middle: Active Chat Stream (Takes full remaining space) */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#fcfdfd] h-full">
          {/* Header with Open/Collapse Sidebar Logo Buttons */}
          <div className="px-5 py-3.5 bg-white border-b border-gray-150 flex items-center justify-between shrink-0 shadow-2xs">
            {/* Customer Info (Clicking also toggles sidebar) */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => setIsInboxSidebarCollapsed(!isInboxSidebarCollapsed)}
                className="p-1.5 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition cursor-pointer"
                title={isInboxSidebarCollapsed ? 'Expand Inbox' : 'Collapse Inbox'}
              >
                {isInboxSidebarCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4 text-[#059669]" />
                ) : (
                  <PanelLeftClose className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <div
                onClick={() => setIsCustomerSidebarOpen(!isCustomerSidebarOpen)}
                className="flex items-center gap-3 cursor-pointer group"
                title="Click to toggle customer details sidebar"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0 border border-gray-200 group-hover:border-emerald-500 transition">
                  <Image
                    src={activeConv.avatar}
                    alt={activeConv.customerName}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-black text-gray-950 truncate group-hover:text-[#059669] transition">
                    {activeConv.customerName}
                  </h3>
                  <span className="flex items-center gap-1.5 text-xs text-[#059669] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Actions: View order + Open Sidebar logo button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push('/seller-orders')}
                className="px-3.5 py-1.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 transition shadow-2xs cursor-pointer"
              >
                View order
              </button>

              {/* ── Open Sidebar Logo Button (Requested by User) ── */}
              <button
                type="button"
                onClick={() => setIsCustomerSidebarOpen(!isCustomerSidebarOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-extrabold transition shadow-2xs cursor-pointer active:scale-95 ${
                  isCustomerSidebarOpen
                    ? 'border-gray-200 bg-gray-100 hover:bg-gray-200/80 text-gray-700'
                    : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100/90 text-[#059669]'
                }`}
                title={isCustomerSidebarOpen ? 'Collapse customer sidebar' : 'Open customer sidebar'}
              >
                {isCustomerSidebarOpen ? (
                  <>
                    <PanelRightClose className="w-4 h-4 text-gray-600" />
                    <span>Collapse</span>
                  </>
                ) : (
                  <>
                    <PanelRightOpen className="w-4 h-4 text-[#059669]" />
                    <span className="font-black">Open Sidebar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {/* Today separator */}
            <div className="text-center my-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white border border-gray-200/70 px-3.5 py-1 rounded-full shadow-2xs">
                Today
              </span>
            </div>

            {/* Product Enquiry Box */}
            {activeData.productInquiry && (
              <div className="max-w-lg bg-white rounded-2xl border border-gray-150 p-3.5 flex items-center gap-3.5 shadow-2xs hover:border-emerald-300 transition">
                <div className="w-12 h-12 rounded-xl bg-[#edf5f0] overflow-hidden relative shrink-0 border border-gray-100">
                  <Image
                    src={activeData.productInquiry.image}
                    alt={activeData.productInquiry.title}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] text-gray-400 font-medium">
                    Customer is asking about
                  </span>
                  <p className="text-xs sm:text-sm font-black text-gray-900 truncate">
                    {activeData.productInquiry.title}
                  </p>
                </div>
              </div>
            )}

            {/* Messages Stream */}
            {activeMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'seller' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-lg p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed ${
                    msg.sender === 'seller'
                      ? 'bg-[#064e3b] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-gray-800 border border-gray-150 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Render shared product card if present */}
                  {msg.productCard && (
                    <div className="mt-2.5 p-2 rounded-xl bg-white/10 border border-white/20 flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-white overflow-hidden relative shrink-0">
                        <Image
                          src={msg.productCard.image}
                          alt={msg.productCard.title}
                          fill
                          sizes="40px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-white">
                        <p className="text-[11px] font-bold truncate">{msg.productCard.title}</p>
                        <p className="text-[10px] opacity-90">{msg.productCard.price}</p>
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* System New Order Banner Pill */}
            {activeData.orderBanner && (
              <div className="text-center pt-2">
                <div className="inline-flex items-center gap-2 bg-[#fefce8] border border-[#fde047] text-[#854d0e] text-xs font-bold px-4 py-2 rounded-full shadow-2xs">
                  <Lock className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    New order {activeData.orderBanner.orderId} · {activeData.orderBanner.amount}
                  </span>
                  <span>·</span>
                  {activeData.orderBanner.isAccepted ? (
                    <span className="text-[#059669] flex items-center gap-1 font-black">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                      Accepted
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleAcceptOrder}
                      className="text-[#059669] hover:underline font-black cursor-pointer"
                    >
                      Accept
                    </button>
                  )}
                </div>
              </div>
            )}

            <div ref={chatMessagesEndRef} />
          </div>

          {/* Quick Replies Track matching reference */}
          <div className="px-4 py-2.5 border-t border-gray-150 bg-[#fafbfb] shrink-0">
            <div className="flex items-center gap-2 pb-1">
              <button
                type="button"
                onClick={() => scrollQuickReplies('left')}
                className="p-1 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>

              <span className="text-xs font-bold text-gray-400 shrink-0">
                Quick replies:
              </span>

              <div
                ref={quickRepliesScrollRef}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1 py-0.5"
              >
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(reply)}
                    className="shrink-0 px-3.5 py-1.5 rounded-full border border-emerald-300 bg-white hover:bg-emerald-50 text-xs font-bold text-[#059669] transition shadow-2xs cursor-pointer active:scale-95"
                  >
                    {reply}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollQuickReplies('right')}
                className="p-1 text-gray-400 hover:text-gray-700 transition cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
            {/* Subtle horizontal track line directly matching screenshot */}
            <div className="h-1 bg-gray-200/70 rounded-full w-full mt-1" />
          </div>

          {/* Bottom Reply Bar */}
          <div className="p-3.5 bg-white border-t border-gray-150 flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-2 transition shadow-2xs shrink-0 cursor-pointer"
            >
              <Tag className="w-4 h-4 text-[#059669]" />
              <span>Share product</span>
            </button>

            <input
              type="text"
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`Reply to ${activeConv.customerName}...`}
              className="flex-1 bg-[#f8faf9] border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]/20 transition"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="w-10 h-10 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-95 text-white flex items-center justify-center shadow-xs transition shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 3. Right: Collapsible Customer Sidebar (Smooth slide & collapse) */}
        <div
          className={`h-full border-l border-gray-150 flex flex-col bg-white transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
            isCustomerSidebarOpen
              ? 'w-72 lg:w-80 opacity-100'
              : 'w-0 border-l-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-72 lg:w-80 h-full flex flex-col">
            <SellerChatCustomerSidebar
              conversation={activeConv}
              onClose={() => setIsCustomerSidebarOpen(false)}
              className="border-none"
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Single Panel View (< 768px `md:hidden`) ── */}
      <div className="md:hidden flex-1 min-h-0 flex flex-col bg-white overflow-hidden">
        {/* Panel 1: Inbox List */}
        {mobileView === 'inbox' && (
          <div className="flex-1 flex flex-col h-full min-h-0">
            <SellerChatInboxSidebar
              conversations={filteredConversations}
              activeId={activeId}
              onSelectConversation={handleSelectConversation}
              activeFilterTab={filterTab}
              onSelectFilterTab={setFilterTab}
              className="w-full border-none h-full"
            />
          </div>
        )}

        {/* Panel 2: Chat Stream */}
        {mobileView === 'chat' && (
          <div className="flex-1 flex flex-col h-full min-h-0 bg-[#fcfdfd]">
            {/* Mobile Header with Open Sidebar button */}
            <div className="px-3.5 py-3 bg-white border-b border-gray-150 flex items-center justify-between shrink-0 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  onClick={() => setMobileView('inbox')}
                  className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-700 transition cursor-pointer"
                  aria-label="Back to inbox"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
                </button>

                <div
                  onClick={() => setMobileView('customer')}
                  className="flex items-center gap-2 cursor-pointer min-w-0"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden relative shrink-0 border border-gray-200">
                    <Image
                      src={activeConv.avatar}
                      alt={activeConv.customerName}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 leading-tight truncate">
                      {activeConv.customerName}
                    </h4>
                    <span className="text-[11px] text-[#059669] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                      Online
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => router.push('/seller-orders')}
                  className="text-xs font-bold text-gray-700 border border-gray-200 px-2.5 py-1.5 rounded-xl shadow-2xs bg-white"
                >
                  Order
                </button>

                {/* Mobile Open Sidebar Logo Button */}
                <button
                  type="button"
                  onClick={() => setMobileView('customer')}
                  className="flex items-center gap-1 p-1.5 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#059669] text-xs font-bold transition shadow-2xs cursor-pointer"
                  title="Open Sidebar"
                >
                  <PanelRightOpen className="w-4 h-4 text-[#059669]" />
                  <span>Profile</span>
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-0">
              {/* Product Enquiry Box */}
              {activeData.productInquiry && (
                <div className="bg-white rounded-2xl border border-gray-150 p-2.5 flex items-center gap-2.5 shadow-2xs">
                  <div className="w-11 h-11 rounded-xl bg-[#edf5f0] overflow-hidden relative shrink-0">
                    <Image
                      src={activeData.productInquiry.image}
                      alt={activeData.productInquiry.title}
                      fill
                      sizes="44px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block text-[10px] text-gray-400">Customer is asking about</span>
                    <p className="text-xs font-black text-gray-900 truncate">
                      {activeData.productInquiry.title}
                    </p>
                  </div>
                </div>
              )}

              {activeMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'seller' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.sender === 'seller'
                        ? 'bg-[#064e3b] text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-gray-800 border border-gray-150 rounded-bl-xs shadow-2xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.productCard && (
                      <div className="mt-2 p-2 rounded-xl bg-white/10 border border-white/20 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white overflow-hidden relative shrink-0">
                          <Image
                            src={msg.productCard.image}
                            alt={msg.productCard.title}
                            fill
                            sizes="32px"
                            className="object-contain p-0.5"
                          />
                        </div>
                        <div className="min-w-0 flex-1 text-white">
                          <p className="text-[10px] font-bold truncate">{msg.productCard.title}</p>
                          <p className="text-[9px] opacity-90">{msg.productCard.price}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {/* Order Event Pill */}
              {activeData.orderBanner && (
                <div className="text-center pt-1">
                  <div className="inline-flex items-center gap-1.5 bg-[#fefce8] border border-[#fde047] text-[#854d0e] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-2xs">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>
                      New order {activeData.orderBanner.orderId} · {activeData.orderBanner.amount}
                    </span>
                    <span>·</span>
                    {activeData.orderBanner.isAccepted ? (
                      <span className="text-[#059669] font-black">Accepted</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleAcceptOrder}
                        className="text-[#059669] underline font-black"
                      >
                        Accept
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div ref={chatMessagesEndRef} />
            </div>

            {/* Quick Replies Strip */}
            <div className="px-3 py-2 border-t border-gray-150 bg-[#fafbfb] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(reply)}
                  className="shrink-0 px-3 py-1.5 rounded-full border border-emerald-300 bg-white text-[11px] font-bold text-[#059669] whitespace-nowrap shadow-2xs active:scale-95 transition"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-white border-t border-gray-150 flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 shadow-2xs shrink-0 cursor-pointer"
                title="Share product"
              >
                <Tag className="w-4 h-4 text-[#059669]" />
              </button>

              <input
                type="text"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Reply to ${activeConv.customerName}...`}
                className="flex-1 bg-[#f8faf9] border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 outline-none focus:border-[#059669]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="w-10 h-10 rounded-xl bg-[#10b981] hover:bg-[#059669] active:scale-95 text-white flex items-center justify-center shadow-xs shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        )}

        {/* Panel 3: Customer Details */}
        {mobileView === 'customer' && (
          <div className="flex-1 flex flex-col h-full min-h-0 bg-white">
            <div className="px-4 py-3 border-b border-gray-150 flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setMobileView('chat')}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-700 transition"
                aria-label="Back to chat"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
              </button>
              <h3 className="text-sm font-black text-gray-900">Customer Details</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <SellerChatCustomerSidebar
                conversation={activeConv}
                onClose={() => setMobileView('chat')}
                className="w-full border-none shadow-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Share Product Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsShareModalOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#059669]" />
                <h3 className="text-sm font-black text-gray-950">Share Product from Catalogue</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShareModalOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-3 space-y-2 max-h-80 overflow-y-auto">
              {STORE_PRODUCTS.map((prod, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-gray-50 border border-gray-100 transition"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-[#edf5f0] overflow-hidden relative shrink-0 border border-gray-100">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-gray-900 truncate">{prod.title}</h4>
                      <p className="text-xs font-black text-[#059669]">{prod.price}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendMessage('', prod)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#064e3b] hover:bg-[#059669] text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                  >
                    Share
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
