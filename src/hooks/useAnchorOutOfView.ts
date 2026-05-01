import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Returns true when the element matched by `selector` is either absent
// from the page or scrolled out of the viewport. Used by the floating
// call button to defer to in-hero CTAs while they remain on screen.
export function useAnchorOutOfView(selector: string): boolean {
  const location = useLocation();
  const [outOfView, setOutOfView] = useState(true);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) {
      setOutOfView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOutOfView(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -16px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selector, location.pathname]);

  return outOfView;
}
