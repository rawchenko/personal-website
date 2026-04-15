import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  variant: "primary" | "secondary";
  icon?: ReactNode;
  label: string;
  className?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  onClick: () => void;
  href?: never;
  external?: never;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "inline-flex items-center justify-center gap-1.5 h-12 rounded-xl text-label font-semibold transition-all duration-150 active:scale-[0.97]";

const variants = {
  primary: `${base} bg-button-primary text-button-primary-text hover:bg-button-primary-hover active:bg-button-primary-active`,
  secondary: `${base} bg-button-secondary text-text-primary hover:bg-button-secondary-hover active:bg-button-secondary-active`,
};

export function Button(props: ButtonProps) {
  const classes = cn(variants[props.variant], props.className);

  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={classes}
        {...(props.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {props.icon}
        {props.label}
      </a>
    );
  }

  return (
    <button type="button" onClick={props.onClick} className={classes}>
      {props.icon}
      {props.label}
    </button>
  );
}
