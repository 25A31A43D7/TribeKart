import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export const FeaturedCraftsSection: React.FC = () => {
  const { products, setActivePage, language, setHeritageModalOpen } = useApp();
  const [filter, setFilter] = useState<'all' | 'Handloom Sarees' | 'Traditional Toys' | 'Tribal Decor' | 'raw_material'>('all');

  const filteredProducts = products.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'raw_material') return p.type === 'raw_material';
    if (filter === 'Tribal Decor') return p.category === 'Tribal Decor' || p.category === 'Recycled Crafts';
    return p.category === filter;
  });

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E8E2D8]">
      {/* Header and Filter Buttons */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase">
              AUTHENTIC INDIAN CRAFTS & HERITAGE
            </span>
            <button
              onClick={() => setHeritageModalOpen(true)}
              className="text-[11px] text-[#2C6E3D] underline cursor-pointer hover:text-[#1E3023]"
            >
              GI Verification Guide
            </button>
          </div>
          <h2 className="font-serif text-3xl font-normal text-[#1E3023]">
            Featured Artisan Masterpieces
          </h2>
        </div>

        {/* Interactive Filter Tabs (functional segmented controls per skill) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#ECE7DE] rounded-xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-[#1E3023] shadow-xs'
                : 'text-[#5C6E60] hover:text-[#1E3023]'
            }`}
          >
            All Collections
          </button>
          <button
            onClick={() => setFilter('Handloom Sarees')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              filter === 'Handloom Sarees'
                ? 'bg-white text-[#1E3023] shadow-xs'
                : 'text-[#5C6E60] hover:text-[#1E3023]'
            }`}
          >
            Handloom Sarees (Ikat & Jamdani)
          </button>
          <button
            onClick={() => setFilter('Traditional Toys')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              filter === 'Traditional Toys'
                ? 'bg-white text-[#1E3023] shadow-xs'
                : 'text-[#5C6E60] hover:text-[#1E3023]'
            }`}
          >
            Traditional Toys (Kondapalli, Channapatna, Kathputli...)
          </button>
          <button
            onClick={() => setFilter('Tribal Decor')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              filter === 'Tribal Decor'
                ? 'bg-white text-[#1E3023] shadow-xs'
                : 'text-[#5C6E60] hover:text-[#1E3023]'
            }`}
          >
            Tribal & Upcycled Decor
          </button>
          <button
            onClick={() => setFilter('raw_material')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              filter === 'raw_material'
                ? 'bg-white text-[#1E3023] shadow-xs'
                : 'text-[#5C6E60] hover:text-[#1E3023]'
            }`}
          >
            Raw Materials
          </button>
        </div>
      </div>

      {/* Product Cards Grid: 3-column desktop layout with generous gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.slice(0, 9).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Explore full catalogue link */}
      <div className="mt-12 text-center">
        <button
          onClick={() => {
            setActivePage('handmade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#EFEAE1] hover:bg-[#E4DDCF] text-[#1E3023] text-sm font-medium rounded-lg border border-[#DDD5C7] transition-all cursor-pointer"
        >
          <span>Explore All Handmade Crafts & Toys</span>
          <ArrowRight className="w-4 h-4 text-[#2C4A34]" />
        </button>
      </div>
    </section>
  );
};
