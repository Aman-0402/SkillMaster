import { Link, useLocation } from "wouter";
import clsx from "clsx";

const LINKS = [
  { label: "Courses", to: "/courses" },
  { label: "Instructors", to: "/instructors" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [pathname] = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-neutral-950">
      <nav aria-label="Main" className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <ul className="flex h-14 items-center justify-start gap-1 overflow-x-auto sm:justify-center sm:gap-4 lg:gap-8">
          {LINKS.map(({ label, to }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <li key={to} className="shrink-0">
                <Link
                  href={to}
                  aria-current={active ? "page" : undefined}
                  className={clsx(
                    "inline-block px-3 py-2 text-base font-semibold transition-colors duration-200",
                    active ? "text-white" : "text-neutral-300 hover:text-white",
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
