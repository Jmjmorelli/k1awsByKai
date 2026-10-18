"use client";

import { type ReactNode, useEffect, useRef } from "react";

type ParallaxTextProps = {
  children: ReactNode;
  className?: string;
};

export default function ParallaxText({ children, className }: ParallaxTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasArrivedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const updatePosition = () => {
      const element = elementRef.current;
      if (!element || hasArrivedRef.current) return;

      const { top, height } = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const elementCenter = top + height / 2;
      const progress = Math.max(-1, Math.min(1, (viewportCenter - elementCenter) / (window.innerHeight * 0.72)));
      const offset = progress * -112;
      element.style.transform = `translate3d(0, ${offset}px, 0)`;

      if (progress >= 0) {
        hasArrivedRef.current = true;
        element.style.transform = "translate3d(0, 0, 0)";
      }
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={elementRef} className={className}>{children}</div>;
}
