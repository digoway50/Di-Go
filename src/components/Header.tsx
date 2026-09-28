import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X, Menu } from 'lucide-react';
import { useCart, CURRENCIES, Currency } from '../context/CartContext';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    currency,
    setCurrency
  } = useCart();

  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c0d0e]/95 backdrop-blur-md border-b border-stone-800 transition-colors">
      {/* Slim Dismissible Promotional Banner (<= 40px) */}
      {announcementVisible && (
        <div className="relative bg-[#141518] border-b border-stone-800 text-stone-300 text-xs py-2 px-4 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="w-6" /> {/* spacer */}
            <div className="text-center font-medium tracking-wide flex items-center justify-center gap-3">
              <span className="text-stone-300 font-semibold">MEN SALWAR & KAMEEZ SUITS LIVE</span>
              <span className="text-stone-600 hidden sm:inline">·</span>
              <span className="hidden sm:inline">FREE EXPRESS COURIER OVER RS. 6,000</span>
              <span className="text-stone-600">·</span>
              <span className="text-amber-300 font-mono">CODE: FLEEX10</span>
            </div>
            <button
              onClick={() => setAnnouncementVisible(false)}
              className="text-stone-500 hover:text-stone-200 transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Strict 1-Row 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden text-stone-300 hover:text-white p-1 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:text-stone-300 transition-colors font-display"
          >
            FLEEX GARMENTS
          </a>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (single-line, subtle hover) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-300">
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            Salwar & Kameez
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('collection')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            All Garments
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('lookbook')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            Lookbook
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('craft')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            Craft & Fabric
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => scrollTo('reviews')}
            className="hover:text-white transition-colors cursor-pointer py-1 relative group"
          >
            Community
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-stone-200 transition-all duration-200 group-hover:w-full" />
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions & functional controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onSearchClick}
            className="text-stone-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-stone-800/60"
            aria-label="Search garments"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(prev => !prev)}
              className="text-xs font-semibold tracking-wider text-stone-300 hover:text-white px-2.5 py-1.5 border border-stone-800 hover:border-stone-650 bg-stone-900 transition-colors uppercase tabular-nums flex items-center gap-1 cursor-pointer"
              aria-label="Select currency"
            >
              <span>{CURRENCIES[currency].symbol.trim()}</span>
              <span className="text-[10px] text-stone-400">({currency})</span>
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#141618] border border-stone-750 shadow-2xl py-1 z-50 text-xs">
                {(Object.keys(CURRENCIES) as Currency[]).map(cur => (
                  <button
                    key={cur}
                    onClick={() => {
                      setCurrency(cur);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between transition-colors ${
                      currency === cur ? 'bg-stone-800 text-white font-bold' : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-200'
                    }`}
                  >
                    <span>{CURRENCIES[cur].name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative text-stone-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-stone-800/60"
            aria-label="View saved items"
          >
            <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-stone-700 text-stone-100 text-[10px] font-mono flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-stone-100 hover:bg-white text-stone-950 rounded-none font-medium text-xs sm:text-sm tracking-wide transition-colors whitespace-nowrap cursor-pointer"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-semibold">Bag</span>
            <span className="font-mono tabular-nums font-bold">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-[#0f1012] px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col space-y-3 text-sm font-medium tracking-wide text-stone-300">
            <button
              onClick={() => scrollTo('collection')}
              className="text-left py-2 hover:text-white border-b border-stone-850"
            >
              Men Salwar & Kameez
            </button>
            <button
              onClick={() => scrollTo('collection')}
              className="text-left py-2 hover:text-white border-b border-stone-850"
            >
              All Garments
            </button>
            <button
              onClick={() => scrollTo('lookbook')}
              className="text-left py-2 hover:text-white border-b border-stone-850"
            >
              Lookbook
            </button>
            <button
              onClick={() => scrollTo('craft')}
              className="text-left py-2 hover:text-white border-b border-stone-850"
            >
              Craft & Fabric
            </button>
            <button
              onClick={() => scrollTo('reviews')}
              className="text-left py-2 hover:text-white"
            >
              Community Reviews
            </button>
          </div>

          <div className="pt-4 border-t border-stone-850 flex items-center justify-between text-xs text-stone-400">
            <span>Currency</span>
            <div className="flex gap-2">
              {(Object.keys(CURRENCIES) as Currency[]).map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-1 border text-xs font-mono ${
                    currency === cur
                      ? 'border-stone-400 bg-stone-800 text-white font-bold'
                      : 'border-stone-800 text-stone-400'
                  }`}
                >
                  {CURRENCIES[cur].symbol.trim()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
