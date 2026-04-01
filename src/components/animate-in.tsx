import { type ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className }: AnimateInProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
