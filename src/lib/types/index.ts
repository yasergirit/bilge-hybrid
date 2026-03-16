// Domain types for Bilge Hybrid E-Commerce

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  subcategories: Subcategory[];
  order: number;
}

export interface SubSubcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  group?: string;
  children?: SubSubcategory[];
  order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  subcategoryId: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  variants?: ProductVariant[];
  attributes: ProductAttribute[];
  stock: number;
  isOwnBrand: boolean;
  ownBrandInfo?: OwnBrandInfo;
  qrCode?: string;
  sku: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  priceModifier: number;
  stock: number;
  sku: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface OwnBrandInfo {
  productionType: 'local' | 'private-label' | 'custom';
  story: string;
  materials?: string;
  craftHighlight?: string;
  authenticityBadge: boolean;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  slug: string;
  variant?: string;
}

export interface Cart {
  items: CartItem[];
  couponCode?: string;
  subtotal: number;
  shippingEstimate: number;
  discount: number;
  total: number;
}

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  addressLine: string;
  postalCode: string;
  isDefault: boolean;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export interface StaticPage {
  slug: string;
  title: string;
  content: string;
}

// Payment abstraction
export interface PaymentProvider {
  id: string;
  name: string;
  type: 'credit-card' | 'bank-transfer' | 'cash-on-delivery';
  isActive: boolean;
}

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  provider: string;
  cardDetails?: {
    number: string;
    expiry: string;
    cvv: string;
    holderName: string;
  };
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
