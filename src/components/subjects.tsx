import type { MouseEvent } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUBJECTS = [
  {
    title: "Frontend",
    desc: "Build fast, beautiful interfaces people love to use.",
    tags: ["HTML & CSS", "React", "TypeScript"],
    count: 1,
    to: "/courses/frontend",
  },
  {
    title: "Backend",
    desc: "Design APIs, databases and servers that scale.",
    tags: ["Node.js", "APIs", "SQL"],
    count: 1,
    to: "/courses/backend",
  },
  {
    title: "Data Analyst",
    desc: "Turn raw data into clear answers and dashboards.",
    tags: ["Excel", "SQL", "Power BI"],
    count: 1,
    to: "/courses/data-analyst",
  },
  {
    title: "AI",
    desc: "Learn machine learning and build with modern AI tools.",
    tags: ["Python", "ML", "LLMs"],
    count: 1,
    to: "/courses/ai",
  },
];

function trackGlow(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export default function Subjects() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="subjects-title" className="relative isolate overflow-hidden bg-black text-white">
      <div aria-hidden className="absolute -left-40 top-0 -z-10 size-[32rem] rounded-full bg-brand-700/30 blur-3xl" />

      <div className="mx-auto w-full max-w-site px-4 py-16 sm:px-6 sm:py-24 lg:px-8 2xl:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">Pick your path</p>
            <h2 id="subjects-title" className="mt-3 text-5xl font-extrabold tracking-tight sm:text-7xl">
              Subjects
            </h2>
          </div>
          <p className="max-w-lg text-xl text-white/65">
            Industry-level courses taught live, online and in person. Choose a subject and start climbing.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2">
          {SUBJECTS.map(({ title, desc, tags, count, to }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <Link
                href={to}
                onMouseMove={trackGlow}
                className="group relative flex h-full min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-brand-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 sm:p-11"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgb(57_101_227/0.28),transparent_60%)] group-hover:opacity-100"
                />
                <div className="relative flex items-center justify-between">
                  <span className="flex items-center gap-4 text-xl font-bold text-brand-300 sm:text-2xl">
                    {String(i + 1).padStart(2, "0")}
                    <span aria-hidden className="h-px w-12 bg-brand-300/50 sm:w-16" />
                  </span>
                  <span className="flex size-14 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black sm:size-16">
                    <ArrowUpRight className="size-7 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                </div>

                <div className="relative mt-16">
                  <h3 className="text-5xl font-extrabold tracking-tight sm:text-7xl">{title}</h3>
                  <p className="mt-4 max-w-lg text-xl leading-snug text-white/65 sm:text-2xl">{desc}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    {tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/20 px-4 py-1.5 text-base font-semibold text-white/80">
                        {t}
                      </span>
                    ))}
                    <span className="ml-auto text-lg font-medium text-white/60">
                      {count} {count === 1 ? "course" : "courses"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
