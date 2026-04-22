"use client";

import { LockKey, X } from "@phosphor-icons/react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

export const PROJECT_ACCESS_PIN = "1234";

function accessStorageKey(slug: string) {
  return `project-access:${slug}`;
}

export function hasProjectAccess(slug: string) {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(accessStorageKey(slug)) === "granted";
}

export function grantProjectAccess(slug: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(accessStorageKey(slug), "granted");
}

interface ProjectAccessDialogProps {
  open: boolean;
  projectTitle: string;
  slug: string;
  onClose: () => void;
  onUnlock: () => void;
}

export function ProjectAccessDialog({
  open,
  projectTitle,
  slug,
  onClose,
  onUnlock,
}: ProjectAccessDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLFormElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const rafId = requestAnimationFrame(() => {
      setPin("");
      setError("");
      inputRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("disabled"));

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pin.trim() === PROJECT_ACCESS_PIN) {
      grantProjectAccess(slug);
      onUnlock();
      return;
    }

    setError("Wrong PIN");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/72 px-4 backdrop-blur-md dark:bg-black/62"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-access-title"
      onClick={onClose}
    >
      <form
        ref={panelRef}
        onSubmit={handleSubmit}
        className="w-full max-w-[360px] rounded-lg border border-border-card bg-surface-primary p-4 shadow-card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-text-primary">
            <LockKey size={18} weight="bold" aria-hidden />
            <h2 id="project-access-title" className="text-label font-semibold">
              Password access
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md text-text-primary/55 transition-colors hover:bg-button-secondary hover:text-text-primary"
            aria-label="Close"
          >
            <X size={16} weight="bold" aria-hidden />
          </button>
        </div>

        <p className="mt-2 text-sm leading-5 text-text-primary/60">
          Enter PIN to open {projectTitle}.
        </p>

        <label className="mt-4 block text-sm font-medium text-text-primary" htmlFor="project-pin">
          PIN
        </label>
        <input
          ref={inputRef}
          id="project-pin"
          value={pin}
          onChange={(event) => {
            setPin(event.currentTarget.value);
            if (error) setError("");
          }}
          type="password"
          inputMode="numeric"
          autoComplete="off"
          className="mt-2 h-11 w-full rounded-lg border border-border-subtle bg-surface-inset px-3 text-body text-text-primary outline-none transition-colors focus:border-text-primary/30"
        />
        <div className="mt-2 min-h-5 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-lg bg-button-secondary px-4 text-label font-semibold text-text-primary transition-colors hover:bg-button-secondary-hover"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 rounded-lg bg-button-primary px-4 text-label font-semibold text-button-primary-text transition-colors hover:bg-button-primary-hover"
          >
            Unlock
          </button>
        </div>
      </form>
    </div>
  );
}
