import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Leaf, ShoppingBag, Search, Mic, Menu, X, ChevronDown, Heart, Shield, Hammer, Package, Truck, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cart,
    setIsCartOpen,
    wishlist,
    currentUser,
    switchRole,
    setIsVoiceSearchOpen,
    searchQuery,
    setSearchQuery,
    language,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavClick = (page: any) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 md:gap-8">
        
        {/* Zone 1: Brand Wordmark with green leaf icon */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group cursor-pointer shrink-0 text-left"
        >
          <div className="w-9 h-9 rounded-full bg-[#E5EFE7] flex items-center justify-center text-[#2C4A34] group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 fill-[#2C4A34]/20 stroke-[#2C4A34]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1E3023]">
            TribeKart
          </span>
        </button>

        {/* Zone 2: Navigation Links (Exact 4 requested links) */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#4A5D4F]">
          <button
            onClick={() => handleNavClick('raw-materials')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
              activePage === 'raw-materials'
                ? 'text-[#1E3023] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C4A34]'
                : 'hover:text-[#1E3023]'
            }`}
          >
            {language === 'te' ? 'ముడి సరుకులు' : 'Raw materials'}
          </button>
          
          <button
            onClick={() => handleNavClick('handmade')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
              activePage === 'handmade'
                ? 'text-[#1E3023] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C4A34]'
                : 'hover:text-[#1E3023]'
            }`}
          >
            {language === 'te' ? 'చేతివృత్తుల వస్తువులు' : 'Handmade'}
          </button>

          <button
            onClick={() => handleNavClick('artisan-profiles')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
              activePage === 'artisan-profiles'
                ? 'text-[#1E3023] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C4A34]'
                : 'hover:text-[#1E3023]'
            }`}
          >
            {language === 'te' ? 'కళాకారులను కలవండి' : 'Meet artisans'}
          </button>

          <button
            onClick={() => handleNavClick('worker-portal')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
              activePage === 'worker-portal'
                ? 'text-[#1E3023] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2C4A34]'
                : 'hover:text-[#1E3023]'
            }`}
          >
            {language === 'te' ? 'మహతో కలసి పని చేయండి' : 'Work with us'}
          </button>
        </nav>

        {/* Zone 3: Actions (Voice, Wishlist, Cart with count, User Profile Avatar) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Quick Voice & Search trigger */}
          <div className="hidden sm:flex items-center relative">
            <button
              onClick={() => setIsVoiceSearchOpen(true)}
              className="p-2 text-[#4A5D4F] hover:text-[#1E3023] hover:bg-[#EAE4D9] rounded-full transition-colors flex items-center gap-1.5"
              title="Voice Search (English / Telugu)"
            >
              <Mic className="w-4 h-4 text-[#DDA76A]" />
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Wishlist Button with Saved Count */}
          <button
            onClick={() => handleNavClick('wishlist')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-full transition-colors relative cursor-pointer ${
              activePage === 'wishlist'
                ? 'bg-[#FDF2F0] text-[#C04838]'
                : 'text-[#1E3023] hover:bg-[#EAE4D9]/80'
            }`}
            title="View Wishlist & Saved Crafts"
            aria-label="Wishlist"
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#C04838] text-[#C04838]' : 'text-[#4A5D4F]'}`} />
            <span className={`font-semibold text-sm tabular-nums ${wishlist.length > 0 ? 'text-[#C04838]' : 'text-[#4A5D4F]'}`}>
              {wishlist.length}
            </span>
          </button>

          {/* Cart Icon with count (User specified: cart showing "0" or active count) */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 text-[#1E3023] hover:bg-[#EAE4D9]/80 rounded-full transition-colors relative cursor-pointer"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="w-5 h-5 text-[#2C4A34]" />
            <span className="font-semibold text-sm tabular-nums text-[#2C4A34]">
              {totalCartCount}
            </span>
          </button>

          {/* User Profile Avatar with label */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full bg-[#EFEAE1] hover:bg-[#E5DFD4] transition-colors cursor-pointer text-left"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.endsWith('avatar_customer_aarav.jpg')) {
                    target.src = '/images/avatar_customer_aarav.jpg';
                  }
                }}
                className="w-8 h-8 rounded-full object-cover border border-[#D5CCC0]"
              />
              <span className="text-sm font-medium text-[#1E3023] hidden sm:inline whitespace-nowrap">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5D7062]" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#E8E2D8] py-2 z-50 text-xs"
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-[#F0EBE3]">
                  <p className="font-semibold text-[#1E3023]">{currentUser.name}</p>
                  <p className="text-[#6D8072] capitalize">{currentUser.role} · {currentUser.location.split(',')[0]}</p>
                </div>

                <button
                  onClick={() => {
                    handleNavClick('wishlist');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#C04838] fill-[#C04838]" />
                    My Saved Wishlist
                  </span>
                  <span className="text-[11px] text-[#7B8C7E] tabular-nums font-semibold">({wishlist.length})</span>
                </button>

                <button
                  onClick={() => {
                    handleNavClick('my-orders');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium"
                >
                  My Orders & Live Tracking
                </button>

                {currentUser.role === 'artisan' && (
                  <button
                    onClick={() => {
                      handleNavClick('artisan-studio');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium flex items-center gap-1.5"
                  >
                    <Hammer className="w-3.5 h-3.5 text-[#DDA76A]" />
                    Artisan Studio & Uploads
                  </button>
                )}

                {currentUser.role === 'supplier' && (
                  <button
                    onClick={() => {
                      handleNavClick('supplier-portal');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5 text-[#DDA76A]" />
                    Supplier Hub & Material Inventory
                  </button>
                )}

                {currentUser.role === 'worker' && (
                  <button
                    onClick={() => {
                      handleNavClick('worker-portal');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#DDA76A]" />
                    Worker Task Board & Payouts
                  </button>
                )}

                <button
                  onClick={() => {
                    handleNavClick('admin-dashboard');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#FAF8F5] text-[#2C4A34] font-medium flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-[#2C6E3D]" />
                  Admin Impact & Verification
                </button>

                <div className="border-t border-[#F0EBE3] my-1" />

                <div className="px-3 py-1.5">
                  <p className="text-[10px] uppercase font-semibold text-[#8B9C8E] mb-1.5">Switch Persona (Forward & Backward)</p>
                  <div className="grid grid-cols-1 gap-1">
                    <button
                      onClick={() => {
                        switchRole('customer');
                        setUserDropdownOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                        currentUser.role === 'customer' ? 'bg-[#2C4A34] text-white font-semibold' : 'bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023]'
                      }`}
                    >
                      <User className="w-3 h-3 text-[#DDA76A]" />
                      <span>Customer (Aarav)</span>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('artisan');
                        setUserDropdownOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                        currentUser.role === 'artisan' ? 'bg-[#2C4A34] text-white font-semibold' : 'bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023]'
                      }`}
                    >
                      <Hammer className="w-3 h-3 text-[#DDA76A]" />
                      <span>Artisan (Lakshmi)</span>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('supplier');
                        setUserDropdownOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                        currentUser.role === 'supplier' ? 'bg-[#2C4A34] text-white font-semibold' : 'bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023]'
                      }`}
                    >
                      <Package className="w-3 h-3 text-[#DDA76A]" />
                      <span>Supplier (Ramesh)</span>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('worker');
                        setUserDropdownOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                        currentUser.role === 'worker' ? 'bg-[#2C4A34] text-white font-semibold' : 'bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023]'
                      }`}
                    >
                      <Truck className="w-3 h-3 text-[#DDA76A]" />
                      <span>Worker (Sunita)</span>
                    </button>
                    <button
                      onClick={() => {
                        switchRole('admin');
                        setUserDropdownOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded text-left text-[11px] flex items-center gap-1.5 transition-colors ${
                        currentUser.role === 'admin' ? 'bg-[#2C4A34] text-white font-semibold' : 'bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023]'
                      }`}
                    >
                      <Shield className="w-3 h-3 text-[#DDA76A]" />
                      <span>Platform Admin (Kavitha)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2C4A34] hover:bg-[#EAE4D9] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#E8E2D8] mb-3">
            <Search className="w-4 h-4 text-[#6D8072]" />
            <input
              type="text"
              placeholder="Search Pochampally, Kondapalli, bamboo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm w-full outline-hidden"
            />
            <button
              onClick={() => setIsVoiceSearchOpen(true)}
              className="p-1 text-[#DDA76A]"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-base font-medium text-[#2C4A34]">
            <button
              onClick={() => handleNavClick('raw-materials')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1]"
            >
              Raw materials
            </button>
            <button
              onClick={() => handleNavClick('handmade')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1]"
            >
              Handmade
            </button>
            <button
              onClick={() => handleNavClick('artisan-profiles')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1]"
            >
              Meet artisans
            </button>
            <button
              onClick={() => handleNavClick('worker-portal')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1]"
            >
              Work with us
            </button>
            <button
              onClick={() => handleNavClick('wishlist')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1] flex items-center justify-between text-[#C04838]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-[#C04838]" />
                Saved Wishlist
              </span>
              <span className="text-xs bg-[#FDF2F0] px-2 py-0.5 rounded-full font-bold">
                {wishlist.length}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('my-orders')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#EFEAE1]"
            >
              My Orders & Deliveries
            </button>

            {/* Mobile Contextual Studio Links */}
            {currentUser.role === 'artisan' && (
              <button
                onClick={() => handleNavClick('artisan-studio')}
                className="text-left py-2 px-3 rounded-lg bg-[#EAE3D6] text-[#1E3023] font-semibold"
              >
                Artisan Studio & Uploads
              </button>
            )}
            {currentUser.role === 'supplier' && (
              <button
                onClick={() => handleNavClick('supplier-portal')}
                className="text-left py-2 px-3 rounded-lg bg-[#EAE3D6] text-[#1E3023] font-semibold"
              >
                Supplier Hub & Inventory
              </button>
            )}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="text-left py-2 px-3 rounded-lg bg-[#EAE3D6] text-[#1E3023] font-semibold"
              >
                Admin Impact & Verification
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
