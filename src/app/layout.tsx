import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Agentation } from "agentation";
import { GradualBlur } from "@/components/gradual-blur";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Evgenii Kravchenko — Senior Product Designer",
  description:
    "Senior Product Designer crafting end-to-end product UI, design systems, and internal tooling.",
};

export const viewport = {
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="max-w-[1440px] mx-auto">
          <main>{children}</main>
        </div>
        <GradualBlur />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
