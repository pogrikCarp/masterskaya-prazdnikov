"use client";

import { Component, type ReactNode } from "react";

export default class ClientErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div className="rounded-[28px] bg-white/60 py-16 text-center text-black/45 ring-1 ring-black/5">
            Не получилось показать этот блок. Обновите страницу.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
