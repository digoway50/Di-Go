import React from 'react';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#141618] border border-stone-700 text-stone-100 text-xs px-4 py-3 shadow-2xl flex items-center gap-2.5 font-mono max-w-sm">
        <div className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-emerald-400 shrink-0">
          <Check className="w-2.5 h-2.5" />
        </div>
        <span className="leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
