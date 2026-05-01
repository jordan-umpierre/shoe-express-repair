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

        // If we're using fallback, construct business info from hardcoded config
        const fallbackInfo: GoogleBusinessInfo = {
          rating: 4.8, // Placeholder; update with real rating from Google
          reviewCount: 100, // Placeholder
          address: `${fallbackBusinessInfo.address.street}${
            fallbackBusinessInfo.address.suite
              ? ` ${fallbackBusinessInfo.address.suite}`
              : ''
          }, ${fallbackBusinessInfo.address.city}, ${fallbackBusinessInfo.address.state} ${fallbackBusinessInfo.address.zip}`,
          hours: {
            monday: fallbackBusinessInfo.hours[0].open
              ? `${fallbackBusinessInfo.hours[0].open} - ${fallbackBusinessInfo.hours[0].close}`
              : 'Closed',
            tuesday: fallbackBusinessInfo.hours[1].open
              ? `${fallbackBusinessInfo.hours[1].open} - ${fallbackBusinessInfo.hours[1].close}`
              : 'Closed',
            wednesday: fallbackBusinessInfo.hours[2].open
              ? `${fallbackBusinessInfo.hours[2].open} - ${fallbackBusinessInfo.hours[2].close}`
              : 'Closed',
            thursday: fallbackBusinessInfo.hours[3].open
              ? `${fallbackBusinessInfo.hours[3].open} - ${fallbackBusinessInfo.hours[3].close}`
              : 'Closed',
            friday: fallbackBusinessInfo.hours[4].open
              ? `${fallbackBusinessInfo.hours[4].open} - ${fallbackBusinessInfo.hours[4].close}`
              : 'Closed',
            saturday: fallbackBusinessInfo.hours[5].open
              ? `${fallbackBusinessInfo.hours[5].open} - ${fallbackBusinessInfo.hours[5].close}`
              : 'Closed',
            sunday: fallbackBusinessInfo.hours[6].open
              ? `${fallbackBusinessInfo.hours[6].open} - ${fallbackBusinessInfo.hours[6].close}`
              : 'Closed',
          },
          phone: fallbackBusinessInfo.phone.display,
          website: fallbackBusinessInfo.url,
        };
        setBusinessInfo(fallbackInfo);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    reviews,
    businessInfo,
    loading,
    error,
    fallback,
  };
}
