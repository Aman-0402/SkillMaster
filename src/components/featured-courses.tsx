import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Radio, MapPin, Signal } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const COURSES = [
  {
    subject: "Frontend",
    title: "Frontend Development with React",
    desc: "HTML, CSS, JavaScript and React. Ship real, responsive interfaces.",
    duration: "12 weeks",
    level: "Beginner",
    mode: "Live online",
    ModeIcon: Radio,
    to: "/courses/frontend",
    thumb: "from-brand-500 via-brand-600 to-brand-900",
  },
  {
    subject: "Backend",
    title: "Backend Development with Node.js",
    desc: "Build secure APIs, work with databases and deploy to the cloud.",
    duration: "12 weeks",
    level: "Intermediate",
    mode: "In-person",
    ModeIcon: MapPin,
    to: "/courses/backend",
    thumb: "from-emerald-500 via-emerald-600 to-emerald-900",
  },
  {
    subject: "Data Analyst",
    title: "Data Analytics with SQL & Power BI",
    desc: "Clean data, find insights and present them in clear dashboards.",
    duration: "10 weeks",
    level: "Beginner",
    mode: "Live online",
    ModeIcon: Radio,
    to: "/courses/data-analyst",
    thumb: "from-amber-400 via-orange-500 to-orange-800",
  },
  {
    subject: "AI",
    title: "Applied AI & Machine Learning",
    desc: "Python, ML fundamentals and building products with modern AI tools.",
    duration: "14 weeks",
    level: "Intermediate",
    mode: "Live online",
    ModeIcon: Radio,
    to: "/courses/ai",
    thumb: "from-fuchsia-500 via-purple-600 to-indigo-900",
  },
];

export default function FeaturedCourses() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="featured-title" className="bg-white">
      <div className="mx-auto w-full max-w-site px-4 py-16 sm:px-6 sm:py-24 lg:px-8 2xl:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Start learning</p>
            <h2 id="featured-title" className="mt-3 text-5xl font-extrabold tracking-tight text-slate-950 sm:text-7xl">
              Featured courses
            </h2>
          </div>
          <Link
            href="/courses"
            className="group inline-flex h-14 items-center gap-3 self-start rounded-full border-2 border-slate-900 px-8 text-lg font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:self-auto"
          >
            View all courses
            <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2 xl:grid-cols-4">
          {COURSES.map(({ subject, title, desc, duration, level, mode, ModeIcon, to, thumb }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: (i % 4) * 0.07 }}
            >
              <Link
                href={to}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_-28px_rgb(15_23_42/0.45)] transition-all duration-300 hover:border-brand-300 hover:shadow-[0_26px_50px_-24px_rgb(31_79_209/0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:hover:-translate-y-1"
              >
                <div className={`relative flex h-48 items-end overflow-hidden bg-gradient-to-br p-6 ${thumb}`}>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-4 select-none text-[9rem] font-extrabold leading-none text-white/15"
                  >
                    {subject.charAt(0)}
                  </span>
                  <span className="relative rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
                    {subject}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-950">{title}</h3>
                  <p className="mt-3 text-lg leading-snug text-slate-600">{desc}</p>

                  <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-base font-medium text-slate-700">
                    <li className="inline-flex items-center gap-2">
                      <Clock className="size-4 text-brand-600" aria-hidden />
                      {duration}
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <Signal className="size-4 text-brand-600" aria-hidden />
                      {level}
                    </li>
                    <li className="inline-flex items-center gap-2">
                      <ModeIcon className="size-4 text-brand-600" aria-hidden />
                      {mode}
                    </li>
                  </ul>

                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-lg font-semibold text-brand-700">
                    View course
                    <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
