import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductType, PriceBreakdown } from '../types';
import {
  Hammer,
  Upload,
  Mic,
  Calculator,
  ShieldCheck,
  CheckCircle,
  Package,
  Layers,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const ArtisanStudioPage: React.FC = () => {
  const { currentUser, addProduct, products, language, addToast } = useApp();

  const [productType, setProductType] = useState<ProductType>('handmade');
  const [name, setName] = useState('');
  const [nameTelugu, setNameTelugu] = useState('');
  const [category, setCategory] = useState('Handloom Sarees');
  const [makerPriceInput, setMakerPriceInput] = useState<number>(3500);
  const [unit, setUnit] = useState('per saree');
  const [stock, setStock] = useState<number>(5);
  const [minOrderQty, setMinOrderQty] = useState<number>(1);
  const [originRegion, setOriginRegion] = useState('Bhoodan Pochampally, Yadadri Bhuvanagiri, Telangana');
  const [craftLineage, setCraftLineage] = useState('Pochampally Ikat - GI Registration #23');
  const [isGIVerified, setIsGIVerified] = useState(true);
  const [materials, setMaterials] = useState('Mulberry Silk, Natural Madder Extract');
  const [sustainableAspect, setSustainableAspect] = useState('100% natural vegetable dyes, zero electricity handloom');
  const [description, setDescription] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [imageSelection, setImageSelection] = useState('/images/product_pochampally_ikat_1792066860036.jpg');

  // Compute breakdown dynamically
  const platformFee = Math.round(makerPriceInput * 0.05);
  const packagingCharge = 80;
  const deliveryCost = 120;
  const taxes = Math.round(makerPriceInput * 0.03);
  const calculatedFinalPrice = makerPriceInput + platformFee + packagingCharge + deliveryCost + taxes;

  const handleVoiceInputSim = () => {
    setIsListeningVoice(true);
    addToast({
      type: 'info',
      title: 'Voice Assistant Activated (Audio Input)',
      message: 'Listening... (Speak in Telugu or English about your handcraft)',
    });

    setTimeout(() => {
      setIsListeningVoice(false);
      setName('Handwoven Pochampally Geometric Silk Scarf');
      setNameTelugu('చేనేత పోచంపల్లి రేఖాగణిత పట్టు స్కార్ఫ్');
      setDescription(
        'Intricate double-ikat tie-and-dye warp pattern hand-stretched on wooden frames. Woven with pure mulberry silk yarns dyed in natural madder root pigment.'
      );
      addToast({
        type: 'success',
        title: 'Voice Transcription Finished',
        message: 'Speech transcribed into bilingual title & craft description.',
      });
    }, 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const costBreakdown: PriceBreakdown = {
      makerPrice: makerPriceInput,
      platformFee,
      packagingCharge,
      deliveryCost,
      taxes,
      finalPrice: calculatedFinalPrice,
    };

    addProduct({
      type: productType,
      name,
      nameTelugu: nameTelugu || name,
      kicker: isGIVerified ? 'GI-CERTIFIED WEAVE' : 'ARTISAN DIRECT',
      price: calculatedFinalPrice,
      unit,
      minOrderQty,
      stock,
      image: imageSelection,
      category,
      craftLineage,
      isGIVerified,
      isCraftInspired: !isGIVerified,
      giTagNumber: isGIVerified ? 'GI-VERIFIED-REG' : undefined,
      originRegion,
      makerId: currentUser.id,
      makerName: currentUser.name,
      makerCollective: currentUser.collectiveName || 'Regional Artisan Guild',
      makerStory: currentUser.bio,
      makerAvatar: currentUser.avatar,
      materialsUsed: materials.split(',').map((s) => s.trim()),
      sustainableAspect,
      careInstructions: 'Dry clean recommended or gentle hand wash in cold water.',
      dispatchDays: 2,
      customizable: true,
      costBreakdown,
      description: description || 'Artisan handcrafted product made with certified traditional heritage methods.',
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Studio Header */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase">
              ARTISAN FIRST-COMMERCE PORTAL
            </span>
            <span className="text-xs text-[#2C6E3D] font-medium bg-[#E8F2EA] px-2 py-0.5 rounded-sm">
              Verified Maker Account
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023]">
            {currentUser.name}'s Artisan Studio
          </h1>
          <p className="text-xs text-[#5C6E60]">
            {currentUser.collectiveName} · {currentUser.location}
          </p>
        </div>

        {/* Live Earning Card */}
        <div className="bg-[#24392B] text-white p-4 rounded-xl border border-[#35513D] flex items-center gap-6">
          <div>
            <span className="text-[11px] text-[#BAC8BD] uppercase tracking-wider block">Net Direct Earnings</span>
            <span className="font-mono text-2xl font-bold text-[#F4DEBA] tabular-nums">
              ₹{(currentUser.earnings || 48500).toLocaleString()}
            </span>
          </div>
          <div className="border-l border-[#35513D] pl-4">
            <span className="text-[11px] text-[#BAC8BD] uppercase tracking-wider block">Income Retention</span>
            <span className="font-mono text-2xl font-bold text-[#9FE2A7] tabular-nums">
              92.4%
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Guided Product Upload (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E5DFD4] shadow-xs">
          <div className="flex items-center justify-between gap-4 pb-4 mb-6 border-b border-[#EFEAE1]">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#1E3023]">
                Upload New Product or Raw Material
              </h2>
              <p className="text-xs text-[#5C6E60]">
                Simple assisted workflow with transparent price breakdown and voice transcription
              </p>
            </div>

            {/* Voice Assistant Button */}
            <button
              type="button"
              onClick={handleVoiceInputSim}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isListeningVoice
                  ? 'bg-[#C04838] text-white animate-pulse'
                  : 'bg-[#FAF3EA] text-[#7A5B35] border border-[#E8DCCB] hover:bg-[#F3E7D5]'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-[#DDA76A]" />
              <span>{isListeningVoice ? 'Listening (Telugu/EN)...' : 'Voice Assistant Input'}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Marketplace Type Selector */}
            <div className="grid grid-cols-2 gap-4">
              <label className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between ${productType === 'handmade' ? 'bg-[#F2F7F3] border-[#2C4A34]' : 'bg-[#FAF8F5] border-[#E8E2D8]'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-[#1E3023]">Handmade Product</span>
                  <input
                    type="radio"
                    name="type"
                    checked={productType === 'handmade'}
                    onChange={() => setProductType('handmade')}
                    className="accent-[#2C4A34]"
                  />
                </div>
                <p className="text-[11px] text-[#5D6F61]">Sarees, wooden toys, tribal decor for customers</p>
              </label>

              <label className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between ${productType === 'raw_material' ? 'bg-[#F2F7F3] border-[#2C4A34]' : 'bg-[#FAF8F5] border-[#E8E2D8]'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-[#1E3023]">Raw Material</span>
                  <input
                    type="radio"
                    name="type"
                    checked={productType === 'raw_material'}
                    onChange={() => setProductType('raw_material')}
                    className="accent-[#2C4A34]"
                  />
                </div>
                <p className="text-[11px] text-[#5D6F61]">Bamboo, jute, coconut shells, wood billets for makers</p>
              </label>
            </div>

            {/* Product Name (English & Telugu) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                  Product Name (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pochampally Ikat Silk Stole"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                  పేరు (Telugu Optional)
                </label>
                <input
                  type="text"
                  placeholder="ఉదాహరణ: పోచంపల్లి పట్టు వస్త్రం"
                  value={nameTelugu}
                  onChange={(e) => setNameTelugu(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                />
              </div>
            </div>

            {/* Category and Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                >
                  <option value="Handloom Sarees">Handloom Sarees</option>
                  <option value="Traditional Toys">Traditional Toys</option>
                  <option value="Tribal Decor">Tribal Decor</option>
                  <option value="Bamboo & Cane">Bamboo & Cane</option>
                  <option value="Coconut Shells">Coconut Shells</option>
                  <option value="Natural Fibers">Natural Fibers</option>
                  <option value="Wood & Carving">Wood & Carving</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                  Unit Pricing
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                  placeholder="per piece / per kg / bundle"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                  Available Stock
                </label>
                <input
                  type="number"
                  min="1"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                />
              </div>
            </div>

            {/* Artisan Price & Fair Breakdown Calculator */}
            <div className="p-4 bg-[#F8F5EE] rounded-xl border border-[#E5DFD4] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block font-bold text-sm text-[#1E3023]">
                    Your Desired Direct Earning (₹) *
                  </label>
                  <p className="text-[11px] text-[#5D6F61]">
                    This is 100% your money. Platform automatically computes transparent fee & shipping.
                  </p>
                </div>
                <div className="w-36">
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={makerPriceInput}
                    onChange={(e) => setMakerPriceInput(Number(e.target.value))}
                    className="w-full p-2 bg-white rounded-lg border border-[#DDD5C7] text-base font-mono font-bold text-[#1E3023] outline-hidden focus:border-[#2C4A34] text-right"
                  />
                </div>
              </div>

              {/* Automatic transparent preview */}
              <div className="bg-white p-3 rounded-lg border border-[#E2DAD0] grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] text-[#5C6E60]">
                <div>
                  <span className="block text-[#829284]">Your Payout</span>
                  <span className="font-mono font-bold text-[#2C6E3D] text-xs">₹{makerPriceInput}</span>
                </div>
                <div>
                  <span className="block text-[#829284]">Platform (5%)</span>
                  <span className="font-mono text-xs">₹{platformFee}</span>
                </div>
                <div>
                  <span className="block text-[#829284]">Eco-Box Pack</span>
                  <span className="font-mono text-xs">₹{packagingCharge}</span>
                </div>
                <div>
                  <span className="block text-[#829284]">Rural Transit</span>
                  <span className="font-mono text-xs">₹{deliveryCost}</span>
                </div>
                <div>
                  <span className="block text-[#829284]">Final Customer Price</span>
                  <span className="font-mono font-bold text-[#1E3023] text-xs">₹{calculatedFinalPrice}</span>
                </div>
              </div>
            </div>

            {/* GI Tag & Origin Verification */}
            <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#1E3023]">GI Tag & Craft Lineage Registry</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGIVerified}
                    onChange={(e) => setIsGIVerified(e.target.checked)}
                    className="accent-[#2C4A34] w-4 h-4"
                  />
                  <span className="font-medium text-[#2C6E3D]">Verified GI-Certified Craft</span>
                </label>
              </div>

              <input
                type="text"
                value={craftLineage}
                onChange={(e) => setCraftLineage(e.target.value)}
                placeholder="e.g. Pochampally Ikat - GI Tagged #23 or Kondapalli Bommallu #46"
                className="w-full p-2 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden text-xs"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-1">
                Craft Story, Technique & Natural Materials *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the weaving time, vegetable dyes, or carving technique..."
                className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
              />
            </div>

            {/* Photo Template Selector */}
            <div>
              <label className="block font-semibold text-[#1E3023] uppercase tracking-wider mb-2">
                Select Photo from Workshop Shoot
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '/images/product_pochampally_ikat_1792066860036.jpg', label: 'Pochampally Weave' },
                  { id: '/images/product_kondapalli_toys_1792066861038.jpg', label: 'Kondapalli Wood' },
                  { id: '/images/product_bamboo_raw_material_1792066860431.jpg', label: 'Bamboo & Shells' },
                ].map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setImageSelection(img.id)}
                    className={`relative rounded-xl overflow-hidden aspect-4/3 cursor-pointer border-2 transition-all ${
                      imageSelection === img.id ? 'border-[#2C4A34] ring-2 ring-[#2C4A34]/20' : 'border-[#DDD5C7]'
                    }`}
                  >
                    <img src={img.id} alt={img.label} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded text-center truncate">
                      {img.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EFEAE1]">
              <button
                type="submit"
                className="px-6 py-3 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Upload className="w-4 h-4 text-[#E4C59E]" />
                <span>Publish Listing to TribeKart</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Guidance: Packaging and Fair-Fee Transparency (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Packaging Guidance Card */}
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#E5DFD4] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-[#7A5B35]">
              <Package className="w-5 h-5" />
              <h3 className="font-serif text-lg font-semibold text-[#1E3023]">
                Packaging Guidance for Artisans
              </h3>
            </div>

            <p className="text-xs text-[#5C6E60] leading-relaxed">
              TribeKart supplies standard corrugated boxes and cotton mulch wrappers to your nearest village collection center:
            </p>

            <ol className="text-xs space-y-2 text-[#465749] list-decimal pl-4">
              <li>Wrap handloom silk in breathable acid-free tissue paper.</li>
              <li>Affix the GI Verification Hologram & artisan sign card.</li>
              <li>Hand over parcel to Sunita Bai (Hub Runner) or drop at Choutuppal Depot.</li>
              <li>Payout triggers instantly upon India Post barcode scan.</li>
            </ol>
          </div>

          {/* ONDC Logistics Note */}
          <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E8E1D5] space-y-3 text-xs">
            <h4 className="font-semibold text-[#1E3023] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2C6E3D]" />
              Direct Fair-Trade Guarantee
            </h4>
            <p className="text-[#5C6E60] leading-relaxed">
              Unlike commercial portals deducting 25% to 35% commission, TribeKart retains only a nominal 5% digital upkeep fee, returning over 92% of gross value to rural makers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
