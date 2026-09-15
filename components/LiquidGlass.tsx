
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
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = x / rect.width;
      const py = y / rect.height;

      // Distance from center (-1 → 1)
      const dx = (px - 0.5) * 2;
      const dy = (py - 0.5) * 2;

      // Very subtle 3D movement
      const rotateX = -dy * 2.5;
      const rotateY = dx * 2.5;

      element.style.setProperty("--mouse-x", `${x}px`);
      element.style.setProperty("--mouse-y", `${y}px`);

      element.style.setProperty("--mouse-x-percent", `${px * 100}%`);
      element.style.setProperty("--mouse-y-percent", `${py * 100}%`);

      element.style.setProperty("--rotate-x", `${rotateX}deg`);
      element.style.setProperty("--rotate-y", `${rotateY}deg`);

      // Edge illumination
      const edgeDistance = Math.min(
        px,
        1 - px,
        py,
        1 - py
      );

      const edgeIntensity = Math.max(
        0,
        Math.min(1, (0.35 - edgeDistance) * 3)
      );

      element.style.setProperty(
        "--edge-opacity",
        `${edgeIntensity}`
      );
    });
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
    element.style.setProperty("--edge-opacity", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative overflow-hidden rounded-3xl
        border border-white/[0.10]
        bg-white/[0.035]
        // backdrop-blur-2xl
        // backdrop-saturate-[160%]

        shadow-[0_20px_80px_rgba(0,0,0,0.22)]

        transition-[border-color,background,box-shadow,transform]
        duration-500
        ease-out

        hover:border-white/[0.20]
        hover:bg-white/[0.055]
        hover:shadow-[0_25px_100px_rgba(0,0,0,0.30)]

        motion-safe:[transform:perspective(1200px)_rotateX(var(--rotate-x))_rotateY(var(--rotate-y))]

        ${className}
      `}
    >
      {/* ========================================================= */}
      {/* BASE GLASS                                               */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-[inherit]
          bg-gradient-to-br
          from-white/[0.07]
          via-transparent
          to-white/[0.015]
          opacity-80
        "
      />

      {/* ========================================================= */}
      {/* CURSOR LIQUID LIGHT                                      */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-px
          rounded-[inherit]

          opacity-0
          transition-opacity
          duration-500

          group-hover:opacity-100

          [background:radial-gradient(
            260px_circle_at_var(--mouse-x)_var(--mouse-y),
            rgba(255,255,255,0.14),
            rgba(255,255,255,0.045)_35%,
            transparent_70%
          )]
        "
      />

      {/* ========================================================= */}
      {/* SECONDARY SOFT GLOW                                      */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-20

          opacity-0
          blur-3xl

          transition-opacity
          duration-700

          group-hover:opacity-100

          [background:radial-gradient(
            220px_circle_at_var(--mouse-x)_var(--mouse-y),
            rgba(255,255,255,0.07),
            transparent_70%
          )]
        "
      />

      {/* ========================================================= */}
      {/* VIOLET REFRACTION                                        */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-24
          -top-24
          h-48
          w-48
          rounded-full

          bg-violet-400/[0.08]
          blur-3xl

          transition-all
          duration-1000
          ease-out

          group-hover:translate-x-10
          group-hover:translate-y-8
          group-hover:scale-110
        "
      />

      {/* ========================================================= */}
      {/* CYAN REFRACTION                                          */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -right-24
          h-48
          w-48
          rounded-full

          bg-cyan-400/[0.07]
          blur-3xl

          transition-all
          duration-1000
          ease-out

          group-hover:-translate-x-10
          group-hover:-translate-y-8
          group-hover:scale-110
        "
      />

      {/* ========================================================= */}
      {/* SPECULAR HIGHLIGHT                                       */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]

          opacity-0
          transition-opacity
          duration-500

          group-hover:opacity-100

          [background:radial-gradient(
            500px_circle_at_var(--mouse-x)_var(--mouse-y),
            rgba(255,255,255,0.055),
            transparent_55%
          )]
        "
      />

      {/* ========================================================= */}
      {/* GLASS REFLECTION SWEEP                                   */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          -left-[120%]
          w-[80%]

          skew-x-[-18deg]

          bg-gradient-to-r
          from-transparent
          via-white/[0.075]
          to-transparent

          transition-transform
          duration-[1400ms]
          ease-out

          group-hover:translate-x-[300%]
        "
      />

      {/* ========================================================= */}
      {/* TOP GLASS EDGE                                           */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-white/[0.28]
          to-transparent

          opacity-70
        "
      />

      {/* ========================================================= */}
      {/* BOTTOM GLASS EDGE                                        */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
      />

      {/* ========================================================= */}
      {/* DYNAMIC EDGE LIGHT                                      */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]

          ring-1
          ring-inset
          ring-white/[0.035]

          transition-opacity
          duration-300
        "
        style={{
          opacity: "var(--edge-opacity, 0)",
        }}
      />

      {/* ========================================================= */}
      {/* INNER GLASS BORDER                                       */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-[inherit]

          border
          border-white/[0.035]
        "
      />

      {/* ========================================================= */}
      {/* MICRO SPARKLES                                           */}
      {/* ========================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[28%]
          top-5

          h-1
          w-1
          rounded-full

          bg-white/70
          blur-[1px]

          opacity-0

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[72%]
          top-[38%]

          h-[2px]
          w-[2px]
          rounded-full

          bg-white/50
          blur-[1px]

          opacity-0

          transition-opacity
          duration-700

          group-hover:opacity-100
        "
      />

      {/* ========================================================= */}
      {/* CONTENT                                                  */}
      {/* ========================================================= */}

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

