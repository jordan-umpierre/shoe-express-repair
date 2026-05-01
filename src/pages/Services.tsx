import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { businessInfo } from '@/config/businessInfo';
import { serviceCategories } from '@/config/services';
import { ServiceIcons } from '@/components/icons/ServiceIcons';
import { FadeIn } from '@/components/FadeIn';
import { CTABlock } from '@/components/CTABlock';

export default function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <>
      <ServicesHero />
      <TurnaroundBanner />
      <ServicesIndex />
      <ServiceList />
      <CTABlock
        eyebrow="Free quotes"
        headline="Not sure if it can be repaired?"
        subline="Bring it in or text us a photo. We will tell you honestly what is possible."
        primary={{
          label: `Call ${businessInfo.phone.display}`,
          href: businessInfo.phone.tel,
        }}
        secondary={{ label: 'Text for a quote', href: businessInfo.phone.sms }}
      />
    </>
  );
}

function ServicesHero() {
  return (
    <section className="bg-charcoal text-cream" aria-labelledby="services-hero">
      <div className="container-prose pt-20 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <p className="eyebrow text-tan">What we do</p>
          <h1
            id="services-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish sm:text-5xl lg:text-[58px]"
          >
            A full menu of repair, restoration, and shine — done by hand.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            Twenty-five years of repair work, in a shop that has not lost its
            standards. From everyday resoling to heritage cowboy boots and
            hard-shell luggage, here is the full list of what we take on.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function TurnaroundBanner() {
  return (
    <div className="bg-burgundy text-cream">
      <div className="container-prose flex flex-col gap-3 py-5 text-sm sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <p className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cream/15">
            <BoltIcon className="h-4 w-4" />
          </span>
          <span>
            <strong className="font-semibold">Many repairs same or next day.</strong>{' '}
            Call ahead for complex jobs and we will give you a clear timeline.
          </span>
        </p>
        <a
          href={businessInfo.phone.tel}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm font-semibold text-burgundy hover:bg-tan hover:text-charcoal transition-colors"
        >
          Call {businessInfo.phone.display}
        </a>
      </div>
    </div>
  );
}

function ServicesIndex() {
  return (
    <section className="bg-cream" aria-label="Service categories">
      <div className="container-prose py-12 sm:py-16">
        <FadeIn>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
            Jump to a service
          </h2>
          <ul
            className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {serviceCategories.map((cat) => (
              <li key={cat.id}>
                <a
                  href={`#${cat.id}`}
                  className="flex items-center gap-3 rounded-card border border-warmgray-200/70 bg-parchment px-4 py-3 text-sm font-medium text-charcoal transition-colors hover:border-burgundy hover:text-burgundy"
                >
                  <span className="text-burgundy">·</span>
                  {cat.title}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

function ServiceList() {
  return (
    <section className="bg-warmgray-50" aria-label="Service details">
      <div className="container-prose py-16 sm:py-20 lg:py-24">
        <ul className="space-y-12 sm:space-y-16" role="list">
          {serviceCategories.map((cat) => {
            const Icon = ServiceIcons[cat.iconKey];
            return (
              <li
                key={cat.id}
                id={cat.id}
                className="scroll-mt-24"
              >
                <FadeIn>
                  <article className="card flex flex-col gap-7 p-7 sm:flex-row sm:p-9 lg:p-12">
                    <div className="sm:w-44 sm:shrink-0">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                        <Icon className="h-7 w-7" />
                      </span>
                      <div className="mt-5 hidden rounded-2xl border border-warmgray-200/80 bg-parchment p-4 text-sm leading-relaxed text-charcoal sm:block">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
                          The benefit
                        </p>
                        <p className="mt-2">{cat.benefit}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-display text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
                        {cat.title}
                      </h2>
                      <p className="mt-3 max-w-2xl text-base leading-relaxed text-warmgray-700">
                        {cat.description}
                      </p>
                      <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {cat.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm text-charcoal"
                          >
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-7 rounded-2xl border border-warmgray-200/80 bg-parchment p-4 text-sm leading-relaxed text-charcoal sm:hidden">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
                          The benefit
                        </p>
                        <p className="mt-2">{cat.benefit}</p>
                      </div>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <a href={businessInfo.phone.tel} className="btn-primary">
                          Call for a quote
                        </a>
                        <a href={businessInfo.phone.sms} className="btn-ghost">
                          Text a photo
                        </a>
                      </div>
                    </div>
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

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13 2L3 14h7l-1 8 11-13h-7l1-7z" />
    </svg>
  );
}
