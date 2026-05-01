import { useState, type FormEvent } from 'react';
import { businessInfo, formatAddressMultiLine } from '@/config/businessInfo';
import { homeServices } from '@/config/services';
import { HoursTable } from '@/components/HoursTable';
import { FadeIn } from '@/components/FadeIn';

export default function Contact() {
  const addr = formatAddressMultiLine();
  return (
    <>
      <ContactHero />
      <section className="section bg-warmgray-50">
        <div className="container-prose">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-5">
              <FadeIn>
                <article className="card p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                    Call or text
                  </p>
                  <a
                    href={businessInfo.phone.tel}
                    className="mt-3 block font-display text-4xl font-semibold tracking-tightish text-charcoal hover:text-burgundy sm:text-5xl"
                  >
                    {businessInfo.phone.display}
                  </a>
                  <p className="mt-3 text-sm text-warmgray-600">
                    Texting a photo of your item is often the fastest way to
                    get a ballpark quote.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    <a href={businessInfo.phone.tel} className="btn-primary">
                      Call now
                    </a>
                    <a href={businessInfo.phone.sms} className="btn-ghost">
                      Text a photo
                    </a>
                  </div>
                </article>
              </FadeIn>

              <FadeIn delay={0.05}>
                <article className="card p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                    Email
                  </p>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="mt-3 block font-display text-xl font-semibold text-charcoal hover:text-burgundy break-all"
                  >
                    {businessInfo.email}
                  </a>
                </article>
              </FadeIn>

              <FadeIn delay={0.1}>
                <article className="card p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                    Visit
                  </p>
                  <address className="mt-3 not-italic">
                    <p className="font-display text-xl font-semibold leading-snug text-charcoal">
                      {addr.line1}
                    </p>
                    <p className="text-charcoal">{addr.line2}</p>
                    <p className="mt-3 text-sm leading-relaxed text-warmgray-600">
                      {businessInfo.landmark}.
                    </p>
                  </address>
                  <a
                    href={businessInfo.googleMaps.directionsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-700"
                  >
                    Get directions →
                  </a>
                  <MapFallback />
                </article>
              </FadeIn>

              <FadeIn delay={0.15}>
                <article className="card p-7 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                    Hours
                  </p>
                  <HoursTable highlightToday className="mt-3" />
                  <div className="mt-6 border-t border-warmgray-200/80 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
                      Payments accepted
                    </p>
                    <ul
                      className="mt-3 flex flex-wrap gap-2"
                      role="list"
                      aria-label="Accepted payment methods"
                    >
                      {businessInfo.paymentMethods.map((method) => (
                        <li
                          key={method}
                          className="rounded-full border border-warmgray-300 bg-cream px-3 py-1.5 text-xs font-medium text-charcoal"
                        >
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeIn>
            </div>

            <FadeIn delay={0.05} className="lg:col-span-7">
              <ContactForm />
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactHero() {
  return (
    <section className="bg-charcoal text-cream" aria-labelledby="contact-hero">
      <div className="container-prose pt-20 pb-16 sm:pt-24 sm:pb-20">
        <FadeIn>
          <p className="eyebrow text-tan">Get in touch</p>
          <h1
            id="contact-hero"
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightish sm:text-5xl lg:text-[58px]"
          >
            Call, text, or stop by — whichever is easiest.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">
            Walk-ins are always welcome during open hours. For quotes, a quick
            text with a photo is usually fastest.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function MapFallback() {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-warmgray-200/80">
      {/* [MAP placeholder — replace with iframe using businessInfo.googleMaps.embedUrl] */}
      <div className="relative aspect-[16/9] bg-[radial-gradient(ellipse_at_center,_rgba(122,31,31,0.10),_transparent_60%)]">
        <svg viewBox="0 0 320 180" className="h-full w-full opacity-60" aria-hidden="true">
          <defs>
            <pattern id="grid-3" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D8D1C5" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-3)" />
          <path d="M 0 90 Q 80 60 160 90 T 320 90" stroke="#C9A87C" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-charcoal/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cream">
            Map placeholder
          </span>
        </div>
      </div>
    </div>
  );
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const emptyForm: FormState = {
  name: '',
  phone: '',
  email: '',
  service: '',
  message: '',
};

function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange<K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <article className="card p-7 sm:p-10" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-burgundy">
          Message received
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-charcoal sm:text-3xl">
          Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
        </h2>
        <p className="mt-3 text-base leading-relaxed text-warmgray-700">
          Note: this site's form is not yet wired to email. For the fastest
          reply, please call or text {businessInfo.phone.display} — we will
          get right back to you.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={businessInfo.phone.tel} className="btn-primary">
            Call now
          </a>
          <a href={businessInfo.phone.sms} className="btn-ghost">
            Text a photo
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setForm(emptyForm);
            setSubmitted(false);
          }}
          className="mt-6 text-sm font-medium text-burgundy hover:text-burgundy-700"
        >
          Send another message
        </button>
      </article>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="card p-7 sm:p-10"
      aria-label="Contact form"
    >
      <h2 className="font-display text-2xl font-semibold leading-tight text-charcoal sm:text-3xl">
        Send us a quick message.
      </h2>
      <p className="mt-3 text-base leading-relaxed text-warmgray-700">
        For the fastest reply, call or text {businessInfo.phone.display}. Or
        fill out the form below.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          required
          value={form.name}
          onChange={(v) => handleChange('name', v)}
          autoComplete="name"
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          value={form.phone}
          onChange={(v) => handleChange('phone', v)}
          autoComplete="tel"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => handleChange('email', v)}
          autoComplete="email"
          className="sm:col-span-2"
        />
        <SelectField
          id="service"
          label="What do you need repaired?"
          required
          value={form.service}
          onChange={(v) => handleChange('service', v)}
          className="sm:col-span-2"
        />
        <TextareaField
          id="message"
          label="Tell us a bit about it"
          value={form.message}
          onChange={(v) => handleChange('message', v)}
          className="sm:col-span-2"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary">
          Send message
        </button>
        <p className="text-xs text-warmgray-500">
          We'll never share your information.
        </p>
      </div>
    </form>
  );
}

interface FieldBaseProps {
  id: string;
  label: string;
  required?: boolean;
  className?: string;
}

interface FieldProps extends FieldBaseProps {
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}

function Field({
  id,
  label,
  type = 'text',
  required,
  value,
  onChange,
  autoComplete,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-charcoal"
      >
        {label}
        {required && <span className="ml-1 text-burgundy">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="mt-2 block w-full rounded-2xl border border-warmgray-300 bg-cream px-4 py-3 text-base text-charcoal placeholder:text-warmgray-500 transition-colors focus:border-burgundy focus:outline-none"
      />
    </div>
  );
}

interface SelectFieldProps extends FieldBaseProps {
  value: string;
  onChange: (v: string) => void;
}

function SelectField({
  id,
  label,
  required,
  value,
  onChange,
  className,
}: SelectFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {required && <span className="ml-1 text-burgundy">*</span>}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full appearance-none rounded-2xl border border-warmgray-300 bg-cream px-4 py-3 text-base text-charcoal transition-colors focus:border-burgundy focus:outline-none"
      >
        <option value="" disabled>
          Choose a service…
        </option>
        {homeServices.map((s) => (
          <option key={s.id} value={s.title}>
            {s.title}
          </option>
        ))}
        <option value="Belt Repair">Belt Repair</option>
        <option value="Sole &amp; Heel Replacement">Sole &amp; Heel Replacement</option>
        <option value="Other / Not sure">Other / Not sure</option>
      </select>
    </div>
  );
}

interface TextareaFieldProps extends FieldBaseProps {
  value: string;
  onChange: (v: string) => void;
}

function TextareaField({
  id,
  label,
  required,
  value,
  onChange,
  className,
}: TextareaFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-charcoal">
        {label}
        {required && <span className="ml-1 text-burgundy">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="mt-2 block w-full resize-y rounded-2xl border border-warmgray-300 bg-cream px-4 py-3 text-base text-charcoal placeholder:text-warmgray-500 transition-colors focus:border-burgundy focus:outline-none"
      />
    </div>
  );
}
