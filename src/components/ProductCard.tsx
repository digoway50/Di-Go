import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { formatPrice, addToCart, isInWishlist, toggleWishlist } = useCart();
  
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || product.sizes[0]);
  const [showSizePicker, setShowSizePicker] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const activeColor = product.colors[selectedColorIndex] || product.colors[0];
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (sizeToUse: string, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, sizeToUse, activeColor.name, 1);
    setJustAdded(true);
    setShowSizePicker(false);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div 
      className="group relative flex flex-col bg-[#121315] border border-stone-850 hover:border-stone-700 transition-all duration-300 rounded-none overflow-hidden"
    >
      {/* Product Image Slot (65-75% visual weight) */}
      <div 
        className="relative w-full aspect-[3/4] bg-[#16181b] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        {!imageError ? (
          <img
            src={product.primaryImage}
            alt={`${product.name} in ${activeColor.name}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-500 bg-stone-900">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400">{product.categoryLabel}</span>
            <span className="text-sm font-medium text-stone-300 mt-2 text-center">{product.name}</span>
            <span className="text-xs text-stone-500 mt-1">{product.gsm}</span>
          </div>
        )}

        {/* Top Badges / Wishlist Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="text-[11px] font-mono tracking-widest uppercase text-stone-200 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-stone-800">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-rose-950/80 text-rose-400 border border-rose-800/80'
                : 'bg-black/40 text-stone-300 hover:text-white hover:bg-black/70 border border-white/10'
            }`}
            aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
          </button>
        </div>

        {/* Quick View Floating Action */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2.5 px-3 bg-stone-900/90 hover:bg-stone-900 text-stone-200 text-xs font-medium tracking-wide uppercase backdrop-blur-sm border border-stone-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSizePicker(prev => !prev);
            }}
            className="py-2.5 px-3 bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold tracking-wide uppercase transition-colors flex items-center justify-center gap-1"
            aria-label="Select size to add"
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Size Selection Overlay Dropdown */}
        {showSizePicker && (
          <div 
            className="absolute inset-x-3 bottom-14 p-3 bg-[#111214] border border-stone-700 shadow-2xl z-20 animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2 font-mono">
              <span>Select Size</span>
              <span>{activeColor.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={(e) => handleQuickAdd(size, e)}
                  className={`py-1.5 text-xs font-mono text-center border transition-colors ${
                    selectedSize === size
                      ? 'border-stone-300 bg-stone-800 text-white font-bold'
                      : 'border-stone-800 bg-stone-900/80 text-stone-300 hover:border-stone-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono tracking-wider">
            <span className="uppercase">{product.categoryLabel}</span>
            {product.gsm && (
              <span className="text-stone-300 tabular-nums">{product.gsm}</span>
            )}
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="mt-1.5 text-sm sm:text-base font-semibold text-stone-100 hover:text-white transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {product.name}
          </h3>

          {/* Fit description */}
          <p className="mt-1 text-xs text-stone-400 line-clamp-1">
            {product.fit} · {product.fabric.split(',')[0]}
          </p>
        </div>

        {/* Color Swatches and Price Row */}
        <div className="pt-2 border-t border-stone-850/80 flex items-center justify-between">
          {/* Color Swatch Dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColorIndex(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColorIndex === idx 
                    ? 'border-white scale-110 shadow-sm' 
                    : 'border-stone-700 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Select color ${c.name}`}
              />
            ))}
          </div>

          {/* Price baseline with tabular nums */}
          <div className="flex items-baseline gap-2">
            {product.compareAtPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-semibold text-white font-mono tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
