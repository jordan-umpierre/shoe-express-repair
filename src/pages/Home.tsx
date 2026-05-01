import { businessInfo } from '@/config/businessInfo';
import { FadeIn } from '@/components/FadeIn';
import { ServiceCard } from '@/components/ServiceCard';
import { homeServices } from '@/config/services';
import { FLOATING_CALL_ANCHOR_ATTR } from '@/layout/FloatingCallButton';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <HardLuggageCallout />
      <ProductsCallout />
    </>
  );
}

function HardLuggageCallout() {
  return (
    <section
      className="section bg-warmgray-50"
      aria-labelledby="hard-luggage-heading"
    >
      <div className="container-prose">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <p className="eyebrow">Rare capability</p>
            <h2
              id="hard-luggage-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl lg:text-[44px]"
            >
              We repair the luggage other shops turn away.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-warmgray-700">
              Even hard-shell and fiberglass luggage — most shops will not
              touch them. We will. Wheels, telescoping handles, zippers,
              cracked shells, broken pulls, torn liners. Bring it in.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                'Soft, hard-shell, and fiberglass cases',
                'Telescoping handle replacement',
                'Wheel rebuilds and replacement',
                'Zipper and pull replacement',
                'Liner repair and reinforcement',
                'Strap and exterior repair',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-charcoal"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={businessInfo.phone.tel} className="btn-primary">
                Call for a quote
              </a>
              <a
                href={businessInfo.phone.sms}
                className="btn-ghost"
              >
                Text a photo
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="relative">
              <div
                className="aspect-[4/5] w-full overflow-hidden rounded-card border border-warmgray-200/70 bg-gradient-to-br from-warmgray-200 via-warmgray-100 to-cream shadow-card"
                aria-hidden="true"
              >
                <div className="flex h-full items-center justify-center p-6 text-center">
                  <span className="font-display text-sm uppercase tracking-[0.18em] text-warmgray-500">
                    [PHOTO: Hard-shell luggage repair example]
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-card bg-charcoal px-5 py-4 text-cream shadow-deep sm:block">
                <p className="text-xs uppercase tracking-[0.18em] text-tan">
                  Local since 2000
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  {businessInfo.yearsInBusiness}+ years
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProductsCallout() {
  return (
    <section className="bg-cream" aria-labelledby="products-heading">
      <div className="container-prose py-14 sm:py-16">
        <FadeIn>
          <div className="grid items-center gap-8 rounded-card bg-charcoal px-7 py-9 text-cream shadow-deep sm:grid-cols-[auto_1fr_auto] sm:px-10 sm:py-11">
            <span className="hidden h-14 w-14 items-center justify-center rounded-full bg-tan/15 text-tan sm:inline-flex">
              <ShoppingIcon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-tan">
                In-store
              </p>
              <h2
                id="products-heading"
                className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl"
              >
                One of the largest selections of shoe care products in the
                Midwest.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/75">
                Polish, conditioners, brushes, laces, insoles, and protective
                treatments — for every leather and every use. Stop by and we
                will help you match the right product to your shoes.
              </p>
            </div>
            <a
              href={businessInfo.googleMaps.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn bg-tan text-charcoal hover:bg-cream sm:self-end"
            >
              Visit the shop
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ShoppingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 8h14l-1.4 11.5c-.1 1-.9 1.5-1.8 1.5H8.2c-.9 0-1.7-.5-1.8-1.5L5 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M9 12v2m6-2v2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

function ServicesStrip() {
  return (
    <section className="section bg-cream" aria-labelledby="services-strip-heading">
      <div className="container-prose">
        <FadeIn>
          <p className="eyebrow">What we work on</p>
          <h2
            id="services-strip-heading"
            className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
          >
            Six craft specialties under one roof.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-warmgray-700">
            Bring it in for a free assessment. If we can repair it, we will
            tell you how — and what it will cost — before any work begins.
          </p>
        </FadeIn>

        <ul
          className="mt-12 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3"
          role="list"
        >
          {homeServices.map((service, idx) => (
            <li
              key={service.id}
              className="w-[78%] shrink-0 snap-start sm:w-auto"
            >
              <FadeIn delay={idx * 0.04} className="h-full">
                <ServiceCard
                  title={service.title}
                  teaser={service.teaser}
                  iconKey={service.iconKey}
                  href={`/services#${service.id}`}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-charcoal text-cream"
      aria-labelledby="hero-heading"
    >
      {/* [PHOTO: Hero Background — leather workshop or shoe repair bench]
          Replace the gradient + texture composition below with a real photo
          (cover-positioned <img> + dark overlay) once one is supplied. */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-ink to-[#241914]" />
        <div className="absolute -top-20 -left-20 h-[520px] w-[520px] rounded-full bg-burgundy/35 blur-[120px]" />
        <div className="absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-tan/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" style={noiseStyle} aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-tan/40 to-transparent" />
      </div>

      <div className="container-prose flex min-h-[78vh] flex-col justify-center py-24 sm:min-h-[82vh] sm:py-28 lg:py-36">
        <FadeIn>
          <p className="eyebrow text-tan">
            Cobbler &amp; Leather Craftsman · Overland Park, KS
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h1
            id="hero-heading"
            className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish text-cream sm:text-5xl lg:text-[64px]"
          >
            Expert Shoe &amp; Leather Repair in{' '}
            <span className="text-tan">Overland Park, KS</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            <span className="font-display italic text-tan">
              {businessInfo.brandLine}
            </span>{' '}
            And we have for over {businessInfo.yearsInBusiness} years.
          </p>
        </FadeIn>

        <FadeIn delay={0.18}>
          <div
            {...{ [FLOATING_CALL_ANCHOR_ATTR]: '' }}
            className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <a href={businessInfo.phone.tel} className="btn-primary">
              <PhoneIcon className="h-5 w-5" />
              Call {businessInfo.phone.display}
            </a>
            <a
              href={businessInfo.phone.sms}
              className="btn bg-cream text-charcoal hover:bg-tan hover:text-charcoal shadow-soft"
            >
              <MessageIcon className="h-5 w-5" />
              Text for a quote
            </a>
            <a
              href={businessInfo.googleMaps.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn border border-cream/25 text-cream hover:border-tan hover:text-tan"
            >
              <PinIcon className="h-5 w-5" />
              Get directions
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-cream/65">
            <span>Locally owned</span>
            <Dot />
            <span>Over {businessInfo.yearsInBusiness} years</span>
            <Dot />
            <span>Walk-ins welcome</span>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

const noiseStyle: React.CSSProperties = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
};

function Dot() {
  return (
    <span aria-hidden="true" className="text-tan/55">
      ·
    </span>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
