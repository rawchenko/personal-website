"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  DotsThree,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const pageLinks = [{ href: "/", label: "Home" }];

const externalLinks = [
  {
    href: "https://linkedin.com/in/evgenii-kravchenko",
    label: "Linkedin",
  },
  {
    href: "https://twitter.com/rawchenko",
    label: "Twitter",
  },
  {
    href: "https://t.me/rawchenko",
    label: "Telegram",
  },
];

const desktopBaseClass =
  "group/item flex items-center rounded-lg bg-neutral-100 px-2.5 py-1 text-base font-medium transition-all duration-200 active:scale-[0.97]";

const arrowClass =
  "shrink-0 max-w-0 overflow-hidden opacity-0 transition-all duration-200 group-hover/item:max-w-[18px] group-hover/item:opacity-100 group-hover/item:mr-1.5";

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="group/nav hidden lg:flex flex-col items-start gap-2">
        {pageLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/" || pathname.startsWith("/work")
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                desktopBaseClass,
                isActive
                  ? "text-neutral-900 group-hover/nav:text-neutral-300 hover:!text-neutral-900"
                  : "text-neutral-400 group-hover/nav:text-neutral-300 hover:!text-neutral-900"
              )}
            >
              <ArrowRight size={18} className={arrowClass} />
              {link.label}
            </Link>
          );
        })}
        {externalLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              desktopBaseClass,
              "text-neutral-400 group-hover/nav:text-neutral-300 hover:!text-neutral-900"
            )}
          >
            <ArrowUpRight size={18} className={arrowClass} />
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-6 left-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100"
        aria-label="Open menu"
      >
        <DotsThree size={24} weight="bold" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col px-6 pt-6"
          >
            <div className="flex justify-start">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <motion.nav
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex flex-col gap-3 mt-6"
            >
              {pageLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-neutral-100 px-5 py-4 text-base font-medium text-neutral-900 active:scale-[0.97] transition-transform duration-200"
                >
                  {link.label}
                </Link>
              ))}
              {externalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-2xl bg-neutral-100 px-5 py-4 text-base font-medium text-neutral-900 active:scale-[0.97] transition-transform duration-200"
                >
                  {link.label}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
