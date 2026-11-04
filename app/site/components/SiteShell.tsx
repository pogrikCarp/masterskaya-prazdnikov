import type { ReactNode } from "react";
import GlassHeader from "./GlassHeader";
import Footer from "./Footer";

export default function SiteShell({
  children,
  showHeader = true,
}: {
  children: ReactNode;
  showHeader?: boolean;
}) {
  return (
    <div className="min-h-screen text-[var(--mp-text)]">
      {showHeader ? <GlassHeader appearance="light" /> : null}
      <main className={showHeader ? "pt-20 sm:pt-24" : undefined}>{children}</main>
      <Footer />
    </div>
  );
}
