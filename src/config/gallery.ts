export type GalleryCategory =
  | 'shoes'
  | 'boots'
  | 'leather'
  | 'handbags'
  | 'luggage';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  beforeLabel: string;
  afterLabel: string;
}

// Each entry pairs with placeholder before/after images. Replace
// beforeLabel/afterLabel with real photo paths once supplied.
export const galleryItems: GalleryItem[] = [
  {
    id: 'sole-replacement',
    title: 'Sole Replacement',
    description:
      'Worn-through soles replaced with matched-grade rubber. The shoe lasts longer than it did originally.',
    category: 'shoes',
    beforeLabel: '[PHOTO: Before — Sole Replacement]',
    afterLabel: '[PHOTO: After — Sole Replacement]',
  },
  {
    id: 'leather-restoration',
    title: 'Leather Restoration',
    description:
      'Color match and conditioning brings back the depth and tone of a long-loved leather piece.',
    category: 'leather',
    beforeLabel: '[PHOTO: Before — Leather Restoration]',
    afterLabel: '[PHOTO: After — Leather Restoration]',
  },
  {
    id: 'boot-reheel',
    title: 'Boot Re-heel',
    description:
      'Heels rebuilt and re-stitched on a daily-wear boot. Like a fresh start without buying new.',
    category: 'boots',
    beforeLabel: '[PHOTO: Before — Boot Re-heel]',
    afterLabel: '[PHOTO: After — Boot Re-heel]',
  },
  {
    id: 'handbag-strap',
    title: 'Handbag Strap Replacement',
    description:
      'A snapped strap replaced with matching leather and re-stitched hardware.',
    category: 'handbags',
    beforeLabel: '[PHOTO: Before — Handbag Strap]',
    afterLabel: '[PHOTO: After — Handbag Strap]',
  },
  {
    id: 'luggage-zipper',
    title: 'Luggage Zipper Replacement',
    description:
      'Full zipper replacement on a hard-shell roller — back to airport-ready.',
    category: 'luggage',
    beforeLabel: '[PHOTO: Before — Luggage Zipper]',
    afterLabel: '[PHOTO: After — Luggage Zipper]',
  },
  {
    id: 'cowboy-boot',
    title: 'Cowboy Boot Restoration',
    description:
      'Heritage cowboy boots brought back to working order — soles, stitching, and finish.',
    category: 'boots',
    beforeLabel: '[PHOTO: Before — Cowboy Boot Restoration]',
    afterLabel: '[PHOTO: After — Cowboy Boot Restoration]',
  },
  {
    id: 'leather-jacket-stitch',
    title: 'Leather Jacket Stitching',
    description:
      'Torn seams re-stitched and edges re-finished on a daily-wear leather jacket.',
    category: 'leather',
    beforeLabel: '[PHOTO: Before — Leather Jacket]',
    afterLabel: '[PHOTO: After — Leather Jacket]',
  },
  {
    id: 'handbag-hardware',
    title: 'Handbag Hardware Repair',
    description:
      'Broken clasp and loose ring replaced with matching hardware.',
    category: 'handbags',
    beforeLabel: '[PHOTO: Before — Handbag Hardware]',
    afterLabel: '[PHOTO: After — Handbag Hardware]',
  },
];

export const homeGalleryPreview: GalleryItem[] = [
  galleryItems[0],
  galleryItems[1],
  galleryItems[2],
];

export const galleryCategoryLabels: Record<GalleryCategory | 'all', string> = {
  all: 'All',
  shoes: 'Shoes',
  boots: 'Boots',
  leather: 'Leather',
  handbags: 'Handbags',
  luggage: 'Luggage',
};
