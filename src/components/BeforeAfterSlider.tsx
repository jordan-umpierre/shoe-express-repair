import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import clsx from 'clsx';

interface BeforeAfterSliderProps {
  beforeNode: ReactNode;
  afterNode: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
  initial?: number;
  ariaLabel?: string;
  className?: string;
}

export function BeforeAfterSlider({
  beforeNode,
  afterNode,
  beforeLabel = 'Before',
  afterLabel = 'After',
  caption,
  initial = 50,
  ariaLabel = 'Before and after comparison',
  className,
}: BeforeAfterSliderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState(clamp(initial));

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(clamp(pct));
  }, []);

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
    handleRef.current?.focus();
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.buttons === 0) return;
    setFromClientX(e.clientX);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setPos((p) => clamp(p - step));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setPos((p) => clamp(p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <figure className={clsx('flex flex-col gap-3', className)}>
      <div
        ref={wrapperRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-card border border-warmgray-200/70 bg-warmgray-100 shadow-card touch-none"
        aria-label={ariaLabel}
      >
        <div className="absolute inset-0">{beforeNode}</div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          aria-hidden="true"
        >
          {afterNode}
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur">
          {afterLabel}
        </span>

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${pos}%`, transform: 'translateX(-1px)' }}
        >
          <div className="h-full w-0.5 bg-cream/95 shadow-[0_0_0_1px_rgba(15,12,10,0.1)]" />
          <button
            ref={handleRef}
            type="button"
            role="slider"
            aria-orientation="horizontal"
            aria-label={`${ariaLabel} handle`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
            className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-warmgray-200 bg-cream text-charcoal shadow-card transition-transform hover:scale-105 focus-visible:scale-105"
          >
            <ChevronsIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm text-warmgray-700">{caption}</figcaption>
      )}
    </figure>
  );
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, n));
}

function ChevronsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="9 6 4 12 9 18" />
      <polyline points="15 6 20 12 15 18" />
    </svg>
  );
}

interface PlaceholderImageProps {
  label: string;
  variant?: 'before' | 'after';
}

export function PlaceholderImage({
  label,
  variant = 'before',
}: PlaceholderImageProps) {
  const isAfter = variant === 'after';
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center p-6 text-center',
        isAfter
          ? 'bg-gradient-to-br from-tan/30 via-cream to-parchment'
          : 'bg-gradient-to-br from-warmgray-200 via-warmgray-100 to-cream',
      )}
      aria-hidden="true"
    >
      <span className="font-display text-xs uppercase tracking-[0.18em] text-warmgray-600">
        {label}
      </span>
    </div>
  );
}
