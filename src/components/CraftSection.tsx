import React from 'react';
import { CRAFT_SPECS } from '../data/products';
import editorialCraftFabricImg from '../assets/images/editorial_craft_fabric_1790600698023.jpg';

export const CraftSection: React.FC = () => {
  return (
    <section id="craft" className="py-24 bg-[#0c0d0e] border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-850 pb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Material Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display mt-2">
              Engineered Weight & Provenance
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            Every garment is conceived as a piece of wearable architecture. We measure fiber density in grams per square meter to ensure enduring silhouettes.
          </p>
        </div>

        {/* 2-Column Split: Image on Left, Editorial Pillars on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Macro Fabric Image Frame */}
          <div className="lg:col-span-5 relative aspect-[4/3] bg-[#141518] border border-stone-800 overflow-hidden">
            <img
              src={editorialCraftFabricImg}
              alt="480 GSM French Terry Cotton Microfiber Weave"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-stone-300">
              <span className="text-stone-400 uppercase tracking-widest">Macro Analysis:</span>
              <p className="text-white mt-0.5 font-sans font-medium">
                High-density 480 GSM loopback weave with twin-needle reinforced edge
              </p>
            </div>
          </div>

          {/* Editorial Pillars (Allowed: Natural human editorial numbering) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {CRAFT_SPECS.map(spec => (
              <div key={spec.number} className="space-y-2 border-l border-stone-800 pl-5">
                <div className="text-xs font-mono text-stone-500 font-bold">
                  {spec.number}.
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {spec.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantitative Proof Adjacency Banner */}
        <div className="bg-[#121316] border border-stone-800 p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center font-mono">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums font-display">480 GSM</div>
            <div className="text-xs text-stone-400 uppercase tracking-wider">Fiber Grammage</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums font-display">0%</div>
            <div className="text-xs text-stone-400 uppercase tracking-wider">Polyester Fillers</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums font-display">100%</div>
            <div className="text-xs text-stone-400 uppercase tracking-wider">Pre-Shrunk Washed</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums font-display">&lt;200</div>
            <div className="text-xs text-stone-400 uppercase tracking-wider">Per Drop Batch Size</div>
          </div>
        </div>
      </div>
    </section>
  );
};
