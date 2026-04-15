"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink } from "./link";

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
            ? "text-black underline underline-offset-2 decoration-1"
            : "text-text-nav-inactive hover:text-black"
        )}
      >
        home
      </Link>

      <span className="relative">
        <span className={cn(navItemClass, "text-text-disabled cursor-default")}>
          thoughts
        </span>
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-[1.5deg] bg-[#f1f1f1] text-[#626262] text-[0.5rem] font-semibold tracking-snug leading-[0.625rem] px-[0.125rem] pt-[0.0625rem] pb-[0.125rem] rounded-[0.1875rem] shadow-sm whitespace-nowrap"
        >
          coming soon
        </span>
      </span>

      <ExternalLink
        href="https://linkedin.com/in/evgenii-kravchenko"
        className={cn(navItemClass, "text-text-nav-inactive hover:text-black")}
      >
        linkedin
      </ExternalLink>

      <ExternalLink
        href="https://twitter.com/rawchenko"
        className={cn(navItemClass, "text-text-nav-inactive hover:text-black")}
      >
        twitter
      </ExternalLink>
    </nav>
  );
}
