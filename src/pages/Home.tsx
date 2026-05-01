import { Link } from 'react-router-dom';
import { businessInfo } from '@/config/businessInfo';
import { FadeIn } from '@/components/FadeIn';
import { ServiceCard } from '@/components/ServiceCard';
import { ReviewCard, Stars } from '@/components/ReviewCard';
import {
  BeforeAfterSlider,
  PlaceholderImage,
} from '@/components/BeforeAfterSlider';
import { FAQAccordion } from '@/components/FAQAccordion';
import { HoursTable } from '@/components/HoursTable';
import { CTABlock } from '@/components/CTABlock';
import { homeServices } from '@/config/services';
import { reviews } from '@/config/reviews';
import { homeGalleryPreview } from '@/config/gallery';
import { homeFAQPreview } from '@/config/faqs';
import { FLOATING_CALL_ANCHOR_ATTR } from '@/layout/FloatingCallButton';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <HardLuggageCallout />
      <ProductsCallout />
      <WhyChooseUs />
      <Testimonials />
      <BeforeAfterPreview />
      <FAQPreview />
      <LocationAndHours />
      <FinalCTA />
    </>
  );
}

function FinalCTA() {
  return (
    <CTABlock
      eyebrow="Bring it in"
      headline="Ready to restore your favorites?"
      subline="Call or text us for a free quote. Walk-ins welcome — no appointment needed."
      primary={{
        label: (
          <>
            <PhoneIcon className="h-5 w-5" />
            {`Call ${businessInfo.phone.display}`}
          </>
        ),
        href: businessInfo.phone.tel,
      }}
      secondary={{
        label: (
          <>
            <MessageIcon className="h-5 w-5" />
            Text for a quote
          </>
        ),
        href: businessInfo.phone.sms,
      }}
    />
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

function LocationAndHours() {
  const addrLine1 = `${businessInfo.address.street} ${businessInfo.address.suite ?? ''}`.trim();
  const addrLine2 = `${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.zip}`;

  return (
    <section
      className="section bg-warmgray-50"
      aria-labelledby="location-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <p className="eyebrow">Where to find us</p>
          <h2
            id="location-heading"
            className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
          >
            Walk in, drop off, talk it through.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <FadeIn delay={0.05} className="lg:col-span-5">
            <div className="card p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                Visit
              </h3>
              <address className="mt-3 not-italic">
                <p className="font-display text-xl font-semibold text-charcoal">
                  {addrLine1}
                </p>
                <p className="mt-1 text-charcoal">{addrLine2}</p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-warmgray-600">
                  {businessInfo.landmark}
                </p>
              </address>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <a
                  href={businessInfo.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-primary"
                >
                  Get directions
                </a>
                <a
                  href={businessInfo.phone.tel}
                  className="btn-ghost"
                >
                  Call ahead
                </a>
              </div>

              <div className="mt-7 border-t border-warmgray-200/80 pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                  We accept
                </h3>
                <ul
                  className="mt-3 flex flex-wrap gap-2"
                  role="list"
                  aria-label="Accepted payment methods"
                >
                  {businessInfo.paymentMethods.map((method) => (
                    <li
                      key={method}
                      className="rounded-full border border-warmgray-300 bg-cream px-3 py-1.5 text-xs font-medium text-charcoal"
                    >
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-4">
            <div className="card p-7">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                Hours
              </h3>
              <HoursTable highlightToday className="mt-3" />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-3">
            <MapFallbackCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function MapFallbackCard() {
  return (
    <div className="card relative h-full overflow-hidden">
      {/* [MAP: Replace with real Google Maps embed src]
          To enable the live map, swap this entire div for:
          <iframe src={businessInfo.googleMaps.embedUrl} ... /> */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(122,31,31,0.08),_transparent_60%)]" />
      <div className="absolute inset-0 opacity-60">
        <svg viewBox="0 0 320 280" className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D8D1C5" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M 0 140 Q 80 100 160 140 T 320 140" stroke="#C9A87C" strokeWidth="2" fill="none" opacity="0.55" />
          <path d="M 50 0 L 50 280" stroke="#B5AC9D" strokeWidth="1.2" />
          <path d="M 200 0 L 200 280" stroke="#B5AC9D" strokeWidth="1.2" />
        </svg>
      </div>
      <div className="relative flex h-full min-h-[280px] flex-col justify-between p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-warmgray-500">
            [MAP placeholder]
          </p>
          <p className="mt-3 font-display text-lg font-semibold leading-snug text-charcoal">
            {businessInfo.address.city}, {businessInfo.address.state}
          </p>
          <p className="mt-1 text-sm text-warmgray-600">
            Off I-435 &amp; Metcalf
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-burgundy text-cream">
            <PinIconSmall className="h-4 w-4" />
          </span>
          <a
            href={businessInfo.googleMaps.directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-semibold text-burgundy hover:text-burgundy-700"
          >
            Open in Google Maps →
          </a>
        </div>
      </div>
    </div>
  );
}

function PinIconSmall({ className }: { className?: string }) {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function FAQPreview() {
  return (
    <section
      className="section bg-cream"
      aria-labelledby="faq-preview-heading"
    >
      <div className="container-prose">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <p className="eyebrow">Common questions</p>
            <h2
              id="faq-preview-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
            >
              Quick answers before you stop in.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-warmgray-700">
              The questions we hear most often. If yours is not here, call or
              text — we will answer it.
            </p>
            <Link
              to="/faq"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy hover:text-burgundy-700"
            >
              See all frequently asked questions
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-8">
            <FAQAccordion items={homeFAQPreview} defaultOpenId="hard-shell-luggage" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BeforeAfterPreview() {
  return (
    <section
      className="section bg-warmgray-50"
      aria-labelledby="before-after-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Real repairs</p>
              <h2
                id="before-after-heading"
                className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
              >
                Before and after — drag to compare.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-warmgray-700">
                Each piece comes back to you cleaner, stronger, and ready for
                another decade of wear.
              </p>
            </div>
            <Link to="/gallery" className="btn-ghost">
              View full gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>

        <ul className="mt-12 grid gap-6 md:grid-cols-3" role="list">
          {homeGalleryPreview.map((item, idx) => (
            <li key={item.id}>
              <FadeIn delay={idx * 0.06}>
                <BeforeAfterSlider
                  ariaLabel={`${item.title} before and after`}
                  beforeNode={
                    <PlaceholderImage label={item.beforeLabel} variant="before" />
                  }
                  afterNode={
                    <PlaceholderImage label={item.afterLabel} variant="after" />
                  }
                  caption={item.title}
                />
              </FadeIn>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
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

function Testimonials() {
  return (
    <section
      className="section bg-cream"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">In our customers' words</p>
              <h2
                id="testimonials-heading"
                className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
              >
                The reviews tell the story.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <Stars rating={5} />
              <p className="text-sm text-warmgray-700">
                Based on real Google &amp; Yelp reviews — see the listing for
                the latest rating.
              </p>
            </div>
          </div>
        </FadeIn>

        <ul
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          role="list"
        >
          {reviews.map((review, idx) => (
            <li key={review.id}>
              <FadeIn delay={idx * 0.05} className="h-full">
                <ReviewCard review={review} />
              </FadeIn>
            </li>
          ))}
        </ul>

        <FadeIn delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={businessInfo.social?.google ?? '#'}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-secondary"
            >
              Read more reviews on Google
              <ExternalArrow className="h-4 w-4" />
            </a>
            <p className="text-xs text-warmgray-500">
              Reviews shown above are placeholders. Replace with verified
              listing reviews before launch.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ExternalArrow({ className }: { className?: string }) {
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
      <path d="M5 11l6-6" />
      <path d="M6 4h5v5" />
    </svg>
  );
}

interface TrustPillar {
  title: string;
  body: string;
  icon: (props: { className?: string }) => JSX.Element;
}

const trustPillars: TrustPillar[] = [
  {
    title: '25+ years of local expertise',
    body: 'A quarter century of repairs in Overland Park. The kind of experience that lets us look at a shoe and know what it needs.',
    icon: BadgeIcon,
  },
  {
    title: 'We fix what others will not',
    body: 'Hard-shell luggage, vintage cowboy boots, designer handbag hardware, salt-damaged leather. If it can be saved, we will tell you.',
    icon: HandIcon,
  },
  {
    title: 'Walk-ins always welcome',
    body: 'No appointment needed. Bring your item in during open hours and we will give you an honest quote on the spot.',
    icon: DoorIcon,
  },
  {
    title: 'Fast turnaround',
    body: 'Many repairs are completed same day or next day. Complex restorations get a clear timeline before any work begins.',
    icon: ClockIcon,
  },
];

function WhyChooseUs() {
  return (
    <section
      className="section bg-parchment"
      aria-labelledby="why-choose-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <p className="eyebrow">Why customers choose us</p>
          <h2
            id="why-choose-heading"
            className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
          >
            Skilled hands, honest quotes, and the kind of shop you remember.
          </h2>
        </FadeIn>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <li key={pillar.title}>
                <FadeIn delay={idx * 0.05} className="h-full">
                  <article className="flex h-full flex-col rounded-card border border-warmgray-200/70 bg-cream p-6 shadow-soft">
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-charcoal text-tan">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-tight text-charcoal">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-warmgray-700">
                      {pillar.body}
                    </p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function BadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="10" r="6" />
      <path d="M9 14.5L7.5 21l4.5-3 4.5 3-1.5-6.5" />
      <path d="M9.5 10l2 2 3-3" />
    </svg>
  );
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 11V5a1.5 1.5 0 0 1 3 0v6" />
      <path d="M12 11V4a1.5 1.5 0 0 1 3 0v7" />
      <path d="M15 11V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6.5 7H9c-2 0-3.5-1-4.5-3l-2.5-5c-.4-.8 0-1.7.8-2 .9-.4 2 0 2.4.9L7 16" />
    </svg>
  );
}

function DoorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M3 21h18" />
      <circle cx="15" cy="12" r="0.9" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
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
