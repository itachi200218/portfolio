"use client";
import { useEffect, useState } from "react";
import Link from "next/link";// import { useState } from "react";
import LiquidGlass from "@/components/LiquidGlass";

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
export default function Home() {

  const [showScrollTop, setShowScrollTop] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      {/* Navigation */}
<nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl xl:max-w-7xl -translate-x-1/2">  <LiquidGlass className="rounded-full px-5 py-3 md:px-6">
    <div className="flex items-center justify-between">

      {/* LOGO */}
      <div className="text-lg font-semibold tracking-tight">
        CHAITANYA<span className="text-zinc-500">.</span>
      </div>

      {/* DESKTOP NAV */}
      <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
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
        className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-zinc-300 transition-all duration-300 hover:bg-white/[0.1] hover:text-white md:block"
      >
        Contact
      </a>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white md:hidden"
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
  className={`absolute left-0 right-0 top-[calc(100%+12px)] z-50 md:hidden ${
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
<section className="mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 pt-24 md:pt-0 xl:pt-24">
      <div className="max-w-5xl">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white" />
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              Software Engineer
            </p>
          </div>

          <h1 className="text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl">
            Building software,
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

          <div className="mt-14 flex flex-wrap gap-6 text-sm text-zinc-600">
            <span>Java</span>
            <span>Python</span>
            <span>Spring Boot</span>
            <span>FastAPI</span>
            <span>React</span>
            <span>AI</span>
            <span>MongoDB</span>
            <span>Redis</span>
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
        <SectionHeading number="01" title="Featured Engineering" />

        <p className="mt-6 max-w-2xl text-zinc-500">
          Selected systems and platforms spanning AI, backend engineering,
          real-time applications, enterprise automation, and distributed
          systems.
        </p>

       {/* Personal */}

<div className="mt-16">
  <div className="mb-6 flex items-center gap-3">
    <span className="text-xs uppercase tracking-[0.25em] text-zinc-600">
      Personal Engineering
    </span>

    <div className="h-px flex-1 bg-zinc-900" />
  </div>

  <div className="grid gap-6 md:grid-cols-2">

    <Link
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

            <Project
              number="05"
              title="LoggerAI"
              eyebrow="AI Diagnostics"
              description="AI-assisted log analysis and diagnostic system designed to accelerate troubleshooting, failure investigation, and root-cause analysis."
              tags={["AI", "Backend", "Java", "Diagnostics", "Log Analysis"]}
            />

            <Project
              number="06"
              title="KM Portal"
              eyebrow="Enterprise Platform"
              description="Internal knowledge and learning platform supporting structured learning workflows, scoring, user tracking, and duplicate-prevention mechanisms."
              tags={["Java", "Spring Boot", "Platform", "Automation"]}
            />
          </div>
        </div>
      </section>

      {/* JARVIS Highlight */}
      <section className="border-y border-zinc-900 bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
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

            <div className="grid gap-3 sm:grid-cols-2">
              <FeatureCard title="AI Engine" text="Natural-language commands and coding assistance." />
              <FeatureCard title="Persistent Memory" text="Context-aware interactions and stored user information." />
              <FeatureCard title="Real-Time" text="WebSocket-based collaboration and communication." />
              <FeatureCard title="Communication" text="Group audio and video communication through WebRTC." />
              <FeatureCard title="Workspaces" text="Collaborative spaces with members and real-time activity." />
              <FeatureCard title="Governance" text="Admin and Super Admin control over users and commands." />
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Approach */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <SectionHeading number="02" title="Engineering Approach" />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-900 md:grid-cols-2">
          <EngineeringBlock
            number="01"
            title="Backend Systems"
            description="Designing APIs, services, business logic, persistence layers, caching strategies, and reusable backend components."
            technologies="Java · Spring Boot · Python · FastAPI · Flask"
          />

          <EngineeringBlock
            number="02"
            title="Platform Engineering"
            description="Building reusable frameworks and platforms that abstract complex workflows into configurable and maintainable systems."
            technologies="Automation · Frameworks · Business Rules · CI/CD"
          />

          <EngineeringBlock
            number="03"
            title="AI Integration"
            description="Using AI where it provides practical engineering value, including intelligent commands, diagnostics, summaries, search fallback, and developer tooling."
            technologies="LLM · Gemini · AI Diagnostics · AI Test Intelligence"
          />

          <EngineeringBlock
            number="04"
            title="Real-Time Systems"
            description="Building applications around live communication, synchronization, presence, notifications, and collaborative workflows."
            technologies="WebSockets · WebRTC · Real-Time Messaging"
          />
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-y border-zinc-900 bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <SectionHeading number="03" title="Experience" />

          <div className="mt-16 max-w-5xl">
            <div className="border-l border-zinc-800 pl-8 md:pl-10">
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
</div>              </div>

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

  {/* Certifications */}
<section id="certifications" className="mx-auto max-w-7xl px-6 py-32">
  <SectionHeading number="04" title="Certifications" />

  <div className="mt-16 grid gap-6 md:grid-cols-2">
    <CertificationCard
      issuer="Oracle"
      title="Oracle Cloud Infrastructure"
      subtitle="Certified Architect Associate"
      score="90%"
      date="September 2026"
      featured
      image="/certifications/oracle.jpg"
    />

    <CertificationCard
      issuer="Professional Development"
      title="Software Development & Cloud"
      subtitle="Microsoft Certification"
      score=""
      date=""
      image="/certifications/SE1.jpg"
    />

    <CertificationCard
      issuer="Docker"
      title="Docker Certification"
      subtitle="Containerization & Development"
      score=""
      date=""
      image="/certifications/docker.jpg"
    />

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
        "/certifications/DSA.jpg"
      ]}
    />
  </div>
</section>

      {/* Recognition */}
      <section className="border-y border-zinc-900 bg-[#0c0c0c]">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <SectionHeading number="05" title="Recognition" />

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <RecognitionCard
              title="Trend Setter"
              organization="Cognizant"
              description="Recognition for the SFCC Promotion Validation Tool and its impact on reducing validation effort."
            />

            <RecognitionCard
              title="The Energy and Optimism"
              organization="Cognizant"
              description="Recognition for valuable contribution and outstanding performance."
            />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-32">
        <SectionHeading number="06" title="About" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="max-w-3xl text-xl leading-9 text-zinc-400">
            I enjoy building software that combines strong engineering
            foundations with practical AI, automation, cloud infrastructure,
            and scalable application design. My work spans personal products,
            backend systems, reusable frameworks, enterprise platforms, and
            real-time applications.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 text-sm">
            <SkillGroup title="Languages" items="Java · Python · SQL · JavaScript" />
            <SkillGroup title="Backend" items="Spring Boot · FastAPI · Flask · Node.js" />
            <SkillGroup title="Frontend" items="React · Next.js · PWA · Responsive UI" />
            <SkillGroup title="Data" items="MongoDB · MySQL · Redis" />
            <SkillGroup title="Cloud" items="Azure · Docker · CI/CD" />
            <SkillGroup title="Engineering" items="REST · WebSockets · WebRTC · Automation" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Let's connect
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Building something interesting?
            <br />
            <span className="text-zinc-500">Let's talk.</span>
          </h2>

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
  };

  return (
    <>
      {/* MAIN CERTIFICATION CARD */}
      <div className="group">
        {/* SINGLE CERTIFICATE */}
        {!isMultiple && certificateImages[0] && (
          <div
            className="group/card h-[300px] cursor-pointer [perspective:1200px]"
            onClick={() => openCertificate(certificateImages[0])}
          >
            <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/card:[transform:rotateY(180deg)]">

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
                    />
                  );
                })}
              </div>
            </div>
          </LiquidGlass>
        )}
      </div>

      {/* ENLARGED CERTIFICATE */}
      {showCertificate && selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md animate-[fadeIn_300ms_ease-out]"
          onClick={closeCertificate}
        >
          <div
            className="relative max-h-[90vh] max-w-[95vw] animate-[certificatePop_500ms_cubic-bezier(0.16,1,0.3,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCertificate}
              className="absolute -right-3 -top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-xl text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-white/20"
            >
              ×
            </button>

            <img
              src={selectedImage}
              alt={`${title} certificate`}
              className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-[0_25px_100px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      )}
    </>
  );
}
function CertificateMiniCard({
  name,
  image,
  onOpen,
}: {
  name: string;
  image: string;
  onOpen: () => void;
}) {
  return (
    <div
      className="group/mini h-full min-h-[95px] cursor-pointer [perspective:800px]"
      onClick={onOpen}
    >
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover/mini:[transform:rotateY(180deg)]">

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