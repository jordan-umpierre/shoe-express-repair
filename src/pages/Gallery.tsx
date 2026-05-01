import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { businessInfo } from '@/config/businessInfo';
import {
  galleryCategoryLabels,
  galleryItems,
  type GalleryCategory,
} from '@/config/gallery';
import {
  BeforeAfterSlider,
  PlaceholderImage,
} from '@/components/BeforeAfterSlider';
import { FadeIn } from '@/components/FadeIn';
import { CTABlock } from '@/components/CTABlock';
import { SEOHead } from '@/components/SEOHead';

type FilterValue = GalleryCategory | 'all';

const filters: FilterValue[] = [
  'all',
  'shoes',
  'boots',
  'leather',
  'handbags',
  'luggage',
];

export default function Gallery() {
  const [active, setActive] = useState<FilterValue>('all');

  const visible = useMemo(() => {
    if (active === 'all') return galleryItems;
    return galleryItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <>
      <SEOHead
        title="Before & After Gallery"
        description="Real before-and-after repair work from Shoe Express Repair & Shine in Overland Park, KS. Shoes, boots, leather, handbags, and luggage."
        path="/gallery"
      />
      <GalleryHero />
      <section className="bg-warmgray-50">
        <div className="container-prose pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pb-24">
          <FadeIn>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-display text-xl font-semibold text-charcoal sm:text-2xl">
                Recent work
              </h2>
              <Filters active={active} onChange={setActive} />
            </div>
          </FadeIn>

          <ul
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {visible.map((item, idx) => (
              <li key={item.id}>
                <FadeIn delay={idx * 0.04}>
                  <article className="card overflow-hidden">
                    <BeforeAfterSlider
                      ariaLabel={`${item.title} before and after`}
                      beforeNode={
                        <PlaceholderImage
                          label={item.beforeLabel}
                          variant="before"
                        />
                      }
                      afterNode={
                        <PlaceholderImage
                          label={item.afterLabel}
                          variant="after"
                        />
                      }
                    />
                    <div className="p-5 sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-burgundy">
                        {galleryCategoryLabels[item.category]}
                      </p>
                      <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-charcoal">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-warmgray-700">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ul>

          {visible.length === 0 && (
            <p className="mt-10 text-center text-sm text-warmgray-600">
              No items in this category yet.
            </p>
          )}
        </div>
      </section>

      <CTABlock
        eyebrow="Bring it in"
        headline="Bring in your item for a free assessment."
        subline={`Call or text ${businessInfo.phone.display}.`}
        primary={{
          label: `Call ${businessInfo.phone.display}`,
          href: businessInfo.phone.tel,
        }}
        secondary={{ label: 'Text for a quote', href: businessInfo.phone.sms }}
      />
    </>
  );
}

function GalleryHero() {
  return (
    <section className="bg-charcoal text-cream" aria-labelledby="gallery-hero">
      <div className="container-prose pt-20 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <p className="eyebrow text-tan">Before and after</p>
          <h1
            id="gallery-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish sm:text-5xl lg:text-[58px]"
          >
            The work, with the work shown.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            Drag the slider on each card to compare. Photos are placeholders
            for now — real project photography is being added as it is
            captured.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Filters({
  active,
  onChange,
}: {
  active: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter gallery by category"
    >
      {filters.map((filter) => {
        const isActive = active === filter;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={clsx(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-burgundy bg-burgundy text-cream'
                : 'border-warmgray-300 bg-cream text-charcoal hover:border-burgundy hover:text-burgundy',
            )}
          >
            {galleryCategoryLabels[filter]}
          </button>
        );
      })}
    </div>
  );
}
