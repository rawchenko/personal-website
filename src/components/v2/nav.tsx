"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItemClass =
  "text-base font-semibold tracking-[-0.03em] leading-5 transition-colors duration-200";

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
            : "text-[#999] hover:text-black"
        )}
      >
        home
      </Link>

      <span className="relative">
        <span className={cn(navItemClass, "text-[#CDCDCD] cursor-default")}>
          thoughts
        </span>
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 -rotate-[1.5deg] bg-[#f1f1f1] text-[#626262] text-[0.5rem] font-semibold tracking-[-0.02em] leading-[0.625rem] px-[0.125rem] pt-[0.0625rem] pb-[0.125rem] rounded-[0.1875rem] shadow-[0_1px_2px_#0000001F,0_4px_4px_#0000001A,0_9px_5px_#0000000D,0_15px_6px_#00000005] whitespace-nowrap"
        >
          coming soon
        </span>
      </span>

      <a
        href="https://linkedin.com/in/evgenii-kravchenko"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(navItemClass, "text-[#999] hover:text-black flex items-center")}
      >
        linkedin
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>

      <a
        href="https://x.com/rawchenko"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(navItemClass, "text-[#999] hover:text-black flex items-center")}
      >
        twitter
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </a>
    </nav>
  );
}
