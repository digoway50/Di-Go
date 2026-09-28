import React from 'react';
import { Search, X } from 'lucide-react';

export type CategoryFilter = 'all' | 'salwar-kameez' | 'hoodies' | 'overshirts' | 'trousers' | 'tees' | 'outerwear';
export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

interface ProductFilterBarProps {
  selectedCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  selectedFit: string;
  onSelectFit: (fit: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
}

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Pieces' },
  { id: 'salwar-kameez', label: 'Men Salwar & Kameez' },
  { id: 'hoodies', label: 'Hoodies & Sweats' },
  { id: 'overshirts', label: 'Overshirts' },
  { id: 'trousers', label: 'Trousers' },
  { id: 'tees', label: 'T-Shirts' },
  { id: 'outerwear', label: 'Outerwear' },
];

const FITS = [
  'All Fits',
  'Tailored Contemporary',
  'Traditional Relaxed',
  'Boxy Oversized',
  'Relaxed Tailored',
  'Architectural Oversized',
  'Standard Drop',
];

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFit,
  onSelectFit,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Category Segmented Control Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-stone-800 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-2 text-xs uppercase tracking-wider font-mono whitespace-nowrap transition-colors border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-stone-100 text-stone-950 font-bold border-stone-100'
                  : 'bg-stone-900/50 text-stone-400 border-stone-800 hover:text-white hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Counter */}
        <div className="text-xs text-stone-400 font-mono tabular-nums tracking-wider uppercase">
          <span>Displaying </span>
          <span className="text-stone-200 font-semibold">{totalCount}</span>
          <span> Items</span>
        </div>
      </div>

      {/* Secondary Controls Bar: Search, Fit, and Sort */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#111214] p-3 border border-stone-850">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search salwar, kameez, kurta, cotton, GSM, fit..."
            className="w-full pl-9 pr-8 py-2 bg-stone-950/80 border border-stone-800 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-stone-500 transition-colors font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Fit and Sort Selectors */}
        <div className="flex items-center gap-3">
          {/* Fit Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-mono hidden md:inline">Fit:</span>
            <select
              value={selectedFit}
              onChange={(e) => onSelectFit(e.target.value)}
              className="bg-stone-950/80 border border-stone-800 text-xs text-stone-300 px-3 py-2 focus:outline-none focus:border-stone-500 font-mono cursor-pointer"
            >
              {FITS.map(fit => (
                <option key={fit} value={fit} className="bg-stone-900 text-stone-200">
                  {fit}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500 font-mono hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-stone-950/80 border border-stone-800 text-xs text-stone-300 px-3 py-2 focus:outline-none focus:border-stone-500 font-mono cursor-pointer"
            >
              <option value="featured" className="bg-stone-900 text-stone-200">Featured Drop</option>
              <option value="price-asc" className="bg-stone-900 text-stone-200">Price: Low to High</option>
              <option value="price-desc" className="bg-stone-900 text-stone-200">Price: High to Low</option>
              <option value="rating" className="bg-stone-900 text-stone-200">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
