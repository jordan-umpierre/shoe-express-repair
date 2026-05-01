import { businessInfo } from '@/config/businessInfo';
import { FadeIn } from '@/components/FadeIn';
import { FLOATING_CALL_ANCHOR_ATTR } from '@/layout/FloatingCallButton';

export default function Home() {
  return (
    <>
      <Hero />
    </>
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
