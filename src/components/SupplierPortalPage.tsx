import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Plus,
  TrendingUp,
  Truck,
  Leaf,
  Layers,
  MapPin,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  FileText,
  Filter,
} from 'lucide-react';

interface SupplierBatch {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  moq: number;
  pricePerUnit: number;
  origin: string;
  moistureGrade: string;
  harvestDate: string;
  status: 'In Stock' | 'Low Stock' | 'Reserved';
}

const INITIAL_SUPPLIER_BATCHES: SupplierBatch[] = [
  {
    id: 'batch_bamboo_01',
    name: 'Seasoned Andhra Golden Bamboo Stalks (Treated)',
    category: 'Bamboo & Cane',
    stock: 850,
    unit: 'poles (10ft)',
    moq: 20,
    pricePerUnit: 180,
    origin: 'Rampa Agency Forests, Alluri Sitharama Raju District, AP',
    moistureGrade: '< 12% kiln seasoned',
    harvestDate: 'Oct 2026',
    status: 'In Stock',
  },
  {
    id: 'batch_coconut_02',
    name: 'Temple Upcycled Polished Coconut Shell Halves',
    category: 'Coconut Shells',
    stock: 3400,
    unit: 'cleaned shells',
    moq: 50,
    pricePerUnit: 14,
    origin: 'Draksharamam Temple Clusters, Konaseema, AP',
    moistureGrade: 'Sun dried, oil free',
    harvestDate: 'Oct 2026',
    status: 'In Stock',
  },
  {
    id: 'batch_wood_03',
    name: 'Poniki Softwood Carving Blocks (GI Toy Approved)',
    category: 'Wood & Carving',
    stock: 220,
    unit: 'cubic ft',
    moq: 5,
    pricePerUnit: 480,
    origin: 'Kondapalli Reserve Buffer Agro-Forestry, AP',
    moistureGrade: 'A-Grade seasoned timber',
    harvestDate: 'Sept 2026',
    status: 'In Stock',
  },
  {
    id: 'batch_jute_04',
    name: 'Natural Golden Bast Jute Fibre Bundles',
    category: 'Natural Fibers',
    stock: 450,
    unit: 'kg bundles',
    moq: 15,
    pricePerUnit: 95,
    origin: 'Coastal Delta Smallholder Farmers, Amalapuram',
    moistureGrade: 'Retting certified natural',
    harvestDate: 'Oct 2026',
    status: 'In Stock',
  },
  {
    id: 'batch_dye_05',
    name: 'Organic Madder Root & Pure Indigo Powder',
    category: 'Natural Dyes',
    stock: 65,
    unit: 'kg pouches',
    moq: 2,
    pricePerUnit: 620,
    origin: 'Certified Organic Botanical Farm, Guntur',
    moistureGrade: 'Double-milled pigment grade',
    harvestDate: 'Sept 2026',
    status: 'Low Stock',
  },
];

interface BulkOrderRequest {
  id: string;
  buyerName: string;
  buyerRole: string;
  location: string;
  material: string;
  quantity: string;
  totalAmount: number;
  orderDate: string;
  status: 'Pending Dispatch' | 'Dispatched' | 'Delivered';
}

const INITIAL_BULK_REQUESTS: BulkOrderRequest[] = [
  {
    id: 'BOR-2026-881',
    buyerName: 'Kondapalli Wooden Toy Artisan Cooperative',
    buyerRole: 'Artisan SHG Guild',
    location: 'Kondapalli, NTR District, AP',
    material: 'Poniki Softwood Carving Blocks',
    quantity: '25 cubic ft',
    totalAmount: 12000,
    orderDate: 'Today, 09:30 AM',
    status: 'Pending Dispatch',
  },
  {
    id: 'BOR-2026-880',
    buyerName: 'Araku Valley Tribal Bamboo Crafts Collective',
    buyerRole: 'Tribal Producer Group',
    location: 'Paderu, Alluri District, AP',
    material: 'Seasoned Andhra Golden Bamboo Stalks',
    quantity: '100 poles',
    totalAmount: 18000,
    orderDate: 'Yesterday',
    status: 'Pending Dispatch',
  },
  {
    id: 'BOR-2026-879',
    buyerName: 'Pochampally Handloom Weavers Sahakari Sangham',
    buyerRole: 'Weaver Cooperative',
    location: 'Bhoodan Pochampally, Telangana',
    material: 'Organic Madder Root Powder',
    quantity: '10 kg',
    totalAmount: 6200,
    orderDate: '14 Oct 2026',
    status: 'Dispatched',
  },
  {
    id: 'BOR-2026-878',
    buyerName: 'Konaseema Eco-Crafts Women Society',
    buyerRole: 'Women SHG',
    location: 'Amalapuram, AP',
    material: 'Temple Upcycled Polished Coconut Shells',
    quantity: '500 shells',
    totalAmount: 7000,
    orderDate: '12 Oct 2026',
    status: 'Delivered',
  },
];

export const SupplierPortalPage: React.FC = () => {
  const { currentUser, addToast, setActivePage } = useApp();
  const [activeTab, setActiveTab] = useState<'inventory' | 'add_batch' | 'orders' | 'circular_impact'>('inventory');

  const [batches, setBatches] = useState<SupplierBatch[]>(INITIAL_SUPPLIER_BATCHES);
  const [orders, setOrders] = useState<BulkOrderRequest[]>(INITIAL_BULK_REQUESTS);

  // New Batch Form State
  const [batchName, setBatchName] = useState('');
  const [category, setCategory] = useState('Bamboo & Cane');
  const [stockAmount, setStockAmount] = useState<number>(100);
  const [unitLabel, setUnitLabel] = useState('poles (10ft)');
  const [moqValue, setMoqValue] = useState<number>(10);
  const [pricePerUnit, setPricePerUnit] = useState<number>(150);
  const [originText, setOriginText] = useState('Amalapuram Coastal Smallholders, Konaseema');
  const [moistureInfo, setMoistureInfo] = useState('Sun seasoned, moisture < 14%');

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName.trim()) return;

    const newBatch: SupplierBatch = {
      id: `batch_${Date.now()}`,
      name: batchName,
      category,
      stock: stockAmount,
      unit: unitLabel,
      moq: moqValue,
      pricePerUnit,
      origin: originText,
      moistureGrade: moistureInfo,
      harvestDate: 'Oct 2026',
      status: 'In Stock',
    };

    setBatches([newBatch, ...batches]);
    setBatchName('');
    setActiveTab('inventory');

    addToast({
      type: 'success',
      title: 'Raw Material Batch Listed',
      message: `${newBatch.name} is now available on TribeKart Raw Material Marketplace for artisan cooperatives.`,
    });
  };

  const handleDispatchOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Dispatched' } : o))
    );
    addToast({
      type: 'success',
      title: 'Bulk Order Dispatched',
      message: `Waybill generated for ${orderId}. Routed to ONDC Shared Logistics Rural Feeder.`,
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Portal Header */}
      <div className="mb-8 pb-6 border-b border-[#E8E2D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase">
              RAW MATERIAL AGGREGATOR & SUPPLIER PORTAL
            </span>
            <span className="text-xs text-[#2C6E3D] font-medium bg-[#E8F2EA] px-2 py-0.5 rounded-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Sourcing Hub
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023]">
            {currentUser.name}'s Supplier Hub
          </h1>
          <p className="text-xs text-[#5C6E60]">
            {currentUser.collectiveName || 'Konaseema Bio-Supplies & Agro Producers'} · {currentUser.location}
          </p>
        </div>

        {/* Live Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-[#1C2C20] text-white p-4 rounded-xl border border-[#2D4533] flex items-center gap-5">
            <div>
              <span className="text-[10px] text-[#A2B3A4] uppercase tracking-wider block">Raw Materials Supplied</span>
              <span className="font-mono text-xl font-bold text-[#F4DEBA] tabular-nums">48.5 Tonnes</span>
            </div>
            <div className="h-8 w-px bg-[#2D4533]" />
            <div>
              <span className="text-[10px] text-[#A2B3A4] uppercase tracking-wider block">Direct Payouts</span>
              <span className="font-mono text-xl font-bold text-[#A7D7B1] tabular-nums">₹72,400</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5DFD4] mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'inventory'
              ? 'border-[#2C4A34] text-[#1E3023] font-semibold bg-[#F5EFE6]/50'
              : 'border-transparent text-[#627566] hover:text-[#1E3023]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Active Material Inventory ({batches.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('add_batch')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'add_batch'
              ? 'border-[#2C4A34] text-[#1E3023] font-semibold bg-[#F5EFE6]/50'
              : 'border-transparent text-[#627566] hover:text-[#1E3023]'
          }`}
        >
          <Plus className="w-4 h-4 text-[#DDA76A]" />
          <span>List New Supply Batch</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'orders'
              ? 'border-[#2C4A34] text-[#1E3023] font-semibold bg-[#F5EFE6]/50'
              : 'border-transparent text-[#627566] hover:text-[#1E3023]'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Artisan Guild Bulk Orders ({orders.filter((o) => o.status === 'Pending Dispatch').length} Pending)</span>
        </button>

        <button
          onClick={() => setActiveTab('circular_impact')}
          className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'circular_impact'
              ? 'border-[#2C4A34] text-[#1E3023] font-semibold bg-[#F5EFE6]/50'
              : 'border-transparent text-[#627566] hover:text-[#1E3023]'
          }`}
        >
          <Leaf className="w-4 h-4 text-[#2C6E3D]" />
          <span>Zero-Waste & Farmer Sourcing</span>
        </button>
      </div>

      {/* Tab Content: Inventory */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F5EFE6] p-4 rounded-xl border border-[#E5DFD4]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#1E3023]">Filter by Material:</span>
              <span className="text-xs text-[#5C6E60]">Showing all verified raw craft materials ready for artisan shipping</span>
            </div>
            <button
              onClick={() => setActiveTab('add_batch')}
              className="px-3.5 py-1.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 self-start cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#E4C59E]" />
              <span>Add Material Batch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className="bg-white rounded-xl border border-[#E5DFD4] p-5 shadow-xs hover:border-[#C4BAA9] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A5B35] bg-[#F7F1E8] px-2 py-0.5 rounded-sm">
                      {batch.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                        batch.status === 'In Stock'
                          ? 'bg-[#EAF3EC] text-[#2C6E3D]'
                          : 'bg-[#FEF3F2] text-[#B42318]'
                      }`}
                    >
                      {batch.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#1E3023] mb-2 leading-snug">
                    {batch.name}
                  </h3>

                  <div className="space-y-1.5 text-xs text-[#5D6F61] mb-4">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-[#DDA76A] shrink-0" />
                      <span className="truncate">{batch.origin}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] bg-[#FAF8F5] p-2 rounded-md border border-[#EDE7DD]">
                      <span>Quality & Seasoning:</span>
                      <span className="font-medium text-[#1E3023]">{batch.moistureGrade}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#EDE7DD]">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="font-mono text-xl font-bold text-[#1E3023]">₹{batch.pricePerUnit}</span>
                      <span className="text-xs text-[#7B8C7E] ml-1">/ {batch.unit}</span>
                    </div>
                    <span className="text-xs text-[#2C6E3D] font-medium">
                      Stock: {batch.stock} units
                    </span>
                  </div>

                  <div className="text-[11px] text-[#7A5B35] mb-3 flex items-center justify-between">
                    <span>Min Order Quantity (MOQ):</span>
                    <span className="font-semibold">{batch.moq} {batch.unit.split(' ')[0]}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        addToast({
                          type: 'info',
                          title: 'Stock Updated',
                          message: `Stock level confirmed for ${batch.name}.`,
                        });
                      }}
                      className="flex-1 py-1.5 bg-[#F4EFEA] hover:bg-[#EAE4D9] text-[#1E3023] rounded-lg text-xs font-medium cursor-pointer transition-colors"
                    >
                      Update Quantity
                    </button>
                    <button
                      onClick={() => {
                        setActivePage('raw-materials');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-medium cursor-pointer transition-colors"
                    >
                      View on Market
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Add New Batch */}
      {activeTab === 'add_batch' && (
        <div className="max-w-3xl bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD4] shadow-xs">
          <div className="mb-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1E3023] mb-1">
              List Raw Material Supply Batch
            </h2>
            <p className="text-xs text-[#5D6F61]">
              Provide harvest origin, moisture grading, and MOQ so weaving cooperatives and toy craftspeople get guaranteed authentic supplies.
            </p>
          </div>

          <form onSubmit={handleCreateBatch} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Raw Material Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cured Bamboo Slats for Baskets"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                >
                  <option value="Bamboo & Cane">Bamboo & Cane</option>
                  <option value="Coconut Shells">Coconut Shells</option>
                  <option value="Wood & Carving">Wood & Carving</option>
                  <option value="Natural Fibers">Natural Fibers (Jute/Sisal)</option>
                  <option value="Natural Dyes">Natural Dyes & Mordants</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Available Stock *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={stockAmount}
                  onChange={(e) => setStockAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Unit Measurement *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. poles, kg, shells"
                  value={unitLabel}
                  onChange={(e) => setUnitLabel(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Price per Unit (₹) *
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Minimum Order Quantity (MOQ)
                </label>
                <input
                  type="number"
                  min={1}
                  value={moqValue}
                  onChange={(e) => setMoqValue(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                  Moisture / Treatment Grade
                </label>
                <input
                  type="text"
                  placeholder="e.g. Boron treated, kiln dried < 12%"
                  value={moistureInfo}
                  onChange={(e) => setMoistureInfo(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1E3023] mb-1.5">
                Farm Origin & Sourcing District
              </label>
              <input
                type="text"
                value={originText}
                onChange={(e) => setOriginText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-lg border border-[#DDD5C7] bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#2C4A34]"
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('inventory')}
                className="px-4 py-2 border border-[#DDD5C7] rounded-lg text-xs text-[#5D6F61] hover:bg-[#FAF8F5] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-[#E4C59E]" />
                <span>Publish Supply Batch to Marketplace</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content: Bulk Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DFD4] p-4 flex items-center justify-between">
            <span className="text-xs font-medium text-[#1E3023]">
              Incoming procurement orders from artisan self-help groups & cooperatives
            </span>
            <span className="text-xs text-[#2C6E3D] font-medium bg-[#E8F2EA] px-2.5 py-1 rounded-sm">
              ONDC Integrated Logistics Feeders
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#E5DFD4] p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#1E3023]">{order.id}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                        order.status === 'Pending Dispatch'
                          ? 'bg-[#FEF6EE] text-[#B54708] border border-[#F9DBAF]'
                          : order.status === 'Dispatched'
                          ? 'bg-[#EFF8FF] text-[#175CD3]'
                          : 'bg-[#EDF8F0] text-[#1E743B]'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[11px] text-[#7B8C7E]">· {order.orderDate}</span>
                  </div>

                  <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                    {order.buyerName}
                  </h3>
                  <div className="text-xs text-[#5D6F61] flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-[#7A5B35]">{order.buyerRole}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#DDA76A]" />
                      {order.location}
                    </span>
                    <span>·</span>
                    <span className="text-[#1E3023] font-medium">{order.material} ({order.quantity})</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-[#7B8C7E] uppercase block">Payout Value</span>
                    <span className="font-mono text-lg font-bold text-[#1E3023]">₹{order.totalAmount.toLocaleString()}</span>
                  </div>

                  {order.status === 'Pending Dispatch' ? (
                    <button
                      onClick={() => handleDispatchOrder(order.id)}
                      className="px-4 py-2 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5 text-[#E4C59E]" />
                      <span>Confirm & Generate Feeder Waybill</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-[#2C6E3D] font-medium bg-[#E8F2EA] px-3 py-1.5 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Waybill Active</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Circular Impact */}
      {activeTab === 'circular_impact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#2C6E3D]" />
              <h3 className="font-serif text-lg font-semibold text-[#1E3023]">
                Agro-Waste Upcycling Statistics
              </h3>
            </div>
            <p className="text-xs text-[#5D6F61] leading-relaxed">
              TribeKart enables smallholder farmers across Konaseema and Andhra coastal belts to monetize coconut husks, temple shells, and bamboo thinning instead of burning or dumping them in waterways.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DD]">
                <span className="text-xs text-[#7B8C7E] block">Temple Shells Diverted</span>
                <span className="font-mono text-xl font-bold text-[#1E3023]">24,500 units</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DD]">
                <span className="text-xs text-[#7B8C7E] block">Farmers Directly Paid</span>
                <span className="font-mono text-xl font-bold text-[#2C6E3D]">142 smallholders</span>
              </div>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#DDA76A]" />
              <h3 className="font-serif text-lg font-semibold text-[#1E3023]">
                ONDC Shared Logistics Coordination
              </h3>
            </div>
            <p className="text-xs text-[#5D6F61] leading-relaxed">
              Instead of individual courier dispatches, raw materials are clustered at the Amalapuram Hub and transported via collective truck runs directly to artisan clusters, reducing transit freight by 42%.
            </p>
            <div className="p-3 bg-white rounded-xl border border-[#E5DFD4] text-xs text-[#1E3023] flex items-center justify-between">
              <span>Next Cluster Feeder Dispatch:</span>
              <span className="font-mono font-semibold text-[#2C4A34]">Tomorrow, 06:00 AM (East Godavari Route)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
