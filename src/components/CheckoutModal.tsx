import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    finalTotal,
    subtotal,
    discount,
    shippingFee,
    formatPrice,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  // Form states
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Vanderbilt',
    email: 'alex.vanderbilt@example.com',
    phone: '+1 (555) 392-8174',
    address: '450 West 24th Street, Apt 8B',
    city: 'New York',
    state: 'NY',
    postalCode: '10011',
    country: 'United States',
    shippingMethod: 'express',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '08/28',
    cardCvc: '•••',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrder = `FLX-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setStep('confirmation');
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep('shipping');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-[#0f1012] border border-stone-800 w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col text-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-white font-display">
              FLEEX GARMENTS
            </span>
            <span className="text-stone-600">/</span>
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400">
              {step === 'shipping' && 'Step 1: Shipping Address'}
              {step === 'payment' && 'Step 2: Payment & Review'}
              {step === 'confirmation' && 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={handleFinish}
            className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: SHIPPING DETAILS */}
          {step === 'shipping' && (
            <form onSubmit={handleProceedToPayment} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-100 uppercase font-mono tracking-wider">
                  Contact & Dispatch Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-400 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      className="w-full px-3 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-stone-400 mb-1">Country *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full px-2 py-2 bg-stone-900 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order summary mini recap */}
              <div className="p-4 bg-stone-900/60 border border-stone-800 flex items-center justify-between text-xs font-mono">
                <span className="text-stone-400">Total payable ({cart.length} items):</span>
                <span className="text-white font-bold text-sm tabular-nums">{formatPrice(finalTotal)}</span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="text-xs text-stone-400 hover:text-white uppercase font-mono tracking-wider"
                >
                  Return to Bag
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PAYMENT & CONFIRMATION */}
          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-stone-100 uppercase font-mono tracking-wider">
                  Payment Method
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                      formData.paymentMethod === 'card'
                        ? 'border-white bg-stone-800/80 text-white'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-4 h-4" />
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => handleInputChange('paymentMethod', 'card')}
                        className="sr-only"
                      />
                    </div>
                    <span className="text-xs font-mono mt-3">Credit / Debit</span>
                  </label>

                  <label
                    className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                      formData.paymentMethod === 'applepay'
                        ? 'border-white bg-stone-800/80 text-white'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs font-display">PAY</span>
                      <input
                        type="radio"
                        name="payment"
                        value="applepay"
                        checked={formData.paymentMethod === 'applepay'}
                        onChange={() => handleInputChange('paymentMethod', 'applepay')}
                        className="sr-only"
                      />
                    </div>
                    <span className="text-xs font-mono mt-3">Apple / Google Pay</span>
                  </label>

                  <label
                    className={`p-3.5 border cursor-pointer flex flex-col justify-between transition-colors ${
                      formData.paymentMethod === 'cod'
                        ? 'border-white bg-stone-800/80 text-white'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Truck className="w-4 h-4" />
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => handleInputChange('paymentMethod', 'cod')}
                        className="sr-only"
                      />
                    </div>
                    <span className="text-xs font-mono mt-3">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="p-4 bg-stone-900/60 border border-stone-800 space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-stone-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-stone-400 mb-1">Expiry</label>
                        <input
                          type="text"
                          required
                          value={formData.cardExp}
                          onChange={(e) => handleInputChange('cardExp', e.target.value)}
                          className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-stone-400 mb-1">CVC</label>
                        <input
                          type="text"
                          required
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                          className="w-full px-3 py-2 bg-stone-950 border border-stone-800 text-xs text-stone-200 focus:outline-none focus:border-stone-500 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'cod' && (
                  <div className="p-4 bg-stone-900/60 border border-stone-800 text-xs text-stone-300 space-y-1">
                    <p className="font-semibold text-white">Cash on Delivery Selected</p>
                    <p className="text-stone-400">
                      Payment will be collected by courier upon physical delivery at {formData.address}, {formData.city}.
                    </p>
                  </div>
                )}
              </div>

              {/* Order total recap */}
              <div className="border-t border-stone-800 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Discount</span>
                    <span className="tabular-nums">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Tracked Courier</span>
                  <span className="tabular-nums">{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span className="tabular-nums">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-stone-400 hover:text-white uppercase font-mono tracking-wider"
                >
                  Back to Address
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-white hover:bg-stone-200 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Securing Order...</span>
                  ) : (
                    <span>Place Order · {formatPrice(finalTotal)}</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER CONFIRMED */}
          {step === 'confirmation' && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-600/80 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight font-display">
                  Order {orderNumber} Confirmed
                </h3>
                <p className="text-xs text-stone-400 font-mono">
                  Receipt sent to {formData.email} · Preparing shipment for {formData.firstName} {formData.lastName}
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto p-5 bg-[#141518] border border-stone-800 text-left text-xs space-y-3 font-mono">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Dispatch Address:</span>
                  <span className="text-stone-200 text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Payment Status:</span>
                  <span className="text-emerald-400 uppercase">
                    {formData.paymentMethod === 'cod' ? 'Authorized (Pay on Delivery)' : 'Paid in Full'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="text-stone-400">Estimated Delivery:</span>
                  <span className="text-stone-200">2-4 Business Days</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-400">Total Charged:</span>
                  <span className="text-white font-bold text-sm tabular-nums">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 border border-stone-800 bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-mono uppercase tracking-wider flex items-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={handleFinish}
                  className="px-6 py-2.5 bg-white hover:bg-stone-200 text-stone-950 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
