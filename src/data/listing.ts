import type { Product } from "../types/product.types";

export const product: Product = {
  id: "hx-t0994ca",
  title:
    "Modern Hextra Intertek Desk Table Lamp Copper w/ Marble Base Model HX-T0994",
  category: "Lamps, Lighting",
  price: 67.15,
  oldPrice: 79,
  discountPercent: 15,
  priceApproxLabel: "₹6,333",
  currency: "USD",

  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Entertainment Memorabilia", href: "/entertainment-memorabilia" },
    {
      label: "Lamps, Lighting",
      href: "/entertainment-memorabilia/lamps-lighting",
    },
    {
      label: "Lamps",
      href: "/entertainment-memorabilia/lamps-lighting/lamps",
    },
  ],

  trustBar: {
    returnsAccepted: true,
    reviewCount: 2799,
    rating: 5.0,
    guaranteeText: "Safe and secure payments. 100% Satisfaction Guaranteed",
  },

  images: [
    { id: "img-1", src: "https://i.ebayimg.com/images/g/Z3IAAeSw2MZoeTlo/s-l1000.jpg", alt: "Lamp - front angle" },
    { id: "img-2", src: "https://i.ebayimg.com/images/g/-FEAAeSwW~5oeTlo/s-l1000.jpg", alt: "Lamp - side angle" },
    { id: "img-3", src: "https://i.ebayimg.com/images/g/lvMAAeSwSlZoeTly/s-l1000.jpg", alt: "Lamp - close up shade" },
    { id: "img-4", src: "https://i.ebayimg.com/images/g/yZwAAeSwmidoeTly/s-l1000.jpg", alt: "Lamp - base detail" },
    { id: "img-5", src: "https://i.ebayimg.com/images/g/95cAAeSweixoeTly/s-l1000.jpg", alt: "Lamp - lit on" },
    { id: "img-6", src: "https://i.ebayimg.com/images/g/3AoAAeSwKSdoeTl5/s-l1000.jpg", alt: "Lamp - alternative view 1" },
    { id: "img-7", src: "https://i.ebayimg.com/images/g/bT0AAeSwEj9oeTl4/s-l1000.jpg", alt: "Lamp - alternative view 2" },
    { id: "img-8", src: "https://i.ebayimg.com/images/g/x9oAAeSw6tRoeTl5/s-l1000.jpg", alt: "Lamp - alternative view 3" },
  ],

  availableStock: 1,
  guarantee: "PayPal Buyer Protection",
  location: "Rathdrum, United States",
  handlingTime: "2 business days",
  returns: "Accepted",
  condition: "Used",

  description:
    "Add a touch of elegance and modern sophistication to your workspace or living area with this Modern Hextra Intertek Desk Table Lamp. Featuring a premium copper shade and arm paired with a solid marble base, this lamp delivers focused illumination while enhancing any room decor. Perfect for desks, bedside tables, or accent lighting in any room, this lamp provides warm, directed light with a sleek and stylish finish.",

  specifications: {
    Brand: "Intertek",
    Type: "Desk Lamp",
    Material: "Chrome, Marble, Copper",
    Color: "Gold",
    Style: "Modern",
    Design: "Mid Century",
    Features: "Easy Installation",
    "Control Style": "Rotary Knob",
    "Power Source": "Corded Electric",
    "Energy Rating": "3 Stars",
    Department: "Unisex Adult",
    Size: "Medium",
    "Light Color": "Clear",
    "Cord Color": "Clear",
    Pattern: "Modern",
    MPN: "HX-T0994CA",
    "Original/Reproduction": "Original",
    "Time Period Manufactured": "2010-2019",
    Vintage: "No",
    Antique: "No",
  },

  variations: [
    {
      id: "color",
      label: "Color",
      required: true,
      options: [
        { value: "copper-gold", label: "Copper / Gold" },
        { value: "chrome-silver", label: "Chrome / Silver" },
        { value: "matte-black", label: "Matte Black" },
      ],
    },
    {
      id: "base",
      label: "Base Style",
      required: true,
      options: [
        { value: "marble", label: "Marble Base" },
        { value: "wood", label: "Wood Base" },
        { value: "metal", label: "Metal Base" },
      ],
    },
    {
      id: "size",
      label: "Size",
      required: true,
      type: "dropdown",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "xl", label: "Extra Large" },
      ],
    },
  ],

  seller: {
    username: "hseeker64",
    avatar: "/images/seller-avatar.jpg",
    verified: true,
    rating: 4.8,
    feedbackCount: 29,
    location: "Rathdrum, Idaho, United States",
    countryFlag: "🇺🇸",
    currentListings: 50848,
    itemsSold: 31,
  },

  cartCount: 0,
};
