import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { showToast } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('Subscribed to Fleex Garments private drop bulletins.');
  };

  return (
    <footer className="bg-[#09090b] border-t border-stone-850 text-stone-300">
      {/* Newsletter Dispatch Row */}
      <div className="border-b border-stone-850">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
                Direct Communications
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
                Drop Notifications & Private Bulletins
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
                Receive private access to small-batch capsule drops 2 hours before general public release. No marketing spam.
              </p>
            </div>

            <div className="lg:col-span-6">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 bg-stone-900 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-stone-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-stone-900/80 border border-emerald-800/80 text-emerald-400 text-xs font-mono max-w-md lg:ml-auto">
                  <Check className="w-4 h-4" />
                  <span>Enrolled into Drop 04 Private Dispatch list.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 text-xs">
        <div className="space-y-4">
          <div className="text-base font-bold text-white tracking-tight font-display">
            FLEEX GARMENTS
          </div>
          <p className="text-stone-400 leading-relaxed max-w-xs">
            Architectural garments designed for permanent form and drape. Produced in monitored small batches with GOTS-certified organic loopback cotton.
          </p>
          <div className="text-stone-500 font-mono text-[11px]">
            Studio: 44 Bleeker St, Suite 4B
          </div>
        </div>

        <div className="space-y-3">
          <div className="font-mono uppercase tracking-wider text-white font-semibold">
            Collections
          </div>
          <ul className="space-y-2 text-stone-400">
            <li><a href="#collection" className="hover:text-white transition-colors">Men Salwar & Kameez Suits</a></li>
            <li><a href="#collection" className="hover:text-white transition-colors">Giza Egyptian Cotton Kameez</a></li>
            <li><a href="#collection" className="hover:text-white transition-colors">Heavyweight 480 GSM Tops</a></li>
            <li><a href="#collection" className="hover:text-white transition-colors">Tailored Basalt Trousers</a></li>
            <li><a href="#lookbook" className="hover:text-white transition-colors">Lookbook 2026 Archive</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="font-mono uppercase tracking-wider text-white font-semibold">
            Concierge & Care
          </div>
          <ul className="space-y-2 text-stone-400">
            <li><span className="cursor-pointer hover:text-white transition-colors">Garment Sizing Guidance</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Mineral Cold Wash Instructions</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Tracked Worldwide Courier</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Complimentary Returns (30 Days)</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Repairs & Alteration Guarantee</span></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="font-mono uppercase tracking-wider text-white font-semibold">
            Standards & Transparency
          </div>
          <ul className="space-y-2 text-stone-400">
            <li><span className="cursor-pointer hover:text-white transition-colors">GOTS Organic Certification</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Yarn Weight Audit Dossier</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Zero Synthetic Packaging</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Ethical Artisan Mills</span></li>
            <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy & Terms</span></li>
          </ul>
        </div>
      </div>

      {/* Quiet Bottom Legal Bar */}
      <div className="border-t border-stone-850/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-400">
          <div>
            © {new Date().getFullYear()} FLEEX GARMENTS INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <span>TERMS OF SALE</span>
            <span>·</span>
            <span>SHIPPING & CUSTOMS</span>
            <span>·</span>
            <span>SUSTAINABILITY AUDIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
