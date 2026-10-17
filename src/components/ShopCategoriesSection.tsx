import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const ShopCategoriesSection: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <section id="shop-categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#E8E2D8]">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
            SHOP BY INTENTION
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023]">
            Good things, made well.
          </h2>
        </div>

        <button
          onClick={() => {
            setActivePage('handmade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm font-medium text-[#2C4A34] hover:text-[#182B1E] flex items-center gap-1.5 group cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>Browse everything</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Two Large Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Raw Materials (FOR MAKERS) */}
        <div
          onClick={() => {
            setActivePage('raw-materials');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group relative rounded-2xl overflow-hidden bg-[#EFEAE1] border border-[#DDD5C7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col min-h-[420px]"
        >
          <div className="relative h-64 overflow-hidden bg-[#DDD5C7]">
            <img
              src="/src/assets/images/product_bamboo_raw_material_1792066860431.jpg"
              alt="Raw bamboo stalks, split cane, and coconut shells"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-sm">
                FOR MAKERS
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#F7F4EF]">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E3023] mb-2 group-hover:text-[#2C4A34] transition-colors">
                Raw materials
              </h3>
              <p className="text-[#5A6E5E] text-base mb-4">
                Bamboo, jute, shells & more
              </p>
              <p className="text-xs text-[#7D8F81] leading-relaxed">
                Directly from coastal aggregators and forest collectives. Transparent unit pricing, verified origins, minimum order quantities, and bulk savings for rural crafters.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#2C4A34]">
              <span className="flex items-center gap-1 text-[#7A5B35]">
                <Sparkles className="w-3.5 h-3.5" />
                6 Verified Material Categories
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Source Supplies <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Handmade Goods (FROM MAKERS) */}
        <div
          onClick={() => {
            setActivePage('handmade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group relative rounded-2xl overflow-hidden bg-[#EFEAE1] border border-[#DDD5C7] cursor-pointer shadow-xs hover:shadow-md transition-all duration-300 flex flex-col min-h-[420px]"
        >
          <div className="relative h-64 overflow-hidden bg-[#DDD5C7]">
            <img
              src="/src/assets/images/product_pochampally_ikat_1792066860036.jpg"
              alt="Handwoven Pochampally Ikat silk saree"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-sm">
                FROM MAKERS
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#F7F4EF]">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1E3023] mb-2 group-hover:text-[#2C4A34] transition-colors">
                Handmade goods
              </h3>
              <p className="text-[#5A6E5E] text-base mb-4">
                Objects with a human touch
              </p>
              <p className="text-xs text-[#7D8F81] leading-relaxed">
                Authentic Pochampally handlooms, Kondapalli wooden toys, Araku tribal basketry, and upcycled coconut homeware with 92% of value returning to artisan families.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs font-semibold text-[#2C4A34]">
              <span className="flex items-center gap-1 text-[#7A5B35]">
                <Sparkles className="w-3.5 h-3.5" />
                GI Tag Verified & Certified
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Crafts <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
