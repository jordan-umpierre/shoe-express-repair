import type { Context } from '@netlify/functions';

interface PlacesSearchResponse {
  candidates: {
    place_id: string;
    formatted_address: string;
    rating: number;
  }[];
}

interface PlaceDetailsResponse {
  result: {
    reviews: Array<{
      author_name: string;
      rating: number;
      text: string;
      time: number;
      profile_photo_url?: string;
    }>;
  };
}

interface ReviewResponse {
  id: string;
  rating: number;
  body: string;
  reviewer: string;
  source: 'Google';
  photoUrl?: string;
  timestamp: number;
}

export default async function handler(
  req: Request,
  context: Context
): Promise<Response> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'API key not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Step 1: Find the business by name and address
    const businessName = 'Shoe Express Repair & Shine';
    const businessAddress = '10630 Metcalf Ave Suite A, Overland Park, KS 66212';

    const searchUrl = new URL(
      'https://maps.googleapis.com/maps/api/place/textsearch/json'
    );
    searchUrl.searchParams.set('query', `${businessName} ${businessAddress}`);
    searchUrl.searchParams.set('key', apiKey);

    const searchRes = await fetch(searchUrl.toString());
    const searchData = (await searchRes.json()) as PlacesSearchResponse;

    if (!searchData.candidates || searchData.candidates.length === 0) {
      console.warn('Business not found in Google Places');
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=60',
        },
      });
    }

    const placeId = searchData.candidates[0].place_id;

    // Step 2: Fetch place details including reviews
    const detailsUrl = new URL(
      'https://maps.googleapis.com/maps/api/place/details/json'
    );
    detailsUrl.searchParams.set('place_id', placeId);
    detailsUrl.searchParams.set('key', apiKey);
    detailsUrl.searchParams.set('fields', 'reviews');

    const detailsRes = await fetch(detailsUrl.toString());
    const detailsData = (await detailsRes.json()) as PlaceDetailsResponse;

    if (!detailsData.result?.reviews) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=60',
        },
      });
    }

    // Step 3: Filter for 5-star reviews only
    // Note: Google Places API doesn't return photo_reference in reviews.
    // We filter for 5-star and include profile_photo_url if available.
    const filteredReviews: ReviewResponse[] = detailsData.result.reviews
      .filter((review) => review.rating === 5)
      .map((review, idx) => ({
        id: `google-review-${idx}`,
        rating: review.rating,
        body: review.text,
        reviewer: review.author_name,
        source: 'Google' as const,
        photoUrl: review.profile_photo_url,
        timestamp: review.time * 1000, // Convert epoch seconds to ms
      }));

    return new Response(JSON.stringify(filteredReviews), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch reviews' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
