"use client";

import Link from "next/link";
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
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
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
      { threshold: 0.1, rootMargin: "0px 0px -70px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
        filter: visible ? "blur(0)" : "blur(5px)",
        transition: `opacity 950ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform 950ms cubic-bezier(.22,1,.36,1) ${delay}ms, filter 950ms cubic-bezier(.22,1,.36,1) ${delay}ms`,
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
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${(0.5 - py) * 3}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 3}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "20%");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative overflow-hidden rounded-[28px] border border-white/[0.10] bg-white/[0.045] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_80px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out [transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] ${className}`}
      style={{
        "--mx": "50%",
        "--my": "20%",
        "--rx": "0deg",
        "--ry": "0deg",
      } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx) var(--my), rgba(110,220,255,.13), transparent 42%), radial-gradient(480px circle at 85% 15%, rgba(155,92,255,.09), transparent 40%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
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
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/75">
        {number}
      </div>
      <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/55">{description}</p>
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
      <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-2 text-sm text-white/45">{label}</div>
    </GlassCard>
  );
}

function FlowNode({
  title,
  description,
  accent = false,
}: {
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent
          ? "border-cyan-300/20 bg-cyan-300/[0.055]"
          : "border-white/[0.08] bg-white/[0.035]"
      }`}
    >
      <div className="text-sm font-semibold text-white">{title}</div>
      <div className="mt-2 text-xs leading-5 text-white/45">{description}</div>
    </div>
  );
}

export default function LoggerAICaseStudy() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050507] text-white selection:bg-cyan-300/20 selection:text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-[5%] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.055] blur-[120px]" />
        <div className="absolute right-[5%] top-[25%] h-[500px] w-[500px] rounded-full bg-violet-500/[0.045] blur-[140px]" />
      </div>

      <nav className="sticky top-0 z-50 border-b border-white/[0.07] bg-black/30 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-white/75 transition hover:text-white"
          >
            ← Portfolio
          </Link>
          <div className="hidden text-[11px] uppercase tracking-[0.25em] text-white/35 sm:block">
            LoggerAI · Case Study
          </div>
          <div className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[11px] text-white/50">
            Java · Spring Boot · AI
          </div>
        </div>
      </nav>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-8 lg:pt-36">
        <ScrollReveal>
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2 text-xs text-cyan-200/75">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,.8)]" />
              AI-Powered Framework Diagnostics
            </div>

            <h1 className="text-6xl font-semibold tracking-[-0.065em] text-white sm:text-7xl lg:text-[92px] lg:leading-[0.95]">
              LoggerAI
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 tracking-[-0.02em] text-white/55 sm:text-2xl">
              Turning complex framework logs and execution reports into
              understandable root causes and actionable solutions with AI.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {["Java", "Spring Boot", "AI", "Log Parsing", "Root-Cause Analysis"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs text-white/55"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} className="mt-20">
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/30">
                  The idea
                </div>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                  From “what failed?” to “why did it fail?”
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
                  Automation and framework executions generate a large amount of
                  diagnostic information. LoggerAI acts as an intelligent
                  diagnostic layer that processes that information and uses AI
                  to identify the underlying problem instead of forcing an
                  engineer to manually inspect every log line.
                </p>
              </div>

              <div className="grid gap-3">
                <FlowNode
                  title="Raw framework data"
                  description="Logs, errors, stack traces, execution details and report data."
                />
                <div className="text-center text-xs text-white/20">↓</div>
                <FlowNode
                  title="LoggerAI processing"
                  description="Parse, structure and isolate meaningful failure information."
                  accent
                />
                <div className="text-center text-xs text-white/20">↓</div>
                <FlowNode
                  title="AI diagnosis"
                  description="Understand the failure, determine the likely root cause and suggest a solution."
                  accent
                />
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="01"
            title="The problem"
            description="Framework failures rarely arrive as a single, clean error. The useful explanation is often buried inside a much larger execution trail."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {[
            [
              "Large execution logs",
              "Important failure information can be buried among thousands of lines of framework output.",
            ],
            [
              "Reports contain context",
              "Execution reports provide additional evidence around what happened before and during the failure.",
            ],
            [
              "Diagnosis takes time",
              "Engineers traditionally correlate errors, stack traces and execution context manually.",
            ],
          ].map(([title, text], index) => (
            <ScrollReveal key={title} delay={index * 70}>
              <GlassCard className="h-full p-7">
                <div className="mb-8 text-3xl font-semibold text-white/15">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="02"
            title="What LoggerAI does"
            description="LoggerAI takes the diagnostic data produced by a framework and converts it into an AI-assisted failure explanation."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 md:grid-cols-5">
              {[
                ["01", "Collect", "Framework logs & report data"],
                ["02", "Parse", "Extract useful execution information"],
                ["03", "Analyze", "Identify errors and failure context"],
                ["04", "Diagnose", "AI determines likely root cause"],
                ["05", "Resolve", "Generate recommended solution"],
              ].map(([num, title, text], i) => (
                <div key={num} className="relative">
                  <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
                    <div className="text-[10px] tracking-[0.2em] text-cyan-300/60">{num}</div>
                    <div className="mt-3 text-sm font-semibold">{title}</div>
                    <div className="mt-2 text-xs leading-5 text-white/40">{text}</div>
                  </div>
                  {i < 4 && (
                    <div className="absolute -right-3 top-1/2 z-10 hidden text-white/20 md:block">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="03"
            title="Diagnostic pipeline"
            description="The architecture separates data processing from AI reasoning so the model receives meaningful execution context rather than an unstructured wall of logs."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 md:grid-cols-7 md:items-center">
              <FlowNode title="Framework" description="Execution produces diagnostic data." />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowNode title="Logs" description="Raw logs, failures and stack traces." />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowNode
                title="Parser"
                description="Extract and structure relevant information."
                accent
              />
              <div className="hidden text-center text-white/20 md:block">→</div>
              <FlowNode
                title="AI"
                description="Root cause + solution."
                accent
              />
            </div>

            <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Input
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  Framework execution logs and report information.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Processing
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  Parsing and failure-context extraction before AI analysis.
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                  Output
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  Root cause, explanation and actionable solution.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="04"
            title="AI-powered root-cause analysis"
            description="The important part of LoggerAI is not merely detecting an exception. It is using the surrounding execution context to explain what the failure means."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ScrollReveal>
            <GlassCard className="h-full p-7 sm:p-9">
              <div className="text-xs uppercase tracking-[0.22em] text-white/25">
                Traditional output
              </div>
              <div className="mt-7 rounded-2xl border border-white/[0.08] bg-black/30 p-6 font-mono text-sm leading-7 text-white/45">
                <div>ERROR: execution failed</div>
                <div>NullPointerException</div>
                <div>at validation.service(...)</div>
                <div>at framework.runner(...)</div>
                <div className="mt-3 text-white/25">...</div>
              </div>
              <p className="mt-5 text-sm leading-6 text-white/40">
                The engineer still has to determine what caused the failure.
              </p>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={90}>
            <GlassCard className="h-full border-cyan-300/10 p-7 sm:p-9">
              <div className="text-xs uppercase tracking-[0.22em] text-cyan-300/55">
                LoggerAI diagnosis
              </div>
              <div className="mt-7 space-y-4">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
                  <div className="text-xs text-white/30">ROOT CAUSE</div>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Identifies the underlying failure based on the available
                    execution context rather than only reporting the exception.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
                  <div className="text-xs text-white/30">WHY IT HAPPENED</div>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Explains the relationship between the error and the
                    preceding framework execution data.
                  </p>
                </div>
                <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04] p-5">
                  <div className="text-xs text-cyan-300/60">RECOMMENDED SOLUTION</div>
                  <p className="mt-2 text-sm leading-6 text-white/75">
                    Provides an actionable direction for resolving the detected
                    problem.
                  </p>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="05"
            title="Framework-aware intelligence"
            description="LoggerAI is designed around framework execution data. That makes its diagnostic process more useful than treating every log message as an isolated text fragment."
          />
        </ScrollReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            [
              "Execution context",
              "The analysis can consider the surrounding execution information when interpreting a failure.",
            ],
            [
              "Error correlation",
              "Relevant errors, stack traces and report information can be brought together for diagnosis.",
            ],
            [
              "Failure understanding",
              "The goal is to explain what actually went wrong, not simply repeat the exception message.",
            ],
            [
              "Actionable output",
              "The final result focuses on root cause and a practical direction for resolution.",
            ],
          ].map(([title, text], index) => (
            <ScrollReveal key={title} delay={index * 70}>
              <GlassCard className="p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.045] text-xs text-cyan-200/70">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/45">{text}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="06"
            title="Spring-based engineering layer"
            description="The application layer is implemented with Java and Spring Boot, providing the backend foundation around the log-processing and AI diagnostic workflow."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <GlassCard className="p-7 sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Java", "Core application and processing logic"],
                ["Spring Boot", "Backend service and application layer"],
                ["Log Processing", "Parsing and extracting useful framework data"],
                ["AI", "Root-cause reasoning and solution generation"],
              ].map(([title, text]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6"
                >
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-2 text-xs leading-5 text-white/40">{text}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </ScrollReveal>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="07"
            title="Why it matters"
            description="LoggerAI reduces the distance between a framework failure and an engineer's understanding of that failure."
          />
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-3">
          <ScrollReveal>
            <Metric value="Logs → Insight" label="Transforms raw diagnostic data into understandable information." />
          </ScrollReveal>
          <ScrollReveal delay={70}>
            <Metric value="AI Diagnosis" label="Moves beyond exception reporting toward root-cause reasoning." />
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <Metric value="Actionable" label="Pairs the diagnosis with a recommended direction for resolution." />
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            number="08"
            title="Engineering decisions"
            description="The project is intentionally positioned as a diagnostic system rather than a generic chatbot."
          />
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {[
            [
              "Process before reasoning",
              "Raw framework output is parsed and organized before AI analysis so the diagnostic layer can focus on meaningful evidence.",
            ],
            [
              "Context over isolated errors",
              "A stack trace alone is rarely enough. LoggerAI's purpose is to understand the failure in the context of the execution.",
            ],
            [
              "Explain, don't just classify",
              "The useful result is an explanation of the root cause and a solution direction an engineer can act on.",
            ],
          ].map(([title, text], index) => (
            <ScrollReveal key={title} delay={index * 80}>
              <GlassCard className="h-full p-7">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-36 lg:px-8">
        <ScrollReveal>
          <GlassCard className="overflow-hidden p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(103,232,249,.08),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(167,139,250,.07),transparent_35%)]" />
            <div className="relative max-w-4xl">
              <div className="text-xs uppercase tracking-[0.25em] text-cyan-300/60">
                Closing
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                LoggerAI turns framework noise into engineering insight.
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/50">
                Instead of making engineers manually search through framework
                logs and reports to understand a failure, LoggerAI introduces
                an AI-powered diagnostic layer that parses the available data,
                identifies the likely root cause and provides a solution path.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                {["Java", "Spring Boot", "AI", "Framework Logs", "Root Cause", "Solutions"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-white/35 transition hover:text-white/70"
          >
            Back to portfolio →
          </Link>
        </div>
      </section>
    </main>
  );
}