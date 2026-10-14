import { useEffect, useState } from "react";

type ScrollDirection = "up" | "down" | null;

/**
 * Tracks scroll direction so components can hide on scroll-down
 * and reappear on scroll-up. Returns null on initial mount / at top.
 */
export function useScrollDirection(threshold: number = 8) {
  const [direction, setDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastY;

      if (Math.abs(diff) < threshold) {
        ticking = false;
        return;
      }

      if (currentY < 10) {
        setDirection(null);
      } else if (diff > 0) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
