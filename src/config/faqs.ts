export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: 'what-items',
    question: 'What items do you repair?',
    answer:
      'Shoes, boots, leather goods, handbags and purses, belts, and luggage of every kind — including hard-shell and fiberglass cases. If it is made of leather, has a sole, a zipper, a handle, or a strap, bring it in.',
  },
  {
    id: 'hard-shell-luggage',
    question: 'Do you repair hard-shell or fiberglass luggage?',
    answer:
      'Yes. We are one of the few shops in the area that take on hard-shell and fiberglass luggage. Wheels, telescoping handles, zippers, cracked shells, broken pulls, torn liners — all in scope.',
  },
  {
    id: 'free-quotes',
    question: 'Do you offer free quotes?',
    answer:
      'Yes. Bring your item in during open hours and we will give you an honest assessment and price on the spot. No appointment required, no obligation.',
  },
  {
    id: 'turnaround',
    question: 'How long do repairs usually take?',
    answer:
      'Many everyday repairs are completed same day or next day. Larger restorations and specialty work can take longer — we will give you a clear timeline before any work begins.',
  },
  {
    id: 'walk-ins',
    question: 'Do I need an appointment, or do you take walk-ins?',
    answer:
      'Walk-ins are always welcome during open hours. No appointment is needed for quotes or drop-offs. For complex jobs, calling ahead helps us plan.',
  },
  {
    id: 'best-contact',
    question: 'What is the best way to contact you?',
    answer:
      'Call or text 913-492-7463. Texting a photo of your item is often the fastest way to get a ballpark quote. Email and the contact form on this site also work well.',
  },
  {
    id: 'shoe-care-products',
    question: 'Do you sell shoe care products?',
    answer:
      'Yes — one of the largest selections of shoe care products in the Midwest. Polishes, conditioners, brushes, laces, insoles, and protective treatments. Stop in and we will help match the right product to your leather and use.',
  },
  {
    id: 'leather-goods',
    question: 'What types of leather goods do you work on?',
    answer:
      'Shoes, boots, jackets, handbags, purses, wallets, belts, briefcases, and luggage. We handle full-grain, pebbled, suede, exotic leathers, and patent finishes — call if you have a specific question about your piece.',
  },
  {
    id: 'zipper-repair',
    question: 'Can you repair zippers on handbags and luggage?',
    answer:
      'Yes. We replace zippers and zipper pulls on handbags, totes, soft luggage, and hard-shell cases. We carry a wide range of zipper sizes to match the original whenever possible.',
  },
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'Check, debit, and all major credit cards.',
  },
  {
    id: 'locally-owned',
    question: 'Are you locally owned?',
    answer:
      'Yes. Locally owned and operated in Overland Park for over 25 years. Same family, same shop, same standards.',
  },
  {
    id: 'cowboy-boots',
    question: 'Do you repair boots and cowboy boots?',
    answer:
      'Yes — including cowboy boots. We rebuild heels, repair shafts, replace zippers, and restore custom and exotic leathers. Boot work is one of the things we are known for.',
  },
  {
    id: 'can-it-be-repaired',
    question: 'How do I know if my item can be repaired?',
    answer:
      'Bring it in or text us a photo. We will tell you honestly whether it makes sense to repair, what the work would involve, and what it will cost — before any decision.',
  },
  {
    id: 'same-day',
    question: 'Do you offer same-day or rush service?',
    answer:
      'Many small repairs can be done while you wait or same day. For more involved work, ask when you drop off — we will tell you what is possible and quote a turnaround.',
  },
];

export const homeFAQPreviewIds = [
  'what-items',
  'hard-shell-luggage',
  'turnaround',
  'walk-ins',
] as const;

export const homeFAQPreview: FAQItem[] = homeFAQPreviewIds
  .map((id) => faqs.find((f) => f.id === id))
  .filter((f): f is FAQItem => Boolean(f));
