interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 28, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="26" height="26" rx="7" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="20.5" cy="11" r="2.5" fill="currentColor" />
      <path d="M6 23L13 14.5L17.5 19.5L21.5 15L26 23H6Z" fill="currentColor" />
    </svg>
  );
}
