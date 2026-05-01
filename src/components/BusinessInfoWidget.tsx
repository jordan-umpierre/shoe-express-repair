import clsx from 'clsx';
import type { GoogleBusinessInfo } from '@/types/google-places';

interface BusinessInfoWidgetProps {
  businessInfo: GoogleBusinessInfo | null;
  className?: string;
}

export function BusinessInfoWidget({
  businessInfo,
  className,
}: BusinessInfoWidgetProps) {
  if (!businessInfo) {
    return null;
  }

  return (
    <div
      className={clsx(
        'rounded-card border border-warmgray-200/70 bg-cream p-6',
        className
      )}
    >
      {/* Rating and review count */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-charcoal">
          {businessInfo.rating.toFixed(1)}
        </span>
        <div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="text-burgundy">
                {i + 1 <= Math.floor(businessInfo.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <p className="text-sm text-warmgray-600">
            {businessInfo.reviewCount} reviews
          </p>
        </div>
      </div>

      {/* Hours */}
      {businessInfo.hours && Object.keys(businessInfo.hours).length > 0 && (
        <div className="mb-4 border-t border-warmgray-200/70 pt-4">
          <h3 className="text-sm font-semibold text-charcoal mb-2">Hours</h3>
          <ul className="space-y-1 text-sm text-warmgray-700">
            {Object.entries(businessInfo.hours).map(([day, time]) => (
              <li key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Address */}
      {businessInfo.address && (
        <div className="border-t border-warmgray-200/70 pt-4">
          <h3 className="text-sm font-semibold text-charcoal mb-2">Address</h3>
          <p className="text-sm text-warmgray-700">{businessInfo.address}</p>
          {businessInfo.phone && (
            <p className="text-sm text-warmgray-700 mt-1">
              <a
                href={`tel:${businessInfo.phone}`}
                className="text-burgundy hover:underline"
              >
                {businessInfo.phone}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
