/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ImpactStatsBanner } from './components/ImpactStatsBanner';
import { ShopCategoriesSection } from './components/ShopCategoriesSection';
import { FeaturedCraftsSection } from './components/FeaturedCraftsSection';
import { ImpactFooterSection } from './components/ImpactFooterSection';
import { RawMaterialsPage } from './components/RawMaterialsPage';
import { HandmadeProductsPage } from './components/HandmadeProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ArtisanProfilesPage } from './components/ArtisanProfilesPage';
import { ArtisanStudioPage } from './components/ArtisanStudioPage';
import { SupplierPortalPage } from './components/SupplierPortalPage';
import { WorkerPortalPage } from './components/WorkerPortalPage';
import { MyOrdersPage } from './components/MyOrdersPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { WishlistPage } from './components/WishlistPage';
import { CartCheckoutModal } from './components/CartCheckoutModal';
import { VoiceSearchModal } from './components/VoiceSearchModal';
import { HeritageGuideModal } from './components/HeritageGuideModal';
import { ToastContainer } from './components/ToastContainer';

const MainLayout: React.FC = () => {
  const { activePage } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#222B21]">
      {/* Role Switcher Bar for Innovation Challenge Judges & Testing */}
      <RoleSwitcherBar />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Active Page View */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <HeroSection />
            <ImpactStatsBanner />
            <ShopCategoriesSection />
            <FeaturedCraftsSection />
          </>
        )}

        {activePage === 'raw-materials' && <RawMaterialsPage />}
        {activePage === 'handmade' && <HandmadeProductsPage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'artisan-profiles' && <ArtisanProfilesPage />}
        {activePage === 'artisan-studio' && <ArtisanStudioPage />}
        {activePage === 'supplier-portal' && <SupplierPortalPage />}
        {activePage === 'worker-portal' && <WorkerPortalPage />}
        {activePage === 'my-orders' && <MyOrdersPage />}
        {activePage === 'admin-dashboard' && <AdminDashboardPage />}
        {activePage === 'wishlist' && <WishlistPage />}
      </main>

      {/* Impact Footer Section */}
      <ImpactFooterSection />

      {/* Slide-out & Overlay Modals */}
      <CartCheckoutModal />
      <VoiceSearchModal />
      <HeritageGuideModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
