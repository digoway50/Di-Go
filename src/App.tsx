import React, { useState, useMemo, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductFilterBar, CategoryFilter, SortOption } from './components/ProductFilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LookbookSection } from './components/LookbookSection';
import { CraftSection } from './components/CraftSection';
import { ReviewsSection } from './components/ReviewsSection';
import { WishlistDrawer } from './components/WishlistDrawer';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PRODUCTS, Product } from './data/products';

function Storefront() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    sizeGuideProduct,
    setSizeGuideProduct,
  } = useCart();

  // Filters & Search State
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedFit, setSelectedFit] = useState<string>('All Fits');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const collectionRef = useRef<HTMLDivElement>(null);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    const el = document.getElementById('lookbook');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Fit filter
      if (selectedFit !== 'All Fits' && prod.fit !== selectedFit) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesFabric = prod.fabric.toLowerCase().includes(query);
        const matchesGsm = prod.gsm?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesDesc && !matchesFabric && !matchesGsm) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedFit, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-stone-100 flex flex-col selection:bg-stone-200 selection:text-stone-950 font-sans">
      {/* Header */}
      <Header onSearchClick={scrollToCollection} />

      {/* Main Campaign Hero */}
      <Hero
        onShopClick={scrollToCollection}
        onLookbookClick={scrollToLookbook}
      />

      {/* Main Collection Showcase */}
      <section ref={collectionRef} id="collection" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-850 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Curated Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display mt-1">
              Drop 04 Collection
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
            Every garment has been precision-tailored from combed heavyweight organic cottons and selvedge wool blends.
          </p>
        </div>

        {/* Filter Bar */}
        <ProductFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedFit={selectedFit}
          onSelectFit={setSelectedFit}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={filteredProducts.length}
        />

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-[#121316] border border-stone-800 space-y-4">
            <h3 className="text-sm font-semibold uppercase font-mono tracking-wider text-stone-300">
              No garments match your selected filters
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try resetting your category or fit parameters, or clearing search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFit('All Fits');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* Editorial Lookbook Section */}
      <LookbookSection onSelectProduct={setQuickViewProduct} />

      {/* Craftsmanship & Material Dossier */}
      <CraftSection />

      {/* Community Testimonials & Fit Reviews */}
      <ReviewsSection />

      {/* Brand Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer onSelectProduct={setQuickViewProduct} />
      {quickViewProduct && (
        <ProductDetailModal
          key={quickViewProduct.id}
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenSizeGuide={setSizeGuideProduct}
        />
      )}
      {sizeGuideProduct && (
        <SizeGuideModal
          key={sizeGuideProduct.id}
          product={sizeGuideProduct}
          onClose={() => setSizeGuideProduct(null)}
        />
      )}

      {/* Feedback Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
