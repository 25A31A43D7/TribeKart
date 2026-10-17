import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Search, ShieldCheck, Sparkles, Filter, Mic, MapPin, Layers, Award } from 'lucide-react';

export const HandmadeProductsPage: React.FC = () => {
  const { products, searchQuery, setSearchQuery, setIsVoiceSearchOpen, language } = useApp();
  const [selectedCraft, setSelectedCraft] = useState<string>('all');
  const [selectedRegionToy, setSelectedRegionToy] = useState<string>('all');
  const [giOnly, setGiOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');

  const handmadeProducts = products.filter((p) => p.type === 'handmade');

  const craftCategories = [
    { id: 'all', label: 'All Categories' },
    { id: 'Traditional Toys', label: 'Regional Toys (9 Indian Traditions)' },
    { id: 'Handloom Sarees', label: 'Handloom Sarees (Ikat & Jamdani)' },
    { id: 'Tribal Decor', label: 'Tribal & Sacred Metalcraft' },
    { id: 'Recycled Crafts', label: 'Upcycled Eco-Living' },
  ];

  const regionalToysList = [
    { id: 'all', label: 'All 9 Regional Toys' },
    { id: 'Channapatna', label: 'Channapatna (Karnataka)' },
    { id: 'Uttarayan', label: 'Uttarayan Kites (Gujarat)' },
    { id: 'Kondapalli', label: 'Kondapalli (Andhra Pradesh)' },
    { id: 'Lattu', label: 'Lattu Tops (Folk)' },
    { id: 'Kathputli', label: 'Kathputli (Rajasthan)' },
    { id: 'Thanjavur', label: 'Thanjavur Golu (Tamil Nadu)' },
    { id: 'Asharikandi', label: 'Asharikandi (Assam)' },
    { id: 'Banarasi', label: 'Banarasi Toys (UP/Varanasi)' },
    { id: 'Natungram', label: 'Natungram (West Bengal)' },
  ];

  const filterItem = (p: typeof handmadeProducts[0]) => {
    const matchesCraft = selectedCraft === 'all' || p.category === selectedCraft;
    const matchesRegionToy =
      selectedCraft !== 'Traditional Toys' ||
      selectedRegionToy === 'all' ||
      p.name.toLowerCase().includes(selectedRegionToy.toLowerCase()) ||
      p.craftLineage.toLowerCase().includes(selectedRegionToy.toLowerCase()) ||
      p.originRegion.toLowerCase().includes(selectedRegionToy.toLowerCase());
    const matchesGi = !giOnly || p.isGIVerified;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.makerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.originRegion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.craftLineage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCraft && matchesRegionToy && matchesGi && matchesSearch;
  };

  let filtered = handmadeProducts.filter(filterItem);

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  // Categorized groups when viewing all without an active search query
  const isCategorizedView = selectedCraft === 'all' && searchQuery.trim() === '';

  const toyProducts = handmadeProducts.filter((p) => p.category === 'Traditional Toys' && (!giOnly || p.isGIVerified));
  const sareeProducts = handmadeProducts.filter((p) => p.category === 'Handloom Sarees' && (!giOnly || p.isGIVerified));
  const tribalProducts = handmadeProducts.filter((p) => p.category === 'Tribal Decor' && (!giOnly || p.isGIVerified));
  const recycledProducts = handmadeProducts.filter((p) => p.category === 'Recycled Crafts' && (!giOnly || p.isGIVerified));

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
          {language === 'te' ? 'కళాకారుల నుండి నేరుగా' : 'DIRECT FROM INDIAN ARTISANS & WEAVERS'}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023] mb-3">
          Handmade Products Marketplace
        </h1>
        <p className="text-sm text-[#5C6E60] max-w-2xl">
          Organized by heritage craft categories: regional folk toys, handloom sarees, tribal sacred brassware, and upcycled eco-homeware with 92% of value returning to artisan families.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#E8E1D5] mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search with Mic */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-[#7A8C7E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Channapatna, Pochampally, Dhokra, Lattu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-[#DDD5C7] text-xs text-[#1E3023] outline-hidden focus:border-[#2C4A34]"
            />
            <button
              onClick={() => setIsVoiceSearchOpen(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#DDA76A] hover:text-[#B57C3D]"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* GI Tag filter checkbox & Sort dropdown */}
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={giOnly}
                onChange={(e) => setGiOnly(e.target.checked)}
                className="accent-[#2C4A34] w-4 h-4 rounded cursor-pointer"
              />
              <span className="font-medium text-[#1E3023] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E3D]" />
                GI-Verified Only
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-[#6F8273]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white px-2.5 py-1.5 rounded-lg border border-[#DDD5C7] text-xs font-medium text-[#1E3023] outline-hidden"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Craft Tabs */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-[#E8E1D5] overflow-x-auto no-scrollbar">
          {craftCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCraft(c.id);
                if (c.id !== 'Traditional Toys') setSelectedRegionToy('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCraft === c.id
                  ? 'bg-[#2C4A34] text-white shadow-xs'
                  : 'bg-white text-[#5C6E60] border border-[#E2DAD0] hover:text-[#1E3023]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Sub-row for Regional Toy Filters if Traditional Toys is selected or viewing all */}
        {(selectedCraft === 'Traditional Toys' || selectedCraft === 'all') && (
          <div className="pt-2 border-t border-[#EDE7DD] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
            <span className="text-[#7A5B35] font-semibold shrink-0 uppercase tracking-wider text-[10px] mr-1">
              Indian Toy Traditions:
            </span>
            {regionalToysList.map((rt) => (
              <button
                key={rt.id}
                onClick={() => {
                  setSelectedCraft('Traditional Toys');
                  setSelectedRegionToy(rt.id);
                }}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCraft === 'Traditional Toys' && selectedRegionToy === rt.id
                    ? 'bg-[#7A5B35] text-white font-medium'
                    : 'bg-[#EFEAE1] text-[#4A5D4F] hover:bg-[#E5DFD4]'
                }`}
              >
                {rt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {isCategorizedView ? (
        /* Categorized Layout: Distinct sections for Toys, Sarees, Tribal Decor, and Upcycled */
        <div className="space-y-16">
          
          {/* CATEGORY 1: TOYS OF ALL REGIONS */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E5DFD4]">
              <div>
                <span className="text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
                  HERITAGE FOLK PLAY · 9 STATES REPRESENTED
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
                  Traditional Indian Toys Across Regions
                </h2>
              </div>
              <button
                onClick={() => setSelectedCraft('Traditional Toys')}
                className="text-xs font-semibold text-[#2C4A34] hover:underline cursor-pointer"
              >
                View all 9 toys ({toyProducts.length}) →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {toyProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* CATEGORY 2: HANDLOOM SAREES */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E5DFD4]">
              <div>
                <span className="text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
                  GI-CERTIFIED ROYAL TEXTILES
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
                  Handloom Sarees & Heritage Weaves
                </h2>
              </div>
              <button
                onClick={() => setSelectedCraft('Handloom Sarees')}
                className="text-xs font-semibold text-[#2C4A34] hover:underline cursor-pointer"
              >
                View all sarees ({sareeProducts.length}) →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sareeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* CATEGORY 3: TRIBAL & DECORATIVE ARTIFACTS */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E5DFD4]">
              <div>
                <span className="text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
                  INDIGENOUS FOREST ART & 4,000-YEAR METALLURGY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
                  Tribal Decor & Sacred Craft
                </h2>
              </div>
              <button
                onClick={() => setSelectedCraft('Tribal Decor')}
                className="text-xs font-semibold text-[#2C4A34] hover:underline cursor-pointer"
              >
                View all tribal decor ({tribalProducts.length}) →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {tribalProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* CATEGORY 4: UPCYCLED ECO CRAFTS */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#E5DFD4]">
              <div>
                <span className="text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
                  ZERO-WASTE CIRCULAR HOMEWARE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
                  Agro-Waste Upcycled Crafts
                </h2>
              </div>
              <button
                onClick={() => setSelectedCraft('Recycled Crafts')}
                className="text-xs font-semibold text-[#2C4A34] hover:underline cursor-pointer"
              >
                View all upcycled crafts ({recycledProducts.length}) →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recycledProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

        </div>
      ) : (
        /* Filtered/Searched Single Grid */
        <div>
          {filtered.length === 0 ? (
            <div className="py-16 text-center bg-[#F6F2EB] rounded-2xl border border-[#DDD5C7]">
              <p className="text-sm font-semibold text-[#1E3023]">No handmade crafts found</p>
              <p className="text-xs text-[#6F8273] mt-1">Try resetting the regional toy filter or clearing search keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
