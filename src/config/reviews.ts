export type ReviewSource = 'Google' | 'Yelp';

export interface Review {
  id: string;
  rating: number;
  body: string;
  reviewer: string;
  source: ReviewSource;
}

// Placeholders only — replace each entry with a real verified review
// pulled from the Google or Yelp business listing. Do not fabricate.
export const reviews: Review[] = [
  {
    id: 'review-1',
    rating: 5,
    body: '[Real Review Placeholder — pull from Google or Yelp listing]',
    reviewer: '[Reviewer name placeholder]',
    source: 'Google',
  },
  {
    id: 'review-2',
    rating: 5,
    body: '[Real Review Placeholder — pull from Google or Yelp listing]',
    reviewer: '[Reviewer name placeholder]',
    source: 'Google',
  },
  {
    id: 'review-3',
    rating: 5,
    body: '[Real Review Placeholder — pull from Google or Yelp listing]',
    reviewer: '[Reviewer name placeholder]',
    source: 'Yelp',
  },
  {
    id: 'review-4',
    rating: 5,
    body: '[Real Review Placeholder — pull from Google or Yelp listing]',
    reviewer: '[Reviewer name placeholder]',
    source: 'Google',
  },
];
