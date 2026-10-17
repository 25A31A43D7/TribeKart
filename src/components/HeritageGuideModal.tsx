import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, BookOpen, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const HeritageGuideModal: React.FC = () => {
  const { heritageModalOpen, setHeritageModalOpen } = useApp();

  if (!heritageModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#DDD5C7] shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        <button
          onClick={() => setHeritageModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-[#5C6E60] hover:text-[#1E3023] hover:bg-[#F2ECE2] rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7A5B35] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#2C6E3D]" />
            <span>INDIAN HERITAGE & GI AUTHENTICITY GUIDE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
            Protecting Traditional Craftsmanship
          </h2>
          <p className="text-xs text-[#5D6F61] leading-relaxed">
            A Geographical Indication (GI) is a sign used on products that have a specific geographical origin and possess qualities or a reputation that are due to that origin.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {/* Pochampally Ikat */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Pochampally Ikat (Telangana) · GI Registration #23
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-AP-TS-0023</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Renowned for intricate geometric "Pagdu Bandhu" tie-dye weaving. Real Pochampally handlooms show color penetration on both sides of the fabric identically. Factory screen prints show fading or white under-weft on the reverse side.
            </p>
          </div>

          {/* Kondapalli Bommallu */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Kondapalli Bommallu (Andhra Pradesh) · GI Registration #46
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-AP-0046</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Carved exclusively from Tella Poniki (Gyrocarpus americanus) softwood. The wood is light as balsa but tough, joined with natural tamarind seed paste, and painted with vegetable extracts. Never made from synthetic MDF or toxic enamel paints.
            </p>
          </div>

          {/* Channapatna Toys */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Channapatna Wooden Toys (Karnataka) · GI Registration #13
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-KA-0013</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Originated during the reign of Tipu Sultan. Hand-lathed using Wrightia tinctoria (Ivory Wood) and polished with natural tree lac mixed with non-toxic turmeric and indigo. 100% splinter-free and child-safe.
            </p>
          </div>

          {/* Thanjavur Thalayanatti Dolls */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Thanjavur Dancing Doll (Tamil Nadu) · GI Registration #82
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-TN-0082</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Self-righting roly-poly balancing toy with Cauvery river silt terracotta counterweight. Designed by 19th-century sculptors so that the doll's head and body oscillate rhythmically to airflow without tipping over.
            </p>
          </div>

          {/* Banarasi Lacquered Wooden Toys */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Varanasi Wooden Lacquerware & Toys (UP) · GI Registration #457
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-UP-0457</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Carved from local timber by Kashipura craftspeople, renowned for miniature kitchen sets (Bhatukali) and colorful chirping birds hand-rubbed with natural Kewra oil and mineral lac.
            </p>
          </div>

          {/* Uppada Jamdani */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFD4] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                Uppada Jamdani (Andhra Pradesh) · GI Registration #122
              </h3>
              <span className="font-mono text-[11px] text-[#2C6E3D] font-bold">GI-AP-0122</span>
            </div>
            <p className="text-[#465749] leading-relaxed">
              Woven using hand-laid bamboo needle wefts without loose floating yarns on the back. A single authentic saree can take 30 to 60 days of joint labor between two master weavers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FFF9F2] border border-[#F0DDC5] space-y-2">
            <div className="flex items-center gap-2 text-[#A84234] font-semibold">
              <AlertTriangle className="w-4 h-4" />
              <span>How TribeKart Combats Counterfeiting</span>
            </div>
            <p className="text-[#7A5B35] leading-relaxed">
              Any user or artisan can report a listing for misleading heritage claims. TribeKart auditors physically visit local village cooperatives and cross-check geo-coordinates before approving GI badges.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setHeritageModalOpen(false)}
            className="px-6 py-2.5 bg-[#2C4A34] text-white text-xs font-semibold rounded-lg hover:bg-[#1E3324] cursor-pointer"
          >
            I Understand & Support Authentic Crafts
          </button>
        </div>
      </div>
    </div>
  );
};
