"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import LiquidGlass from "@/components/LiquidGlass";
import TechnologyExplorer from "@/components/TechnologyExplorer";

function getExperience(startDate: string) {
  const start = new Date(startDate);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (today.getDate() < start.getDate()) {
    months--;

    if (months < 0) {
      years--;
      months += 12;
    }
  }

  if (years === 0) {
    return `${months} mo`;
  }

  if (months === 0) {
    return `${years} yr`;
  }

  return `${years} yr ${months} mo`;
}
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transition-[transform,opacity,filter]
        duration-[900ms]
        motion-reduce:transition-none
        motion-reduce:translate-y-0
        motion-reduce:opacity-100
        motion-reduce:blur-0
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          visible
            ? "translate-y-0 opacity-100 blur-0"
            : "translate-y-14 opacity-0 blur-[6px]"
        }
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [restoreTechnology, setRestoreTechnology] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeDownloading, setResumeDownloading] = useState(false);

  const handleResumeDownload = async () => {
    const pdfUrl = "/Adepu_chaitanya_Software_Engineering%20.pdf";
    const fileName = "Adepu_Chaitanya_Resume.pdf";

    try {
      setResumeDownloading(true);

      const response = await fetch(pdfUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Unable to download resume");

      const blob = await response.blob();
      const file = new File([blob], fileName, {
        type: "application/pdf",
      });

      // iPhone/iPad Safari: use the native share sheet when file sharing is supported,
      // so the user can choose "Save to Files" instead of opening the PDF in-browser.
      if (
        typeof navigator !== "undefined" &&
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: fileName,
        });
        return;
      }

      // Desktop/Android/other browsers: trigger a real file download.
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      // If the share sheet was cancelled, do nothing. Otherwise fall back to the PDF.
      if (error instanceof DOMException && error.name === "AbortError") return;
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    } finally {
      setResumeDownloading(false);
    }
  };

  // Prefetch the AllureIQ case-study route on Home page load.
  // This is a targeted Safari performance test.
useEffect(() => {
  router.prefetch("/projects/allureiq");
  router.prefetch("/projects/food-finder");
  router.prefetch("/projects/km-portal");
}, [router]);

useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

useEffect(() => {
  if (sessionStorage.getItem("portfolio-restore-scroll") !== "true") return;

  const savedScrollY = Number(
    sessionStorage.getItem("portfolio-return-scroll") ?? "0"
  );

  sessionStorage.removeItem("portfolio-restore-scroll");
  sessionStorage.removeItem("portfolio-return-scroll");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: savedScrollY,
        behavior: "auto",
      });
    });
  });
}, []);

const rememberHomeScroll = () => {
  sessionStorage.setItem(
    "portfolio-return-scroll",
    String(window.scrollY)
  );
};

const rememberTechnologySelection = (technologyName: string) => {
  sessionStorage.setItem("portfolio-return-technology", technologyName);
  rememberHomeScroll();
};

useEffect(() => {
  const technologyName = sessionStorage.getItem("portfolio-return-technology");
  if (!technologyName) return;

  setRestoreTechnology(technologyName);
  sessionStorage.removeItem("portfolio-return-technology");
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


  useEffect(() => {
    if (!resumeOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setResumeOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.removeProperty("overflow");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [resumeOpen]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <style>{`
        /* Target the 150% zoom laptop viewport (~580-800px CSS width)
           without changing the normal desktop or phone layouts. */
        @media (min-width: 580px) and (max-width: 800px) {
          .hero-section {
            min-height: 72vh;
            padding-top: 7.5rem;
            padding-left: 2rem;
            padding-right: 2rem;
          }

          .hero-title {
            font-size: clamp(2rem, 5vw, 2.75rem);
            line-height: 0.98;
          }

          .hero-section > div {
            max-width: 42rem;
          }

          .hero-section p {
            max-width: 38rem;
            font-size: 1rem;
            line-height: 1.7;
          }

          .hero-section .mt-10 {
            margin-top: 2rem;
          }
        }

        @keyframes resumeShine {
          0% { transform: translateX(0); opacity: 0; }
          8% { opacity: 1; }
          48% { opacity: 1; }
          55% { opacity: 0; }
          100% { transform: translateX(340%); opacity: 0; }
        }
      `}</style>
      {resumeOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Resume PDF"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setResumeOpen(false);
            }
          }}
        >
          <div className="relative flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-[#080a12]/95 shadow-2xl sm:rounded-3xl">
            <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.08] px-3 sm:h-14 sm:px-5">
              <div className="text-xs font-semibold tracking-tight text-zinc-200 sm:text-sm">
                Resume<span className="text-zinc-600">.</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/Adepu_chaitanya_Software_Engineering%20.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/[0.08] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white sm:px-3 sm:text-[10px] sm:tracking-[0.14em]"
                >
                  Open
                </a>

                <button
                  type="button"
                  onClick={handleResumeDownload}
                  disabled={resumeDownloading}
                  aria-label="Download resume PDF"
                  className="rounded-full border border-white/[0.08] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-zinc-400 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white disabled:cursor-wait disabled:opacity-50 sm:px-3 sm:text-[10px] sm:tracking-[0.14em]"
                >
                  {resumeDownloading ? "Preparing…" : "Download"}
                </button>

                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  aria-label="Close resume"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-zinc-500 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-white sm:overflow-hidden">
              <iframe
                src="/Adepu_chaitanya_Software_Engineering%20.pdf#view=FitH&zoom=page-width"
                title="Chaitanya Adepu Resume"
                className="h-[200%] w-[200%] origin-top-left scale-50 border-0 bg-white sm:h-full sm:w-full sm:scale-100"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
<nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl xl:max-w-7xl -translate-x-1/2">  <LiquidGlass className="rounded-full px-5 py-3 md:px-6">
    <div className="flex items-center justify-between">

      {/* LOGO + RESUME */}
      <div className="flex items-center gap-16">
        <div className="text-lg font-semibold tracking-tight">
          CHAITANYA<span className="text-zinc-500">.</span>
        </div>

        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          aria-label="Open resume PDF"
          className="group relative overflow-hidden text-lg font-semibold tracking-tight text-zinc-300 transition-colors duration-300 hover:text-white"
        >
          <span className="relative z-10">
            Resume<span className="text-zinc-600">.</span>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-[-45%] h-px w-[45%] bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.75)] animate-[resumeShine_2.2s_linear_infinite]"
          />
        </button>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden items-center gap-8 text-sm text-zinc-400 min-[1200px]:flex">
        <TechnologyExplorer
          onProjectNavigate={rememberTechnologySelection}
          restoreTechnology={restoreTechnology}
        />

        <a
          href="#work"
          className="transition-all duration-300 hover:text-white"
        >
          Work
        </a>

        <a
          href="#experience"
          className="transition-all duration-300 hover:text-white"
        >
          Experience
        </a>

        <a
          href="#certifications"
          className="transition-all duration-300 hover:text-white"
        >
          Certifications
        </a>

        <a
          href="#about"
          className="transition-all duration-300 hover:text-white"
        >
          About
        </a>
      </div>

      {/* DESKTOP CONTACT */}
      <a
        href="tel:+919010666462"
        className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.1] hover:text-white min-[1200px]:block"
      >
        Contact
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white min-[1200px]:hidden"
      >
        <span
          className={`absolute h-px w-5 bg-current transition-all duration-300 ${
            mobileMenuOpen
              ? "rotate-45"
              : "-translate-y-1.5"
          }`}
        />

        <span
          className={`absolute h-px w-5 bg-current transition-all duration-300 ${
            mobileMenuOpen
              ? "opacity-0"
              : "translate-y-0"
          }`}
        />

        <span
          className={`absolute h-px w-5 bg-current transition-all duration-300 ${
            mobileMenuOpen
              ? "-rotate-45"
              : "translate-y-1.5"
          }`}
        />
      </button>
    </div>
  </LiquidGlass>

{/* MOBILE GLASS MENU */}
<div
  className={`absolute left-0 right-0 top-[calc(100%+12px)] z-50 min-[1200px]:hidden ${
    mobileMenuOpen
      ? "pointer-events-auto visible"
      : "pointer-events-none invisible"
  }`}
>
  <div
    className={`
      relative
      overflow-hidden
      rounded-[28px]
      border border-white/[0.14]
      bg-white/[0.07]
      p-2
      shadow-[0_30px_100px_rgba(0,0,0,0.55)]
      backdrop-blur-[30px]
      backdrop-saturate-[180%]
      transition-opacity duration-200
      ${mobileMenuOpen ? "opacity-100" : "opacity-0"}
    `}
  >
    {/* GLASS REFLECTION */}
    <div
      className="
        pointer-events-none
        absolute inset-0
        bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.14),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.06),transparent_40%)]
      "
    />

    {/* GLASS EDGE */}
    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/[0.06]" />

    {/* MENU CONTENT */}
    <div
      className={`
        relative
        transition-opacity duration-200
        ${mobileMenuOpen ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="px-5 py-4 text-[16px] text-zinc-300">
        <TechnologyExplorer
          onProjectNavigate={rememberTechnologySelection}
          restoreTechnology={restoreTechnology}
        />
      </div>

      <a
        href="#work"
        onClick={() => setMobileMenuOpen(false)}
        className="group flex items-center justify-between rounded-[20px] px-5 py-4 text-[16px] text-zinc-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
      >
        <span>Work</span>
        <span className="text-zinc-500 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>

      <a
        href="#experience"
        onClick={() => setMobileMenuOpen(false)}
        className="group flex items-center justify-between rounded-[20px] px-5 py-4 text-[16px] text-zinc-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
      >
        <span>Experience</span>
        <span className="text-zinc-500 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>

      <a
        href="#certifications"
        onClick={() => setMobileMenuOpen(false)}
        className="group flex items-center justify-between rounded-[20px] px-5 py-4 text-[16px] text-zinc-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
      >
        <span>Certifications</span>
        <span className="text-zinc-500 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>

      <a
        href="#about"
        onClick={() => setMobileMenuOpen(false)}
        className="group flex items-center justify-between rounded-[20px] px-5 py-4 text-[16px] text-zinc-300 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white active:scale-[0.98]"
      >
        <span>About</span>
        <span className="text-zinc-500 transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </a>

      <div className="mx-4 my-2 h-px bg-white/[0.10]" />

      <a
        href="tel:+919010666462"
        onClick={() => setMobileMenuOpen(false)}
        className="mb-1 flex items-center justify-center rounded-[20px] border border-white/[0.12] bg-white/[0.06] px-5 py-4 text-sm font-medium text-zinc-300 backdrop-blur-xl transition-colors duration-200 hover:bg-white/[0.10] hover:text-white active:scale-[0.98]"
      >
        Contact
      </a>
    </div>
  </div>
</div>
</nav>

      {/* Hero */}
<section className="hero-section mx-auto flex min-h-[78vh] w-full max-w-7xl items-center px-5 pt-32 sm:px-6 md:pt-0 xl:pt-24">  <div className="w-full max-w-5xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white" />
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              Software Engineer
            </p>
          </div>

<h1 className="hero-title text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.98] tracking-tight">            Building software,
            <br />
            <span className="text-zinc-500">
              platforms & intelligent systems.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
            Software engineer focused on backend systems, full-stack
            applications, AI platforms, cloud infrastructure, and reusable
            engineering frameworks.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#work"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Explore Engineering
            </a>

            <a
              href="#contact"
              className="rounded-full border border-zinc-800 px-6 py-3 text-sm font-medium text-white transition hover:border-zinc-600"
            >
              Get in touch
            </a>
          </div>

        </div>
      </section>

      {/* Engineering Stats */}
      <section className="border-y border-zinc-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-zinc-900 md:grid-cols-4">
<Stat
  value={getExperience("2025-05-01")}
  label="Years Experience"
/>          <Stat value="3" label="Personal Platforms" />
          <Stat value="6+" label="Engineering Projects" />
          <Stat value="90%" label="OCI Architect Score" />
        </div>
      </section>

      {/* Featured Work */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-32">
        <ScrollReveal>
          <SectionHeading number="01" title="Featured Engineering" />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="mt-6 max-w-2xl text-zinc-500">
            Selected systems and platforms spanning AI, backend engineering,
            real-time applications, enterprise automation, and distributed
            systems.
          </p>
        </ScrollReveal>

       {/* Personal */}

<div className="mt-16">
  <div className="mb-6 flex items-center gap-3">
    <span className="text-xs uppercase tracking-[0.25em] text-zinc-600">
      Personal Engineering
    </span>

    <div className="h-px flex-1 bg-zinc-900" />
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <ScrollReveal>
      <Link
        onClick={rememberHomeScroll}
        href="/projects/jarvis"
        className="group block h-full"
      >
        <Project
          number="01"
          title="J.A.R.V.I.S"
          eyebrow="Flagship AI Platform"
          description="Full-stack AI platform combining natural-language commands, persistent memory, real-time collaboration, workspaces, chat, audio/video communication, and centralized administration."
          tags={[
            "AI",
            "Spring Boot",
            "Java",
            "MongoDB",
            "WebSockets",
            "WebRTC",
          ]}
          large
          featured
        />
      </Link>
    </ScrollReveal>

    <ScrollReveal delay={120}>
      <Link
        onClick={rememberHomeScroll}
        href="/projects/allureiq"
        className="group block h-full"
      >
        <Project
          number="02"
          title="AllureIQ"
          eyebrow="AI Test Intelligence"
          description="AI-powered unified test intelligence platform combining automated API testing, intelligent failure analysis, root-cause insights, recommendations, persistent reports, and reusable framework capabilities."
          tags={[
            "Java",
            "Spring Boot",
            "REST Assured",
            "TestNG",
            "MongoDB",
            "AI",
          ]}
          large
        />
      </Link>
    </ScrollReveal>

    <ScrollReveal delay={240}>
      <Link
        onClick={rememberHomeScroll}
        href="/projects/food-finder"
        className="group block h-full"
      >
        <Project
          number="03"
          title="Food Finder"
          eyebrow="AI + Backend Platform"
          description="AI-enhanced recipe discovery platform using fuzzy search, Redis caching, MySQL persistence, secure authentication, and intelligent AI fallback for fast recipe discovery."
          tags={[
            "Python",
            "Flask",
            "Spring Boot",
            "Redis",
            "MySQL",
            "Gemini",
          ]}
        />
      </Link>
    </ScrollReveal>

  </div>
</div>
        {/* Professional */}
        <div className="mt-24">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              Professional Engineering
            </span>
            <div className="h-px flex-1 bg-zinc-900" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ScrollReveal>
              <Link
                onClick={rememberHomeScroll}
        href="/projects/sfcc-promotion"
                className="group block h-full"
              >
                <Project
                  number="04"
                  title="SFCC Promotion Validation Platform"
                  eyebrow="Enterprise Engineering"
                  description="Reusable enterprise validation framework and platform for complex promotion scenarios, business-rule execution, automated validation, and reporting across commerce workflows."
                  tags={[
                    "Java",
                    "Spring Boot",
                    "SFCC",
                    "Cucumber",
                    "REST Assured",
                  ]}
                  large
                  featured
                />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <Link
                onClick={rememberHomeScroll}
        href="/projects/loggerai"
                className="group block h-full"
              >
                <Project
                  number="05"
                  title="LoggerAI"
                  eyebrow="AI-Powered Framework Diagnostics"
                  description="Java and Spring Boot diagnostic platform that parses framework logs and report data, uses AI to identify likely root causes, explain failures, and generate actionable solutions."
                  tags={[
                    "Java",
                    "Spring Boot",
                    "AI",
                    "Log Parsing",
                    "Root Cause",
                    "Diagnostics",
                  ]}
                />
              </Link>
            </ScrollReveal>

            <ScrollReveal delay={240}>
              <Link
                onClick={rememberHomeScroll}
        href="/projects/km-portal"
                className="group block h-full"
              >
                <Project
                  number="06"
                  title="KM Portal"
                  eyebrow="Knowledge & Learning Platform"
                  description="Internal knowledge and learning platform supporting structured learning workflows, measurable scoring, user activity tracking, and duplicate-prevention mechanisms."
                  tags={[
                    "Java",
                    "Spring Boot",
                    "Knowledge Management",
                    "Learning",
                    "Scoring",
                    "User Tracking",
                  ]}
                />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* JARVIS Highlight */}
      <section className="border-y border-zinc-900 bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <ScrollReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                  Flagship Project
                </p>

                <h2 className="mt-5 text-5xl font-semibold tracking-tight md:text-6xl">
                  J.A.R.V.I.S
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                  An AI-powered personal and collaborative platform designed
                  around intelligent commands, persistent context, real-time
                  communication, workspace collaboration, and centralized
                  platform governance.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <TechBadge>AI</TechBadge>
                  <TechBadge>React</TechBadge>
                  <TechBadge>FastAPI</TechBadge>
                  <TechBadge>MongoDB</TechBadge>
                  <TechBadge>WebSockets</TechBadge>
                  <TechBadge>WebRTC</TechBadge>
                  <TechBadge>Docker</TechBadge>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-3 sm:grid-cols-2">
              <ScrollReveal><FeatureCard title="AI Engine" text="Natural-language commands and coding assistance." /></ScrollReveal>
              <ScrollReveal delay={80}><FeatureCard title="Persistent Memory" text="Context-aware interactions and stored user information." /></ScrollReveal>
              <ScrollReveal delay={160}><FeatureCard title="Real-Time" text="WebSocket-based collaboration and communication." /></ScrollReveal>
              <ScrollReveal delay={240}><FeatureCard title="Communication" text="Group audio and video communication through WebRTC." /></ScrollReveal>
              <ScrollReveal delay={320}><FeatureCard title="Workspaces" text="Collaborative spaces with members and real-time activity." /></ScrollReveal>
              <ScrollReveal delay={400}><FeatureCard title="Governance" text="Admin and Super Admin control over users and commands." /></ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
<section id="experience" className="border-y border-zinc-900 bg-[#0c0c0c]">
  <div className="mx-auto max-w-7xl px-6 py-32">

    <SectionHeading number="02" title="Experience" />

    <div className="mt-10 max-w-5xl">

     

      {/* Current Role */}
      <div className="mt-16 border-l border-zinc-800 pl-8 md:pl-10">

        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-600">
              Cognizant
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              Software Engineer
            </h3>

            <p className="mt-2 text-zinc-500">
              Client — Boots UK · E-commerce Platform
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-zinc-600">
              May 2025 — Present
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {getExperience("2025-05-01")} experience
            </p>
          </div>
        </div>
  {/* Full Professional Experience */}
      <Link
        onClick={rememberHomeScroll}
        href="/projects/experience"
        className="group relative block w-full overflow-hidden rounded-3xl border border-white/[0.14] bg-white/[0.045] px-6 py-6 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.28] hover:bg-white/[0.075] hover:shadow-[0_16px_60px_rgba(255,255,255,0.08)]"
      >
        {/* Liquid glass glow */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.08] blur-3xl transition-all duration-700 group-hover:bg-cyan-400/[0.16]" />

        <div className="pointer-events-none absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-blue-500/[0.07] blur-3xl transition-all duration-700 group-hover:bg-blue-500/[0.14]" />

        {/* Glass highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

              <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                Professional Experience
              </p>
            </div>

            <p className="mt-3 text-lg font-medium tracking-tight text-zinc-200 transition-colors duration-300 group-hover:text-white">
              Explore my engineering work at Cognizant
            </p>
          </div>

          <div className="ml-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] text-lg text-zinc-400 shadow-inner shadow-white/[0.04] transition-all duration-500 group-hover:translate-x-1 group-hover:border-cyan-300/30 group-hover:bg-cyan-300/[0.08] group-hover:text-white">
            →
          </div>
        </div>
      </Link>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
 
          <ExperienceCard
            title="Promotion Validation"
            text="Built reusable validation capabilities for complex SFCC promotion scenarios with automated execution and expected-vs-actual validation."
          />

          <ExperienceCard
            title="Framework Engineering"
            text="Worked across Java, Spring Boot, Cucumber, REST Assured, Selenium, TestNG, SQL, Allure, and CI/CD."
          />

          <ExperienceCard
            title="Platform Development"
            text="Contributed to configurable platform capabilities, backend services, PWA/frontend work, APIs, and enterprise commerce workflows."
          />

          <ExperienceCard
            title="Measurable Impact"
            text="Promotion validation workflow reduced from roughly 1–1.5 hours to approximately 5–10 minutes."
          />

        </div>
      </div>

    </div>
  </div>
</section>

{/* Engineering Approach */}
<section className="mx-auto max-w-7xl px-6 pt-40 pb-32">

  <ScrollReveal>
    <SectionHeading number="03" title="Engineering Approach" />
  </ScrollReveal>

  <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900 md:grid-cols-2">

    <ScrollReveal>
      <EngineeringBlock
        number="01"
        title="Backend Systems"
        description="Designing APIs, services, business logic, persistence layers, caching strategies, and reusable backend components."
        technologies="Java · Spring Boot · Python · FastAPI · Flask"
      />
    </ScrollReveal>

    <ScrollReveal delay={100}>
      <EngineeringBlock
        number="02"
        title="Platform Engineering"
        description="Building reusable frameworks and platforms that abstract complex workflows into configurable and maintainable systems."
        technologies="Automation · Frameworks · Business Rules · CI/CD"
      />
    </ScrollReveal>

    <ScrollReveal delay={200}>
      <EngineeringBlock
        number="03"
        title="AI Integration"
        description="Using AI where it provides practical engineering value, including intelligent commands, diagnostics, summaries, search fallback, and developer tooling."
        technologies="LLM · Gemini · AI Diagnostics · AI Test Intelligence"
      />
    </ScrollReveal>

    <ScrollReveal delay={300}>
      <EngineeringBlock
        number="04"
        title="Real-Time Systems"
        description="Building applications around live communication, synchronization, presence, notifications, and collaborative workflows — connecting users and services through responsive, real-time interactions."
        technologies="WebSockets · WebRTC · Real-Time Messaging"
      />
    </ScrollReveal>

  </div>

</section>

{/* Certifications */}
<section id="certifications" className="mx-auto max-w-7xl px-6 py-32">

  <ScrollReveal>
    <SectionHeading number="04" title="Certifications" />
  </ScrollReveal>

<div className="mt-16 grid gap-6 md:grid-cols-2">
    <ScrollReveal>
      <CertificationCard
        issuer="Oracle"
        title="Oracle Cloud Infrastructure"
        subtitle="Certified Architect Associate"
        score="90%"
        date="September 2026"
        featured
        image="/certifications/oracle.jpg"
      />
    </ScrollReveal>

    <ScrollReveal delay={120}>
      <CertificationCard
        issuer="Professional Development"
        title="Software Development & Cloud"
        subtitle="Microsoft Certification"
        score=""
        date=""
        image="/certifications/SE1.jpg"
      />
    </ScrollReveal>

    <ScrollReveal delay={240}>
      <CertificationCard
        issuer="Docker"
        title="Docker Certification"
        subtitle="Containerization & Development"
        score=""
        date=""
        image="/certifications/docker.jpg"
      />
    </ScrollReveal>

    <ScrollReveal delay={360}>
      <CertificationCard
        issuer="HackerRank"
        title="Java · Python · MySQL · REST API"
        subtitle="Technical Certifications"
        score=""
        date=""
        images={[
          "/certifications/java.jpg",
          "/certifications/PY.jpg",
          "/certifications/SQL.jpg",
          "/certifications/RESTAPI.jpg",
          "/certifications/SE.jpg",
          "/certifications/DSA.jpg",
        ]}
      />
    </ScrollReveal>

  </div>
</section>
{/* Recognition */}
<section id="recognition" className="border-y border-zinc-900 bg-[#0c0c0c]">
  <div className="mx-auto max-w-7xl px-6 py-32">

    <ScrollReveal>
      <SectionHeading number="05" title="Recognition" />
    </ScrollReveal>

<div className="mt-16 grid gap-6 md:grid-cols-2">
  <ScrollReveal delay={450}>
        <RecognitionFlipCard
          title="Change Champion"
          organization="Cognizant"
          description="Recognition for developing the SFCC Promotion Loyalty Points Validation Tool and driving a significant reduction in validation time from 1–1.5 hours to approximately 5 minutes."
          image="/certifications/1122.png"
        />
      </ScrollReveal>

      <ScrollReveal>
        <RecognitionFlipCard
          title="The Energy and Optimism"
          organization="Cognizant"
          description="Recognition for the SFCC Promotion Validation Tool and its impact on reducing validation effort."
          image="/certifications/111c.png"
        />
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <RecognitionFlipCard
          title="Trendsetter Award"
          organization="Cognizant"
          description="Recognition for valuable contribution and outstanding performance."
          image="/certifications/Trendsetter.jpg"
        />
      </ScrollReveal>

      <ScrollReveal delay={300}>
        <RecognitionFlipCard
          title="Leadership Appreciation"
          organization="Cognizant"
          description="Recognized by leadership for proactively learning and implementing new technologies, voluntarily taking ownership of a task, and successfully delivering it."
          image="/certifications/2002.png"
        />
      </ScrollReveal>


    </div>
  </div>
</section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-32">
        <ScrollReveal>
          <SectionHeading number="06" title="About" />
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal>
            <p className="max-w-3xl text-xl leading-9 text-zinc-400">
              I enjoy building software that combines strong engineering
              foundations with practical AI, automation, cloud infrastructure,
              and scalable application design. My work spans personal products,
              backend systems, reusable frameworks, enterprise platforms, and
              real-time applications.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm">
              <SkillGroup title="Languages" items="Java · Python · SQL · JavaScript" />
              <SkillGroup title="Backend" items="Spring Boot · FastAPI · Flask · Node.js" />
              <SkillGroup title="Frontend" items="React · Next.js · PWA · Responsive UI" />
              <SkillGroup title="Data" items="MongoDB · MySQL · Redis" />
              <SkillGroup title="Cloud" items="Azure · Docker · CI/CD" />
              <SkillGroup title="Engineering" items="REST · WebSockets · WebRTC · Automation" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              Let's connect
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              Building something interesting?
              <br />
              <span className="text-zinc-500">Let's talk.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="mailto:chetanyaadepu@gmail.com"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Email me
              </a>

              <a
                href="https://github.com/itachi200218"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-800 px-6 py-3 text-sm font-medium text-white transition hover:border-zinc-600"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/adepu-chaitanya-b63b36237"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-800 px-6 py-3 text-sm font-medium text-white transition hover:border-zinc-600"
              >
                LinkedIn
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-zinc-600 md:flex-row md:items-center md:justify-between">
          <span>© 2026 Chaitanya Adepu</span>
          <span>Built with Next.js</span>
        </div>
      </footer>
      {showScrollTop && (
  <button
    onClick={scrollToTop}
    aria-label="Scroll to top"
    className="
      fixed bottom-6 right-6 z-50
      flex h-11 w-11 items-center justify-center
      rounded-full
      border border-white/[0.14]
      bg-white/[0.07]
      text-zinc-300
      shadow-[0_12px_40px_rgba(0,0,0,0.45)]
      backdrop-blur-[24px]
      backdrop-saturate-[180%]
      transition-all duration-300
      hover:scale-110
      hover:bg-white/[0.12]
      hover:text-white
      active:scale-95
    "
  >
    <span className="text-lg leading-none">↑</span>
  </button>
)}
    </main>
  );
}

/* ----------------------------- */
/* Components                    */
/* ----------------------------- */

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="px-6 py-8 transition hover:bg-[#0d0d0d]">
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </div>
  );
}

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-end gap-4">
      <span className="text-sm text-zinc-600">{number}</span>

      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

function Project({
  number,
  title,
  eyebrow,
  description,
  tags,
  large = false,
  featured = false,
}: {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  large?: boolean;
  featured?: boolean;
}) {
  return (
    <LiquidGlass
      className={`p-8 ${
        large ? "min-h-[390px]" : "min-h-[330px]"
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              {eyebrow}
            </p>

            <span className="text-sm text-zinc-700">{number}</span>
          </div>

          <h3
            className={`mt-6 font-semibold tracking-tight ${
              featured ? "text-4xl" : "text-3xl"
            }`}
          >
            {title}
          </h3>

          <p className="mt-5 max-w-xl leading-7 text-zinc-400">
            {description}
          </p>
        </div>

        <div className="mt-10">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-xs text-zinc-400 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.05]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-zinc-600 transition group-hover:text-white">
            <span>View project</span>

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </LiquidGlass>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-zinc-800 px-4 py-2 text-xs text-zinc-400">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-[#0d0d0d] p-6">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function EngineeringBlock({
  number,
  title,
  description,
  technologies,
}: {
  number: string;
  title: string;
  description: string;
  technologies: string;
}) {
  return (
    <div className="bg-[#0d0d0d] p-8 md:p-10">
      <span className="text-xs text-zinc-600">{number}</span>

      <h3 className="mt-5 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-zinc-500">{description}</p>

      <p className="mt-6 text-xs leading-6 text-zinc-600">
        {technologies}
      </p>
    </div>
  );
}

function ExperienceCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-[#0d0d0d] p-6">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-zinc-500">{text}</p>
    </div>
  );
}

function CertificationCard({
  issuer,
  title,
  subtitle,
  score,
  date,
  featured = false,
  image,
  images,
}: {
  issuer: string;
  title: string;
  subtitle: string;
  score: string;
  date: string;
  featured?: boolean;
  image?: string;
  images?: string[];
}) {
  const [showCertificate, setShowCertificate] = useState(false);
const [selectedImage, setSelectedImage] = useState<string | null>(null);
const [flipped, setFlipped] = useState(false);
const [miniResetKey, setMiniResetKey] = useState(0);
  const certificateImages =
    images?.length
      ? images
      : image
        ? [image]
        : [];

  const isMultiple = certificateImages.length > 1;

  const openCertificate = (certificate: string) => {
    setSelectedImage(certificate);
    setShowCertificate(true);
  };

const closeCertificate = () => {
  setShowCertificate(false);
  setSelectedImage(null);
  setFlipped(false);
  setMiniResetKey((key) => key + 1);
};

  return (
    <>
      {/* MAIN CERTIFICATION CARD */}
      <div className="group">
        {/* SINGLE CERTIFICATE */}
        {!isMultiple && certificateImages[0] && (
       <div
  className="group/card h-[300px] cursor-pointer [perspective:1200px]"
 onClick={() => {
  setFlipped(true);

  setTimeout(() => {
    openCertificate(certificateImages[0]);
  }, 250);
}}
>
<div
  className={`
    relative h-full w-full
    transition-transform duration-700
    [transform-style:preserve-3d]
    ${flipped ? "[transform:rotateY(180deg)]" : ""}
lg:group-hover/card:[transform:rotateY(180deg)]
  `}
>
              {/* FRONT */}
              <div className="absolute inset-0 [backface-visibility:hidden]">
                <LiquidGlass
                  className={`h-full p-8 ${
                    featured ? "border-white/20" : ""
                  }`}
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                        {issuer}
                      </p>

                      <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                        {title}
                      </h3>

                      <p className="mt-2 text-zinc-500">
                        {subtitle}
                      </p>
                    </div>

                    {(score || date) && (
                      <div>
                        <div className="flex gap-10 border-t border-white/10 pt-6">
                          {score && (
                            <div>
                              <p className="text-xs text-zinc-600">
                                Score
                              </p>

                              <p className="mt-1 text-xl font-medium">
                                {score}
                              </p>
                            </div>
                          )}

                          {date && (
                            <div>
                              <p className="text-xs text-zinc-600">
                                Issued
                              </p>

                              <p className="mt-1 text-xl font-medium">
                                {date}
                              </p>
                            </div>
                          )}
                        </div>

                        <p className="mt-5 text-xs text-zinc-600">
                          Hover to view certificate →
                        </p>
                      </div>
                    )}

                    {!score && !date && (
                      <p className="text-xs text-zinc-600">
                        Hover to view certificate →
                      </p>
                    )}
                  </div>
                </LiquidGlass>
              </div>

              {/* BACK */}
              <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                <LiquidGlass className="h-full p-4">
                  <div className="flex h-full flex-col">
                    <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <img
                        src={certificateImages[0]}
                        alt={`${title} certificate`}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <p className="pt-3 text-center text-xs text-zinc-400">
                      Click to enlarge
                    </p>
                  </div>
                </LiquidGlass>
              </div>
            </div>
          </div>
        )}

        {/* MULTIPLE CERTIFICATES */}
        {isMultiple && (
          <LiquidGlass className="min-h-[300px] p-8">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                  {issuer}
                </p>

                <h3 className="mt-5 text-2xl font-semibold tracking-tight">
                  {title}
                </h3>

                <p className="mt-2 text-zinc-500">
                  {subtitle}
                </p>
              </div>

              <div className="mt-8 grid flex-1 grid-cols-2 gap-3">
                {certificateImages.map((certificate, index) => {
                  const names = [
                    "Java",
                    "Python",
                    "MySQL",
                    "REST API",
                    "AZURE AI",
                    "Data Structures & Algorithms"
                  ];

                  return (
                    <CertificateMiniCard
  key={certificate}
  name={names[index] ?? `Certificate ${index + 1}`}
  image={certificate}
  onOpen={() => openCertificate(certificate)}
  resetKey={miniResetKey}
/>
                  );
                })}
              </div>
            </div>
          </LiquidGlass>
        )}
      </div>

      {/* Enlarged certificate — rendered outside ScrollReveal stacking context */}
      {showCertificate &&
        selectedImage &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto md:items-start bg-black/80 p-3 backdrop-blur-md animate-[fadeIn_300ms_ease-out] sm:p-4 md:px-4 md:pb-4 md:pt-6"
            onClick={closeCertificate}
          >
            <div
              className="relative flex max-h-[calc(100dvh-1.5rem)] max-w-[calc(100vw-1.5rem)] items-center justify-center animate-[certificatePop_500ms_cubic-bezier(0.16,1,0.3,1)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[calc(100vw-2rem)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeCertificate}
                aria-label="Close certificate viewer"
                className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
              >
                ×
              </button>

              <img
                src={selectedImage}
                alt={`${title} certificate`}
                className="block max-h-[calc(100dvh-1.75rem)] max-w-[calc(100vw-1.5rem)] w-auto h-auto rounded-xl object-contain shadow-[0_25px_100px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[calc(100vw-2rem)]"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
function CertificateMiniCard({
  name,
  image,
  onOpen,
  resetKey,
}: {
  name: string;
  image: string;
  onOpen: () => void;
  resetKey: number;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [resetKey]);
  return (
    <div
      className="group/mini h-full min-h-[95px] cursor-pointer [perspective:800px]"
      onClick={() => {
        setFlipped(true);

        setTimeout(() => {
          onOpen();
        }, 250);
      }}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/mini:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >

        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 group-hover/mini:border-white/20 group-hover/mini:bg-white/[0.05]">
            <span className="text-sm font-medium text-zinc-300">
              {name}
            </span>

            <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
              Certificate
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-2">
            <div className="flex-1 overflow-hidden rounded-xl">
              <img
                src={image}
                alt={`${name} certificate`}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="py-1 text-center">
              <span className="text-[10px] text-zinc-400">
                Click to enlarge
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
function RecognitionFlipCard({
  title,
  organization,
  description,
  image,
}: {
  title: string;
  organization: string;
  description: string;
  image: string;
}) {
  const [flipped, setFlipped] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);

  const openRecognition = () => {
    setShowRecognition(true);
  };

  const closeRecognition = () => {
    setShowRecognition(false);
    setFlipped(false);
  };

  useEffect(() => {
    if (!showRecognition) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeRecognition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showRecognition]);

  return (
    <>
      <div className="group/recognition h-[300px] [perspective:1200px]">
        <div
          className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] lg:group-hover/recognition:[transform:rotateY(180deg)] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT */}
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <div
              className="h-full cursor-pointer"
              onClick={() => {
                setFlipped(true);

                setTimeout(() => {
                  openRecognition();
                }, 250);
              }}
              role="presentation"
            >
              <LiquidGlass className="h-full p-8">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                    {organization}
                  </p>

                  <h3 className="mt-5 text-3xl font-semibold tracking-tight">
                    {title}
                  </h3>

                  <p className="mt-4 max-w-xl leading-7 text-zinc-500">
                    {description}
                  </p>
                </div>

                <p className="text-xs text-zinc-600">
                  Hover to view recognition →
                </p>
              </div>
              </LiquidGlass>
            </div>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <LiquidGlass className="h-full p-4">
              <div className="flex h-full flex-col">
                <button
                  type="button"
                  className="relative flex-1 cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-black/20 text-left"
                  onClick={(event) => {
                    event.stopPropagation();
                    openRecognition();
                  }}
                  aria-label={`Enlarge ${title} recognition`}
                >
                  <img
                    src={image}
                    alt={`${title} recognition certificate`}
                    className="h-full w-full object-contain"
                  />
                </button>

                <p className="pt-3 text-center text-xs text-zinc-400">
                  Click to enlarge
                </p>
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>

      {/* Enlarged recognition image — rendered outside ScrollReveal stacking context */}
      {showRecognition &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto md:items-start bg-black/80 p-3 backdrop-blur-md animate-[fadeIn_300ms_ease-out] sm:p-4 md:px-4 md:pb-4 md:pt-6"
            onClick={closeRecognition}
          >
            <div
              className="relative flex max-h-[calc(100dvh-1.5rem)] max-w-[calc(100vw-1.5rem)] items-center justify-center animate-[certificatePop_500ms_cubic-bezier(0.16,1,0.3,1)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[calc(100vw-2rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeRecognition}
                aria-label="Close recognition viewer"
                className="absolute -right-2 -top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10"
              >
                ×
              </button>

              <img
                src={image}
                alt={`${title} recognition certificate enlarged`}
                className="block max-h-[calc(100dvh-1.75rem)] max-w-[calc(100vw-1.5rem)] w-auto h-auto rounded-xl object-contain shadow-[0_25px_100px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[calc(100vw-2rem)]"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function RecognitionCard({
  title,
  organization,
  description,
}: {
  title: string;
  organization: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-zinc-900 bg-[#0d0d0d] p-8">
      <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
        {organization}
      </p>

      <h3 className="mt-5 text-3xl font-semibold tracking-tight">
        {title}
      </h3>

      <p className="mt-4 max-w-xl leading-7 text-zinc-500">
        {description}
      </p>
    </article>
  );
}

function SkillGroup({
  title,
  items,
}: {
  title: string;
  items: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
        {title}
      </p>

      <p className="mt-2 leading-6 text-zinc-400">{items}</p>
    </div>
  );
}