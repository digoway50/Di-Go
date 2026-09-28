import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import heroCampaignImg from '../assets/images/hero_fleex_campaign_1790600641108.jpg';

interface HeroProps {
  onShopClick: () => void;
  onLookbookClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onLookbookClick }) => {
  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex items-end pb-16 pt-24 bg-[#0a0b0c] overflow-hidden">
      {/* Background Media with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampaignImg}
          alt="Fleex Garments Men Salwar Kameez and Drop 04 Campaign"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-65 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Gradients ensuring 4.5:1 text legibility across all displays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e] via-[#0c0d0e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d0e]/80 via-transparent to-[#0c0d0e]/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Quiet Unboxed Metadata Kicker (Anti-Pill) */}
          <div className="flex items-center gap-2.5 text-xs tracking-widest uppercase font-mono text-stone-300">
            <span className="text-white font-semibold">Drop 04 Capsule</span>
            <span className="text-stone-500" aria-hidden="true">·</span>
            <span>Men Salwar & Kameez</span>
            <span className="text-stone-500" aria-hidden="true">·</span>
            <span className="text-stone-400">Spring/Summer 2026</span>
          </div>

          {/* Primary Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-display leading-[1.05] [text-wrap:balance]">
            Monolith Form & Heritage Drape
          </h1>

          {/* Subtitle with measure 65ch */}
          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
            Introducing bespoke men’s salwar & kameez tailored from 120/2 double-twist Egyptian cotton and raw slub linen, alongside our signature 480 GSM heavy architectural streetwear.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onShopClick}
              className="px-6 py-3.5 bg-white text-stone-950 hover:bg-stone-200 transition-colors font-semibold text-sm tracking-wide rounded-none flex items-center gap-2.5 shadow-xl group cursor-pointer"
            >
              <span>Explore Salwar & Kameez</span>
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onLookbookClick}
              className="px-6 py-3.5 border border-stone-650 bg-stone-900/60 hover:bg-stone-850 hover:border-stone-400 text-stone-200 transition-colors font-medium text-sm tracking-wide rounded-none backdrop-blur-sm flex items-center gap-2 group cursor-pointer"
            >
              <span>Lookbook 2026</span>
              <ArrowUpRight className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Claim-to-Proof Adjacent Indicators (Quiet inline text) */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-stone-300">
            <div className="space-y-1">
              <div className="font-mono text-stone-100 font-semibold uppercase tracking-wider tabular-nums">Egyptian Giza</div>
              <div className="text-stone-300">High-count two-piece suits</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-stone-100 font-semibold uppercase tracking-wider">Free Delivery</div>
              <div className="text-stone-300">On all orders over Rs. 6,000</div>
            </div>
            <div className="space-y-1 hidden sm:block">
              <div className="font-mono text-stone-100 font-semibold uppercase tracking-wider">Cash on Delivery</div>
              <div className="text-stone-300">Pay upon courier doorstep inspection</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
