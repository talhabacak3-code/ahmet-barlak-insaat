"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  strength?: number;
  "aria-label"?: string;
};

/** İmleci hafifçe takip eden dairesel CTA. Yalnızca hassas işaretçili cihazlarda aktif. */
export function MagneticButton({ href, children, className = "", strength = 0.35, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const ixTo = gsap.quickTo(inner.current, "x", { duration: 0.6, ease: "power3.out" });
      const iyTo = gsap.quickTo(inner.current, "y", { duration: 0.6, ease: "power3.out" });

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(dx * strength);
        yTo(dy * strength);
        ixTo(dx * strength * 0.4);
        iyTo(dy * strength * 0.4);
      };
      const leave = () => {
        gsap.to([el, inner.current], { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  });

  return (
    <a ref={ref} href={href} className={className} {...rest}>
      <span ref={inner} className="pointer-events-none flex flex-col items-center justify-center">
        {children}
      </span>
    </a>
  );
}
