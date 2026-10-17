import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Award, CheckCircle2, Heart, ArrowRight, ShieldCheck, Hammer } from 'lucide-react';

interface ArtisanProfileCard {
  id: string;
  name: string;
  craft: string;
  collective: string;
  village: string;
  experienceYears: number;
  image: string;
  story: string;
  giCertified: boolean;
  giTagNumber: string;
  specialtyMotifs: string[];
  earningsThisMonth: number;
  productCount: number;
}

export const ArtisanProfilesPage: React.FC = () => {
  const { openProductDetail, products, switchRole, setActivePage } = useApp();

  const artisans: ArtisanProfileCard[] = [
    {
      id: 'artisan_lakshmi',
      name: 'Smt. Lakshmi Devi',
      craft: 'Pochampally Double-Ikat Silk Handloom',
      collective: 'Pochampally Handloom Weavers Sahakari Sangham',
      village: 'Bhoodan Pochampally, Telangana',
      experienceYears: 28,
      image: '/images/artisan_portrait_weaver_1792066860861.jpg',
      story: 'Inherited the pit loom from her father-in-law. Preserves 120-year-old geometric Telia Rumal calculation techniques using 100% natural madder vegetable extracts.',
      giCertified: true,
      giTagNumber: 'GI-AP-TS-0023',
      specialtyMotifs: ['Chowka Diamond Grid', 'Hamsa Swan Border', 'Kuppadam Temple Zari'],
      earningsThisMonth: 48500,
      productCount: 8,
    },
    {
      id: 'artisan_venkatesh',
      name: 'K. Venkateswarlu',
      craft: 'Kondapalli Bommallu Softwood Woodcraft',
      collective: 'Sri Rama Kondapalli Toy Artisan Society',
      village: 'Kondapalli Village, Krishna District, AP',
      experienceYears: 32,
      image: '/images/avatar_artisan_govind.jpg',
      story: 'Carves each piece from Tella Poniki tree timber, cured under Krishna river delta shade. Painted with organic tamarind gum and child-safe vegetable lacquers.',
      giCertified: true,
      giTagNumber: 'GI-AP-0046',
      specialtyMotifs: ['Ambari Elephant Royal Procession', 'Village Bullock Cart', 'Panchatantra Animal Folktales'],
      earningsThisMonth: 34200,
      productCount: 14,
    },
    {
      id: 'artisan_somalu',
      name: 'K. Somalu & Chitti Thalli',
      craft: 'Araku Valley Hill Bamboo Basketry & Planters',
      collective: 'Girijan Cooperative Corporation (GCC) Tribal SHG',
      village: 'Araku Valley Eastern Ghats, AP',
      experienceYears: 19,
      image: '/images/avatar_artisan_farooq.jpg',
      story: 'Aboriginal forest dwellers sustainably harvesting mountain bamboo. Smoked in rice husk embers to achieve a natural caramel sheen without chemical varnishes.',
      giCertified: false,
      giTagNumber: 'Tribal Origin Verified',
      specialtyMotifs: ['Nested Hex Weave', 'Herringbone Winnowing Lattice', 'Coir Cinch Planters'],
      earningsThisMonth: 21800,
      productCount: 6,
    },
    {
      id: 'artisan_babu',
      name: 'Ch. Satyanarayana Babu',
      craft: 'Konaseema Upcycled Coconut Shell Homeware',
      collective: 'Delta Green Coconut Crafts Collective',
      village: 'Razole, Konaseema District, AP',
      experienceYears: 12,
      image: '/images/avatar_artisan_siddharth.jpg',
      story: 'Rounds up 800+ kg of discarded coconut shells weekly from pilgrim temples, training rural youth to buff them with organic cold-pressed virgin coconut oil.',
      giCertified: false,
      giTagNumber: 'Agro-Waste Upcycle Standard',
      specialtyMotifs: ['Smooth Hand-Burnished Bowls', 'Carved Tea-Light Shells', 'Mosaic Scrap Trays'],
      earningsThisMonth: 29400,
      productCount: 11,
    },
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#E8E2D8]">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
            HONORING TRADITION & LINEAGE
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023] mb-2">
            Meet the Artisans Behind TribeKart
          </h1>
          <p className="text-sm text-[#5C6E60] max-w-2xl">
            Every artisan on TribeKart is verified with geo-tagged loom coordinates, traditional community collectives, and transparent direct-to-bank settlements.
          </p>
        </div>

        {/* Action to switch to artisan view / onboard */}
        <button
          onClick={() => {
            switchRole('artisan');
            setActivePage('artisan-studio');
          }}
          className="px-5 py-3 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer self-start md:self-auto shadow-xs whitespace-nowrap"
        >
          <Hammer className="w-4 h-4 text-[#E4C59E]" />
          <span>Artisan Studio & Product Upload</span>
        </button>
      </div>

      {/* Artisan Showcase Grid */}
      <div className="space-y-12">
        {artisans.map((artisan) => (
          <div
            key={artisan.id}
            className="bg-[#FAF8F5] rounded-2xl border border-[#E5DFD4] p-6 sm:p-8 overflow-hidden shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Photo & Origin Badge (4 cols) */}
              <div className="lg:col-span-4 relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#ECE6DC] border border-[#DDD5C7]">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {artisan.giCertified && (
                  <div className="absolute top-3 left-3 bg-[#EAF3EC] border border-[#BDDDC4] text-[#1E3023] text-xs font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2C6E3D]" />
                    <span>{artisan.giTagNumber}</span>
                  </div>
                )}
              </div>

              {/* Bio & Details (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023]">
                      {artisan.name}
                    </h2>
                    <p className="text-sm font-medium text-[#7A5B35]">
                      {artisan.craft}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-[#5D6F61] block">Direct Net Earnings</span>
                    <span className="text-lg font-mono font-bold text-[#2C6E3D] tabular-nums">
                      ₹{artisan.earningsThisMonth.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#5D6F61] py-2 border-y border-[#EDE7DD]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#7A5B35]" />
                    {artisan.village}
                  </span>
                  <span>·</span>
                  <span>{artisan.collective}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#1E3023]">{artisan.experienceYears} Years Craft Heritage</span>
                </div>

                <p className="text-sm text-[#465749] leading-relaxed italic">
                  "{artisan.story}"
                </p>

                {/* Specialty Motifs */}
                <div>
                  <p className="text-xs uppercase font-semibold text-[#7A5B35] mb-2">Signature Motifs & Techniques</p>
                  <div className="flex flex-wrap gap-2 text-xs text-[#1E3023]">
                    {artisan.specialtyMotifs.map((motif, i) => (
                      <span key={i} className="bg-[#EFEAE1] px-3 py-1 rounded-md border border-[#E0D8CB]">
                        {motif}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      const prod = products.find((p) => p.makerName.includes(artisan.name.split(' ')[0]));
                      if (prod) {
                        openProductDetail(prod.id);
                      } else {
                        setActivePage('handmade');
                      }
                    }}
                    className="px-5 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>View Artisan Storefront ({artisan.productCount} Creations)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E4C59E]" />
                  </button>

                  <button
                    onClick={() => {
                      switchRole('customer');
                      setActivePage('handmade');
                    }}
                    className="px-4 py-2.5 bg-white hover:bg-[#FAF8F5] text-[#1E3023] border border-[#DDD5C7] rounded-lg text-xs font-medium cursor-pointer"
                  >
                    Send Commission Inquiry
                  </button>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
