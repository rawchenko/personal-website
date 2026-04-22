"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "./link";
import { ThemeToggle } from "./theme-toggle";

const navItemClass =
  "text-body font-semibold leading-5 transition-colors duration-200";

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname.startsWith("/work");

  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/"
        className={cn(
          navItemClass,
          isHome
            ? "text-text-heading underline underline-offset-2 decoration-1"
            : "text-text-nav-inactive hover:text-text-heading"
        )}
      >
        home
      </Link>

      <ExternalLink
        href="https://linkedin.com/in/evgenii-kravchenko"
        className={cn(navItemClass, "text-text-nav-inactive hover:text-text-heading")}
      >
        linkedin
      </ExternalLink>

      <ExternalLink
        href="https://x.com/rawchenko"
        className={cn(navItemClass, "text-text-nav-inactive hover:text-text-heading")}
      >
        twitter
      </ExternalLink>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
