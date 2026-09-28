import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/products';

export interface CartItem {
  id: string; // unique item id = `${productId}-${size}-${color}`
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export type Currency = 'PKR' | 'INR' | 'USD';

interface CurrencyRate {
  symbol: string;
  rate: number;
  code: Currency;
  name: string;
}

export const CURRENCIES: Record<Currency, CurrencyRate> = {
  PKR: { symbol: 'Rs. ', rate: 1, code: 'PKR', name: 'PKR (Rs.)' },
  INR: { symbol: '₹ ', rate: 0.30, code: 'INR', name: 'INR (₹)' },
  USD: { symbol: '$ ', rate: 0.0036, code: 'USD', name: 'USD ($)' },
};

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountInRs: number) => string;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  shippingFee: number;
  freeShippingThreshold: number;
  finalTotal: number;
  
  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideProduct: Product | null;
  setSizeGuideProduct: (product: Product | null) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fleex_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fleex_wishlist');
      return saved ? JSON.parse(saved) : ['flx-sk-01'];
    } catch {
      return ['flx-sk-01'];
    }
  });

  // Default currency is PKR with symbol Rs.
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountFixed, setDiscountFixed] = useState<number>(0);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideProduct, setSizeGuideProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('fleex_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('fleex_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const formatPrice = (amountInRs: number): string => {
    const cur = CURRENCIES[currency];
    const converted = amountInRs * cur.rate;
    return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          size,
          color,
          quantity,
          unitPrice: product.price
        }
      ];
    });
    showToast(`Added ${product.name} (${size} / ${color}) to bag.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from bag.');
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFixed(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const prod = PRODUCTS.find(p => p.id === productId);
      const name = prod ? prod.name : 'Garment';
      if (exists) {
        showToast(`Removed ${name} from saved items.`);
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Saved ${name} to your wishlist.`);
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'FLEEX10') {
      setPromoCode('FLEEX10');
      setDiscountPercent(10);
      setDiscountFixed(0);
      showToast('10% order discount applied.');
      return { success: true, message: '10% discount applied to your order!' };
    } else if (trimmed === 'DROP04') {
      setPromoCode('DROP04');
      setDiscountFixed(1000);
      setDiscountPercent(0);
      showToast('Rs. 1,000 Drop 04 launch voucher applied.');
      return { success: true, message: 'Rs. 1,000 credit applied successfully!' };
    } else if (trimmed === 'FREESHIP') {
      setPromoCode('FREESHIP');
      setDiscountFixed(450);
      setDiscountPercent(0);
      showToast('Complimentary courier applied.');
      return { success: true, message: 'Free courier delivery unlocked!' };
    } else {
      return { success: false, message: 'Invalid promo code. Try FLEEX10 or DROP04' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountFixed(0);
    showToast('Promo code removed.');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  // Free shipping over Rs. 6,000
  const freeShippingThreshold = 6000;
  const standardCourierFee = 450;
  const shippingFee = subtotal >= freeShippingThreshold || promoCode === 'FREESHIP' || cart.length === 0 ? 0 : standardCourierFee;

  let calculatedDiscount = 0;
  if (discountPercent > 0) {
    calculatedDiscount = (subtotal * discountPercent) / 100;
  } else if (discountFixed > 0) {
    calculatedDiscount = Math.min(discountFixed, subtotal);
  }

  const finalTotal = Math.max(0, subtotal - calculatedDiscount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        currency,
        setCurrency,
        formatPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount: calculatedDiscount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        shippingFee,
        freeShippingThreshold,
        finalTotal,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideProduct,
        setSizeGuideProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
