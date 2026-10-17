export type UserRole = 'customer' | 'artisan' | 'supplier' | 'worker' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  bio: string;
  collectiveName?: string;
  earnings?: number;
}

export type ProductType = 'handmade' | 'raw_material';

export interface PriceBreakdown {
  makerPrice: number;       // Direct amount going to artisan/supplier
  platformFee: number;      // 5% nominal digital upkeep
  packagingCharge: number;  // Eco-friendly biodegradable pack
  deliveryCost: number;     // Rural hub to customer shipping
  taxes: number;            // Applicable GST
  finalPrice: number;       // Customer total
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  type: ProductType;
  name: string;
  nameTelugu: string;
  kicker: string;
  price: number;
  unit: string;
  minOrderQty: number;
  stock: number;
  image: string;
  category: string;
  craftLineage: string;
  isGIVerified: boolean;
  isCraftInspired: boolean;
  giTagNumber?: string;
  originRegion: string;
  makerId: string;
  makerName: string;
  makerCollective: string;
  makerStory: string;
  makerAvatar: string;
  materialsUsed: string[];
  sustainableAspect: string;
  careInstructions: string;
  dispatchDays: number;
  customizable: boolean;
  costBreakdown: PriceBreakdown;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  type: ProductType;
  makerName: string;
  makerEarnings: number;
}

export interface OrderTimelineStep {
  title: string;
  timestamp: string;
  done: boolean;
  description: string;
}

export interface Order {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  makerEarningsTotal: number;
  paymentMethod: 'UPI' | 'COD';
  paymentStatus: 'paid' | 'pending_cod';
  status: 'placed' | 'confirmed' | 'hub_inspected' | 'shipped' | 'delivered';
  timeline: OrderTimelineStep[];
}

export interface WorkerJob {
  id: string;
  title: string;
  titleTelugu: string;
  hubLocation: string;
  jobType: 'Quality Check & Sorting' | 'Catalog Photography' | 'Packaging & Eco-Boxing' | 'Collection Center Runner' | 'Raw Material Sorting';
  payout: string;
  payoutAmount: number;
  slotsAvailable: number;
  requirements: string[];
  schedule: string;
  status: 'open' | 'applied' | 'assigned' | 'completed';
}

export interface PlatformImpactStats {
  villageCollectives: number;
  activeArtisans: number;
  wasteReusedKg: number;
  makerIncomeRetainedPercent: number;
  localJobsCreated: number;
  totalOrdersFulfilled: number;
  rawMaterialsSourcedKg: number;
}
