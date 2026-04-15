"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { CursorFollower } from "@/components/cursor-follower";

type CardBaseProps = {
  cursorLabel?: string;
  cursorIcon?: "arrow" | "expand";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

type CardAsLink = CardBaseProps & {
  href: string;
  onClick?: never;
};

type CardAsButton = CardBaseProps & {
  onClick: (e: React.MouseEvent) => void;
  href?: never;
};

type CardProps = CardAsLink | CardAsButton;

const interactiveClass =
  "group block active:scale-[0.99] transition-transform duration-200";

export function Card(props: CardProps) {
  const inner =
    "href" in props && props.href ? (
      <Link
        href={props.href}
        className={cn(interactiveClass, props.className)}
        style={props.style}
      >
        {props.children}
      </Link>
    ) : (
      <button
        type="button"
        onClick={props.onClick}
        className={cn(interactiveClass, "w-full h-full text-left", props.className)}
        style={props.style}
      >
        {props.children}
      </button>
    );

  if (props.cursorLabel || props.cursorIcon) {
    return (
      <CursorFollower label={props.cursorLabel} icon={props.cursorIcon}>
        {inner}
      </CursorFollower>
    );
  }

  return inner;
}
