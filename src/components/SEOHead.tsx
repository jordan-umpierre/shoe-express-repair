import { Helmet } from 'react-helmet-async';
import { businessInfo, formatAddressOneLine } from '@/config/businessInfo';

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

const SITE_NAME = businessInfo.name;
const SITE_LOCATION = `${businessInfo.address.city}, ${businessInfo.address.state}`;
const DEFAULT_OG_IMAGE = '/og-image.svg';

export function SEOHead({ title, description, path, ogImage }: SEOHeadProps) {
  const fullTitle = `${title} | ${SITE_NAME} – ${SITE_LOCATION}`;
  const canonical = `${businessInfo.url}${path === '/' ? '' : path}`;
  const image = `${businessInfo.url}${ogImage ?? DEFAULT_OG_IMAGE}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="geo.region" content="US-KS" />
      <meta name="geo.placename" content={SITE_LOCATION} />
      <meta name="format-detection" content="telephone=yes" />
    </Helmet>
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: `${businessInfo.url}${DEFAULT_OG_IMAGE}`,
    telephone: businessInfo.phone.display,
    email: businessInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${businessInfo.address.street} ${businessInfo.address.suite ?? ''}`.trim(),
      addressLocality: businessInfo.address.city,
      addressRegion: businessInfo.address.state,
      postalCode: businessInfo.address.zip,
      addressCountry: 'US',
    },
    openingHours: businessInfo.hoursSchema,
    url: businessInfo.url,
    priceRange: '$',
    description: `Expert shoe, boot, leather, handbag, and luggage repair in ${SITE_LOCATION}. ${businessInfo.brandLine}`,
    areaServed: 'Kansas City metro',
    paymentAccepted: businessInfo.paymentMethods.join(', '),
    sameAs: businessInfo.social
      ? Object.values(businessInfo.social).filter(Boolean)
      : [],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
      <meta name="business:contact_data:street_address" content={formatAddressOneLine()} />
      <meta name="business:contact_data:phone_number" content={businessInfo.phone.display} />
    </Helmet>
  );
}
