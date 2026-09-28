import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, Product } from '../data/products';

interface WishlistDrawerProps {
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onSelectProduct }) => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
  } = useCart();

  if (!isWishlistOpen) return null;

  const savedProducts = wishlist
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as Product[];

  const handleMoveToCart = (prod: Product) => {
    addToCart(prod, prod.sizes[0] || 'M', prod.colors[0].name, 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1012] border-l border-stone-800 text-stone-200 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono">
                Saved Garments ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
              aria-label="Close wishlist drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-850">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider font-mono">
                  No saved garments yet
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Tap the heart on any garment to save pieces to your personal archive.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Browse Pieces
                </button>
              </div>
            ) : (
              savedProducts.map((prod, idx) => (
                <div key={prod.id} className={`flex gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                  <div
                    className="w-20 h-24 bg-stone-900 border border-stone-800 shrink-0 overflow-hidden cursor-pointer"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      onSelectProduct(prod);
                    }}
                  >
                    <img
                      src={prod.primaryImage}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsWishlistOpen(false);
                            onSelectProduct(prod);
                          }}
                          className="text-xs font-semibold text-stone-100 hover:text-white transition-colors cursor-pointer line-clamp-1"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${prod.name} from wishlist`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-400 font-mono mt-0.5">
                        <span>{prod.gsm || prod.categoryLabel}</span>
                        <span className="mx-1.5">·</span>
                        <span className="text-stone-200 tabular-nums">{formatPrice(prod.price)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleMoveToCart(prod)}
                        className="flex-1 py-1.5 px-3 bg-stone-100 hover:bg-white text-stone-950 text-xs font-mono uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
