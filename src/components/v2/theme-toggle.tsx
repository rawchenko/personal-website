"use client";

import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "@phosphor-icons/react";

export function ThemeToggle() {
  const { resolvedTheme, mounted, setTheme } = useTheme();

  if (!mounted) {
    return <div className="h-5 w-5" />;
  }

  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={(e) => setTheme(nextTheme, { x: e.clientX, y: e.clientY })}
      className="flex h-5 w-5 items-center justify-center text-text-nav-inactive transition-colors duration-200 hover:text-text-heading"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      <Icon size={18} weight="bold" />
    </button>
  );
}
