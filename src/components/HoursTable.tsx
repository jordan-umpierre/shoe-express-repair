import clsx from 'clsx';
import { businessInfo, type DayHours, type DayKey } from '@/config/businessInfo';

interface HoursTableProps {
  variant?: 'light' | 'dark';
  highlightToday?: boolean;
  hours?: DayHours[];
  className?: string;
}

const todayKeyMap: Record<number, DayKey> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
};

export function HoursTable({
  variant = 'light',
  highlightToday = false,
  hours = businessInfo.hours,
  className,
}: HoursTableProps) {
  const todayKey = todayKeyMap[new Date().getDay()];
  const isDark = variant === 'dark';

  return (
    <ul
      className={clsx(
        'divide-y',
        isDark ? 'divide-cream/10' : 'divide-warmgray-200/80',
        className,
      )}
      role="list"
    >
      {hours.map((day) => {
        const isToday = highlightToday && day.key === todayKey;
        return (
          <li
            key={day.key}
            className={clsx(
              'flex items-baseline justify-between gap-4 py-2.5 text-sm',
              isToday &&
                (isDark
                  ? 'rounded-lg bg-burgundy/30 px-3 -mx-3 text-cream'
                  : 'rounded-lg bg-burgundy/8 px-3 -mx-3 text-charcoal'),
            )}
            aria-current={isToday ? 'date' : undefined}
          >
            <span
              className={clsx(
                'font-medium',
                isToday
                  ? isDark
                    ? 'text-cream'
                    : 'text-burgundy'
                  : isDark
                    ? 'text-cream/85'
                    : 'text-charcoal',
              )}
            >
              {day.label}
              {isToday && (
                <span
                  className={clsx(
                    'ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]',
                    isDark
                      ? 'bg-cream/20 text-cream'
                      : 'bg-burgundy text-cream',
                  )}
                >
                  Today
                </span>
              )}
            </span>
            <span
              className={clsx(
                'tabular-nums',
                isDark ? 'text-cream/65' : 'text-warmgray-600',
                day.closed && 'italic',
              )}
            >
              {day.closed ? 'Closed' : `${day.open} – ${day.close}`}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
