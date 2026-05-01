import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCallButton } from './FloatingCallButton';
import { LocalBusinessJsonLd } from '@/components/SEOHead';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <LocalBusinessJsonLd />
      <ScrollToTopOnNavigate />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingCallButton />
    </div>
  );
}

function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  return null;
}
