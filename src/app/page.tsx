"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useMemo } from "react";


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
  href?: string;
  status?: "In Progress" | "Shipped";
  icon?: string; 
};

const PROJECTS: Project[] = [
  {
    title: "NYC Yellow Taxi Real-Time Analytics Platform",
    tagline: "FastAPI + Next.js + AWS analytics with natural-language querying.",
    stack: ["Python", "FastAPI", "Next.js", "AWS S3", "Athena", "Power BI", "CI/CD"],
    highlights: [
      "Scalable pipeline over millions of trips",
      "NLQ interface for insights on demand/fare/zones",
      "Dashboards + automated deployments",
    ],
    status: "In Progress",
    icon: "/projects/nyc-taxi.png",
  },
  {
    title: "Ensemble Learning for Medical Risk Prediction",
    tagline: "Stacked models with CNN + Gradient Boosting for risk scoring.",
    stack: ["PyTorch", "scikit-learn", "Python"],
    highlights: ["Cross-validation training pipeline", "Benchmarking + evaluation", "Fast inference focus"],
    status: "Shipped",
    icon: "/projects/medical-risk.png",
  },
  {
    title: "Retail Optimization Dashboard",
    tagline: "SQL pipelines + Power BI for inventory and sales decisions.",
    stack: ["SQL", "Power BI"],
    highlights: ["Forecasting + trend analysis", "Operational analytics for decision visibility"],
    status: "Shipped",
    icon: "/projects/retail.png",
  },
];

const EXPERIENCE = [
  {
    role: "Data Science Intern — Global Health Impact Project",
    when: "May 2025 – Aug 2025",
    where: "Binghamton, NY",
    bullets: [
      "Built Python ETL pipelines (Pandas) to ingest/standardize data across sources.",
      "Added QA checks + forecasting to estimate missing values and project trends.",
      "Generated automated entity charts and supported TypeScript/JS indicators.",
    ],
  },
  {
    role: "Software Engineering Intern — Emerging Technologies",
    when: "Feb 2023 – Mar 2023",
    where: "India",
    bullets: [
      "Built full-stack apps in C#/.NET with backend logic and real-time processing.",
      "Created a drag-and-drop ID Card Generator with automated data mapping.",
      "Integrated Firebase storage/auth and built audio translation via external APIs.",
    ],
  },
];

const SKILLS = [
  { label: "Languages", items: ["Python", "SQL", "Java", "C#"] },
  { label: "Data/ML", items: ["NumPy", "Pandas", "scikit-learn", "PyTorch"] },
  { label: "Cloud/DB", items: ["AWS (S3, Athena, Lambda, IAM, EC2)", "PostgreSQL", "MySQL"] },
  { label: "Tools", items: ["GitHub Actions", "Power BI", "Excel"] },
];

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}


function CursorToddler() {
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
      {/* ring */}
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

      {/* dot */}
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

function ProjectIcon({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">
        <Sparkles className="h-5 w-5" />
      </div>
    );
  }
  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <Image src={src} alt={alt} fill className="object-cover" sizes="48px" />
    </div>
  );
}

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-[#070812] text-white">
      <CursorToddler />

      {/* background: spotlight + grid */}
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

      {/* top nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070812]/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#home" className="group inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(16,185,129,0.55)]" />
            <span className="font-medium tracking-tight text-white/90 group-hover:text-white">Sanket Janger</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <a className="hover:text-white" href="#about">About</a>
            <a className="hover:text-white" href="#projects">Projects</a>
            <a className="hover:text-white" href="#experience">Work-Ex</a>
            <a className="hover:text-white" href="#skills">Skills</a>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>

          <a
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:bg-white/10"
            href={LINKS.resume}
            download
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </div>
      </header>

      <main id="home" className="mx-auto max-w-6xl px-4">
        {/* HERO */}
        <section className="py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr] md:items-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/90" />
                MS CS (AI Track) • Binghamton
              </div>

              <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                I build <span className="text-white/70">data-driven</span> products
                <br />
                that feel <span className="text-white/70">fast</span> and <span className="text-white/70">clean</span>.
              </h1>

              <p className="mt-5 max-w-xl text-white/70">
                Software + data engineering focused on pipelines, analytics, and practical ML. Currently building a real-time NYC taxi analytics platform with cloud + APIs.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Python</Pill>
                <Pill>AWS</Pill>
                <Pill>FastAPI</Pill>
                <Pill>Next.js</Pill>
                <Pill>SQL</Pill>
                <Pill>CI/CD</Pill>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-[#070812] hover:opacity-90"
                >
                  View Projects{" "}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-[1px] group-hover:translate-x-[1px]" />
                </a>

                <a
                  href="https://github.com/SanketJanger"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/sanket-janger"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>

                <a
                  href="mailto:sjanger@binghamton.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>

              {/* Smooth scroll */}
              <a
                href="#about"
                className="mt-10 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white/85"
              >
                <span className="relative inline-flex h-6 w-4 items-start justify-center overflow-hidden rounded-full border border-white/15 bg-white/5">
                  <span className="mt-1 h-2 w-1 rounded-full bg-white/70 animate-[scrollDot_1.4s_ease-in-out_infinite]" />
                </span>
                Scroll
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-white/5 blur-2xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="relative h-32 w-32 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
                    <Image
                      src="/profile.jpg"
                      alt="Profile"
                      fill
                      priority
                      className="object-cover"
                      sizes="112px"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
                  </div>

                  <div>
                    <div className="text-lg font-medium">Sanket Navnath Janger</div>
                    <div className="text-sm text-white/65">Binghamton, NY • Open to SWE / Data roles</div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-[#0b0c1a]/70 p-4">
                    <div className="text-sm text-white/70">Currently crafting</div>
                    <div className="mt-1 font-medium">Real-time analytics + NLQ</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Pill>Athena</Pill>
                      <Pill>S3</Pill>
                      <Pill>FastAPI</Pill>
                      <Pill>Next.js</Pill>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#0b0c1a]/70 p-4">
                    <div className="text-sm text-white/70">Design vibe</div>
                    <div className="mt-1 font-medium">Dark, glossy, minimal</div>
                    <div className="mt-2 text-sm text-white/60">
                      Smooth scrolling, subtle motion, and a premium cursor.
                    </div>
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
                I’m a CS grad student (AI Track) who likes building systems that turn messy real-world data into clean, useful products.
                I enjoy combining cloud, APIs, and thoughtful UI to make analytics feel effortless.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Pill>ETL</Pill>
                <Pill>Analytics</Pill>
                <Pill>ML</Pill>
                <Pill>System Design</Pill>
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-6">
              <div className="text-sm text-white/70">Highlights</div>
              <ul className="mt-3 space-y-2 text-white/70">
                <li>• Python ETL + QA checks + forecasting workflows</li>
                <li>• Cloud pipelines on AWS (S3/Athena/Lambda/EC2)</li>
                <li>• Full-stack work: FastAPI + Next.js + dashboards</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section id="projects" eyebrow="Projects" title="Stuff I’ve built (and I’m building)">
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-6 hover:bg-white/7"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <ProjectIcon src={p.icon} alt={p.title} />
                    <div>
                      <div className="text-lg font-medium tracking-tight">{p.title}</div>
                      <div className="mt-1 text-sm text-white/65">{p.tagline}</div>
                    </div>
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
                  {p.stack.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {p.highlights.map((h) => (
                    <li key={h}>• {h}</li>
                  ))}
                </ul>

                <div className="mt-5 text-xs text-white/55"></div>
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
                  <div className="text-sm text-white/60">
                    {e.where} • {e.when}
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {e.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
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
                  {s.items.map((it) => (
                    <Pill key={it}>{it}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" eyebrow="Contact" title="Let’s build something useful">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-7">
            <p className="text-white/70 max-w-2xl">
              Want to chat about internships/new-grad roles, backend systems, data pipelines, or building a project together?
              Reach out.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:sjanger@binghamton.edu" 
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" href={LINKS.github}>
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" href={LINKS.linkedin}>
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10" href={LINKS.resume} download>
                <Download className="h-4 w-4" /> Download resume
              </a>
            </div>
          </div>
        </Section>

        <footer className="pb-10 pt-6 text-center text-xs text-white/45">
          <div className="mb-3 flex justify-center gap-4 text-white/70">
            <a className="hover:text-white" href="https://github.com/SanketJanger" target="_blank">GitHub</a>
            <a className="hover:text-white" href="https://www.linkedin.com/in/sanket-janger" target="_blank">LinkedIn</a>
            <a className="hover:text-white" href="mailto:sjanger@binghamton.edu">Email</a>
            <a className="hover:text-white" href="/SanketJanger_Resume.pdf" download>Resume</a>
          </div>
          © {year} Sanket Janger • Built with Next.js
        </footer>
      </main>
    </div>
  );
}