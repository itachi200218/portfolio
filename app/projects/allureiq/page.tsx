"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const technologies = [
  "Java",
  "TestNG",
  "REST Assured",
  "Allure",
  "Spring Boot",
  "Maven",
  "MongoDB",
  "HTML",
  "CSS",
  "JavaScript",
  "GitHub Actions",
  "AI",
];

const capabilities = [
  {
    title: "AI Test Intelligence",
    description:
      "Generates AI summaries, identifies failure patterns, explains likely causes and suggests improvements after test execution.",
    icon: "◈",
  },
  {
    title: "Unified Allure Reporting",
    description:
      "Combines automation execution data and Allure reporting into a reusable intelligence layer for engineering teams.",
    icon: "◎",
  },
  {
    title: "Project & Run Management",
    description:
      "Organizes users, folders, subprojects and test executions while keeping project data and sessions isolated.",
    icon: "◇",
  },
  {
    title: "Hybrid Search",
    description:
      "Uses MongoDB Atlas with local JSON caching, fuzzy matching and automatic fallback for resilient search.",
    icon: "⌕",
  },
  {
    title: "Real-Time Analytics",
    description:
      "Surfaces execution statistics, API performance, error causes and historical intelligence through the dashboard.",
    icon: "⌁",
  },
  {
    title: "Reusable Maven Framework",
    description:
      "Published as allureiq-framework v3.2.6 so the automation capability can be consumed as a reusable dependency.",
    icon: "▣",
  },
];

const architecturePoints = [
  "Automation & Test Execution",
  "AI Intelligence Layer",
  "Allure Reporting",
  "Spring Boot Platform",
  "MongoDB Persistence",
  "Hybrid Search & Cache",
  "CI/CD Automation",
  "Reusable Maven Package",
];

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
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    element.style.setProperty("--mouse-x", `${x}px`);
    element.style.setProperty("--mouse-y", `${y}px`);
    element.style.setProperty(
      "--rotate-x",
      `${((y / rect.height) - 0.5) * -2.5}deg`
    );
    element.style.setProperty(
      "--rotate-y",
      `${((x / rect.width) - 0.5) * 2.5}deg`
    );
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;

    element.style.setProperty("--rotate-x", "0deg");
    element.style.setProperty("--rotate-y", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function ArchitectureImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/[0.10] bg-white/[0.025] p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(168,85,247,0.08),transparent_35%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.05]" />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.06] bg-black/40">
        <Image
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          className="h-auto w-full transition duration-700 ease-out group-hover:scale-[1.012]"
          priority
        />
      </div>
    </div>
  );
}

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
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

      <p className="mt-4 leading-7 text-zinc-500">{subtitle}</p>
    </div>
  );
}

function MetricCard({
  value,
  label,
  detail,
}: {
  value: string;
  label: string;
  detail: string;
}) {
  return (
    <GlassCard className="min-h-[170px]">
      <span className="text-4xl font-semibold tracking-tight text-white">
        {value}
      </span>
      <h3 className="mt-5 text-sm font-medium text-zinc-200">{label}</h3>
      <p className="mt-2 text-xs leading-5 text-zinc-600">{detail}</p>
    </GlassCard>
  );
}


export default function AllureIQCaseStudy() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("top");
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState(false);

  const sectionTabs = [
    ["01", "Overview", "overview"],
    ["02", "Intelligence", "intelligence"],
    ["03", "Capabilities", "capabilities"],
    ["04", "AI Reports", "ai-reports"],
    ["05", "Architecture", "architecture"],
    ["06", "Data", "data"],
    ["07", "Search", "search"],
    ["08", "CI/CD", "cicd"],
    ["09", "Technology", "technology"],
    ["10", "Maven", "maven"],
    ["11", "Decisions", "decisions"],
  ] as const;

  useEffect(() => {
    const ids = ["top", ...sectionTabs.map(([, , id]) => id)];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

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
        rootMargin: "-126px 0px -55% 0px",
        threshold: [0.05, 0.15, 0.3, 0.5],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = window.innerWidth >= 1024 ? 126 : 118;
    const targetY =
      element.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: "smooth",
    });
    setMobileSectionsOpen(false);
  };

  return (
    <main className="min-h-screen scroll-smooth overflow-x-clip bg-[#02030a] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.06] blur-[160px]" />
        <div className="absolute bottom-[10%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/35 backdrop-blur-2xl backdrop-saturate-[180%]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] transition group-hover:bg-white/[0.1]">
              ←
            </span>
            Back to Portfolio
          </button>

          <div className="hidden items-center gap-6 text-xs text-zinc-500 md:flex">
            <span>AllureIQ</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Case Study</span>
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
                <span className={`text-zinc-500 transition-transform ${mobileSectionsOpen ? "rotate-180" : ""}`}>
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
      <ScrollReveal>
        <section id="top" className="scroll-mt-32 relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">ENGINEERING INTELLIGENCE PLATFORM</span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs tracking-wider text-zinc-500">AI-POWERED ENGINEERING INTELLIGENCE</span>
            </div>
            <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">AllureIQ</h1>
            <p className="mt-4 text-xl font-light text-zinc-300 md:text-2xl">A reusable engineering intelligence platform that transforms automated API execution into persistent, searchable and AI-assisted engineering intelligence.</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-500">AllureIQ Framework connects API automation, reporting, AI analysis, persistence, search and CI/CD into a reusable platform for understanding and improving software execution at scale.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {technologies.map((tech) => (<span key={tech} className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-xl">{tech}</span>))}
            </div>
          </div>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Intelligent Testing", "Automation results are transformed into actionable AI intelligence."],
              ["02", "Unified Analytics", "Execution, performance, errors and historical insights come together in one platform."],
              ["03", "Reusable Framework", "Published as a Maven dependency for reuse across automation projects."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-3xl border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.055]">
                <span className="text-xs text-cyan-400">{number}</span>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Problem & Approach */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                The Problem
              </p>
              <h3 className="mt-5 text-2xl font-medium tracking-tight">
                Automation produces data. Engineers still need intelligence.
              </h3>
              <p className="mt-4 leading-8 text-zinc-500">
                Test execution generates reports, failures, payloads and
                performance data, but understanding recurring issues and
                historical behavior can still require manual investigation.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                The Approach
              </p>
              <h3 className="mt-5 text-2xl font-medium tracking-tight">
                Turn execution data into a reusable intelligence layer.
              </h3>
              <p className="mt-4 leading-8 text-zinc-500">
                AllureIQ connects automation, reporting, persistence, search,
                AI analysis and CI/CD so execution results can become
                searchable, explainable and reusable engineering knowledge.
              </p>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering Highlights */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl">
            <div className="grid divide-y divide-white/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
              {[
                ["3.2.6", "Framework Version", "Reusable Maven dependency"],
                ["AI", "Intelligence Layer", "Analysis, explanations & recommendations"],
                ["MongoDB", "Persistent Context", "Executions, reports & diagnostic data"],
                ["CI/CD", "Delivery Ready", "GitHub Actions automation"],
              ].map(([value, title, description]) => (
                <div key={title} className="p-6">
                  <span className="text-xs text-cyan-400">{value}</span>
                  <h3 className="mt-4 text-sm font-medium">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-600">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <section id="overview" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="01"
            title="What is AllureIQ?"
            subtitle="A test automation ecosystem that turns execution data into engineering intelligence."
          />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <p className="text-lg leading-9 text-zinc-300">
                AllureIQ connects automation execution, reporting, AI analysis,
                persistence, search and delivery automation into one reusable
                testing platform.
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                Instead of treating test reports as the final output, the
                framework analyzes the results, identifies recurring issues,
                surfaces trends and provides suggestions that help engineers
                understand what happened and what to improve.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Platform architecture
              </p>

              <div className="mt-6 space-y-3">
                {architecturePoints.map((point, index) => (
                  <div
                    key={point}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3"
                  >
                    <span className="text-xs text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-zinc-300">{point}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      {/* Metrics */}
      <ScrollReveal>
        <section id="intelligence" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="02"
            title="Test Intelligence at a Glance"
            subtitle="The platform turns raw automation execution into a compact intelligence layer."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              value="AI"
              label="Generated Insights"
              detail="Summaries, root-cause observations and improvement suggestions."
            />
            <MetricCard
              value="API"
              label="Automation Analytics"
              detail="REST API execution and performance information."
            />
            <MetricCard
              value="∞"
              label="Historical Context"
              detail="Execution intelligence persisted for later analysis."
            />
            <MetricCard
              value="24/7"
              label="CI/CD Ready"
              detail="Automation can run continuously through GitHub Actions."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Capabilities */}
      <ScrollReveal>
        <section id="capabilities" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="03"
            title="Core Capabilities"
            subtitle="The major systems working together inside the AllureIQ ecosystem."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => (
              <GlassCard key={item.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] text-lg text-cyan-300">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-lg font-medium">{item.title}</h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* AI Reports */}
      <ScrollReveal>
        <section id="ai-reports" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="04"
            title="AI Test Intelligence Reports"
            subtitle="Real generated AllureIQ reports showing API execution, analytics and test intelligence."
          />

          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
            <GlassCard>
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Intelligence pipeline
              </span>

              <div className="mt-6 space-y-3">
                {[
                  ["01", "Collect", "Capture execution metadata and failures."],
                  ["02", "Analyze", "Process results through the AI layer."],
                  ["03", "Explain", "Identify trends and likely causes."],
                  ["04", "Recommend", "Suggest fixes and best practices."],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <span className="text-xs text-cyan-400">{number}</span>
                    <h3 className="mt-2 text-sm font-medium">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      {description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-5">
                <span className="text-xs uppercase tracking-[0.15em] text-cyan-300/80">
                  Persistent intelligence
                </span>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Generated execution intelligence can be persisted in MongoDB
                  through the <code className="text-zinc-300">ai_reports</code>{" "}
                  collection for later analysis.
                </p>
              </div>
            </GlassCard>

            <div className="grid gap-6 md:grid-cols-2">
              <GlassCard className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                      Live report
                    </span>
                    <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-[10px] text-cyan-300">
                      15 APIs
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium">
                    AdminApp
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    Unified API intelligence report covering authentication,
                    CRUD and user-management endpoints.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                      <span className="text-xs text-zinc-600">APIs tested</span>
                      <p className="mt-2 text-2xl font-semibold">15</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                      <span className="text-xs text-zinc-600">Success</span>
                      <p className="mt-2 text-2xl font-semibold text-cyan-300">
                        100%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href="https://itachi200218.github.io/AllureIQ-Demo/AdminApp.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  >
                    View AdminApp Report →
                  </a>
                  <a
                    href="https://itachi200218.github.io/AllureIQ-Demo/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-5 py-3 text-sm text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-400/[0.1]"
                  >
                    Open AllureIQ Demo →
                  </a>
                </div>
              </GlassCard>

              <GlassCard className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                      Live report
                    </span>
                    <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-[10px] text-cyan-300">
                      5 APIs
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium">
                    JobTracker
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    Unified API intelligence report covering CRUD operations,
                    endpoint results and AI recommendations.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-4">
                      <span className="text-xs text-zinc-600">APIs tested</span>
                      <p className="mt-2 text-2xl font-semibold">5</p>
                    </div>
                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-4">
                      <span className="text-xs text-zinc-600">Success</span>
                      <p className="mt-2 text-2xl font-semibold text-cyan-300">
                        100%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <a
                    href="https://itachi200218.github.io/AllureIQ-Demo/JobTracker.html"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] px-5 py-3 text-sm text-zinc-200 transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  >
                    View JobTracker Report →
                  </a>
                  <a
                    href="https://itachi200218.github.io/AllureIQ-Demo/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-5 py-3 text-sm text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-400/[0.1]"
                  >
                    Open AllureIQ Demo →
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Architecture */}
      <ScrollReveal>
        <section id="architecture" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="05"
            title="AI-Allure-Reuse Architecture"
            subtitle="Automation, reporting and intelligence are connected through a reusable framework architecture."
          />

          <GlassCard className="overflow-hidden p-4 md:p-6">
            <div className="grid gap-3 md:grid-cols-5">
              {[
                ["01", "Test", "REST Assured + TestNG"],
                ["02", "Report", "Allure results"],
                ["03", "Analyze", "AI intelligence"],
                ["04", "Persist", "MongoDB"],
                ["05", "Reuse", "Maven package"],
              ].map(([number, title, description], index) => (
                <div key={number} className="relative">
                  <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5">
                    <span className="text-xs text-cyan-400">{number}</span>
                    <h3 className="mt-4 font-medium">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">
                      {description}
                    </p>
                  </div>

                  {index < 4 && (
                    <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-zinc-600 md:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* Data management */}
      <ScrollReveal>
        <section id="data" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="06"
            title="Project & Data Management"
            subtitle="Test intelligence is organized around isolated users, projects, subprojects and executions."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Users",
                "User data and sessions are isolated within the platform.",
              ],
              [
                "Folders",
                "A folder acts as a project container for related testing work.",
              ],
              [
                "Subprojects",
                "Multiple independent subprojects can live under a project.",
              ],
              [
                "Executions",
                "Individual test runs provide the raw material for intelligence.",
              ],
              [
                "AI Reports",
                "AI-generated insights are persisted for future analysis.",
              ],
              [
                "Context Logs",
                "Payloads and error traces provide deeper diagnostic context.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              MongoDB collections
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["ai_executions", "Execution metadata"],
                ["ai_reports", "AI insights"],
                ["ai_context_logs", "Payloads & error traces"],
              ].map(([collection, purpose]) => (
                <div
                  key={collection}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                >
                  <code className="text-sm text-zinc-300">{collection}</code>
                  <p className="mt-2 text-xs text-zinc-600">{purpose}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal>
        <section id="search" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="07"
            title="Enhanced Hybrid Search"
            subtitle="v3.2.6 introduces a resilient search layer designed to keep the dashboard useful even when the cloud data source is unavailable."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Direct MongoDB Atlas",
                "Connects directly through the Java JAR without requiring Spring Boot for the search path.",
              ],
              [
                "Local JSON Cache",
                "Stores search results locally so the dashboard can continue operating when the remote source is unavailable.",
              ],
              [
                "Automatic Fallback",
                "Cloud MongoDB is preferred; when unavailable, the platform switches to the local cache.",
              ],
              [
                "Fuzzy Matching",
                "Supports partial and typo-based matching across projects, endpoints, logs and AI reports.",
              ],
              [
                "Real-Time Results",
                "Search results are surfaced immediately from the active MongoDB or cache source.",
              ],
              [
                "Fault Tolerance",
                "The hybrid design improves resilience and supports both online and offline usage.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7)]" />
                  <div>
                    <h3 className="text-lg font-medium">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-500">
                      {description}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mt-6">
            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 text-center">
                <span className="text-xs text-zinc-600">PRIMARY</span>
                <h3 className="mt-2 font-medium">MongoDB Atlas</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Cloud search source
                </p>
              </div>

              <div className="text-center text-xl text-cyan-400">
                ↕
                <p className="mt-1 text-[10px] uppercase tracking-widest text-zinc-600">
                  fallback
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 text-center">
                <span className="text-xs text-zinc-600">FALLBACK</span>
                <h3 className="mt-2 font-medium">Local JSON Cache</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Offline search source
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* CI/CD */}
      <ScrollReveal>
        <section id="cicd" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="08"
            title="CI/CD Automation"
            subtitle="Testing, reporting and release automation are integrated into the engineering workflow."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "Continuous Testing",
                "GitHub Actions can automatically execute the testing workflow.",
              ],
              [
                "Automated Reporting",
                "Allure reports are generated as part of the test pipeline.",
              ],
              [
                "Release Packaging",
                "The framework is published as a reusable Maven package.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs text-cyan-400">AUTOMATION</span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mt-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  Published dependency
                </p>
                <code className="mt-3 block text-sm text-zinc-300">
                  com.allureiq:allureiq-framework:3.2.6
                </code>
              </div>

              <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs text-zinc-500">
                Maven • v3.2.6
              </div>
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* Tech architecture */}
      <ScrollReveal>
        <section id="technology" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="09"
            title="Technology Architecture"
            subtitle="A layered stack connecting automation, backend services, reporting, persistence and delivery."
          />

          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl">
            {[
              ["Automation & Testing", "Java / TestNG / REST Assured"],
              ["Reporting", "Allure Reports"],
              ["Backend", "Spring Boot / Maven"],
              ["Frontend", "HTML / CSS / JavaScript"],
              ["Database", "MongoDB"],
              ["AI & Logic", "Custom AI using API keys"],
              ["CI/CD", "GitHub Actions"],
              ["Packaging", "JAR / Reusable Maven Dependency"],
            ].map(([layer, stack]) => (
              <div
                key={layer}
                className="grid gap-2 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[220px_1fr]"
              >
                <span className="text-sm text-zinc-600">{layer}</span>
                <span className="text-sm text-zinc-300">{stack}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Maven */}
      <ScrollReveal>
        <section id="maven" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="10"
            title="Reusable Maven Framework"
            subtitle="AllureIQ is packaged as a reusable dependency rather than remaining a one-off test project."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Dependency
              </p>

              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-black/30 p-5">
                <code className="break-all text-sm leading-7 text-zinc-300">
                  {"<dependency>\n"}
                  {"  <groupId>com.allureiq</groupId>\n"}
                  {"  <artifactId>allureiq-framework</artifactId>\n"}
                  {"  <version>3.2.6</version>\n"}
                  {"</dependency>"}
                </code>
              </div>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                Distribution
              </p>

              <h3 className="mt-6 text-2xl font-medium">
                GitHub Packages
              </h3>

              <p className="mt-4 leading-8 text-zinc-500">
                The framework is published through a GitHub Maven Package
                repository, allowing other automation projects to consume the
                AllureIQ capabilities through standard Maven configuration.
              </p>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering decisions */}
      <ScrollReveal>
        <section id="decisions" className="relative z-10 mx-auto max-w-7xl scroll-mt-32 px-6 py-24 lg:px-10">
          <SectionHeading
            number="11"
            title="Engineering Decisions"
            subtitle="The platform is designed around reuse, resilience and actionable testing intelligence."
          />

          <div className="space-y-4">
            {[
              [
                "AI after execution, not instead of automation",
                "REST Assured and TestNG remain the execution foundation while AI adds interpretation, trend analysis and recommendations on top.",
              ],
              [
                "Reporting as a reusable intelligence layer",
                "Allure reporting is integrated into a broader framework instead of being treated as an isolated report generator.",
              ],
              [
                "Cloud-first with local fallback",
                "The v3.2.6 search architecture uses MongoDB Atlas as the primary source while retaining local JSON data for resilience.",
              ],
              [
                "Persistence for historical intelligence",
                "Execution metadata, AI reports and context logs are stored so intelligence can extend beyond a single test run.",
              ],
              [
                "Framework over project",
                "Packaging AllureIQ as a Maven dependency makes the automation and intelligence capabilities reusable across projects.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-3 max-w-5xl text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Closing */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/[0.12] bg-cyan-400/[0.025] p-8 text-center backdrop-blur-2xl md:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

            <div className="relative">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                AllureIQ Framework v3.2.6
              </span>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                Turning automated tests into engineering intelligence.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-zinc-500">
                AllureIQ combines API automation, Allure reporting, AI
                analysis, MongoDB persistence, resilient search, CI/CD and
                reusable Maven packaging into one unified test intelligence
                platform.
              </p>

              <div className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Source Code
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href="https://github.com/itachi200218/AllureIQ-v3"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.08] px-6 py-3 text-sm text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.24] hover:bg-white/[0.13] hover:text-white"
                  >
                    View AllureIQ on GitHub
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-full border border-white/[0.08] px-6 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Back to Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
