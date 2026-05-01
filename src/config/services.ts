import type { ServiceIconKey } from '@/components/icons/ServiceIcons';

export interface HomeServiceItem {
  id: string;
  title: string;
  teaser: string;
  iconKey: ServiceIconKey;
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconKey: ServiceIconKey;
  description: string;
  bullets: string[];
  benefit: string;
}

export const homeServices: HomeServiceItem[] = [
  {
    id: 'shoe',
    title: 'Shoe Repair',
    teaser: 'Resoling, lining, cleaning, and full reconditioning.',
    iconKey: 'shoe',
  },
  {
    id: 'boot',
    title: 'Boot Repair',
    teaser: 'Heels, shafts, zippers, and cowboy boot restoration.',
    iconKey: 'boot',
  },
  {
    id: 'leather',
    title: 'Leather Repair',
    teaser: 'Stitching, color restoration, and scuff repair.',
    iconKey: 'leather',
  },
  {
    id: 'handbag',
    title: 'Handbag & Purse',
    teaser: 'Straps, hardware, lining, zippers, and clasps.',
    iconKey: 'handbag',
  },
  {
    id: 'luggage',
    title: 'Luggage Repair',
    teaser: 'Soft, hard-shell, and fiberglass — wheels, zippers, handles.',
    iconKey: 'luggage',
  },
  {
    id: 'shine',
    title: 'Shine & Polish',
    teaser: 'Hand polish, conditioning, and walk-in shine service.',
    iconKey: 'shine',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'shoe-repair',
    title: 'Shoe Repair',
    iconKey: 'shoe',
    description:
      'From everyday wear to dress shoes you cannot bear to part with, we restore the shoes you actually want to keep wearing.',
    bullets: [
      'Resoling — full and half soles',
      'Toe caps and toe rebuilds',
      'Lining and inner repair',
      'Deep cleaning and reconditioning',
      'Stretching for fit adjustments',
    ],
    benefit:
      'Most everyday shoe repairs are completed same day or next day.',
  },
  {
    id: 'boot-repair',
    title: 'Boot Repair',
    iconKey: 'boot',
    description:
      'Western, work, dress, and fashion boots — including the heritage cowboy boots that deserve a careful hand.',
    bullets: [
      'Heel replacement and rebuilds',
      'Shaft repair and re-stitching',
      'Zipper replacement',
      'Sole work and tread replacement',
      'Full cowboy boot restoration',
    ],
    benefit:
      'We work on cowboy boots most shops will not touch, including custom-stitched and exotic leathers.',
  },
  {
    id: 'sole-heel-replacement',
    title: 'Sole & Heel Replacement',
    iconKey: 'sole',
    description:
      'Worn-down soles and heels rebuilt with materials that match how you actually wear your shoes.',
    bullets: [
      'Full sole replacement',
      'Heel tips and rubber heel rebuilds',
      'Platform and stacked-heel rebuilds',
      'Rubber half-soles for grip and longevity',
      'Custom heel sourcing for vintage or designer pairs',
    ],
    benefit:
      'A new pair of soles often costs a fraction of replacing the shoe — and lasts longer than the original.',
  },
  {
    id: 'leather-repair',
    title: 'Leather Repair',
    iconKey: 'leather',
    description:
      'Restoring the leather pieces you reach for every day — bags, jackets, shoes, and accessories.',
    bullets: [
      'Stitching and seam repair',
      'Patching tears and worn spots',
      'Color restoration and re-dyeing',
      'Conditioning treatments',
      'Scuff and scratch repair',
    ],
    benefit:
      'Color matching is done in-shop — most pieces leave looking better than the day you brought them in.',
  },
  {
    id: 'handbag-purse-repair',
    title: 'Handbag & Purse Repair',
    iconKey: 'handbag',
    description:
      'Designer or sentimental, daily carry or special occasion — we keep the bags you love working.',
    bullets: [
      'Strap replacement and shortening',
      'Hardware repair and replacement',
      'Lining repair and full re-line',
      'Zipper replacement',
      'Clasp and magnetic closure repair',
    ],
    benefit:
      'We source matching hardware whenever possible to preserve the original look.',
  },
  {
    id: 'belt-repair',
    title: 'Belt Repair',
    iconKey: 'belt',
    description:
      'Quick, walk-in friendly belt work for the leathers you wear daily.',
    bullets: [
      'Hole punching to size',
      'Buckle replacement',
      'Strap shortening',
      'Edge refinishing and re-burnishing',
    ],
    benefit:
      'Most belt adjustments are done while you wait.',
  },
  {
    id: 'luggage-repair',
    title: 'Luggage Repair',
    iconKey: 'luggage',
    description:
      'A rare capability among local shops — we repair soft, hard-shell, and fiberglass luggage. If another shop turned your case away, bring it here.',
    bullets: [
      'Zipper replacement on soft and hard cases',
      'Pull and zipper-pull replacement',
      'Handle and telescoping handle repair',
      'Wheel replacement',
      'Strap and exterior repair',
      'Hard-shell and fiberglass case repair',
    ],
    benefit:
      'Often a fraction of the cost of replacing the case — and far less wasteful.',
  },
  {
    id: 'shine-polish',
    title: 'Shine & Polish Services',
    iconKey: 'shine',
    description:
      'In-store shine and polish service that brings color, depth, and life back to leather.',
    bullets: [
      'Hand polish — walk-in or while-you-wait',
      'Conditioning treatments for dry leather',
      'Color enhancement for faded uppers',
      'Welt and edge dressing',
    ],
    benefit:
      'A proper shine extends the life of your leather and protects against the next round of wear.',
  },
  {
    id: 'retail-products',
    title: 'Retail Products',
    iconKey: 'retail',
    description:
      'One of the largest selections of shoe care products in the Midwest — laces, polish, conditioners, brushes, insoles, and protective treatments.',
    bullets: [
      'Polishes, creams, and waxes',
      'Conditioners and weatherproofing',
      'Brushes, daubers, and shine cloths',
      'Laces in every length and color',
      'Insoles and arch supports',
    ],
    benefit:
      'Stop in and we will help match the right product to your specific leather and use case.',
  },
];
