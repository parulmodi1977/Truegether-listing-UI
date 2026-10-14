import { useState } from "react";
import { product } from "@/data/listing";

/**
 * Returns the current cart count and a setter.
 * Backed by hardcoded listing data for now; swap the initial value
 * for an API/cart-context call once the backend is wired up.
 */
export function useCartCount() {
  const [cartCount, setCartCount] = useState<number>(product.cartCount);
  return { cartCount, setCartCount };
}
