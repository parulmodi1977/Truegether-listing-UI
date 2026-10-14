export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface TrustBarInfo {
  returnsAccepted: boolean;
  reviewCount: number;
  rating: number;
  guaranteeText: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

export interface Seller {
  username: string;
  avatar: string;
  verified: boolean;
  rating: number;
  feedbackCount: number;
  location: string;
  countryFlag: string;
  currentListings: number;
  itemsSold: number;
}

export type ProductSpecifications = Record<string, string>;

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  priceApproxLabel?: string;
  currency: string;

  breadcrumb: BreadcrumbItem[];
  trustBar: TrustBarInfo;

  images: ProductImage[];
  photosCount?: number;

  availableStock: number;
  guarantee: string;
  location: string;
  handlingTime: string;
  returns: string;
  condition: string;

  description: string;
  specifications: ProductSpecifications;

  seller: Seller;

  cartCount: number;
}
