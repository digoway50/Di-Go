import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LOOKBOOK_LOOKS, PRODUCTS, Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface LookbookSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({ onSelectProduct }) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = LOOKBOOK_LOOKS[activeLookIndex];
  const { formatPrice } = useCart();

  const featuredProducts = activeLook.featuredProductIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section id="lookbook" className="py-24 bg-[#0a0b0d] border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-850 pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Editorial Dossier
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display mt-2">
              Lookbook: Form in Tension
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            Exploring the geometry between heavy drape and rigid tailoring. Shot on location in brutalist concrete volumes.
          </p>
        </div>

        {/* Lookbook Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Frame (8 cols) */}
          <div className="lg:col-span-8 relative aspect-[16/10] bg-[#141518] border border-stone-800 overflow-hidden group">
            <img
              src={activeLook.image}
              alt={activeLook.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <div className="text-xs font-mono tracking-widest uppercase text-stone-300">
                  {activeLook.title}
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mt-1">
                  {activeLook.subtitle}
                </div>
              </div>

              {/* Look Selector Tabs */}
              <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 border border-stone-800">
                {LOOKBOOK_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    onClick={() => setActiveLookIndex(idx)}
                    className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer ${
                      activeLookIndex === idx
                        ? 'bg-white text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-white'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Garments in Current Look (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-stone-400 pb-2 border-b border-stone-850">
              Featured In This Look:
            </div>

            <div className="space-y-3">
              {featuredProducts.map(prod => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="p-3 bg-[#111214] border border-stone-850 hover:border-stone-700 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 bg-stone-900 border border-stone-800 overflow-hidden shrink-0">
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs text-stone-400 font-mono uppercase">{prod.categoryLabel}</div>
                      <div className="text-xs font-semibold text-stone-200 group-hover:text-white line-clamp-1">
                        {prod.name}
                      </div>
                      <div className="text-xs text-stone-400 font-mono tabular-nums">
                        {formatPrice(prod.price)}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 text-stone-500 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-stone-900/40 border border-stone-850 text-xs text-stone-400 leading-relaxed font-mono">
              Tip: Garments can be layered seamlessly due to calibrated shoulder pitch and drop depths.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
