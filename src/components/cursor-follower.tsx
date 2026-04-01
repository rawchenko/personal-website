import { type ReactNode } from "react";

interface CursorFollowerProps {
  children: ReactNode;
  label?: string;
  icon?: "arrow" | "expand";
}

export function CursorFollower({ children }: CursorFollowerProps) {
  return <>{children}</>;
}
