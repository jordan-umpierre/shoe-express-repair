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
