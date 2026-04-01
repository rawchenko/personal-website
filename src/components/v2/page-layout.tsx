import { type ReactNode } from "react";

interface PageLayoutProps {
  info: ReactNode;
  portfolio: ReactNode;
}

export function PageLayout({ info, portfolio }: PageLayoutProps) {
  return (
    <div className="flex flex-col max-w-[1024px] mx-auto">
      <aside>
        {info}
      </aside>

      {/* Portfolio content */}
      <div className="min-w-0 overflow-hidden px-4 pt-2 pb-4">
        {portfolio}
      </div>
    </div>
  );
}
