import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import clsx from "clsx";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  Building2,
  ChevronDown,
  HelpCircle,
  LogIn,
  Menu,
  Monitor,
  Server,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = { title: string; desc: string; to: string; Icon: LucideIcon };
type NavGroup = { key: string; label: string; items: NavItem[] };

const GROUPS: NavGroup[] = [
  {
    key: "courses",
    label: "Courses",
    items: [
      { title: "Frontend", desc: "HTML, CSS, JavaScript and React", to: "/courses/frontend", Icon: Monitor },
      { title: "Backend", desc: "APIs, databases and server-side code", to: "/courses/backend", Icon: Server },
      { title: "Data Analyst", desc: "Excel, SQL, Python and dashboards", to: "/courses/data-analyst", Icon: BarChart3 },
      { title: "AI", desc: "Machine learning and generative AI", to: "/courses/ai", Icon: Brain },
    ],
  },
  {
    key: "about",
    label: "About",
    items: [
      { title: "About us", desc: "Our story, mission and values", to: "/about", Icon: Building2 },
      { title: "Portfolio", desc: "Work and results we are proud of", to: "/portfolio", Icon: Briefcase },
      { title: "FAQ", desc: "Answers to common questions", to: "/faq", Icon: HelpCircle },
    ],
  },
];

type TopEntry = { type: "link"; label: string; to: string } | { type: "group"; key: string };

const TOP: TopEntry[] = [
  { type: "group", key: "courses" },
  { type: "link", label: "Instructors", to: "/instructors" },
  { type: "link", label: "Blog", to: "/blog" },
  { type: "group", key: "about" },
  { type: "link", label: "Contact", to: "/contact" },
];

const PROMO: Record<string, { eyebrow: string; title: string; text: string; to: string; cta: string }> = {
  courses: {
    eyebrow: "Learn at your pace",
    title: "Pick a track and start building",
    text: "Frontend, Backend, Data Analyst and AI courses in one place.",
    to: "/courses",
    cta: "Browse all courses",
  },
  about: {
    eyebrow: "Who we are",
    title: "Learn from people who do the work",
    text: "Our story, the work we have done and answers to common questions.",
    to: "/about",
    cta: "Our story",
  },
};

const ALL_PATHS = GROUPS.flatMap((g) => g.items.map((i) => i.to));
const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, to: string) {
  if (pathname === to) return true;
  if (!pathname.startsWith(to + "/")) return false;
  return !ALL_PATHS.some((p) => p !== to && p.startsWith(to + "/") && pathname.startsWith(p));
}

const pill =
  "inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-200";

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className={clsx("text-2xl font-extrabold tracking-tight", onDark ? "text-white" : "text-slate-950")}>
      Skill<span className="text-brand-600">Master</span>
    </span>
  );
}

function Promo({ eyebrow, title, text, to, cta, onPick }: (typeof PROMO)[string] & { onPick: () => void }) {
  return (
    <Link
      href={to}
      onClick={onPick}
      className="group relative isolate flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-slate-950 p-6 text-white"
    >
      <span aria-hidden className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-brand-600/40 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <span aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(255_255_255/0.08)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">{eyebrow}</span>
      <span>
        <span className="block text-lg font-semibold leading-snug">{title}</span>
        <span className="mt-1.5 block text-sm leading-relaxed text-white/60">{text}</span>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
          {cta}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </span>
    </Link>
  );
}

function MegaPanel({ group, pathname, onPick }: { group: NavGroup; pathname: string; onPick: () => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{group.label}</p>
        <ul className="grid gap-1 sm:grid-cols-2">
          {group.items.map(({ title, desc, to, Icon }) => {
            const active = isActive(pathname, to);
            return (
              <li key={to}>
                <Link
                  href={to}
                  onClick={onPick}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "group flex items-start gap-3.5 rounded-2xl p-3.5 transition-colors",
                    active ? "bg-brand-50" : "hover:bg-slate-100",
                  )}
                >
                  <span
                    className={clsx(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105",
                      active ? "bg-brand-600 text-white" : "bg-slate-950 text-white group-hover:bg-brand-600",
                    )}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 font-semibold text-slate-950">
                      {title}
                      <ArrowRight className="size-3.5 -translate-x-1 text-brand-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden />
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-slate-500">{desc}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-slate-200 px-3 pt-4 text-sm">
          <span className="font-semibold text-slate-500">Not sure where to start?</span>
          <Link href="/contact" onClick={onPick} className="inline-flex items-center gap-1.5 font-semibold text-slate-950 hover:text-brand-700">
            Talk to us <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
      <div className="hidden lg:block">
        <Promo {...PROMO[group.key]} onPick={onPick} />
      </div>
    </div>
  );
}

function DesktopNav() {
  const [pathname] = useLocation();
  const reduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState<{ key: string; at: string; pinned: boolean } | null>(null);
  const [dir, setDir] = useState(1);
  const rootRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const openKey = open && open.at === pathname ? open.key : null;
  const group = GROUPS.find((g) => g.key === openKey);
  const clear = () => window.clearTimeout(timer.current);
  useEffect(() => clear, []);

  const idx = (key: string | null) => GROUPS.findIndex((g) => g.key === key);
  const setDirection = (key: string) => {
    const cur = idx(openKey);
    if (cur >= 0) setDir(idx(key) >= cur ? 1 : -1);
  };

  useEffect(() => {
    if (!openKey) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        rootRef.current?.querySelector<HTMLElement>(`[data-group="${openKey}"]`)?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openKey]);

  const enter = (key: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    setHovered(key);
    clear();
    setDirection(key);
    setOpen((o) => (o?.key === key && o.at === pathname ? o : { key, at: pathname, pinned: false }));
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    clear();
    timer.current = window.setTimeout(() => setOpen((o) => (o?.pinned ? o : null)), 180);
  };
  const toggle = (key: string) => {
    clear();
    setDirection(key);
    setOpen((o) => {
      const same = o?.key === key && o.at === pathname;
      return same && o?.pinned ? null : { key, at: pathname, pinned: true };
    });
  };

  const linkCls = (active: boolean) =>
    clsx(
      "relative z-10 inline-flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-semibold transition-colors duration-200",
      active ? "text-slate-950" : "text-slate-700 hover:text-slate-950",
    );
  const hoverPill = (
    <motion.span
      layoutId="nav-hover"
      aria-hidden
      className="absolute inset-0 rounded-full bg-slate-100"
      transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
    />
  );

  return (
    <div ref={rootRef} className="hidden items-center gap-1 lg:flex" onPointerLeave={() => setHovered(null)}>
      {TOP.map((entry) => {
        if (entry.type === "link") {
          const key = entry.to;
          const active = pathname === entry.to || pathname.startsWith(entry.to + "/");
          return (
            <div key={key} className="relative" onPointerEnter={(e) => e.pointerType === "mouse" && (setHovered(key), clear(), setOpen(null))}>
              {!reduce && hovered === key && hoverPill}
              <Link href={entry.to} className={linkCls(active)}>
                {entry.label}
              </Link>
            </div>
          );
        }
        const g = GROUPS.find((x) => x.key === entry.key)!;
        const isOpen = openKey === g.key;
        const current = g.items.some((i) => isActive(pathname, i.to));
        return (
          <div key={g.key} className="relative" onPointerEnter={enter(g.key)} onPointerLeave={leave}>
            {!reduce && (hovered === g.key || (isOpen && !hovered)) && hoverPill}
            <button
              type="button"
              data-group={g.key}
              aria-expanded={isOpen}
              aria-controls={`menu-${g.key}`}
              onClick={() => toggle(g.key)}
              className={linkCls(current || isOpen)}
            >
              {g.label}
              <ChevronDown className={clsx("size-4 transition-transform duration-300", isOpen && "rotate-180")} aria-hidden />
            </button>
          </div>
        );
      })}

      <AnimatePresence>
        {group && (
          <motion.div
            key="mega"
            className="absolute inset-x-0 top-full z-50"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            onPointerEnter={(e) => e.pointerType === "mouse" && clear()}
            onPointerLeave={leave}
          >
            <div className="border-b border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgb(15_23_42/0.35)]">
              <div className="mx-auto w-full max-w-site overflow-hidden px-4 py-7 sm:px-6 lg:px-8 2xl:px-12">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={group.key}
                    id={`menu-${group.key}`}
                    initial={reduce ? false : { opacity: 0, x: dir * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: dir * -28 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <MegaPanel group={group} pathname={pathname} onPick={() => setOpen(null)} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ onPick }: { onPick: () => void }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.nav
      id="mobile-menu"
      aria-label="Mobile"
      className="h-[calc(100dvh-5rem)] overflow-y-auto bg-black text-white lg:hidden"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="mx-auto grid w-full max-w-site gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6">
        <motion.section
          aria-labelledby="m-explore"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
        >
          <h2 id="m-explore" className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
            Explore
          </h2>
          <ul>
            {TOP.flatMap((e) => (e.type === "link" ? [e] : [])).map((l) => (
              <li key={l.to}>
                <Link href={l.to} onClick={onPick} className="block rounded-2xl p-3 text-lg font-semibold transition-colors hover:bg-white/10">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.section>
        {GROUPS.map((g, i) => (
          <motion.section
            key={g.key}
            aria-labelledby={`m-${g.key}`}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.07 }}
          >
            <h2 id={`m-${g.key}`} className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
              {g.label}
            </h2>
            <ul>
              {g.items.map(({ title, desc, to, Icon }) => (
                <li key={to}>
                  <Link href={to} onClick={onPick} className="flex items-start gap-3.5 rounded-2xl p-3 transition-colors hover:bg-white/10">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-semibold">{title}</span>
                      <span className="block text-sm text-white/55">{desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
        <motion.div
          className="flex flex-col gap-3 sm:col-span-2"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
        >
          <Link href="/contact" onClick={onPick} className={clsx(pill, "h-14 bg-brand-600 text-base text-white hover:bg-brand-500")}>
            Enquire now <ArrowRight className="size-4" aria-hidden />
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/login" onClick={onPick} className={clsx(pill, "h-12 border border-white/25 text-white hover:bg-white/10")}>
              <LogIn className="size-4" aria-hidden /> Sign in
            </Link>
            <Link href="/join" onClick={onPick} className={clsx(pill, "h-12 border border-white/25 text-white hover:bg-white/10")}>
              Register
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default function Navbar() {
  const [pathname] = useLocation();
  const reduce = useReducedMotion() ?? false;
  const [mobileAt, setMobileAt] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mobileOpen = mobileAt === pathname;

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (y < 160) setHidden(false);
      else if (y > last + 6) setHidden(true);
      else if (y < last - 6) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const close = () => setMobileAt(null);

  return (
    <motion.header
      animate={{ y: hidden && !mobileOpen ? "-100%" : "0%" }}
      transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
      className={clsx(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300",
        mobileOpen
          ? "border-white/10 bg-black"
          : scrolled
            ? "border-slate-200/80 bg-white/95 shadow-[0_10px_30px_-18px_rgb(15_23_42/0.35)] backdrop-blur-xl"
            : "border-transparent bg-white/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-20 w-full max-w-site grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8 2xl:px-12">
        <Link
          href="/"
          aria-label="SkillMaster home"
          className={clsx("flex items-center rounded-xl py-2 pr-2 focus-visible:outline-offset-4", mobileOpen && "bg-white px-2")}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="justify-self-center">
          <DesktopNav />
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/login"
            aria-label="Sign in"
            className={clsx(pill, "text-slate-700 hover:bg-slate-100 hover:text-slate-950 max-xl:w-10 max-xl:px-0", mobileOpen ? "hidden" : "hidden sm:inline-flex")}
          >
            <LogIn className="size-4" aria-hidden />
            <span className="hidden xl:inline">Sign in</span>
          </Link>
          <Link
            href="/join"
            className={clsx(pill, "border border-slate-300 text-slate-900 hover:border-slate-950", mobileOpen ? "hidden" : "hidden md:inline-flex")}
          >
            Register
          </Link>
          <Link
            href="/contact"
            className={clsx(pill, "group bg-slate-950 text-white hover:bg-brand-600", mobileOpen ? "hidden" : "hidden sm:inline-flex")}
          >
            Enquire now
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileAt(mobileOpen ? null : pathname)}
            className={clsx(
              "inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
              mobileOpen ? "bg-white text-slate-950" : "bg-slate-950 text-white hover:bg-brand-600",
            )}
          >
            <motion.span
              key={mobileOpen ? "x" : "menu"}
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="inline-flex"
            >
              {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </motion.span>
          </button>
        </div>
      </div>

      {!mobileOpen && (
        <motion.span
          aria-hidden
          style={{ scaleX: reduce ? scrollYProgress : smooth }}
          className="absolute inset-x-0 -bottom-px h-0.5 origin-left bg-brand-600"
        />
      )}

      <AnimatePresence>{mobileOpen && <MobileMenu onPick={close} />}</AnimatePresence>
    </motion.header>
  );
}
