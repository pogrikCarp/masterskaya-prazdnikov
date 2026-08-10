import type { ReactNode } from "react";
import Header from "./Header";
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
      {showHeader ? <Header /> : null}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
