import { useId, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import type { FAQItem } from '@/config/faqs';

interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenId?: string | null;
  className?: string;
}

export function FAQAccordion({
  items,
  defaultOpenId = null,
  className,
}: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);
  const baseId = useId();

  return (
    <ul
      className={clsx(
        'divide-y divide-warmgray-200/80 rounded-card border border-warmgray-200/70 bg-cream shadow-soft',
        className,
      )}
      role="list"
    >
      {items.map((item) => {
        const isOpen = openId === item.id;
        const buttonId = `${baseId}-btn-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;
        return (
          <li key={item.id}>
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-warmgray-50 sm:px-7 sm:py-6"
              >
                <span className="font-display text-base font-semibold leading-snug text-charcoal sm:text-lg">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warmgray-300 text-charcoal transition-transform duration-200 ease-gentle',
                    isOpen && 'rotate-45 border-burgundy bg-burgundy text-cream',
                  )}
                >
                  <PlusIcon className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.28, ease: [0.22, 0.61, 0.36, 1] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 pr-14 text-sm leading-relaxed text-warmgray-700 sm:px-7 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="8" y1="3" x2="8" y2="13" />
      <line x1="3" y1="8" x2="13" y2="8" />
    </svg>
  );
}
