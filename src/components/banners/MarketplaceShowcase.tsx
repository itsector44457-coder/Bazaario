'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Star, ArrowRight, Heart, Zap, Store, ShieldCheck, Sparkles } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 'p1', name: 'Silk Kurta Set', price: 1899, originalPrice: 2799, rating: 4.8, reviews: 312,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=500&q=80',
    badge: 'Bestseller', badgeGrad: 'linear-gradient(135deg,#f59e0b,#ef4444)',
    category: 'Fashion', tag: 'fashion',
    // 3D position in the scene: x y z rotation
    pos: { x: -38, y: -12, z: 0, ry: 8, rx: -3 },
    accent: '#f59e0b',
  },
  {
    id: 'p2', name: 'Earbuds Pro X', price: 3499, originalPrice: 5999, rating: 4.9, reviews: 847,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=500&q=80',
    badge: '42% OFF', badgeGrad: 'linear-gradient(135deg,#059669,#0ea5e9)',
    category: 'Electronics', tag: 'electronics',
    pos: { x: 0, y: -28, z: 40, ry: 0, rx: -2 },
    accent: '#0ea5e9',
  },
  {
    id: 'p3', name: 'Macramé Wall Art', price: 899, originalPrice: 1299, rating: 4.7, reviews: 189,
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=500&q=80',
    badge: 'Handmade', badgeGrad: 'linear-gradient(135deg,#ec4899,#f43f5e)',
    category: 'Home Decor', tag: 'home',
    pos: { x: 38, y: -12, z: 0, ry: -8, rx: -3 },
    accent: '#ec4899',
  },
  {
    id: 'p4', name: 'Smart Watch Ultra', price: 8999, originalPrice: 12999, rating: 4.9, reviews: 1024,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
    badge: 'Top Rated', badgeGrad: 'linear-gradient(135deg,#7c3aed,#6366f1)',
    category: 'Electronics', tag: 'electronics',
    pos: { x: -22, y: 22, z: 20, ry: 5, rx: 2 },
    accent: '#7c3aed',
  },
  {
    id: 'p5', name: 'Linen Shirt — Sage', price: 1299, originalPrice: 1799, rating: 4.8, reviews: 421,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=80',
    badge: 'New', badgeGrad: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    category: 'Fashion', tag: 'fashion',
    pos: { x: 22, y: 22, z: 20, ry: -5, rx: 2 },
    accent: '#6366f1',
  },
];

const STATS = [
  { value: '1,200+', label: 'Verified Shops',   icon: Store,       color: '#059669', glow: 'rgba(5,150,105,.35)' },
  { value: '50k+',   label: 'Products',          icon: ShoppingBag, color: '#0ea5e9', glow: 'rgba(14,165,233,.35)' },
  { value: '85k+',   label: 'Happy Buyers',      icon: ShieldCheck, color: '#7c3aed', glow: 'rgba(124,58,237,.35)' },
  { value: '4.8★',   label: 'Avg Rating',        icon: Star,        color: '#f59e0b', glow: 'rgba(245,158,11,.35)' },
];

// ─── Hook: scroll progress relative to section ────────────────────────────────
function useScrollY(ref: React.RefObject<HTMLElement | null>) {
  const [sy, setSy] = useState(0);
  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (rect.top + rect.height * 0.5) / winH));
      setSy(p);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [ref]);
  return sy;
}

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.12) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return vis;
}

// ─── Flat grid card (shown below filter) ─────────────────────────────────────
function ProductGridCard({
  product, index, visible,
}: {
  product: typeof PRODUCTS[0];
  index: number;
  visible: boolean;
}) {
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(255,255,255,.06)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${hovered ? product.accent + '55' : 'rgba(255,255,255,.1)'}`,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .6s ease ${index * 70}ms, transform .6s cubic-bezier(.22,1,.36,1) ${index * 70}ms, border-color .25s, box-shadow .25s`,
        boxShadow: hovered
          ? `0 16px 40px rgba(0,0,0,.3), 0 0 20px ${product.accent}33`
          : '0 4px 16px rgba(0,0,0,.2)',
      }}
    >
      {/* Image */}
      <div style={{ position:'relative', aspectRatio:'4/3', overflow:'hidden', background:'#0d1f35' }}>
        <Image
          src={product.image} alt={product.name} fill
          className="object-cover"
          style={{ transition:'transform .55s ease', transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
          sizes="25vw"
        />
        {/* vignette */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 50%)', zIndex:1 }} />

        {/* badge */}
        <span style={{
          position:'absolute', top:8, left:8, zIndex:2,
          fontSize:'9px', fontWeight:900, padding:'3px 8px',
          borderRadius:'999px', color:'#fff',
          background: product.badgeGrad, boxShadow:'0 2px 6px rgba(0,0,0,.3)',
        }}>
          {product.badge}
        </span>

        {/* discount pill */}
        <span style={{
          position:'absolute', top:8, right:8, zIndex:2,
          fontSize:'9px', fontWeight:900, padding:'3px 7px',
          borderRadius:'999px', color:'#fff',
          background:'rgba(0,0,0,.55)', backdropFilter:'blur(4px)',
        }}>
          -{disc}%
        </span>

        {/* Wishlist */}
        <button
          type="button"
          onClick={e => { e.stopPropagation(); setWished(w => !w); }}
          style={{
            position:'absolute', bottom:8, right:8, zIndex:3,
            width:28, height:28, borderRadius:'50%', border:'none',
            background:'rgba(255,255,255,.88)', backdropFilter:'blur(6px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'scale(1)' : 'scale(.75)',
            transition:'opacity .25s, transform .25s',
          }}
        >
          <Heart style={{ width:12, height:12, color: wished ? '#ef4444' : '#9ca3af', fill: wished ? '#ef4444' : 'none' }} />
        </button>

        {/* Accent top-edge glow */}
        <div style={{
          position:'absolute', top:0, left:0, right:0, height:3,
          background: product.badgeGrad,
          opacity: hovered ? 1 : 0,
          transition:'opacity .3s',
          zIndex:3,
        }} />
      </div>

      {/* Body */}
      <div style={{ padding:'12px 12px 14px' }}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:6,
        }}>
          <span style={{
            fontSize:'9px', fontWeight:800, color: product.accent,
            background: product.accent + '20', padding:'2px 7px', borderRadius:'6px',
          }}>
            {product.category}
          </span>
          {/* rating stars */}
          <div style={{ display:'flex', alignItems:'center', gap:2 }}>
            <Star style={{ width:10, height:10, fill:'#fbbf24', color:'#fbbf24' }} />
            <span style={{ fontSize:'9px', color:'rgba(255,255,255,.5)', fontWeight:600 }}>{product.rating}</span>
          </div>
        </div>

        <div style={{ fontSize:'12px', fontWeight:800, color:'rgba(255,255,255,.9)', lineHeight:1.35, marginBottom:8 }}>
          {product.name}
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
            <span style={{ fontSize:'14px', fontWeight:900, color:'#fff' }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize:'10px', color:'rgba(255,255,255,.35)', textDecoration:'line-through' }}>₹{product.originalPrice.toLocaleString()}</span>
          </div>
          {/* Add to cart button */}
          <button
            type="button"
            style={{
              width:28, height:28, borderRadius:'50%', border:'none', cursor:'pointer',
              background: hovered ? product.accent : 'rgba(255,255,255,.12)',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'background .25s, transform .2s, box-shadow .25s',
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              boxShadow: hovered ? `0 4px 12px ${product.accent}55` : 'none',
            }}
          >
            <ShoppingBag style={{ width:12, height:12, color: hovered ? '#fff' : 'rgba(255,255,255,.6)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}


function TiltCard({
  product, delay, scrollY, visible,
}: {
  product: typeof PRODUCTS[0];
  delay: number;
  scrollY: number;
  visible: boolean;
}) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ rx: -cy * 7, ry: cx * 7 });   // was 18 — now soft 7°
  }, []);

  // Parallax offset based on scroll
  const parallaxY = (product.pos.z * 0.3) * (scrollY - 0.4);

  const baseRx = product.pos.rx;
  const baseRy = product.pos.ry;

  return (
    <div
      style={{
        perspective: '900px',
        width: '200px',
        flexShrink: 0,
        opacity:    visible ? 1 : 0,
        transition: `opacity .8s ease ${delay}ms`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ rx: 0, ry: 0 }); setHovered(false); }}
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transform: hovered
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.03,1.03,1.03) translateY(${-6 + parallaxY}px)`
            : `rotateX(${baseRx}deg) rotateY(${baseRy}deg) scale3d(1,1,1) translateY(${parallaxY}px)`,
          transition: hovered
            ? 'transform .18s ease-out, box-shadow .3s ease'
            : 'transform .7s cubic-bezier(.22,1,.36,1), box-shadow .4s ease',
          boxShadow: hovered
            ? `0 32px 60px rgba(0,0,0,.28), 0 0 0 1px rgba(255,255,255,.15), 0 0 40px ${product.accent}55`
            : `0 16px 40px rgba(0,0,0,.18), 0 0 0 1px rgba(255,255,255,.1)`,
          background: '#fff',
          willChange: 'transform',
        }}
      >
        {/* ── Glossy top-edge reflection ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '60%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,.18) 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 4, borderRadius: '24px 24px 0 0',
        }} />

        {/* ── Accent glow on face ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${product.accent}22 0%, transparent 65%)`,
          pointerEvents: 'none', zIndex: 3,
          opacity: hovered ? 1 : 0, transition: 'opacity .3s',
        }} />

        {/* Image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', background: '#f3f4f6' }}>
          <Image
            src={product.image} alt={product.name} fill
            className="object-cover"
            style={{ transition: 'transform .6s ease', transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
            sizes="200px"
          />
          {/* vignette */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.55) 0%, transparent 55%)', zIndex: 1 }} />

          {/* badge */}
          <span style={{
            position: 'absolute', top: 10, left: 10, zIndex: 2,
            fontSize: '9px', fontWeight: 900, padding: '4px 9px',
            borderRadius: '999px', color: '#fff', letterSpacing: '.04em',
            background: product.badgeGrad,
            boxShadow: '0 2px 8px rgba(0,0,0,.25)',
          }}>
            {product.badge}
          </span>

          {/* discount */}
          <span style={{
            position: 'absolute', top: 10, right: 10, zIndex: 2,
            fontSize: '9px', fontWeight: 900, padding: '3px 7px',
            borderRadius: '999px', color: '#fff',
            background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)',
          }}>
            -{disc}%
          </span>

          {/* Wishlist */}
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setWished(w => !w); }}
            style={{
              position: 'absolute', bottom: 10, right: 10, zIndex: 5,
              width: 30, height: 30, borderRadius: '50%', border: 'none',
              background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', opacity: hovered ? 1 : 0,
              transition: 'opacity .25s, transform .2s',
              transform: hovered ? 'scale(1)' : 'scale(.8)',
            }}
          >
            <Heart style={{ width: 13, height: 13, color: wished ? '#ef4444' : '#9ca3af', fill: wished ? '#ef4444' : 'none' }} />
          </button>

          {/* Price overlay on image bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '10px' }}>
            <div style={{ fontSize: '15px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
              ₹{product.price.toLocaleString()}
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,.65)', textDecoration: 'line-through', marginTop: 2 }}>
              ₹{product.originalPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Card bottom */}
        <div style={{ padding: '12px 12px 14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#111827', lineHeight: 1.3, marginBottom: 6 }}>
            {product.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: 10, height: 10, fill: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb', color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb' }} />
              ))}
              <span style={{ fontSize: '9px', color: '#9ca3af', marginLeft: 2 }}>{product.reviews}</span>
            </div>
            <span style={{
              fontSize: '9px', fontWeight: 700, color: product.accent,
              background: product.accent + '18', padding: '2px 6px', borderRadius: '6px',
            }}>
              {product.category}
            </span>
          </div>

          {/* Add to cart — slides up on hover */}
          <div style={{
            marginTop: 10, overflow: 'hidden',
            maxHeight: hovered ? '36px' : '0px',
            opacity: hovered ? 1 : 0,
            transition: 'max-height .3s ease, opacity .25s ease',
          }}>
            <button
              type="button"
              style={{
                width: '100%', padding: '8px', borderRadius: '12px', border: 'none',
                background: `linear-gradient(135deg, ${product.accent}, ${product.accent}cc)`,
                color: '#fff', fontWeight: 800, fontSize: '11px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                boxShadow: `0 4px 14px ${product.accent}55`,
              }}
            >
              <ShoppingBag style={{ width: 12, height: 12 }} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Floating 3D stat chip ─────────────────────────────────────────────────────
function StatChip({ stat, delay, scrollY, visible, index }: {
  stat: typeof STATS[0]; delay: number; scrollY: number; visible: boolean; index: number;
}) {
  const [hov, setHov] = useState(false);
  const floatOffset = Math.sin((scrollY * Math.PI * 2) + index * 1.2) * 6;
  const Icon = stat.icon;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        perspective: '600px',
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'none' : 'translateY(30px)',
        transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${stat.color}33`,
        borderRadius: '20px',
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        cursor: 'default',
        transform: hov
          ? `rotateY(-4deg) rotateX(2deg) translateY(${floatOffset - 4}px) scale(1.03)`
          : `rotateY(0deg) rotateX(0deg) translateY(${floatOffset}px)`,
        transition: hov ? 'transform .18s ease-out, box-shadow .3s' : 'transform .8s cubic-bezier(.22,1,.36,1), box-shadow .3s',
        boxShadow: hov
          ? `0 20px 44px rgba(0,0,0,.14), 0 0 0 1px ${stat.color}44, 0 0 24px ${stat.glow}`
          : `0 8px 28px rgba(0,0,0,.08), 0 0 0 1px ${stat.color}22`,
        willChange: 'transform',
      }}>
        {/* Icon circle */}
        <div style={{
          width: 42, height: 42, borderRadius: '14px', flexShrink: 0,
          background: stat.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 12px ${stat.glow}`,
        }}>
          <Icon style={{ width: 20, height: 20, color: stat.color }} />
        </div>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
          <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: 600, marginTop: 2 }}>{stat.label}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
interface MarketplaceShowcaseProps {
  onExplore?: () => void;
  className?: string;
}

export default function MarketplaceShowcase({ onExplore, className = '' }: MarketplaceShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollY    = useScrollY(sectionRef);
  const visible    = useInView(sectionRef, 0.08);
  const [cat, setCat]       = useState('all');
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  // Global mouse for scene tilt
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseXY({
      x: (e.clientX - rect.left) / rect.width  - 0.5,
      y: (e.clientY - rect.top)  / rect.height - 0.5,
    });
  }, []);

  const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.tag === cat);

  // Scene tilt from mouse (very subtle)
  const sceneRx = mouseXY.y * -2;
  const sceneRy = mouseXY.x *  2.5;

  return (
    <section
      ref={sectionRef}
      aria-label="3D Marketplace Showcase"
      className={`relative w-full overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      style={{ background: 'linear-gradient(145deg,#0a1628 0%,#0d2137 35%,#071a2e 65%,#0a0f1e 100%)', borderRadius: '32px', minHeight: '640px' }}
    >
      {/* ── Deep space background stars ── */}
      {[...Array(55)].map((_, i) => (
        <div key={i} aria-hidden="true" style={{
          position: 'absolute', borderRadius: '50%', background: '#fff', pointerEvents: 'none',
          width:   [1,1,1,2,1.5,1][i % 6],
          height:  [1,1,1,2,1.5,1][i % 6],
          top:     `${(i * 137.508) % 100}%`,
          left:    `${(i * 97.341)  % 100}%`,
          opacity: [.15,.25,.2,.35,.1,.3][i % 6],
          animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.3) % 4}s`,
        }} />
      ))}

      {/* ── Nebula glows ── */}
      <div aria-hidden="true" style={{ position:'absolute', width:600, height:600, top:'-20%', left:'-10%', borderRadius:'50%', background:'radial-gradient(circle,rgba(5,150,105,.18) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', width:500, height:500, bottom:'-15%', right:'-5%', borderRadius:'50%', background:'radial-gradient(circle,rgba(99,102,241,.16) 0%,transparent 65%)', pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', width:350, height:350, top:'30%', right:'25%', borderRadius:'50%', background:'radial-gradient(circle,rgba(14,165,233,.12) 0%,transparent 65%)', pointerEvents:'none' }} />

      {/* ── Horizon glow line ── */}
      <div aria-hidden="true" style={{ position:'absolute', bottom:'38%', left:0, right:0, height:1, background:'linear-gradient(90deg,transparent 0%,rgba(5,150,105,.4) 30%,rgba(14,165,233,.5) 60%,transparent 100%)', pointerEvents:'none' }} />
      <div aria-hidden="true" style={{ position:'absolute', bottom:'38%', left:'10%', right:'10%', height:40, background:'linear-gradient(to top,rgba(5,150,105,.08),transparent)', pointerEvents:'none', filter:'blur(8px)' }} />

      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:.15} 50%{opacity:.7} }
        @keyframes floatY  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
        @keyframes floatY2 { 0%,100%{transform:translateY(-8px)} 50%{transform:translateY(8px)} }
        @keyframes rotateSlow { from{transform:rotateZ(0deg)} to{transform:rotateZ(360deg)} }
        @keyframes pulse3d { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.05)} }
      `}</style>

      {/* ── MAIN INNER LAYOUT ── */}
      <div style={{ position:'relative', zIndex:10, padding:'52px 40px 56px', display:'flex', flexDirection:'column', gap:48 }}>

        {/* ── HEADER ── */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:20,
          opacity:   visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(32px)',
          transition:'opacity .9s ease, transform .9s ease',
        }}>
          <div style={{ maxWidth: 560 }}>
            
            <h2 style={{
              fontSize:'clamp(2.1rem,4.5vw,3.4rem)', fontWeight:900, lineHeight:1.08,
              letterSpacing:'-.025em', color:'#fff',
            }}>
              Your Marketplace,
              <br />
              <span style={{
                display:'inline-block', marginTop:4,
                background:'linear-gradient(135deg,#34d399 0%,#38bdf8 50%,#818cf8 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>
                Reimagined
              </span>
            </h2>
            <p style={{ marginTop:12, fontSize:15, color:'rgba(255,255,255,.5)', fontWeight:500, lineHeight:1.6 }}>
              Discover a smarter way to shop, sell, and explore.
            </p>
          </div>

          <Link
            href="/search" onClick={onExplore}
            style={{
              display:'inline-flex', alignItems:'center', gap:10, textDecoration:'none',
              color:'#fff', fontWeight:800, fontSize:14, padding:'14px 28px', borderRadius:16,
              background:'linear-gradient(135deg,#059669,#0284c7)',
              boxShadow:'0 8px 32px rgba(5,150,105,.45), inset 0 1px 0 rgba(255,255,255,.15)',
              border:'1px solid rgba(255,255,255,.1)',
              transition:'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(5,150,105,.6), inset 0 1px 0 rgba(255,255,255,.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 8px 32px rgba(5,150,105,.45), inset 0 1px 0 rgba(255,255,255,.15)'; }}
          >
            <ShoppingBag style={{ width:16, height:16 }} />
            Explore the Marketplace
            <ArrowRight style={{ width:16, height:16 }} />
          </Link>
        </div>

        {/* ── 3D FLOATING CARDS SCENE ── */}
        <div style={{
          position:'relative',
          perspective:'1200px',
          perspectiveOrigin:'50% 50%',
          minHeight: 380,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {/* Scene container — rotates slightly with mouse */}
          <div style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            gap:24, flexWrap:'wrap',
            transformStyle:'preserve-3d',
            transform: `rotateX(${sceneRx + scrollY * 4}deg) rotateY(${sceneRy}deg)`,
            transition:'transform .15s linear',
            padding:'20px 0 20px',
          }}>
            {PRODUCTS.map((p, i) => (
              <TiltCard key={p.id} product={p} delay={i * 90} scrollY={scrollY} visible={visible} />
            ))}
          </div>

          {/* Ground reflection plane */}
          <div aria-hidden="true" style={{
            position:'absolute', bottom:0, left:'5%', right:'5%', height:80,
            background:'linear-gradient(to top,rgba(5,150,105,.06),transparent)',
            borderTop:'1px solid rgba(5,150,105,.15)',
            filter:'blur(2px)', pointerEvents:'none',
          }} />
        </div>

        {/* ── CATEGORY FILTER PILLS ── */}
        <div style={{
          display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center',
          opacity:   visible ? 1 : 0,
          transition:'opacity .8s ease .35s',
        }}>
          {[
            { id:'all',         label:'All ✦',    active:'#059669' },
            { id:'fashion',     label:'Fashion',   active:'#ec4899' },
            { id:'electronics', label:'Tech',      active:'#0ea5e9' },
            { id:'home',        label:'Home',      active:'#f59e0b' },
          ].map(c => (
            <button
              key={c.id} type="button"
              onClick={() => setCat(c.id)}
              style={{
                padding:'8px 20px', borderRadius:'999px', border:'none', cursor:'pointer',
                fontSize:12, fontWeight:800, letterSpacing:'.04em',
                background: cat === c.id ? c.active : 'rgba(255,255,255,.1)',
                color: cat === c.id ? '#fff' : 'rgba(255,255,255,.55)',
                backdropFilter:'blur(8px)',
                boxShadow: cat === c.id ? `0 4px 16px ${c.active}55` : 'none',
                transform: cat === c.id ? 'scale(1.06)' : 'scale(1)',
                transition:'all .25s ease',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ── 4-COLUMN PRODUCT GRID ── */}
        <div
          style={{
            display:'grid',
            gridTemplateColumns:'repeat(4, 1fr)',
            gap:16,
            opacity:   visible ? 1 : 0,
            transition:'opacity .8s ease .45s',
          }}
        >
          {filtered.map((p, i) => (
            <ProductGridCard key={p.id} product={p} index={i} visible={visible} />
          ))}
        </div>

        {/* ── STATS ROW ── */}
        <div style={{
          display:'flex', flexWrap:'wrap', gap:16, justifyContent:'center',
        }}>
          {STATS.map((s, i) => (
            <StatChip key={s.label} stat={s} delay={i * 80 + 400} scrollY={scrollY} visible={visible} index={i} />
          ))}
        </div>

        {/* ── BOTTOM ROW ── */}
        <div style={{
          display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:16,
          paddingTop:8, borderTop:'1px solid rgba(255,255,255,.08)',
          opacity:   visible ? 1 : 0,
          transition:'opacity .8s ease .7s',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
            {[
              { icon:ShieldCheck, text:'Verified Sellers',    color:'#34d399' },
              { icon:Zap,         text:'Same-day Delivery',   color:'#fbbf24' },
              { icon:Star,        text:'4.8★ Avg Rating',     color:'#a78bfa' },
            ].map(({ icon:Ic, text, color }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:7 }}>
                <Ic style={{ width:14, height:14, color }} />
                <span style={{ fontSize:12, fontWeight:600, color:'rgba(255,255,255,.55)' }}>{text}</span>
              </div>
            ))}
          </div>
          <Link href="/search" onClick={onExplore} style={{
            display:'inline-flex', alignItems:'center', gap:6,
            fontSize:13, fontWeight:700, color:'#34d399', textDecoration:'none',
            transition:'gap .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.gap = '10px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '6px')}
          >
            Browse all 50,000+ products <ArrowRight style={{ width:14, height:14 }} />
          </Link>
        </div>
      </div>
    </section>
  );
}
