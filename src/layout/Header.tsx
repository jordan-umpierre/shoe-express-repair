import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/config/navigation';
import { businessInfo } from '@/config/businessInfo';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (drawerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [drawerOpen]);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full transition-all duration-300 ease-gentle',
          scrolled
            ? 'bg-cream/92 backdrop-blur-md shadow-soft border-b border-warmgray-200/60'
            : 'bg-cream/70 backdrop-blur-sm border-b border-transparent',
        )}
      >
        <div className="container-prose flex h-16 items-center justify-between sm:h-[72px]">
          <NavLink to="/" className="flex items-center" aria-label={`${businessInfo.name} home`}>
            <Logo />
          </NavLink>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  clsx(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
                    isActive
                      ? 'text-burgundy'
                      : 'text-warmgray-700 hover:text-charcoal',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-burgundy"
                        transition={{ type: 'spring', stiffness: 480, damping: 38 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={businessInfo.phone.tel}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-burgundy px-4 py-2.5 text-sm font-semibold text-cream shadow-soft transition-colors hover:bg-burgundy-700 lg:px-5"
            >
              <PhoneIcon className="h-4 w-4" />
              <span className="hidden md:inline">Call</span>
              <span>{businessInfo.phone.display}</span>
            </a>
            <a
              href={businessInfo.phone.tel}
              className="inline-flex sm:hidden h-11 w-11 items-center justify-center rounded-full bg-burgundy text-cream shadow-soft"
              aria-label={`Call ${businessInfo.phone.display}`}
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full border border-warmgray-300 text-charcoal transition-colors hover:bg-warmgray-100"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
            >
              <HamburgerIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <MobileDrawer onClose={() => setDrawerOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      id="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-cream shadow-deep flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 360, damping: 38 }}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-[72px] sm:px-6 border-b border-warmgray-200/60">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warmgray-300 text-charcoal transition-colors hover:bg-warmgray-100"
            aria-label="Close menu"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-6" aria-label="Mobile primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'rounded-2xl px-4 py-3 text-lg font-medium transition-colors',
                  isActive
                    ? 'bg-warmgray-100 text-burgundy'
                    : 'text-charcoal hover:bg-warmgray-100',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-5 pb-8 pt-4 sm:px-6">
          <a href={businessInfo.phone.tel} className="btn-primary w-full">
            <PhoneIcon className="h-5 w-5" />
            Call {businessInfo.phone.display}
          </a>
          <a
            href={businessInfo.phone.sms}
            className="btn-ghost mt-3 w-full"
          >
            <MessageIcon className="h-5 w-5" />
            Text for a quote
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
