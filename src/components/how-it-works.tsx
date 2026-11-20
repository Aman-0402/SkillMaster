import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { n: "01", title: "Create your account", desc: "Sign up with your email. It takes under a minute." },
  { n: "02", title: "Pick a course", desc: "Filter by subject, format, price and start date." },
  { n: "03", title: "Choose a batch and pay", desc: "Select a weekly slot that suits you, then pay the fee by UPI." },
  { n: "04", title: "Start learning", desc: "Open your course space, follow the timetable and finish the lessons." },
];

export default function HowItWorks() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section aria-labelledby="steps-title" className="relative isolate overflow-hidden bg-black text-white">
      <div aria-hidden className="absolute -right-40 bottom-0 -z-10 size-[32rem] rounded-full bg-brand-700/30 blur-3xl" />

      <div className="mx-auto w-full max-w-site px-4 py-16 sm:px-6 sm:py-24 lg:px-8 2xl:px-12">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">How it works</p>
        <h2 id="steps-title" className="mt-3 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-7xl">
          From sign-up to first class
        </h2>

        <ol className="relative mt-14 grid gap-6 sm:mt-20 md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(({ n, title, desc }, i) => (
            <motion.li
              key={n}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
              className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors duration-300 hover:border-brand-400/60 sm:p-9"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-600 text-2xl font-extrabold text-white shadow-[0_12px_30px_-10px_rgb(57_101_227/0.9)] transition-transform duration-300 motion-safe:group-hover:scale-110">
                {n}
              </span>
              <h3 className="mt-8 text-3xl font-extrabold leading-tight tracking-tight">{title}</h3>
              <p className="mt-3 text-xl leading-snug text-white/65">{desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
