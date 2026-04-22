"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  mounted: boolean;
  setTheme: (t: Theme, coords?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  mounted: false,
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: ResolvedTheme) {
  if (resolved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function startViewTransition(callback: () => void, coords?: { x: number; y: number }) {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || prefersReduced || !coords) {
    callback();
    return;
  }

  const { x, y } = coords;
  const maxX = Math.max(x, window.innerWidth - x);
  const maxY = Math.max(y, window.innerHeight - y);
  const radius = Math.hypot(maxX, maxY);

  document.documentElement.style.setProperty("--vt-x", `${x}px`);
  document.documentElement.style.setProperty("--vt-y", `${y}px`);
  document.documentElement.style.setProperty("--vt-radius", `${radius}px`);

  document.startViewTransition(callback);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((t: Theme, coords?: { x: number; y: number }) => {
    const resolved = t === "system" ? getSystemTheme() : t;

    startViewTransition(() => {
      setThemeState(t);
      localStorage.setItem("theme", t);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    }, coords);
  }, []);

  // Initialize from localStorage + system preference on mount
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const stored = localStorage.getItem("theme") as Theme | null;
      const preference = stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";

      setThemeState(preference);

      const resolved = preference === "system" ? getSystemTheme() : preference;
      setResolvedTheme(resolved);
      applyTheme(resolved);

      setMounted(true);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Listen for OS preference changes when in "system" mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      const current = localStorage.getItem("theme") ?? "system";
      if (current === "system") {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        applyTheme(resolved);
      }
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext value={{ theme, resolvedTheme, mounted, setTheme }}>
      {children}
    </ThemeContext>
  );
}
