import type { SVGProps } from 'react';

export type ServiceIconKey =
  | 'shoe'
  | 'boot'
  | 'sole'
  | 'leather'
  | 'handbag'
  | 'belt'
  | 'luggage'
  | 'shine'
  | 'retail';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const baseProps = {
  width: 28,
  height: 28,
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function ShoeIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M3 22h22c2 0 3-1.6 3-3.4 0-1.8-1-2.8-2.6-3.2l-6-1.5-3-3.5c-.8-.9-1.8-1.4-3-1.4H7.5C5 9 3 11 3 13.5V22z" />
      <path d="M7 16h2m3 0h2m3 0h2" />
      <path d="M3 19h25" />
    </svg>
  );
}

export function BootIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M11 4h6v14h6c1.5 0 2.5 1 2.5 2.5v3c0 1.4-1 2.5-2.5 2.5H10c-2 0-3-1.4-3-3v-7" />
      <path d="M7 12c-2 .4-3 1.6-3 3.5v6c0 1.6 1.2 3 3 3" />
      <path d="M11 8h6m-6 4h6" />
    </svg>
  );
}

export function SoleIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M9 4c4 0 7 3 7 7v10c0 3.5-2 6-5 6s-5-2.5-5-6V11c0-1.5-1-2-2-2H3" />
      <path d="M9 9c2 0 4 1.5 4 4m-4 6c2 0 4-1.5 4-4" />
      <circle cx="9" cy="22" r="1" />
    </svg>
  );
}

export function LeatherIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M5 7c0-1.5 1-2.5 2.5-2.5h17c1.5 0 2.5 1 2.5 2.5v18c0 1.5-1 2.5-2.5 2.5h-17C6 27.5 5 26.5 5 25V7z" />
      <path d="M5 11h22M9 4.5v23M5 18h22" strokeDasharray="1.6 2" />
    </svg>
  );
}

export function HandbagIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M6 11h20l-1.5 14c-.2 1.5-1.4 2.5-3 2.5h-11c-1.6 0-2.8-1-3-2.5L6 11z" />
      <path d="M11 11V8a5 5 0 0 1 10 0v3" />
      <path d="M11 16v3m10-3v3" />
    </svg>
  );
}

export function BeltIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <rect x="3" y="11" width="26" height="10" rx="2" />
      <rect x="11" y="13" width="6" height="6" rx="1" />
      <path d="M14 16h4M8 16h2m11 0h2" />
    </svg>
  );
}

export function LuggageIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <rect x="6" y="9" width="20" height="17" rx="2.5" />
      <path d="M11 9V6.5C11 5.7 11.7 5 12.5 5h7c.8 0 1.5.7 1.5 1.5V9" />
      <path d="M11 13v9m10-9v9" />
      <path d="M9 26v1.5M23 26v1.5" />
    </svg>
  );
}

export function ShineIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M5 16.5c0-2 1.5-3.5 3.5-3.5h15c2 0 3.5 1.5 3.5 3.5v3c0 2-1.5 3.5-3.5 3.5h-15C6.5 23 5 21.5 5 19.5v-3z" />
      <path d="M9 16.5v3m4-3v3m4-3v3m4-3v3" />
      <path d="M13 13l1-4m4 4l1-4m4 4l1-4" />
    </svg>
  );
}

export function RetailIcon(props: IconProps) {
  return (
    <svg {...baseProps} {...props} aria-hidden="true">
      <path d="M16 4l12 12-12 12L4 16 16 4z" />
      <circle cx="20" cy="12" r="1.5" />
      <path d="M11 13l5 5" />
    </svg>
  );
}

export const ServiceIcons: Record<ServiceIconKey, (props: IconProps) => JSX.Element> = {
  shoe: ShoeIcon,
  boot: BootIcon,
  sole: SoleIcon,
  leather: LeatherIcon,
  handbag: HandbagIcon,
  belt: BeltIcon,
  luggage: LuggageIcon,
  shine: ShineIcon,
  retail: RetailIcon,
};
