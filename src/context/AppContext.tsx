import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  WorkerJob,
  UserProfile,
  UserRole,
  PlatformImpactStats,
  PriceBreakdown,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_USERS,
  INITIAL_JOBS,
  INITIAL_ORDERS,
  INITIAL_IMPACT_STATS,
} from '../data/mockData';

export type ActivePage =
  | 'home'
  | 'raw-materials'
  | 'handmade'
  | 'product-detail'
  | 'artisan-profiles'
  | 'artisan-studio'
  | 'supplier-portal'
  | 'worker-portal'
  | 'my-orders'
  | 'admin-dashboard'
  | 'wishlist';

export type Language = 'en' | 'te';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  products: Product[];
  jobs: WorkerJob[];
  orders: Order[];
  impactStats: PlatformImpactStats;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product) => void;
  placeOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paymentMethod: 'UPI' | 'COD';
  }) => Order;
  applyForJob: (jobId: string, applicantNotes: string) => void;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  addReview: (
    productId: string,
    reviewData: { rating: number; comment: string; author?: string }
  ) => void;
  reportListing: (productId: string, reason: string) => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  isVoiceSearchOpen: boolean;
  setIsVoiceSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  heritageModalOpen: boolean;
  setHeritageModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [heritageModalOpen, setHeritageModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent States with versioning to ensure latest authentic products & photos
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('tribekart_products_v3');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const userCustom = parsed.filter(
          (p: Product) => !INITIAL_PRODUCTS.some((ip) => ip.id === p.id)
        );
        return [...INITIAL_PRODUCTS, ...userCustom];
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [jobs, setJobs] = useState<WorkerJob[]>(() => {
    const saved = localStorage.getItem('tribekart_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('tribekart_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tribekart_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tribekart_wishlist');
    return saved
      ? JSON.parse(saved)
      : ['prod_pochampally_ikat_saree', 'prod_channapatna_stacker_horse', 'prod_kondapalli_ambari_elephant'];
  });

  const [impactStats, setImpactStats] = useState<PlatformImpactStats>(() => {
    const saved = localStorage.getItem('tribekart_impact');
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_STATS;
  });

  useEffect(() => {
    localStorage.setItem('tribekart_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tribekart_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('tribekart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tribekart_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tribekart_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('tribekart_impact', JSON.stringify(impactStats));
  }, [impactStats]);

  const currentUser = INITIAL_USERS[currentRole] || INITIAL_USERS.customer;

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setSelectedProductId(null); // Reset any active product details view so role page immediately takes focus
    const user = INITIAL_USERS[newRole] || INITIAL_USERS.customer;
    addToast({
      type: 'info',
      title: `Switched Persona to ${user.name}`,
      message: `Operating as ${newRole.toUpperCase()} (${user.location}). All features and permissions updated.`,
    });

    // Ensure the interface/page changes correctly when switching forward or backward
    if (newRole === 'customer') {
      setActivePage('home');
    } else if (newRole === 'artisan') {
      setActivePage('artisan-studio');
    } else if (newRole === 'supplier') {
      setActivePage('supplier-portal');
    } else if (newRole === 'worker') {
      setActivePage('worker-portal');
    } else if (newRole === 'admin') {
      setActivePage('admin-dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      const name = product ? product.name.slice(0, 30) : 'Item';
      if (exists) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: `${name}... removed from your saved items.`,
        });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Wishlist ❤️',
          message: `${name}... saved to your wishlist.`,
        });
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((id) => id !== product.id));
    addToast({
      type: 'success',
      title: 'Moved to Bag',
      message: `${product.name.slice(0, 30)}... moved from wishlist to your shopping bag.`,
    });
  };

  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast({
      type: 'success',
      title: 'Added to Bag',
      message: `${product.name.slice(0, 35)}... (${quantity} ${product.unit}) added.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Item Removed',
      message: 'Item removed from your cart.',
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    paymentMethod: 'UPI' | 'COD';
  }) => {
    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image,
      type: item.product.type,
      makerName: item.product.makerName,
      makerEarnings: item.product.costBreakdown.makerPrice * item.quantity,
    }));

    const totalAmount = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const makerEarningsTotal = cart.reduce(
      (sum, item) =>
        sum + item.product.costBreakdown.makerPrice * item.quantity,
      0
    );

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const newOrder: Order = {
      id: `TK-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      date: dateFormatted,
      customerId: currentUser.id,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      items: orderItems,
      totalAmount,
      makerEarningsTotal,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'UPI' ? 'paid' : 'pending_cod',
      status: 'placed',
      timeline: [
        {
          title: 'Order Placed & Escrow Initiated',
          timestamp: 'Just now',
          done: true,
          description: `₹${makerEarningsTotal.toLocaleString()} locked for rural makers upon delivery verification.`,
        },
        {
          title: 'Artisan Hub Notification Sent',
          timestamp: 'Pending artisan pickup',
          done: false,
          description: 'Local SHG packaging coordinator assigned to collect items.',
        },
        {
          title: 'Hub Quality & GI Verification',
          timestamp: 'Scheduled',
          done: false,
          description: 'Physical inspection of handloom thread density and natural craft integrity.',
        },
        {
          title: 'Dispatched for Rural/Urban Delivery',
          timestamp: 'Estimated in 2 days',
          done: false,
          description: 'Eco-boxed with biodegradable starch tape and tracking stamp.',
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update Platform Impact Stats
    setImpactStats((prev) => ({
      ...prev,
      totalOrdersFulfilled: prev.totalOrdersFulfilled + 1,
      wasteReusedKg: prev.wasteReusedKg + Math.floor(Math.random() * 4 + 2),
    }));

    clearCart();
    setIsCartOpen(false);
    setActivePage('my-orders');

    addToast({
      type: 'success',
      title: 'Order Confirmed! 🎉',
      message: `Order #${newOrder.id} placed. ₹${makerEarningsTotal.toLocaleString()} secured for artisan livelihoods.`,
    });

    return newOrder;
  };

  const applyForJob = (jobId: string, applicantNotes: string) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === jobId ? { ...job, status: 'applied', slotsAvailable: Math.max(0, job.slotsAvailable - 1) } : job
      )
    );
    setImpactStats((prev) => ({
      ...prev,
      localJobsCreated: prev.localJobsCreated + 1,
    }));
    addToast({
      type: 'success',
      title: 'Application Received & SMS Sent',
      message: `Your application with notes "${applicantNotes.slice(0, 25)}..." was routed to the Village Panchayat Hub coordinator.`,
    });
  };

  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'reviews'>
  ) => {
    const newProduct: Product = {
      ...productData,
      id: `prod_${Math.random().toString(36).substring(2, 9)}`,
      rating: 5.0,
      reviewCount: 1,
      reviews: [
        {
          id: 'rev_init',
          author: 'TribeKart Craft Guild Auditor',
          rating: 5,
          date: new Date().toISOString().split('T')[0],
          comment: 'Sample verified directly from artisan workshop. Authentic materials verified.',
          verifiedPurchase: true,
        },
      ],
    };

    setProducts((prev) => [newProduct, ...prev]);
    setActivePage('product-detail');
    setSelectedProductId(newProduct.id);
    addToast({
      type: 'success',
      title: 'Product Published Successfully!',
      message: `"${newProduct.name}" is now live in the ${newProduct.type === 'handmade' ? 'Handmade' : 'Raw Materials'} catalog.`,
    });
  };

  const addReview = (
    productId: string,
    reviewData: { rating: number; comment: string; author?: string }
  ) => {
    const newRev = {
      id: `rev_${Date.now()}`,
      author: reviewData.author || currentUser.name,
      rating: reviewData.rating,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      comment: reviewData.comment.trim(),
      verifiedPurchase: true,
    };

    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const updatedReviews = [newRev, ...prod.reviews];
        const sum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newRating = Number((sum / updatedReviews.length).toFixed(1));
        return {
          ...prod,
          reviews: updatedReviews,
          rating: newRating,
          reviewCount: updatedReviews.length,
        };
      })
    );

    addToast({
      type: 'success',
      title: 'Review & Star Rating Published! ⭐',
      message: `Your ${reviewData.rating}-star rating was added. Thank you for supporting authentic artisanal livelihoods!`,
    });
  };

  const reportListing = (productId: string, reason: string) => {
    addToast({
      type: 'warning',
      title: 'Heritage Integrity Report Filed',
      message: `Auditors notified regarding Listing #${productId} for "${reason}". GI certification registry re-check initiated.`,
    });
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        openProductDetail,
        language,
        setLanguage,
        currentUser,
        switchRole,
        products,
        jobs,
        orders,
        impactStats,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        placeOrder,
        applyForJob,
        addProduct,
        addReview,
        reportListing,
        toasts,
        addToast,
        removeToast,
        isVoiceSearchOpen,
        setIsVoiceSearchOpen,
        searchQuery,
        setSearchQuery,
        heritageModalOpen,
        setHeritageModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
