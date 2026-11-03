# Bazaario — Frontend Complete Feature Documentation

> **Stack:** Next.js 15 · TypeScript · Tailwind CSS
> **Repo:** `Bazaario/` · **Live:** bazaario.com
> **Last updated:** November 2026

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Folder Structure](#3-folder-structure)
4. [Pages & Routes](#4-pages--routes)
5. [Component Modules](#5-component-modules)
6. [Auth Flow](#6-auth-flow)
7. [Design System](#7-design-system)
8. [Navigation & Linking Conventions](#8-navigation--linking-conventions)
9. [Key UI Features](#9-key-ui-features)
10. [Backend API Integration Points](#10-backend-api-integration-points)

---

## 1. Project Overview

Bazaario is a **hyperlocal marketplace** for Mumbai connecting shoppers with nearby local stores. Three roles exist on the platform:

| Role | Entry Point | Dashboard |
|------|------------|-----------|
| **Shopper** | `/login?role=shopper` | `/` (home) |
| **Seller** | `/login?role=seller` | `/seller-products` |
| **Admin** | `/login?role=admin` | `/admin/dashboard` |

---

## 2. Tech Stack & Dependencies

| Package | Purpose |
|---------|---------|
| `next` 15 | App framework (App Router) |
| `react` 19 | UI library |
| `typescript` 5 | Type safety |
| `tailwindcss` 4 | Styling |
| `lucide-react` | Icon set throughout the app |
| `next/font` | Geist Sans + Geist Mono fonts |
| `next/image` | Optimized images |
| `next/navigation` | `useRouter`, `usePathname`, `useSearchParams` |

---

## 3. Folder Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (fonts, MobileBottomNav)
│   ├── page.tsx                  # Home page
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── orders/page.tsx
│   ├── order-success/page.tsx
│   ├── order-tracking/page.tsx
│   ├── messages/page.tsx
│   ├── search/page.tsx
│   ├── product/
│   │   ├── page.tsx              # /product (base)
│   │   └── [id]/page.tsx         # /product/:id
│   ├── shop/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── rental/
│   │   ├── page.tsx
│   │   ├── [id]/page.tsx
│   │   ├── cart/page.tsx
│   │   └── success/page.tsx
│   ├── seller/                   # Seller dashboard (nested)
│   │   ├── products/page.tsx
│   │   ├── orders/page.tsx
│   │   ├── add-product/page.tsx
│   │   ├── earnings/page.tsx
│   │   ├── messages/page.tsx
│   │   └── settings/page.tsx
│   ├── seller-registration/page.tsx
│   ├── seller-verification/page.tsx
│   └── admin/
│       ├── dashboard/page.tsx
│       ├── shops/page.tsx
│       ├── approvals/page.tsx
│       ├── shop-approvals/page.tsx
│       ├── orders/page.tsx
│       ├── users/page.tsx
│       ├── categories/page.tsx
│       ├── moderation/page.tsx
│       └── commission/page.tsx
│
├── components/                   # Reusable components (by domain)
│   ├── admin/
│   ├── auth/
│   ├── banners/
│   ├── cart/
│   ├── categories/
│   ├── checkout/
│   ├── deals/
│   ├── filters/
│   ├── footer/
│   ├── hero/
│   ├── messages/
│   ├── modals/
│   ├── navbar/
│   ├── order-success/
│   ├── order-tracking/
│   ├── orders/
│   ├── product-detail/
│   ├── products/
│   ├── rental/
│   ├── search/
│   ├── seller-add-product/
│   ├── seller-earnings/
│   ├── seller-messages/
│   ├── seller-orders/
│   ├── seller-products/
│   ├── seller-registration/
│   ├── seller-settings/
│   ├── seller-verification/
│   ├── shop-profile/
│   └── shops/
│
└── types/
    └── index.ts                  # Shared TypeScript types
```

---

## 4. Pages & Routes

### Shopper Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Home: Navbar, HeroSection, CategoryIconBar, DealsOfDay, MarketplaceShowcase, PopularShops, BusinessCtaBanner, Footer |
| `/login` | `LoginForm` | Role-based login (shopper / seller / admin). `?role=` pre-selects role card |
| `/signup` | `SignUpForm` | Registration with role-based redirect on success |
| `/search` | `SearchResultsView` | Full-text search with `?q=` + filters sidebar |
| `/product` | `ProductDetailPage` | Product detail (base, used by `/product/[id]`) |
| `/product/:id` | delegates to `/product` | Dynamic product detail route |
| `/shop/:id` | `ShopProfileView` | Shop profile with tabs: Products, About, Reviews, Offers |
| `/cart` | `CartView` | Multi-shop cart with coupon, order summary |
| `/checkout` | `CheckoutView` | 3-step: Address → Payment → Confirm |
| `/order-success` | `OrderSuccessView` | Confirmation card, split by shops, actions |
| `/order-tracking` | `OrderTrackingView` | Live status timeline + map + shop contact |
| `/orders` | `OrdersListView` | My orders with filter bar + stats grid |
| `/messages` | `MessagesView` | Chat with shops: conversation sidebar + message thread |
| `/rental` | `RentalProductDetailView` | Rental marketplace landing |
| `/rental/:id` | `RentalProductDetailView` | Rental item detail |
| `/rental/cart` | `RentalCartView` | Rental cart |
| `/rental/success` | `RentalSuccessView` | Rental order confirmation |

### Seller Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/seller-registration` | `SellerRegistrationView` | 4-step onboarding: Shop Details → KYC → Bank → Review |
| `/seller-verification` | `SellerVerificationView` | Post-registration pending state |
| `/seller-products` | `SellerProductsView` | Products table with SellerHeaderNav + SellerSidebar |
| `/seller-orders` | `SellerOrdersView` | Incoming orders with status update |
| `/seller-add-product` | `SellerAddProductView` | Add/edit product with live preview |
| `/seller-earnings` | `SellerEarningsView` | Revenue, payouts, commission breakdown |
| `/seller-messages` | `SellerMessagesView` | Chat inbox with customer sidebar |
| `/seller-settings` | `SellerSettingsView` | Shop settings form |

### Admin Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/dashboard` | `AdminDashboardView` | GMV, commission, combo chart, donut chart, pending approvals |
| `/admin/shops` | `AdminShopsView` | All shops with status filters |
| `/admin/approvals` | `AdminShopApprovalsView` | Pending shop approval queue |
| `/admin/shop-approvals` | `AdminShopApprovalsView` | Same view, alternate route |
| `/admin/orders` | `AdminOrdersView` | Platform-wide orders + disputes |
| `/admin/users` | `AdminUsersView` | User management |
| `/admin/categories` | `AdminCategoriesView` | Category CRUD |
| `/admin/moderation` | `AdminProductModerationView` | Flagged products queue |
| `/admin/commission` | `AdminCommissionView` | Commission rate management |

---

## 5. Component Modules

### `components/navbar/`
| File | Description |
|------|-------------|
| `Navbar.tsx` | Main navbar: Logo + LocationSelector + SearchBar + NavActions + CategoryNav |
| `Logo.tsx` | Uses `/Images/logo-cropped.png` at 48×62px. Text "Bazaario" in `#064e3b`. Dark variant → white text |
| `SearchBar.tsx` | Search input with suggestions dropdown |
| `NavActions.tsx` | Cart badge, Orders, Messages, Sell button, user avatar |
| `LocationSelector.tsx` | City/area picker |
| `CategoryNav.tsx` | Horizontal scrollable category pills |
| `MobileBottomNav.tsx` | Fixed bottom nav (mobile only). Hides on `/seller*` and `/admin*` routes. Uses `usePathname` |
| `MobileBottomNavClient.tsx` | `'use client'` wrapper with `dynamic({ ssr: false })` — prevents SSR prerender crash in layout |

### `components/auth/`
| File | Description |
|------|-------------|
| `LoginForm.tsx` | Password + OTP toggle, Google OAuth button, role-based redirect |
| `SignUpForm.tsx` | Registration with same role-based redirect |
| `RoleSelector.tsx` | 3-card role picker: Shopper / Shop Owner / Admin |
| `AuthLayout.tsx` | Two-column auth layout (form left, visual right) |

### `components/hero/`
| File | Description |
|------|-------------|
| `HeroSection.tsx` | Main homepage hero with HeroBanner + PromoCards |
| `HeroBanner.tsx` | Full-width banner with CTA |
| `PromoCard.tsx` | Small promo card tiles |

### `components/banners/`
| File | Description |
|------|-------------|
| `MarketplaceShowcase.tsx` | 3D immersive dark section. Header → 3D card scene → filter pills → 4-col product grid → stats → trust badges |
| `BusinessCtaBanner.tsx` | "Start selling on Bazaario" CTA banner |

### `components/deals/`
| File | Description |
|------|-------------|
| `DealsOfDay.tsx` | Horizontal scroll deal cards with countdown timer. "See all" → `/search?q=deals` |

### `components/categories/`
| File | Description |
|------|-------------|
| `CategoryIconBar.tsx` | Row of category icon + label cards |
| `CategoryIconCard.tsx` | Single category card |

### `components/products/`
| File | Description |
|------|-------------|
| `TrendingProductsGrid.tsx` | Grid of trending products |
| `TrendingProductCard.tsx` | Card → `/product?id={product.id}` |

### `components/shops/`
| File | Description |
|------|-------------|
| `PopularShops.tsx` | Grid of popular shop cards |
| `ShopCard.tsx` | Card → `/shop?id={shop.id}` |

### `components/cart/`
| File | Description |
|------|-------------|
| `CartView.tsx` | Full cart page: grouped by shop, coupon, summary |
| `CartHeaderStepper.tsx` | Cart → Checkout → Payment stepper |
| `ShopCartGroupCard.tsx` | Items grouped per shop |
| `CouponApplyCard.tsx` | Coupon code input + apply |
| `OrderSummaryCard.tsx` | Subtotal, discount, total |
| `index.ts` | Barrel export |

### `components/checkout/`
| File | Description |
|------|-------------|
| `CheckoutView.tsx` | 3-step checkout orchestrator |
| `CheckoutStepperHeader.tsx` | Step indicator |
| `DeliveryAddressSection.tsx` | Address form / saved addresses |
| `PaymentMethodSection.tsx` | UPI, Card, COD, Wallet options |
| `CheckoutOrderSummary.tsx` | Right sidebar summary |

### `components/product-detail/`
| File | Description |
|------|-------------|
| `ProductDetailView.tsx` | Main product page orchestrator |
| `ProductGallery.tsx` | Image gallery with zoom |
| `ProductInfo.tsx` | Name, price, rating, color/variant selector |
| `ProductDetailsTabs.tsx` | Tabs: Description / Specs / Reviews |
| `CustomerReviewsCard.tsx` | Review list with rating breakdown |
| `ProductOffersCard.tsx` | Offers & coupons |
| `MerchantContactCard.tsx` | Shop info + chat CTA |
| `MoreFromSeller.tsx` | More products from same shop |
| `ProductBreadcrumb.tsx` | Home → Category → Product breadcrumb |
| `ProductDetailFooter.tsx` | Dark green sticky bottom: Add to Cart + Buy Now |
| `index.ts` | Barrel export |

### `components/modals/`
| File | Description |
|------|-------------|
| `CartDrawer.tsx` | Slide-in cart drawer from right |
| `OrdersModal.tsx` | Quick orders overlay |
| `SellerModal.tsx` | "Start selling" info modal |

### `components/seller-registration/`
| File | Description |
|------|-------------|
| `SellerRegistrationView.tsx` | 4-step form orchestrator |
| `Step1ShopDetails.tsx` | Shop name, category, address, hours, photos |
| `Step2OwnerKYC.tsx` | Owner name, PAN, Aadhaar, GSTIN |
| `Step3BankDetails.tsx` | Account number, IFSC, cheque upload |
| `Step4Review.tsx` | Final review of all steps before submit |
| `SellerHeader.tsx` | Seller onboarding header |
| `SellerBenefitsSidebar.tsx` | Right sidebar: benefits of joining |

### `components/seller-products/`
| File | Description |
|------|-------------|
| `SellerProductsView.tsx` | Full seller dashboard layout |
| `SellerHeaderNav.tsx` | Top nav with "Already registered?" → `/login?role=seller` |
| `SellerSidebar.tsx` | Left nav: Products, Orders, Earnings, Messages, Settings |
| `SellerProductsTable.tsx` | Sortable, filterable products table |

### `components/admin/`
| File | Description |
|------|-------------|
| `AdminDashboardView.tsx` | GMV + commission combo chart, donut chart, pending approvals, top shops table |
| `AdminHeaderNav.tsx` | Admin top nav. Bell icon → `/admin/approvals` |
| `AdminSidebar.tsx` | Left nav. Logout → `router.push('/login?role=admin')` |
| `AdminShopApprovalsView.tsx` | Approve/reject pending shops |
| `AdminShopsView.tsx` | All shops list with suspend/edit |
| `AdminUsersView.tsx` | User list with ban/verify actions |
| `AdminProductModerationView.tsx` | Flagged products queue |
| `AdminCategoriesView.tsx` | Category management |
| `AdminOrdersView.tsx` | Orders + dispute management |
| `AdminCommissionView.tsx` | Per-category commission rate editor |

### `components/messages/`
| File | Description |
|------|-------------|
| `MessagesView.tsx` | Full chat page layout |
| `ChatConversationsSidebar.tsx` | List of conversations (left panel) |
| `ChatHeader.tsx` | Active chat header with shop info |
| `ChatMessageItem.tsx` | Individual message bubble |
| `ChatMessageInput.tsx` | Compose bar with emoji + send |
| `ChatQuickReplies.tsx` | Quick reply suggestion chips |
| `ChatShopDetailsSidebar.tsx` | Right sidebar: shop info + products |

### `components/order-tracking/`
| File | Description |
|------|-------------|
| `OrderTrackingView.tsx` | Full tracking page |
| `OrderTrackingHeader.tsx` | Order ID + estimated time |
| `OrderStatusTimeline.tsx` | Placed → Confirmed → Packed → Shipped → Delivered |
| `OrderTrackingMap.tsx` | Map placeholder with delivery route |
| `TrackingItemCard.tsx` | Items in this order |
| `ShopContactCard.tsx` | Contact shop / rider |

### `components/search/`
| File | Description |
|------|-------------|
| `SearchResultsView.tsx` | Main search layout: sidebar + results |
| `SearchFilterSidebar.tsx` | Category, price range, rating, delivery filters |
| `SearchProductCard.tsx` | Search result product card |
| `SearchResultsHeader.tsx` | Result count + sort dropdown |
| `ActiveFiltersBar.tsx` | Chips for active filters |
| `SearchBreadcrumb.tsx` | Breadcrumb |
| `SearchPagination.tsx` | Page controls |
| `TopShopBanner.tsx` | Featured shop banner in search results |
| `SearchFooter.tsx` | Category quick-links footer |
| `index.ts` | Barrel export |

### `components/shop-profile/`
| File | Description |
|------|-------------|
| `ShopProfileView.tsx` | Full shop profile orchestrator |
| `ShopProfileHeader.tsx` | Shop banner, logo, name, rating, follow |
| `ShopTabsNav.tsx` | Products / About / Reviews / Offers tabs |
| `ShopProductGrid.tsx` | Shop's product grid |
| `ShopProductCard.tsx` | Individual product in shop |
| `ShopInfoCard.tsx` | Address, hours, contact |
| `ShopCategorySidebar.tsx` | Category filter sidebar |
| `ShopOffersView.tsx` | Shop-specific offers |
| `ShopReviewsView.tsx` | Reviews for this shop |
| `ShopAboutView.tsx` | About the shop |
| `ShopPromoBanner.tsx` | Promo banner inside shop |
| `ShopFooter.tsx` | Shop-level footer |
| `index.ts` | Barrel export |

---

## 6. Auth Flow

```
Login Page (/login?role=shopper|seller|admin)
  │
  ├── Password Login
  │   └── POST /api/v1/auth/login
  │       └── JWT → redirect to role dashboard
  │
  ├── OTP Login
  │   ├── POST /api/v1/auth/login/otp/send (phone/email)
  │   └── POST /api/v1/auth/login/otp/verify
  │       └── JWT → redirect
  │
  └── Google Login
      ├── Frontend: Google One-Tap → ID token
      └── POST /api/v1/auth/login/google
          └── JWT → redirect

Role Redirects:
  shopper → /
  seller  → /seller-products
  admin   → /admin/dashboard

Seller Registration:
  /seller-registration (Step1 → Step2 → Step3 → Step4)
    └── Submit → /seller-verification (pending state)
```

---

## 7. Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| Brand green | `#059669` | Primary CTAs, active states, badges |
| Hover green | `#047857` | Hover on primary buttons |
| Dark forest | `#064e3b` | Admin sidebar, dark cards, seller header |
| Amber | `#f59e0b` | Badges, warnings, commission line |
| Gray-950 | `#030712` | Primary text |
| Gray-500 | `#6b7280` | Secondary text |

### Border Radius
- Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- Buttons: `rounded-2xl`
- Inputs: `rounded-2xl`

### Typography
- Font: Geist Sans (variable `--font-geist-sans`)
- Headings: `font-black` or `font-extrabold`
- Labels: `font-bold` or `font-semibold`

### Shadows
- Cards: `shadow-2xs` or `shadow-xs`
- Elevated: `shadow-md`

### Buttons
```
Primary:   bg-[#059669] hover:bg-[#047857] text-white rounded-2xl font-bold
Secondary: bg-white border border-gray-200 text-gray-800 rounded-2xl font-semibold
Danger:    bg-rose-50 text-rose-700 border border-rose-200
```

### Placeholder Images
All product/shop/avatar images use **Unsplash URLs** in mock data.

---

## 8. Navigation & Linking Conventions

| Destination | Link / Route |
|-------------|-------------|
| Shop detail | `/shop?id={shop.id}` |
| Product detail | `/product?id={product.id}` |
| Cart (fallback) | `/cart` |
| Orders (fallback) | `/orders` |
| Messages | `/messages` |
| Sell / Register | `/seller-registration` |
| Seller dashboard | `/seller-products` |
| Seller earnings | `/seller-earnings` |
| Track order | `/order-tracking` |
| Admin login | `/login?role=admin` |
| Admin approvals (bell) | `/admin/approvals` |
| Deals "See all" | `/search?q=deals` |
| SellerHeader "Already registered?" | `/login?role=seller` |
| AdminSidebar logout | `router.push('/login?role=admin')` |
| Footer "Commission & payouts" | `/seller-earnings` |
| Footer "Register shop" | `/seller-registration` |
| Footer "Admin login" | `/login?role=admin` |

> Never use `alert()` for navigation. Always use `router.push()` or `<Link href="">`.

---

## 9. Key UI Features

### MarketplaceShowcase (3D Section)
- Dark navy/midnight background
- CSS 3D perspective cards with real-time mouse tilt (rotateX/Y)
- Scene-level parallax on mouse move
- Scroll-driven card parallax (IntersectionObserver + window scroll)
- Stat chips with 3D hover tilt
- Nebula glow orbs
- No external 3D libraries — pure CSS transforms

**Tilt limits (soft feel):**
- Card tilt max: 7°
- Scene mouse tilt: 2° / 2.5°
- Stat chip tilt: 5° / 6°
- Hover transition: `0.18s ease-out`
- Return transition: `0.65s cubic-bezier(.22,1,.36,1)`

**Section layout (top to bottom):**
Header → 3D floating cards scene (all products always shown) → Category filter pills (All/Fashion/Tech/Home) → 4-col product grid (filtered, glassmorphism dark cards) → Stats row → Trust badges row

**Grid card style:** `rgba(255,255,255,.06)` bg, `backdrop-blur`, dark border, accent glow on hover, top accent line, wishlist + cart buttons.

### MobileBottomNav
- Fixed bottom, mobile only (`md:hidden`)
- 5 tabs: Home, Search, Orders, Chat, Cart
- Hides on `/seller*` and `/admin*` routes
- Loaded with `dynamic({ ssr: false })` via `MobileBottomNavClient` to avoid SSR prerender errors

### Admin Dashboard Chart
- Custom SVG combo chart (bar + spline line)
- GMV bars (emerald green) + Commission spline (amber)
- Interactive hover tooltip
- Category donut chart (SVG, CSS stroke-dasharray)
- No chart library — pure SVG

### Seller Registration (4-step)
- Step 1: Shop details (name, category, hours, location, photos)
- Step 2: Owner KYC (PAN, Aadhaar, GSTIN)
- Step 3: Bank details (account, IFSC, cheque)
- Step 4: Review + Submit → `/seller-verification`

---

## 10. Backend API Integration Points

| Frontend Route | HTTP | Backend Endpoint |
|----------------|------|-----------------|
| `/login` | POST | `/api/v1/auth/login` |
| `/login` (OTP) | POST | `/api/v1/auth/login/otp/send` + `/verify` |
| `/login` (Google) | POST | `/api/v1/auth/login/google` |
| `/signup` | POST | `/api/v1/auth/register` |
| `/` | GET | `/api/v1/products/trending`, `/products/deals`, `/shops` |
| `/search` | GET | `/api/v1/search?q=&category=&sort=&page=` |
| `/product/:id` | GET | `/api/v1/products/:id` |
| `/shop/:id` | GET | `/api/v1/shops/:id`, `/shops/:id/products` |
| `/cart` | GET/POST/PATCH/DELETE | `/api/v1/cart` |
| `/checkout` | POST | `/api/v1/payments/create-order` |
| `/order-success` | GET | `/api/v1/orders/:id` |
| `/order-tracking` | GET | `/api/v1/orders/:id/track` |
| `/orders` | GET | `/api/v1/orders` |
| `/messages` | GET + WS | `/api/v1/messages/conversations` + Socket.io `/chat` |
| `/seller-registration` | POST | `/api/v1/shops` |
| `/seller-verification` | POST | `/api/v1/seller/verification/upload` |
| `/seller-products` | GET/POST/PATCH/DELETE | `/api/v1/products` |
| `/seller-orders` | GET/PATCH | `/api/v1/seller/orders` |
| `/seller-earnings` | GET | `/api/v1/seller/earnings` |
| `/seller-messages` | WS | Socket.io `/chat` namespace |
| `/seller-settings` | GET/PATCH | `/api/v1/seller/settings` |
| `/admin/dashboard` | GET | `/api/v1/admin/dashboard` |
| `/admin/approvals` | GET/POST | `/api/v1/admin/shops` |
| `/admin/shops` | GET/PATCH | `/api/v1/admin/shops` |
| `/admin/users` | GET/PATCH | `/api/v1/admin/users` |
| `/admin/moderation` | GET/POST | `/api/v1/admin/products/flagged` |
| `/admin/categories` | GET/POST/PATCH | `/api/v1/admin/categories` |
| `/admin/commission` | GET/PATCH | `/api/v1/admin/commission` |
| `/rental` | GET | `/api/v1/rental` |
| `/rental/:id` | GET | `/api/v1/rental/:id` |
| `/rental/cart` | POST | `/api/v1/rental/cart` |

---

*This document is the source of truth for the Bazaario frontend. Any new page or component should follow the conventions described above.*
