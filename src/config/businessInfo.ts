export type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface DayHours {
  key: DayKey;
  label: string;
  open: string | null;
  close: string | null;
  closed?: boolean;
}

export interface BusinessAddress {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessPhone {
  display: string;
  tel: string;
  sms: string;
}

export interface BusinessInfo {
  name: string;
  shortName: string;
  brandLine: string;
  tagline: string;
  yearsInBusiness: number;
  url: string;
  phone: BusinessPhone;
  email: string;
  address: BusinessAddress;
  landmark: string;
  paymentMethods: string[];
  hours: DayHours[];
  hoursSchema: string[];
  googleMaps: {
    placeUrl: string;
    directionsUrl: string;
    embedUrl: string;
  };
  social?: {
    google?: string;
    yelp?: string;
  };
}

export const businessInfo: BusinessInfo = {
  name: 'Shoe Express Repair & Shine',
  shortName: 'Shoe Express',
  brandLine: "We take on repairs that others don't dare to touch.",
  tagline: 'Expert Shoe & Leather Repair in Overland Park, KS',
  yearsInBusiness: 25,
  url: 'https://shoeexpressrepair.com',

  phone: {
    display: '913-492-7463',
    tel: 'tel:+19134927463',
    sms: 'sms:+19134927463',
  },

  email: 'shoeexpressrepair@gmail.com',

  address: {
    street: '10630 Metcalf Ave',
    suite: 'Suite A',
    city: 'Overland Park',
    state: 'KS',
    zip: '66212',
  },

  landmark:
    'Next to Hooters and Chartroose Caboose, off I-435 and Metcalf Ave',

  paymentMethods: ['Check', 'Debit', 'All Major Credit Cards'],

  hours: [
    { key: 'monday', label: 'Monday', open: '12:00 PM', close: '7:00 PM' },
    { key: 'tuesday', label: 'Tuesday', open: '9:00 AM', close: '6:00 PM' },
    { key: 'wednesday', label: 'Wednesday', open: '9:00 AM', close: '6:00 PM' },
    { key: 'thursday', label: 'Thursday', open: '9:00 AM', close: '6:00 PM' },
    { key: 'friday', label: 'Friday', open: '9:00 AM', close: '5:00 PM' },
    { key: 'saturday', label: 'Saturday', open: '10:00 AM', close: '3:00 PM' },
    { key: 'sunday', label: 'Sunday', open: null, close: null, closed: true },
  ],

  hoursSchema: [
    'Mo 12:00-19:00',
    'Tu-Th 09:00-18:00',
    'Fr 09:00-17:00',
    'Sa 10:00-15:00',
  ],

  googleMaps: {
    placeUrl:
      'https://www.google.com/maps/place/10630+Metcalf+Ave+Suite+A,+Overland+Park,+KS+66212',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=10630+Metcalf+Ave+Suite+A,+Overland+Park,+KS+66212',
    embedUrl:
      'https://www.google.com/maps?q=10630+Metcalf+Ave+Suite+A,+Overland+Park,+KS+66212&output=embed',
  },

  social: {
    google: 'https://www.google.com/search?q=Shoe+Express+Repair+%26+Shine+Overland+Park',
  },
};

export function formatAddressOneLine(addr: BusinessAddress = businessInfo.address): string {
  const suite = addr.suite ? ` ${addr.suite}` : '';
  return `${addr.street}${suite}, ${addr.city}, ${addr.state} ${addr.zip}`;
}

export function formatAddressMultiLine(
  addr: BusinessAddress = businessInfo.address,
): { line1: string; line2: string } {
  const suite = addr.suite ? ` ${addr.suite}` : '';
  return {
    line1: `${addr.street}${suite}`,
    line2: `${addr.city}, ${addr.state} ${addr.zip}`,
  };
}
