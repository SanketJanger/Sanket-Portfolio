"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowUpRight, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const LINKS = {
  github: "https://github.com/SanketJanger",
  linkedin: "https://www.linkedin.com/in/sanket-janger/",
  email: "mailto:sjanger@binghamton.edu",
  resume: "/SanketJanger_Resume.pdf",
};

type Project = {
  title: string;
  tagline: string;
  stack: string[];
  highlights: string[];
  status?: "In Progress" | "Completed";
  href?: string;
  demo?: string;
};

const PROJECTS: Project[] = [
  {
    title: "OrderFlow — Distributed Order Processing System",
    tagline: "Event-driven order processing with FastAPI, RabbitMQ, Redis pub/sub, and real-time WebSocket tracking.",
    stack: ["FastAPI", "Redis", "RabbitMQ", "PostgreSQL", "Next.js", "Docker"],
    highlights: [
      "Built a distributed order-processing system using RabbitMQ and PostgreSQL row-level locking, achieving 99.7% fulfillment across 1,000 concurrent orders while routing exhausted payment failures to a dead-letter queue.",
    "Scaled workers from 1 to 4 replicas for a 2.6x throughput improvement and diagnosed a Kubernetes HPA issue that incorrectly scaled an I/O-bound workload from 4 workers to 1, recovering 3.8x throughput after adjusting the scaling strategy.",
    "Implemented real-time order-status updates using Redis Pub/Sub and WebSockets, allowing clients to track order progress as asynchronous workers processed each stage."
    ],
    status: "Completed",
    href: "https://github.com/SanketJanger/OrderFlow---A-Distributed-Order-Processing-System",
  },
  {
    title: "GCP Usage Analytics Pipeline",
    tagline: "Event-driven pipeline on GCP with real-time streaming, BigQuery analytics, and Looker Studio dashboards.",
    stack: ["Python", "GCP Pub/Sub", "Cloud Functions", "BigQuery", "Looker Studio"],
    highlights: [
      "Built an event-driven pipeline that sends application events through GCP Pub/Sub and Cloud Functions into BigQuery with under 2-second end-to-end latency from publish to query.",
    "Optimized BigQuery storage with date partitioning and component-level clustering, reducing unnecessary data scans while supporting targeted analytics queries.",
    "Deployed a FastAPI ingestion layer on Cloud Run with error-rate and latency monitoring, then integrated GrindMate through a secured HTTP endpoint so real user activity flows into the analytics pipeline."
    ],
    status: "Completed",
    href: "https://github.com/SanketJanger/usage-analytics-pipeline",
    demo: "https://usage-analytics-api-518291172957.us-central1.run.app/dashboard",
  },
  {
    title: "GrindMate — An LeetCode Companion",
    tagline: "AI-powered developer learning tool with spaced-repetition scheduling and DSA progress tracking.",
    stack: ["TypeScript", "React", "Vite", "Cloudflare Workers AI", "Durable Objects", "GitHub OAuth"],
    highlights: [
     "Built a chat-based DSA tracker where users log problems in natural language and Llama 3.3 extracts structured problem details, with per-user state isolated through Durable Objects and D1.",
    "Implemented spaced-repetition reviews at 1, 3, and 7-day intervals using Durable Object Alarms, a NeetCode 150 roadmap across 18 categories, and automated daily review emails through Resend.",
    "Shipped the product publicly and iterated on onboarding based on real user behavior, then built an analytics pipeline that streams Cloudflare Workers events into GCP BigQuery to measure usage and drop-off."
    ],
    status: "Completed",
    demo: "https://grindmate.dev/",
  },
  {
    title: "FinPulse — Real-Time Financial News Intelligence Platform",
    tagline: "Real-time financial news platform with AI sentiment analysis, summarization, and semantic search.",
    stack: [
      "Python",
      "FastAPI",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "WebSockets",
      "FinBERT",
      "Llama 3.3",
      "ChromaDB",
      "sentence-transformers",
    ],
    highlights: [
      "Built a real-time news processing pipeline that ingests and serves 500+ articles per hour using Kafka, FastAPI, Redis, PostgreSQL, and WebSockets, achieving sub-50ms cached API latency.",
      "Implemented an AI pipeline with local FinBERT sentiment analysis, Llama 3.3 summarization, and RAG-based semantic search using sentence-transformers and ChromaDB across 10K+ articles.",
    ],
    status: "Completed",
    href: "https://github.com/SanketJanger/Live-News-Feeding-Platform"
  },
  {
    title: "Ensemble Learning for Medical Risk Prediction",
    tagline: "Stacked models with CNN + Gradient Boosting for risk scoring.",
    stack: ["PyTorch", "scikit-learn", "Python"],
    highlights: ["Cross-validation training pipeline", "Benchmarking + evaluation", "Fast inference focus"],
    status: "Completed",
    href: "https://github.com/SanketJanger/Ensemble-Learning-for-Medical-Risk-Prediction",
  },
];

const EXPERIENCE = [
  {
    role: "Back End Developer Intern — Altheros Capital",
    when: "June 2026 – Present",
    where: "Los Angeles, CA",
    bullets: [
      "Delivered the backend for an investor portal in 8 days against a 2-week estimate, replacing AWS Cognito with JWT-based authentication and implementing global, project-specific, and investor-specific document access.",
    "Identified and patched a broken object-level authorization vulnerability in a production API, preventing cross-user data exposure and enforcing field-level access control across authenticated profile endpoints.",
    "Built and maintained REST APIs for Cara AI using FastAPI, PostgreSQL, Redis, and Docker, covering authentication, user profiles, settings, and device-aware session management.",
    "Implemented AWS S3 document storage with presigned downloads, role-based access control, admin management APIs, and project-level investor authorization using Node.js, Express, PostgreSQL, and Prisma.",
  ],
  },
  {
    role: "Data Intern — Global Health Impact Project",
    when: "May 2025 – August 2025",
    where: "Binghamton, NY",
    bullets: [
      "Implemented disease-impact calculation logic using DALYs, treatment coverage, and drug efficacy to support country- level and year-over-year health outcome comparisons.",
      "Converted spreadsheet-based research workflows into reproducible Python scripts, reducing manual processing and im- proving consistency of Impact Score calculations.",
      "Debugged Impact Score discrepancies across country, disease, drug, and company mappings, improving reliability of forecasting results used by the research team.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Master of Science in Computer Science (AI Track)",
    school: "The State University of New York at Binghamton University",
    location: "Binghamton, NY",
    period: "Aug 2024 – Dec 2026",
    details: [
      "Relevant Coursework: Design and Analysis of Algorithms, Cloud Computing, Design Patterns, Programming Languages, System Programming, Intro to AI, Multi-Modal ML in BioMedicine, Intro to Machine Learning, Data Mining",
    ],
  },
  {
    degree: "Bachelor of Engineering in Computer Engineering (Honors in Data Science)",
    school: "Savitribai Phule Pune University",
    location: "India",
    period: "2020 – 2024",
    details: [
      "Coursework: Data Structures and Algorithms, Distributed Systems, Database Management System, Operating Systems, Computer Networks, Machine Learning, Big Data Analytics, Cloud Computing, Software Engineering, Discrete Mathematics, Object-Oriented Programming, Programming language",
    ],
  },
];

const SKILLS = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "HTML/CSS"] },
  { label: "Frameworks & Libraries", items: ["React", "Next.js", "FastAPI", "Flask", "Vite", "Node.js", "Express", "SQLAlchemy", "Alembic", "Prisma"] },
  { label: "Messaging / Streaming", items: ["RabbitMQ", "Apache Kafka", "WebSockets", "Redis Pub/Sub", "REST APIs"] },
  { label: "Datastores", items: ["PostgreSQL", "MySQL", "Redis", "BigQuery", "ChromaDB"]},
  { label: "Cloud & DevOps", items: ["AWS (S3, IAM)", "GCP (Pub/Sub, Cloud Run, Cloud Function, BigQuery)", "Docker", "Kubernetes",
    "Cloudflare (Workers, Durable Objects, D1)", "Git", "Linux"] },
  { label: "AI / Developer Tools", items: ["RAG", "LLM APIs", "FinBERT", "sentence-transformers", "Codex", "Cursor", "Claude Code"] },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

/** Premium cursor: ring + dot (desktop only) */
function PremiumCursor() {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);

  const ringX = useSpring(x, { stiffness: 120, damping: 18, mass: 0.9 });
  const ringY = useSpring(y, { stiffness: 120, damping: 18, mass: 0.9 });

  const dotX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.3 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  useEffect(() => {
    const down = () => document.documentElement.style.setProperty("--cursorScale", "0.85");
    const up = () => document.documentElement.style.setProperty("--cursorScale", "1");
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <motion.div className="pointer-events-none fixed z-[80] hidden md:block" style={{ translateX: ringX, translateY: ringY }}>
        <div
          className="h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            transform: "translate(-50%, -50%) scale(var(--cursorScale, 1))",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 0 24px rgba(99,102,241,0.20), 0 0 60px rgba(16,185,129,0.10)",
            background:
              "radial-gradient(circle at 30% 30%, rgba(99,102,241,.18), rgba(16,185,129,.10), transparent 70%)",
            backdropFilter: "blur(6px)",
          }}
        />
      </motion.div>

      <motion.div className="pointer-events-none fixed z-[90] hidden md:block" style={{ translateX: dotX, translateY: dotY }}>
        <div
          className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 0 18px rgba(99,102,241,0.55)",
          }}
        />
      </motion.div>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function ResumeModal({ onClose }: { onClose: () => void }) {
  const src = useMemo(() => `${LINKS.resume}?v=${Date.now()}`, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-2xl border border-white/10 bg-[#0b0c1a] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#070812]/80">
          <span className="text-sm font-medium text-white/70">Resume Preview</span>
          <div className="flex items-center gap-2">
            <a
              href={src}
              download="SanketJanger_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-1.5 text-sm font-medium text-[#070812] hover:opacity-90"
            >
              <Download className="h-4 w-4" /> Download
            </a>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5 text-white/70 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <iframe
          src={src}
          className="flex-1 w-full"
          title="Resume Preview"
        />
      </div>
    </div>
  );
}

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [showResume, setShowResume] = useState(false);

  return (
    <div className="min-h-screen bg-[#070812] text-white">
      <PremiumCursor />
      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      {/* background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(800px circle at 15% 10%, rgba(99,102,241,.22), transparent 55%), radial-gradient(900px circle at 85% 30%, rgba(16,185,129,.14), transparent 55%), radial-gradient(900px circle at 60% 90%, rgba(236,72,153,.12), transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.09) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070812]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="group inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
            <span className="font-medium tracking-tight text-white/90 group-hover:text-white">Sanket Janger</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#education">Education</a>
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#experience">Work-Ex</a>
            <a className="hover:text-white" href="#skills">Skills</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>

          <button
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            onClick={() => setShowResume(true)}
          >
            <Download className="h-4 w-4" />
            Resume
          </button>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-6xl px-4">
        {/* hero */}
        <section className="py-16 md:py-24">
          <div className="grid gap-8 md:gap-10 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/90" />
                MS CS (AI Track) • Binghamton University (graduating Dec 2026)
              </div>

              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                I build <span className="text-white/70">scalable systems</span> and
                <br />
                <span className="text-white/70">data-driven</span> products.
              </h1>

              <p className="mt-5 max-w-xl text-white/70">
                Software engineer focused on distributed systems, event-driven pipelines, and AI-powered developer tools. I build reliable backend and full-stack systems with clear product impact.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>TypeScript</Pill><Pill>Python</Pill><Pill>FastAPI</Pill><Pill>Next.js</Pill><Pill>GCP</Pill><Pill>Docker</Pill>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
                <a href="#projects" className="group inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[#070812] hover:opacity-90">
                  View Projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                </a>

                <a href={LINKS.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="mailto:sjanger@binghamton.edu" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>

              {/* scroll hint */}
              <a href="#about" className="mt-10 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/85">
                <span className="relative inline-flex h-6 w-4 items-start justify-center overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <span className="mt-1 h-2 w-1 rounded-full bg-white/70 animate-[scrollDot_1.4s_ease-in-out_infinite]" />
                </span>
                Scroll
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }} className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-white/5 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-4">
                  {/* bigger profile */}
                  <div className="relative h-32 w-32 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                    <Image src="/profile.jpg" alt="Profile" fill className="object-cover" priority sizes="128px" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                  </div>

                  <div>
                    <div className="text-lg font-medium">Sanket Navnath Janger</div>
                    <div className="text-sm text-white/65">Binghamton, NY • Open to SWE, Backend, and Platform roles • Open to Relocate • CPT/OPT Eligible</div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                    Available for interviews
                  </span>
                  <span className="animate-floaty">✨</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Section id="about" eyebrow="About" title="A quick snapshot">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
              <p className="text-white/70 leading-relaxed">
                Master’s student in Computer Science at SUNY Binghamton, graduating December 2026, focused on backend, full-stack, and AI-assisted software engineering. I build practical systems using Python, TypeScript, React, FastAPI, PostgreSQL, Redis, RabbitMQ, GCP, and Cloudflare. I’m looking for software engineering roles where I can contribute to product features, backend infrastructure, event-driven systems, and tools that solve real problems.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/70">Highlights</div>
              <ul className="mt-3 space-y-2 text-white/70">
                <li>• Backend: FastAPI, Flask, PostgreSQL, Redis, RabbitMQ, WebSockets</li>
                <li>• Cloud/Data: GCP Pub/Sub, Cloud Functions, Cloud Run, BigQuery</li>
                <li>• AI/Product: TypeScript, React, Cloudflare Workers AI, Durable Objects</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* ✅ MOVED: Education between About and Projects */}
        <Section id="education" eyebrow="Education" title="My academic background">
          <div className="space-y-5">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-lg font-medium">{e.degree}</div>
                    <div className="mt-1 text-sm text-white/70">{e.school}</div>
                  </div>
                  <div className="text-sm text-white/60">
                    {e.location} • {e.period}
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {e.details.map((d) => <li key={d}>• {d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Stuff I’ve built (and I’m building)">
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <motion.div key={p.title} whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-6 hover:bg-white/7">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-medium tracking-tight">{p.title}</div>
                    <div className="mt-1 text-sm text-white/65">{p.tagline}</div>
                  </div>
                  {p.status && (
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 text-xs",
                        p.status === "In Progress"
                          ? "border-indigo-400/30 bg-indigo-400/10 text-indigo-200"
                          : "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
                      )}
                    >
                      {p.status}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => <Pill key={s}>{s}</Pill>)}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {p.highlights.map((h) => <li key={h}>• {h}</li>)}
                </ul>

                <div className="mt-4 flex flex-wrap gap-4">
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-200"
                    >
                      View Repository →
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-sm text-emerald-300 hover:text-emerald-200"
                    >
                      Live Demo →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="experience" eyebrow="Professional" title="Work experience">
          <div className="space-y-5">
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="text-lg font-medium">{e.role}</div>
                  <div className="text-sm text-white/60">{e.where} • {e.when}</div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {e.bullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="skills" eyebrow="Skills" title="My toolbox">
          <div className="grid gap-5 md:grid-cols-2">
            {SKILLS.map((s) => (
              <div key={s.label} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
                <div className="text-sm text-white/70">{s.label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.items.map((it) => <Pill key={it}>{it}</Pill>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s build something useful">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7">
            <p className="text-white/70 max-w-2xl">
              Want to chat about internships/new-grad roles, backend systems, data pipelines, or building a project together?
              Reach out — I reply fast.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[#070812] hover:opacity-90" href="mailto:sjanger@binghamton.edu">
                <Mail className="h-4 w-4" /> Email me
              </a>
              <a className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" href={LINKS.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" onClick={() => setShowResume(true)}>
                <Download className="h-4 w-4" /> Download resume
              </button>
            </div>
          </div>
        </Section>

        <footer className="pb-10 pt-6 text-center text-xs text-white/45">
          <div className="mb-3 flex justify-center gap-4 text-white/70">
            <a className="hover:text-white" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-white" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-white" href="mailto:sjanger@binghamton.edu">Email</a>
            <button className="hover:text-white" onClick={() => setShowResume(true)}>Resume</button>
          </div>
          © {year} Sanket Janger  
        </footer>
      </main>
    </div>
  );
}
