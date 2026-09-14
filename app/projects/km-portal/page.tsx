"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,18px,0)",
        filter: visible ? "blur(0)" : "blur(5px)",
        transition: `opacity 900ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 900ms cubic-bezier(.16,1,.3,1) ${delay}ms, filter 900ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty("--mx", `${x}px`);
    element.style.setProperty("--my", `${y}px`);
    element.style.setProperty("--rx", `${(0.5 - y / rect.height) * 2.5}deg`);
    element.style.setProperty("--ry", `${(x / rect.width - 0.5) * 2.5}deg`);
  };

  const reset = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--mx", "50%");
    element.style.setProperty("--my", "20%");
    element.style.setProperty("--rx", "0deg");
    element.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.045] shadow-[0_24px_90px_rgba(0,0,0,0.30)] backdrop-blur-2xl backdrop-saturate-150 transition-transform duration-500 ease-out [transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "20%",
          "--rx": "0deg",
          "--ry": "0deg",
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx) var(--my), rgba(103,232,249,.12), transparent 42%), radial-gradient(500px circle at 90% 10%, rgba(167,139,250,.08), transparent 42%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.055] via-transparent to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/70">
        {number}
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/50">{description}</p>
    </div>
  );
}

function FlowCard({
  number,
  title,
  description,
  highlight = false,
}: {
  number: string;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-cyan-300/15 bg-cyan-300/[0.045]"
          : "border-white/[0.08] bg-white/[0.025]"
      }`}
    >
      <div className="text-[10px] tracking-[0.22em] text-white/25">{number}</div>
      <div className="mt-3 text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-xs leading-5 text-white/40">{description}</div>
    </div>
  );
}

function Metric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <GlassCard className="p-6">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <p className="mt-2 text-sm leading-5 text-white/40">{label}</p>
    </GlassCard>
  );
}

const sectionTabs = [
  ["01", "Problem", "problem"],
  ["02", "The Problem", "the-problem"],
  ["03", "Platform", "platform"],
  ["04", "Workflow", "workflow"],
  ["05", "Scoring", "scoring"],
  ["06", "Tracking", "tracking"],
  ["07", "Duplicates", "duplicates"],
  ["08", "Architecture", "architecture"],
  ["09", "Decisions", "decisions"],
  ["10", "Impact", "impact"],
] as const;

export default function KMPortalCaseStudy() {
  const router = useRouter();
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    const ids = ["top", ...sectionTabs.map(([, , id]) => id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target instanceof HTMLElement) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5],
        rootMargin: "-18% 0px -65% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileSectionsOpen(false);
  };

  const activeSectionLabel =
    activeSection === "top"
      ? "Home"
      : sectionTabs.find(([, , id]) => id === activeSection)?.[1] ?? "Sections";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#050507] text-white selection:bg-cyan-300/20 selection:text-white">
      {/* Ambient glass lighting */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[5%] top-[4%] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.045] blur-[130px]" />
        <div className="absolute right-[2%] top-[28%] h-[520px] w-[520px] rounded-full bg-violet-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-[8%] left-[35%] h-[420px] w-[420px] rounded-full bg-blue-500/[0.025] blur-[140px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
         <button
  type="button"
  onClick={handleBack}
  className="group flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
>
  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] transition group-hover:bg-white/[0.1]">
    ←
  </span>
  Back to Portfolio
</button>

          <div className="hidden text-[11px] uppercase tracking-[0.25em] text-white/30 sm:block">
            KM Portal · Case Study
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] text-white/45">
            Enterprise Platform
          </div>
        </div>
      </nav>

      {/* SECTION NAVIGATION */}
      <div className="sticky top-[65px] z-40 border-b border-white/[0.06] bg-black/45 backdrop-blur-2xl backdrop-saturate-[180%]">
        {/* Desktop: full section tabs */}
        <div className="mx-auto hidden max-w-7xl overflow-x-auto px-4 py-2.5 scrollbar-hide lg:block lg:px-8">
          <div className="flex min-w-max items-center gap-1">
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className={`rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition ${
                activeSection === "top"
                  ? "bg-cyan-400/[0.08] text-cyan-300"
                  : "text-zinc-500 hover:bg-white/[0.07] hover:text-white"
              }`}
            >
              Home
            </button>

            {sectionTabs.map(([number, label, id]) => (
              <button
                type="button"
                key={id}
                onClick={() => scrollToSection(id)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] transition ${
                  activeSection === id
                    ? "bg-white/[0.07] text-white"
                    : "text-zinc-500 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <span
                  className={`mr-1.5 ${
                    activeSection === id ? "text-cyan-300" : "text-zinc-700"
                  }`}
                >
                  {number}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Phone + tablet: compact section picker */}
        <div className="relative mx-auto lg:hidden">
          <button
            type="button"
            aria-expanded={mobileSectionsOpen}
            onClick={() => setMobileSectionsOpen((open) => !open)}
            className="flex w-full items-center justify-between px-5 py-3.5 text-left"
          >
            <span className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-400">
                SECTION
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-sm font-medium text-zinc-200">
                {activeSectionLabel}
              </span>
            </span>

            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-xs text-zinc-400 transition-transform duration-300 ${
                mobileSectionsOpen ? "rotate-180" : ""
              }`}
            >
              ↓
            </span>
          </button>

          {mobileSectionsOpen && (
            <div className="absolute left-3 right-3 top-full mt-2 rounded-2xl border border-white/[0.10] bg-[#080b16]/95 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => scrollToSection("top")}
                  className={`rounded-xl px-3 py-3 text-left text-xs transition ${
                    activeSection === "top"
                      ? "bg-cyan-400/[0.10] text-cyan-300"
                      : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="mr-2 text-[10px] text-zinc-600">00</span>
                  Home
                </button>

                {sectionTabs.map(([number, label, id]) => (
                  <button
                    type="button"
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`rounded-xl px-3 py-3 text-left text-xs transition ${
                      activeSection === id
                        ? "bg-cyan-400/[0.10] text-cyan-300"
                        : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <span
                      className={`mr-2 text-[10px] ${
                        activeSection === id ? "text-cyan-300" : "text-zinc-600"
                      }`}
                    >
                      {number}
                    </span>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero */}
      <section id="top" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 pt-28 lg:px-8 lg:pt-36">
        <ScrollReveal>
          <div className="max-w-5xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.04] px-4 py-2 text-xs text-cyan-200/70">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.8)]" />
              INTERNAL KNOWLEDGE ENGINEERING PLATFORM
            </div>

            <h1 className="text-6xl font-semibold tracking-[-0.065em] sm:text-7xl lg:text-[92px] lg:leading-[0.94]">
              KM Portal
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 tracking-[-0.02em] text-white/50 sm:text-2xl">
              An internal platform that turns knowledge and learning workflows into
              structured, measurable and trackable user experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {[
                "Knowledge Management",
                "Learning Workflows",
                "Scoring",
                "User Tracking",
                "Duplicate Prevention",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs text-white/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-20">
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/25">
                  The concept
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Knowledge should be structured, measurable and reusable.
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45">
                  KM Portal is positioned as an internal platform for organizing
                  knowledge and learning activities into structured workflows.
                  It combines learning progression, scoring and user tracking
                  while protecting the integrity of the platform through
                  duplicate-prevention mechanisms.
                </p>
              </div>

              <div className="grid gap-3">
                <FlowCard
                  number="01"
                  title="Knowledge"
                  description="Structured learning content and internal knowledge."
                />
                <div className="text-center text-xs text-white/15">↓</div>
                <FlowCard
                  number="02"
                  title="Learning workflow"
                  description="Users move through organized learning activities."
                  highlight
                />
                <div className="text-center text-xs text-white/15">↓</div>
                <FlowCard
                  number="03"
                  title="Measurement"
                  description="Scoring and user tracking turn activity into measurable progress."
                  highlight
                />
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Problem & Approach */}
      <section id="problem" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="01"
            title="The engineering problem"
            description="Internal knowledge systems become difficult to scale when content, learning activity, scoring and user data are handled through disconnected workflows."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <GlassCard className="p-7 sm:p-9">
            <div className="text-xs uppercase tracking-[0.22em] text-white/25">
              Problem
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              Knowledge alone is not a learning system.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/45">
              Making internal material available is only the first step. The
              platform also needs structured workflows, measurable outcomes,
              user-level visibility and reliable underlying records.
            </p>
          </GlassCard>

          <GlassCard className="border-cyan-300/10 p-7 sm:p-9">
            <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/60">
              Approach
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight">
              Build one platform around the complete learning lifecycle.
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/45">
              KM Portal connects knowledge delivery, learning participation,
              scoring, user tracking and duplicate prevention so the resulting
              data can support a more reliable view of learning progress.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Problem */}
      <section id="the-problem" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="02"
            title="The problem"
            description="Internal learning becomes difficult to manage when knowledge, participation and progress are spread across disconnected workflows."
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            [
              "Unstructured knowledge",
              "Learning information needs a consistent structure so users can find and consume it through a defined workflow.",
            ],
            [
              "Progress is difficult to measure",
              "Simply making learning material available does not provide a clear view of participation or performance.",
            ],
            [
              "Data integrity matters",
              "Duplicate records and repeated entries can distort learning activity, scoring and user-level tracking.",
            ],
          ].map(([title, description], index) => (
            <ScrollReveal key={title} delay={index * 80}>
              <GlassCard className="h-full p-7">
                <div className="text-3xl font-semibold text-white/10">
                  0{index + 1}
                </div>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/40">
                  {description}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Engineering Highlights */}
      <section className="relative mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Knowledge Layer", "Structured internal learning content"],
              ["02", "Workflow Engine", "Defined learning and participation flow"],
              ["03", "Measurement", "Scoring and user-level activity"],
              ["04", "Data Integrity", "Duplicate-aware records and tracking"],
            ].map(([value, title, detail]) => (
              <GlassCard key={title} className="p-6">
                <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
                <div className="mt-3 text-sm font-medium text-white/80">{title}</div>
                <div className="mt-2 text-xs leading-5 text-white/40">{detail}</div>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Platform */}
      <section id="platform" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="03"
            title="Platform at a glance"
            description="The portal connects knowledge delivery, learning workflows, scoring and user-level visibility into one internal platform."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Knowledge",
                  "Organize internal learning and knowledge into structured experiences.",
                ],
                [
                  "Learning",
                  "Support defined workflows rather than disconnected content consumption.",
                ],
                [
                  "Scoring",
                  "Measure learning activity and performance through structured scoring.",
                ],
                [
                  "Tracking",
                  "Maintain visibility into user activity and participation.",
                ],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6"
                >
                  <div className="text-sm font-semibold">{title}</div>
                  <p className="mt-3 text-xs leading-5 text-white/40">{text}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Workflow */}
      <section id="workflow" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="04"
            title="Learning workflow"
            description="The core experience is a structured progression from knowledge discovery to participation and measurable outcome."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 md:grid-cols-7 md:items-center">
              <FlowCard
                number="01"
                title="Discover"
                description="Access relevant internal knowledge."
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowCard
                number="02"
                title="Learn"
                description="Consume structured learning material."
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowCard
                number="03"
                title="Participate"
                description="Complete the defined learning activity."
                highlight
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowCard
                number="04"
                title="Measure"
                description="Capture score and user activity."
                highlight
              />
            </div>

            <div className="my-9 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Knowledge layer
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Provides the structured information users need for learning.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Learning layer
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Defines the progression and activity around that knowledge.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Measurement layer
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Captures scoring and user-level activity for visibility.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Scoring */}
      <section id="scoring" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="05"
            title="Scoring & measurement"
            description="Learning becomes more useful to an organization when participation can be represented through measurable outcomes."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <ScrollReveal>
            <GlassCard className="h-full p-8 sm:p-10">
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-300/60">
                Measurement
              </div>
              <div className="mt-6 text-6xl font-semibold tracking-[-0.06em]">
                Score
              </div>
              <p className="mt-5 text-sm leading-7 text-white/45">
                A structured scoring mechanism provides a measurable signal for
                learning activity instead of relying only on completion status.
              </p>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                [
                  "Learning outcome",
                  "Represent learning activity through structured results.",
                ],
                [
                  "User visibility",
                  "Track activity at the user level.",
                ],
                [
                  "Progress signal",
                  "Use scoring as an indicator of learning performance.",
                ],
                [
                  "Structured data",
                  "Keep learning results organized for the platform.",
                ],
              ].map(([title, text]) => (
                <GlassCard key={title} className="p-7">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/40">{text}</p>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Tracking */}
      <section id="tracking" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="06"
            title="User tracking"
            description="The platform maintains visibility around user participation so learning activity can be understood at an individual level."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-3">
          <ScrollReveal>
            <Metric value="User" label="Activity is associated with the learner." />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <Metric value="Activity" label="Learning participation can be tracked." />
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <Metric value="Progress" label="Scoring provides a measurable learning signal." />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={100} className="mt-5">
          <GlassCard className="p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  01 · Identify
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Associate learning activity with the relevant user.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  02 · Record
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Preserve the user's participation and learning information.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  03 · Understand
                </div>
                <p className="mt-3 text-sm leading-6 text-white/45">
                  Use activity and scoring to understand learning progress.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Duplicate prevention */}
      <section id="duplicates" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="07"
            title="Duplicate-prevention mechanisms"
            description="Data quality is part of the platform design. Preventing duplicate entries protects the reliability of user tracking and learning results."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-5 md:grid-cols-5 md:items-center">
              <FlowCard
                number="01"
                title="Incoming activity"
                description="A learning or user-related operation enters the platform."
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowCard
                number="02"
                title="Validation"
                description="Existing data is considered before creating a duplicate record."
                highlight
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowCard
                number="03"
                title="Trusted record"
                description="The platform preserves cleaner learning and user data."
                highlight
              />
            </div>

            <div className="mt-9 rounded-2xl border border-white/[0.08] bg-black/20 p-6">
              <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                Engineering value
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-white/50">
                Duplicate prevention is not just a convenience feature. It
                protects the integrity of the measurements that depend on the
                underlying records, making user tracking and scoring more
                trustworthy.
              </p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Architecture */}
      <section id="architecture" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="08"
            title="Platform architecture"
            description="The system is organized around connected platform responsibilities: knowledge delivery, application workflows, measurement and data integrity."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 lg:grid-cols-4">
              {[
                [
                  "Knowledge",
                  "Structured internal learning information.",
                  false,
                ],
                [
                  "Application",
                  "Learning workflows and user interaction.",
                  true,
                ],
                [
                  "Measurement",
                  "Scoring and user activity tracking.",
                  true,
                ],
                [
                  "Integrity",
                  "Duplicate-prevention and reliable records.",
                  false,
                ],
              ].map(([title, text, highlighted]) => (
                <FlowCard
                  key={String(title)}
                  number="LAYER"
                  title={String(title)}
                  description={String(text)}
                  highlight={Boolean(highlighted)}
                />
              ))}
            </div>

            <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                <div className="text-xs text-white/25">INPUT</div>
                <div className="mt-3 text-sm font-medium">Knowledge & users</div>
              </div>
              <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.035] p-6">
                <div className="text-xs text-cyan-300/50">PROCESS</div>
                <div className="mt-3 text-sm font-medium">
                  Learning & measurement
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
                <div className="text-xs text-white/25">OUTPUT</div>
                <div className="mt-3 text-sm font-medium">
                  Progress & trusted data
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      {/* Engineering principles */}
      <section id="decisions" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="09"
            title="Engineering decisions"
            description="The platform is centered around a few engineering principles that keep the learning experience structured, measurable and maintainable."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {[
            [
              "Structure over scattered content",
              "Knowledge is more valuable when users can access it through a defined and repeatable learning workflow.",
            ],
            [
              "Measurement over assumptions",
              "Scoring and activity tracking provide a clearer signal than simply knowing that content exists.",
            ],
            [
              "Data integrity by design",
              "Duplicate-prevention mechanisms protect the reliability of the information used by the platform.",
            ],
          ].map(([title, text], index) => (
            <ScrollReveal key={title} delay={index * 80}>
              <GlassCard className="h-full p-7 sm:p-8">
                <div className="mb-8 text-3xl font-semibold text-white/10">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/40">{text}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="relative scroll-mt-32 mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="10"
            title="Engineering impact"
            description="KM Portal brings learning management, measurement and data quality into one internal platform experience."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Knowledge", "Centralized internal learning experience."],
            ["Workflow", "Structured progression through learning activities."],
            ["Scoring", "Measurable learning outcomes."],
            ["Integrity", "Duplicate-aware data management."],
          ].map(([value, label], index) => (
            <ScrollReveal key={value} delay={index * 70}>
              <Metric value={value} label={label} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="relative mx-auto max-w-7xl px-6 pb-36 lg:px-8">
        <ScrollReveal>
          <GlassCard className="relative overflow-hidden p-8 sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(103,232,249,.075),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(167,139,250,.065),transparent_38%)]" />

            <div className="relative max-w-4xl">
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-300/55">
                Closing
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
                KM Portal turns internal knowledge into a measurable learning
                experience.
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-7 text-white/45">
                By bringing structured learning workflows, scoring, user tracking and
                duplicate-prevention mechanisms together, KM Portal provides a
                reusable foundation for internal knowledge and learning management.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {[
                  "Knowledge Management",
                  "Learning",
                  "Scoring",
                  "User Tracking",
                  "Data Integrity",
                  "Enterprise Platform",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm text-white/30 transition hover:text-white/70"
          >
            Back to portfolio →
          </button>
        </div>
      </section>
    </main>
  );
}