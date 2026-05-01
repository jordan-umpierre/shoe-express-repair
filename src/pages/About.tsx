import { Link } from 'react-router-dom';
import { businessInfo } from '@/config/businessInfo';
import { FadeIn } from '@/components/FadeIn';
import { CTABlock } from '@/components/CTABlock';

export default function About() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <OurCraft />
      <OurReputation />
      <WhatToExpect />
      <FindUs />
      <CTABlock
        eyebrow="Bring it in"
        headline="The shop is open and ready."
        subline="Walk in during open hours for a free assessment, or call ahead for complex jobs."
        primary={{
          label: `Call ${businessInfo.phone.display}`,
          href: businessInfo.phone.tel,
        }}
        secondary={{ label: 'Text for a quote', href: businessInfo.phone.sms }}
      />
    </>
  );
}

function AboutHero() {
  return (
    <section className="bg-charcoal text-cream" aria-labelledby="about-hero">
      <div className="container-prose pt-20 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <p className="eyebrow text-tan">Our story</p>
          <h1
            id="about-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish sm:text-5xl lg:text-[58px]"
          >
            A working shop with skilled hands and standards that have not
            changed in {businessInfo.yearsInBusiness}+ years.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            We are a locally owned cobbler and leather repair shop in Overland
            Park, Kansas — the kind of place where you can walk in, talk to
            the person who will do the work, and get an honest answer.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section className="section bg-cream" aria-labelledby="our-story-heading">
      <div className="container-prose">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="eyebrow">Our story</p>
              <h2
                id="our-story-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
              >
                Locally owned, locally run, locally stitched.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.05} className="lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-warmgray-700 sm:text-lg">
              <p>
                For more than {businessInfo.yearsInBusiness} years, we have
                served Overland Park and the Kansas City metro from the same
                shop on Metcalf Avenue. Locally owned, locally operated, and
                still doing the work by hand.
              </p>
              <p>
                The business has changed shape over the years — new tools,
                new materials, new kinds of repairs we never saw coming —
                but the standards have not. We say a piece can be repaired
                only when it actually can be. We say what it will cost up
                front. And we do the work like our name is on it, because it
                is.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function OurCraft() {
  return (
    <section className="section bg-warmgray-50" aria-labelledby="our-craft-heading">
      <div className="container-prose">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="eyebrow">Our craft</p>
              <h2
                id="our-craft-heading"
                className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
              >
                Repair is a skill. We treat it like one.
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.05} className="lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-warmgray-700 sm:text-lg">
              <p>
                Replacing a sole, restitching a seam, color-matching a worn
                leather — none of these are things you learn in an afternoon.
                Good repair work takes years to develop, the right tools to
                support, and the kind of patience that keeps you from cutting
                corners on someone else's belongings.
              </p>
              <p>
                It also matters because of what repair is, in the end. A pair
                of well-made shoes can outlive several rounds of soles. A
                handbag with a snapped strap is not done — it is one repair
                away from being a daily carry again. A piece of luggage with
                a busted wheel does not need to go to the landfill.
              </p>
              <p className="font-display italic text-charcoal">
                Repair is better for your wallet and better for the things
                you actually care about keeping.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function OurReputation() {
  return (
    <section
      className="section bg-charcoal text-cream"
      aria-labelledby="reputation-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <p className="eyebrow text-tan">Our reputation</p>
          <h2
            id="reputation-heading"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px]"
          >
            <span className="text-tan">"We take on repairs that others don't dare to touch."</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.08}>
          <div className="mt-8 grid max-w-3xl gap-5 text-lg leading-relaxed text-cream/80">
            <p>
              That line is on our wall and in our work. Hard-shell luggage
              with cracked corners. Cowboy boots that have been re-soled
              twice and need it again. A handbag with a clasp the
              manufacturer no longer makes. A leather jacket someone told
              you was beyond saving.
            </p>
            <p>
              We do not turn those jobs away. We look at them, tell you
              honestly what is possible, and then — if you want it done —
              we do it.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

interface ExpectStep {
  step: string;
  title: string;
  body: string;
}

const expectSteps: ExpectStep[] = [
  {
    step: '01',
    title: 'Walk in or call',
    body: 'No appointment needed. Bring the item in during open hours, or text a photo to 913-492-7463 for a quick read.',
  },
  {
    step: '02',
    title: 'Get an honest quote',
    body: 'We assess the piece in front of you, explain what the work involves, and quote the price before any decision.',
  },
  {
    step: '03',
    title: 'Drop it off',
    body: 'Many repairs are completed same day or next day. Larger restorations get a clear timeline.',
  },
  {
    step: '04',
    title: 'Pick it up',
    body: 'Pay on pickup — check, debit, or all major credit cards. We will tell you how to keep the repair lasting.',
  },
];

function WhatToExpect() {
  return (
    <section
      className="section bg-cream"
      aria-labelledby="what-to-expect-heading"
    >
      <div className="container-prose">
        <FadeIn>
          <p className="eyebrow">What to expect</p>
          <h2
            id="what-to-expect-heading"
            className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
          >
            From walk-in to pick-up.
          </h2>
        </FadeIn>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {expectSteps.map((s, idx) => (
            <li key={s.step}>
              <FadeIn delay={idx * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-card border border-warmgray-200/70 bg-parchment p-6 shadow-soft">
                  <span className="font-display text-sm font-semibold tracking-[0.18em] text-burgundy">
                    {s.step}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-charcoal">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-warmgray-700">
                    {s.body}
                  </p>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>

        <FadeIn delay={0.15}>
          <p className="mt-10 text-sm text-warmgray-600">
            Payment accepted: {businessInfo.paymentMethods.join(' · ')}.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function FindUs() {
  return (
    <section
      className="section bg-warmgray-50"
      aria-labelledby="find-us-heading"
    >
      <div className="container-prose">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-7">
            <p className="eyebrow">Find us</p>
            <h2
              id="find-us-heading"
              className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl"
            >
              {businessInfo.address.street} {businessInfo.address.suite}
            </h2>
            <p className="mt-2 text-lg text-charcoal">
              {businessInfo.address.city}, {businessInfo.address.state}{' '}
              {businessInfo.address.zip}
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-warmgray-700">
              {businessInfo.landmark}.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={businessInfo.googleMaps.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                Get directions
              </a>
              <Link to="/contact" className="btn-ghost">
                See full hours and contact
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="card relative overflow-hidden">
              {/* [MAP placeholder — replace with iframe using businessInfo.googleMaps.embedUrl] */}
              <div className="aspect-[4/3] w-full bg-[radial-gradient(ellipse_at_center,_rgba(122,31,31,0.12),_transparent_60%)]">
                <svg viewBox="0 0 320 240" className="h-full w-full opacity-60" aria-hidden="true">
                  <defs>
                    <pattern id="grid-2" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D8D1C5" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-2)" />
                  <path d="M 0 120 Q 80 80 160 120 T 320 120" stroke="#C9A87C" strokeWidth="2" fill="none" opacity="0.5" />
                </svg>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-charcoal px-5 py-3 text-sm text-cream">
                <span className="font-medium">Overland Park, KS</span>
                <a
                  href={businessInfo.googleMaps.directionsUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-tan hover:text-cream"
                >
                  Open in Maps →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
