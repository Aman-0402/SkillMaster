import { lazy, Suspense } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BarChart3, Brain, MapPin, Monitor, Radio, Server } from "lucide-react";

const LadderScene = lazy(() => import("./ladder-scene"));

const EASE = [0.22, 1, 0.36, 1] as const;

const SUBJECTS = [
  { label: "Frontend", Icon: Monitor },
  { label: "Backend", Icon: Server },
  { label: "Data Analyst", Icon: BarChart3 },
  { label: "AI", Icon: Brain },
];

const CHIPS = [
  { label: "Live online", Icon: Radio, pos: "left-0 top-[8%]", delay: 0 },
  { label: "In-person", Icon: MapPin, pos: "right-0 top-[36%]", delay: 1.2 },
];

export default function Hero() {
  const reduce = useReducedMotion() ?? false;
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(15_23_42/0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
      />
      <div aria-hidden className="absolute -right-24 -top-40 -z-10 size-[28rem] rounded-full bg-brand-100 blur-3xl" />

      <div className="mx-auto grid w-full max-w-site items-center gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] lg:gap-8 lg:px-8 lg:py-8 2xl:px-12">
        <div>
          <motion.h1
            id="hero-title"
            {...rise(0.08)}
            className="text-[2.9rem] font-extrabold leading-[1.02] tracking-tight text-slate-950 sm:text-7xl xl:text-[5.5rem] 2xl:text-[6.25rem]"
          >
            <span className="block">Learn something</span>
            <span className="block">
              <span className="relative inline-block text-brand-600">
                new
                <svg
                  aria-hidden
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-[0.2em] w-full text-brand-300"
                >
                  <path d="M2 9 C 40 1, 80 13, 120 6 S 180 4, 198 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>{" "}
              this week.
            </span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600 sm:text-[1.35rem] sm:leading-relaxed">
            Live online and in-person industry-level courses in frontend, backend, data analytics and AI. Pick a batch that
            fits your week and start learning.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/courses"
              className="group inline-flex h-16 items-center justify-center gap-3 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 pl-9 pr-3 text-lg font-semibold text-white shadow-[0_14px_32px_-10px_rgb(31_79_209/0.75),inset_0_1px_0_rgb(255_255_255/0.25)] transition-all duration-200 hover:shadow-[0_18px_38px_-10px_rgb(31_79_209/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98] motion-safe:hover:-translate-y-0.5"
            >
              Browse courses
              <span className="flex size-10 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white group-hover:text-brand-700">
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
            <Link
              href="/join"
              className="inline-flex h-16 items-center justify-center rounded-full border-2 border-slate-900 bg-white px-10 text-lg font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98]"
            >
              Join now
            </Link>
          </motion.div>

          <motion.div {...rise(0.32)} className="mt-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Industry-level courses</p>
            <ul className="mt-3 flex flex-wrap items-center gap-3">
            {SUBJECTS.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white py-2.5 pl-2.5 pr-5 text-base font-semibold text-slate-800 shadow-[0_8px_20px_-14px_rgb(15_23_42/0.35)] transition-transform duration-200 motion-safe:hover:-translate-y-0.5"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="size-5" aria-hidden />
                </span>
                {label}
              </li>
            ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          role="img"
          aria-label="3D illustration of students climbing a ladder toward a golden star"
          className="relative mx-auto h-[30rem] w-full sm:h-[36rem] lg:h-[36rem]"
        >
          <Suspense fallback={null}>
            <LadderScene animate={!reduce} />
          </Suspense>
          {CHIPS.map(({ label, Icon, pos, delay }) => (
            <motion.span
              key={label}
              aria-hidden
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay }}
              className={`pointer-events-none absolute hidden items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-[0_16px_40px_-16px_rgb(15_23_42/0.45)] backdrop-blur-md sm:inline-flex ${pos}`}
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-600 text-white">
                <Icon className="size-3.5" />
              </span>
              {label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
