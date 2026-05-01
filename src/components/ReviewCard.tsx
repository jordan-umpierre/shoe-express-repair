import clsx from 'clsx';
import type { Review } from '@/config/reviews';

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <article
      className={clsx(
        'flex h-full flex-col rounded-card border border-warmgray-200/70 bg-cream p-7 shadow-soft',
        className,
      )}
      aria-label={`Review from ${review.reviewer} on ${review.source}`}
    >
      <Stars rating={review.rating} />
      <blockquote className="mt-5 flex-1">
        <p className="font-display text-lg leading-relaxed text-charcoal">
          “{review.body}”
        </p>
      </blockquote>
      <footer className="mt-6 flex items-center gap-3 border-t border-warmgray-200/70 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-burgundy/10 text-burgundy text-sm font-semibold">
          {initialOf(review.reviewer)}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-charcoal">
            {review.reviewer}
          </p>
          <p className="text-xs uppercase tracking-[0.16em] text-warmgray-500">
            via {review.source}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const safe = Math.max(0, Math.min(5, rating));
  return (
    <span
      role="img"
      aria-label={`${safe} out of 5 stars`}
      className={clsx('flex items-center gap-0.5', className)}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i + 1 <= Math.floor(safe);
        const half = !filled && i + 0.5 <= safe;
        return (
          <Star
            key={i}
            kind={filled ? 'filled' : half ? 'half' : 'empty'}
          />
        );
      })}
    </span>
  );
}

function Star({ kind }: { kind: 'filled' | 'half' | 'empty' }) {
  const id = `s-${kind}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {kind === 'half' && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="#C9A87C" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2.5l2.95 6 6.62.96-4.78 4.66 1.13 6.58L12 17.7l-5.92 3.0 1.13-6.58L2.43 9.46 9.05 8.5 12 2.5z"
        fill={kind === 'filled' ? '#C9A87C' : kind === 'half' ? `url(#${id})` : 'none'}
        stroke="#C9A87C"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function initialOf(name: string): string {
  const stripped = name.replace(/[^A-Za-z]/g, '');
  return (stripped[0] ?? '?').toUpperCase();
}
