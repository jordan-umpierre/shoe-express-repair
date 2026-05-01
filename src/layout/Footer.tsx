import { Link } from 'react-router-dom';
import { Logo } from '@/components/Logo';
import { businessInfo, formatAddressMultiLine } from '@/config/businessInfo';
import { navLinks } from '@/config/navigation';

export function Footer() {
  const year = new Date().getFullYear();
  const addr = formatAddressMultiLine();

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-prose py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              {businessInfo.brandLine} Locally owned and operated in Overland
              Park, KS for over {businessInfo.yearsInBusiness} years.
            </p>

            <div className="mt-6 space-y-2 text-sm">
              <a
                href={businessInfo.phone.tel}
                className="block font-display text-2xl font-semibold text-cream hover:text-tan transition-colors"
              >
                {businessInfo.phone.display}
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="block text-cream/75 hover:text-cream transition-colors"
              >
                {businessInfo.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-tan">
              Visit
            </h4>
            <address className="mt-4 not-italic text-sm leading-relaxed text-cream/85">
              <div>{addr.line1}</div>
              <div>{addr.line2}</div>
              <div className="mt-2 text-cream/60">{businessInfo.landmark}</div>
            </address>
            <a
              href={businessInfo.googleMaps.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-tan hover:text-cream transition-colors"
            >
              Get directions
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-tan">
              Hours
            </h4>
            <ul className="mt-4 space-y-1.5 text-sm">
              {businessInfo.hours.map((day) => (
                <li
                  key={day.key}
                  className="flex items-baseline justify-between gap-4 text-cream/85"
                >
                  <span>{day.label}</span>
                  <span className="text-cream/65">
                    {day.closed ? 'Closed' : `${day.open} – ${day.close}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-tan">
              Explore
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/85 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-cream/55">
            <li className="text-tan">We accept</li>
            {businessInfo.paymentMethods.map((method, idx) => (
              <li key={method} className="flex items-center gap-3">
                {idx > 0 && (
                  <span className="text-cream/30" aria-hidden="true">·</span>
                )}
                {method}
              </li>
            ))}
          </ul>
          <p className="text-xs text-cream/55">
            © {year} {businessInfo.name}. Locally owned and operated in
            Overland Park, KS.
          </p>
        </div>
      </div>
    </footer>
  );
}
