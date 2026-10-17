import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ShieldCheck,
  FileText,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { orders, setActivePage, openProductDetail, addToast } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(orders[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleDownloadInvoice = (orderId: string) => {
    addToast({
      type: 'info',
      title: 'Invoice Generated',
      message: `Tax invoice & artisan livelihood certificate for Order #${orderId} generated.`,
    });
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#E8E2D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#7A5B35] uppercase mb-1.5">
            REAL-TIME TRACKING & IMPACT
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3023]">
            My Orders & Livelihood Traceability
          </h1>
          <p className="text-sm text-[#5C6E60] max-w-2xl">
            Track your handcrafted items from rural artisan clusters, view quality check reports, and see exact earnings disbursed to makers.
          </p>
        </div>

        <button
          onClick={() => {
            setActivePage('handmade');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-4 py-2 bg-[#2C4A34] text-white rounded-lg text-xs font-medium hover:bg-[#1E3324] cursor-pointer self-start sm:self-auto"
        >
          Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-[#FAF8F5] rounded-2xl border border-[#E5DFD4]">
          <Package className="w-12 h-12 text-[#98A89A] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-semibold text-[#1E3023]">No Orders Placed Yet</h3>
          <p className="text-xs text-[#5D6F61] mt-1 max-w-sm mx-auto">
            Discover honest raw materials and handwoven textiles to support rural Indian craft communities.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#E5DFD4] shadow-xs overflow-hidden transition-all"
              >
                {/* Order Top Bar */}
                <div className="p-5 sm:p-6 bg-[#FAF8F5] border-b border-[#EDE7DD] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div>
                      <span className="text-[#8B9C8E] block text-[11px] uppercase">Order Number</span>
                      <span className="font-mono font-bold text-[#1E3023] text-sm">{order.id}</span>
                    </div>

                    <div>
                      <span className="text-[#8B9C8E] block text-[11px] uppercase">Date Placed</span>
                      <span className="font-medium text-[#1E3023]">{order.date}</span>
                    </div>

                    <div>
                      <span className="text-[#8B9C8E] block text-[11px] uppercase">Total Paid</span>
                      <span className="font-mono font-bold text-[#1E3023] text-sm tabular-nums">
                        ₹{order.totalAmount.toLocaleString()} ({order.paymentMethod})
                      </span>
                    </div>

                    <div>
                      <span className="text-[#8B9C8E] block text-[11px] uppercase">Maker Earnings Disbursed</span>
                      <span className="font-mono font-bold text-[#2C6E3D] text-sm tabular-nums">
                        ₹{order.makerEarningsTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DDD5C7] rounded-lg text-xs text-[#1E3023] hover:bg-[#F2ECE2] transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#7A5B35]" />
                      <span>Invoice & Origin Certificate</span>
                    </button>

                    <button
                      onClick={() => toggleExpand(order.id)}
                      className="p-1.5 text-[#5C6E60] hover:text-[#1E3023] hover:bg-[#EAE4D9] rounded-lg transition-colors cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="p-5 sm:p-6 space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover bg-[#ECE6DC] border border-[#DDD5C7]"
                        />
                        <div>
                          <h4
                            onClick={() => openProductDetail(item.productId)}
                            className="font-serif text-base font-semibold text-[#1E3023] hover:text-[#2C4A34] cursor-pointer line-clamp-1"
                          >
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#7A5B35] font-medium">
                            Maker: {item.makerName} · Qty: {item.quantity}
                          </p>
                          <p className="text-[11px] text-[#2C6E3D]">
                            Direct livelihood value: ₹{item.makerEarnings.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-bold text-sm text-[#1E3023] tabular-nums">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expandable Tracking Timeline */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#FAF7F2] border-t border-[#EDE7DD] space-y-4">
                    <h4 className="font-serif text-base font-semibold text-[#1E3023] flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#2C6E3D]" />
                      <span>Live Hub Journey & GI Verification Timeline</span>
                    </h4>

                    <div className="space-y-4 pt-2">
                      {order.timeline.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3.5 relative">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                            step.done ? 'bg-[#2C4A34] text-white' : 'bg-[#E2DAD0] text-[#78887B]'
                          }`}>
                            {step.done ? '✓' : sIdx + 1}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-semibold ${step.done ? 'text-[#1E3023]' : 'text-[#7B8B7E]'}`}>
                                {step.title}
                              </span>
                              <span className="text-[11px] text-[#8C9C8F]">· {step.timestamp}</span>
                            </div>
                            <p className="text-xs text-[#5D6F61] mt-0.5 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#5D6F61]">
                      <span>Destination: <strong>{order.customerAddress}</strong></span>
                      <span className="flex items-center gap-1 text-[#2C6E3D] font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" /> India Post Consignment Escrow Active
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
