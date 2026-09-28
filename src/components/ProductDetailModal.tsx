import React, { useState } from 'react';
import { X, Heart, Check, Ruler, Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
}) => {
  const { formatPrice, addToCart, isInWishlist, toggleWishlist } = useCart();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Sync state whenever the active product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColorIdx(0);
      setSelectedSize(product.sizes[0] || 'M');
      setQuantity(1);
      setActiveTab('details');
      setAddedAnimation(false);
    }
  }, [product]);

  if (!product) return null;

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];
  const isSaved = isInWishlist(product.id);

  const handleAdd = () => {
    addToCart(product, selectedSize, activeColor.name, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 900);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#0f1012] border border-stone-800 w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-white bg-black/60 backdrop-blur-md border border-stone-800 rounded-none transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery / Media View (Left Column) */}
        <div className="w-full md:w-1/2 bg-[#141518] relative flex items-center justify-center min-h-[380px] md:min-h-full">
          <img
            src={product.primaryImage}
            alt={`${product.name} in ${activeColor.name}`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center max-h-[640px]"
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-stone-200 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-stone-800">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Contiguous Purchase Module (Right Column) */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono tracking-wider uppercase">
              <span>{product.categoryLabel}</span>
              <span className="text-stone-600">·</span>
              <span className="text-stone-300 tabular-nums">{product.gsm}</span>
              <span className="text-stone-600">·</span>
              <span className="text-emerald-400">In Stock</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display leading-tight">
              {product.name}
            </h2>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-white font-mono tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-stone-500 line-through font-mono tabular-nums">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="space-y-2 pt-2 border-t border-stone-850">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400 uppercase tracking-wider">Color:</span>
                <span className="text-stone-200 font-medium">{activeColor.name}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c, idx) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-7 h-7 rounded-none border transition-all flex items-center justify-center cursor-pointer ${
                      selectedColorIdx === idx
                        ? 'border-white scale-105 ring-1 ring-white/50'
                        : 'border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColorIdx === idx && (
                      <Check className={`w-3.5 h-3.5 ${c.hex === '#ebe9e4' || c.hex === '#d9d4cb' ? 'text-stone-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection & Sizing Guide */}
            <div className="space-y-2 pt-2 border-t border-stone-850">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400 uppercase tracking-wider">Size:</span>
                <button
                  onClick={() => onOpenSizeGuide(product)}
                  className="text-stone-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span className="underline underline-offset-2">Size Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-xs font-mono tracking-wider transition-all border cursor-pointer ${
                      selectedSize === size
                        ? 'bg-stone-100 text-stone-950 font-bold border-stone-100'
                        : 'bg-stone-900/60 text-stone-300 border-stone-800 hover:border-stone-600 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Primary Action */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-stone-800 bg-stone-900/80 text-xs font-mono">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-stone-400 hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2.5 text-stone-200 tabular-nums font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 text-stone-400 hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add To Bag Button */}
                <button
                  onClick={handleAdd}
                  disabled={addedAnimation}
                  className={`flex-1 py-3 px-6 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    addedAnimation
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-stone-200 text-stone-950'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                  )}
                </button>

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 border transition-colors ${
                    isSaved
                      ? 'border-rose-800 bg-rose-950/60 text-rose-400'
                      : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-white hover:border-stone-700'
                  }`}
                  aria-label={isSaved ? "Saved" : "Save"}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-400' : ''}`} />
                </button>
              </div>

              {/* Quiet Reassurance */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono pt-1">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-500" />
                  Dispatch within 24h
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                  30-Day Returns
                </span>
              </div>
            </div>
          </div>

          {/* Collapsible Tabs for Specification, Care & Shipping */}
          <div className="pt-4 border-t border-stone-850 space-y-3">
            <div className="flex gap-4 border-b border-stone-850 pb-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-1 uppercase tracking-wider transition-colors ${
                  activeTab === 'details' ? 'text-white border-b-2 border-stone-200 font-semibold' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                Features & Specs
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-1 uppercase tracking-wider transition-colors ${
                  activeTab === 'care' ? 'text-white border-b-2 border-stone-200 font-semibold' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                Garment Care
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-1 uppercase tracking-wider transition-colors ${
                  activeTab === 'shipping' ? 'text-white border-b-2 border-stone-200 font-semibold' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                Shipping
              </button>
            </div>

            <div className="text-xs text-stone-300 space-y-2 min-h-[80px]">
              {activeTab === 'details' && (
                <ul className="space-y-1.5 list-disc list-inside text-stone-400">
                  {product.features.map((feat, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="text-stone-300">{feat}</span>
                    </li>
                  ))}
                  <li className="text-stone-400">
                    <strong className="text-stone-300">Fabric Composition:</strong> {product.fabric}
                  </li>
                </ul>
              )}

              {activeTab === 'care' && (
                <ul className="space-y-1.5 list-disc list-inside text-stone-400">
                  {product.care.map((c, i) => (
                    <li key={i} className="leading-relaxed text-stone-300">{c}</li>
                  ))}
                </ul>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-1.5 text-stone-400 leading-relaxed">
                  <p>
                    • <strong className="text-stone-300">Standard Delivery:</strong> 2-4 business days via tracked insured courier.
                  </p>
                  <p>
                    • <strong className="text-stone-300">Complimentary Courier:</strong> Unlocked automatically on orders over Rs. 6,000.
                  </p>
                  <p>
                    • <strong className="text-stone-300">Cash on Delivery (COD):</strong> Fully supported at doorstep across all major postal codes.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
