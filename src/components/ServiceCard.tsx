import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { ServiceIcons, type ServiceIconKey } from '@/components/icons/ServiceIcons';

interface ServiceCardProps {
  title: string;
  teaser: string;
  iconKey: ServiceIconKey;
  href: string;
  className?: string;
  ctaLabel?: string;
}

export function ServiceCard({
  title,
  teaser,
  iconKey,
  href,
  className,
  ctaLabel = 'Learn more',
}: ServiceCardProps) {
  const Icon = ServiceIcons[iconKey];
  return (
    <Link
      to={href}
      className={clsx(
        'group flex h-full flex-col rounded-card border border-warmgray-200/70 bg-parchment p-6 shadow-soft transition-all duration-300 ease-gentle hover:-translate-y-0.5 hover:shadow-card focus-visible:-translate-y-0.5',
        className,
      )}
    >
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-burgundy/10 text-burgundy transition-colors group-hover:bg-burgundy group-hover:text-cream">
        <Icon className="h-6 w-6" />
      </span>
      <h3 className="font-display text-xl font-semibold text-charcoal">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-warmgray-700">
        {teaser}
      </p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy">
        {ctaLabel}
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="2" y1="8" x2="13" y2="8" />
      <polyline points="9 4 13 8 9 12" />
    </svg>
  );
}
