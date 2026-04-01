import { type ReactNode } from "react";

interface PageLayoutProps {
  info: ReactNode;
  portfolio: ReactNode;
}

export function PageLayout({ info, portfolio }: PageLayoutProps) {
  return (
    <div className="flex flex-col desktop:flex-row max-w-[1440px] mx-auto">
      {/* Info sidebar — single column below 960px, fixed 448px sidebar above */}
      <aside className="shrink-0 desktop:w-[38%] desktop:max-w-[28rem] desktop:sticky desktop:top-0 desktop:self-start desktop:max-h-screen desktop:overflow-y-auto hide-scrollbar">
        {info}
      </aside>

      {/* Portfolio content */}
      <div className="min-w-0 flex-1 overflow-hidden px-4 pt-2 pb-4 desktop:pt-4">
        {portfolio}
      </div>
    </div>
  );
}
