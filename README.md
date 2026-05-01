# Shoe Express Repair & Shine — Website

Production website for [Shoe Express Repair & Shine](https://shoeexpressrepair.com), a locally owned shoe and leather repair shop in Overland Park, KS.

Six pages — Home, Services, About, Gallery, Contact, FAQ — built as a single-page React app with proper canonical URLs and per-page metadata for SEO.

---

## Tech stack

- **React 18** + **TypeScript** + **Vite** — build and dev server
- **Tailwind CSS 3** — styling, themed via `tailwind.config.ts`
- **React Router 6** — client-side routing
- **React Helmet Async** — per-page `<head>` meta and JSON-LD
- **Framer Motion** — entrance animations and accordion transitions
- **@fontsource** — self-hosted Fraunces (display) and Inter (body)

---

## Run locally

Prerequisites: Node.js 20+ (LTS recommended) and npm.

```bash
npm install
npm run dev          # start dev server at http://localhost:5173
npm run build        # production build to dist/
npm run preview      # serve the production build locally
npm run typecheck    # tsc -b --noEmit
```

---

## Where to edit business info

All business data lives in **one file**:

```
src/config/businessInfo.ts
```

This file contains:

- Name, phone, email, address, suite
- Landmark description
- Years in business
- Hours (per-day, with `closed` flag for Sunday)
- `hoursSchema` — the same hours formatted for `LocalBusiness` JSON-LD (`Mo 12:00-19:00`, etc.)
- Payment methods
- Google Maps URLs (place, directions, embed)
- Site URL (used for canonical links)

Update those fields and every component that displays them — Header, Footer, Hours table, Contact page, About page, JSON-LD schema — picks up the change.

### Updating hours

Inside `businessInfo.ts`, the `hours` array is the source for the on-screen hours table:

```ts
hours: [
  { key: 'monday',    label: 'Monday',    open: '12:00 PM', close: '7:00 PM' },
  { key: 'tuesday',   label: 'Tuesday',   open: '9:00 AM',  close: '6:00 PM' },
  // ...
  { key: 'sunday',    label: 'Sunday',    open: null, close: null, closed: true },
],
```

If you change a day's hours, also update the corresponding entry in `hoursSchema`:

```ts
hoursSchema: [
  'Mo 12:00-19:00',
  'Tu-Th 09:00-18:00',
  'Fr 09:00-17:00',
  'Sa 10:00-15:00',
],
```

`hoursSchema` is what Google reads from the `LocalBusiness` JSON-LD on every page. Times use 24-hour format and the day codes `Mo Tu We Th Fr Sa Su`.

---

## Where to replace images

The current build uses clearly-marked placeholder labels everywhere a real photo will go. Search the codebase for the string `[PHOTO:` to find them all. The locations:

| Component / page | Placeholder |
| --- | --- |
| `src/pages/Home.tsx` — `Hero` | `[PHOTO: Hero Background — leather workshop or shoe repair bench]` (CSS gradient + texture stand-in for now; replace the `absolute inset-0 -z-10` block with an `<img>` + dark overlay) |
| `src/pages/Home.tsx` — `HardLuggageCallout` | `[PHOTO: Hard-shell luggage repair example]` |
| `src/config/gallery.ts` | `beforeLabel` and `afterLabel` strings on each `galleryItem` — these are passed to the `<PlaceholderImage>` cards inside the `BeforeAfterSlider`. Replace each item with real `before`/`after` image paths and update `BeforeAfterSlider`'s `beforeNode`/`afterNode` props to use `<img>` tags. |
| `src/pages/Gallery.tsx` | Uses `galleryItems` from above |
| `src/pages/Home.tsx` — `BeforeAfterPreview` | Uses `homeGalleryPreview` from above |
| `src/components/Logo.tsx` | `[LOGO: Replace SVG with real logo file when provided]` — swap the inline SVG mark for an imported logo asset |
| `src/components/HoursTable.tsx`, `src/pages/Contact.tsx`, `src/pages/About.tsx`, `src/pages/Home.tsx` | `[MAP placeholder]` — every page with a map slot has a styled fallback card. Replace the SVG-grid div with an `<iframe src={businessInfo.googleMaps.embedUrl} />` once you want the live embed. |
| `public/og-image.svg` | Placeholder Open Graph image. Replace with a 1200×630 PNG or JPG before launch — Twitter/X does not render SVG OG images. After replacing, update the default in `src/components/SEOHead.tsx` if the filename changes. |
| `public/favicon.svg` | Placeholder leather-stitch icon. Swap for a real favicon set when available. |

### Reviews

Reviews on the home page are placeholders only — see `src/config/reviews.ts`. **Do not fabricate reviews.** Pull real verified reviews from the Google or Yelp business listing and replace each entry's `body` and `reviewer`.

---

## Connecting the contact form

The contact form at `/contact` is currently UI-only. It validates required fields client-side and shows a confirmation panel on submit, but does not send the message anywhere.

To wire it up, edit `src/pages/Contact.tsx` and replace the body of `handleSubmit` in `ContactForm`. Three options:

### Option A: Formspree

1. Create a form at [formspree.io](https://formspree.io) and copy the form endpoint (`https://formspree.io/f/abcd1234`).
2. Replace the submit handler:

```ts
async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  await fetch('https://formspree.io/f/abcd1234', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(form),
  });
  setSubmitted(true);
}
```

### Option B: EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com), create a service + template, and grab the public key, service ID, and template ID.
2. `npm install @emailjs/browser`.
3. Replace the submit handler:

```ts
import emailjs from '@emailjs/browser';

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, { publicKey: 'PUBLIC_KEY' });
  setSubmitted(true);
}
```

### Option C: Netlify Forms

1. Add `netlify` and `netlify-honeypot="bot-field"` attributes to the `<form>` element, plus a hidden `<input type="hidden" name="form-name" value="contact" />`.
2. Deploy to Netlify — submissions appear in the site dashboard.

For all three, make sure to handle errors (network failure) and disable the submit button while the request is in flight.

---

## Deploy

### Netlify

1. Push the repo to GitHub (already configured for `jordan-umpierre/shoe-express-repair`).
2. On [netlify.com](https://app.netlify.com), choose **Add new site → Import from Git** and select this repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20 (set `NODE_VERSION=20` in environment variables, or add a `.nvmrc`)
4. Add a `_redirects` rule for SPA routing — create `public/_redirects` with:

   ```
   /*    /index.html   200
   ```

5. Deploy. The first build will publish to a `*.netlify.app` URL.

### Vercel

1. Push to GitHub (same as above).
2. On [vercel.com](https://vercel.com/new), import the repo.
3. Vercel auto-detects Vite — defaults are correct (build: `npm run build`, output: `dist`).
4. SPA routing works automatically; no extra config needed.
5. Deploy.

---

## Attaching the real domain

Once a deploy is live on the Netlify or Vercel preview URL, point `shoeexpressrepair.com` at it:

1. **Configure the domain in your host:**
   - **Netlify:** Site settings → Domain management → Add custom domain → enter `shoeexpressrepair.com`.
   - **Vercel:** Project → Settings → Domains → Add domain.
2. **Update DNS at your registrar** — typically two records:
   - **Apex (`shoeexpressrepair.com`):** `A` record pointing to the host's IP, OR `ALIAS`/`ANAME` if your registrar supports it.
   - **`www` subdomain:** `CNAME` pointing to the host's URL (e.g. `cname.vercel-dns.com` or `<site>.netlify.app`).

   Both Netlify and Vercel show the exact records to use in the Domain settings panel.
3. **Wait for DNS to propagate** (usually minutes to a few hours). The host will issue an SSL certificate automatically once the records resolve.
4. **Update canonical URL** in `src/config/businessInfo.ts` if it ever needs to change — the `url` field is the source for canonical links and JSON-LD. It currently points to `https://shoeexpressrepair.com`.
5. **Verify in Google Search Console:**
   - Add the property at [search.google.com/search-console](https://search.google.com/search-console).
   - Verify ownership via DNS TXT record (preferred) or HTML file.
   - Submit the sitemap: `https://shoeexpressrepair.com/sitemap.xml`.
6. **Test the LocalBusiness schema** with the [Rich Results Test](https://search.google.com/test/rich-results) — paste in `https://shoeexpressrepair.com/` and confirm the `LocalBusiness` block parses without warnings.

---

## Project structure

```
src/
  components/         # reusable UI: Logo, ServiceCard, ReviewCard, BeforeAfterSlider,
                      # FAQAccordion, HoursTable, CTABlock, FadeIn, SEOHead
    icons/            # service category icons
  config/             # business data: businessInfo, services, reviews, gallery, faqs, navigation
  hooks/              # custom hooks (useAnchorOutOfView)
  layout/             # Header, Footer, FloatingCallButton, Layout shell
  pages/              # Home, Services, About, Gallery, Contact, FAQ
  App.tsx             # route definitions
  main.tsx            # app entry — mounts Router + Helmet provider
  index.css           # Tailwind layers + base styles + component classes
public/
  favicon.svg
  og-image.svg
  robots.txt
  sitemap.xml
```

---

## License

Private — all rights reserved by Shoe Express Repair & Shine.
