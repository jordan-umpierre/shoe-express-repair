import { businessInfo } from '@/config/businessInfo';
import { faqs } from '@/config/faqs';
import { FAQAccordion } from '@/components/FAQAccordion';
import { FadeIn } from '@/components/FadeIn';
import { CTABlock } from '@/components/CTABlock';

export default function FAQ() {
  return (
    <>
      <FAQHero />
      <section className="section bg-warmgray-50" aria-label="Frequently asked questions">
        <div className="container-prose">
          <div className="grid gap-10 lg:grid-cols-12">
            <FadeIn className="lg:col-span-4">
              <p className="eyebrow">Common questions</p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
                Everything we get asked, answered.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-warmgray-700">
                If you have a question not covered here, the fastest way to
                an answer is a call or text to{' '}
                <a
                  href={businessInfo.phone.tel}
                  className="font-semibold text-burgundy hover:text-burgundy-700"
                >
                  {businessInfo.phone.display}
                </a>
                .
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-8">
              <FAQAccordion items={faqs} />
            </FadeIn>
          </div>
        </div>
      </section>
      <CTABlock
        eyebrow="Still have a question?"
        headline="Call or text — we will answer it."
        subline="Faster than email and easier than typing it all out."
        primary={{
          label: `Call ${businessInfo.phone.display}`,
          href: businessInfo.phone.tel,
        }}
        secondary={{ label: 'Text for a quote', href: businessInfo.phone.sms }}
      />
    </>
  );
}

function FAQHero() {
  return (
    <section className="bg-charcoal text-cream" aria-labelledby="faq-hero">
      <div className="container-prose pt-20 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <p className="eyebrow text-tan">FAQ</p>
          <h1
            id="faq-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish sm:text-5xl lg:text-[58px]"
          >
            Frequently asked questions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            Quotes, turnaround, walk-ins, payment, what we do and don't
            repair — all in one place.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
