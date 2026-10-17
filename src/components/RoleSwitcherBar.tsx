import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Shield, Sparkles, User, Hammer, Package, Truck, Layers } from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { currentUser, switchRole, language, setLanguage, activePage, setActivePage } = useApp();

  const roles: Array<{ role: UserRole; label: string; icon: any; desc: string }> = [
    { role: 'customer', label: 'Customer (Aarav)', icon: User, desc: 'Shop authentic crafts & raw supplies' },
    { role: 'artisan', label: 'Artisan (Lakshmi)', icon: Hammer, desc: 'Loom master, sell & track earnings' },
    { role: 'supplier', label: 'Supplier (Ramesh)', icon: Package, desc: 'Supply bamboo, shells & fiber' },
    { role: 'worker', label: 'Worker (Sunita)', icon: Truck, desc: 'Packaging, QC & rural hub jobs' },
    { role: 'admin', label: 'Platform Admin', icon: Shield, desc: 'Verify GI tags, impact & GMV' },
  ];

  return (
    <div className="bg-[#1C2C20] text-[#E8E0D5] text-xs border-b border-[#2D4533] px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Persona switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[#98A899] font-medium uppercase tracking-wider text-[11px] shrink-0 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#DDA76A]" /> Switch Role:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {roles.map((item) => {
              const active = currentUser.role === item.role;
              const Icon = item.icon;
              return (
                <button
                  key={item.role}
                  onClick={() => switchRole(item.role)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    active
                      ? 'bg-[#31563B] text-white shadow-xs ring-1 ring-[#DDA76A]/40'
                      : 'text-[#C5D2C7] hover:text-white hover:bg-[#25392A]'
                  }`}
                  title={item.desc}
                >
                  <Icon className="w-3 h-3 text-[#DDA76A]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Quick shortcuts & Language */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          {currentUser.role === 'customer' && (
            <>
              <button
                onClick={() => setActivePage('wishlist')}
                className={`hover:underline text-[11px] transition-colors flex items-center gap-1 ${activePage === 'wishlist' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
              >
                <span>Wishlist</span>
              </button>
              <button
                onClick={() => setActivePage('my-orders')}
                className={`hover:underline text-[11px] transition-colors ${activePage === 'my-orders' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
              >
                My Orders
              </button>
            </>
          )}

          {currentUser.role === 'artisan' && (
            <button
              onClick={() => setActivePage('artisan-studio')}
              className={`hover:underline text-[11px] transition-colors ${activePage === 'artisan-studio' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
            >
              Artisan Studio
            </button>
          )}

          {currentUser.role === 'supplier' && (
            <button
              onClick={() => setActivePage('supplier-portal')}
              className={`hover:underline text-[11px] transition-colors ${activePage === 'supplier-portal' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
            >
              Supplier Hub
            </button>
          )}

          {currentUser.role === 'worker' && (
            <button
              onClick={() => setActivePage('worker-portal')}
              className={`hover:underline text-[11px] transition-colors ${activePage === 'worker-portal' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
            >
              Worker Portal
            </button>
          )}

          <button
            onClick={() => setActivePage('admin-dashboard')}
            className={`flex items-center gap-1 text-[11px] hover:text-white transition-colors ${activePage === 'admin-dashboard' ? 'text-[#DDA76A] font-semibold' : 'text-[#C5D2C7]'}`}
          >
            <Layers className="w-3 h-3 text-[#DDA76A]" />
            <span>Impact & ONDC Notes</span>
          </button>

          <div className="h-3.5 w-px bg-[#364F3D]" />

          {/* Language Toggle: Telugu / English */}
          <div className="flex items-center bg-[#152219] rounded-md p-0.5 ring-1 ring-[#364F3D]">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase transition-colors ${
                language === 'en' ? 'bg-[#31563B] text-white' : 'text-[#95A597] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('te')}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                language === 'te' ? 'bg-[#31563B] text-white' : 'text-[#95A597] hover:text-white'
              }`}
              title="తెలుగులో చూడండి (View in Telugu)"
            >
              తెలుగు
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
