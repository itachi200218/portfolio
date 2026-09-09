"use client";

import Image from "next/image";
import Link from "next/link";
import JarvisUIExplorer from "./JarvisUIExplorer";

const technologies = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Java",
  "Spring Boot",
  "MongoDB",
  "WebSockets",
  "WebRTC",
  "JWT",
  "RBAC",
  "AI",
];

const capabilities = [
  {
    title: "AI Command Center",
    description:
      "Natural-language interaction for AI, coding, system and smart commands through a unified command experience.",
    icon: "◈",
  },
  {
    title: "Persistent Memory",
    description:
      "J.A.R.V.I.S can retain user preferences, identity, context and historical interactions for more personalized responses.",
    icon: "◎",
  },
  {
    title: "Real-Time Communication",
    description:
      "WebSocket-powered messaging and real-time events combined with WebRTC communication capabilities.",
    icon: "⌁",
  },
  {
    title: "Workspaces & Collaboration",
    description:
      "Private and collaborative workspaces with members, messaging, invitations and workspace management.",
    icon: "◇",
  },
  {
    title: "Platform Administration",
    description:
      "Dedicated administration capabilities for user management, commands, support, analytics and platform operations.",
    icon: "▣",
  },
  {
    title: "Security & Governance",
    description:
      "Authentication, authorization, role-based access control, secure sessions and separate administrative governance.",
    icon: "⬡",
  },
];

const architecturePoints = [
  "User Platform",
  "Admin Platform",
  "Super Admin Governance",
  "Central Database",
  "Real-Time Communication Layer",
  "Security Layer",
];

export default function JarvisCaseStudy() {
  return (
    <main className="min-h-screen bg-[#02030a] text-white">
        <JarvisUIExplorer />
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
        <div className="absolute right-[5%] top-[35%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.06] blur-[160px]" />
        <div className="absolute bottom-[10%] left-[35%] h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-black/40 backdrop-blur-2xl">
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
            <span>J.A.R.V.I.S</span>
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            <span>Case Study</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-10 lg:pt-32">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1 text-xs font-medium tracking-wider text-cyan-300">
              FLAGSHIP PROJECT
            </span>

            <span className="text-xs text-zinc-600">•</span>

            <span className="text-xs tracking-wider text-zinc-500">
              FULL-STACK AI PLATFORM
            </span>
          </div>

          <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
            J.A.R.V.I.S
          </h1>

          <p className="mt-4 text-xl font-light text-zinc-300 md:text-2xl">
            A full-stack AI platform built for interaction, automation,
            collaboration and real-time communication.
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-500">
            J.A.R.V.I.S is a personal AI ecosystem designed beyond a simple
            chatbot. It combines natural-language commands, persistent memory,
            system interaction, collaborative workspaces, real-time
            communication and dedicated administrative platforms into one
            system.
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
        </div>

        {/* Hero architecture concept */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            ["01", "User Platform", "AI interaction & collaboration"],
            ["02", "Admin Platform", "Operations & platform control"],
            ["03", "Super Admin", "Governance & administration"],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="rounded-3xl border border-white/[0.09] bg-white/[0.035] p-6 backdrop-blur-2xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.055]"
            >
              <span className="text-xs text-cyan-400">{number}</span>
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What is JARVIS */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="01"
          title="What is J.A.R.V.I.S?"
          subtitle="Designed as an AI ecosystem, not just a chat interface."
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <GlassCard>
            <p className="text-lg leading-9 text-zinc-300">
              The core idea behind J.A.R.V.I.S is to create an AI operating
              layer that understands natural language and connects that
              understanding to useful application, system and collaboration
              capabilities.
            </p>

            <p className="mt-6 leading-8 text-zinc-500">
              Instead of treating AI as an isolated feature, the platform
              connects AI commands with memory, user preferences, system
              utilities, workspaces, communication, notifications and
              administrative controls.
            </p>
          </GlassCard>

          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              Core architecture
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

      {/* User Architecture */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="02"
          title="User Platform Architecture"
          subtitle="The primary interaction layer where users communicate with J.A.R.V.I.S."
        />

        <ArchitectureImage
          src="/projects/jarvis/user-architecture.png"
          alt="J.A.R.V.I.S User Platform Architecture"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["AI & Coding", "Generate, explain, fix and convert code."],
            ["System Commands", "Applications, system information and utilities."],
            ["Smart Commands", "Location, weather, music, reminders and search."],
            ["Memory", "Identity, preferences and historical context."],
          ].map(([title, description]) => (
            <GlassCard key={title}>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Admin Architecture */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="03"
          title="Admin Platform Architecture"
          subtitle="A dedicated control plane for operating and governing the platform."
        />

        <ArchitectureImage
          src="/projects/jarvis/admin-architecture.png"
          alt="J.A.R.V.I.S Admin Platform Architecture"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["User Management", "Search, filter, manage and administer users."],
            ["Command Center", "Centralized command enable/disable controls."],
            ["Support & Tickets", "Ticket monitoring, assignment and responses."],
            ["System Activity", "Logs, notifications, settings and monitoring."],
          ].map(([title, description]) => (
            <GlassCard key={title}>
              <h3 className="font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="04"
          title="Platform Capabilities"
          subtitle="The major systems working together inside J.A.R.V.I.S."
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

      {/* AI command pipeline */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="05"
          title="AI Command Pipeline"
          subtitle="Natural language becomes an executable platform action."
        />

        <GlassCard className="overflow-hidden">
          <div className="grid gap-3 md:grid-cols-5">
            {[
              ["01", "Input", "Voice or text"],
              ["02", "Understand", "AI interprets intent"],
              ["03", "Route", "Command classification"],
              ["04", "Execute", "System / app action"],
              ["05", "Respond", "Result to user"],
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

      {/* Memory */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="06"
          title="Persistent Memory"
          subtitle="Context should survive beyond a single conversation."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {[
            ["Identity", "User information and personalized context."],
            ["Preferences", "Persistent settings and behavioral preferences."],
            ["History", "Previous interactions and information recall."],
          ].map(([title, description]) => (
            <GlassCard key={title}>
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-3 leading-7 text-zinc-500">{description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Real time */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="07"
          title="Real-Time Architecture"
          subtitle="Communication features are designed around persistent live state."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <GlassCard>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-400">
              WebSockets
            </div>

            <h3 className="mt-5 text-xl font-medium">
              Real-time application events
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-zinc-500">
              <li>• Real-time messaging</li>
              <li>• Typing indicators</li>
              <li>• Delivery and read state</li>
              <li>• Online / offline presence</li>
              <li>• Live notifications</li>
            </ul>
          </GlassCard>

          <GlassCard>
            <div className="text-xs uppercase tracking-[0.2em] text-purple-400">
              WebRTC
            </div>

            <h3 className="mt-5 text-xl font-medium">
              Peer-to-peer communication
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-zinc-500">
              <li>• Voice communication</li>
              <li>• Video communication</li>
              <li>• Incoming call notifications</li>
              <li>• Accept / reject call flow</li>
              <li>• Screen sharing capabilities</li>
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* Collaboration */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="08"
          title="Workspaces & Collaboration"
          subtitle="J.A.R.V.I.S is designed to support more than one-to-one interaction."
        />

        <GlassCard>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-medium">
                Private and collaborative workspaces
              </h3>

              <p className="mt-4 leading-8 text-zinc-500">
                Users can create and manage workspaces, invite members,
                communicate in groups and manage workspace membership.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                "Create Workspace",
                "Invite Members",
                "Group Chat",
                "Member Management",
                "Private Workspaces",
                "Real-Time Updates",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 text-sm text-zinc-400"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Security */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="09"
          title="Security & Role-Based Access"
          subtitle="Different platform responsibilities are separated by design."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["USER", "Application-level user capabilities and personal data."],
            ["ADMIN", "Platform operations, support, commands and user management."],
            [
              "SUPER ADMIN",
              "Higher-level administration and admin account governance.",
            ],
          ].map(([role, description]) => (
            <GlassCard key={role}>
              <span className="text-xs tracking-[0.2em] text-cyan-400">
                {role}
              </span>

              <p className="mt-5 text-sm leading-7 text-zinc-500">
                {description}
              </p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-2xl">
          <div className="flex flex-wrap gap-3">
            {[
              "Authentication",
              "Authorization",
              "RBAC",
              "JWT",
              "Secure APIs",
              "Session Management",
              "Data Protection",
              "Audit / Activity Logs",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.08] px-4 py-2 text-xs text-zinc-400"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="10"
          title="Technology Architecture"
          subtitle="Multiple technologies working together across platform boundaries."
        />

        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl">
          {[
            ["Frontend", "React / TypeScript"],
            ["User Backend", "Python / FastAPI"],
            ["Admin Backend", "Java / Spring Boot"],
            ["Database", "MongoDB"],
            ["Real-Time", "WebSockets / WebRTC"],
            ["Security", "JWT / RBAC"],
            ["AI Layer", "AI-powered natural-language understanding"],
          ].map(([layer, stack]) => (
            <div
              key={layer}
              className="grid gap-2 border-b border-white/[0.06] px-6 py-5 last:border-b-0 md:grid-cols-[180px_1fr]"
            >
              <span className="text-sm text-zinc-600">{layer}</span>
              <span className="text-sm text-zinc-300">{stack}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering decisions */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeading
          number="11"
          title="Engineering Decisions"
          subtitle="The interesting part isn't only what was built — it's how the system was structured."
        />

        <div className="space-y-4">
          {[
            [
              "Separate platform responsibilities",
              "User, Admin and Super Admin capabilities are separated rather than placing every operation inside one interface.",
            ],
            [
              "Real-time communication as infrastructure",
              "Messaging, presence, notifications and calls are treated as platform-level capabilities rather than isolated UI features.",
            ],
            [
              "AI connected to execution",
              "The AI layer is designed to interpret commands and connect them to useful actions rather than only generating conversational responses.",
            ],
            [
              "Persistent context",
              "Memory and preferences allow the platform to maintain useful context beyond a single request.",
            ],
          ].map(([title, description]) => (
            <GlassCard key={title}>
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-500">
                {description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-24 lg:px-10">
        <div className="rounded-[2rem] border border-cyan-400/[0.12] bg-cyan-400/[0.025] p-8 text-center backdrop-blur-2xl md:p-16">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan-400">
            Built from scratch
          </span>

          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl">
            J.A.R.V.I.S is more than an AI interface.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-zinc-500">
            It is an evolving full-stack platform combining AI, backend
            systems, real-time communication, collaboration, security and
            platform administration.
          </p>

         <div className="mt-8 flex flex-wrap justify-center gap-3">
  <a
    href="https://github.com/itachi200218/Jarvis-linux"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-white/[0.12] bg-white/[0.07] px-6 py-3 text-sm text-zinc-200 transition hover:bg-white/[0.12]"
  >
    User App GitHub →
  </a>

  <a
    href="https://github.com/itachi200218/jarvis-Admin"
    target="_blank"
    rel="noreferrer"
    className="rounded-full border border-white/[0.12] bg-white/[0.07] px-6 py-3 text-sm text-zinc-200 transition hover:bg-white/[0.12]"
  >
    Admin Platform GitHub →
  </a>

  <Link
    href="/"
    className="rounded-full border border-white/[0.08] px-6 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
  >
    Back to Portfolio
  </Link>
</div>
        </div>
      </section>
    </main>
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

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 backdrop-blur-2xl transition duration-300 hover:border-white/[0.13] hover:bg-white/[0.05] ${className}`}
    >
      {children}
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
    <div className="group overflow-hidden rounded-[2rem] border border-white/[0.1] bg-black/40 p-2 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
      <div className="overflow-hidden rounded-[1.5rem]">
        <Image
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          className="h-auto w-full transition duration-700 group-hover:scale-[1.01]"
          priority
        />
      </div>
    </div>
  );
}