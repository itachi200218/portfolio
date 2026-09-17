"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const technologies = [
  "Java",
  "Spring Boot",
  "SFCC",
  "REST APIs",
  "SQL",
  "CI/CD",
  "Enterprise Frameworks",
  "PWA",
  "Cucumber",
];

const engineeringAreas = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Frontend engineering delivered through sprint requirements, application workflows, and enterprise commerce experiences.",
    items: [
      "PWA / frontend engineering",
      "Enterprise UI workflows",
      "Frontend feature changes",
      "UI workflow implementation",
      "Sprint implementation",
      "Maintenance and enhancements",
    ],
  },
  {
    number: "02",
    title: "Backend Engineering",
    description:
      "Backend engineering work across services, APIs, business workflows, integrations, and reusable capabilities.",
    items: [
      "Backend services",
      "REST API integration",
      "Business workflows",
      "Business-rule implementation",
      "Backend feature delivery",
      "Reusable backend capabilities",
    ],
  },
  {
    number: "03",
    title: "THOR Framework",
    description:
      "A major part of my day-to-day work is building, maintaining, and extending Cognizant's large, long-running enterprise THOR framework.",
    items: [
      "Frontend framework engineering",
      "Backend framework engineering",
      "Reusable framework components",
      "Framework enhancements",
      "Existing capability improvements",
      "New framework capabilities",
    ],
  },
  {
    number: "04",
    title: "SFCC Engineering",
    description:
      "Hands-on Salesforce Commerce Cloud configuration and commerce workflow support across a wide range of business scenarios.",
    items: [
      "Product configuration",
      "Customer configuration",
      "Customer groups",
      "Clubs",
      "Promotion configuration",
      "Commerce scenario setup",
      "Additional SFCC platform configuration",
    ],
  },
  {
    number: "05",
    title: "Sprint & Ticket Delivery",
    description:
      "Regular sprint delivery across application changes, defects, enhancements, framework work, and enterprise workflows.",
    items: [
      "Sprint ticket implementation",
      "Defect investigation",
      "Feature enhancements",
      "Application maintenance",
      "CI/CD activities",
      "Cross-functional delivery",
    ],
  },
  {
    number: "06",
    title: "Platform Development",
    description:
      "Building reusable engineering platforms and internal capabilities that solve recurring technical and business problems.",
    items: [
      "SFCC Promotion Validation Platform",
      "LoggerAI",
      "KM Portal",
      "Reusable backend capabilities",
      "Business-rule execution",
      "Diagnostics and reporting",
    ],
  },
  {
    number: "07",
    title: "Technical Ownership",
    description:
      "Supporting the offshore team as a technical point of contact while coordinating engineering work and resolving technical issues.",
    items: [
      "Offshore technical POC",
      "Technical issue resolution",
      "Knowledge sharing",
      "Team technical support",
      "Onsite / offshore coordination",
      "Requirement clarification",
    ],
  },
];

const platformWork = [
  {
    number: "01",
    title: "SFCC Promotion Validation Platform",
    description:
      "Reusable platform for complex promotion scenarios, business-rule execution, expected-vs-actual comparison, and structured reporting.",
    href: "/projects/sfcc-promotion",
  },
  {
    number: "02",
    title: "LoggerAI",
    description:
      "Java / Spring Boot diagnostic platform that analyzes framework logs and report data to identify root causes, explain failures, and surface actionable solutions.",
    href: "/projects/loggerai",
  },
  {
    number: "03",
    title: "KM Portal",
    description:
      "Internal knowledge and learning platform with structured workflows, scoring, user tracking, and duplicate prevention.",
    href: "/projects/km-portal",
  },
];

const thorCapabilities = [
  [
    "01",
    "Frontend Framework",
    "Maintain and enhance the frontend side of Cognizant's long-running THOR framework.",
  ],
  [
    "02",
    "Backend Framework",
    "Maintain backend framework capabilities, shared services, utilities, and reusable components.",
  ],
  [
    "03",
    "Framework Evolution",
    "Improve existing capabilities and introduce new reusable framework functionality as requirements evolve.",
  ],
  [
    "04",
    "Enterprise Delivery",
    "Work within a mature enterprise codebase while preserving existing capabilities and delivery stability.",
  ],
];

const sfccScope = [
  ["01", "Products", "Product setup and configuration for commerce scenarios."],
  ["02", "Customers", "Customer configuration and account-related scenarios."],
  ["03", "Customer Groups", "Group configuration used by commerce workflows and business rules."],
  ["04", "Clubs", "Club-related setup and commerce scenario configuration."],
  ["05", "Promotions", "Promotion configuration and complex promotion scenarios."],
  ["06", "Commerce Flows", "Environment and scenario setup across broader SFCC workflows."],
];

const deliveryModel = [
  ["01", "Understand", "Analyze requirements, business rules, existing framework behavior, and sprint scope."],
  ["02", "Engineer", "Implement changes across framework, backend, frontend, platform, and commerce workflows."],
  ["03", "Integrate", "Connect changes with existing enterprise capabilities, APIs, configuration, and CI/CD."],
  ["04", "Deliver", "Complete sprint work, investigate issues, improve capabilities, and support the team."],
];

const sectionTabs = [
  ["01", "Scope", "scope"],
  ["02", "Work", "work"],
  ["03", "THOR", "thor"],
  ["04", "Platform", "platform"],
  ["05", "SFCC", "sfcc"],
  ["06", "Delivery", "delivery"],
  ["07", "Ownership", "ownership"],
  ["08", "Impact", "impact"],
  ["09", "Approach", "approach"],
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

export default function ProfessionalEngineeringExperience() {
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
            onClick={() => {
              sessionStorage.setItem("portfolio-restore-scroll", "true");
              router.push("/");
            }}
            className="group flex items-center gap-3 text-sm text-zinc-400 transition hover:text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] transition group-hover:bg-white/[0.1]">
              ←
            </span>
            Back to Portfolio
          </button>

          <div className="hidden items-center gap-6 text-xs text-zinc-500 md:flex">
            <span>Professional Engineering</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Cognizant · Boots UK</span>
          </div>
        </div>
      </nav>

      {/* SECTION NAVIGATION */}
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

      <ScrollReveal>
        <section id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 xl:pt-32">
          <div className="max-w-5xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">
                SOFTWARE ENGINEERING · ENTERPRISE PLATFORMS
              </span>
              <span className="text-xs text-zinc-600">•</span>
              <span className="text-xs tracking-wider text-zinc-500">
                COGNIZANT · BOOTS UK
              </span>
            </div>

            <h1 className="text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
              Professional
              <br />
              <span className="text-zinc-500">Engineering.</span>
            </h1>

            <p className="mt-5 max-w-4xl text-xl font-light leading-8 text-zinc-300 md:text-2xl">
              Software engineering across enterprise frameworks, backend and
              frontend systems, Salesforce Commerce Cloud, reusable platforms,
              and continuous sprint delivery.
            </p>

            <p className="mt-6 max-w-4xl text-base leading-8 text-zinc-500">
              A closer look at the engineering work behind my role at Cognizant:
              extending a large enterprise framework, building reusable
              platforms, working across frontend and backend systems, supporting
              SFCC commerce workflows, and taking ownership of delivery.
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
                <h3 className="mt-5 text-lg font-medium">Build</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Build reusable platforms, framework capabilities, backend
                  services, diagnostics, and internal applications.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">02</span>
                <h3 className="mt-5 text-lg font-medium">Engineer</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Work across frontend, backend, THOR, APIs, SFCC, commerce
                  workflows, and enterprise application changes.
                </p>
              </GlassCard>

              <GlassCard>
                <span className="text-xs text-cyan-400">03</span>
                <h3 className="mt-5 text-lg font-medium">Own</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Deliver sprint work, investigate issues, support the offshore
                  team, and act as a technical point of contact.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Enterprise Frameworks", "Frontend + backend work inside mature systems"],
              ["02", "Platform Engineering", "Reusable capabilities for recurring problems"],
              ["03", "Commerce Engineering", "SFCC configuration and business workflows"],
              ["04", "Technical Ownership", "Delivery, issue resolution and team support"],
            ].map(([value, title, detail]) => (
              <GlassCard key={title} className="p-6">
                <div className="text-2xl font-semibold tracking-tight text-white">{value}</div>
                <div className="mt-3 text-sm font-medium text-zinc-200">{title}</div>
                <div className="mt-2 text-xs leading-5 text-zinc-600">{detail}</div>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="scope" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="01"
            title="Engineering Scope"
            subtitle="The role spans reusable engineering, enterprise framework development, application work, commerce configuration, delivery and technical ownership across the Boots UK environment."
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <GlassCard>
              <p className="text-lg leading-9 text-zinc-300">
                My day-to-day role spans enterprise framework engineering,
                frontend and backend work, Salesforce Commerce Cloud,
                reusable platforms, sprint delivery, and technical ownership.
              </p>

              <p className="mt-6 leading-8 text-zinc-500">
                A major part of the role is working within Cognizant's
                long-running THOR framework: maintaining existing capabilities,
                extending shared components, implementing new functionality,
                and supporting both frontend and backend areas.
              </p>
            </GlassCard>

            <GlassCard>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                Core scope
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Enterprise framework engineering",
                  "Frontend and backend engineering",
                  "Platform development",
                  "Salesforce Commerce Cloud",
                  "Sprint and ticket delivery",
                  "Technical ownership",
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
        <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="02"
            title="Engineering Work"
            subtitle="A detailed view of the areas that make up my professional engineering contribution."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {engineeringAreas.slice(0, 4).map((area) => (
              <GlassCard key={area.number} className="min-h-[340px]">
                <span className="text-xs text-cyan-400">{area.number}</span>
                <h3 className="mt-6 text-2xl font-medium">{area.title}</h3>
                <p className="mt-4 text-sm leading-7 text-zinc-500">
                  {area.description}
                </p>

                <div className="mt-6 space-y-3">
                  {area.items.slice(0, 5).map((item, index) => (
                    <div key={`${area.number}-${index}-${item}`} className="flex items-start gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-700" />
                      <span className="text-sm leading-6 text-zinc-400">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="thor" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="03"
            title="THOR Framework"
            subtitle="A major part of my day-to-day work is building, maintaining, and extending Cognizant's large, long-running enterprise THOR framework."
          />

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <GlassCard className="min-h-[360px]">
              <span className="inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/[0.06] px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                ENTERPRISE FRAMEWORK
              </span>

              <h3 className="mt-7 text-3xl font-medium">
                Engineering inside a large, established enterprise system.
              </h3>

              <p className="mt-5 leading-8 text-zinc-500">
                I work across both frontend and backend areas of THOR,
                maintaining existing capabilities while implementing
                enhancements and extending the framework for new requirements.
              </p>
            </GlassCard>

            <div className="grid gap-4 sm:grid-cols-2">
              {thorCapabilities.map(([number, title, description]) => (
                <GlassCard key={number} className="min-h-[170px]">
                  <span className="text-xs text-cyan-400">{number}</span>
                  <h3 className="mt-5 text-lg font-medium">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-500">
                    {description}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="platform" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="04"
            title="Platform Development"
            subtitle="Reusable engineering capabilities created to solve recurring technical and business problems, with each platform focused on a distinct engineering need."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {platformWork.map((item) => (
              <Link
                key={item.number}
                href={item.href}
                className="group block h-full"
              >
                <GlassCard className="min-h-[300px] cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-cyan-400">
                      {item.number}
                    </span>

                    <span className="text-lg text-zinc-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400">
                      ↗
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-5 leading-8 text-zinc-500">
                    {item.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-sm text-zinc-600 transition-colors duration-300 group-hover:text-white">
                    <span>View project</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="sfcc" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="05"
            title="Salesforce Commerce Cloud"
            subtitle="Hands-on Salesforce Commerce Cloud engineering and configuration across products, customers, promotions, and broader commerce scenarios."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sfccScope.map(([number, title, description]) => (
              <GlassCard key={number}>
                <span className="text-xs text-purple-400">{number}</span>
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
        <section id="delivery" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="06"
            title="Delivery Across the Sprint"
            subtitle="Engineering work is delivered continuously through sprint requirements, technical tickets, issue investigation, enhancements, and enterprise workflows."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliveryModel.map(([number, title, description]) => (
              <GlassCard key={number}>
                <span className="text-xs text-cyan-400">{number}</span>
                <h3 className="mt-5 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Sprint implementation", "Implement requirements and technical changes within the sprint lifecycle."],
              ["Defect investigation", "Trace issues through application, framework, configuration, and integration layers."],
              ["Application maintenance", "Maintain existing capabilities while improving reliability and usability."],
              ["Feature enhancements", "Extend existing functionality and introduce new capabilities as requirements evolve."],
              ["CI/CD activities", "Work with delivery pipelines and the engineering workflow surrounding application changes."],
              ["Cross-functional delivery", "Coordinate with team members and stakeholders to move technical work to completion."],
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
        <section id="ownership" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="07"
            title="Technical Ownership"
            subtitle="Beyond implementation, the role includes supporting the offshore team and helping move technical work forward."
          />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              ["Offshore Technical POC", "Act as a technical point of contact for the offshore team."],
              ["Issue Resolution", "Investigate technical issues and help identify practical solutions."],
              ["Knowledge Sharing", "Share framework, application, and domain knowledge across the team."],
              ["Team Technical Support", "Support engineers during implementation and issue investigation."],
              ["Onsite / Offshore Coordination", "Help connect technical requirements and delivery across teams."],
              ["Requirement Clarification", "Clarify requirements and translate business needs into engineering work."],
            ].map(([title, description]) => (
              <GlassCard key={title}>
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                  OWNERSHIP
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
        <section id="impact" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="08"
            title="Measurable Impact"
            subtitle="One example of how reusable platform engineering changed the speed and consistency of an enterprise process."
          />

          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
            <GlassCard className="flex min-h-[300px] flex-col justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">
                PROMOTION VALIDATION
              </span>
              <div>
                <p className="text-7xl font-semibold tracking-tight text-white md:text-8xl">
                  5–10
                </p>
                <p className="mt-3 text-lg text-zinc-500">
                  minutes per promotion validation
                </p>
              </div>
            </GlassCard>

            <GlassCard className="min-h-[300px]">
              <h3 className="text-3xl font-medium">
                From a manual process to a reusable engineering platform.
              </h3>

              <p className="mt-6 text-lg leading-8 text-zinc-500">
                Built the SFCC Promotion Validation workflow for complex
                promotion scenarios and expected-vs-actual validation,
                reducing a process that previously took roughly 1–1.5 hours to
                approximately 5–10 minutes.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span className="rounded-full border border-white/[0.08] bg-black/20 px-4 py-2">
                  ~1–1.5 hours
                </span>
                <span className="text-cyan-400">→</span>
                <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-4 py-2 text-zinc-300">
                  ~5–10 minutes
                </span>
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section id="approach" className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <SectionHeading
            number="09"
            title="Engineering Approach"
            subtitle="The common thread across my professional work is building reusable capabilities while working effectively inside an established enterprise environment."
          />

          <div className="space-y-4">
            {[
              [
                "Build for reuse",
                "Prefer reusable framework, platform, service, and business components over isolated implementations.",
              ],
              [
                "Work across layers",
                "Move between frontend, backend, framework, configuration, integration, and delivery concerns when the work requires it.",
              ],
              [
                "Extend existing systems",
                "Improve mature enterprise capabilities while preserving existing behavior and supporting new requirements.",
              ],
              [
                "Solve recurring problems",
                "Turn repeated technical or business processes into reusable platforms and engineering capabilities.",
              ],
              [
                "Own delivery",
                "Take work from requirement understanding through implementation, issue resolution, integration, and sprint delivery.",
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
                PROFESSIONAL ENGINEERING
              </span>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                Building, maintaining and improving software inside a
                large-scale enterprise environment.
              </h2>

              <p className="mx-auto mt-6 max-w-3xl leading-8 text-zinc-500">
                My professional work spans software development, platform
                engineering, enterprise framework engineering, Salesforce
                Commerce Cloud, sprint delivery, and technical ownership.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
              sessionStorage.setItem("portfolio-restore-scroll", "true");
              router.push("/");
            }}
                  className="rounded-full border border-white/[0.08] px-6 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
