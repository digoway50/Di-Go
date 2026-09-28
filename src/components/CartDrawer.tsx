import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    shippingFee,
    freeShippingThreshold,
    finalTotal,
    formatPrice,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1012] border-l border-stone-800 text-stone-200 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-300" />
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono">
                Your Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#141518] border-b border-stone-800 text-xs">
            {amountToFreeShipping > 0 ? (
              <div className="space-y-2">
                <div className="flex justify-between text-stone-300">
                  <span>Complimentary Shipping Goal:</span>
                  <span className="font-semibold text-white tabular-nums">
                    Add {formatPrice(amountToFreeShipping)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-stone-200 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Complimentary tracked express courier unlocked</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-850">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider font-mono">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Discover our Drop 04 architectural silhouettes in 480 GSM combed French terry.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={item.id} className={`flex gap-4 ${idx > 0 ? 'pt-4' : ''}`}>
                  {/* Item Thumbnail */}
                  <div className="w-20 h-24 bg-stone-900 border border-stone-800 shrink-0 overflow-hidden">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-stone-100 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-stone-400 font-mono">
                        <span>{item.size}</span>
                        <span className="mx-1.5">·</span>
                        <span>{item.color}</span>
                        {item.product.gsm && (
                          <>
                            <span className="mx-1.5">·</span>
                            <span>{item.product.gsm}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper and Unit Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-800 bg-stone-900 text-xs font-mono">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-stone-400 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-stone-200 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-stone-400 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-mono font-semibold text-white tabular-nums">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-[#121316] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo (FLEEX10, DROP04)"
                      className="w-full pl-8 pr-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 uppercase font-mono placeholder:text-stone-600 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs uppercase font-mono tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {promoCode && (
                  <div className="flex items-center justify-between text-xs text-amber-300 font-mono pt-1">
                    <span>Active code: {promoCode}</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-stone-400 hover:text-white underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-rose-400 font-mono">{promoError}</p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 font-mono border-t border-stone-850 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-stone-200 tabular-nums">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-stone-850">
                  <span>Estimated Total</span>
                  <span className="tabular-nums font-mono">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 px-6 bg-white hover:bg-stone-200 text-stone-950 font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-stone-500 text-center font-mono">
                Taxes calculated at dispatch · 30-day effortless returns
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
