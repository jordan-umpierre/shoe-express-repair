# Google Places API Integration Design
**Date:** 2026-05-01  
**Project:** Shoe Express Repair & Shine Website  
**Scope:** Import real Google reviews and business info via Google Places API  

---

## Overview

Replace hardcoded review placeholders and static business info with live data fetched from Google Places API. Filter reviews to show only 5-star ratings with photos. Use serverless functions (Netlify/Vercel) to proxy API calls securely.

---

## Architecture

### Serverless Functions

Two edge functions handle all Google Places API communication:

**`api/reviews.ts`**
- Endpoint: `/.netlify/functions/reviews` (or `api/reviews` in Vercel)
- Input: None (uses env vars for business query)
- Output: Array of Review objects
- Logic:
  - Query Google Places API for business by name + address from env
  - Get place ID from first result
  - Fetch reviews for that place
  - Filter: keep only reviews with `rating === 5` AND `photos` array exists
  - Return filtered array with photo URLs resolved
  - Cache response (60-second TTL to minimize quota usage)

**`api/business-info.ts`**
- Endpoint: `/.netlify/functions/business-info`
- Input: None (uses env vars)
- Output: BusinessInfo object
- Logic:
  - Query Google Places API for business
  - Extract: rating, formatted_address, opening_hours, types
  - Return structured object
  - Cache response (60-second TTL)

### Environment Configuration

**Development** (`.env.local`):
```
VITE_GOOGLE_PLACES_API_KEY=<your-api-key>
```

**Production** (Netlify/Vercel):
- Add `GOOGLE_PLACES_API_KEY` to platform env vars
- Functions read from `process.env.GOOGLE_PLACES_API_KEY`

### React Client

**New hook: `useGooglePlaces`**
- Fetches both endpoints in parallel on component mount
- Returns: `{ reviews, businessInfo, loading, error, fallback }`
- Falls back to `businessInfo.ts` if API fails
- Manages loading/error states for UI

**Modified components:**
- `ReviewCard`: Now receives optional `photoUrl` prop from API
- Footer: Pulls hours/address from `businessInfo` hook instead of hardcoded config
- Contact page map section: Uses live business info (rating, formatted address)

**New component: `BusinessInfoWidget`**
- Displays live rating, hours, address
- Used in map section and footer
- Falls back to hardcoded data if API unavailable

---

## Data Flow

```
Page Load
  ↓
React Component Mounts
  ↓
useGooglePlaces Hook Initializes
  ↓
Parallel Fetch:
  ├─ GET /.netlify/functions/reviews
  │   └─ Returns: [Review with 5-star + photos]
  │
  └─ GET /.netlify/functions/business-info
      └─ Returns: { rating, hours, address }
  ↓
Data Arrives
  ├─ ReviewCard components render with API data + photos
  └─ BusinessInfoWidget renders with live hours/rating
  ↓
If API Fails
  └─ Fall back to hardcoded businessInfo.ts config
```

---

## API Response Schema

**Reviews Response:**
```typescript
[
  {
    id: string;           // Google Place Review UID
    rating: number;       // Always 5 (filtered at source)
    body: string;         // Review text
    reviewer: string;     // Reviewer name
    source: 'Google';     // Always 'Google'
    photoUrl?: string;    // Photo URL from review (if present)
    timestamp: number;    // Review date (epoch ms)
  }
]
```

**Business Info Response:**
```typescript
{
  rating: number;        // e.g., 4.8
  reviewCount: number;   // e.g., 142
  address: string;       // Formatted address
  hours: {
    [day: string]: string; // e.g., "09:00-18:00"
  };
  phone: string;         // Phone number
  website: string;       // Website URL
}
```

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Network timeout | Show hardcoded data from `businessInfo.ts`, log error |
| API key invalid | Return fallback data, log error to console |
| API quota exceeded | Return fallback data, show subtle "live data unavailable" indicator |
| No matching business found | Return fallback data, warn in dev console |
| Review has no photos | Exclude from response (filtered at source) |
| Malformed API response | Validate response shape, return fallback if invalid |

---

## Caching Strategy

**Client-side:**
- Cache results in React state/context for session duration
- Refetch on page reload (not auto-refresh to preserve quota)

**Serverless:**
- Set `Cache-Control: max-age=60` header (60-second TTL)
- Serverless platform respects this for edge caching
- Minimizes redundant Google API calls within the hour

**Google API:**
- Each unique function call counts toward daily quota
- With 60s edge cache: ~1,440 calls per day per endpoint maximum
- Google free tier: 25,000 requests/day (plenty of headroom)

---

## Implementation Phases

### Phase 1: Serverless Functions
- Create `api/reviews.ts` and `api/business-info.ts`
- Test locally with `netlify dev` or Vercel local environment
- Verify API filtering (5-star + photos only)

### Phase 2: React Integration
- Create `useGooglePlaces` hook
- Add fallback logic to `ReviewCard`, Footer, and map section
- Wire up loading/error states

### Phase 3: Deployment & Testing
- Add API key to Netlify/Vercel env vars
- Deploy and verify live data flows
- Test fallback when API is unavailable

---

## Rollback Plan

If Google Places API integration fails post-launch:
1. Remove fetch calls from `useGooglePlaces` hook
2. Switch to hardcoded `businessInfo.ts` data
3. Component will render without interruption (fallback already in place)
4. No changes to UI or component structure needed

---

## Success Criteria

- ✅ Reviews displayed are 5-star only
- ✅ Reviews with photos show the photo
- ✅ Reviews without photos are filtered out
- ✅ Business info (rating, hours, address) updates from API
- ✅ API calls are cached (60s edge cache)
- ✅ Graceful fallback if API unavailable
- ✅ No API key exposed in client code
- ✅ Responsive load time (<500ms for API responses)
