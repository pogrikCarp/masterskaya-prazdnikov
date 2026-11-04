"use client";

import type { ReactNode } from "react";
import Button, { type ButtonSize } from "./Button";
import { useRequestModal } from "./RequestModalProvider";

export default function RequestButton({
  children = "Оставить заявку",
  className,
  size = "md",
}: {
  children?: ReactNode;
  className?: string;
  size?: ButtonSize;
}) {
  const { openRequestModal } = useRequestModal();

  return (
    <Button type="button" size={size} className={className} onClick={openRequestModal}>
      {children}
    </Button>
  );
}
