import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Clock,
  Truck,
  Leaf,
  ShoppingBag,
  Star,
  Flag,
  Share2,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Send,
  Heart,
  Sparkles,
  ThumbsUp,
  Filter,
  Award,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    setActivePage,
    addToCart,
    setIsCartOpen,
    reportListing,
    addToast,
    language,
    currentUser,
    isInWishlist,
    toggleWishlist,
    addReview,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [quantity, setQuantity] = useState(product ? product.minOrderQty : 1);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Suspected fake GI claim / machine-made copy');
  
  // Star Rating & Review State
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | 'all'>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(true);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p>Product not found.</p>
        <button
          onClick={() => setActivePage('handmade')}
          className="mt-4 px-4 py-2 bg-[#2C4A34] text-white rounded-lg text-sm"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    const formattedComment = selectedTags.length > 0
      ? `${reviewComment.trim()} [Highlights: ${selectedTags.join(', ')}]`
      : reviewComment.trim();

    addReview(product.id, {
      rating: reviewRating,
      comment: formattedComment,
      author: currentUser.name,
    });

    setReviewComment('');
    setSelectedTags([]);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  // Dynamic rating descriptions
  const ratingLabels: Record<number, string> = {
    1: '1 Star - Needs Improvement in Weave or Finish',
    2: '2 Stars - Fair Handcraft Quality',
    3: '3 Stars - Good & Authentic',
    4: '4 Stars - Very Good Craftsmanship',
    5: '5 Stars - Exceptional Heritage Masterpiece!',
  };

  const currentDisplayRating = hoverRating !== null ? hoverRating : reviewRating;

  // Star Distribution calculations
  const totalReviews = product.reviews.length;
  const starCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  product.reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    starCounts[star] = (starCounts[star] || 0) + 1;
  });

  const filteredReviews = selectedStarFilter === 'all'
    ? product.reviews
    : product.reviews.filter((r) => Math.round(r.rating) === selectedStarFilter);

  const availableTags = [
    'Authentic Weave Texture',
    'Natural Vegetable Dyes',
    'Solid Seasoned Timber',
    'Eco Biodegradable Packaging',
    'Prompt Rural Dispatch',
    'Direct Maker Support',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => {
            setActivePage(product.type === 'raw_material' ? 'raw-materials' : 'handmade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4D6151] hover:text-[#1E3023] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {product.type === 'raw_material' ? 'Raw Materials' : 'Handmade Marketplace'}</span>
        </button>

        <div className="flex items-center gap-3 text-xs text-[#7B8C7E]">
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#A84234] transition-colors cursor-pointer"
            title="Report misleading heritage claim"
          >
            <Flag className="w-3.5 h-3.5 text-[#C06050]" />
            <span className="hidden sm:inline">Report Heritage Discrepancy</span>
          </button>
        </div>
      </div>

      {/* Main Contiguous Grid: Image Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Media & Artisan Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual */}
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#ECE6DC] border border-[#DDD5C7] shadow-xs">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.endsWith('product_pochampally_ikat_1792066860036.jpg')) {
                  target.src = '/images/product_pochampally_ikat_1792066860036.jpg';
                }
              }}
              className="w-full h-full object-cover"
            />
            
            {product.isGIVerified && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#C5DDCB] shadow-xs flex items-center gap-2 text-xs font-semibold text-[#1E3023]">
                <ShieldCheck className="w-4 h-4 text-[#2C6E3D]" />
                <span>Verified GI Certified Registry: {product.giTagNumber}</span>
              </div>
            )}
          </div>

          {/* Artisan & Collective Story Card */}
          <div className="bg-[#F6F2EC] rounded-2xl p-6 sm:p-8 border border-[#E2DAD0] space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={product.makerAvatar}
                  alt={product.makerName}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.endsWith('artisan_portrait_weaver_1792066860861.jpg')) {
                      target.src = '/images/artisan_portrait_weaver_1792066860861.jpg';
                    }
                  }}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A5B35]">
                    THE MAKER & HERITAGE
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#1E3023]">
                    {product.makerName}
                  </h3>
                  <p className="text-xs text-[#5D6F61]">
                    {product.makerCollective}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-[#465749] leading-relaxed italic border-l-2 border-[#2C4A34]/40 pl-4 py-1">
              "{product.makerStory}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs text-[#5D6F61] border-t border-[#E8E2D8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#7A5B35] shrink-0" />
                <span><strong>Origin:</strong> {product.originRegion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7A5B35] shrink-0" />
                <span><strong>Dispatch Time:</strong> {product.dispatchDays} business days</span>
              </div>
            </div>
          </div>

          {/* Craftsmanship & Specifications */}
          <div className="space-y-6 pt-4">
            <h3 className="font-serif text-2xl font-normal text-[#1E3023]">
              Authenticity & Sustainable Craftsmanship
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#E8E2D8]">
                <p className="text-xs uppercase font-semibold text-[#7A5B35] mb-2">Raw Materials Used</p>
                <ul className="text-xs space-y-1.5 text-[#4D6151]">
                  {product.materialsUsed.map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2C4A34]" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E8E2D8]">
                <p className="text-xs uppercase font-semibold text-[#7A5B35] mb-2">Eco-Footprint & Circularity</p>
                <p className="text-xs text-[#4D6151] leading-relaxed">
                  {product.sustainableAspect}
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#E8E2D8]">
              <p className="text-xs uppercase font-semibold text-[#7A5B35] mb-2">Care & Maintenance Instructions</p>
              <p className="text-xs text-[#4D6151] leading-relaxed">
                {product.careInstructions}
              </p>
            </div>
          </div>

          {/* Customer Reviews & Star Rating Section */}
          <div id="customer-reviews" className="pt-8 border-t border-[#E8E2D8] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase block mb-1">
                  AUTHENTICITY & ARTISAN FEEDBACK
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#1E3023]">
                  Buyer Ratings & Verified Reviews ({product.reviews.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsReviewFormOpen(true);
                  const el = document.getElementById('rate-craft-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start cursor-pointer shadow-xs transition-colors"
              >
                <Star className="w-3.5 h-3.5 fill-[#E4C59E] text-[#E4C59E]" />
                <span>Rate this Craft</span>
              </button>
            </div>

            {/* Overall Rating & Breakdown Card */}
            <div className="bg-white rounded-2xl border border-[#E5DFD4] p-6 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Score Summary */}
              <div className="md:col-span-5 text-center md:text-left md:border-r md:border-[#EDE7DD] md:pr-6 space-y-2">
                <div className="flex items-baseline justify-center md:justify-start gap-2">
                  <span className="font-serif text-5xl font-bold text-[#1E3023] tabular-nums">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-[#7B8C7E] font-medium">/ 5.0</span>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-1 text-[#DDA76A]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.round(product.rating)
                          ? 'fill-[#DDA76A]'
                          : 'stroke-[#DDD5C7] fill-transparent'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-[#5D6F61]">
                  Based on <strong className="text-[#1E3023]">{totalReviews} verified community ratings</strong>
                </p>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-[#2C6E3D] bg-[#E8F2EA] px-2.5 py-1 rounded-md font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>98% direct artisan satisfaction rate</span>
                </div>
              </div>

              {/* Right Star Distribution Bars */}
              <div className="md:col-span-7 space-y-2 text-xs">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = starCounts[star] || 0;
                  const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                  const isSelected = selectedStarFilter === star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedStarFilter(isSelected ? 'all' : star)}
                      className={`w-full flex items-center gap-3 p-1 rounded-md transition-colors text-left group cursor-pointer ${
                        isSelected ? 'bg-[#F5EFE6] font-semibold' : 'hover:bg-[#FAF8F5]'
                      }`}
                      title={`Filter by ${star} star reviews`}
                    >
                      <div className="flex items-center gap-1 w-14 shrink-0 font-medium text-[#1E3023]">
                        <span>{star}</span>
                        <Star className="w-3.5 h-3.5 fill-[#DDA76A] text-[#DDA76A]" />
                      </div>

                      <div className="flex-1 h-2.5 bg-[#EDE7DD] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#DDA76A] group-hover:bg-[#C98B4B] transition-all duration-300 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="w-16 text-right font-mono text-[11px] text-[#7B8C7E] tabular-nums shrink-0">
                        {count} ({pct}%)
                      </div>
                    </button>
                  );
                })}

                {selectedStarFilter !== 'all' && (
                  <div className="pt-2 flex items-center justify-between text-xs text-[#7A5B35]">
                    <span>Filtered by {selectedStarFilter}-star reviews</span>
                    <button
                      onClick={() => setSelectedStarFilter('all')}
                      className="underline font-semibold hover:text-[#1E3023] cursor-pointer"
                    >
                      Reset filter
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Star Rating Form */}
            <div id="rate-craft-section" className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5DFD4] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-semibold text-[#1E3023] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#DDA76A]" />
                    <span>Rate this Handmade Product</span>
                  </h4>
                  <p className="text-xs text-[#5D6F61]">
                    Your honest rating directly supports <span className="font-semibold text-[#1E3023]">{product.makerName}</span> and guarantees fair artisan compensation.
                  </p>
                </div>
                <span className="text-[11px] text-[#6E8071] bg-white px-2.5 py-1 rounded-full border border-[#E0D7C9] hidden sm:inline">
                  Reviewing as: <strong className="text-[#1E3023]">{currentUser.name}</strong>
                </span>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4 pt-1">
                {/* Star Selector with Hover feedback */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E3023] uppercase mb-2">
                    Your Rating *
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-[#DDD5C7] shadow-2xs">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= currentDisplayRating;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => setReviewRating(star)}
                            className="p-1.5 transition-transform hover:scale-120 cursor-pointer focus:outline-hidden"
                            aria-label={`Rate ${star} out of 5 stars`}
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                isFilled
                                  ? 'fill-[#DDA76A] text-[#DDA76A] drop-shadow-xs'
                                  : 'text-[#DDD5C7] hover:text-[#DDA76A]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-[#7A5B35] border border-[#E5DFD4]">
                      {ratingLabels[currentDisplayRating]}
                    </div>
                  </div>
                </div>

                {/* Quick Craftsmanship Tags */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E3023] uppercase mb-1.5">
                    What stood out about this craft? (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {availableTags.map((tag) => {
                      const active = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            active
                              ? 'bg-[#2C4A34] text-white font-medium ring-1 ring-[#2C4A34]'
                              : 'bg-white text-[#5D6F61] border border-[#DDD5C7] hover:bg-[#F2ECE2]'
                          }`}
                        >
                          {active ? '✓ ' : '+ '}{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-[#1E3023] uppercase mb-1.5">
                    Your Review & Craft Feedback *
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe the texture, color fastness, wood grain, or packing quality. How does it compare to commercial machine-made goods?"
                    rows={3}
                    className="w-full text-xs p-3.5 rounded-xl border border-[#DDD5C7] bg-white outline-hidden focus:ring-1 focus:ring-[#2C4A34] focus:border-[#2C4A34]"
                    required
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#2C6E3D]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Buyer Badge included automatically</span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#E4C59E]" />
                    <span>Publish Star Rating & Review</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Filtered Reviews List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#5D6F61] px-1">
                <span>
                  Showing {filteredReviews.length} {filteredReviews.length === 1 ? 'review' : 'reviews'}
                  {selectedStarFilter !== 'all' && ` with ${selectedStarFilter} stars`}
                </span>
                {selectedStarFilter !== 'all' && (
                  <button
                    onClick={() => setSelectedStarFilter('all')}
                    className="text-[#2C4A34] font-semibold hover:underline cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>

              {filteredReviews.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-[#E5DFD4] p-6 space-y-2">
                  <p className="text-xs text-[#5D6F61]">No reviews match the selected {selectedStarFilter}-star filter.</p>
                  <button
                    onClick={() => setSelectedStarFilter('all')}
                    className="text-xs text-[#2C4A34] font-semibold hover:underline"
                  >
                    Show all reviews
                  </button>
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div key={rev.id} className="bg-white p-5 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#E5EFE7] text-[#2C4A34] font-bold text-xs flex items-center justify-center">
                          {rev.author.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-[#1E3023] block leading-none">
                            {rev.author}
                          </span>
                          <span className="text-[10px] text-[#8A9B8D] mt-0.5 block">{rev.date}</span>
                        </div>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] text-[#2C6E3D] bg-[#E8F2EA] px-2 py-0.5 rounded-sm flex items-center gap-1 font-medium ml-1">
                            <CheckCircle className="w-3 h-3" /> Verified Artisan Supporter
                          </span>
                        )}
                      </div>

                      {/* Stars for this review */}
                      <div className="flex items-center gap-1 text-[#DDA76A]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-[#DDA76A]' : 'stroke-[#CCC] fill-transparent'
                            }`}
                          />
                        ))}
                        <span className="font-mono text-xs font-bold text-[#1E3023] ml-1">
                          {rev.rating}.0
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#3E4F42] leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module (5 cols sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD4] shadow-xs space-y-6">
            
            {/* Title & Craft Lineage */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#7A5B35] font-semibold uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.craftLineage}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E3023] leading-tight mb-2">
                {language === 'te' && product.nameTelugu ? product.nameTelugu : product.name}
              </h1>

              {/* Star Rating Badge and Jump to Reviews */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <div className="flex items-center gap-0.5 text-[#DDA76A]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#DDA76A]'
                          : i < product.rating
                          ? 'fill-[#DDA76A]/50'
                          : 'stroke-[#DDD5C7] fill-transparent'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-sm font-bold text-[#1E3023] tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-[#7B8C7E]">·</span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('customer-reviews');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-[#2C4A34] hover:underline font-medium cursor-pointer"
                >
                  ({product.reviews.length} {product.reviews.length === 1 ? 'review' : 'reviews'})
                </button>
                <span className="text-xs text-[#7B8C7E]">·</span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('rate-craft-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs text-[#DDA76A] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Rate this craft</span>
                </button>
              </div>

              <p className="text-xs text-[#5C6E60] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Headline */}
            <div className="py-4 border-y border-[#EDE7DD] flex items-baseline justify-between">
              <div>
                <span className="font-mono text-3xl font-bold text-[#1E3023] tabular-nums">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="text-xs text-[#7B8C7E] ml-2">
                  ({product.unit})
                </span>
              </div>
              <span className="text-xs text-[#2C6E3D] font-medium bg-[#EBF5ED] px-2.5 py-1 rounded-sm">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Fair-Pricing & Income Transparency Breakdown Box */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D5] space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-semibold text-[#1E3023] pb-2 border-b border-[#E8E1D5]">
                <span>Fair-Price & Income Transparency</span>
                <span className="text-[#2C6E3D] font-mono">
                  {Math.round((product.costBreakdown.makerPrice / product.costBreakdown.finalPrice) * 100)}% to Maker
                </span>
              </div>

              <div className="space-y-1.5 text-[#5D6F61]">
                <div className="flex justify-between font-medium text-[#1E3023]">
                  <span>Direct Artisan / Supplier Price:</span>
                  <span className="font-mono tabular-nums text-[#2C6E3D]">₹{product.costBreakdown.makerPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Upkeep Fee (5%):</span>
                  <span className="font-mono tabular-nums">₹{product.costBreakdown.platformFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Eco-Packaging & Box:</span>
                  <span className="font-mono tabular-nums">₹{product.costBreakdown.packagingCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rural Hub Logistics & Transit:</span>
                  <span className="font-mono tabular-nums">₹{product.costBreakdown.deliveryCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Applicable GST & Cess:</span>
                  <span className="font-mono tabular-nums">₹{product.costBreakdown.taxes.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E8E1D5] flex justify-between font-bold text-[#1E3023]">
                <span>Total Customer Price:</span>
                <span className="font-mono tabular-nums">₹{product.costBreakdown.finalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#1E3023] uppercase mb-2">
                Quantity ({product.unit})
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#DDD5C7] rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(product.minOrderQty, quantity - 1))}
                    disabled={quantity <= product.minOrderQty}
                    className="px-3.5 py-2 hover:bg-[#F2ECE2] text-sm font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-mono font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3.5 py-2 hover:bg-[#F2ECE2] text-sm font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {product.minOrderQty > 1 && (
                  <span className="text-[11px] text-[#849487]">
                    Min order: {product.minOrderQty} {product.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons: Add to Bag, Wishlist & Buy Now */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-3.5 bg-[#FAF8F5] hover:bg-[#EFEAE1] text-[#1E3023] border border-[#2C4A34] rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4 text-[#2C4A34]" />
                  <span>Add to Shopping Bag</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
                    isInWishlist(product.id)
                      ? 'bg-[#FDF2F0] border-[#E8AEA7] text-[#C04838]'
                      : 'bg-[#FAF8F5] border-[#DDD5C7] text-[#5C6E60] hover:text-[#C04838] hover:border-[#C04838]/40'
                  }`}
                  title={isInWishlist(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-[#C04838]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Buy Now with Fair Escrow</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-4 border-t border-[#EDE7DD] space-y-2 text-xs text-[#5D6F61]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#2C6E3D] shrink-0" />
                <span>Escrow Guarantee: Funds disbursed to maker after delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#2C6E3D] shrink-0" />
                <span>Pan-India rural and urban shipping via Postal Speed Network</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#2C6E3D] shrink-0" />
                <span>100% plastic-free biodegradable packaging</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Report Discrepancy Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#DDD5C7] shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-[#A84234]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-serif text-lg font-semibold text-[#1E3023]">
                Report Heritage Discrepancy
              </h3>
            </div>

            <p className="text-xs text-[#5C6E60] leading-relaxed">
              TribeKart strictly enforces GI authenticity and protects genuine tribal artisans from machine-made counterfeits. What is the issue with Listing #{product.id}?
            </p>

            <div className="space-y-2 text-xs">
              {[
                'Suspected machine-printed fake of handloom Ikat',
                'Misleading GI registration number or claims',
                'Synthetic dyes reported as 100% natural',
                'Unverified middleman masquerading as direct artisan',
              ].map((reason, idx) => (
                <label key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#E8E2D8] cursor-pointer hover:bg-[#F2ECE2]">
                  <input
                    type="radio"
                    name="report"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="accent-[#2C4A34]"
                  />
                  <span className="text-[#2C3B2E]">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 text-xs text-[#5D6F61] hover:text-[#1E3023]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  reportListing(product.id, reportReason);
                  setReportModalOpen(false);
                }}
                className="px-4 py-2 bg-[#A84234] hover:bg-[#8D3427] text-white text-xs font-medium rounded-lg"
              >
                Submit Audit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
