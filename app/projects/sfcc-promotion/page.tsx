"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


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
  return (
    <main className="min-h-screen scroll-smooth overflow-x-clip bg-[#02030a] text-white selection:bg-cyan-400/20 selection:text-cyan-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[5%] top-[4%] h-[460px] w-[460px] rounded-full bg-cyan-500/[0.07] blur-[150px]" />
        <div className="absolute right-[2%] top-[30%] h-[540px] w-[540px] rounded-full bg-purple-500/[0.065] blur-[170px]" />
        <div className="absolute bottom-[4%] left-[30%] h-[480px] w-[480px] rounded-full bg-blue-500/[0.05] blur-[160px]" />
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
            <span>SFCC Promotion Validation</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Case Study</span>
          </div>
        </div>
      </nav>

      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
          <div className="max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">
                ENTERPRISE COMMERCE AUTOMATION
              </span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs tracking-wider text-zinc-500">
                FRAMEWORK + PLATFORM UI
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              SFCC Promotion
              <br />
              Validation Platform
            </h1>

            <p className="mt-5 max-w-4xl text-xl font-light leading-8 text-zinc-300 md:text-2xl">
              A reusable enterprise automation platform for executing,
              validating and reporting complex Salesforce Commerce Cloud
              promotion scenarios.
            </p>

            <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-500">
              The solution combines a reusable validation framework with a web
              execution layer, supporting multiple entry points, business
              flows, SCAPI/OCAPI communication, configuration-driven execution
              and detailed promotion validation reporting.
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
                  order flows through reusable clients.
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

      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="01"
            title="The Engineering Problem"
            subtitle="Promotion validation becomes difficult when the same business rule can be reached through multiple flows, environments and promotion strategies."
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <p className="text-lg leading-9 text-zinc-300">
                A promotion can depend on basket contents, item
                qualification, customer state, Advantage Card information,
                product/category relationships and promotion type.
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                Instead of creating isolated automation for every promotion,
                the framework centralizes reusable API communication, business
                flows, configuration and validation logic.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Validation focus
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Promotion qualification",
                  "Basket / item / order behavior",
                  "Guest and logged-in journeys",
                  "Environment-specific execution",
                  "Expected vs actual comparison",
                  "Report generation",
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="02"
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="03"
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="04"
            title="High-Level Architecture"
            subtitle="The platform is organized as a layered pipeline from multiple execution entry points down to the promotion validation engine and external SFCC APIs."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="05"
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="06"
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="07"
            title="Promotion Validation Engine"
            subtitle="Promotion-specific business logic is centralized into a deterministic validation pipeline."
          />

          <GlassCard>
            <div className="grid gap-3 md:grid-cols-6">
              {[
                ["01", "Read Config", "OCAPI"],
                ["02", "Detect Type", "Promotion"],
                ["03", "Execute", "Strategy"],
                ["04", "Validate", "Basket / Item / Order"],
                ["05", "Compare", "Expected / Actual"],
                ["06", "Report", "HTML / MD / Allure"],
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="08"
            title="Promotion Coverage"
            subtitle="The engine is designed to support multiple promotion strategies instead of encoding one fixed promotion workflow."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {promotionTypes.map((type, index) => (
              <GlassCard key={type}>
                <span className="text-xs text-purple-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-medium">{type}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Promotion-specific validation strategy handled through the
                  reusable validation pipeline.
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="09"
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="10"
            title="Reporting & Validation Results"
            subtitle="The platform converts execution into structured validation evidence that can be inspected, shared and downloaded."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["HTML", "Detailed browser-friendly validation results."],
              ["Markdown", "Portable execution summaries for engineering workflows."],
              ["Allure", "Structured automation reporting for test analysis."],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  REPORT
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
        <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="11"
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
                "Centralize promotion validation",
                "Promotion calculations and expected-vs-actual validation live in a dedicated engine instead of being duplicated across scenarios.",
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
                From promotion complexity to reusable enterprise automation.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-zinc-500">
                A layered validation framework and platform UI bring promotion
                execution, business-flow orchestration, API communication and
                reporting into one reusable engineering system.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
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
