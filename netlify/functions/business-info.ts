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
    formatted_address: string;
    rating: number;
    user_ratings_total: number;
    opening_hours?: {
      weekday_text: string[];
    };
    formatted_phone_number?: string;
    website?: string;
  };
}

interface BusinessInfoResponse {
  rating: number;
  reviewCount: number;
  address: string;
  hours: {
    [day: string]: string;
  };
  phone?: string;
  website?: string;
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
      return new Response(JSON.stringify(null), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=60',
        },
      });
    }

    const placeId = searchData.candidates[0].place_id;

    // Step 2: Fetch place details
    const detailsUrl = new URL(
      'https://maps.googleapis.com/maps/api/place/details/json'
    );
    detailsUrl.searchParams.set('place_id', placeId);
    detailsUrl.searchParams.set('key', apiKey);
    detailsUrl.searchParams.set(
      'fields',
      'formatted_address,rating,user_ratings_total,opening_hours,formatted_phone_number,website'
    );

    const detailsRes = await fetch(detailsUrl.toString());
    const detailsData = (await detailsRes.json()) as PlaceDetailsResponse;

    if (!detailsData.result) {
      return new Response(JSON.stringify(null), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=60',
        },
      });
    }

    // Step 3: Parse opening hours
    const hoursObj: { [day: string]: string } = {};
    if (detailsData.result.opening_hours?.weekday_text) {
      const daysMap: { [key: string]: string } = {
        Monday: 'Mo',
        Tuesday: 'Tu',
        Wednesday: 'We',
        Thursday: 'Th',
        Friday: 'Fr',
        Saturday: 'Sa',
        Sunday: 'Su',
      };

      detailsData.result.opening_hours.weekday_text.forEach((text) => {
        const [day, times] = text.split(': ');
        const shortDay = daysMap[day] || day;
        hoursObj[shortDay] = times;
      });
    }

    const businessInfo: BusinessInfoResponse = {
      rating: detailsData.result.rating || 0,
      reviewCount: detailsData.result.user_ratings_total || 0,
      address: detailsData.result.formatted_address,
      hours: hoursObj,
      phone: detailsData.result.formatted_phone_number,
      website: detailsData.result.website,
    };

    return new Response(JSON.stringify(businessInfo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=60',
      },
    });
  } catch (error) {
    console.error('Error fetching business info:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch business info' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
