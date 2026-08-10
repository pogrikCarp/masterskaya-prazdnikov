import { type ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:max-w-[1320px] xl:max-w-[1440px] 2xl:max-w-[1600px] ${className}`}
    >
      {children}
    </div>
  );
}
