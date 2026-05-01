import clsx from 'clsx';
import { businessInfo } from '@/config/businessInfo';

// [LOGO: Replace SVG with real logo file when provided]
// Text-based mark with a stitched-edge motif. Swap the entire return
// for an <img> or imported SVG once a finalized logo is supplied.

interface LogoProps {
  variant?: 'dark' | 'light';
  className?: string;
  ariaLabel?: string;
}

export function Logo({ variant = 'dark', className, ariaLabel }: LogoProps) {
  const isLight = variant === 'light';
  return (
    <span
      className={clsx('inline-flex items-center gap-3', className)}
      aria-label={ariaLabel ?? businessInfo.name}
    >
      <LogoMark className="shrink-0" variant={variant} />
      <span className="flex flex-col leading-none">
        <span
          className={clsx(
            'font-display font-semibold tracking-tightish text-[1.05rem] sm:text-[1.15rem]',
            isLight ? 'text-cream' : 'text-charcoal',
          )}
        >
          Shoe Express
        </span>
        <span
          className={clsx(
            'mt-0.5 text-[0.65rem] uppercase tracking-[0.22em]',
            isLight ? 'text-cream/70' : 'text-warmgray-500',
          )}
        >
          Repair &amp; Shine
        </span>
      </span>
    </span>
  );
}

function LogoMark({
  className,
  variant,
}: {
  className?: string;
  variant: 'dark' | 'light';
}) {
  const isLight = variant === 'light';
  const ring = isLight ? '#F7F2EA' : '#1F1B17';
  const accent = '#7A1F1F';
  const fill = isLight ? '#1F1B17' : '#F7F2EA';
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18.5" stroke={ring} strokeWidth="1.5" fill={fill} />
      <path
        d="M11 24c0-2 1.4-3.5 3.5-3.5h11.2c2.7 0 4.7 1.6 5.4 4.2L32 28H11v-4z"
        fill={accent}
      />
      <path
        d="M11 24h21"
        stroke={ring}
        strokeWidth="1"
        strokeDasharray="1.5 2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 21v-4m4 4v-5.5m4 5.5v-4"
        stroke={ring}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
