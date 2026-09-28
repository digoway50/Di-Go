import React from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { Product } from '../data/products';

interface SizeGuideModalProps {
  product: Product | null;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#121316] border border-stone-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-stone-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Ruler className="w-5 h-5 text-stone-400" />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight font-display">
                Garment Measurement Guide
              </h2>
              <p className="text-xs text-stone-400 font-mono">
                {product.name} · {product.fit}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
            aria-label="Close measurement guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Note on Fit */}
        <div className="p-3.5 bg-stone-900/80 border border-stone-800 text-xs text-stone-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            All measurements are taken flat across the garment in centimeters. Fleex Garments are pre-shrunk through a mineral cold wash, so measurements will not alter after washing.
          </p>
        </div>

        {/* Table of measurements */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono tabular-nums border-collapse">
            <thead>
              <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">Chest / Waist</th>
                <th className="py-2.5 px-3">Total Length</th>
                <th className="py-2.5 px-3">Shoulder / Thigh</th>
                <th className="py-2.5 px-3">Sleeve / Hem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-850">
              {product.measurements.map(row => (
                <tr key={row.size} className="hover:bg-stone-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{row.size}</td>
                  <td className="py-3 px-3 text-stone-300">{row.chest}</td>
                  <td className="py-3 px-3 text-stone-300">{row.length}</td>
                  <td className="py-3 px-3 text-stone-300">{row.shoulder}</td>
                  <td className="py-3 px-3 text-stone-300">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sizing Recommendations */}
        <div className="border-t border-stone-800 pt-4 space-y-2 text-xs text-stone-400">
          <h4 className="font-semibold text-stone-200 uppercase tracking-wider font-mono">Silhouette Recommendation:</h4>
          <p>
            • For our intended architectural relaxed drape, select your standard size.
          </p>
          <p>
            • For a closer, more tailored fit under coats, consider sizing down one level.
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 font-medium text-xs tracking-wider uppercase transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
