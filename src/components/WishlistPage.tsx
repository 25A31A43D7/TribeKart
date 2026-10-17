import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    products,
    setActivePage,
    openProductDetail,
    moveToCartFromWishlist,
    toggleWishlist,
    addToCart,
    addToast,
    language,
  } = useApp();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToBag = () => {
    savedProducts.forEach((p) => addToCart(p, 1));
    addToast({
      type: 'success',
      title: 'All Items Added to Bag',
      message: `${savedProducts.length} artisanal items added to your shopping bag.`,
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase">
              YOUR SAVED CRAFTS
            </span>
            <span className="text-xs text-[#C04838] font-medium bg-[#FDF2F0] px-2 py-0.5 rounded-sm flex items-center gap-1">
              <Heart className="w-3 h-3 fill-[#C04838]" />
              {savedProducts.length} Saved {savedProducts.length === 1 ? 'Treasure' : 'Treasures'}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023]">
            My Wishlist & Favorited Heritage
          </h1>
          <p className="text-sm text-[#5C6E60] max-w-2xl">
            Keep track of authentic handlooms, wooden folk toys, and sustainable raw supplies you wish to support.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToBag}
              className="px-4 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#E4C59E]" />
              <span>Move All to Shopping Bag</span>
            </button>
          </div>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#FAF8F5] rounded-3xl border border-[#E5DFD4] p-8 max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#F5ECE9] flex items-center justify-center mx-auto text-[#C04838]">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-semibold text-[#1E3023]">
            Your Wishlist is Waiting for Treasures
          </h2>
          <p className="text-xs text-[#5D6F61] leading-relaxed max-w-md mx-auto">
            Click the heart icon on any handloom saree, regional toy, or raw material card to save it for later and support local Indian craft communities.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setActivePage('handmade');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Explore Handmade Crafts
            </button>
            <button
              onClick={() => {
                setActivePage('raw-materials');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-white border border-[#DDD5C7] hover:bg-[#F6F2EB] text-[#1E3023] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Explore Raw Materials
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E5DFD4] shadow-xs overflow-hidden flex flex-col justify-between hover:border-[#C4BAA9] transition-all group"
              >
                {/* Media */}
                <div
                  onClick={() => openProductDetail(product.id)}
                  className="relative aspect-4/3 overflow-hidden bg-[#ECE6DC] cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white/95 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-sm">
                    <MapPin className="w-3 h-3 text-[#DDA76A]" />
                    <span className="truncate max-w-[150px]">{product.originRegion.split(',')[0]}</span>
                  </div>

                  {product.isGIVerified && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-medium text-[#1E3023] bg-[#EAF3EC] border border-[#BDDDC4] px-2 py-0.5 rounded-sm shadow-2xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E3D]" />
                      <span>GI Certified</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#6F8273] mb-1">
                      <span className="font-semibold text-[#7A5B35] uppercase text-[10px]">
                        {product.category}
                      </span>
                      <span>·</span>
                      <span className="truncate">{product.makerName}</span>
                    </div>

                    <h3
                      onClick={() => openProductDetail(product.id)}
                      className="font-serif text-lg font-semibold text-[#1E3023] hover:text-[#2C4A34] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {language === 'te' && product.nameTelugu ? product.nameTelugu : product.name}
                    </h3>

                    <p className="text-xs text-[#5D6F61] line-clamp-1 mt-1">
                      {product.sustainableAspect}
                    </p>
                  </div>

                  <div>
                    {/* Price and Maker Share */}
                    <div className="pt-3 border-t border-[#EDE7DD] flex items-baseline justify-between mb-4">
                      <div>
                        <span className="font-mono text-lg font-bold text-[#1E3023] tabular-nums">
                          ₹{product.price.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-[#7B8C7E] ml-1">
                          ({product.unit})
                        </span>
                      </div>
                      <span className="text-xs font-medium text-[#2C6E3D]">
                        ₹{product.costBreakdown.makerPrice.toLocaleString()} to maker
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveToCartFromWishlist(product)}
                        className="flex-1 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#E4C59E]" />
                        <span>Move to Bag</span>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="p-2.5 bg-[#FAF8F5] border border-[#DDD5C7] hover:bg-[#FDF2F0] hover:border-[#E8AEA7] text-[#8C9C8F] hover:text-[#C04838] rounded-lg transition-colors cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
