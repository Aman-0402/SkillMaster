import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Languages, MapPin, Radio, Sigma } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUBJECTS = [
  { label: "Programming", Icon: Code2 },
  { label: "English", Icon: Languages },
  { label: "Maths", Icon: Sigma },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BUSY = new Set([0, 2, 4, 5]);

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
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-[28rem] rounded-full bg-brand-100 blur-3xl" />

      <div className="mx-auto grid w-full max-w-site items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-8 lg:py-28 2xl:px-12">
        <div>
          <motion.p
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-sm font-semibold text-brand-700"
          >
            <Radio className="size-4" aria-hidden />
            Live online and in-person classes
          </motion.p>

          <motion.h1
            id="hero-title"
            {...rise(0.08)}
            className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl xl:text-7xl"
          >
            Learn something <span className="text-brand-600">new</span> this week.
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            Live online and in-person classes in programming, English, maths and more. Pick a batch that fits your week
            and start learning.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-brand-500 to-brand-700 pl-7 pr-3 text-base font-semibold text-white shadow-[0_12px_28px_-10px_rgb(31_79_209/0.75),inset_0_1px_0_rgb(255_255_255/0.25)] transition-all duration-200 hover:shadow-[0_16px_34px_-10px_rgb(31_79_209/0.9),inset_0_1px_0_rgb(255_255_255/0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98] motion-safe:hover:-translate-y-0.5"
            >
              Browse courses
              <span className="flex size-8 items-center justify-center rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-white group-hover:text-brand-700">
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
            <Link
              href="/join"
              className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-base font-semibold text-slate-900 transition-all duration-200 hover:border-slate-950 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98]"
            >
              Join now
            </Link>
          </motion.div>

          <motion.ul {...rise(0.32)} className="mt-10 flex flex-wrap gap-2.5" aria-label="Subjects">
            {SUBJECTS.map(({ label, Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                <Icon className="size-4 text-brand-600" aria-hidden />
                {label}
              </li>
            ))}
            <li className="inline-flex items-center rounded-full px-2 py-2 text-sm font-semibold text-slate-500">and more</li>
          </motion.ul>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32, rotate: 1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          aria-hidden
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_40px_80px_-40px_rgb(15_23_42/0.45)] sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Your week</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Batches open
              </span>
            </div>

            <div className="mt-6 grid grid-cols-7 gap-2">
              {DAYS.map((d, i) => (
                <div
                  key={d}
                  className={
                    BUSY.has(i)
                      ? "flex flex-col items-center gap-2 rounded-2xl bg-brand-600 py-4 text-white"
                      : "flex flex-col items-center gap-2 rounded-2xl bg-slate-100 py-4 text-slate-500"
                  }
                >
                  <span className="text-xs font-semibold">{d}</span>
                  <span className={BUSY.has(i) ? "size-1.5 rounded-full bg-white" : "size-1.5 rounded-full bg-slate-300"} />
                </div>
              ))}
            </div>

            <ul className="mt-6 space-y-3">
              {SUBJECTS.map(({ label, Icon }, i) => (
                <li key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-950">{label}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-500">
                      {i === 1 ? <MapPin className="size-3.5" /> : <Radio className="size-3.5" />}
                      {i === 1 ? "In-person" : "Live online"}
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-brand-600">Pick a batch</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
