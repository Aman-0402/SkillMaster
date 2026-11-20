import { Link } from "wouter";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUBJECTS = [
  { title: "Frontend", count: 1, to: "/courses/frontend" },
  { title: "Backend", count: 1, to: "/courses/backend" },
  { title: "Data Analyst", count: 1, to: "/courses/data-analyst" },
  { title: "AI", count: 1, to: "/courses/ai" },
];

export default function Subjects() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="subjects-title" className="bg-black text-white">
      <div className="mx-auto w-full max-w-site px-4 py-16 sm:px-6 sm:py-20 lg:px-8 2xl:px-12">
        <h2 id="subjects-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Subjects
        </h2>

        <ul className="mt-10 border-t border-white/15 sm:mt-14">
          {SUBJECTS.map(({ title, count, to }, i) => (
            <motion.li
              key={title}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="border-b border-white/15"
            >
              <Link
                href={to}
                className="group flex items-end justify-between gap-6 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 sm:py-10"
              >
                <span className="text-3xl font-bold tracking-tight transition-colors duration-200 group-hover:text-brand-300 sm:text-5xl">
                  {title}
                </span>
                <span className="flex items-center gap-4 pb-1 text-sm text-white/60 transition-colors duration-200 group-hover:text-white">
                  {count} {count === 1 ? "course" : "courses"}
                  <ArrowRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
