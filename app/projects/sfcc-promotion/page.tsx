"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


const technologies = [
  "Java",
  "Spring Boot",
  "REST Assured",
  "TestNG",
  "Cucumber (BDD)",
  "Allure",
  "Markdown",
  "HTML",
  "Maven",
  "Properties / JSON",
  "SCAPI",
  "OCAPI",
  "React",
];

const frameworkImages = [
  "/projects/sfcc-promotion/sfcc-promotion-automation-platform.jpg",
];

/*
  Add the real Platform UI screenshots here when their filenames are known.
  Example:
  "/projects/sfcc-promotion/platform1.jpg",
  "/projects/sfcc-promotion/platform2.jpg",
*/
const platformImages: string[] = [];

const keyCapabilities = [
  "Supports Guest and Logged-in flows",
  "Supports UK and ROI environments",
  "Config-driven execution",
  "Reusable and modular components",
  "Automatic promotion detection from OCAPI",
  "Basket, Item and Order validation",
  "Multiple promotion types",
  "Detailed HTML, Markdown and Allure reporting",
  "Downloadable validation reports",
  "Web UI for execution and tracking",
  "Cucumber BDD support",
  "Extensible for future enhancements",
];

const promotionTypes = [
  "Multiplier Promotions",
  "Bonus Promotions",
  "List A Promotions",
  "List B Promotions",
  "Threshold Promotions",
  "Exclusion Promotions",
  "Sitewide Promotions",
];

const sectionTabs = [
  ["01", "Problem", "problem"],
  ["02", "Manual → Auto", "automation"],
  ["03", "Overview", "overview"],
  ["04", "Products", "products"],
  ["05", "Architecture", "architecture"],
  ["06", "Execution", "execution"],
  ["07", "Flows", "flows"],
  ["08", "Engine", "engine"],
  ["09", "Rules", "rules"],
  ["10", "Config", "config"],
  ["11", "Reporting", "reporting"],
  ["12", "Decisions", "decisions"],
] as const;

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
      },
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
      `${((y / rect.height) - 0.5) * -2.5}deg`,
    );
    element.style.setProperty(
      "--rotate-y",
      `${((x / rect.width) - 0.5) * 2.5}deg`,
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

export default function SFCCPromotionValidationCaseStudy() {
  const router = useRouter();
  const [mobileSectionsOpen, setMobileSectionsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

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
    <main className="min-h-screen scroll-smooth overflow-x-clip bg-[#02030a] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[4%] h-[460px] w-[460px] rounded-full bg-cyan-500/[0.07] blur-[150px]" />
        <div className="absolute right-[2%] top-[30%] h-[540px] w-[540px] rounded-full bg-purple-500/[0.065] blur-[170px]" />
        <div className="absolute bottom-[4%] left-[30%] h-[480px] w-[480px] rounded-full bg-blue-500/[0.05] blur-[160px]" />
      </div>

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
            <span>SFCC Promotion Validation</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Case Study</span>
          </div>
        </div>
      </nav>

      {/* SECTION NAVIGATION */}
      <div className="sticky top-[69px] z-40 border-b border-white/[0.06] bg-black/45 backdrop-blur-2xl backdrop-saturate-[180%]">
        {/* Desktop: full section tabs */}
        <div className="mx-auto hidden max-w-7xl overflow-x-auto px-4 py-2.5 scrollbar-hide lg:block lg:px-10">
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

      <ScrollReveal>
        <section id="top" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
          <div className="max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">
                ENTERPRISE ENGINEERING PLATFORM
              </span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs tracking-wider text-zinc-500">
                SFCC VALIDATION INFRASTRUCTURE
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              SFCC Promotion
              <br />
              Validation Platform
            </h1>

            <p className="mt-5 max-w-4xl text-xl font-light leading-8 text-zinc-300 md:text-2xl">
              A reusable enterprise validation platform for executing,
              validating and reporting complex Salesforce Commerce Cloud
              promotion scenarios.
            </p>

            <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-500">
              The solution combines a reusable validation framework with a web
              execution layer, separating business-flow orchestration, API clients,
              validation strategies and reporting while supporting SCAPI/OCAPI,
              configuration-driven execution and multiple entry points.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 backdrop-blur-xl"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <GlassCard>
                <span className="text-xs text-cyan-400">01</span>
                <h3 className="mt-5 text-lg font-medium">Configure</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Select environment, product IDs, promotion ID and execution
                  entry point.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">02</span>
                <h3 className="mt-5 text-lg font-medium">Execute</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Orchestrate authentication, basket, product, customer and
                  order flows through reusable clients, with execution able to
                  stop at basket or continue through order validation.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">03</span>
                <h3 className="mt-5 text-lg font-medium">Validate</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Compare expected versus actual promotion behavior and
                  generate structured reports.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Engineering Highlights */}
      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl">
            <div className="grid divide-y divide-white/[0.06] md:grid-cols-4 md:divide-x md:divide-y-0">
              {[
                ["02", "API Systems", "SCAPI · OCAPI"],
                ["Many", "Promotion Rules", "Extensible calculation strategies"],
                ["03", "Report Formats", "HTML · Markdown · Allure"],
                ["03", "Execution Entry Points", "Web UI · BDD · TestNG"],
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

      <ScrollReveal>
        <section id="problem" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="01"
            title="The Engineering Problem"
            subtitle="The hardest part is not executing a promotion — it is calculating and validating the right business formula for every promotion type across a complete commerce journey."
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <p className="text-lg leading-9 text-zinc-300">
                SFCC promotions are not one calculation problem. Product-level discounts,
                Multiplier, Bonus, List A, List B, Threshold, Exclusion, Sitewide
                and other promotion scenarios can each follow different business
                rules and formulas.
                Manually calculating the expected discount and then validating
                it through the customer journey takes significant time and is
                easy to get wrong.
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                The framework turns those rules into reusable promotion-specific
                strategies. It can run the journey from customer login through
                basket and all the way to order, or stop at the exact validation
                point required, while automatically calculating expected results,
                comparing them with SFCC and producing detailed evidence.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                What the framework eliminates
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Manual promotion calculations",
                  "Promotion-specific formula handling",
                  "Basket / item / order validation",
                  "Guest and logged-in journeys",
                  "Expected vs actual comparison",
                  "Detailed validation reporting",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3"
                  >
                    <span className="text-xs text-zinc-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="automation" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="02"
            title="From Manual Calculation to Automated Validation"
            subtitle="The framework replaces repeated manual promotion calculations with reusable promotion strategies that execute the commerce journey, calculate expected results and validate live SFCC behavior."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="min-h-[320px]">
              <span className="text-xs uppercase tracking-[0.2em] text-red-300">
                BEFORE
              </span>
              <h3 className="mt-6 text-3xl font-medium">
                Manual promotion validation
              </h3>
              <p className="mt-5 leading-8 text-zinc-500">
                Each promotion type can require a different formula. Engineers
                would need to understand the rule, calculate expected values,
                execute the customer journey and manually compare multiple
                basket, item and order values.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Different formula per business rule",
                  "Manual expected-value calculation",
                  "Long end-to-end validation",
                  "Repeated comparison work",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-red-400/[0.08] bg-red-400/[0.02] p-4 text-sm text-zinc-400"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="min-h-[320px]">
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">
                AFTER
              </span>
              <h3 className="mt-6 text-3xl font-medium">
                Automated calculation + validation
              </h3>
              <p className="mt-5 leading-8 text-zinc-500">
                The framework selects the appropriate promotion strategy,
                calculates the expected result, executes the required flow
                from login through basket or order, compares the live SFCC
                response and generates traceable validation evidence.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Rule-specific strategies",
                  "Automatic formula calculation",
                  "Basket-to-order execution",
                  "Explainable validation report",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-cyan-400/[0.08] bg-cyan-400/[0.02] p-4 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="overview" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="03"
            title="Platform at a Glance"
            subtitle="The solution separates execution entry points from reusable business flows, API clients, framework utilities and the promotion validation engine."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              value="5+"
              label="Core Layers"
              detail="Execution, flow, API client, framework core and validation engine."
            />
            <MetricCard
              value="2"
              label="API Systems"
              detail="SCAPI and OCAPI communication paths."
            />
            <MetricCard
              value="3"
              label="Report Formats"
              detail="HTML, Markdown and Allure reporting."
            />
            <MetricCard
              value="2"
              label="Execution Styles"
              detail="Web UI plus automation entry points such as BDD and TestNG."
            />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="products" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="04"
            title="Two Connected Products"
            subtitle="The framework provides the reusable engineering core while the platform UI makes execution and tracking accessible to users."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <GlassCard className="min-h-[360px]">
              <span className="inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                FRAMEWORK
              </span>
              <h3 className="mt-7 text-3xl font-medium">
                Promotion Validation Framework
              </h3>
              <p className="mt-5 leading-8 text-zinc-500">
                Reusable Java/Spring Boot automation components orchestrate
                business flows, communicate with SCAPI/OCAPI and execute
                promotion-specific validation strategies.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Reusable API methods",
                  "Environment manager",
                  "Header / token management",
                  "Dynamic endpoint builder",
                  "Basket management",
                  "Config manager",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="min-h-[360px]">
              <span className="inline-flex rounded-full border border-purple-400/15 bg-purple-400/[0.06] px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-300">
                PLATFORM UI
              </span>
              <h3 className="mt-7 text-3xl font-medium">
                Promotion Automation Platform
              </h3>
              <p className="mt-5 leading-8 text-zinc-500">
                A React web interface provides promotion search, execution,
                tracking and report access around the underlying automation
                framework.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Promotion search",
                  "Flow execution",
                  "Report viewing",
                  "Execution tracking",
                  "Config-driven workflows",
                  "Downloadable validation results",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/[0.07] bg-black/20 p-4 text-sm text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="architecture" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="05"
            title="High-Level Architecture"
            subtitle="The complete platform flow, from execution entry points through business-flow orchestration and API communication to the promotion validation engine."
          />

          <GlassCard className="overflow-hidden p-2 md:p-3">
            <div className="overflow-hidden rounded-[1.35rem] border border-white/[0.08] bg-black/50">
              <Image
                src="/projects/sfcc-promotion/sfcc-promotion-automation-platform.jpg"
                alt="SFCC Promotion Automation Platform high level flowchart"
                width={1024}
                height={1536}
                className="h-auto w-full"
                priority
              />
            </div>
          </GlassCard>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Execution Layer", "React Web UI, Cucumber BDD and TestNG Suite."],
              ["Flow Layer", "Authentication, Basket, Product, Customer and Order flows."],
              ["API Client Layer", "Dedicated clients for Login, Guest, Basket, Product, Customer and Promotion."],
              ["Framework Core", "Reusable APIs, environment, headers, endpoints, basket and configuration."],
              ["Validation Engine", "Promotion detection, strategy execution, validation and expected-vs-actual comparison."],
              ["External Systems", "SCAPI and OCAPI provide the Commerce Cloud communication layer."],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="execution" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="06"
            title="Execution Layer"
            subtitle="The same underlying framework can be entered through different execution mechanisms depending on how a validation scenario needs to run."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              [
                "React Web UI",
                "Promotion search, execution controls and report viewing for easy execution and tracking.",
              ],
              [
                "Cucumber BDD",
                "Feature files and scenarios provide behavior-oriented validation entry points.",
              ],
              [
                "TestNG Suite",
                "XML-based suite execution supports repeatable automated test runs.",
              ],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  ENTRY POINT
                </span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="flows" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="07"
            title="Business Flow Orchestration"
            subtitle="Reusable flows keep business actions separate from low-level API communication."
          />

          <div className="grid gap-3 md:grid-cols-5">
            {[
              ["01", "Authentication", "Guest and logged-in"],
              ["02", "Basket", "Create, add, update, delete"],
              ["03", "Product", "Search, details, validation"],
              ["04", "Customer", "Profile, addresses, Advantage Card"],
              ["05", "Order", "Create, validate, cancel, return"],
            ].map(([number, title, description]) => (
              <GlassCard key={number} className="p-5">
                <span className="text-xs text-cyan-400">{number}</span>
                <h3 className="mt-4 font-medium">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-600">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="engine" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="08"
            title="Promotion Validation Engine"
            subtitle="Each promotion or discount scenario can map to its own calculation strategy, allowing the framework to compute expected results automatically and validate them against live SFCC behaviour."
          />

          <GlassCard>
            <div className="grid gap-3 md:grid-cols-6">
              {[
                ["01", "Read Config", "Scenario"],
                ["02", "Detect Type", "Promotion"],
                ["03", "Calculate", "Type-specific formula"],
                ["04", "Execute", "Customer journey"],
                ["05", "Validate", "Basket / Item / Order"],
                ["06", "Report", "Expected / Actual"],
              ].map(([number, title, detail], index) => (
                <div key={number} className="relative">
                  <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.025] p-4">
                    <span className="text-xs text-red-300">{number}</span>
                    <h3 className="mt-3 text-sm font-medium">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-zinc-600">
                      {detail}
                    </p>
                  </div>
                  {index < 5 && (
                    <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-zinc-600 md:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="rules" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="09"
            title="Promotion & Business-Rule Coverage"
            subtitle="The framework is built for a broad and extensible set of SFCC promotion scenarios. Different promotion and discount behaviours can use their own calculation and validation strategy while sharing the same execution pipeline."
          />

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <GlassCard className="min-h-[420px]">
              <span className="text-xs uppercase tracking-[0.2em] text-purple-400">
                RULE TYPES
              </span>

              <h3 className="mt-6 text-3xl font-medium">
                Different rules. One validation engine.
              </h3>

              <p className="mt-5 leading-8 text-zinc-500">
                Promotion logic can vary significantly between scenarios. The
                framework provides a reusable foundation while allowing the
                calculation and validation behaviour to change according to
                the promotion or discount rule being exercised.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  "Product-level discounts",
                  "Multiplier promotions",
                  "Bonus promotions",
                  "List A / List B rules",
                  "Threshold promotions",
                  "Exclusion rules",
                  "Sitewide promotions",
                  "Other extensible promotion scenarios",
                ].map((type, index) => (
                  <div
                    key={type}
                    className="rounded-2xl border border-purple-400/[0.08] bg-purple-400/[0.02] p-4"
                  >
                    <span className="text-xs text-purple-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm text-zinc-300">{type}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="min-h-[420px]">
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                STRATEGY MODEL
              </span>

              <h3 className="mt-6 text-2xl font-medium">
                Reuse the platform. Change the business rule.
              </h3>

              <div className="mt-7 space-y-3">
                {[
                  ["01", "Identify", "Determine the promotion / discount scenario."],
                  ["02", "Calculate", "Apply the corresponding business formula."],
                  ["03", "Execute", "Run the required customer and commerce flow."],
                  ["04", "Validate", "Check basket, item and order behaviour."],
                  ["05", "Explain", "Capture formulas, values and differences."],
                  ["06", "Report", "Produce detailed validation evidence."],
                ].map(([number, title, description]) => (
                  <div
                    key={number}
                    className="flex gap-4 rounded-2xl border border-white/[0.07] bg-black/20 p-4"
                  >
                    <span className="pt-0.5 text-xs text-cyan-400">{number}</span>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-200">{title}</h4>
                      <p className="mt-1 text-xs leading-5 text-zinc-600">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="config" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="10"
            title="Configuration-Driven Execution"
            subtitle="Users configure only the values required for a validation run while the framework handles the reusable execution machinery."
          />

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Environment", "UK / ROI"],
              ["Product IDs", "Configured"],
              ["Promotion ID", "Configured"],
              ["Execution Type", "Selected entry point"],
            ].map(([title, detail]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  CONFIG
                </span>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm text-zinc-500">{detail}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="reporting" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="11"
            title="Calculation-Aware Reporting"
            subtitle="The framework does not stop at PASS or FAIL. Every run explains how the expected value was calculated, what SFCC returned, where the values differ and why the final validation passed or failed."
          />

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassCard className="min-h-[430px]">
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                REPORTING ENGINE
              </span>

              <h3 className="mt-6 text-3xl font-medium">
                From execution result to explainable evidence.
              </h3>

              <p className="mt-5 leading-8 text-zinc-500">
                The generated HTML report captures the complete validation
                context — environment, site, promotion configuration, basket
                and order state, item-level values, formulas, runtime
                calculations and expected-versus-actual comparisons.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Promotion configuration & execution context",
                  "Basket and order validation summaries",
                  "Item-level expected vs actual values",
                  "Runtime formulas and intermediate calculations",
                  "Rounding / accepted tolerance explanations",
                  "Final verification and execution status",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 px-4 py-3"
                  >
                    <span className="text-xs text-cyan-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="min-h-[430px]">
              <span className="text-xs uppercase tracking-[0.2em] text-purple-400">
                CALCULATION TRACE
              </span>

              <h3 className="mt-6 text-2xl font-medium">
                The report shows the reasoning behind the result.
              </h3>

              <div className="mt-7 space-y-3">
                {[
                  ["01", "Basket Base Points", "Basket Amount × Base Point Rate"],
                  ["02", "Promotion Formula", "Promotion-specific threshold / rule"],
                  ["03", "Expected Result", "Calculated before comparison"],
                  ["04", "Item Distribution", "Base / bonus allocation per item"],
                  ["05", "SFCC Actual", "Value returned by the platform"],
                  ["06", "Difference", "Mismatch or accepted rounding variance"],
                ].map(([number, title, formula]) => (
                  <div
                    key={number}
                    className="grid gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 md:grid-cols-[48px_0.8fr_1.2fr] md:items-center"
                  >
                    <span className="text-xs text-purple-300">{number}</span>
                    <span className="text-sm font-medium text-zinc-200">
                      {title}
                    </span>
                    <span className="text-xs leading-5 text-zinc-500">
                      {formula}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-cyan-400/[0.12] bg-cyan-400/[0.025] p-5">
                <p className="text-sm leading-7 text-zinc-400">
                  <span className="text-cyan-300">Result:</span>{" "}
                  engineers can trace a promotion from configuration to
                  calculation to live SFCC response without manually
                  reconstructing the formula.
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["HTML", "Detailed browser-friendly validation results with calculations and evidence."],
              ["Markdown", "Portable execution summaries for engineering workflows and review."],
              ["Allure", "Structured automation reporting for execution steps, assertions and analysis."],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  REPORT FORMAT
                </span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="decisions" className="relative scroll-mt-32 z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="12"
            title="Engineering Decisions"
            subtitle="The architecture favors reuse, separation of responsibilities and configuration over one-off automation."
          />

          <div className="space-y-4">
            {[
              [
                "Separate business flows from API clients",
                "Business orchestration remains readable while low-level SCAPI/OCAPI communication is centralized in dedicated clients.",
              ],
              [
                "Encode each promotion formula once",
                "Promotion-specific calculations and expected-vs-actual validation live in dedicated strategies instead of being manually recreated for every scenario.",
              ],
              [
                "Support multiple execution entry points",
                "React UI, Cucumber and TestNG can drive the same underlying automation capabilities.",
              ],
              [
                "Configuration over hardcoding",
                "Environment, product and promotion inputs are supplied through configuration so the framework can be reused across scenarios.",
              ],
              [
                "Reports as engineering evidence",
                "HTML, Markdown and Allure outputs turn automation execution into inspectable validation results.",
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

      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/[0.12] bg-cyan-400/[0.025] p-8 text-center backdrop-blur-2xl md:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[90px]" />

            <div className="relative">
              <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
                SFCC PROMOTION VALIDATION
              </span>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                From manual promotion calculations to reusable validation intelligence.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-zinc-500">
                The framework combines extensible promotion and discount calculation strategies
                with reusable customer flows, SFCC API communication, expected-vs-actual
                validation and detailed calculation-aware reporting in one enterprise
                engineering system.
              </p>

              <div className="mt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Enterprise Engineering Work
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="group inline-flex items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-6 py-3 text-sm text-cyan-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-400/[0.11] hover:text-white"
                  >
                    Back to Portfolio
                    <span className="ml-2 transition-transform duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
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
