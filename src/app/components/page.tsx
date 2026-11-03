'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  ArrowRight,
  Sparkles,
  MapPin,
  Search,
  ShoppingCart,
  Menu,
  Store,
  CheckCircle2,
  Package,
  MessageSquare,
  FileCheck,
  Hourglass,
  Boxes,
  PlusCircle,
  Wallet,
  Settings,
  ShieldCheck,
  UserCheck,
  Building2,
  Users,
} from 'lucide-react';

const COMPONENTS_LIST = [
  {
    title: 'Full Unified Navbar & Category Bar',
    slug: 'navbar',
    description: 'Exact match of Bazaario header with responsive search, location selector, cart badge, and sub-category menu with same-day delivery banner.',
    icon: Layers,
    badge: 'Primary Exact Match',
    filePath: 'src/components/navbar/Navbar.tsx',
  },
  {
    title: 'Category Sub-Navbar',
    slug: 'category-nav',
    description: 'All Categories mega flyout, horizontal department tabs (Grocery, Fashion, Electronics...), and lightning same-day delivery badge.',
    icon: Menu,
    badge: 'Exact Match',
    filePath: 'src/components/navbar/CategoryNav.tsx',
  },
  {
    title: 'Instant Search Bar',
    slug: 'search-bar',
    description: 'Search container with magnifying glass, clear button, trending suggestions popup, and vibrant emerald Search button.',
    icon: Search,
    badge: 'Exact Match',
    filePath: 'src/components/navbar/SearchBar.tsx',
  },
  {
    title: 'Delivery Location Selector',
    slug: 'location-selector',
    description: 'Two-tier "Deliver to Andheri West, Mumbai" dropdown with GPS detection and neighborhood picker modal.',
    icon: MapPin,
    badge: 'Exact Match',
    filePath: 'src/components/navbar/LocationSelector.tsx',
  },
  {
    title: 'Brand Logo',
    slug: 'logo',
    description: 'Deep emerald rounded square icon with white shop vector and bold typography, supports sm/md/lg sizes.',
    icon: Store,
    badge: 'Exact Match',
    filePath: 'src/components/navbar/Logo.tsx',
  },
  {
    title: 'Nav Actions & Account Bar',
    slug: 'nav-actions',
    description: 'Message badge (orange 1), Orders package icon, Cart badge (green 3), Rahul profile avatar, and "Sell on Bazaario" button.',
    icon: ShoppingCart,
    badge: 'Exact Match',
    filePath: 'src/components/navbar/NavActions.tsx',
  },
  {
    title: 'Hero & Promo Grid Section',
    slug: 'hero-section',
    description: 'Festive Bazaar banner with "Shop from trusted local stores near you", action buttons, and stacked promo cards ("Daily Fresh" & "For Shop Owners").',
    icon: Store,
    badge: 'New Exact Match',
    filePath: 'src/components/hero/HeroSection.tsx',
  },
  {
    title: 'Category Icon Strip',
    slug: 'category-icons',
    description: 'Horizontal row of 8 pastel category cards: Grocery, Fashion, Electronics, Home, Pharmacy, Footwear, Kitchen, and More.',
    icon: Layers,
    badge: 'Exact Match',
    filePath: 'src/components/categories/CategoryIconBar.tsx',
  },
  {
    title: 'Popular Shops Near You',
    slug: 'popular-shops',
    description: 'Verified neighborhood store cards with open/closed status, distance, bike delivery time, and live product catalog count.',
    icon: Store,
    badge: 'New Section',
    filePath: 'src/components/shops/PopularShops.tsx',
  },
  {
    title: 'Navigation Filter Sidebar',
    slug: 'filter-sidebar',
    description: 'Categories list, distance radius filter (1km, 3km, 5km), price slider, rating checkboxes, and open/delivery shop options.',
    icon: Search,
    badge: 'New Section',
    filePath: 'src/components/filters/FilterSidebar.tsx',
  },
  {
    title: 'Trending Products Grid',
    slug: 'trending-products',
    description: 'Local best-sellers grid with discount badges, wishlist toggle, store location tag, star ratings, and green cart button.',
    icon: ShoppingCart,
    badge: 'New Section',
    filePath: 'src/components/products/TrendingProductsGrid.tsx',
  },
  {
    title: 'Deals of the Day (Countdown)',
    slug: 'deals-of-day',
    description: 'Flash sale clearance card equipped with live ticking countdown timer (hours : mins : secs) and 3 local deals.',
    icon: Sparkles,
    badge: 'New Section',
    filePath: 'src/components/deals/DealsOfDay.tsx',
  },
  {
    title: 'Bazaario For Business Banner',
    slug: 'business-banner',
    description: 'Merchant onboarding call-to-action banner with local shopkeeper imagery, commission highlights, and register button.',
    icon: Store,
    badge: 'New Section',
    filePath: 'src/components/banners/BusinessCtaBanner.tsx',
  },
  {
    title: 'Bazaario Brand Footer',
    slug: 'footer',
    description: 'Dark forest green footer with brand bio, social media icons, Shoppers links, Shop Owners links, and Company links.',
    icon: Store,
    badge: 'Exact Match',
    filePath: 'src/components/footer/Footer.tsx',
  },
  {
    title: 'Log In Form (Split-Screen)',
    slug: 'login',
    description: 'Split-screen authentication experience with role switching (Shopper/Owner/Admin), +91 phone verification, and Google auth.',
    icon: ShoppingCart,
    badge: 'Exact Match',
    filePath: 'src/components/auth/LoginForm.tsx',
  },
  {
    title: 'Sign Up Form (Split-Screen)',
    slug: 'signup',
    description: 'Registration experience with role selection, shop details onboarding for store owners, and terms agreement.',
    icon: Store,
    badge: 'Exact Match',
    filePath: 'src/components/auth/SignUpForm.tsx',
  },
  {
    title: 'Search Results View & Filter Grid',
    slug: 'search-results',
    description: 'Exact match of search results for "headphones" with breadcrumbs, active filter chips, interactive distance/price/brand filters, 3-column product cards, top shop banner, and pagination.',
    icon: Search,
    badge: 'New Exact Match',
    filePath: 'src/components/search/SearchResultsView.tsx',
  },
  {
    title: 'Top Shop Merchant Banner',
    slug: 'top-shop-banner',
    description: 'Promotional merchant unit highlighting the top neighborhood shop (Sharma Electronics) with stock count, rating, and Visit Shop CTA.',
    icon: Store,
    badge: 'New Exact Match',
    filePath: 'src/components/search/TopShopBanner.tsx',
  },
  {
    title: 'Product Detail Page Experience',
    slug: 'product-detail',
    description: 'Hyperlocal product detail view with media gallery, colour swatches, instant delivery vs pickup toggle, merchant contact card, specs tabs, verified buyer reviews, and seller cross-sell grid.',
    icon: ShoppingCart,
    badge: 'New Exact Match',
    filePath: 'src/components/product-detail/ProductDetailView.tsx',
  },
  {
    title: 'Local Merchant Storefront & Profile',
    slug: 'shop-profile',
    description: 'Merchant profile with storefront cover photo, verified status, quick contact actions (Chat, WhatsApp, Call, Directions, Follow), category navigation, store info card, promo banner, and product catalog.',
    icon: Store,
    badge: 'New Exact Match',
    filePath: 'src/components/shop-profile/ShopProfileView.tsx',
  },
  {
    title: 'Multi-Shop Cart & Checkout Stepper',
    slug: 'cart',
    description: 'Hyperlocal cart grouped per neighborhood shop with individual delivery vs store pickup selectors, quantity stepper, coupon application, order summary with savings, and 4-step progress bar.',
    icon: ShoppingCart,
    badge: 'New Exact Match',
    filePath: 'src/components/cart/CartView.tsx',
  },
  {
    title: 'Checkout Flow (Address, Payment & Summary)',
    slug: 'checkout',
    description: 'Step 3 Payment & Address checkout view with saved address cards (Home/Work), delivery instructions, UPI app pills & verification, card/banking tabs, and sticky order breakdown.',
    icon: ShoppingCart,
    badge: 'New Exact Match',
    filePath: 'src/components/checkout/CheckoutView.tsx',
  },
  {
    title: 'Order Success & Multi-Shop Split',
    slug: 'order-success',
    description: 'Order placed confirmation screen with green check badge, order metadata pill, multi-shop fulfillment statuses (Accepted, Awaiting, Packing), and delivery destination.',
    icon: CheckCircle2,
    badge: 'New Exact Match',
    filePath: 'src/components/order-success/OrderSuccessView.tsx',
  },
  {
    title: 'Live Order Tracking & ETA Map',
    slug: 'order-tracking',
    description: 'Real-time hyperlocal delivery tracking with animated route map, driver floating card, 5-step status timeline, shop switcher tabs, and OTP delivery verification.',
    icon: MapPin,
    badge: 'New Exact Match',
    filePath: 'src/components/order-tracking/OrderTrackingView.tsx',
  },
  {
    title: 'My Orders & Account Dashboard',
    slug: 'orders',
    description: 'User orders history dashboard with profile summary card, sidebar navigation, 4-metric statistics grid, status tabs (All, Active, Delivered, Cancelled), reorder, rate, and return actions.',
    icon: Package,
    badge: 'New Exact Match',
    filePath: 'src/components/orders/OrdersListView.tsx',
  },
  {
    title: 'In-App Messages & Shop Chat',
    slug: 'messages',
    description: '3-column realtime chat interface with shop conversations list, product enquiry cards, customer & merchant bubbles, quick reply chips, and shop profile sidebar with linked order tracking.',
    icon: MessageSquare,
    badge: 'New Exact Match',
    filePath: 'src/components/messages/MessagesView.tsx',
  },
  {
    title: 'Seller Onboarding & Registration (4-Step Flow)',
    slug: 'seller-registration',
    description: 'Full Bazaario for Business onboarding flow: 1. Shop details, 2. Owner & KYC, 3. Bank details for payouts, 4. Comprehensive review & declaration, plus benefits sidebar.',
    icon: FileCheck,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-registration/SellerRegistrationView.tsx',
  },
  {
    title: 'Seller Application Verification & Status',
    slug: 'seller-verification',
    description: 'Under-review status screen with 4-stage verification progress, action needed missing photo alert, verified KYC tags, and while-you-wait catalogue draft builder.',
    icon: Hourglass,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-verification/SellerVerificationView.tsx',
  },
  {
    title: 'Seller In-App Messages & Customer CRM',
    slug: 'seller-messages',
    description: '3-column real-time buyer-seller chat suite with avg reply speed indicator, inbox filters (Unread, Enquiries, Orders), product inquiry card, quick reply pills, and customer CRM sidebar with order history.',
    icon: MessageSquare,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-messages/SellerMessagesView.tsx',
  },
  {
    title: 'Seller Orders & Acceptance Workspace',
    slug: 'seller-orders',
    description: 'Master-Detail incoming order management with countdown timer, customer direct messaging/calling, item notes, commission & payouts calculator, invoice printing, and Accept/Reject buttons.',
    icon: Package,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-orders/SellerOrdersView.tsx',
  },
  {
    title: 'Seller Add Product Studio',
    slug: 'seller-add-product',
    description: 'Product listing studio with basic information, rich text editor, image gallery with cover badge, real-time commission/profit calculations, inventory & variants (colours, options), fulfilment policies, and live buyer card preview.',
    icon: PlusCircle,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-add-product/SellerAddProductView.tsx',
  },
  {
    title: 'Seller Products & Inventory Dashboard',
    slug: 'seller-products',
    description: 'Seller catalogue management with status tabs (All 185, Active, Drafts, Out of stock, Under review), SKU search, category/sorting filters, bulk actions (stock, hide, delete), and visibility toggle switches.',
    icon: Boxes,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-products/SellerProductsView.tsx',
  },
  {
    title: 'Seller Earnings & Payouts Dashboard',
    slug: 'seller-earnings',
    description: 'Financial dashboard featuring Monday payout countdown, pending settlement tracking, weekly stacked earnings chart, 8% commission breakdown model, verified payout bank account, and transaction audit ledger.',
    icon: Wallet,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-earnings/SellerEarningsView.tsx',
  },
  {
    title: 'Seller Shop Settings & Fulfilment Hub',
    slug: 'seller-settings',
    description: 'Storefront management console with cover photo editor, contact channels (in-app chat, WhatsApp, phone, map directions), operating hours schedule, delivery radius slider, payout KYC tags, and sound/SMS notification toggles.',
    icon: Settings,
    badge: 'New Exact Match',
    filePath: 'src/components/seller-settings/SellerSettingsView.tsx',
  },
  {
    title: 'Bazaario Super Admin Dashboard',
    slug: 'admin-dashboard',
    description: 'Platform overview executive dashboard with GMV vs Commission revenue combo chart, category GMV donut share, merchant approvals queue, dispute & product moderation alerts, and top merchant leaderboards.',
    icon: ShieldCheck,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminDashboardView.tsx',
  },
  {
    title: 'Bazaario Admin Shop Approvals & KYC Console',
    slug: 'admin-shop-approvals',
    description: 'Merchant onboarding verification suite with application queues (Pending 12, Needs info 3), auto-verified PAN, Aadhaar/Udyam review, penny-drop bank confirmation, commission assignment, and Approve/Reject workflows.',
    icon: UserCheck,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminShopApprovalsView.tsx',
  },
  {
    title: 'Bazaario Admin Shops Directory & Control',
    slug: 'admin-shops',
    description: 'Centralized merchant database with live status badges (Live 1,214, Paused 38, Suspended 7), multi-facet filtering (category, area, status), 30D GMV/order stats, quick commission editor, and merchant inspection drawer.',
    icon: Building2,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminShopsView.tsx',
  },
  {
    title: 'Bazaario Admin Product Moderation',
    slug: 'admin-moderation',
    description: 'Keep the marketplace genuine and safe with user-reported flags (Counterfeit, Wrong category), auto-detected price anomalies, listing verification, review stats, and moderation guidelines.',
    icon: ShieldCheck,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminProductModerationView.tsx',
  },
  {
    title: 'Bazaario Admin Orders Management & Disputes',
    slug: 'admin-orders',
    description: 'Comprehensive order tracking across all shops with real-time delivery statuses, daily GMV/commission metrics, dispute resolution console with photo evidence, and full/partial refund workflows.',
    icon: Package,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminOrdersView.tsx',
  },
  {
    title: 'Bazaario Admin Users & Merchants Directory',
    slug: 'admin-users',
    description: 'Complete user directory with 86,600+ shoppers and sellers, activity tracking, role filters, user inspection drawer, and instant ban/restore safety controls.',
    icon: Users,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminUsersView.tsx',
  },
  {
    title: 'Bazaario Admin Commission & Automated Payouts',
    slug: 'admin-commission',
    description: 'Commission rules per category with shop-specific overrides, live revenue simulator with GST/platform fees, Monday batch payout processor, and failed payout retry console.',
    icon: Wallet,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminCommissionView.tsx',
  },
  {
    title: 'Bazaario Admin Categories Taxonomy Manager',
    slug: 'admin-categories',
    description: 'Product taxonomy tree with expandable subcategory tags, commission per category, compliance document requirements (GST, FSSAI, Drug license), and add-category studio.',
    icon: Layers,
    badge: 'New Exact Match',
    filePath: 'src/components/admin/AdminCategoriesView.tsx',
  },
  {
    title: 'Mobile App Bottom Navigation Bar',
    slug: 'mobile-bottom-nav',
    description: 'Fixed 5-tab mobile navigation (Home, Search, Orders, Chat, Cart) with real-time numeric badges, route-active indicator, backdrop blur, and touch feedback.',
    icon: ShoppingCart,
    badge: 'New Responsive',
    filePath: 'src/components/navbar/MobileBottomNav.tsx',
  },
  {
    title: 'Equipment Rental Product Detail & Rates Slider',
    slug: 'rental',
    description: 'Specialized equipment hire calculator with 4h/24h/week rate tiers, dynamic duration slider, paired tools (Dehumidifier, HEPA vacuum), safety gear specs, and hire conditions.',
    icon: Store,
    badge: 'New Exact Match',
    filePath: 'src/components/rental/RentalProductDetailView.tsx',
  },
  {
    title: 'Rental Shopping Cart, Deposit & Fulfilment Hub',
    slug: 'rental/cart',
    description: 'Rental checkout with rental period badge, refundable security deposit ($800), technician toggle, pickup branch details, paired add-ons, and payment methods.',
    icon: ShoppingCart,
    badge: 'New Exact Match',
    filePath: 'src/components/rental/RentalCartView.tsx',
  },
  {
    title: 'Rental Booking Confirmation & Tax Invoice',
    slug: 'rental/success',
    description: 'Post-hire confirmation screen with download invoice PDF link, order transaction details, and order tracking / equipment collection workflow.',
    icon: CheckCircle2,
    badge: 'New Exact Match',
    filePath: 'src/components/rental/RentalSuccessView.tsx',
  },
];

export default function ComponentsHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Modular & Reusable Component System</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Bazaario Component Showcase Hub
              </h1>
              <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                Every component is modular, written in its own standalone file, and has a dedicated test page with interactive controls, props sandbox, and copyable code.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#084c37] hover:bg-[#063d2c] text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition shadow-xs self-start"
            >
              <span>View Main Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of Components */}
      <div className="max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPONENTS_LIST.map((comp) => {
            const Icon = comp.icon;
            return (
              <Link
                key={comp.slug}
                href={`/components/${comp.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-emerald-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-[#084c37] group-hover:text-white transition-colors duration-200">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
                      {comp.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#084c37] transition">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {comp.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400 truncate max-w-[170px]">
                    {comp.filePath}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Open Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
