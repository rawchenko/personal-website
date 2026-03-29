import { type ReactNode } from "react";
import { Nav } from "./nav";

interface PageLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
  sidebarVariant?: "default" | "plain";
}

export function PageLayout({
  sidebar,
  children,
  sidebarVariant = "default",
}: PageLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 p-3">
      {/* Nav — mobile: renders fixed hamburger button + overlay; desktop: 120px column */}
      <div className="contents lg:block lg:w-[120px] lg:shrink-0 lg:sticky lg:top-3 lg:self-start lg:pt-2">
        <Nav />
      </div>

      {/* Sidebar */}
      <aside
        className={`shrink-0 lg:w-[380px] lg:sticky lg:top-3 lg:self-start lg:max-h-[calc(100vh-24px)] ${
          sidebarVariant === "default"
            ? "bg-neutral-100 rounded-[32px] p-5 lg:p-7"
            : "pt-8 lg:pt-3"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
