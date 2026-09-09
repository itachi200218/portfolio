"use client";

import { useEffect, useRef, useState } from "react";

const USER_IMAGES = [
  "/projects/jarvis/img.png",
  "/projects/jarvis/img1.png",
  "/projects/jarvis/img2.png",
  "/projects/jarvis/img3.png",
  "/projects/jarvis/img4.png",
  "/projects/jarvis/img5.png",
  "/projects/jarvis/img6.5.jpg",
  "/projects/jarvis/img6.jpg",
  "/projects/jarvis/img7.png",
  "/projects/jarvis/img8.png",
  "/projects/jarvis/img9.png",
  "/projects/jarvis/img10.png",
  "/projects/jarvis/img11.png",
  "/projects/jarvis/img12.png",
  "/projects/jarvis/img13.png",
];

const ADMIN_IMAGES = [
  "/projects/jarvis/img7.png",
  "/projects/jarvis/img8.png",
  "/projects/jarvis/img9.png",
  "/projects/jarvis/img10.png",
  "/projects/jarvis/img11.png",
  "/projects/jarvis/img12.png",
];

type GalleryType = "user" | "admin" | null;

export default function JarvisUIExplorer() {
  const [chooserOpen, setChooserOpen] = useState(false);
  const [gallery, setGallery] = useState<GalleryType>(null);
  const [current, setCurrent] = useState(0);

  // Floating button
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const draggingButton = useRef(false);
  const movedButton = useRef(false);
  const buttonStartPointer = useRef({ x: 0, y: 0 });
  const buttonStartPosition = useRef({ x: 0, y: 0 });

  // Tinder deck
  const [dragX, setDragX] = useState(0);
  const [draggingCard, setDraggingCard] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(false);
  const cardStartX = useRef(0);

  const images = gallery === "user" ? USER_IMAGES : ADMIN_IMAGES;

  useEffect(() => {
    const placeButton = () => {
      const size = window.innerWidth >= 640 ? 64 : 56;

      setPosition({
        x: window.innerWidth - size - 18,
        y: window.innerHeight - size - 90,
      });
    };

    placeButton();
    window.addEventListener("resize", placeButton);

    return () => window.removeEventListener("resize", placeButton);
  }, []);

  // ---------------- FLOATING BUTTON ----------------

  const handleButtonPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    draggingButton.current = true;
    movedButton.current = false;

    buttonStartPointer.current = {
      x: e.clientX,
      y: e.clientY,
    };

    buttonStartPosition.current = { ...position };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleButtonPointerMove = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (!draggingButton.current) return;

    const dx = e.clientX - buttonStartPointer.current.x;
    const dy = e.clientY - buttonStartPointer.current.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      movedButton.current = true;
    }

    const size = window.innerWidth >= 640 ? 64 : 56;

    setPosition({
      x: Math.min(
        Math.max(10, buttonStartPosition.current.x + dx),
        window.innerWidth - size - 10,
      ),
      y: Math.min(
        Math.max(10, buttonStartPosition.current.y + dy),
        window.innerHeight - size - 10,
      ),
    });
  };

  const handleButtonPointerUp = (
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    draggingButton.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    if (!movedButton.current) {
      setChooserOpen(true);
    }
  };

  // ---------------- OPEN / CLOSE ----------------

  const openGallery = (type: GalleryType) => {
    setGallery(type);
    setCurrent(0);
    setDragX(0);
    setDraggingCard(false);
    setAnimatingCard(false);
    setChooserOpen(false);
  };

  const closeAll = () => {
    setChooserOpen(false);
    setGallery(null);
    setDragX(0);
    setDraggingCard(false);
    setAnimatingCard(false);
  };

  // ---------------- NORMAL NAVIGATION ----------------

  const nextImage = () => {
    if (animatingCard || images.length < 2) return;

    setDragX(0);
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    if (animatingCard || images.length < 2) return;

    setDragX(0);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // ---------------- TINDER SWIPE ----------------

  const completeSwipe = (direction: "next" | "previous") => {
    if (animatingCard || !gallery || images.length < 2) return;

    setAnimatingCard(true);

    const exitX =
      direction === "next"
        ? -Math.max(window.innerWidth * 1.35, 900)
        : Math.max(window.innerWidth * 1.35, 900);

    setDragX(exitX);

    window.setTimeout(() => {
      setCurrent((prev) =>
        direction === "next"
          ? (prev + 1) % images.length
          : (prev - 1 + images.length) % images.length,
      );

      setDragX(0);
      setAnimatingCard(false);
    }, 300);
  };

  const handleCardPointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (animatingCard || !gallery) return;

    cardStartX.current = e.clientX;
    setDraggingCard(true);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleCardPointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingCard || animatingCard) return;

    setDragX(e.clientX - cardStartX.current);
  };

  const handleCardPointerUp = (
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!draggingCard) return;

    setDraggingCard(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const threshold = Math.min(
      150,
      Math.max(80, window.innerWidth * 0.18),
    );

    if (dragX <= -threshold) {
      completeSwipe("next");
      return;
    }

    if (dragX >= threshold) {
      completeSwipe("previous");
      return;
    }

    setDragX(0);
  };

  const handleCardPointerCancel = () => {
    setDraggingCard(false);
    setDragX(0);
  };

  // ---------------- KEYBOARD ----------------

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gallery) return;

      if (e.key === "Escape") {
        closeAll();
        return;
      }

      if (e.key === "ArrowRight") {
        completeSwipe("next");
      }

      if (e.key === "ArrowLeft") {
        completeSwipe("previous");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery, animatingCard]);

  if (gallery) {
    const next1 = (current + 1) % images.length;
    const next2 = (current + 2) % images.length;

    // The amount the back cards move toward the front as the user drags.
    const progress = Math.min(Math.abs(dragX) / 260, 1);

    return (
      <>
        {/* FULLSCREEN TINDER DECK */}
        <div className="fixed inset-0 z-[10001] bg-black/95 backdrop-blur-2xl">
          {/* HEADER */}
          <div className="absolute left-5 top-5 z-[100] sm:left-8 sm:top-8">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              J.A.R.V.I.S
            </p>
            <h2 className="mt-1 text-lg font-medium text-white">
              {gallery === "user" ? "User App" : "Admin App"}
            </h2>
          </div>

          <div className="absolute right-5 top-5 z-[100] flex items-center gap-3 sm:right-8 sm:top-8">
            <span className="text-sm text-zinc-500">
              {current + 1} / {images.length}
            </span>

            <button
              onClick={closeAll}
              aria-label="Close screenshot viewer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xl text-zinc-400 backdrop-blur-xl transition hover:bg-white/[0.1] hover:text-white"
            >
              ×
            </button>
          </div>

          {/* DECK */}
          <div className="absolute inset-0 flex items-center justify-center px-3 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
            <div className="relative h-[72vh] w-[92vw] max-w-6xl sm:h-[76vh]">
              {/* CARD 3 */}
              {images.length >= 3 && (
                <div
                  className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/20 bg-zinc-900 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
                  style={{
                    zIndex: 10,
                    transform: `translateY(${
                      52 - progress * 20
                    }px) scale(${0.86 + progress * 0.04})`,
                    opacity: 0.72 + progress * 0.12,
                    transition: draggingCard
                      ? "transform 120ms linear, opacity 120ms linear"
                      : "transform 300ms ease, opacity 300ms ease",
                  }}
                >
                  <img
                    src={images[next2]}
                    alt={`Screenshot ${next2 + 1}`}
                    className="h-full w-full object-contain p-3 sm:p-6"
                    draggable={false}
                  />
                </div>
              )}

              {/* CARD 2 */}
              {images.length >= 2 && (
                <div
                  className="absolute inset-0 overflow-hidden rounded-[28px] border border-white/20 bg-zinc-900 shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
                  style={{
                    zIndex: 20,
                    transform: `translateY(${
                      28 - progress * 18
                    }px) scale(${0.93 + progress * 0.035})`,
                    opacity: 0.9 + progress * 0.1,
                    transition: draggingCard
                      ? "transform 120ms linear, opacity 120ms linear"
                      : "transform 300ms ease, opacity 300ms ease",
                  }}
                >
                  <img
                    src={images[next1]}
                    alt={`Screenshot ${next1 + 1}`}
                    className="h-full w-full object-contain p-3 sm:p-6"
                    draggable={false}
                  />
                </div>
              )}

              {/* CARD 1 — ACTIVE */}
              <div
                className="absolute inset-0 z-30 overflow-hidden rounded-[28px] border border-white/25 bg-black shadow-[0_35px_120px_rgba(0,0,0,0.85)] touch-none select-none will-change-transform"
                onPointerDown={handleCardPointerDown}
                onPointerMove={handleCardPointerMove}
                onPointerUp={handleCardPointerUp}
                onPointerCancel={handleCardPointerCancel}
                style={{
                  transform: `translate3d(${dragX}px, 0, 0) rotate(${
                    dragX * 0.045
                  }deg)`,
                  transition: draggingCard
                    ? "none"
                    : "transform 300ms cubic-bezier(.22,.8,.2,1)",
                }}
              >
                {/* SWIPE LABEL */}
                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between p-6 sm:p-10">
                  <div
                    className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
                    style={{
                      opacity: Math.min(Math.max(dragX / 120, 0), 1),
                    }}
                  >
                    ← Previous
                  </div>

                  <div
                    className="rounded-full border border-white/20 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl"
                    style={{
                      opacity: Math.min(Math.max(-dragX / 120, 0), 1),
                    }}
                  >
                    Next →
                  </div>
                </div>

                <img
                  key={images[current]}
                  src={images[current]}
                  alt={`J.A.R.V.I.S ${
                    gallery === "user" ? "User" : "Admin"
                  } screenshot ${current + 1}`}
                  className="h-full w-full object-contain p-3 sm:p-6 pointer-events-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="absolute bottom-7 left-1/2 z-[100] hidden -translate-x-1/2 items-center gap-3 sm:flex">
            <button
              onClick={() => completeSwipe("previous")}
              aria-label="Previous screenshot"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-lg text-white backdrop-blur-xl transition hover:scale-110 hover:bg-white/[0.12]"
            >
              ←
            </button>

            <div className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs text-zinc-400 backdrop-blur-xl">
              Drag / Swipe
            </div>

            <button
              onClick={() => completeSwipe("next")}
              aria-label="Next screenshot"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-lg text-white backdrop-blur-xl transition hover:scale-110 hover:bg-white/[0.12]"
            >
              →
            </button>
          </div>

          {/* MOBILE HINT */}
          <p className="absolute bottom-5 left-1/2 z-[100] -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-zinc-600 sm:hidden">
            Swipe to explore
          </p>

          {/* DOTS */}
          <div className="absolute bottom-5 left-1/2 z-[100] hidden max-w-[70vw] -translate-x-1/2 gap-1.5 overflow-hidden rounded-full border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-xl sm:flex">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!animatingCard) {
                    setCurrent(index);
                    setDragX(0);
                  }
                }}
                className={`h-1.5 rounded-full transition-all ${
                  index === current
                    ? "w-6 bg-white"
                    : "w-1.5 bg-white/25"
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* FLOATING EXPLORER BUTTON */}
      {!chooserOpen && (
        <button
          aria-label="Explore J.A.R.V.I.S interface"
          onPointerDown={handleButtonPointerDown}
          onPointerMove={handleButtonPointerMove}
          onPointerUp={handleButtonPointerUp}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
          className="fixed z-[9999] flex h-14 w-14 touch-none select-none items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/[0.12] active:scale-95 sm:h-16 sm:w-16"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="8.5" cy="9" r="1.5" />
            <path d="m21 15-4.5-4.5L9 18l-3-3-3 3" />
          </svg>

          <span className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
        </button>
      )}

      {/* USER / ADMIN CHOOSER */}
      {chooserOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/65 p-5 backdrop-blur-xl"
          onClick={() => setChooserOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                  J.A.R.V.I.S
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Explore the UI
                </h2>
              </div>

              <button
                onClick={() => setChooserOpen(false)}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-zinc-400 transition hover:bg-white/[0.08] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => openGallery("user")}
                className="group rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl">
                  ◉
                </div>
                <h3 className="text-xl font-semibold text-white">
                  User App
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Explore the J.A.R.V.I.S user platform, workspace,
                  AI, chat and communication UI.
                </p>
                <div className="mt-6 text-sm text-zinc-400 transition group-hover:text-white">
                  View screenshots →
                </div>
              </button>

              <button
                onClick={() => openGallery("admin")}
                className="group rounded-3xl border border-white/10 bg-white/[0.025] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl">
                  ⚙
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Admin App
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Explore user management, command center, support,
                  security and administration UI.
                </p>
                <div className="mt-6 text-sm text-zinc-400 transition group-hover:text-white">
                  View screenshots →
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}