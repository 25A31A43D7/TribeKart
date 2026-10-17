import React from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, Heart, Globe, ShieldCheck } from 'lucide-react';

export const ImpactFooterSection: React.FC = () => {
  const { setActivePage, setHeritageModalOpen } = useApp();

  return (
    <footer className="bg-[#1C2C20] text-[#E8DFD3] pt-16 pb-12 border-t border-[#2D4533]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Part: Impact Section */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#DDA76A] uppercase mb-2">
            THE TRIBEKART DIFFERENCE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white mb-10">
            Small choices. Real change.
          </h2>

          {/* 3 Large Stats in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-8 px-6 bg-[#24392B] rounded-2xl border border-[#35513D]">
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F4DEBA] mb-1 tabular-nums">
                27
              </p>
              <p className="text-xs text-[#BAC8BD] uppercase tracking-wider font-medium">
                village collectives
              </p>
            </div>
            <div className="sm:border-x sm:border-[#35513D]">
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F4DEBA] mb-1 tabular-nums">
                1.8k kg
              </p>
              <p className="text-xs text-[#BAC8BD] uppercase tracking-wider font-medium">
                waste reused
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl font-normal text-[#F4DEBA] mb-1 tabular-nums">
                92%
              </p>
              <p className="text-xs text-[#BAC8BD] uppercase tracking-wider font-medium">
                maker income retained
              </p>
            </div>
          </div>
        </div>

        {/* Middle Navigation & Information */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-[#2D4533] text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-[#75A882]" />
              <span className="font-serif text-lg font-bold text-white">TribeKart</span>
            </div>
            <p className="text-[#A2B3A4] leading-relaxed mb-4">
              A decentralized commerce platform fostering direct market access for Indian tribal artisans, weavers, and agro-residue suppliers.
            </p>
            <span className="text-[11px] text-[#DDA76A] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> GI Tag Authenticity Audited
            </span>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider mb-3">Marketplaces</p>
            <ul className="space-y-2 text-[#BAC8BD]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('handmade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pochampally Ikat Handlooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('handmade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Kondapalli Bommallu Toys
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('handmade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Araku Tribal Bamboo Crafts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('raw-materials');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Raw Bamboo, Jute & Shells
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider mb-3">Rural Livelihoods</p>
            <ul className="space-y-2 text-[#BAC8BD]">
              <li>
                <button
                  onClick={() => {
                    setActivePage('artisan-profiles');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Meet Artisan Collectives
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('worker-portal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rural Logistics Jobs & SHGs
                </button>
              </li>
              <li>
                <button
                  onClick={() => setHeritageModalOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  GI Protection & Heritage Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('admin-dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  ONDC Architecture Synergy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white uppercase tracking-wider mb-3">Transparency</p>
            <p className="text-[#A2B3A4] leading-relaxed mb-3">
              Every purchase details exact artisan take-home pay, packaging fees, and verified logistics. No hidden deductions.
            </p>
            <div className="bg-[#24392B] p-2.5 rounded-lg border border-[#35513D]">
              <p className="text-[11px] text-[#BAC8BD]">
                Student Innovation Challenge Prototype
              </p>
              <p className="text-[10px] text-[#788E7A]">
                Tested for Rural Indian Supply Chains
              </p>
            </div>
          </div>
        </div>

        {/* Exact Footer Text & Copyright as specified */}
        <div className="pt-8 mt-8 border-t border-[#2D4533] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#95A597]">
          <p className="font-medium text-[#C8D5CA]">
            TribeKart - Fair trade, local hands, a lighter footprint.
          </p>
          <p>
            © 2025 TribeKart
          </p>
        </div>

      </div>
    </footer>
  );
};
