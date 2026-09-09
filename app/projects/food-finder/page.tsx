"use client";
import FoodFinderUIExplorer from "./FoodFinderUIExplorer";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const technologies = [
  "Python",
  "Flask",
  "Java",
  "Spring Boot",
  "MySQL",
  "Redis",
  "Gemini AI",
  "HTML",
  "CSS",
  "JavaScript",
  "Selenium",
  "REST Assured",
  "Allure",
  "Maven",
];

const capabilities = [
  {
    title: "AI Recipe Discovery",
    description:
      "Combines normal recipe search with Gemini-powered fallback intelligence when conventional matching cannot find a suitable result.",
    icon: "◈",
  },
  {
    title: "Smart Search",
    description:
      "Provides autocomplete, top search suggestions and fuzzy matching to make recipe discovery tolerant of spelling and wording differences.",
    icon: "⌕",
  },
  {
    title: "AI Chatbot",
    description:
      "A Gemini-powered conversational layer helps users interact with the recipe platform using natural language.",
    icon: "✦",
  },
  {
    title: "Admin Management",
    description:
      "A dedicated administration platform provides recipe, user and platform-management capabilities.",
    icon: "◇",
  },
  {
    title: "Caching & Performance",
    description:
      "Redis is used for repeated data and intent-related operations to reduce unnecessary processing and improve responsiveness.",
    icon: "⌁",
  },
  {
    title: "Automation & Reporting",
    description:
      "Selenium, REST Assured and Allure provide UI/API automation and structured test reporting across the platform.",
    icon: "▣",
  },
];

const architecturePoints = [
  "User Recipe Platform",
  "Admin Management Platform",
  "Flask Application Layer",
  "Spring Boot Services",
  "MySQL Persistence",
  "Redis Caching",
  "Gemini AI Layer",
  "UI & API Automation",
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

function AppFlipCard({
  type,
  description,
  features,
  accent = "cyan",
}: {
  type: "User App" | "Admin App";
  description: string;
  features: string[];
  accent?: "cyan" | "purple";
}) {
  const [flipped, setFlipped] = useState(false);

  const accentText =
    accent === "purple" ? "text-purple-300" : "text-cyan-300";
  const accentBorder =
    accent === "purple" ? "border-purple-400/15" : "border-cyan-400/15";
  const accentBg =
    accent === "purple" ? "bg-purple-400/[0.06]" : "bg-cyan-400/[0.06]";

  return (
    <div className="min-h-[430px]" style={{ perspective: "1400px" }}>
      <div
        className="relative min-h-[430px] w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          <GlassCard className="flex h-full min-h-[430px] flex-col justify-between">
            <div>
              <span
                className={`inline-flex rounded-full border ${accentBorder} ${accentBg} px-3 py-1 text-xs uppercase tracking-[0.2em] ${accentText}`}
              >
                {type}
              </span>

              <h3 className="mt-7 text-3xl font-medium">{type}</h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500">
                {description}
              </p>

              <div className="mt-7 space-y-2">
                {features.slice(0, 3).map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3"
                  >
                    <span className={`text-xs ${accentText}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFlipped(true)}
              className={`mt-8 inline-flex w-full items-center justify-center rounded-full border ${accentBorder} ${accentBg} px-5 py-3 text-sm ${accentText} transition hover:-translate-y-0.5 hover:bg-white/[0.08]`}
            >
              Explore {type} →
            </button>
          </GlassCard>
        </div>

        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <GlassCard className="h-full min-h-[430px]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className={`text-xs uppercase tracking-[0.2em] ${accentText}`}>
                  {type} capabilities
                </span>
                <h3 className="mt-2 text-2xl font-medium">{type}</h3>
              </div>

              <button
                type="button"
                onClick={() => setFlipped(false)}
                aria-label={`Close ${type}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-lg text-zinc-400 transition hover:bg-white/[0.1] hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-7 space-y-3">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                >
                  <span className={`text-xs ${accentText}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default function FoodFinderCaseStudy() {
  return (
    <main className="min-h-screen scroll-smooth overflow-x-clip bg-[#02030a] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[5%] h-[460px] w-[460px] rounded-full bg-cyan-500/[0.07] blur-[150px]" />
        <div className="absolute right-[2%] top-[28%] h-[540px] w-[540px] rounded-full bg-purple-500/[0.065] blur-[170px]" />
        <div className="absolute bottom-[5%] left-[30%] h-[480px] w-[480px] rounded-full bg-blue-500/[0.05] blur-[160px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/35 backdrop-blur-2xl backdrop-saturate-[180%]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] transition group-hover:bg-white/[0.1]">
              ←
            </span>
            Back to Portfolio
          </Link>

          <div className="hidden items-center gap-6 text-xs text-zinc-500 md:flex">
            <span>Food Finder</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Case Study</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
          <div className="max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">
                FULL-STACK AI APPLICATION
              </span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs tracking-wider text-zinc-500">
                USER + ADMIN PLATFORM
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              Food Finder
            </h1>

            <p className="mt-4 text-xl font-light text-zinc-300 md:text-2xl">
              An AI-powered food discovery platform combining intelligent
              search, recipe management, caching and automation.
            </p>

            <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-500">
              Food Finder brings together a consumer-facing recipe platform
              and a dedicated administration application. The system combines
              Flask, Spring Boot, MySQL, Redis and Gemini AI to create a
              searchable, conversational and manageable recipe ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-xl"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <GlassCard>
                <span className="text-xs text-cyan-400">01</span>
                <h3 className="mt-5 text-lg font-medium">Discover</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Search recipes using autocomplete, fuzzy matching and AI
                  fallback.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">02</span>
                <h3 className="mt-5 text-lg font-medium">Manage</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Admin tools provide controlled recipe and platform
                  management.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">03</span>
                <h3 className="mt-5 text-lg font-medium">Automate</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  UI and API automation provide repeatable validation and
                  Allure reporting.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="01"
            title="What is Food Finder?"
            subtitle="A two-sided food platform designed around discovery for users and control for administrators."
          />

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <p className="text-lg leading-9 text-zinc-300">
                Food Finder connects recipe discovery, intelligent search,
                conversational AI, persistent data and administration into one
                application ecosystem.
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                The User App focuses on making recipes easy to find and explore,
                while the Admin App provides the management and operational
                capabilities required to maintain the platform.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                System architecture
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="02"
            title="Platform at a Glance"
            subtitle="The architecture combines multiple application layers instead of treating recipe search as a simple CRUD experience."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              value="2"
              label="Application Surfaces"
              detail="Separate User App and Admin App experiences."
            />
            <MetricCard
              value="AI"
              label="Gemini Intelligence"
              detail="AI-assisted discovery and conversational interaction."
            />
            <MetricCard
              value="SQL"
              label="Persistent Recipes"
              detail="MySQL provides the core application data store."
            />
            <MetricCard
              value="Redis"
              label="Fast Access"
              detail="Caching and intent-related operations reduce repeated work."
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Apps */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="03"
            title="Two Applications. One Platform."
            subtitle="Explore the two sides of Food Finder using the same flip interaction used throughout the portfolio."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <AppFlipCard
              type="User App"
              description="The consumer-facing application focuses on recipe discovery, category navigation, intelligent search and conversational assistance."
              features={[
                "Recipe discovery and category navigation",
                "Veg / Non-Veg / Tiffins category filtering",
                "Search autocomplete with top suggestions",
                "Fuzzy recipe matching",
                "Gemini AI fallback for difficult searches",
                "Gemini-powered recipe chatbot",
              ]}
            />

            <AppFlipCard
              type="Admin App"
              accent="purple"
              description="The administration application provides the operational layer for managing users, recipes, data and platform analytics."
              features={[
                "Secure admin authentication and account management",
                "Recipe CRUD and image management",
                "User tracking and duplicate-data detection",
                "Real-time platform analytics",
                "Natural-language Gemini database commands",
                "AI-assisted code and documentation workflows",
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Search */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="04"
            title="Intelligent Recipe Search"
            subtitle="Search is designed as a layered system so users are not dependent on exact wording."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Autocomplete",
                "Suggestions appear while the user types, reducing friction before the request is submitted.",
              ],
              [
                "Top Suggestions",
                "The search experience surfaces a focused set of likely recipe matches rather than overwhelming the user.",
              ],
              [
                "Fuzzy Matching",
                "Recipe matching tolerates wording and spelling differences so users can find relevant results without exact input.",
              ],
              [
                "AI Fallback",
                "When conventional search cannot identify a suitable match, Gemini AI can provide an intelligent fallback path.",
              ],
              [
                "Category Navigation",
                "Veg, Non-Veg and Tiffins provide a simple browsing path alongside search.",
              ],
              [
                "Conversational Discovery",
                "The chatbot adds a natural-language interface on top of the recipe platform.",
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
            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 text-center">
                <span className="text-xs text-zinc-600">INPUT</span>
                <h3 className="mt-2 font-medium">User Query</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Natural language
                </p>
              </div>

              <div className="text-center text-xl text-cyan-400">→</div>

              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-5 text-center">
                <span className="text-xs text-zinc-600">PRIMARY</span>
                <h3 className="mt-2 font-medium">Search + Fuzzy Match</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Fast conventional path
                </p>
              </div>

              <div className="text-center text-xl text-cyan-400">→</div>

              <div className="rounded-2xl border border-purple-400/10 bg-purple-400/[0.035] p-5 text-center">
                <span className="text-xs text-zinc-600">FALLBACK</span>
                <h3 className="mt-2 font-medium">Gemini AI</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Intelligent assistance
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* Admin intelligence */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="05"
            title="Admin Intelligence"
            subtitle="The Admin App extends beyond CRUD with analytics and natural-language operational capabilities."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Recipe Operations",
                "Create, update, delete and manage recipe content and associated images.",
              ],
              [
                "User Tracking",
                "Surface user activity and platform-level information for administrators.",
              ],
              [
                "Duplicate Detection",
                "Identify duplicate user or data records to keep the platform cleaner.",
              ],
              [
                "Analytics",
                "Expose users, recipes, categories, active users and duplicate-data metrics.",
              ],
              [
                "Natural-Language Commands",
                "Gemini-assisted commands can translate administrative intent into database operations.",
              ],
              [
                "AI-Assisted Engineering",
                "The administration workflow includes AI-assisted code and documentation capabilities.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-purple-400">
                  ADMIN
                </span>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Data */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="06"
            title="Data & Performance"
            subtitle="Persistent storage and caching work together to keep the application responsive while retaining application state."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                MySQL
              </p>
              <h3 className="mt-6 text-2xl font-medium">
                Persistent application data
              </h3>
              <p className="mt-4 leading-8 text-zinc-500">
                MySQL provides the persistent data layer for recipes, users and
                the application&apos;s managed information.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Recipe records",
                  "User records",
                  "Administrative data",
                  "Structured relational persistence",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                Redis
              </p>
              <h3 className="mt-6 text-2xl font-medium">
                Fast-path operations
              </h3>
              <p className="mt-4 leading-8 text-zinc-500">
                Redis supports caching and intent-related processing so
                frequently repeated operations do not always require the full
                application path.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Cache", "Repeated data access"],
                  ["Intent", "Fast command handling"],
                  ["Performance", "Reduced repeated work"],
                  ["Resilience", "Separation of fast-path data"],
                ].map(([title, description]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <h4 className="text-sm font-medium">{title}</h4>
                    <p className="mt-1 text-xs leading-5 text-zinc-600">
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      {/* AI */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="07"
            title="Gemini AI Layer"
            subtitle="AI is used as an intelligence layer around the application rather than replacing the underlying data and application logic."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "Recipe Search Fallback",
                "When conventional matching does not produce a useful result, Gemini provides an intelligent fallback experience.",
              ],
              [
                "Conversational Assistant",
                "Users can interact with the recipe system through a Gemini-powered chatbot.",
              ],
              [
                "Admin Commands",
                "Administrators can express operational intent in natural language rather than relying only on rigid UI actions.",
              ],
              [
                "Engineering Assistance",
                "The platform also incorporates AI-assisted code and documentation workflows within the administration experience.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.06] text-lg text-cyan-300">
                    ✦
                  </div>
                  <h3 className="text-lg font-medium">{title}</h3>
                </div>
                <p className="mt-5 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Backend architecture */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="08"
            title="Application Architecture"
            subtitle="The project uses distinct application responsibilities while sharing the platform's data, AI and operational concerns."
          />

          <GlassCard className="overflow-hidden p-4 md:p-6">
            <div className="grid gap-3 md:grid-cols-5">
              {[
                ["01", "User", "Flask User App"],
                ["02", "Services", "Spring Boot"],
                ["03", "Data", "MySQL"],
                ["04", "Cache", "Redis"],
                ["05", "AI", "Gemini"],
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

      {/* Testing */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="09"
            title="Testing & Automation"
            subtitle="Food Finder is supported by dedicated UI and API automation rather than relying only on manual validation."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "Selenium",
                "Automates browser-level Admin App workflows and validates the user interface.",
              ],
              [
                "REST Assured",
                "Provides API-level automation for repeatable service validation.",
              ],
              [
                "Allure",
                "Turns automated execution into structured test reports that are easier to inspect and communicate.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  AUTOMATION
                </span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>

          <GlassCard className="mt-6">
            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 text-center">
                <span className="text-xs text-zinc-600">UI</span>
                <h3 className="mt-2 font-medium">Selenium</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Browser workflows
                </p>
              </div>
              <div className="text-center text-xl text-cyan-400">→</div>
              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.035] p-5 text-center">
                <span className="text-xs text-zinc-600">API</span>
                <h3 className="mt-2 font-medium">REST Assured</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Service validation
                </p>
              </div>
              <div className="text-center text-xl text-cyan-400">→</div>
              <div className="rounded-2xl border border-purple-400/10 bg-purple-400/[0.035] p-5 text-center">
                <span className="text-xs text-zinc-600">REPORT</span>
                <h3 className="mt-2 font-medium">Allure</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Execution intelligence
                </p>
              </div>
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      {/* Engineering decisions */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="10"
            title="Engineering Decisions"
            subtitle="The platform is designed around layered search, separated responsibilities and practical automation."
          />

          <div className="space-y-4">
            {[
              [
                "Search first, AI second",
                "Conventional search and fuzzy matching remain the fast primary path while Gemini provides intelligence when deterministic matching is insufficient.",
              ],
              [
                "Separate user and admin experiences",
                "The consumer workflow and operational workflow have different goals, so they are treated as distinct application surfaces.",
              ],
              [
                "Persistent data with a fast cache",
                "MySQL remains the persistent source while Redis helps reduce repeated work and improve responsiveness.",
              ],
              [
                "AI as an intelligence layer",
                "Gemini enhances discovery, conversation and administration without replacing the underlying application architecture.",
              ],
              [
                "Automation as part of engineering",
                "Selenium, REST Assured and Allure make repeatable validation part of the project rather than an afterthought.",
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

      {/* Food Finder UI Explorer */}
      <FoodFinderUIExplorer />

      {/* Closing */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/[0.12] bg-cyan-400/[0.025] p-8 text-center backdrop-blur-2xl md:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

            <div className="relative">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                Food Finder
              </span>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                Turning recipe discovery into an intelligent full-stack
                experience.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-zinc-500">
                Food Finder combines a consumer recipe platform, an
                administration system, intelligent search, Gemini AI, MySQL,
                Redis and automation into one engineering project.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="https://github.com/itachi200218/Food-finder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-6 py-3 text-sm text-cyan-300 transition hover:-translate-y-0.5 hover:bg-cyan-400/[0.1] hover:text-cyan-200"
                >
                  View on GitHub ↗
                </Link>

                <Link
                  href="/"
                  className="rounded-full border border-white/[0.08] px-6 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}