"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

export type TechnologyUsage = {
  project: string;
  href?: string;
  context: string;
};

export type Technology = {
  name: string;
  category: string;
  aliases?: string[];
  usage: TechnologyUsage[];
};

const PRIMARY_TECHNOLOGIES = new Set([
  "Java",
  "Spring Boot",
  "MySQL",
  "MongoDB",
  "SFCC",
  "OCAPI",
  "SCAPI",
  "Redis",
  "Azure",
  "AI",
  "REST APIs",
]);

const PORTFOLIO_CATEGORY_PROJECTS = {
  frameworks: new Set(["AllureIQ", "SFCC Promotion"]),
  platforms: new Set(["J.A.R.V.I.S", "Food Finder", "LoggerAI", "KM Portal"]),
} as const;

const TECHNOLOGIES: Technology[] = [
  {
    name: "Java",
    category: "Languages",
    aliases: ["java language", "jdk", "jvm"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Backend platform and service engineering" },
      { project: "AllureIQ", href: "/projects/allureiq", context: "Backend services and test intelligence" },
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Reusable validation framework and business-rule execution" },
      { project: "LoggerAI", href: "/projects/loggerai", context: "Diagnostic platform and log-analysis services" },
      { project: "KM Portal", href: "/projects/km-portal", context: "Backend platform and learning workflows" },
      { project: "Professional Experience", href: "/projects/experience", context: "Framework engineering, APIs and enterprise platform work" },
    ],
  },
  {
    name: "Python",
    category: "Languages",
    aliases: ["python3", "py"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "AI-enhanced backend and recipe discovery" },
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "AI services and intelligent platform capabilities" },
      { project: "Professional Experience", href: "/projects/experience", context: "Backend and automation engineering" },
    ],
  },
  {
    name: "TypeScript",
    category: "Languages",
    aliases: ["ts", "typescript"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Frontend and full-stack application development" },
      { project: "Portfolio", context: "Next.js portfolio application" },
    ],
  },
  {
    name: "JavaScript",
    category: "Languages",
    aliases: ["js", "javascript es6", "ecmascript"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Web application development" },
      { project: "Professional Experience", href: "/projects/experience", context: "PWA and frontend engineering" },
    ],
  },
  {
    name: "SQL",
    category: "Languages",
    aliases: ["structured query language"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "Relational persistence and recipe data" },
      { project: "Professional Experience", href: "/projects/experience", context: "Enterprise data and application workflows" },
    ],
  },
  {
    name: "Spring Boot",
    category: "Frameworks",
    aliases: ["spring", "springboot", "spring boot framework"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Backend services and platform APIs" },
      { project: "AllureIQ", href: "/projects/allureiq", context: "Backend services and test intelligence" },
      { project: "Food Finder", href: "/projects/food-finder", context: "Backend service layer" },
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Validation APIs and execution services" },
      { project: "LoggerAI", href: "/projects/loggerai", context: "Diagnostic backend platform" },
      { project: "KM Portal", href: "/projects/km-portal", context: "Backend platform services" },
      { project: "Professional Experience", href: "/projects/experience", context: "Framework and enterprise backend engineering" },
    ],
  },
  {
    name: "FastAPI",
    category: "Frameworks",
    aliases: ["fast api", "python fastapi"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "AI services and API layer" },
      { project: "Professional Experience", href: "/projects/experience", context: "Python API development" },
    ],
  },
  {
    name: "Flask",
    category: "Frameworks",
    aliases: ["python flask"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "Python backend services" },
      { project: "Professional Experience", href: "/projects/experience", context: "Backend and automation work" },
    ],
  },
  {
    name: "React",
    category: "Frontend",
    aliases: ["reactjs", "react.js"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Interactive frontend and real-time UI" },
      { project: "Professional Experience", href: "/projects/experience", context: "PWA and frontend engineering" },
    ],
  },
  {
    name: "Next.js",
    category: "Frontend",
    aliases: ["nextjs", "next js"],
    usage: [
      { project: "Portfolio", context: "Portfolio application and UI architecture" },
    ],
  },
  {
    name: "MongoDB",
    category: "Data",
    aliases: ["mongo", "mongodb database"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Persistent platform data and memory" },
      { project: "AllureIQ", href: "/projects/allureiq", context: "Test intelligence and report persistence" },
    ],
  },
  {
    name: "Redis",
    category: "Data",
    aliases: ["redis cache", "caching"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "Caching for fast recipe discovery" },
    ],
  },
  {
    name: "MySQL",
    category: "Data",
    aliases: ["mysql database", "relational database"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "Persistent recipe data" },
      { project: "Professional Experience", href: "/projects/experience", context: "Enterprise application data" },
    ],
  },
  {
    name: "Docker",
    category: "Platforms & Tools",
    aliases: ["container", "containers", "docker container"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Containerized platform components" },
      { project: "Professional Experience", href: "/projects/experience", context: "Containerization and CI/CD workflows" },
    ],
  },
  {
    name: "Azure",
    category: "Cloud",
    aliases: ["microsoft azure", "azure cloud"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Cloud and enterprise engineering" },
    ],
  },
  {
    name: "OCI",
    category: "Cloud",
    aliases: ["oracle cloud", "oracle cloud infrastructure", "oci cloud"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Cloud architecture and infrastructure" },
      { project: "Portfolio", context: "Oracle Cloud Infrastructure Architect certification" },
    ],
  },
  {
    name: "Cucumber",
    category: "Testing & Automation",
    aliases: ["gherkin", "bdd", "behavior driven development"],
    usage: [
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Business-rule scenarios and validation" },
      { project: "Professional Experience", href: "/projects/experience", context: "Reusable automation framework engineering" },
    ],
  },
  {
    name: "REST Assured",
    category: "Testing & Automation",
    aliases: ["restassured", "api testing", "api automation"],
    usage: [
      { project: "AllureIQ", href: "/projects/allureiq", context: "Automated API testing" },
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "API validation and automation" },
      { project: "Professional Experience", href: "/projects/experience", context: "API automation and framework engineering" },
    ],
  },
  {
    name: "TestNG",
    category: "Testing & Automation",
    aliases: ["test ng", "java testing"],
    usage: [
      { project: "AllureIQ", href: "/projects/allureiq", context: "Automated test execution" },
      { project: "Professional Experience", href: "/projects/experience", context: "Test automation framework engineering" },
    ],
  },
  {
    name: "Selenium",
    category: "Testing & Automation",
    aliases: ["selenium webdriver", "web automation"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Browser automation and enterprise testing" },
    ],
  },
  {
    name: "WebSockets",
    category: "Real-Time",
    aliases: ["websocket", "real time", "realtime"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Real-time collaboration and messaging" },
      { project: "Professional Experience", href: "/projects/experience", context: "Real-time application engineering" },
    ],
  },
  {
    name: "WebRTC",
    category: "Real-Time",
    aliases: ["webrtc", "audio video", "real time communication"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Real-time audio and video communication" },
      { project: "Professional Experience", href: "/projects/experience", context: "Real-time communication systems" },
    ],
  },
  {
    name: "AI",
    category: "AI & Intelligent Systems",
    aliases: ["artificial intelligence", "llm", "machine intelligence", "ai platform"],
    usage: [
      { project: "J.A.R.V.I.S", href: "/projects/jarvis", context: "Natural-language commands, memory and coding assistance" },
      { project: "AllureIQ", href: "/projects/allureiq", context: "Failure analysis, root-cause insights and recommendations" },
      { project: "Food Finder", href: "/projects/food-finder", context: "AI-enhanced discovery and fallback" },
      { project: "LoggerAI", href: "/projects/loggerai", context: "AI-assisted diagnostics and root-cause analysis" },
    ],
  },
  {
    name: "Gemini",
    category: "AI & Intelligent Systems",
    aliases: ["google gemini", "gemini ai"],
    usage: [
      { project: "Food Finder", href: "/projects/food-finder", context: "AI fallback and intelligent recipe discovery" },
    ],
  },
  {
    name: "PWA",
    category: "Frontend",
    aliases: ["progressive web app", "progressive web application"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Enterprise PWA and frontend work" },
    ],
  },
  {
    name: "Node.js",
    category: "Backend",
    aliases: ["node", "nodejs"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Backend and platform engineering" },
    ],
  },
  {
    name: "GitHub Copilot",
    category: "Engineering Tools",
    aliases: ["copilot", "github ai", "ai coding assistant"],
    usage: [
      { project: "Professional Experience", href: "/projects/experience", context: "Developer productivity and engineering workflows" },
    ],
  },
  {
    name: "Allure",
    category: "Testing & Reporting",
    aliases: ["allure report", "test reporting"],
    usage: [
      { project: "AllureIQ", href: "/projects/allureiq", context: "Persistent test reporting and intelligence" },
      { project: "Professional Experience", href: "/projects/experience", context: "Automation reporting and diagnostics" },
    ],
  },
  {
    name: "SFCC",
    category: "Commerce Cloud",
    aliases: ["salesforce commerce cloud", "salesforce cc", "commerce cloud"],
    usage: [
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Commerce Cloud promotion validation and business-rule execution" },
      { project: "Professional Experience", href: "/projects/experience", context: "Salesforce Commerce Cloud integration and enterprise engineering" },
    ],
  },
  {
    name: "SCAPI",
    category: "SFCC APIs",
    aliases: ["shopper commerce api", "shopper api", "salesforce commerce api"],
    usage: [
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Commerce Cloud communication and promotion validation flows" },
      { project: "Professional Experience", href: "/projects/experience", context: "SFCC integration and commerce API engineering" },
    ],
  },
  {
    name: "OCAPI",
    category: "SFCC APIs",
    aliases: ["open commerce api", "open commerce"],
    usage: [
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Automatic promotion detection and Commerce Cloud communication" },
      { project: "Professional Experience", href: "/projects/experience", context: "SFCC integration and commerce API engineering" },
    ],
  },
  {
    name: "REST APIs",
    category: "Backend & APIs",
    aliases: ["rest", "rest api", "restful", "api"],
    usage: [
      { project: "AllureIQ", href: "/projects/allureiq", context: "API testing and backend integration" },
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Validation APIs and enterprise workflows" },
      { project: "Professional Experience", href: "/projects/experience", context: "Backend services and API engineering" },
    ],
  },
  {
    name: "Automation",
    category: "Engineering",
    aliases: ["test automation", "framework automation", "automation framework"],
    usage: [
      { project: "SFCC Promotion Validation Platform", href: "/projects/sfcc-promotion", context: "Reusable validation and execution framework" },
      { project: "AllureIQ", href: "/projects/allureiq", context: "Automated API and test intelligence workflows" },
      { project: "Professional Experience", href: "/projects/experience", context: "Reusable enterprise framework engineering" },
    ],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const compact = (value: string) => normalize(value).replace(/\s+/g, "");

function scoreTechnology(technology: Technology, rawQuery: string) {
  const query = normalize(rawQuery);
  if (!query) return 0;

  const compactQuery = compact(rawQuery);
  const name = normalize(technology.name);
  const compactName = compact(technology.name);
  const category = normalize(technology.category);
  const aliases = (technology.aliases ?? []).map(normalize);

  const projects = technology.usage.map((item) => normalize(item.project));
  const contexts = technology.usage.map((item) => normalize(item.context));

  let score = 0;

  if (name === query || compactName === compactQuery) score += 120;
  if (aliases.some((alias) => alias === query || compact(alias) === compactQuery)) score += 105;

  if (name.startsWith(query)) score += 65;
  if (aliases.some((alias) => alias.startsWith(query))) score += 55;

  if (name.includes(query)) score += 45;
  if (category.includes(query)) score += 28;

  if (projects.some((project) => project.includes(query))) score += 42;
  if (contexts.some((context) => context.includes(query))) score += 18;

  const queryTokens = query.split(" ").filter(Boolean);

  for (const token of queryTokens) {
    if (name.includes(token)) score += 14;
    if (aliases.some((alias) => alias.includes(token))) score += 10;
    if (projects.some((project) => project.includes(token))) score += 9;
    if (contexts.some((context) => context.includes(token))) score += 5;
    if (category.includes(token)) score += 6;
  }

  return score;
}

type TechnologyExplorerProps = {
  onProjectNavigate?: () => void;
};

export default function TechnologyExplorer({
  onProjectNavigate,
}: TechnologyExplorerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Technology | null>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setSelected(null);
  };

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const results = useMemo(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      const priority = [
        "Java",
        "Spring Boot",
        "MySQL",
        "MongoDB",
        "SFCC",
        "OCAPI",
        "SCAPI",
        "Redis",
        "Azure",
        "AI",
        "REST APIs",
        "WebRTC",
        "WebSockets",
        "Docker",
        "OCI",
        "Selenium",
        "Allure",
      ];

      return [...TECHNOLOGIES].sort((a, b) => {
        const aIndex = priority.indexOf(a.name);
        const bIndex = priority.indexOf(b.name);

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;

        // Keep Selenium immediately above Allure, with Allure always last.
        if (a.name === "Allure" && b.name !== "Allure") return 1;
        if (b.name === "Allure" && a.name !== "Allure") return -1;
        if (a.name === "Selenium" && b.name !== "Selenium") return 1;
        if (b.name === "Selenium" && a.name !== "Selenium") return -1;

        return a.name.localeCompare(b.name);
      });
    }

    const sorted = TECHNOLOGIES
      .map((technology) => ({
        technology,
        score: scoreTechnology(technology, trimmedQuery),
      }))
      .filter(({ score }) => score > 0)
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.technology.usage.length - a.technology.usage.length ||
          a.technology.name.localeCompare(b.technology.name)
      )
      .map(({ technology }) => technology);

    const normalizedQuery = trimmedQuery.toLowerCase();

    if (normalizedQuery === "framework") {
      return sorted.filter((technology) =>
        technology.usage.some((item) =>
          PORTFOLIO_CATEGORY_PROJECTS.frameworks.has(item.project)
        )
      );
    }

    if (normalizedQuery === "platform") {
      return sorted.filter((technology) =>
        technology.usage.some((item) =>
          PORTFOLIO_CATEGORY_PROJECTS.platforms.has(item.project)
        )
      );
    }

    return sorted;
  }, [query]);

  const categoryCount = useMemo(
    () => new Set(TECHNOLOGIES.map((technology) => technology.category)).size,
    []
  );

  const openExplorer = () => {
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={openExplorer}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="transition-all duration-300 hover:text-white"
      >
        Technologies
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/65 px-3 pb-3 pt-3 backdrop-blur-md sm:px-5 sm:pb-5 sm:pt-5"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Technology explorer"
              className="relative flex h-[calc(100dvh-1.5rem)] max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[30px] border border-white/[0.14] bg-[#101114]/90 shadow-[0_35px_140px_rgba(0,0,0,0.7)] backdrop-blur-[35px] backdrop-saturate-[180%] sm:h-[calc(100dvh-2.5rem)] sm:max-h-[calc(100dvh-2.5rem)] md:h-[min(780px,calc(100dvh-2.5rem))] md:max-h-[min(780px,calc(100dvh-2.5rem))]"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,0.13),transparent_32%),radial-gradient(circle_at_90%_100%,rgba(34,211,238,0.08),transparent_35%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <div className="relative flex shrink-0 items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-4 sm:px-7 sm:py-5">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-300/65">
                    Engineering Stack
                  </p>
                  <div className="mt-1 flex items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      Technologies
                    </h2>
                    <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] text-zinc-500 sm:inline-flex">
                      {TECHNOLOGIES.length} technologies · {categoryCount} areas
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label="Close technology explorer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-zinc-400 transition-all duration-300 hover:scale-105 hover:bg-white/[0.1] hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="relative grid min-h-0 flex-1 overflow-y-auto md:overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
                <div
                  className={`min-h-0 flex-col border-b border-white/[0.08] p-4 sm:p-6 md:border-b-0 md:border-r ${
                    selected ? "hidden md:flex" : "flex"
                  }`}
                >
                  <div className="relative shrink-0">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-zinc-500">
                      ⌕
                    </span>

                    <input
                      autoFocus
                      value={query}
                      onChange={(event) => {
                        setQuery(event.target.value);
                        setSelected(null);
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") close();
                      }}
                      placeholder="Search technology or project..."
                      aria-label="Search technologies and projects"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.045] py-3 pl-11 pr-4 text-base text-white outline-none placeholder:text-zinc-600 transition-all duration-300 focus:border-cyan-300/30 focus:bg-white/[0.07] focus:ring-1 focus:ring-cyan-300/10 sm:text-sm"
                    />

                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setSelected(null);
                        }}
                        aria-label="Clear technology search"
                        className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 transition hover:bg-white/[0.08] hover:text-white"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 px-1">
                    {[
                      { label: "All", value: "" },
                      { label: "Frameworks", value: "framework" },
                      { label: "Platforms", value: "platform" },
                    ].map((filter) => {
                      const active =
                        filter.value === ""
                          ? query === ""
                          : query.trim().toLowerCase() === filter.value;

                      return (
                        <button
                          key={filter.label}
                          type="button"
                          onClick={() => {
                            setQuery(filter.value);
                            setSelected(null);
                          }}
                          className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition ${
                            active
                              ? "border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300"
                              : "border-white/[0.07] bg-white/[0.025] text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-300"
                          }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}

                    <span className="ml-auto hidden text-[10px] text-zinc-700 sm:inline">
                      {query ? `${results.length} matches` : "All technologies"}
                    </span>
                  </div>

                  <div className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
                    {results.map((technology) => (
                      <button
                        key={technology.name}
                        type="button"
                        onClick={() => setSelected(technology)}
                        className={`group w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                          selected?.name === technology.name
                            ? "border-cyan-300/20 bg-cyan-300/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                            : "border-transparent hover:border-white/[0.08] hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex min-w-0 items-center gap-2">
                              <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">
                                {technology.name}
                              </p>
                              {PRIMARY_TECHNOLOGIES.has(technology.name) && (
                                <span className="shrink-0 rounded-full border border-cyan-300/15 bg-cyan-300/[0.06] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-cyan-300/80">
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                              {technology.category}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full border border-white/[0.06] bg-white/[0.025] px-2 py-1 text-[10px] text-zinc-600">
                            {technology.usage.length}
                          </span>
                        </div>
                      </button>
                    ))}

                    {!results.length && (
                      <div className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-white/10 px-5 text-center">
                        <div>
                          <p className="text-sm text-zinc-400">
                            No matching technology found.
                          </p>
                          <p className="mt-1 text-xs text-zinc-600">
                            Try Java, Spring, J.A.R.V.I.S, backend, or another
                            stack term.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`min-h-0 overflow-visible p-5 pb-24 sm:p-7 sm:pb-24 md:h-full md:overflow-y-auto md:overscroll-contain md:pb-7 ${
                    selected ? "block" : "hidden md:block"
                  }`}
                >
                  {selected ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400 transition hover:bg-white/[0.08] hover:text-white md:hidden"
                      >
                        <span aria-hidden="true">←</span>
                        Back to technologies
                      </button>
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-cyan-300/70">
                            {selected.category}
                          </p>
                          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            {selected.name}
                          </h3>
                        </div>

                        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] text-zinc-500">
                          {selected.usage.length}{" "}
                          {selected.usage.length === 1 ? "use" : "uses"}
                        </span>
                      </div>

                      <div className="mt-7 space-y-3">
                        {selected.usage.map((item) =>
                          item.href ? (
                            <Link
                              key={`${selected.name}-${item.project}`}
                              href={item.href}
                              onClick={() => {
                                onProjectNavigate?.();
                                close();
                              }}
                              className="group block rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]"
                            >
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                                  {item.project}
                                </p>
                                <span className="text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300">
                                  →
                                </span>
                              </div>
                              <p className="mt-2 text-xs leading-5 text-zinc-500">
                                {item.context}
                              </p>
                            </Link>
                          ) : (
                            <div
                              key={`${selected.name}-${item.project}`}
                              className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4"
                            >
                              <p className="text-sm font-medium text-zinc-200">
                                {item.project}
                              </p>
                              <p className="mt-2 text-xs leading-5 text-zinc-500">
                                {item.context}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-xl text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        ⌘
                      </div>
                      <h3 className="mt-5 text-lg font-medium text-zinc-200">
                        Explore the engineering stack
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                        Search a technology or project, then select a result to
                        see where it is used across the portfolio.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
