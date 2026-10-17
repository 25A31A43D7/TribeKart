import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Star, CheckCircle2, ShieldCheck, MapPin, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetail, addToCart, language, isInWishlist, toggleWishlist } = useApp();
  const isSaved = isInWishlist(product.id);

  return (
    <div
      onClick={() => openProductDetail(product.id)}
      className="group relative bg-[#FAF8F5] rounded-xl border border-[#E5DFD4] hover:border-[#C4BAA9] transition-all duration-200 cursor-pointer flex flex-col h-full overflow-hidden hover:shadow-sm"
    >
      {/* Product Image Slot (65%-70% visual focus) */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#ECE6DC]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />

        {/* Quiet origin overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-medium text-white/95 bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-sm">
          <MapPin className="w-3 h-3 text-[#DDA76A]" />
          <span className="truncate max-w-[170px]">{product.originRegion.split(',')[0]}</span>
        </div>

        {/* Top Right Controls: GI Tag & Wishlist Heart */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {product.isGIVerified && (
            <div className="flex items-center gap-1 text-[11px] font-medium text-[#1E3023] bg-[#EAF3EC] border border-[#BDDDC4] px-2 py-0.5 rounded-sm shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2C6E3D]" />
              <span>GI Certified</span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs ${
              isSaved
                ? 'bg-white text-[#C04838] ring-1 ring-[#C04838]/30 scale-105'
                : 'bg-black/40 text-white hover:bg-white hover:text-[#C04838] backdrop-blur-xs'
            }`}
            title={isSaved ? 'Remove from Wishlist' : 'Save to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#C04838]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category · Maker Name & Star Rating */}
          <div className="flex items-center justify-between gap-1.5 text-xs text-[#6F8273] mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="font-medium uppercase tracking-wider text-[10px] text-[#7A5B35] truncate">
                {product.category}
              </span>
              <span aria-hidden="true">·</span>
              <span className="truncate text-[11px]">{product.makerName}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-mono text-[11px] text-[#1E3023] font-semibold bg-[#F5EFE6] px-1.5 py-0.5 rounded-sm">
              <Star className="w-3 h-3 fill-[#DDA76A] text-[#DDA76A]" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-[#1E3023] group-hover:text-[#2C4A34] transition-colors line-clamp-2 leading-snug mb-2">
            {language === 'te' && product.nameTelugu ? product.nameTelugu : product.name}
          </h3>

          {/* Material & Sustainable note */}
          <p className="text-xs text-[#5D6F61] line-clamp-1 mb-3">
            {product.sustainableAspect}
          </p>
        </div>

        <div>
          {/* Price & Maker Net Earning row */}
          <div className="pt-3 border-t border-[#EDE7DD] flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-base sm:text-lg font-bold text-[#1E3023] tabular-nums font-mono">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-[11px] text-[#7B8C7E]">
                  {product.type === 'raw_material' ? `/${product.unit.split(' ')[0]}` : ''}
                </span>
              </div>
              <p className="text-[10px] text-[#2C6E3D] font-medium">
                ₹{product.costBreakdown.makerPrice.toLocaleString()} to maker
              </p>
            </div>

            {/* Quick Add Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="p-2 sm:px-3 sm:py-2 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs whitespace-nowrap"
              title="Add to shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E4C59E]" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
