"use client";

import React, { useRef } from "react";

export default function LiquidGlass({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.055] ${className}`}
    >
      {/* Cursor-following liquid light */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.10), transparent 70%)",
        }}
      />

      {/* Soft colored refraction */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-violet-400/[0.07] blur-3xl transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-6" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/[0.06] blur-3xl transition-transform duration-700 group-hover:-translate-x-8 group-hover:-translate-y-6" />

      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      {/* Small sparkle */}
      <div className="pointer-events-none absolute left-[30%] top-5 h-1 w-1 rounded-full bg-white/70 opacity-0 blur-[1px] transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}