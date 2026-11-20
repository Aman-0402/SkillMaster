import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2, Languages, Sigma } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUBJECTS = [
  { label: "Programming", Icon: Code2 },
  { label: "English", Icon: Languages },
  { label: "Maths", Icon: Sigma },
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

      <div className="mx-auto w-full max-w-site px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 2xl:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            id="hero-title"
            {...rise(0.08)}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl xl:text-7xl"
          >
            Learn something <span className="text-brand-600">new</span> this week.
          </motion.h1>

          <motion.p {...rise(0.16)} className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Live online and in-person classes in programming, English, maths and more. Pick a batch that fits your week
            and start learning.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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

          <motion.ul {...rise(0.32)} className="mt-6 flex flex-wrap justify-center gap-2.5" aria-label="Subjects">
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

      </div>
    </section>
  );
}
