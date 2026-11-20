import { useRef } from "react";
import { Link } from "wouter";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CtaBanner() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const slow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const fast = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section aria-labelledby="cta-title" className="bg-white">
      <div className="mx-auto w-full max-w-site px-4 py-16 sm:px-6 sm:py-24 lg:px-8 2xl:px-12">
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-500 via-brand-700 to-brand-950 px-6 py-20 text-center text-white sm:px-12 sm:py-28"
        >
          <motion.div
            aria-hidden
            style={reduce ? undefined : { y: slow }}
            className="absolute -left-24 -top-24 -z-10 size-[26rem] rounded-full bg-white/10"
          />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { y: fast }}
            className="absolute -bottom-32 -right-20 -z-10 size-[30rem] rounded-full border-[3rem] border-white/10"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />

          <h2
            id="cta-title"
            className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl xl:text-[5.5rem]"
          >
            Your first class is one sign-up away.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80 sm:text-2xl">
            Create your account, pick a batch and start learning this week.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/join"
              className="group inline-flex h-16 items-center justify-center gap-3 rounded-full bg-white pl-9 pr-3 text-lg font-semibold text-brand-800 shadow-[0_18px_40px_-14px_rgb(0_0_0/0.5)] transition-all duration-200 hover:shadow-[0_22px_46px_-12px_rgb(0_0_0/0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] motion-safe:hover:-translate-y-0.5"
            >
              Join now
              <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white transition-colors duration-300 group-hover:bg-black">
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
            <Link
              href="/courses"
              className="inline-flex h-16 items-center justify-center rounded-full border-2 border-white/70 px-10 text-lg font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white hover:text-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
            >
              Browse courses
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
