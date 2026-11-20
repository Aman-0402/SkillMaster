import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  { n: "01", title: "Create your account", desc: "Sign up with your email. It takes under a minute." },
  { n: "02", title: "Pick a course", desc: "Filter by subject, format, price and start date." },
  { n: "03", title: "Choose a batch and pay", desc: "Select a weekly slot that suits you, then pay the fee by UPI." },
  { n: "04", title: "Start learning", desc: "Open your course space, follow the timetable and finish the lessons." },
];

function Step({
  index,
  active,
  onActive,
  n,
  title,
  desc,
}: {
  index: number;
  active: boolean;
  onActive: (i: number) => void;
  n: string;
  title: string;
  desc: string;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      className={`group relative flex min-h-[22rem] items-center py-6 pl-10 transition-opacity duration-500 sm:min-h-[26rem] sm:pl-16 lg:min-h-[32rem] ${
        active ? "opacity-100" : "opacity-30 hover:opacity-70"
      }`}
    >
      <span
        aria-hidden
        className={`absolute left-0 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500 ${
          active ? "scale-125 border-brand-400 bg-brand-500 shadow-[0_0_0_8px_rgb(57_101_227/0.25)]" : "border-white/30 bg-black"
        }`}
      />
      <div className="transition-transform duration-300 motion-safe:group-hover:translate-x-2">
        <span className="text-xl font-bold text-brand-300 sm:text-2xl">Step {n}</span>
        <h3 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">{title}</h3>
        <p className="mt-5 max-w-xl text-xl leading-snug text-white/70 sm:text-2xl">{desc}</p>
      </div>
    </li>
  );
}

export default function HowItWorks() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section aria-labelledby="steps-title" className="relative isolate bg-black text-white">
      <div aria-hidden className="absolute -right-40 top-1/3 -z-10 size-[32rem] rounded-full bg-brand-700/25 blur-3xl" />

      <div className="mx-auto grid w-full max-w-site gap-4 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:px-8 2xl:px-12">
        {/* sticky left panel */}
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-10rem)] lg:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-300">How it works</p>
          <h2 id="steps-title" className="mt-3 text-5xl font-extrabold tracking-tight sm:text-7xl">
            From sign-up to first class
          </h2>

          <div aria-hidden className="relative mt-10 hidden h-56 lg:block">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? undefined : { opacity: 0, y: -40, filter: "blur(8px)" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute left-0 top-0 bg-gradient-to-b from-brand-300 to-brand-700 bg-clip-text text-[12rem] font-extrabold leading-none tracking-tighter text-transparent xl:text-[15rem]"
              >
                {STEPS[active].n}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* steps + progress line */}
        <div className="relative">
          <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px -translate-x-1/2 bg-white/15">
            <motion.div
              style={{ scaleY: reduce ? scrollYProgress : fill }}
              className="h-full origin-top bg-gradient-to-b from-brand-300 to-brand-500"
            />
          </div>
          <ol ref={listRef} className="relative">
            {STEPS.map((s, i) => (
              <Step key={s.n} index={i} active={active === i} onActive={setActive} {...s} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
