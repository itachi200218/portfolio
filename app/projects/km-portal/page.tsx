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
      className={`transition-[transform,opacity,filter] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-16 opacity-0 blur-[6px]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
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

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
    element.style.setProperty("--rotate-x", `${(0.5 - y / rect.height) * 2.5}deg`);
    element.style.setProperty("--rotate-y", `${(x / rect.width - 0.5) * 2.5}deg`);
  };

  const reset = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--mouse-x", "50%");
    element.style.setProperty("--mouse-y", "20%");
    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group/glass relative overflow-hidden rounded-3xl border border-white/[0.10] bg-white/[0.035] p-6 backdrop-blur-2xl backdrop-saturate-[180%] shadow-[0_20px_80px_rgba(0,0,0,0.18)] transition-[transform,border-color,background,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-white/[0.18] hover:bg-white/[0.055] hover:shadow-[0_30px_100px_rgba(0,0,0,0.28)] md:[transform:perspective(1000px)_rotateX(var(--rotate-x))_rotateY(var(--rotate-y))] ${className}`}
      style={{
        ["--mouse-x" as string]: "50%",
        ["--mouse-y" as string]: "50%",
        ["--rotate-x" as string]: "0deg",
        ["--rotate-y" as string]: "0deg",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(420px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,255,255,0.11),transparent_58%)] opacity-0 transition-opacity duration-500 group-hover/glass:opacity-100" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/[0.07] blur-3xl transition-transform duration-700 group-hover/glass:translate-x-8 group-hover/glass:translate-y-6" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-400/[0.06] blur-3xl transition-transform duration-700 group-hover/glass:-translate-x-8 group-hover/glass:-translate-y-6" />
      <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 transition-transform duration-1000 group-hover/glass:translate-x-[320%] group-hover/glass:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]" />
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
      <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-cyan-400">
        <span>{number}</span>
        <span className="h-px w-10 bg-cyan-400/30" />
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 leading-7 text-zinc-500">{description}</p>
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
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-110px 0px -55% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    // Keep the section heading visible below both sticky navigation bars.
    const headerOffset = window.innerWidth >= 1024 ? 126 : 118;
    const targetY =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });

    setMobileSectionsOpen(false);
  };

  const activeSectionLabel =
    activeSection === "top"
      ? "Home"
      : sectionTabs.find(([, , id]) => id === activeSection)?.[1] ?? "Sections";

  return (
    <main className="min-h-screen overflow-x-clip bg-[#02030a] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
      {/* Ambient glass lighting */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.06] blur-[160px]" />
        <div className="absolute bottom-[10%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/35 backdrop-blur-2xl backdrop-saturate-[180%]">
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

      {/* Section navigation */}
      <div className="sticky top-[69px] z-40 border-b border-white/[0.06] bg-black/25 backdrop-blur-2xl backdrop-saturate-[180%]">
        <div className="mx-auto max-w-7xl px-1 lg:px-6">
          <div className="hidden h-12 items-center gap-1 overflow-x-auto [scrollbar-width:none] lg:flex [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => scrollToSection("top")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] transition ${
                activeSection === "top"
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
              }`}
            >
              Home
            </button>

            {sectionTabs.map(([number, title, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollToSection(id)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] transition ${
                  activeSection === id
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"
                }`}
              >
                {number} · {title}
              </button>
            ))}
          </div>

          <div className="relative lg:hidden">
            <button
              type="button"
              onClick={() => setMobileSectionsOpen((open) => !open)}
              className="flex h-12 w-full items-center justify-between text-left"
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                Section
              </span>
              <span className="flex items-center gap-3 text-xs text-zinc-300">
                {activeSection === "top"
                  ? "Home"
                  : sectionTabs.find(([, , id]) => id === activeSection)?.[1] ?? "Overview"}
                <span
                  className={`text-zinc-500 transition-transform ${
                    mobileSectionsOpen ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </span>
            </button>

            {mobileSectionsOpen && (
              <div className="absolute left-0 right-0 top-full border-x border-b border-white/[0.08] bg-[#080a12]/95 p-3 shadow-2xl backdrop-blur-2xl">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToSection("top")}
                    className={`rounded-2xl border px-3 py-3 text-left text-xs transition ${
                      activeSection === "top"
                        ? "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300"
                        : "border-white/[0.07] bg-white/[0.025] text-zinc-400 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="block text-[10px] text-zinc-600">—</span>
                    Home
                  </button>

                  {sectionTabs.map(([number, title, id]) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className={`rounded-2xl border px-3 py-3 text-left text-xs transition ${
                        activeSection === id
                          ? "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-300"
                          : "border-white/[0.07] bg-white/[0.025] text-zinc-400 hover:bg-white/[0.05]"
                      }`}
                    >
                      <span className="block text-[10px] text-zinc-600">{number}</span>
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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