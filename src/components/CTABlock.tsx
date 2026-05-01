import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CTAButton {
  label: ReactNode;
  href: string;
  external?: boolean;
}

interface CTABlockProps {
  eyebrow?: string;
  headline: string;
  subline?: string;
  primary: CTAButton;
  secondary?: CTAButton;
  variant?: 'dark' | 'light';
  align?: 'center' | 'left';
  className?: string;
}

export function CTABlock({
  eyebrow,
  headline,
  subline,
  primary,
  secondary,
  variant = 'dark',
  align = 'center',
  className,
}: CTABlockProps) {
  const isDark = variant === 'dark';
  return (
    <section
      className={clsx(
        'relative isolate overflow-hidden',
        isDark ? 'bg-charcoal text-cream' : 'bg-cream text-charcoal',
        className,
      )}
    >
      {isDark && (
        <>
          <div className="absolute -top-32 -right-24 -z-10 h-[420px] w-[420px] rounded-full bg-burgundy/30 blur-[120px]" />
          <div className="absolute -bottom-32 -left-24 -z-10 h-[360px] w-[360px] rounded-full bg-tan/20 blur-[120px]" />
        </>
      )}
      <div
        className={clsx(
          'container-prose flex flex-col gap-7 py-20 sm:py-24 lg:py-28',
          align === 'center' ? 'items-center text-center' : 'items-start',
        )}
      >
        {eyebrow && (
          <p className={clsx('eyebrow', isDark ? 'text-tan' : 'text-burgundy')}>
            {eyebrow}
          </p>
        )}
        <h2
          className={clsx(
            'max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px]',
            isDark ? 'text-cream' : 'text-charcoal',
          )}
        >
          {headline}
        </h2>
        {subline && (
          <p
            className={clsx(
              'max-w-2xl text-base leading-relaxed sm:text-lg',
              isDark ? 'text-cream/75' : 'text-warmgray-700',
            )}
          >
            {subline}
          </p>
        )}
        <div
          className={clsx(
            'flex flex-wrap items-center gap-3',
            align === 'center' && 'justify-center',
          )}
        >
          <CTALink button={primary} primary variant={variant} />
          {secondary && <CTALink button={secondary} variant={variant} />}
        </div>
      </div>
    </section>
  );
}

function CTALink({
  button,
  primary,
  variant,
}: {
  button: CTAButton;
  primary?: boolean;
  variant: 'dark' | 'light';
}) {
  const target = button.external
    ? { target: '_blank', rel: 'noreferrer noopener' }
    : {};
  const className = primary
    ? 'btn-primary'
    : variant === 'dark'
      ? 'btn border border-cream/25 text-cream hover:border-tan hover:text-tan'
      : 'btn-ghost';
  return (
    <a href={button.href} className={className} {...target}>
      {button.label}
    </a>
  );
}
