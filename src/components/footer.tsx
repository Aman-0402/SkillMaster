import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUp, Clock, Mail, MessageCircle, Phone } from "lucide-react";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "All courses", to: "/courses" },
      { label: "Instructors", to: "/instructors" },
      { label: "Blog and free guides", to: "/blog" },
      { label: "Saved courses", to: "/saved" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Built by Aman Raj (Aman-0402)", to: "https://github.com/Aman-0402", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", to: "/privacy" },
      { label: "Terms of use", to: "/terms" },
      { label: "Refund policy", to: "/refund" },
      { label: "Cookie policy", to: "/cookies" },
    ],
  },
];

const CONTACTS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Chat on WhatsApp", href: "https://wa.me/919852104967", icon: <MessageCircle className="size-6" aria-hidden /> },
  { label: "+91 98521 04967", href: "tel:+919852104967", icon: <Phone className="size-6" aria-hidden /> },
  { label: "think.like.ai.aman@gmail.com", href: "mailto:think.like.ai.aman@gmail.com", icon: <Mail className="size-6" aria-hidden /> },
];

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-6",
  "aria-hidden": true,
} as const;

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Aman-0402",
    hover: "hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-200",
    icon: (
      <svg {...svgProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    hover: "hover:border-sky-400 hover:bg-sky-500/20 hover:text-sky-200",
    icon: (
      <svg {...svgProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    hover: "hover:border-pink-400 hover:bg-pink-500/20 hover:text-pink-200",
    icon: (
      <svg {...svgProps}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

const linkCls =
  "inline-block text-xl text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid w-full max-w-site gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:px-8 2xl:px-12">
        <div>
          <Link href="/" aria-label="SkillMaster home" className="inline-block text-4xl font-extrabold tracking-tight">
            Skill<span className="text-brand-400">Master</span>
          </Link>
          <p className="mt-6 max-w-md text-xl leading-snug text-white/70">
            Live classes, online and in person. Pick a batch and pay the fee in one visit.
          </p>

          <ul className="mt-8 space-y-5">
            {CONTACTS.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-4 text-xl text-white transition-colors hover:text-brand-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400"
                >
                  <span className="text-brand-300 transition-transform duration-200 group-hover:scale-110">{icon}</span>
                  {label}
                </a>
              </li>
            ))}
            <li className="inline-flex items-center gap-4 text-xl text-white/80">
              <Clock className="size-6 text-brand-300" aria-hidden />
              Mon to Sat, 6:00 pm to 10:00 pm
            </li>
          </ul>

          <ul className="mt-8 flex gap-4">
            {SOCIALS.map(({ label, href, icon, hover }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={`flex size-14 items-center justify-center rounded-full border border-white/20 text-white/80 transition-all duration-200 motion-safe:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${hover}`}
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid gap-12 sm:grid-cols-3">
          {COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-brand-300">{title}</h2>
              <ul className="mt-6 space-y-5">
                {links.map((l) => (
                  <li key={l.label}>
                    {"external" in l ? (
                      <a href={l.to} target="_blank" rel="noreferrer" className={linkCls}>
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.to} className={linkCls}>
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-site flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 2xl:px-12">
          <p className="text-lg text-white/60">© {new Date().getFullYear()} SkillMaster. All rights reserved.</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex h-14 items-center gap-3 self-start rounded-2xl border border-white/20 px-7 text-lg font-semibold transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 sm:self-auto"
          >
            <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1" aria-hidden />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
