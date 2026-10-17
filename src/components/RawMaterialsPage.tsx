import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, Filter, Calculator, Layers, Info } from 'lucide-react';

export const RawMaterialsPage: React.FC = () => {
  const { products, searchQuery, setSearchQuery, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bulkQty, setBulkQty] = useState<number>(20);

  const rawProducts = products.filter((p) => p.type === 'raw_material');

  const categories = [
    'all',
    'Bamboo & Cane',
    'Coconut Shells',
    'Natural Fibers',
    'Wood & Carving',
    'Natural Dyes',
  ];

  const filtered = rawProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.materialsUsed.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.originRegion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
          {language === 'te' ? 'కళాకారులకు ముడి సరుకులు' : 'FOR MAKERS, ARTISANS & SHGS'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023] mb-3">
          Raw Materials Marketplace
        </h1>
        <p className="text-sm text-[#5C6E60] max-w-2xl">
          Direct sourcing of seasoned bamboo, temple-reclaimed coconut shells, golden bast jute, Poniki carving timber, and botanical dye powders without middlemen markups.
        </p>
      </div>

      {/* Bulk Sourcing Estimator Banner */}
      <div className="bg-[#EFEAE1] border border-[#DDD5C7] rounded-2xl p-6 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-[#2C4A34] text-white rounded-xl shrink-0 mt-0.5">
              <Calculator className="w-5 h-5 text-[#E4C59E]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#1E3023]">
                Self-Help Group & Collective Bulk Tier Savings
              </h3>
              <p className="text-xs text-[#5D6F61] max-w-xl">
                Orders above 15 units unlock regional cluster group freight, reducing delivery charges by up to 45% via ONDC shared logistics feeders.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#D5CDC0] self-start lg:self-auto">
            <span className="text-xs text-[#6F8273]">Simulate Bulk Units:</span>
            <input
              type="range"
              min="5"
              max="100"
              value={bulkQty}
              onChange={(e) => setBulkQty(Number(e.target.value))}
              className="accent-[#2C4A34] cursor-pointer"
            />
            <span className="text-xs font-mono font-bold text-[#1E3023] min-w-[55px]">
              {bulkQty} units ({bulkQty >= 15 ? '18% OFF' : 'Standard'})
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#7A8C7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bamboo, coconut, jute, timber..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#DDD5C7] text-xs text-[#1E3023] outline-hidden focus:border-[#2C4A34]"
          />
        </div>

        {/* Category Pills (Functional filter tabs) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#ECE7DE] rounded-xl overflow-x-auto w-full sm:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer capitalize ${
                selectedCategory === cat
                  ? 'bg-white text-[#1E3023] shadow-xs'
                  : 'text-[#5C6E60] hover:text-[#1E3023]'
              }`}
            >
              {cat === 'all' ? 'All Materials' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-[#F6F2EB] rounded-2xl border border-[#DDD5C7]">
          <Layers className="w-8 h-8 text-[#98A89A] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#1E3023]">No raw materials match your query</p>
          <p className="text-xs text-[#6F8273] mt-1">Try resetting search or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
