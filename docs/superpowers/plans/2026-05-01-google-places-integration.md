# Google Places API Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fetch real 5-star Google reviews with photos and live business info (rating, hours, address) via Google Places API, displayed in React components with graceful fallback to hardcoded data.

**Architecture:** Two serverless functions (Netlify/Vercel) proxy Google Places API calls securely, keeping the API key server-side. A React hook fetches both endpoints in parallel, manages loading/error states, and falls back to hardcoded config if the API is unavailable. Components accept live data but render hardcoded data if needed.

**Tech Stack:** Google Places API, Netlify Functions (or Vercel Functions), React hooks, TypeScript, environment variables

---

## File Structure

**New files:**
- `netlify/functions/reviews.ts` — serverless function to fetch 5-star reviews with photos
- `netlify/functions/business-info.ts` — serverless function to fetch live business info
- `src/hooks/useGooglePlaces.ts` — React hook for parallel API fetches
- `src/types/google-places.ts` — TypeScript types for API responses
- `src/components/BusinessInfoWidget.tsx` — component to display rating, hours, address

**Modified files:**
- `src/components/ReviewCard.tsx` — accept optional `photoUrl` prop
- `src/layout/Footer.tsx` — use BusinessInfoWidget instead of hardcoded hours
- `src/pages/Contact.tsx` (or map section) — use BusinessInfoWidget for live info
- `.env.local` — add `VITE_GOOGLE_PLACES_API_KEY`
- `.gitignore` — ensure `.env.local` is ignored

---

## Phase 1: Serverless Functions

### Task 1: Set up Netlify Functions directory and install dependencies

**Files:**
- Create: `netlify/functions/reviews.ts`
- Create: `netlify/functions/business-info.ts`
- Modify: `package.json`

- [ ] **Step 1: Verify `netlify.toml` exists**

Run: `cd C:\Users\Jordini\Desktop\shoe-express-repair && ls -la netlify.toml`

If it doesn't exist, create it:

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[dev]
  framework = "vite"
  command = "vite"
  functions = "netlify/functions"
```

- [ ] **Step 2: Install Google API client library**

Run: `npm install @googlemaps/js-api-loader`

Expected output: `added X packages`

- [ ] **Step 3: Create `.env.local` for development**

Create file `C:\Users\Jordini\Desktop\shoe-express-repair\.env.local`:

```
VITE_GOOGLE_PLACES_API_KEY=<your-google-api-key>
GOOGLE_PLACES_API_KEY=<your-google-api-key>
```

(The `VITE_` prefix is used by the React app for public consumption; the plain version is for serverless functions.)

- [ ] **Step 4: Ensure `.gitignore` includes `.env.local`**

Check `.gitignore`. If `.env.local` is not listed, add it:

```
.env.local
.env*.local
```

- [ ] **Step 5: Commit**

```bash
cd C:\Users\Jordini\Desktop\shoe-express-repair
git add netlify.toml .env.local .gitignore package.json package-lock.json
git commit -m "setup: configure Netlify Functions and Google API environment"
```

---

### Task 2: Implement `api/reviews.ts` function

**Files:**
- Create: `netlify/functions/reviews.ts`

- [ ] **Step 1: Write the reviews function**

Create `netlify/functions/reviews.ts`:

```typescript
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
```

- [ ] **Step 2: Verify file exists and TypeScript is valid**

Run: `npm run typecheck`

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add netlify/functions/reviews.ts
git commit -m "feat: add Google Places API endpoint for 5-star reviews"
```

---

### Task 3: Implement `api/business-info.ts` function

**Files:**
- Create: `netlify/functions/business-info.ts`

- [ ] **Step 1: Write the business-info function**

Create `netlify/functions/business-info.ts`:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add netlify/functions/business-info.ts
git commit -m "feat: add Google Places API endpoint for live business info"
```

---

### Task 4: Test serverless functions locally

**Files:**
- Test: `netlify/functions/reviews.ts` and `netlify/functions/business-info.ts`

- [ ] **Step 1: Install Netlify CLI (if not already installed)**

Run: `npm install -g netlify-cli`

- [ ] **Step 2: Start the local dev server with Netlify Functions**

Run: `netlify dev`

Expected output: 
```
◈ Netlify Dev ◈
◈ Loaded function reviews
◈ Loaded function business-info
◈ Server running on http://localhost:8888
```

- [ ] **Step 3: Test the reviews endpoint in another terminal**

Run: `curl http://localhost:8888/.netlify/functions/reviews`

Expected: JSON array of reviews (or empty array if business not found)

- [ ] **Step 4: Test the business-info endpoint**

Run: `curl http://localhost:8888/.netlify/functions/business-info`

Expected: JSON object with rating, address, hours, etc. (or null if not found)

- [ ] **Step 5: Stop the dev server**

Press `Ctrl+C` in the terminal running `netlify dev`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "test: verify Google Places API functions work locally"
```

---

## Phase 2: React Integration

### Task 5: Create TypeScript types for Google Places responses

**Files:**
- Create: `src/types/google-places.ts`

- [ ] **Step 1: Write types file**

Create `src/types/google-places.ts`:

```typescript
export interface GoogleReview {
  id: string;
  rating: number;
  body: string;
  reviewer: string;
  source: 'Google';
  photoUrl?: string;
  timestamp: number;
}

export interface GoogleBusinessInfo {
  rating: number;
  reviewCount: number;
  address: string;
  hours: {
    [day: string]: string;
  };
  phone?: string;
  website?: string;
}

export interface UseGooglePlacesReturn {
  reviews: GoogleReview[];
  businessInfo: GoogleBusinessInfo | null;
  loading: boolean;
  error: string | null;
  fallback: boolean;
}
```

- [ ] **Step 2: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/types/google-places.ts
git commit -m "feat: add TypeScript types for Google Places API responses"
```

---

### Task 6: Create `useGooglePlaces` hook

**Files:**
- Create: `src/hooks/useGooglePlaces.ts`
- Import: `src/types/google-places.ts`
- Import: `src/config/businessInfo.ts` (for fallback)

- [ ] **Step 1: Write the hook**

Create `src/hooks/useGooglePlaces.ts`:

```typescript
import { useEffect, useState } from 'react';
import type {
  GoogleReview,
  GoogleBusinessInfo,
  UseGooglePlacesReturn,
} from '@/types/google-places';
import { businessInfo as fallbackBusinessInfo } from '@/config/businessInfo';

export function useGooglePlaces(): UseGooglePlacesReturn {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [businessInfo, setBusinessInfo] = useState<GoogleBusinessInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both endpoints in parallel
        const [reviewsRes, businessRes] = await Promise.all([
          fetch('/.netlify/functions/reviews'),
          fetch('/.netlify/functions/business-info'),
        ]);

        if (!reviewsRes.ok || !businessRes.ok) {
          throw new Error('API request failed');
        }

        const reviewsData: GoogleReview[] = await reviewsRes.json();
        const businessData: GoogleBusinessInfo = await businessRes.json();

        setReviews(reviewsData);
        setBusinessInfo(businessData);
        setFallback(false);
      } catch (err) {
        console.error('Failed to fetch from Google Places API:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // If we're using fallback, construct business info from hardcoded config
  if (fallback && !businessInfo) {
    const fallbackInfo: GoogleBusinessInfo = {
      rating: 4.8, // Placeholder; update with real rating from Google
      reviewCount: 100, // Placeholder
      address: fallbackBusinessInfo.address,
      hours: fallbackBusinessInfo.hours,
      phone: fallbackBusinessInfo.phone,
      website: fallbackBusinessInfo.website,
    };
    setBusinessInfo(fallbackInfo);
  }

  return {
    reviews,
    businessInfo,
    loading,
    error,
    fallback,
  };
}
```

- [ ] **Step 2: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useGooglePlaces.ts
git commit -m "feat: add useGooglePlaces hook for parallel API fetching"
```

---

### Task 7: Update `ReviewCard` component to accept photo

**Files:**
- Modify: `src/components/ReviewCard.tsx`

- [ ] **Step 1: Read current ReviewCard**

Current file: `src/components/ReviewCard.tsx` (already reviewed earlier)

- [ ] **Step 2: Update component to display photo**

Edit `src/components/ReviewCard.tsx`. Update the `ReviewCardProps` interface and add photo display:

Replace:
```typescript
interface ReviewCardProps {
  review: Review;
  className?: string;
}
```

With:
```typescript
interface ReviewCardProps {
  review: Review;
  className?: string;
  photoUrl?: string;
}
```

Then add photo display after the stars, before the review text. Replace the entire return statement with:

```typescript
return (
  <article
    className={clsx(
      'flex h-full flex-col rounded-card border border-warmgray-200/70 bg-cream p-7 shadow-soft',
      className,
    )}
    aria-label={`Review from ${review.reviewer} on ${review.source}`}
  >
    <Stars rating={review.rating} />
    {photoUrl && (
      <img
        src={photoUrl}
        alt={`Photo from ${review.reviewer}`}
        className="mt-4 h-32 w-full rounded-sm object-cover"
      />
    )}
    <blockquote className={clsx('flex-1', photoUrl ? 'mt-4' : 'mt-5')}>
      <p className="font-display text-lg leading-relaxed text-charcoal">
        "{review.body}"
      </p>
    </blockquote>
    <footer className="mt-6 flex items-center gap-3 border-t border-warmgray-200/70 pt-4">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-burgundy/10 text-burgundy text-sm font-semibold">
        {initialOf(review.reviewer)}
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-charcoal">
          {review.reviewer}
        </p>
        <p className="text-xs uppercase tracking-[0.16em] text-warmgray-500">
          via {review.source}
        </p>
      </div>
    </footer>
  </article>
);
```

- [ ] **Step 3: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/ReviewCard.tsx
git commit -m "feat: ReviewCard now displays optional photo from API"
```

---

### Task 8: Create `BusinessInfoWidget` component

**Files:**
- Create: `src/components/BusinessInfoWidget.tsx`

- [ ] **Step 1: Write the component**

Create `src/components/BusinessInfoWidget.tsx`:

```typescript
import clsx from 'clsx';
import type { GoogleBusinessInfo } from '@/types/google-places';

interface BusinessInfoWidgetProps {
  businessInfo: GoogleBusinessInfo | null;
  className?: string;
}

export function BusinessInfoWidget({
  businessInfo,
  className,
}: BusinessInfoWidgetProps) {
  if (!businessInfo) {
    return null;
  }

  return (
    <div
      className={clsx(
        'rounded-card border border-warmgray-200/70 bg-cream p-6',
        className
      )}
    >
      {/* Rating and review count */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-charcoal">
          {businessInfo.rating.toFixed(1)}
        </span>
        <div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="text-burgundy">
                {i + 1 <= Math.floor(businessInfo.rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <p className="text-sm text-warmgray-600">
            {businessInfo.reviewCount} reviews
          </p>
        </div>
      </div>

      {/* Hours */}
      {businessInfo.hours && Object.keys(businessInfo.hours).length > 0 && (
        <div className="mb-4 border-t border-warmgray-200/70 pt-4">
          <h3 className="text-sm font-semibold text-charcoal mb-2">Hours</h3>
          <ul className="space-y-1 text-sm text-warmgray-700">
            {Object.entries(businessInfo.hours).map(([day, time]) => (
              <li key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Address */}
      {businessInfo.address && (
        <div className="border-t border-warmgray-200/70 pt-4">
          <h3 className="text-sm font-semibold text-charcoal mb-2">Address</h3>
          <p className="text-sm text-warmgray-700">{businessInfo.address}</p>
          {businessInfo.phone && (
            <p className="text-sm text-warmgray-700 mt-1">
              <a
                href={`tel:${businessInfo.phone}`}
                className="text-burgundy hover:underline"
              >
                {businessInfo.phone}
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add src/components/BusinessInfoWidget.tsx
git commit -m "feat: add BusinessInfoWidget to display live rating and hours"
```

---

### Task 9: Update Footer to use `BusinessInfoWidget`

**Files:**
- Modify: `src/layout/Footer.tsx`

- [ ] **Step 1: Read current Footer**

Run: `cat src/layout/Footer.tsx`

- [ ] **Step 2: Update Footer to use the hook and widget**

At the top of the Footer component, add the hook:

```typescript
const { businessInfo, fallback } = useGooglePlaces();
```

Import statements should include:

```typescript
import { useGooglePlaces } from '@/hooks/useGooglePlaces';
import { BusinessInfoWidget } from '@/components/BusinessInfoWidget';
```

Then replace the hardcoded hours section with:

```typescript
{!fallback && businessInfo && (
  <BusinessInfoWidget businessInfo={businessInfo} className="mb-8" />
)}
{fallback && (
  // Fallback to hardcoded hours
  <HoursTable />
)}
```

- [ ] **Step 3: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/layout/Footer.tsx
git commit -m "feat: Footer displays live business info from Google Places API"
```

---

### Task 10: Update Contact page map section to use live business info

**Files:**
- Modify: `src/pages/Contact.tsx` (or wherever the map section lives)

- [ ] **Step 1: Locate the map section**

Find the component that renders the location/map information. It's likely in Contact page or a separate component.

- [ ] **Step 2: Add the hook to the component**

At the top, add:

```typescript
const { businessInfo, fallback } = useGooglePlaces();
```

Import:

```typescript
import { useGooglePlaces } from '@/hooks/useGooglePlaces';
import { BusinessInfoWidget } from '@/components/BusinessInfoWidget';
```

- [ ] **Step 3: Render the BusinessInfoWidget in the map section**

Replace the hardcoded address/hours display with:

```typescript
{businessInfo && (
  <BusinessInfoWidget
    businessInfo={businessInfo}
    className="mb-8"
  />
)}
```

Keep the Google Maps embed as-is (or add a link to Google Maps if not already present).

- [ ] **Step 4: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 5: Commit**

```bash
git add src/pages/Contact.tsx
git commit -m "feat: Contact page displays live business info from API"
```

---

### Task 11: Update Home page testimonials section to use live reviews

**Files:**
- Modify: `src/pages/Home.tsx` (or testimonials section component)

- [ ] **Step 1: Locate testimonials section**

Find where `ReviewCard` components are rendered, typically in Home page.

- [ ] **Step 2: Add the hook**

At the top, add:

```typescript
const { reviews, loading, fallback } = useGooglePlaces();
```

Import:

```typescript
import { useGooglePlaces } from '@/hooks/useGooglePlaces';
```

- [ ] **Step 3: Render live reviews**

Replace the hardcoded reviews rendering with:

```typescript
{loading ? (
  <p className="text-center text-warmgray-600">Loading reviews...</p>
) : reviews.length > 0 ? (
  <div className="grid gap-6 md:grid-cols-3">
    {reviews.map((review) => (
      <ReviewCard
        key={review.id}
        review={{
          id: review.id,
          rating: review.rating,
          body: review.body,
          reviewer: review.reviewer,
          source: review.source,
        }}
        photoUrl={review.photoUrl}
      />
    ))}
  </div>
) : (
  fallback ? (
    <p className="text-center text-warmgray-600">
      Using cached reviews. Live data unavailable.
    </p>
  ) : (
    <p className="text-center text-warmgray-600">No reviews found.</p>
  )
)}
```

- [ ] **Step 4: Verify TypeScript is valid**

Run: `npm run typecheck`

Expected: No errors

- [ ] **Step 5: Test locally**

Run: `npm run dev`

Navigate to Home page in browser. You should see:
- Loading indicator initially
- Reviews from Google (5-star only) once loaded
- Photos display if available
- Fallback message if API fails

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: Home page testimonials fetch live 5-star reviews from Google Places"
```

---

## Phase 3: Testing & Deployment

### Task 12: Test error handling and fallbacks

**Files:**
- Test: All modified components

- [ ] **Step 1: Simulate API failure**

Edit `.env.local` and set an invalid API key:

```
VITE_GOOGLE_PLACES_API_KEY=invalid-key
GOOGLE_PLACES_API_KEY=invalid-key
```

Run: `netlify dev`

- [ ] **Step 2: Verify fallback behavior**

Open browser to Home page. You should see:
- Loading indicator
- Fallback message after a few seconds
- No reviews displayed (or fallback reviews if implemented)
- No errors in browser console (errors logged but handled gracefully)

- [ ] **Step 3: Verify Footer/Contact still render**

Check Footer and Contact page. They should still display hardcoded business info with fallback styles.

- [ ] **Step 4: Restore valid API key**

Update `.env.local` with a real Google Places API key and restart `netlify dev`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "test: verify error handling and fallback behavior"
```

---

### Task 13: Deploy to Netlify/Vercel

**Files:**
- Update platform environment variables

- [ ] **Step 1: Add API key to Netlify environment**

If deploying to Netlify:

1. Go to Netlify dashboard → Select your site
2. Settings → Environment
3. Add environment variable:
   - Key: `GOOGLE_PLACES_API_KEY`
   - Value: `<your-google-api-key>`

If deploying to Vercel:

1. Go to Vercel dashboard → Select project
2. Settings → Environment Variables
3. Add environment variable:
   - Name: `GOOGLE_PLACES_API_KEY`
   - Value: `<your-google-api-key>`

- [ ] **Step 2: Commit and push**

```bash
git add -A
git commit -m "deploy: add Google Places API key to platform environment"
git push
```

- [ ] **Step 3: Verify deployment**

After build completes:
- Open your live site
- Check Home page—reviews should load from Google Places
- Check Contact/Footer—business info should display live data
- Open browser DevTools → Network tab → verify API calls to `/.netlify/functions/reviews` and `/.netlify/functions/business-info`

- [ ] **Step 4: Monitor for errors**

Check the site's error logs/monitoring to ensure no API errors. If quota issues arise, the fallback should handle it gracefully.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "deploy: Google Places API integration live"
```

---

## Checklist (for execution)

- [ ] Phase 1: Serverless Functions (Tasks 1-4)
- [ ] Phase 2: React Integration (Tasks 5-11)
- [ ] Phase 3: Testing & Deployment (Tasks 12-13)

---

## Success Criteria

- ✅ Real 5-star Google reviews display on Home page
- ✅ Reviews with photos show the photo
- ✅ Business info (rating, hours, address) displays from API
- ✅ Graceful fallback if API unavailable
- ✅ No API key exposed in client code
- ✅ All TypeScript checks pass
- ✅ Site loads without errors on deploy
