import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeadingProps {
  level: 2 | 3;
  children: ReactNode;
  className?: string;
}

const styles = {
  2: "text-heading-2 font-semibold text-text-primary",
  3: "text-body font-semibold text-text-primary",
} as const;

export function Heading({ level, children, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={cn(styles[level], className)}>{children}</Tag>;
}
