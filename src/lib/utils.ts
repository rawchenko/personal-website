export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const basePath = process.env.NODE_ENV === "production" ? "/personal-website" : "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
