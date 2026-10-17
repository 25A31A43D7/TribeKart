import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  QrCode,
  Truck,
  Leaf,
  CreditCard,
  AlertCircle,
} from 'lucide-react';

export const CartCheckoutModal: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    placeOrder,
    currentUser,
    setActivePage,
  } = useApp();

  const [step, setStep] = useState<'cart' | 'checkout' | 'upi_scan'>('cart');
  const [customerName, setCustomerName] = useState(currentUser.name);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone);
  const [customerAddress, setCustomerAddress] = useState(currentUser.location);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD'>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalMakerEarning = cart.reduce(
    (sum, item) => sum + item.product.costBreakdown.makerPrice * item.quantity,
    0
  );
  const totalPlatformFee = cart.reduce(
    (sum, item) => sum + item.product.costBreakdown.platformFee * item.quantity,
    0
  );
  const totalPackaging = cart.length > 0 ? 80 : 0;
  const delivery = subtotal > 1500 ? 0 : 120;
  const grandTotal = subtotal + (delivery > 0 ? delivery : 0);

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        customerName,
        customerPhone,
        customerAddress,
        paymentMethod,
      });
      setStep('cart');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-[#FAF8F5] w-full max-w-xl h-full flex flex-col shadow-2xl border-l border-[#E2DAD0]">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E8E2D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2C4A34]" />
            <h2 className="font-serif text-xl font-semibold text-[#1E3023]">
              {step === 'cart' ? 'Your Shopping Bag' : 'Fair-Trade Checkout'}
            </h2>
            <span className="text-xs text-[#7A8C7E]">
              ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setStep('cart');
            }}
            className="p-1.5 text-[#5C6E60] hover:text-[#1E3023] hover:bg-[#F2ECE2] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#B4C2B6] mx-auto" />
              <p className="font-serif text-lg text-[#1E3023]">Your bag is currently empty</p>
              <p className="text-xs text-[#6F8273] max-w-xs mx-auto">
                Explore handloom sarees, Kondapalli wooden toys, or raw materials direct from artisan clusters.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActivePage('handmade');
                }}
                className="px-6 py-2.5 bg-[#2C4A34] text-white text-xs font-semibold rounded-lg hover:bg-[#1E3324] transition-colors"
              >
                Browse Marketplace
              </button>
            </div>
          ) : step === 'cart' ? (
            /* STEP 1: CART VIEW */
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-4 rounded-xl border border-[#E5DFD4] flex gap-4 shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('product_pochampally_ikat_1792066860036.jpg')) {
                        target.src = '/images/product_pochampally_ikat_1792066860036.jpg';
                      }
                    }}
                    className="w-20 h-20 rounded-lg object-cover bg-[#ECE6DC] shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-xs sm:text-sm text-[#1E3023] line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#98A89A] hover:text-[#A84234] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#7A5B35] font-medium mt-0.5">
                        Maker: {item.product.makerName} ({item.product.originRegion.split(',')[0]})
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F0EAE1] mt-2">
                      <div className="flex items-center border border-[#DDD5C7] rounded-md overflow-hidden bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#EAE4D9] text-xs font-semibold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#EAE4D9] text-xs font-semibold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold font-mono text-[#1E3023] tabular-nums">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <span className="block text-[10px] text-[#2C6E3D]">
                          ₹{(item.product.costBreakdown.makerPrice * item.quantity).toLocaleString()} to maker
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Artisan Net Income Callout */}
              <div className="p-4 bg-[#EAF3EC] rounded-xl border border-[#BDDDC4] flex items-center justify-between text-xs">
                <span className="text-[#1E3023] font-medium flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#2C6E3D]" />
                  Direct Maker Share in this order:
                </span>
                <span className="font-mono font-bold text-[#2C6E3D] text-sm tabular-nums">
                  ₹{totalMakerEarning.toLocaleString()} (92.4%)
                </span>
              </div>
            </div>
          ) : step === 'checkout' ? (
            /* STEP 2: CHECKOUT ADDRESS & PAYMENT */
            <div className="space-y-5 text-xs">
              <div className="bg-white p-5 rounded-xl border border-[#E5DFD4] space-y-4">
                <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                  Delivery Address & Recipient
                </h3>

                <div>
                  <label className="block font-semibold text-[#1E3023] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E3023] mb-1">Mobile (WhatsApp for Dispatch Updates)</label>
                  <input
                    type="text"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E3023] mb-1">Street Address, Village/City & PIN Code</label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] rounded-lg border border-[#DDD5C7] outline-hidden focus:border-[#2C4A34]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white p-5 rounded-xl border border-[#E5DFD4] space-y-3">
                <h3 className="font-serif text-base font-semibold text-[#1E3023]">
                  Select Payment Option
                </h3>

                <div className="space-y-2">
                  <label className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${paymentMethod === 'UPI' ? 'bg-[#F2F7F3] border-[#2C4A34]' : 'bg-[#FAF8F5] border-[#DDD5C7]'}`}>
                    <div className="flex items-center gap-2.5">
                      <QrCode className="w-4 h-4 text-[#2C6E3D]" />
                      <div>
                        <p className="font-semibold text-[#1E3023]">Instant UPI / QR Code (Escrow Protected)</p>
                        <p className="text-[11px] text-[#5C6E60]">Google Pay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#2C4A34]"
                    />
                  </label>

                  <label className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${paymentMethod === 'COD' ? 'bg-[#F2F7F3] border-[#2C4A34]' : 'bg-[#FAF8F5] border-[#DDD5C7]'}`}>
                    <div className="flex items-center gap-2.5">
                      <Truck className="w-4 h-4 text-[#7A5B35]" />
                      <div>
                        <p className="font-semibold text-[#1E3023]">Cash on Physical Delivery (COD)</p>
                        <p className="text-[11px] text-[#5C6E60]">Pay cash upon inspecting parcel at door</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#2C4A34]"
                    />
                  </label>
                </div>

                <div className="p-3 bg-[#FFF9F2] rounded-lg border border-[#F0DDC5] text-[11px] text-[#8C602D] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#B57C3D]" />
                  <span>
                    <strong>Demo Simulation:</strong> This student prototype simulates UPI escrow and postal COD verification. No real money will be charged.
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 3: UPI QR SIMULATOR */
            <div className="py-6 text-center space-y-4">
              <div className="p-6 bg-white rounded-2xl border border-[#DDD5C7] max-w-xs mx-auto shadow-xs">
                <p className="text-xs font-semibold uppercase text-[#7A5B35] mb-2">Scan & Pay via any UPI App</p>
                <div className="w-44 h-44 bg-[#F2ECE2] rounded-xl mx-auto flex flex-col items-center justify-center p-3 border border-[#D5CDC0] relative">
                  <QrCode className="w-32 h-32 text-[#1E3023]" />
                  <span className="text-[10px] font-mono text-[#5C6E60] mt-1">UPI ID: tribekart.escrow@icici</span>
                </div>
                <p className="font-mono font-bold text-xl text-[#1E3023] mt-3 tabular-nums">
                  ₹{grandTotal.toLocaleString()}
                </p>
                <p className="text-[10px] text-[#2C6E3D] mt-1">
                  ₹{totalMakerEarning.toLocaleString()} directly allocated to weavers
                </p>
              </div>

              <div className="text-xs text-[#5C6E60]">
                Click below to simulate UPI confirmation from your mobile app.
              </div>
            </div>
          )}
        </div>

        {/* Footer Price Breakdown & Action */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8E2D8] space-y-4">
            <div className="space-y-1.5 text-xs text-[#5D6F61]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-mono tabular-nums text-[#1E3023]">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Biodegradable Packaging:</span>
                <span className="font-mono tabular-nums text-[#1E3023]">₹{totalPackaging}</span>
              </div>
              <div className="flex justify-between">
                <span>Postal Hub Delivery:</span>
                <span className="font-mono tabular-nums text-[#1E3023]">
                  {delivery === 0 ? <span className="text-[#2C6E3D] font-medium">FREE</span> : `₹${delivery}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#EDE7DD] flex justify-between font-bold text-sm text-[#1E3023]">
                <span>Total Amount:</span>
                <span className="font-mono text-base tabular-nums">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Step Action Buttons */}
            {step === 'cart' ? (
              <button
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
              >
                <span>Proceed to Fair Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#E4C59E]" />
              </button>
            ) : step === 'checkout' ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('cart')}
                  className="px-4 py-3 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-xs font-medium text-[#5C6E60]"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (paymentMethod === 'UPI') {
                      setStep('upi_scan');
                    } else {
                      handleCompleteOrder();
                    }
                  }}
                  className="flex-1 py-3.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all"
                >
                  {paymentMethod === 'UPI' ? 'Generate UPI Escrow QR' : 'Confirm Cash on Delivery Order'}
                  <ArrowRight className="w-4 h-4 text-[#E4C59E]" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep('checkout')}
                  className="px-4 py-3 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-xs font-medium text-[#5C6E60]"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="flex-1 py-3.5 bg-[#2C4A34] hover:bg-[#1E3324] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {isProcessing ? 'Verifying Escrow...' : 'Simulate Successful UPI Payment'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
