import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <section className="relative w-full min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background with Workbench image & high-legibility dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_artisan_workbench_1792066859645.jpg"
          alt="Artisan workbench with tools, natural fibers, and craft supplies"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Measured dark scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/60 backdrop-brightness-75" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
        
        {/* Kicker (Small uppercase text) */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#E4C59E] uppercase mb-4">
          A MARKETPLACE WITH A PURPOSE
        </p>

        {/* Main Headline (Large Serif: "Made by many. *Meant for good.*") */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6 text-balance">
          Made by many. <span className="italic font-normal text-[#F4DEBA]">Meant for good.</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg md:text-xl text-[#E8DFD3] max-w-2xl mx-auto font-light leading-relaxed mb-10 text-balance">
          Discover honest materials and beautiful handmade goods, while your purchase keeps local livelihoods growing.
        </p>

        {/* Buttons (Side-by-side: "Explore the marketplace" & "Meet the makers") */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => {
              const el = document.getElementById('shop-categories');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActivePage('handmade');
              }
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#2C4A34] hover:bg-[#233B29] text-white text-sm font-medium rounded-lg shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-1 ring-white/20 whitespace-nowrap"
          >
            <span>Explore the marketplace</span>
            <ArrowRight className="w-4 h-4 text-[#DDA76A]" />
          </button>

          <button
            onClick={() => {
              setActivePage('artisan-profiles');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg backdrop-blur-xs border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Users className="w-4 h-4 text-[#E4C59E]" />
            <span>Meet the makers</span>
          </button>
        </div>

      </div>
    </section>
  );
};
