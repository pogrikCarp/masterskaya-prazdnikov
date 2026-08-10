export function Icon({
  name,
  className = "",
}: {
  name: "vk" | "phone" | "telegram" | "menu" | "close" | "arrow" | "partyHorn";
  className?: string;
}) {
  const common = "fill-none stroke-current";

  if (name === "vk") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          className={common}
          strokeWidth="1.8"
          d="M3.5 7.5c.2 7.2 3.8 11.5 9.6 11.5h.6v-4.2c2.4.2 4.1 1.9 4.8 4.2H22c-.9-3.4-3-5-4.4-5.7 1.4-1 3-2.9 3.4-5.8h-3.1c-.5 2.1-1.9 4-4 4.2V7.5h-3.1v7.2c-2.2-.6-4-2.7-4.1-7.2H3.5Z"
        />
      </svg>
    );
  }

  if (name === "telegram") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          className={common}
          strokeWidth="1.8"
          strokeLinejoin="round"
          d="M20.4 4.6 3.9 11.3c-1 .4-.9 1.9.2 2.1l4.2.9 9.7-7.6-7.2 8.6v4c0 .9 1.1 1.3 1.7.7l2.6-2.5 4.2 3.1c.8.6 1.9.2 2.1-.8L22 5.9c.2-1-.7-1.7-1.6-1.3Z"
        />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          className={common}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.4 3.8 5.6 5.6c-.9.9-.9 2.3-.2 3.4a33.7 33.7 0 0 0 9.2 9.2c1.1.7 2.5.6 3.4-.2l1.8-1.8c.6-.6.4-1.7-.4-2l-3-1c-.6-.2-1.2 0-1.6.4l-1 1c-1.9-1.1-3.8-3-4.9-4.9l1-1c.4-.4.6-1 .4-1.6l-1-3c-.3-.8-1.4-1-2-.4Z"
        />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path className={common} strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  if (name === "close") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path className={common} strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
      </svg>
    );
  }

  if (name === "arrow") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path className={common} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 16l8-8M10 8h6v6" />
      </svg>
    );
  }

  if (name === "partyHorn") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          className={common}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 14.2c4.1 4.1 9.9 5.6 14.8 3.6 1.5-.6 1.6-2.7.1-3.4-1.9-.9-4.7-1.6-7.2-3.7C9.6 8.6 8.8 5.8 8 3.9c-.6-1.5-2.8-1.4-3.4.1-2 4.9-.5 10.7 3.6 14.8Z"
        />
        <path
          className={common}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.2 9.7 15 16.5"
        />
        <path
          className={common}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.6 7.4l.8-.8M18.5 10.2h1.1M16.7 12.9l.8.8"
        />
      </svg>
    );
  }

  return null;
}
