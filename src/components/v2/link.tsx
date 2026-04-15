import { cn } from "@/lib/utils";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("flex items-center", className)}
    >
      {children}
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
  );
}

const hoverStyles = {
  green: "hover:text-green-500 hover:decoration-green-500/40",
  blue: "hover:text-blue-500 hover:decoration-blue-500/40",
} as const;

interface AccentLinkProps {
  href: string;
  hoverColor: keyof typeof hoverStyles;
  children: React.ReactNode;
}

export function AccentLink({ href, hoverColor, children }: AccentLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-text-primary decoration-wavy underline decoration-text-primary/20 underline-offset-[3px] decoration-1 transition-colors",
        hoverStyles[hoverColor]
      )}
    >
      {children}
    </a>
  );
}
